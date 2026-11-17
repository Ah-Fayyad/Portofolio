import React from "react";
import { experienceData } from "../../data/portfolioData";
import { Calendar, CheckCircle2 } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "../common/Reveal";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold text-sky-500 mb-2">
            Engineering Milestones
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Practical Project Experience
          </h2>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base">
            Verified capstone leadership and practical application development distinguishing academic achievements from full-stack system delivery.
          </p>
          <div className="w-12 h-1 bg-sky-500 rounded-full mx-auto mt-4" />
        </Reveal>

        {/* Timeline List with Staggered Scroll Animation */}
        <StaggerGroup className="max-w-3xl mx-auto space-y-8" stagger={0.15}>
          {experienceData.map((exp, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="p-7 sm:p-9 rounded-3xl border border-border bg-card/70 hover:border-sky-500/30 transition-colors shadow-xs relative"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-foreground">
                    {exp.role}
                  </h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full w-fit">
                    <Calendar size={13} />
                    {exp.period}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-sm font-semibold text-foreground/90">
                    {exp.project}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium">
                    {exp.type}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">
                  {exp.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-border/70">
                  {exp.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-foreground/85">
                      <CheckCircle2 size={15} className="text-sky-500 mt-1 shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

      </div>
    </section>
  );
}
