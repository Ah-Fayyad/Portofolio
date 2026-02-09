import React from "react";
import {
  FaReact,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
  FaNode,
  FaGit,
  FaFigma,
} from "react-icons/fa";
import { SiTailwindcss, SiVite, SiFirebase, SiSupabase } from "react-icons/si";

function Skills() {
  const skillList = [
    { name: "React", icon: FaReact, color: "#61DAFB" },
    { name: "JavaScript", icon: FaJsSquare, color: "#F7DF1E" },
    { name: "HTML", icon: FaHtml5, color: "#E34C26" },
    { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Vite", icon: SiVite, color: "#646CFF" },
    { name: "Node.js", icon: FaNode, color: "#68A063" },
    { name: "Git", icon: FaGit, color: "#F1502F" },
    { name: "Figma", icon: FaFigma, color: "#F24E1E" },
    { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
    { name: "Supabase", icon: SiSupabase, color: "#3FCF8E" },
  ];

  return (
    <section id="skills" className="py-20 px-4 mt-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-blue-500 mb-2">
            My Skills
          </p>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {skillList.map((skill) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={skill.name}
                className="bg-linear-to-b from-blue-500/10 to-cyan-400/10 border border-blue-500/20 rounded-2xl p-6 text-center hover:border-blue-500 hover:from-blue-500/20 hover:to-cyan-400/20 transition-all duration-300 hover:-translate-y-3 hover:shadow-lg hover:shadow-blue-500/20 group"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                  <IconComponent
                    className="text-3xl group-hover:scale-125 group-hover:drop-shadow-lg transition-all duration-300"
                    style={{ color: skill.color }}
                  />
                </div>
                <h3 className="font-semibold text-sm md:text-base">
                  {skill.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Skills;
