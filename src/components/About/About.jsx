import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";
import React from "react";

function About() {
  return (
    <section id="about" className="py-20 px-4 mt-32">
      <div className="max-w-6xl mx-auto">
        <div className="top_section text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-blue-500 mb-2">
            Get to know
          </p>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex items-center justify-center">
            <div className="relative w-80 h-96 group">
              {/* Animated Gradient Background */}
              <div className="absolute -inset-3 bg-linear-to-br from-blue-500/50 via-cyan-400/30 to-blue-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-75 group-hover:opacity-100"></div>
              
              {/* Image Container */}
              <div className="relative w-full h-full bg-linear-to-br from-blue-500/40 to-cyan-400/40 rounded-3xl overflow-hidden flex items-center justify-center border border-blue-500/40 shadow-2xl shadow-blue-500/20 group-hover:border-blue-400/60 transition-all duration-300">
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <img
                  src="/me-about.jpg"
                  alt="About Me"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-linear-to-b from-blue-500/10 to-cyan-400/10 border border-blue-500/20 rounded-2xl p-6 text-center hover:border-blue-500 hover:from-blue-500/20 hover:to-cyan-400/20 transition-all duration-300 hover:-translate-y-2">
                <FaAward className="text-3xl text-blue-500 mx-auto mb-3" />
                <h5 className="font-semibold text-lg">Experience</h5>
                <small className="text-gray-400">3+ Years Working</small>
              </div>

              <div className="bg-linear-to-b from-blue-500/10 to-cyan-400/10 border border-blue-500/20 rounded-2xl p-6 text-center hover:border-blue-500 hover:from-blue-500/20 hover:to-cyan-400/20 transition-all duration-300 hover:-translate-y-2">
                <FiUsers className="text-3xl text-blue-500 mx-auto mb-3" />
                <h5 className="font-semibold text-lg">Clients</h5>
                <small className="text-gray-400">200+ Worldwide</small>
              </div>

              <div className="bg-linear-to-b from-blue-500/10 to-cyan-400/10 border border-blue-500/20 rounded-2xl p-6 text-center hover:border-blue-500 hover:from-blue-500/20 hover:to-cyan-400/20 transition-all duration-300 hover:-translate-y-2">
                <VscFolderLibrary className="text-3xl text-blue-500 mx-auto mb-3" />
                <h5 className="font-semibold text-lg">Projects</h5>
                <small className="text-gray-400">80+ Completed</small>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              I'm a passionate frontend developer with expertise in React,
              modern JavaScript, and creating responsive web applications. I
              love turning complex problems into simple, beautiful solutions
              that users enjoy.
            </p>
            <a
              href="#contact"
              className="inline-block px-8 py-3 rounded-full font-semibold bg-linear-to-r from-blue-500 to-cyan-400 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
