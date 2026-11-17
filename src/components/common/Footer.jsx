import React from "react";
import { Link } from "react-router-dom";
import { personalInfo } from "../../data/portfolioData";
import { Github, Linkedin, Mail, Phone, Award, Shield, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/40 backdrop-blur-xs pt-16 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Summary */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group font-bold tracking-tight text-lg">
              <span className="w-8 h-8 rounded-full bg-linear-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center font-extrabold text-xs shadow-xs">
                AF
              </span>
              <span className="font-bold text-foreground">Ahmed Fayyad</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Frontend Developer &amp; Computer Science Graduate (AOU Cairo). Building accessible, responsive, and AI-integrated web applications with React &amp; TypeScript.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Available for engineering opportunities</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-sky-400 transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-sky-400 transition-colors">
                  Technical Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-sky-400 transition-colors">
                  Featured Projects
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-sky-400 transition-colors">
                  Education
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-sky-400 transition-colors">
                  Practical Experience
                </a>
              </li>
              <li>
                <Link to="/certifications" className="hover:text-sky-400 transition-colors flex items-center gap-1.5 font-medium text-sky-500">
                  <Award size={14} />
                  <span>Certifications Gallery</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Admin */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">
              Connect
            </h4>
            <div className="flex flex-col space-y-2.5 text-sm text-muted-foreground">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors flex items-center gap-2"
              >
                <Linkedin size={15} />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-400 transition-colors flex items-center gap-2"
              >
                <Github size={15} />
                <span>GitHub Repository</span>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="hover:text-sky-400 transition-colors flex items-center gap-2"
              >
                <Mail size={15} />
                <span>Email Ahmed</span>
              </a>
              <a
                href="https://wa.me/201014563940"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <Phone size={15} />
                <span>WhatsApp</span>
              </a>

              <div className="pt-3 border-t border-border/60">
                <Link
                  to="/admin"
                  className="text-xs text-muted-foreground/60 hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <Shield size={13} />
                  <span>Admin Portal</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Ahmed Fayyad. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with React 19, Vite &amp; Tailwind CSS
          </p>
        </div>

      </div>
    </footer>
  );
}
