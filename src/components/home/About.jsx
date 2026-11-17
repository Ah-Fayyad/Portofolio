import React from "react";
import { GraduationCap, Layout, Database, Cpu } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "../common/Reveal";
import { motion } from "framer-motion";

export default function About() {
  const pillars = [
    {
      icon: Layout,
      title: "Frontend Craftsmanship",
      description:
        "Building pixel-perfect, accessible, and high-performance interfaces with React, TypeScript, and modern CSS frameworks like Tailwind and Material UI."
    },
    {
      icon: Database,
      title: "Full-Stack Integration",
      description:
        "Integrating RESTful services, real-time messaging pipelines using Socket.IO, and architecting relational databases with PostgreSQL, Supabase, and Prisma ORM."
    },
    {
      icon: Cpu,
      title: "Computer Science Rigor",
      description:
        "Strong foundation in data structures, algorithms, object-oriented design patterns, and clean architecture honed through rigorous academic and project evaluation."
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header with Scroll Reveal */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest font-semibold text-sky-500 mb-2">
            Professional Background
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            About Me
          </h2>
          <div className="w-12 h-1 bg-sky-500 rounded-full mx-auto mt-4" />
        </Reveal>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <Reveal className="lg:col-span-7 space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed" delay={0.1}>
            <p>
              I am a <strong className="text-foreground">Frontend Developer</strong> and{" "}
              <strong className="text-foreground">Computer Science Graduate</strong> from the{" "}
              <strong className="text-foreground">Arab Open University, Cairo</strong> (2022–2026). My technical journey is defined by a passion for creating reliable, intuitive, and performant web applications that solve real-world problems.
            </p>
            <p>
              During my academic career, I had the privilege of architecting and leading our full-stack graduation project—<strong className="text-foreground">Roommates Platform</strong>. Through rigorous technical reviews, our platform was selected among the <span className="text-sky-500 dark:text-sky-400 font-semibold">Top 80 of over 1,000+ university projects</span>.
            </p>
            <p>
              Whether engineering interactive state management in React &amp; TypeScript or integrating complex cloud backends with Supabase and Node.js, I emphasize clean code, maintainable architecture, and user-centered design.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.2}>
            <div className="p-6 rounded-2xl border border-border bg-card/80 backdrop-blur-xs shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Computer Science (B.Sc.)</h3>
                  <p className="text-xs text-muted-foreground">Arab Open University, Cairo • 2022–2026</p>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Specialization:</span>
                  <span className="font-semibold text-foreground">Software Engineering &amp; Web</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Key Capstone:</span>
                  <span className="font-semibold text-foreground">Roommates (Top 80 Award)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-semibold text-foreground">Cairo, Egypt (Available Globally)</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 3 Core Pillars with Staggered Scroll Animation */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" stagger={0.12}>
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="p-7 rounded-2xl border border-border bg-card/60 hover:bg-card hover:border-sky-500/40 transition-colors shadow-xs group h-full flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {pillar.description}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

      </div>
    </section>
  );
}
