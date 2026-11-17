import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Award, FileText, Github, Linkedin, Sparkles } from "lucide-react";
import { personalInfo } from "../../data/portfolioData";
import { ThemeContext } from "../../context/ThemeContext";

export default function Hero() {
  const { darkMode } = useContext(ThemeContext);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {darkMode ? (
          <>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-sky-500/10 rounded-full blur-[130px]" />
            <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px]" />
          </>
        ) : (
          <>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-sky-200/40 rounded-full blur-[120px]" />
            <div className="absolute bottom-10 right-10 w-[350px] h-[250px] bg-indigo-100/50 rounded-full blur-[100px]" />
          </>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(14,165,233,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-70" />
      </div>

      <div className="max-w-6xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Staggered CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1"
          >
            {/* Status Pill */}
            <motion.div variants={itemVariants} className="inline-block mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-sky-500/30 bg-sky-500/10 text-sky-500 dark:text-sky-400 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Frontend &amp; Software Engineering Roles
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4 text-foreground"
            >
              Hi, I'm{" "}
              <span className="bg-linear-to-r from-sky-400 via-indigo-400 to-sky-500 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </motion.h1>

            {/* Professional Title */}
            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl font-bold text-slate-700 dark:text-slate-300 mb-5"
            >
              {personalInfo.title}
            </motion.p>

            {/* Bio summary */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Metrics Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {personalInfo.metrics.map((metric, i) => (
                <motion.div
                  key={i}
                  whileHover={shouldReduceMotion ? {} : { y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="p-3.5 rounded-xl border border-border bg-card/60 backdrop-blur-xs text-center transition-colors hover:border-sky-500/40"
                >
                  <div className="text-xl sm:text-2xl font-black bg-linear-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                    {metric.value}
                  </div>
                  <div className="text-xs font-semibold text-foreground/90 mt-0.5">
                    {metric.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground truncate">
                    {metric.sub}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <motion.a
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                href="#projects"
                className="px-6 py-3 rounded-full font-semibold text-sm bg-linear-to-r from-sky-500 to-indigo-600 text-white shadow-md hover:shadow-lg hover:shadow-sky-500/25 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>View Featured Projects</span>
                <ArrowDown size={16} />
              </motion.a>

              <motion.div whileHover={shouldReduceMotion ? {} : { y: -2 }} whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}>
                <Link
                  to="/certifications"
                  className="px-5 py-3 rounded-full font-semibold text-sm border border-sky-500/30 bg-sky-500/10 text-sky-500 dark:text-sky-400 hover:bg-sky-500/20 hover:border-sky-500/50 transition-all flex items-center gap-2"
                >
                  <Award size={16} />
                  <span>Certifications</span>
                </Link>
              </motion.div>

              <motion.a
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                href={personalInfo.cvUrl}
                download
                className="px-5 py-3 rounded-full font-semibold text-sm border border-border bg-card hover:bg-muted text-foreground transition-all flex items-center gap-2"
              >
                <FileText size={16} />
                <span>Download CV</span>
              </motion.a>

              <div className="flex items-center gap-2 pl-1">
                <motion.a
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-border bg-card hover:text-sky-400 hover:border-sky-500/40 transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} />
                </motion.a>
                <motion.a
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-border bg-card hover:text-sky-400 hover:border-sky-500/40 transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </motion.a>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Column: Profile Presentation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center order-1 lg:order-2"
          >
            <div className="relative group max-w-xs sm:max-w-sm w-full">
              
              {/* Decorative Subtle Halo */}
              <div className="absolute -inset-4 bg-linear-to-tr from-sky-500/30 to-indigo-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Framed Container */}
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden border border-sky-500/30 bg-card p-2 shadow-2xl transition-all duration-300 group-hover:border-sky-500/60"
              >
                <div className="aspect-[4/5] w-full rounded-xl overflow-hidden bg-slate-950 relative">
                  <img
                    src="/personal photo.png"
                    alt="Ahmed Fayyad - Frontend Developer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                  
                  {/* Bottom Floating Badge */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl backdrop-blur-md bg-slate-900/80 border border-white/10 text-white flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-sky-400 flex items-center gap-1">
                        <Sparkles size={13} />
                        Graduation Project
                      </div>
                      <div className="text-xs font-bold text-slate-100">
                        Top 80 of 1,000+ Projects
                      </div>
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-medium">
                      2025
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
