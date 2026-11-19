import React from "react";
import { educationData } from "../../data/portfolioData";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";
import { Reveal } from "../common/Reveal";
import { motion, useReducedMotion } from "framer-motion";

export default function Education() {
  const edu = educationData[0];
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="education" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold text-sky-500 mb-2">
            Academic Background
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Education
          </h2>
          <div className="w-12 h-1 bg-sky-500 rounded-full mx-auto mt-4" />
        </Reveal>

        {/* Education Card with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl border border-sky-500/30 bg-card/80 backdrop-blur-xs shadow-lg relative overflow-hidden"
        >
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
                <GraduationCap size={26} />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {edu.degree}
                </h3>
                <p className="text-sm font-semibold text-sky-500 dark:text-sky-400">
                  {edu.institution}
                </p>
              </div>
            </div>

            <div className="inline-flex flex-nowrap items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 whitespace-nowrap shrink-0">
              <Calendar size={13} />
              <span className="whitespace-nowrap">{edu.period}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
            <MapPin size={14} className="text-sky-500" />
            <span>{edu.location}</span>
            <span className="mx-2">•</span>
            <span className="text-emerald-500 font-semibold">{edu.status}</span>
          </div>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
            {edu.summary}
          </p>

          <div className="pt-6 border-t border-border space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
              <Award size={15} className="text-amber-400" />
              <span>Key Academic Highlights</span>
            </h4>
            <div className="space-y-2">
              {edu.keyAchievements.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/85">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
