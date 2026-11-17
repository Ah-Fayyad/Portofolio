import React from "react";
import { projectsData } from "../../data/portfolioData";
import { ExternalLink, Github, Trophy } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "../common/Reveal";
import { motion, useReducedMotion } from "framer-motion";

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold text-sky-500 mb-2">
            Selected Works
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Featured Projects
          </h2>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base">
            Real-world full-stack and frontend applications demonstrating system architecture, state management, and real-time integration.
          </p>
          <div className="w-12 h-1 bg-sky-500 rounded-full mx-auto mt-4" />
        </Reveal>

        {/* Projects List with Scroll Triggered Reveal */}
        <div className="space-y-12">
          {projectsData.map((project, idx) => {
            const isLead = idx === 0; // Graduation project
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden bg-card/80 backdrop-blur-xs shadow-lg hover:shadow-xl ${
                  isLead
                    ? "border-sky-500/40 ring-1 ring-sky-500/20"
                    : "border-border hover:border-sky-500/30"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  
                  {/* Media Column */}
                  <div className="lg:col-span-5 relative bg-slate-950 flex items-center justify-center overflow-hidden min-h-[260px] lg:min-h-full">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                    {/* Award Badge if present */}
                    {project.awardBadge && (
                      <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wide backdrop-blur-md bg-slate-900/90 border border-amber-500/40 text-amber-300 shadow-md">
                        <Trophy size={14} className="text-amber-400" />
                        <span>{project.awardBadge}</span>
                      </div>
                    )}
                  </div>

                  {/* Content Column */}
                  <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                            Featured Project
                          </span>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-sky-500 dark:text-sky-400 mb-4">
                        {project.subtitle}
                      </p>

                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Technical highlights */}
                      {project.extendedHighlights && (
                        <div className="space-y-2 mb-6">
                          {project.extendedHighlights.slice(0, 3).map((hl, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/85">
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                              <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/50 text-foreground/90"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
                      {project.live && (
                        <motion.a
                          whileHover={shouldReduceMotion ? {} : { y: -2 }}
                          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm bg-linear-to-r from-sky-500 to-indigo-600 text-white shadow-xs hover:shadow-md hover:shadow-sky-500/25 transition-all flex items-center gap-2"
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={14} />
                        </motion.a>
                      )}

                      {project.github && (
                        <motion.a
                          whileHover={shouldReduceMotion ? {} : { y: -2 }}
                          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm border border-border bg-card hover:bg-muted text-foreground transition-all flex items-center gap-2"
                        >
                          <Github size={15} />
                          <span>View Code</span>
                        </motion.a>
                      )}
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
