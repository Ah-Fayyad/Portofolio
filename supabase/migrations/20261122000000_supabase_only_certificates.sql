CREATE TABLE IF NOT EXISTS public.certificates (
  id text PRIMARY KEY,
  title text NOT NULL,
  issuer text NOT NULL,
  issuer_logo text,
  issue_date text,
  expiration_date text,
  category text DEFAULT 'General',
  description text,
  skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  credential_id text,
  credential_url text,
  image_url text,
  featured boolean NOT NULL DEFAULT false,
  sort_order integer
);

ALTER TABLE public.certificates
  ADD COLUMN IF NOT EXISTS issuer_logo text,
  ADD COLUMN IF NOT EXISTS issue_date text,
  ADD COLUMN IF NOT EXISTS expiration_date text,
  ADD COLUMN IF NOT EXISTS category text DEFAULT 'General',
  ADD COLUMN IF NOT EXISTS description text,
  ADD COLUMN IF NOT EXISTS skills jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS credential_id text,
  ADD COLUMN IF NOT EXISTS credential_url text,
  ADD COLUMN IF NOT EXISTS image_url text,
  ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS sort_order integer;

WITH unranked_certificates AS (
  SELECT
    id,
    COALESCE((SELECT MAX(sort_order) FROM public.certificates), -1)
      + ROW_NUMBER() OVER (ORDER BY issue_date DESC NULLS LAST, id) AS next_order
  FROM public.certificates
  WHERE sort_order IS NULL
)
UPDATE public.certificates AS certificate
SET sort_order = unranked_certificates.next_order::integer
FROM unranked_certificates
WHERE certificate.id = unranked_certificates.id;

ALTER TABLE public.certificates
  ALTER COLUMN sort_order SET DEFAULT 0,
  ALTER COLUMN sort_order SET NOT NULL,
  ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  existing_policy record;
BEGIN
  FOR existing_policy IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'certificates'
  LOOP
    EXECUTE format(
      'DROP POLICY %I ON public.certificates',
      existing_policy.policyname
    );
  END LOOP;
END
$$;

CREATE POLICY "Public can read certificates"
  ON public.certificates
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage certificates"
  ON public.certificates
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'ahfayyad.m@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'ahfayyad.m@gmail.com');

REVOKE ALL ON TABLE public.certificates FROM anon, authenticated;
GRANT SELECT ON TABLE public.certificates TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE public.certificates TO authenticated;

INSERT INTO storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
VALUES (
  'portfolio_certificates',
  'portfolio_certificates',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO UPDATE
SET public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

DO $$
DECLARE
  existing_policy record;
BEGIN
  FOR existing_policy IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'storage'
      AND tablename = 'objects'
      AND (
        COALESCE(qual, '') ILIKE '%portfolio_certificates%'
        OR COALESCE(with_check, '') ILIKE '%portfolio_certificates%'
      )
  LOOP
    EXECUTE format(
      'DROP POLICY %I ON storage.objects',
      existing_policy.policyname
    );
  END LOOP;
END
$$;

CREATE POLICY "Public can read portfolio certificate images"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'portfolio_certificates');

CREATE POLICY "Authenticated users can upload own certificate images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'portfolio_certificates'
    AND auth.jwt() ->> 'email' = 'ahfayyad.m@gmail.com'
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

CREATE POLICY "Authenticated users can update own certificate images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'portfolio_certificates'
    AND auth.jwt() ->> 'email' = 'ahfayyad.m@gmail.com'
    AND (storage.foldername(name))[2] = auth.uid()::text
  )
  WITH CHECK (
    bucket_id = 'portfolio_certificates'
    AND auth.jwt() ->> 'email' = 'ahfayyad.m@gmail.com'
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

CREATE POLICY "Authenticated users can delete own certificate images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'portfolio_certificates'
    AND auth.jwt() ->> 'email' = 'ahfayyad.m@gmail.com'
    AND (storage.foldername(name))[2] = auth.uid()::text
  );

CREATE OR REPLACE FUNCTION public.reorder_certificates(certificate_ids jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $function$
BEGIN
  IF auth.jwt() ->> 'email' IS DISTINCT FROM 'ahfayyad.m@gmail.com' THEN
    RAISE EXCEPTION 'Only the portfolio administrator can reorder certificates';
  END IF;

  IF jsonb_typeof(certificate_ids) IS DISTINCT FROM 'array' THEN
    RAISE EXCEPTION 'certificate_ids must be a JSON array';
  END IF;

  IF jsonb_array_length(certificate_ids) <> (
    SELECT count(*) FROM public.certificates
  ) THEN
    RAISE EXCEPTION 'certificate_ids must include every certificate';
  END IF;

  IF (
    SELECT count(*) FROM jsonb_array_elements_text(certificate_ids)
  ) <> (
    SELECT count(DISTINCT value) FROM jsonb_array_elements_text(certificate_ids)
  ) THEN
    RAISE EXCEPTION 'certificate_ids must not contain duplicates';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM jsonb_array_elements_text(certificate_ids) AS requested(id)
    WHERE NOT EXISTS (
      SELECT 1
      FROM public.certificates AS certificate
      WHERE certificate.id::text = requested.id
    )
  ) THEN
    RAISE EXCEPTION 'certificate_ids contains an unknown certificate';
  END IF;

  UPDATE public.certificates AS certificate
  SET sort_order = (requested.ordinality - 1)::integer
  FROM jsonb_array_elements_text(certificate_ids)
    WITH ORDINALITY AS requested(id, ordinality)
  WHERE certificate.id::text = requested.id;
END;
$function$;

REVOKE ALL ON FUNCTION public.reorder_certificates(jsonb) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.reorder_certificates(jsonb) TO authenticated;
