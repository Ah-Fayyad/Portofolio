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
  Building2,
  Sparkles,
  SlidersHorizontal,
  Code2,
  Users,
  Languages,
  Layers,
  GraduationCap
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

  // Standard predefined categories with icon helpers
  const categoryIcons = {
    "All": <Layers size={14} />,
    "Software & Web Development": <Code2 size={14} />,
    "Tech & Computer Science": <GraduationCap size={14} />,
    "Soft Skills & Leadership": <Users size={14} />,
    "English & Languages": <Languages size={14} />,
    "Workshops & Hackathons": <Sparkles size={14} />,
    "Frontend Development": <Code2 size={14} />
  };

  // Dynamically compute all categories present in the certificates
  const dynamicCategories = Array.from(
    new Set([
      "All",
      "Software & Web Development",
      "Tech & Computer Science",
      "Soft Skills & Leadership",
      "English & Languages",
      "Workshops & Hackathons",
      ...certificates.map((c) => c.category || "General")
    ])
  );

  // Filtering & Sorting
  const filteredCerts = certificates
    .filter((cert) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        !q ||
        cert.title.toLowerCase().includes(q) ||
        cert.issuer.toLowerCase().includes(q) ||
        (cert.skills && cert.skills.some((s) => s.toLowerCase().includes(q)));

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
          className="w-9 h-9 rounded-xl bg-white/10 p-1.5 flex items-center justify-center shrink-0 border border-white/5"
          dangerouslySetInnerHTML={{ __html: org.svg }}
          title={org.name}
        />
      );
    }
    return (
      <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0 font-bold text-xs border border-sky-500/20">
        <Building2 size={18} />
      </div>
    );
  };

  // Helper count badges
  const getCategoryCount = (cat) => {
    if (cat === "All") return certificates.length;
    return certificates.filter((c) => c.category === cat).length;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Top Return link */}
          <Reveal>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-sky-400 transition-colors mb-6 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Main Portfolio</span>
            </Link>
          </Reveal>

          {/* Hero Heading Section */}
          <Reveal delay={0.08} className="mb-10 text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 pb-6 border-b border-border">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-3">
                <Award size={14} />
                <span>Verified Credentials &amp; Achievements</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
                Certifications Gallery
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-2xl">
                Official certificates, technical track diplomas, soft skills, and leadership programs completed by Ahmed Fayyad.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs font-semibold text-muted-foreground bg-card/80 px-4 py-2.5 rounded-2xl border border-border shadow-xs">
                Total Credentials: <span className="text-sky-400 font-bold ml-1 text-sm">{certificates.length}</span>
              </div>
            </div>
          </Reveal>

          {/* Dynamic Interactive Filter Buttons (Color Pills as requested) */}
          <Reveal delay={0.12} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <SlidersHorizontal size={14} className="text-sky-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Filter by Certificate Track
              </span>
            </div>

            {/* Scrollable button bar on mobile, wrapped pills on desktop */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none flex-nowrap sm:flex-wrap">
              {dynamicCategories.map((cat) => {
                const count = getCategoryCount(cat);
                const isSelected = selectedCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shrink-0 cursor-pointer border ${
                      isSelected
                        ? "bg-sky-500 text-white border-sky-400 shadow-md shadow-sky-500/25 scale-[1.02]"
                        : "bg-card/70 hover:bg-card text-muted-foreground hover:text-foreground border-border hover:border-sky-500/30"
                    }`}
                  >
                    {categoryIcons[cat] || <Award size={14} />}
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-0.5 ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Search Bar & Sorting Toolbar */}
          <Reveal delay={0.16} className="p-3 sm:p-4 rounded-2xl border border-border bg-card/60 backdrop-blur-md mb-10 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search certificate title, issuer, or skills..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-border bg-muted/40 text-foreground placeholder:text-muted-foreground/60 focus:border-sky-500 outline-hidden"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <span className="text-xs text-muted-foreground hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3.5 py-2 text-xs rounded-xl border border-border bg-muted/40 text-foreground focus:border-sky-500 outline-hidden cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title (A - Z)</option>
              </select>
            </div>
          </Reveal>

          {/* Certificate Grid with Centered Balanced Layout */}
          {loading ? (
            <div className="text-center py-28 space-y-3">
              <div className="w-9 h-9 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-muted-foreground">Loading credentials gallery...</p>
            </div>
          ) : filteredCerts.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border rounded-3xl p-8 max-w-lg mx-auto space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-muted/50 text-muted-foreground flex items-center justify-center mx-auto">
                <Award size={28} />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">No matching certificates found</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  We couldn't find any credential matching your current filter.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border border-sky-500/20 transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <StaggerGroup
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
              stagger={0.08}
            >
              {filteredCerts.map((cert) => (
                <StaggerItem key={cert.id} className="h-full">
                  <motion.article
                    whileHover={shouldReduceMotion ? {} : { y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-3xl border border-border/80 bg-card/80 hover:border-sky-500/50 hover:bg-card hover:shadow-xl hover:shadow-sky-500/5 transition-all flex flex-col overflow-hidden h-full group"
                  >
                    {/* Certificate Thumbnail Header (Aspect Ratio Preserved) */}
                    <div
                      onClick={() => setActiveModalCert(cert)}
                      className="relative aspect-16/10 bg-slate-950/80 overflow-hidden cursor-pointer group/frame border-b border-border/80 flex items-center justify-center"
                    >
                      <img
                        src={cert.imageUrl || "/portofolio.png"}
                        alt={cert.title}
                        className="w-full h-full object-contain p-2.5 transition-transform duration-500 group-hover/frame:scale-105"
                        loading="lazy"
                      />
                      
                      <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover/frame:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <span className="px-4 py-1.5 rounded-full bg-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-sky-500/40">
                          <Eye size={13} />
                          <span>Preview Full Image</span>
                        </span>
                      </div>

                      {/* Featured & Category Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 text-sky-400 border border-sky-500/30 backdrop-blur-md">
                          {cert.category || "General"}
                        </span>
                      </div>

                      {cert.featured && (
                        <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Certificate Card Content */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        {/* Organization Header */}
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

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-sky-400 transition-colors line-clamp-2 leading-snug">
                          {cert.title}
                        </h3>

                        {/* Description */}
                        {cert.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
                            {cert.description}
                          </p>
                        )}
                      </div>

                      {/* Skills Tags */}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/50">
                          {cert.skills.slice(0, 4).map((skill, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-muted/50 text-muted-foreground border border-border"
                            >
                              {skill}
                            </span>
                          ))}
                          {cert.skills.length > 4 && (
                            <span className="px-1.5 py-0.5 text-[10px] text-muted-foreground font-medium">
                              +{cert.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Bottom Action Footer */}
                      <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                        <button
                          onClick={() => setActiveModalCert(cert)}
                          className="font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                        >
                          <Eye size={13} />
                          <span>View Details</span>
                        </button>

                        {cert.credentialUrl ? (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground flex items-center gap-1 font-medium"
                          >
                            <span>Verify</span>
                            <ExternalLink size={12} />
                          </a>
                        ) : cert.credentialId ? (
                          <span className="text-[11px] text-muted-foreground font-mono">
                            ID: {cert.credentialId}
                          </span>
                        ) : (
                          <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                            <ShieldCheck size={12} />
                            <span>Verified</span>
                          </span>
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

      {/* Lightbox Preview Modal */}
      <AnimatePresence>
        {activeModalCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalCert(null)}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative"
            >
              <button
                onClick={() => setActiveModalCert(null)}
                className="absolute top-5 right-5 p-2 rounded-full border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3">
                {renderOrgLogo(activeModalCert)}
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                    {activeModalCert.issuer}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    Issued: {activeModalCert.issueDate || "Verified"}
                  </span>
                </div>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground">
                  {activeModalCert.title}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {activeModalCert.category || "General"}
                  </span>
                  {activeModalCert.featured && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Featured Credential
                    </span>
                  )}
                </div>
              </div>

              {/* Certificate Image Frame */}
              <div className="rounded-2xl overflow-hidden bg-slate-950 border border-border p-2">
                <img
                  src={activeModalCert.imageUrl || "/portofolio.png"}
                  alt={activeModalCert.title}
                  className="w-full max-h-[450px] object-contain rounded-xl mx-auto"
                />
              </div>

              {activeModalCert.description && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Curriculum &amp; Highlights
                  </h4>
                  <p className="text-xs sm:text-sm text-foreground leading-relaxed">
                    {activeModalCert.description}
                  </p>
                </div>
              )}

              {activeModalCert.skills && activeModalCert.skills.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Verified Competencies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalCert.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl text-xs font-medium bg-muted text-foreground border border-border"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Action Footer */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                {activeModalCert.credentialId && (
                  <span className="text-xs text-muted-foreground font-mono">
                    Credential ID: <strong className="text-foreground">{activeModalCert.credentialId}</strong>
                  </span>
                )}

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  {activeModalCert.credentialUrl && (
                    <a
                      href={activeModalCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full text-xs font-semibold bg-sky-500 hover:bg-sky-600 text-white flex items-center gap-1.5 shadow-md transition-all"
                    >
                      <span>Verify on Official Portal</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                  <button
                    onClick={() => setActiveModalCert(null)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
