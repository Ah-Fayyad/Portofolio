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
ALTER COLUMN sort_order SET NOT NULL;

CREATE OR REPLACE FUNCTION public.reorder_certificates(certificate_ids jsonb)
RETURNS void
LANGUAGE sql
SECURITY INVOKER
SET search_path = ''
AS $function$
  UPDATE public.certificates AS certificate
  SET sort_order = (ordered.ordinality - 1)::integer
  FROM jsonb_array_elements_text(certificate_ids)
    WITH ORDINALITY AS ordered(id, ordinality)
  WHERE certificate.id::text = ordered.id;
$function$;

REVOKE ALL ON FUNCTION public.reorder_certificates(jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.reorder_certificates(jsonb) TO authenticated;
