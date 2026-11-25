import { organizationLogos } from "../data/portfolioData";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== "https://your-project.supabase.co" &&
  supabaseAnonKey !== "your-supabase-anon-key"
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

function requireSupabase() {
  if (!supabase) {
    throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }
  return supabase;
}

export const ORGANIZATION_DOMAINS = {
  edraak: "edraak.org",
  almdrasa: "almdrasa.com",
  google: "google.com",
  meta: "meta.com",
  microsoft: "microsoft.com",
  ibm: "ibm.com",
  aws: "aws.amazon.com",
  coursera: "coursera.org",
  udemy: "udemy.com",
  udacity: "udacity.com",
  iti: "iti.gov.eg",
  maharatech: "maharatech.gov.eg",
  aou: "aou.edu.eg",
  freecodecamp: "freecodecamp.org",
  linkedin: "linkedin.com",
  hackerrank: "hackerrank.com",
  datacamp: "datacamp.com",
  cisco: "cisco.com",
  oracle: "oracle.com",
  github: "github.com",
  hubspot: "hubspot.com",
  harvard: "harvard.edu",
  stanford: "stanford.edu",
  mit: "mit.edu",
  route: "routeacademy.com"
};

/**
 * Resolve an issuing organization name or stored logo key/domain to a real company domain
 */
export function resolveOrganizationDomain(orgName, issuerLogoOrDomain) {
  if (issuerLogoOrDomain && issuerLogoOrDomain.includes(".")) {
    return issuerLogoOrDomain.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0].trim();
  }
  if (issuerLogoOrDomain && ORGANIZATION_DOMAINS[issuerLogoOrDomain]) {
    return ORGANIZATION_DOMAINS[issuerLogoOrDomain];
  }
  const key = matchOrganizationLogo(orgName);
  if (key && ORGANIZATION_DOMAINS[key]) {
    return ORGANIZATION_DOMAINS[key];
  }
  if (!orgName) return null;
  const clean = orgName.toLowerCase().trim();
  for (const [k, domain] of Object.entries(ORGANIZATION_DOMAINS)) {
    if (clean.includes(k)) return domain;
  }
  return null;
}

/**
 * Match an issuing organization string to a known logo key
 */
export function matchOrganizationLogo(orgName) {
  if (!orgName) return null;
  const clean = orgName.toLowerCase().trim();
  for (const [key, org] of Object.entries(organizationLogos)) {
    if (
      clean.includes(key) ||
      clean.includes(org.name.toLowerCase()) ||
      (key === "edraak" && (clean.includes("إدراك") || clean.includes("edraak"))) ||
      (key === "almdrasa" && (clean.includes("المدرسة") || clean.includes("almdrasa") || clean.includes("elmdrasa"))) ||
      (key === "iti" && (clean.includes("iti") || clean.includes("information technology institute"))) ||
      (key === "aou" && (clean.includes("aou") || clean.includes("arab open university")))
    ) {
      return key;
    }
  }
  return null;
}

/**
 * Public & Admin Certificate API
 */
export const CertificateService = {
  async getAll() {
    const client = requireSupabase();
    const { data, error } = await client
      .from("certificates")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("issue_date", { ascending: false });

    if (error) throw new Error(`Could not load certificates from Supabase: ${error.message}`);

    return (data || []).map((certificate, index) => ({
      id: certificate.id,
      title: certificate.title,
      issuer: certificate.issuer,
      issuerLogo: certificate.issuer_logo || matchOrganizationLogo(certificate.issuer),
      issueDate: certificate.issue_date,
      expirationDate: certificate.expiration_date,
      category: certificate.category || "General",
      description: certificate.description,
      skills: Array.isArray(certificate.skills)
        ? certificate.skills
        : JSON.parse(certificate.skills || "[]"),
      credentialId: certificate.credential_id,
      credentialUrl: certificate.credential_url,
      imageUrl: certificate.image_url,
      featured: Boolean(certificate.featured),
      sortOrder: Number.isFinite(certificate.sort_order)
        ? certificate.sort_order
        : index
    }));
  },

  async create(cert) {
    const client = requireSupabase();
    const newCert = {
      ...cert,
      id: cert.id || `cert-${Date.now()}`,
      issuerLogo: cert.issuerLogo || matchOrganizationLogo(cert.issuer),
      sortOrder: Number.isFinite(cert.sortOrder) ? cert.sortOrder : 0
    };

    const { data, error } = await client
      .from("certificates")
      .insert({
        id: newCert.id,
        title: newCert.title,
        issuer: newCert.issuer,
        issuer_logo: newCert.issuerLogo,
        issue_date: newCert.issueDate,
        expiration_date: newCert.expirationDate || null,
        category: newCert.category,
        description: newCert.description,
        skills: newCert.skills,
        credential_id: newCert.credentialId,
        credential_url: newCert.credentialUrl,
        image_url: newCert.imageUrl,
        featured: newCert.featured,
        sort_order: newCert.sortOrder
      })
      .select()
      .single();

    if (error) throw new Error(`Could not save certificate to Supabase: ${error.message}`);
    return data;
  },

  async update(id, updates) {
    const client = requireSupabase();
    const { data, error } = await client
      .from("certificates")
      .update({
        title: updates.title,
        issuer: updates.issuer,
        issuer_logo: updates.issuerLogo || matchOrganizationLogo(updates.issuer),
        issue_date: updates.issueDate,
        expiration_date: updates.expirationDate || null,
        category: updates.category,
        description: updates.description,
        skills: updates.skills,
        credential_id: updates.credentialId,
        credential_url: updates.credentialUrl,
        image_url: updates.imageUrl,
        featured: updates.featured,
        sort_order: updates.sortOrder
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(`Could not update certificate in Supabase: ${error.message}`);
    return data;
  },

  async reorder(ids) {
    const client = requireSupabase();
    const { error } = await client.rpc("reorder_certificates", {
      certificate_ids: ids
    });
    if (error) {
      throw new Error(`Could not save certificate order to Supabase: ${error.message}`);
    }
  },

  async delete(id) {
    const client = requireSupabase();
    const { error } = await client
      .from("certificates")
      .delete()
      .eq("id", id);
    if (error) throw new Error(`Could not delete certificate from Supabase: ${error.message}`);
    return true;
  },

  async uploadCertificateImage(file) {
    const client = requireSupabase();
    const allowedTypes = new Map([
      ["image/jpeg", "jpg"],
      ["image/png", "png"],
      ["image/webp", "webp"]
    ]);

    if (!allowedTypes.has(file.type)) {
      throw new Error("Unsupported image type. Upload a JPG, PNG, or WebP image.");
    }
    if (file.size > 10 * 1024 * 1024) {
      throw new Error("Image is larger than 10 MB. Resize it before uploading.");
    }

    const { data: { user }, error: userError } = await client.auth.getUser();
    if (userError || !user) {
      throw new Error("Sign in with your Supabase admin account before uploading images.");
    }

    const filePath = `certificates/${user.id}/${crypto.randomUUID()}.${allowedTypes.get(file.type)}`;
    const { error: uploadError } = await client.storage
      .from("portfolio_certificates")
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false
      });

    if (uploadError) {
      throw new Error(`Could not upload certificate image to Supabase: ${uploadError.message}`);
    }

    const { data } = client.storage
      .from("portfolio_certificates")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};
