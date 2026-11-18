import { openDB } from "idb";
import { initialCertificates, organizationLogos } from "../data/portfolioData";
import { createClient } from "@supabase/supabase-js";

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

// Persistent IndexedDB Store (Can store hundreds of megabytes of high-res images permanently)
const DB_NAME = "ahmed_portfolio_db";
const DB_VERSION = 1;
const STORE_NAME = "certificates";

async function getDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}

// Compress image to ensure optimal load times & storage durability
async function compressImageToDataUrl(file, maxWidth = 1600, quality = 0.85) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// Initialize and seed default certificates if IndexedDB is empty
async function getStoredCertificates() {
  try {
    const db = await getDB();
    const all = await db.getAll(STORE_NAME);
    if (!all || all.length === 0) {
      // Seed initial
      const tx = db.transaction(STORE_NAME, "readwrite");
      for (const cert of initialCertificates) {
        await tx.store.put(cert);
      }
      await tx.done;
      return initialCertificates;
    }
    return all;
  } catch (err) {
    console.error("IndexedDB read error, falling back to initial data:", err);
    return initialCertificates;
  }
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
    return await getStoredCertificates();
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

    // Persist permanently in IndexedDB
    const db = await getDB();
    await db.put(STORE_NAME, newCert);
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

    // Persist permanently in IndexedDB
    const db = await getDB();
    const existing = (await db.get(STORE_NAME, id)) || {};
    const updated = { ...existing, ...updates, id };
    await db.put(STORE_NAME, updated);
    return updated;
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

    // Delete permanently from IndexedDB
    const db = await getDB();
    await db.delete(STORE_NAME, id);
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

    // Local permanent mode: Compress & save as high-quality persistent Data URL
    return await compressImageToDataUrl(file);
  }
};
