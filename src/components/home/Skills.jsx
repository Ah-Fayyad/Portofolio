import React, { useState } from "react";
import { skillsData } from "../../data/portfolioData";
import { CheckCircle2, Code2, Database, Layers, Terminal, Wrench } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "../common/Reveal";
import { motion } from "framer-motion";

export default function Skills() {
  const [activeTab, setActiveTab] = useState("All");

  const categoryIcons = {
    "Frontend Development": Layers,
    "Backend & Real-Time": Code2,
    "Databases & ORMs": Database,
    "Programming Languages": Terminal,
    "Tools & Computer Science": Wrench
  };

  const filteredCategories =
    activeTab === "All"
      ? skillsData
      : skillsData.filter((cat) => cat.category === activeTab);

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-widest font-semibold text-sky-500 mb-2">
            Technical Stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Skills &amp; Competencies
          </h2>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base">
            Verified technologies, frameworks, and engineering fundamentals applied across production and academic projects.
          </p>
          <div className="w-12 h-1 bg-sky-500 rounded-full mx-auto mt-4" />
        </Reveal>

        {/* Category Filter Tabs with Reveal */}
        <Reveal className="flex flex-wrap items-center justify-center gap-2 mb-12" delay={0.1}>
          <button
            onClick={() => setActiveTab("All")}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "All"
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                : "border border-border bg-card hover:bg-muted text-muted-foreground"
            }`}
          >
            All Skills
          </button>
          {skillsData.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(cat.category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === cat.category
                  ? "bg-sky-500 text-white shadow-md shadow-sky-500/25"
                  : "border border-border bg-card hover:bg-muted text-muted-foreground"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </Reveal>

        {/* Skills Cards Grid with Staggered Scroll Animation */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.1}>
          {filteredCategories.map((cat) => {
            const Icon = categoryIcons[cat.category] || Code2;
            return (
              <StaggerItem key={cat.category}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 rounded-2xl border border-border bg-card/70 hover:border-sky-500/40 hover:bg-card transition-colors shadow-xs flex flex-col h-full"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-foreground">
                      {cat.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/80 bg-muted/40 text-xs font-medium text-foreground hover:border-sky-500/50 hover:bg-sky-500/5 transition-all"
                      >
                        <CheckCircle2 size={13} className="text-sky-500 shrink-0" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

      </div>
    </section>
  );
}
