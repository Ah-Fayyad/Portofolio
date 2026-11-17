import React, { useState } from "react";
import { personalInfo } from "../../data/portfolioData";
import { Mail, Phone, Send, CheckCircle, MapPin, Github, Linkedin } from "lucide-react";
import { Reveal } from "../common/Reveal";
import { motion, useReducedMotion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        `Portfolio Inquiry from ${formData.name}`
      )}&body=${encodeURIComponent(
        `From: ${formData.name} (${formData.email})\n\n${formData.message}`
      )}`;
      window.open(mailtoUrl, "_blank");
    }, 600);
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold text-sky-500 mb-2">
            Let's Connect
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Contact Information
          </h2>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base">
            Open to frontend developer positions, software engineering opportunities, and technical collaborations.
          </p>
          <div className="w-12 h-1 bg-sky-500 rounded-full mx-auto mt-4" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Quick Channels Column with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            <motion.a
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/70 hover:border-sky-500/50 hover:bg-card transition-colors shadow-xs group"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Mail size={22} />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs text-muted-foreground font-medium">Direct Email</div>
                <div className="text-sm font-bold text-foreground truncate">{personalInfo.email}</div>
              </div>
            </motion.a>

            <motion.a
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              href="https://wa.me/201014563940"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/70 hover:border-emerald-500/50 hover:bg-card transition-colors shadow-xs group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone size={22} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium">WhatsApp / Mobile</div>
                <div className="text-sm font-bold text-foreground">{personalInfo.phone}</div>
              </div>
            </motion.a>

            <motion.a
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/70 hover:border-sky-500/50 hover:bg-card transition-colors shadow-xs group"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-600/10 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Linkedin size={22} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium">LinkedIn Profile</div>
                <div className="text-sm font-bold text-foreground">ahmad-fayyad-97a727265</div>
              </div>
            </motion.a>

            <motion.a
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card/70 hover:border-slate-500/50 hover:bg-card transition-colors shadow-xs group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-500/10 text-slate-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Github size={22} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium">GitHub Repository</div>
                <div className="text-sm font-bold text-foreground">github.com/Ah-Fayyad</div>
              </div>
            </motion.a>

            <div className="flex items-center gap-2 p-4 text-xs text-muted-foreground">
              <MapPin size={15} className="text-sky-500" />
              <span>Based in Cairo, Egypt (UTC+2) • Available for Remote &amp; On-Site Roles</span>
            </div>

          </motion.div>

          {/* Contact Form Column with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="p-7 sm:p-9 rounded-3xl border border-border bg-card/80 backdrop-blur-xs shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Send a Direct Message
              </h3>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                  <CheckCircle size={36} className="text-emerald-500 mx-auto" />
                  <h4 className="text-base font-bold text-foreground">Message Dispatched!</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Your email client was opened with the message content ready. I will respond to your inquiry promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="mt-2 text-xs font-semibold text-sky-500 underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Connor"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-muted/40 text-sm text-foreground focus:border-sky-500 focus:bg-background transition-all outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Your Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-muted/40 text-sm text-foreground focus:border-sky-500 focus:bg-background transition-all outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Discuss project requirements, hiring opportunity, or questions..."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-muted/40 text-sm text-foreground focus:border-sky-500 focus:bg-background transition-all outline-hidden resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={shouldReduceMotion ? {} : { y: -1 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-full font-semibold text-sm bg-linear-to-r from-sky-500 to-indigo-600 text-white shadow-md hover:shadow-lg hover:shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {loading ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
