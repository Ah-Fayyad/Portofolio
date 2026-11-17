import { createClient } from "@supabase/supabase-js";
import { initialCertificates, organizationLogos } from "../data/portfolioData";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== "https://your-project.supabase.co"
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local fallback storage key for zero-config persistence
const LOCAL_STORAGE_KEY = "ahmed_portfolio_certificates";

function getLocalCertificates() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialCertificates));
      return initialCertificates;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Local storage error:", e);
    return initialCertificates;
  }
}

function saveLocalCertificates(certs) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(certs));
  } catch (e) {
    console.error("Error saving certificates locally:", e);
  }
}

/**
 * Match an issuing organization string to a known logo key
 */
export function matchOrganizationLogo(orgName) {
  if (!orgName) return null;
  const clean = orgName.toLowerCase().trim();
  for (const [key, org] of Object.entries(organizationLogos)) {
    if (clean.includes(key) || clean.includes(org.name.toLowerCase())) {
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
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("certificates")
          .select("*")
          .order("issue_date", { ascending: false });

        if (error) throw error;
        if (data && data.length > 0) {
          return data.map((c) => ({
            id: c.id,
            title: c.title,
            issuer: c.issuer,
            issuerLogo: c.issuer_logo || matchOrganizationLogo(c.issuer),
            issueDate: c.issue_date,
            expirationDate: c.expiration_date,
            category: c.category || "General",
            description: c.description,
            skills: Array.isArray(c.skills) ? c.skills : JSON.parse(c.skills || "[]"),
            credentialId: c.credential_id,
            credentialUrl: c.credential_url,
            imageUrl: c.image_url,
            featured: Boolean(c.featured)
          }));
        }
      } catch (err) {
        console.warn("Supabase fetch fallback to local store:", err.message);
      }
    }
    return getLocalCertificates();
  },

  async create(cert) {
    const newCert = {
      ...cert,
      id: cert.id || `cert-${Date.now()}`,
      issuerLogo: cert.issuerLogo || matchOrganizationLogo(cert.issuer)
    };

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("certificates")
          .insert([
            {
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
              featured: newCert.featured
            }
          ])
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (err) {
        console.warn("Supabase insert error, persisting locally:", err.message);
      }
    }

    const current = getLocalCertificates();
    const updated = [newCert, ...current];
    saveLocalCertificates(updated);
    return newCert;
  },

  async update(id, updates) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
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
            featured: updates.featured
          })
          .eq("id", id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (err) {
        console.warn("Supabase update error, falling back locally:", err.message);
      }
    }

    const current = getLocalCertificates();
    const updated = current.map((c) => (c.id === id ? { ...c, ...updates } : c));
    saveLocalCertificates(updated);
    return updated.find((c) => c.id === id);
  },

  async delete(id) {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from("certificates")
          .delete()
          .eq("id", id);
        if (error) throw error;
      } catch (err) {
        console.warn("Supabase delete error, falling back locally:", err.message);
      }
    }

    const current = getLocalCertificates();
    const updated = current.filter((c) => c.id !== id);
    saveLocalCertificates(updated);
    return true;
  },

  async uploadCertificateImage(file) {
    if (isSupabaseConfigured) {
      try {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `certificates/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("certificates")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("certificates")
          .getPublicUrl(filePath);

        return data.publicUrl;
      } catch (err) {
        console.warn("Supabase storage upload error:", err.message);
      }
    }

    // Local fallback: convert to base64 Data URL for persistent storage
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
};
