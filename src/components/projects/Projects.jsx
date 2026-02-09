import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

function Projects() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "A full-stack E-Commerce platform built with React, Vite, Tailwind CSS, and Material UI, leveraging Supabase for backend services.",
      image: "/e-commerce.png",
      tags: [
        "React",
        "React Router DOM",
        "Supabase",
        "Tailwind CSS",
        "Material UI",
      ],
      github: "https://github.com/Ah-Fayyad/E-commerce-App",
      live: "https://project-e-commerce-app.netlify.app/",
    },
    {
      id: 2,
      title: "Repo Finder",
      description:
        "Search for any GitHub repository with an easy-to-use interface.",
      image: "/Repo-Finder.png",
      tags: ["React"],
      github: "https://github.com/Ah-Fayyad/Repo-Finder",
      live: "https://ah-fayyad.github.io/Repo-Finder/",
    },
    {
      id: 3,
      title: "Around the World",
      description:
        "Search for any country and know its Population, Region , and Capital.",
      image: "public/page round.png",
      tags: [
        "React",
        "Vite",
        "Charts.js",
        "API Integration",
        "Tailwind CSS",
        "Material UI",
      ],
      github:
        "https://github.com/Ah-Fayyad/Around-the-world?tab=readme-ov-file",
      live: "https://around-the-world-sepia.vercel.app/",
    },
    {
      id: 5,
      title: "Portfolio Website",
      description:
        "Modern portfolio website showcasing projects and skills with smooth animations.",
      image: "public/portofolio.png",
      tags: ["React", "Vite", "Tailwind CSS"],
      github: "https://github.com",
      live: "https://example.com",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 mt-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-blue-500 mb-2">
            My Works
          </p>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-linear-to-b from-blue-500/10 to-cyan-400/10 border border-blue-500/20 rounded-2xl overflow-hidden hover:border-blue-500 hover:from-blue-500/20 hover:to-cyan-400/20 transition-all duration-300 hover:-translate-y-3 hover:shadow-lg hover:shadow-blue-500/20 flex flex-col h-full group"
            >
              <div className="relative overflow-hidden w-full aspect-video bg-blue-500/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-8">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border-2 border-white text-white hover:bg-gray-700 hover:border-gray-700 flex items-center justify-center text-lg transition-all duration-300 hover:scale-125"
                    title="View on GitHub"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border-2 border-white text-white hover:bg-cyan-500 hover:border-cyan-500 flex items-center justify-center text-lg transition-all duration-300 hover:scale-125"
                    title="Live Demo"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 flex-1 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-medium hover:bg-blue-500/40 hover:border-blue-500/60 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
