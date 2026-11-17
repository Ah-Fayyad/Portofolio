import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CertificateService, matchOrganizationLogo } from "../lib/supabaseClient";
import { organizationLogos } from "../data/portfolioData";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Reveal, StaggerGroup, StaggerItem } from "../components/common/Reveal";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Award,
  Search,
  ExternalLink,
  Calendar,
  X,
  ArrowLeft,
  Eye,
  ShieldCheck,
  Building2
} from "lucide-react";

export default function CertificationsPage() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [activeModalCert, setActiveModalCert] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    async function loadCerts() {
      try {
        const data = await CertificateService.getAll();
        setCertificates(data);
      } catch (err) {
        console.error("Failed to load certificates:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCerts();
  }, []);

  // Compute available categories
  const categories = ["All", ...new Set(certificates.map((c) => c.category || "General"))];

  // Filtering & Sorting
  const filteredCerts = certificates
    .filter((cert) => {
      const matchesSearch =
        cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cert.skills && cert.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())));
      const matchesCategory =
        selectedCategory === "All" || cert.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (b.issueDate || "").localeCompare(a.issueDate || "");
      }
      if (sortBy === "oldest") {
        return (a.issueDate || "").localeCompare(b.issueDate || "");
      }
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  // Render Org Logo Helper
  const renderOrgLogo = (cert) => {
    const key = cert.issuerLogo || matchOrganizationLogo(cert.issuer);
    const org = key ? organizationLogos[key] : null;

    if (org && org.svg) {
      return (
        <div
          className="w-8 h-8 rounded-lg bg-white/10 p-1 flex items-center justify-center shrink-0"
          dangerouslySetInnerHTML={{ __html: org.svg }}
          title={org.name}
        />
      );
    }
    return (
      <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0 font-bold text-xs">
        <Building2 size={16} />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Breadcrumb & Header with Scroll Reveal */}
          <div className="mb-10">
            <Reveal>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-sky-500 transition-colors mb-6"
              >
                <ArrowLeft size={14} />
                <span>Back to Main Portfolio</span>
              </Link>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-500 border border-sky-500/20 mb-3">
                  <Award size={14} />
                  <span>Verified Credentials</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
                  Certifications Gallery
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl">
                  Curated digital certificates, professional diplomas, and verified technical credentials with preserved original presentation.
                </p>
              </div>

              <div className="text-xs text-muted-foreground font-medium bg-card px-4 py-2 rounded-xl border border-border w-fit">
                Showing <strong className="text-foreground">{filteredCerts.length}</strong> of{" "}
                <strong className="text-foreground">{certificates.length}</strong> Credentials
              </div>
            </Reveal>
          </div>

          {/* Search, Filter & Sort Controls */}
          <Reveal delay={0.15} className="p-4 sm:p-5 rounded-2xl border border-border bg-card/80 backdrop-blur-xs mb-10 shadow-xs space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
              
              {/* Search Bar */}
              <div className="md:col-span-5 relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, issuer, or skill..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm focus:border-sky-500 outline-hidden"
                />
              </div>

              {/* Category Filter */}
              <div className="md:col-span-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/40 text-sm focus:border-sky-500 outline-hidden text-foreground"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      Category: {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="md:col-span-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/40 text-sm focus:border-sky-500 outline-hidden text-foreground"
                >
                  <option value="newest">Sort: Newest First</option>
                  <option value="oldest">Sort: Oldest First</option>
                  <option value="title">Sort: Title (A-Z)</option>
                </select>
              </div>

            </div>
          </Reveal>

          {/* Certificate Grid with Motion Stagger */}
          {loading ? (
            <div className="text-center py-24 space-y-3">
              <Award size={36} className="text-sky-500 animate-spin mx-auto" />
              <p className="text-sm text-muted-foreground">Loading credentials gallery...</p>
            </div>
          ) : filteredCerts.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border rounded-3xl p-8 space-y-3">
              <Award size={40} className="text-muted-foreground/40 mx-auto" />
              <h3 className="text-lg font-bold text-foreground">No matching certificates found</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Try adjusting your search terms or category filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="text-xs font-semibold text-sky-500 underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" stagger={0.1}>
              {filteredCerts.map((cert) => (
                <StaggerItem key={cert.id}>
                  <motion.article
                    whileHover={shouldReduceMotion ? {} : { y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-3xl border border-border bg-card/70 hover:border-sky-500/40 hover:bg-card transition-colors shadow-md hover:shadow-xl flex flex-col overflow-hidden h-full"
                  >
                    {/* Image Presentation Frame (Preserves Original Aspect Ratio) */}
                    <div
                      onClick={() => setActiveModalCert(cert)}
                      className="relative aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer group/frame border-b border-border/80 flex items-center justify-center"
                    >
                      <img
                        src={cert.imageUrl || "/portofolio.png"}
                        alt={cert.title}
                        className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover/frame:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/frame:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <span className="px-3.5 py-1.5 rounded-full bg-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg">
                          <Eye size={14} />
                          <span>Preview Certificate</span>
                        </span>
                      </div>

                      {/* Featured Ribbon */}
                      {cert.featured && (
                        <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Card Information Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Organization Header with Logo */}
                        <div className="flex items-center gap-3 mb-3">
                          {renderOrgLogo(cert)}
                          <div className="overflow-hidden">
                            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide truncate">
                              {cert.issuer}
                            </h4>
                            <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                              <Calendar size={11} />
                              <span>{cert.issueDate || "Verified"}</span>
                            </span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-2 leading-snug">
                          {cert.title}
                        </h3>

                        <p className="text-xs text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                          {cert.description}
                        </p>

                        {/* Skills Tags */}
                        {cert.skills && cert.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {cert.skills.slice(0, 4).map((skill, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md text-[11px] font-medium border border-border bg-muted/50 text-foreground/80"
                              >
                                {skill}
                              </span>
                            ))}
                            {cert.skills.length > 4 && (
                              <span className="text-[10px] text-muted-foreground self-center">
                                +{cert.skills.length - 4} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Card Actions */}
                      <div className="pt-4 border-t border-border flex items-center justify-between gap-2">
                        <button
                          onClick={() => setActiveModalCert(cert)}
                          className="text-xs font-semibold text-sky-500 hover:text-sky-400 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Eye size={13} />
                          <span>View Details</span>
                        </button>

                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <span>Verify</span>
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>

                    </div>
                  </motion.article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}

        </div>
      </main>

      {/* High-Resolution Modal / Lightbox with AnimatePresence */}
      <AnimatePresence>
        {activeModalCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            onClick={() => setActiveModalCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl rounded-3xl border border-sky-500/30 bg-card p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setActiveModalCert(null)}
                className="absolute top-5 right-5 p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Organization & Title */}
              <div className="flex items-center gap-3.5 mb-6 pr-10">
                {renderOrgLogo(activeModalCert)}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-500">
                    {activeModalCert.issuer} • {activeModalCert.category || "Certificate"}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                    {activeModalCert.title}
                  </h2>
                </div>
              </div>

              {/* Preserved High-Resolution Image Presentation */}
              <div className="rounded-2xl overflow-hidden border border-border bg-slate-950 p-2 sm:p-4 mb-6 flex items-center justify-center shadow-inner">
                <img
                  src={activeModalCert.imageUrl || "/portofolio.png"}
                  alt={activeModalCert.title}
                  className="max-h-[460px] w-auto max-w-full object-contain rounded-lg"
                />
              </div>

              {/* Detailed Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-muted/30 border border-border/80 mb-6 text-xs sm:text-sm">
                <div>
                  <span className="text-muted-foreground block mb-0.5">Issue Date:</span>
                  <strong className="text-foreground">{activeModalCert.issueDate || "N/A"}</strong>
                </div>
                {activeModalCert.credentialId && (
                  <div>
                    <span className="text-muted-foreground block mb-0.5">Credential ID:</span>
                    <code className="px-2 py-0.5 rounded bg-muted font-mono text-foreground">
                      {activeModalCert.credentialId}
                    </code>
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {activeModalCert.description}
              </p>

              {/* Skills */}
              {activeModalCert.skills && activeModalCert.skills.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2">
                    Demonstrated Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalCert.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-semibold border border-sky-500/30 bg-sky-500/10 text-sky-400"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-border">
                {activeModalCert.credentialUrl && (
                  <a
                    href={activeModalCert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm bg-linear-to-r from-sky-500 to-indigo-600 text-white flex items-center gap-1.5 shadow-md"
                  >
                    <ShieldCheck size={16} />
                    <span>Verify Credential on Issuer Website</span>
                  </a>
                )}
                <button
                  onClick={() => setActiveModalCert(null)}
                  className="px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm border border-border bg-card hover:bg-muted text-foreground transition-all cursor-pointer"
                >
                  Close Preview
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
