import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Award, ExternalLink } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: isHome ? "#about" : "/#about" },
    { name: "Skills", href: isHome ? "#skills" : "/#skills" },
    { name: "Projects", href: isHome ? "#projects" : "/#projects" },
    { name: "Education", href: isHome ? "#education" : "/#education" },
    { name: "Experience", href: isHome ? "#experience" : "/#experience" },
    { name: "Contact", href: isHome ? "#contact" : "/#contact" }
  ];

  return (
    <header className="fixed top-3 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-300 w-full max-w-5xl rounded-full border shadow-lg backdrop-blur-xl px-5 py-2.5 flex items-center justify-between ${
          scrolled ? "shadow-xl border-sky-500/30" : "border-border"
        } ${
          darkMode
            ? "bg-slate-900/85 text-slate-100"
            : "bg-white/85 text-slate-800 shadow-slate-200/50"
        }`}
        aria-label="Main Navigation"
      >
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group font-bold tracking-tight text-lg"
          aria-label="Ahmed Fayyad Home"
        >
          <span className="w-9 h-9 rounded-full bg-linear-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md group-hover:scale-105 transition-transform">
            AF
          </span>
          <span className="hidden sm:inline-block font-semibold bg-linear-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Ahmed Fayyad
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-sky-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Link to Certifications Page */}
          <Link
            to="/certifications"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20 hover:border-sky-500/50 transition-all shadow-xs"
          >
            <Award size={15} />
            <span>Certifications</span>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full border transition-all ${
              darkMode
                ? "border-slate-700 bg-slate-800 hover:bg-slate-700 text-amber-400"
                : "border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
            aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
          >
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1.5 text-muted-foreground hover:text-foreground focus:outline-none"
            aria-label="Toggle mobile menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className={`lg:hidden pointer-events-auto absolute top-16 w-[92%] max-w-md rounded-2xl border shadow-2xl p-5 backdrop-blur-2xl transition-all ${
            darkMode
              ? "bg-slate-900/95 border-slate-800 text-slate-100"
              : "bg-white/95 border-slate-200 text-slate-800"
          }`}
        >
          <div className="flex flex-col gap-3 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 text-base font-medium hover:text-sky-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-border mt-1">
              <Link
                to="/certifications"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-sky-500/10 text-sky-400 font-semibold"
              >
                <Award size={18} />
                <span>View Certifications Gallery</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
