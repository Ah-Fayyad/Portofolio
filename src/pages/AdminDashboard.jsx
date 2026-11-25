import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CertificateService,
  matchOrganizationLogo,
  isSupabaseConfigured,
  supabase
} from "../lib/supabaseClient";
import { extractCertificateMetadataFromFilenameAndText } from "../lib/certificateExtractor";
import { performClientOCR } from "../lib/ocrService";
import { processPdfCertificate } from "../lib/pdfService";
import {
  Award,
  Trash2,
  Edit3,
  Upload,
  CheckCircle2,
  Sparkles,
  Lock,
  LogOut,
  AlertCircle,
  Eye,
  Search,
  X,
  GripVertical
} from "lucide-react";

async function dataUrlToFile(dataUrl, fileName) {
  const response = await fetch(dataUrl);
  if (!response.ok) throw new Error("Could not prepare the certificate preview for upload.");
  const blob = await response.blob();
  const extension = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp"
  }[blob.type] || "jpg";
  const baseName = fileName.replace(/\.[^.]+$/, "");
  return new File([blob], `${baseName}.${extension}`, {
    type: blob.type || "image/jpeg"
  });
}

export default function AdminDashboard() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");

  // Certificate Management State
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [certificatesError, setCertificatesError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [adminSelectedCategory, setAdminSelectedCategory] = useState("All");
  const [editingCert, setEditingCert] = useState(null);
  const [draggedCertificateId, setDraggedCertificateId] = useState(null);
  const [isReorderingCertificates, setIsReorderingCertificates] = useState(false);
  const [reorderFeedback, setReorderFeedback] = useState("");
  const [reorderError, setReorderError] = useState(false);

  // Form State
  const emptyForm = {
    title: "",
    issuer: "",
    issuerLogo: "",
    issueDate: new Date().getFullYear().toString(),
    expirationDate: "",
    category: "Frontend Development",
    description: "",
    skillsString: "",
    credentialId: "",
    credentialUrl: "",
    imageUrl: "",
    featured: false
  };
  const [form, setForm] = useState(emptyForm);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState("");
  const [isScanningAI, setIsScanningAI] = useState(false);
  const [aiScanFeedback, setAiScanFeedback] = useState(null);
  const [aiScanError, setAiScanError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Restore only a real Supabase Auth session.
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthLoading(false);
      return;
    }

    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) {
        setIsAuthenticated(Boolean(session));
        setAuthLoading(false);
      }
    });

    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (!active) return;
        if (error) setAuthError(`Could not restore Supabase session: ${error.message}`);
        setIsAuthenticated(Boolean(data.session));
        setAuthLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setAuthError(`Could not restore Supabase session: ${err.message}`);
        setAuthLoading(false);
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  // Fetch certificates once authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCertificates();
    }
  }, [isAuthenticated]);

  async function loadCertificates() {
    setLoading(true);
    setCertificatesError("");
    try {
      const data = await CertificateService.getAll();
      setCertificates(data);
    } catch (err) {
      console.error("Could not load certificates:", err);
      setCertificates([]);
      setCertificatesError(err.message || "Could not load certificates from Supabase.");
    } finally {
      setLoading(false);
    }
  }

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (!isSupabaseConfigured) {
      setAuthError("Supabase is not configured. Set its project URL and public anon key in the deployment environment.");
      return;
    }

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: authEmail.trim(),
          password: authPassword
        });
        if (error) throw error;
      } catch (err) {
        setAuthError(err.message || "Invalid authentication credentials.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setIsAuthenticated(false);
    } catch (err) {
      setAuthError(`Could not sign out: ${err.message}`);
    }
  };

  // Image Upload Handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
        const pdfResult = await processPdfCertificate(file);
        if (pdfResult.imageUrl) {
          const previewFile = await dataUrlToFile(pdfResult.imageUrl, "certificate-preview.jpg");
          const uploadedUrl = await CertificateService.uploadCertificateImage(previewFile);
          setForm((prev) => ({ ...prev, imageUrl: uploadedUrl }));
          return;
        }
        throw new Error("Could not create an image preview from this PDF.");
      }
      const uploadedUrl = await CertificateService.uploadCertificateImage(file);
      setForm((prev) => ({ ...prev, imageUrl: uploadedUrl }));
    } catch (err) {
      console.error("Image upload failed:", err);
      setAiScanError(true);
      setAiScanFeedback(err.message || "Could not upload the image to Supabase.");
    } finally {
      e.target.value = "";
    }
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(",")[1]);
      reader.onerror = () => reject(new Error("Could not read the selected file."));
      reader.readAsDataURL(file);
    });

  // 100% Automatic Intelligent Certificate Scanner (Gemini Vision first, local OCR fallback)
  const handleAICertificateScan = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsScanningAI(true);
    setAiScanError(false);
    setAiScanFeedback("Preparing certificate for AI analysis...");

    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isImage =
      ["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
      /\.(jpe?g|png|webp)$/i.test(file.name);

    if (!isPdf && !isImage) {
      setAiScanError(true);
      setAiScanFeedback("Unsupported file type. Please upload a JPG, PNG, WebP, or PDF certificate.");
      setIsScanningAI(false);
      e.target.value = "";
      return;
    }

    try {
      let extractedData = null;
      let ocrText = "";
      let renderedPdfImage = null;
      let aiFallbackReason = "";

      // 1. If it's a PDF, extract digital text AND render page 1 to a crisp JPEG locally
      if (isPdf) {
        const pdfResult = await processPdfCertificate(file, (msg) => setAiScanFeedback(msg));
        ocrText = pdfResult.text || "";
        renderedPdfImage = pdfResult.imageUrl || null;
      }

      // 2. Try Serverless AI Gemini Vision FIRST (fast, accurate; avoids slow Tesseract when AI works)
      setAiScanFeedback("Analyzing certificate with Gemini AI...");
      try {
        const aiPayload = renderedPdfImage
          ? { base64: renderedPdfImage.split(",")[1], mimeType: "image/jpeg" }
          : { base64: await fileToBase64(file), mimeType: file.type || "image/jpeg" };

        const response = await fetch("/api/gemini-certificate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(aiPayload)
        });

        const contentType = response.headers.get("content-type") || "";
        if (response.ok && contentType.includes("application/json")) {
          const aiResult = await response.json();
          if (aiResult && !aiResult.error && aiResult.title) {
            extractedData = {
              title: aiResult.title || "",
              issuer: aiResult.issuer || "",
              issuerLogo: aiResult.issuerDomain || "",
              issueDate: aiResult.issueDate || "",
              category: aiResult.category || "Software & Web Development",
              skillsString: Array.isArray(aiResult.skills)
                ? aiResult.skills.join(", ")
                : (aiResult.skills || ""),
              credentialId: aiResult.credentialId || "",
              credentialUrl: aiResult.credentialUrl || "",
              description: aiResult.description || ""
            };
          } else if (aiResult?.error) {
            aiFallbackReason = aiResult.error;
          }
        } else {
          aiFallbackReason = "API_UNAVAILABLE";
        }
      } catch (aiErr) {
        console.warn("Serverless AI skipped:", aiErr);
        aiFallbackReason = "API_UNAVAILABLE";
      }

      // 3. Fallback to local OCR + Pattern Extractor only when Gemini AI is unavailable
      if (!extractedData) {
        if (isImage) {
          ocrText = await performClientOCR(file, (msg) => setAiScanFeedback(msg));
        } else if (isPdf && ocrText.trim().length < 20 && renderedPdfImage) {
          // Scanned/image-only PDF with no embedded text
          const pdfImgFile = await dataUrlToFile(renderedPdfImage, "pdf-page-1.jpg");
          ocrText = await performClientOCR(pdfImgFile, (msg) => setAiScanFeedback(msg));
        }
        extractedData = extractCertificateMetadataFromFilenameAndText(file.name, ocrText);
      }

      // Check if extracted category is custom
      const standardCategories = [
        "Software & Web Development",
        "Tech & Computer Science",
        "Soft Skills & Leadership",
        "English & Languages",
        "Workshops & Hackathons",
        "Frontend Development"
      ];
      if (!standardCategories.includes(extractedData.category)) {
        setIsCustomCategory(true);
        setCustomCategoryInput(extractedData.category);
      } else {
        setIsCustomCategory(false);
      }

      // Attach the image: either the generated PDF page 1 image or the uploaded picture
      let finalImageUrl = "";
      if (renderedPdfImage) {
        const previewFile = await dataUrlToFile(renderedPdfImage, "certificate-preview.jpg");
        finalImageUrl = await CertificateService.uploadCertificateImage(previewFile);
      } else if (isImage) {
        finalImageUrl = await CertificateService.uploadCertificateImage(file);
      }

      setForm((prev) => ({
        ...prev,
        ...extractedData,
        imageUrl: finalImageUrl || prev.imageUrl,
        issuerLogo: extractedData.issuerLogo || matchOrganizationLogo(extractedData.issuer)
      }));

      if (aiFallbackReason) {
        const reasonHint =
          aiFallbackReason === "NO_API_KEY"
            ? "GEMINI_API_KEY is not configured on the server"
            : aiFallbackReason === "API_UNAVAILABLE"
              ? "Serverless /api/gemini-certificate is not running locally (use `vercel dev` or deploy to Vercel)"
              : "Gemini API fallback triggered";
        setAiScanFeedback(
          `⚠️ Scanned using local OCR fallback (${reasonHint}). Review details and click Publish.`
        );
      } else {
        setAiScanFeedback("✨ Certificate scanned with Gemini AI! Review details and click Publish.");
      }
    } catch (err) {
      console.error("Auto scan failed:", err);
      setAiScanError(true);
      setAiScanFeedback(err.message || "Certificate scan or upload failed. Please try again.");
    } finally {
      setIsScanningAI(false);
      e.target.value = "";
    }
  };

  // Save Certificate
  const handleSaveCertificate = async (e) => {
    e.preventDefault();
    setSaveError("");
    setSaveSuccess(false);
    const skillsArray = form.skillsString
      ? form.skillsString.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const certPayload = {
      title: form.title,
      issuer: form.issuer,
      issuerLogo: form.issuerLogo || matchOrganizationLogo(form.issuer),
      issueDate: form.issueDate,
      expirationDate: form.expirationDate || null,
      category: form.category,
      description: form.description,
      skills: skillsArray,
      credentialId: form.credentialId,
      credentialUrl: form.credentialUrl,
      imageUrl: form.imageUrl,
      featured: form.featured,
      sortOrder:
        editingCert?.sortOrder ??
        certificates.reduce(
          (highest, certificate) => Math.max(highest, certificate.sortOrder ?? -1),
          -1
        ) + 1
    };

    try {
      if (editingCert) {
        await CertificateService.update(editingCert.id, certPayload);
      } else {
        await CertificateService.create(certPayload);
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setForm(emptyForm);
      setEditingCert(null);
      await loadCertificates();
    } catch (err) {
      console.error("Could not save certificate:", err);
      setSaveError(err.message || "Could not save certificate to Supabase.");
    }
  };

  // Delete Certificate
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this certificate? This action cannot be undone.")) {
      try {
        await CertificateService.delete(id);
        await loadCertificates();
      } catch (err) {
        console.error("Could not delete certificate:", err);
        setCertificatesError(err.message || "Could not delete certificate from Supabase.");
      }
    }
  };

  const handleCertificateDrop = async (targetId) => {
    if (
      !draggedCertificateId ||
      draggedCertificateId === targetId ||
      isReorderingCertificates
    ) {
      return;
    }

    const reordered = [...certificates];
    const sourceIndex = reordered.findIndex((cert) => cert.id === draggedCertificateId);
    const targetIndex = reordered.findIndex((cert) => cert.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0) return;

    const [movedCertificate] = reordered.splice(sourceIndex, 1);
    reordered.splice(targetIndex, 0, movedCertificate);
    setIsReorderingCertificates(true);
    setReorderFeedback("");
    setReorderError(false);

    try {
      await CertificateService.reorder(reordered.map((cert) => cert.id));
      setCertificates(reordered.map((cert, sortOrder) => ({ ...cert, sortOrder })));
      setReorderFeedback("Certificate order saved.");
    } catch (err) {
      console.error("Could not save certificate order:", err);
      setReorderError(true);
      setReorderFeedback(err.message || "Could not save certificate order.");
    } finally {
      setDraggedCertificateId(null);
      setIsReorderingCertificates(false);
    }
  };

  // Populate Edit Form
  const startEdit = (cert) => {
    setEditingCert(cert);
    const standardCategories = [
      "Frontend Development",
      "Full-Stack & Backend",
      "Computer Science",
      "Cloud & DevOps",
      "General"
    ];
    if (cert.category && !standardCategories.includes(cert.category)) {
      setIsCustomCategory(true);
      setCustomCategoryInput(cert.category);
    } else {
      setIsCustomCategory(false);
      setCustomCategoryInput("");
    }

    setForm({
      title: cert.title || "",
      issuer: cert.issuer || "",
      issuerLogo: cert.issuerLogo || "",
      issueDate: cert.issueDate || "",
      expirationDate: cert.expirationDate || "",
      category: cert.category || "Frontend Development",
      description: cert.description || "",
      skillsString: cert.skills ? cert.skills.join(", ") : "",
      credentialId: cert.credentialId || "",
      credentialUrl: cert.credentialUrl || "",
      imageUrl: cert.imageUrl || "",
      featured: Boolean(cert.featured)
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Filtered for Admin Table
  const filteredCerts = certificates.filter((c) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      c.title.toLowerCase().includes(q) ||
      c.issuer.toLowerCase().includes(q) ||
      (c.skills && c.skills.some((s) => s.toLowerCase().includes(q)));
    const matchesCat =
      adminSelectedCategory === "All" || c.category === adminSelectedCategory;
    return matchesSearch && matchesCat;
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 1. Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
        <div className="w-full max-w-md p-8 rounded-3xl border border-sky-500/30 bg-card shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center mx-auto mb-4">
              <Lock size={28} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Admin Portal
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Private access for Ahmed Fayyad to manage certifications &amp; portfolio content.
            </p>
          </div>

          {!isSupabaseConfigured && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-center gap-2 mb-5">
              <AlertCircle size={16} className="shrink-0" />
              <span>Admin access requires Supabase. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then redeploy.</span>
            </div>
          )}

          {authError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs flex items-center gap-2 mb-5">
              <AlertCircle size={16} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {isSupabaseConfigured && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Supabase account email
                </label>
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="Admin email"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/40 text-sm focus:border-sky-500 outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="Enter your Supabase password"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/40 text-sm focus:border-sky-500 outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full font-semibold text-sm bg-linear-to-r from-sky-500 to-indigo-600 text-white shadow-md hover:shadow-lg hover:shadow-sky-500/25 transition-all"
              >
                Sign In to Dashboard
              </button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-border text-center">
            <Link to="/" className="text-xs text-sky-500 hover:underline">
              ← Return to Public Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Admin Dashboard View
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Top Admin Navbar */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-xs">
            AF
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">Certifications Manager</h2>
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Connected to Supabase</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/certifications"
            target="_blank"
            className="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-border bg-card hover:bg-muted text-muted-foreground flex items-center gap-1.5"
          >
            <Eye size={13} />
            <span>View Public Gallery</span>
          </Link>
          <button
            onClick={handleLogout}
            className="p-2 rounded-full border border-border hover:bg-rose-500/10 hover:text-rose-500 transition-colors"
            title="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto py-10 px-4 space-y-10">
        
        {/* AI Scanner Banner */}
        <div className="p-6 rounded-3xl border border-sky-500/30 bg-linear-to-r from-sky-500/10 via-indigo-500/10 to-sky-500/10 shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base sm:text-lg flex items-center gap-2">
                  <span>AI Certificate Scanner</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-semibold">
                    Gemini Vision
                  </span>
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Upload a certificate image or PDF — AI will automatically extract Title, Issuer, Date, and Skills!
                </p>
              </div>
            </div>

            <label className="px-5 py-2.5 rounded-full font-semibold text-xs bg-sky-500 hover:bg-sky-600 text-white cursor-pointer shadow-md transition-all flex items-center gap-2 shrink-0">
              <Upload size={14} />
              <span>{isScanningAI ? "Auto Scanning Certificate..." : "Scan & Auto-Fill Certificate"}</span>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleAICertificateScan}
                className="hidden"
                disabled={isScanningAI}
              />
            </label>
          </div>

          {aiScanFeedback && (
            <div className={`mt-4 p-3 rounded-xl border text-xs flex items-center gap-2 ${
              aiScanError
                ? "bg-rose-500/15 border-rose-500/30 text-rose-300"
                : "bg-sky-500/15 border-sky-500/30 text-sky-300"
            }`}>
              {aiScanError
                ? <AlertCircle size={16} className="shrink-0" />
                : <CheckCircle2 size={16} className="shrink-0" />}
              <span>{aiScanFeedback}</span>
            </div>
          )}
        </div>

        {/* Certificate Form (Add / Edit) */}
        <div className="p-7 sm:p-9 rounded-3xl border border-border bg-card shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Award size={20} className="text-sky-500" />
              <span>{editingCert ? "Edit Certificate" : "Add New Certificate"}</span>
            </h3>

            {editingCert && (
              <button
                onClick={() => {
                  setEditingCert(null);
                  setForm(emptyForm);
                }}
                className="text-xs text-muted-foreground hover:text-foreground underline"
              >
                Cancel Editing
              </button>
            )}
          </div>

          {saveSuccess && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs flex items-center gap-2 mb-6">
              <CheckCircle2 size={16} />
              <span>Certificate saved successfully! Changes are immediately live in the public gallery.</span>
            </div>
          )}
          {saveError && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 mb-6">
              <AlertCircle size={16} />
              <span>{saveError}</span>
            </div>
          )}

          <form onSubmit={handleSaveCertificate} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                  Certificate Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Frontend Development Diploma"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm focus:border-sky-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  required
                  value={form.issuer}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm({
                      ...form,
                      issuer: val,
                      issuerLogo: matchOrganizationLogo(val) || form.issuerLogo
                    });
                  }}
                  placeholder="e.g. Almdrasa, Google, Meta, IBM, AWS"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm focus:border-sky-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                  Issue Date / Year *
                </label>
                <input
                  type="text"
                  required
                  value={form.issueDate}
                  onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                  placeholder="e.g. 2024 or Nov 2024"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm focus:border-sky-500 outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-2">
                  Certificate Track / Category *
                </label>
                
                {/* Visual Category Selection Pills */}
                <div className="flex flex-wrap gap-2 mb-2.5">
                  {[
                    "Software & Web Development",
                    "Tech & Computer Science",
                    "Soft Skills & Leadership",
                    "English & Languages",
                    "Workshops & Hackathons",
                    "Frontend Development"
                  ].map((track) => {
                    const isSelected = !isCustomCategory && form.category === track;
                    return (
                      <button
                        key={track}
                        type="button"
                        onClick={() => {
                          setIsCustomCategory(false);
                          setForm({ ...form, category: track });
                        }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25 scale-[1.02]"
                            : "bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground border-border"
                        }`}
                      >
                        {track}
                      </button>
                    );
                  })}
                  
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomCategory(true);
                      setForm({ ...form, category: customCategoryInput || "Custom Track" });
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isCustomCategory
                        ? "bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25 scale-[1.02]"
                        : "bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground border-border"
                    }`}
                  >
                    + Other (Custom...)
                  </button>
                </div>

                {isCustomCategory && (
                  <input
                    type="text"
                    required
                    value={customCategoryInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCustomCategoryInput(val);
                      setForm({ ...form, category: val });
                    }}
                    placeholder="Type your custom track name (e.g. AI & Data Science, Public Speaking...)"
                    className="w-full px-4 py-2.5 rounded-xl border border-sky-500/40 bg-sky-500/5 text-sm focus:border-sky-500 outline-hidden"
                  />
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                  Credential ID (Optional)
                </label>
                <input
                  type="text"
                  value={form.credentialId}
                  onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
                  placeholder="e.g. ALM-FE-2024"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm focus:border-sky-500 outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                  Verification URL (Optional)
                </label>
                <input
                  type="url"
                  value={form.credentialUrl}
                  onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm focus:border-sky-500 outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                Skills Covered (comma separated)
              </label>
              <input
                type="text"
                value={form.skillsString}
                onChange={(e) => setForm({ ...form, skillsString: e.target.value })}
                placeholder="React.js, TypeScript, Tailwind CSS, REST APIs, Git"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm focus:border-sky-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                Description &amp; Highlights
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Brief summary of certificate curriculum and key accomplishments..."
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-muted/30 text-sm focus:border-sky-500 outline-hidden resize-none"
              />
            </div>

            {/* Certificate Image Upload & Preview */}
            <div>
              <label className="block text-xs font-bold uppercase text-muted-foreground mb-1.5">
                Certificate Image File
              </label>
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleImageUpload}
                  className="text-xs file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-sky-500/10 file:text-sky-500 hover:file:bg-sky-500/20 cursor-pointer"
                />
                {form.imageUrl && (
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-emerald-500 font-medium flex items-center gap-1.5 whitespace-nowrap bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full">
                      <CheckCircle2 size={13} className="shrink-0" />
                      <span>Image Ready</span>
                    </span>
                    <div className="flex items-center gap-1.5 bg-muted/40 p-1 rounded-lg border border-border">
                      <img
                        src={form.imageUrl}
                        alt="Certificate Preview"
                        className="w-10 h-7 object-cover rounded border border-border shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, imageUrl: "" }))}
                        className="p-1 text-muted-foreground hover:text-rose-500 rounded-md transition-colors cursor-pointer"
                        title="Remove image"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="featured"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded border-border"
              />
              <label htmlFor="featured" className="text-xs font-semibold text-foreground cursor-pointer">
                Highlight as Featured Certificate
              </label>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm bg-linear-to-r from-sky-500 to-indigo-600 text-white shadow-md hover:shadow-lg transition-all"
              >
                {editingCert ? "Update Certificate" : "Publish Certificate"}
              </button>
            </div>
          </form>
        </div>

        {/* Existing Certificates Management Table */}
        <div className="p-7 sm:p-9 rounded-3xl border border-border bg-card shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-foreground">
                Existing Certificates ({filteredCerts.length})
              </h3>
              <p className="text-xs text-muted-foreground">
                Manage, edit, or delete credentials from your persistent database.
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certificates..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-border bg-muted/30 outline-hidden"
              />
            </div>
          </div>

          {/* Quick Filter Pills in Admin Table */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {["All", ...new Set(certificates.map((c) => c.category || "General"))].map((cat) => {
              const isSelected = adminSelectedCategory === cat;
              const count = cat === "All" ? certificates.length : certificates.filter((c) => c.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setAdminSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-sky-500 text-white border-sky-400 shadow-xs"
                      : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border-border"
                  }`}
                >
                  <span>{cat}</span>
                  <span className="ml-1.5 opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          {reorderFeedback && (
            <p className={`text-xs ${reorderError ? "text-rose-400" : "text-emerald-400"}`}>
              {reorderFeedback}
            </p>
          )}
          {searchQuery || adminSelectedCategory !== "All" ? (
            <p className="text-xs text-muted-foreground">
              Clear the search and select All to reorder the full certificate list.
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Drag the handle to arrange certificates. The gallery uses this order by default.
            </p>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border text-muted-foreground uppercase font-bold">
                <tr>
                  <th className="py-3 px-2 w-8" aria-label="Drag to reorder" />
                  <th className="py-3 px-3">Title</th>
                  <th className="py-3 px-3 whitespace-nowrap">Issuer</th>
                  <th className="py-3 px-3 whitespace-nowrap">Year</th>
                  <th className="py-3 px-3 whitespace-nowrap">Category</th>
                  <th className="py-3 px-3 text-right whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      Loading certificates...
                    </td>
                  </tr>
                ) : certificatesError ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-rose-400">
                      {certificatesError}
                    </td>
                  </tr>
                ) : filteredCerts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                      No certificates found. Add one above!
                    </td>
                  </tr>
                ) : (
                  filteredCerts.map((cert) => (
                    <tr
                      key={cert.id}
                      draggable={!searchQuery && adminSelectedCategory === "All" && !isReorderingCertificates}
                      onDragStart={(event) => {
                        setDraggedCertificateId(cert.id);
                        event.dataTransfer.effectAllowed = "move";
                        event.dataTransfer.setData("text/plain", cert.id);
                      }}
                      onDragOver={(event) => {
                        if (!searchQuery && adminSelectedCategory === "All") {
                          event.preventDefault();
                          event.dataTransfer.dropEffect = "move";
                        }
                      }}
                      onDrop={(event) => {
                        event.preventDefault();
                        handleCertificateDrop(cert.id);
                      }}
                      onDragEnd={() => setDraggedCertificateId(null)}
                      className={`transition-colors ${
                        draggedCertificateId === cert.id
                          ? "opacity-40"
                          : "hover:bg-muted/30"
                      }`}
                    >
                    <td className="py-3 px-2 text-muted-foreground">
                      <GripVertical
                        size={15}
                        className={`${
                          searchQuery || adminSelectedCategory !== "All"
                            ? "opacity-30"
                            : "cursor-grab active:cursor-grabbing"
                        }`}
                        aria-label="Drag to reorder certificate"
                      />
                    </td>
                    <td className="py-3 px-3 font-semibold text-foreground">
                      <div className="flex items-center gap-2">
                        <span>{cert.title}</span>
                        {cert.featured && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold whitespace-nowrap shrink-0">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground whitespace-nowrap">{cert.issuer}</td>
                    <td className="py-3 px-3 text-muted-foreground whitespace-nowrap">{cert.issueDate}</td>
                    <td className="py-3 px-3 text-muted-foreground whitespace-nowrap">{cert.category}</td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => startEdit(cert)}
                          className="p-1.5 rounded-lg border border-border hover:bg-sky-500/10 hover:text-sky-400 transition-colors cursor-pointer"
                          title="Edit certificate"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button
                          onClick={() => handleDelete(cert.id)}
                          className="p-1.5 rounded-lg border border-border hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                          title="Delete certificate"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
