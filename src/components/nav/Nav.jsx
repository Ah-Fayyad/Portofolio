import React, { useState, useEffect, useContext } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext.jsx";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[90%] max-w-2xl ${
        scrolled ? "scale-95" : "scale-100"
      }`}
    >
      <div
        className={`flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-300 backdrop-blur-md shadow-lg ${
          darkMode
            ? "bg-gray-900/80 border-gray-700/50"
            : "bg-white/80 border-gray-300/50"
        }`}
      >
        {/* Brand/Logo */}
        <a
          href="#home"
          className="text-xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent md:hidden"
        >
          AF
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center justify-center flex-1 space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-blue-500 transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right side: Theme Toggle & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full border transition-all duration-300 ${
              darkMode
                ? "border-gray-700 bg-gray-800 hover:bg-blue-900 hover:text-blue-400"
                : "border-gray-300 bg-white hover:bg-blue-50 hover:text-blue-500"
            }`}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 hover:text-blue-500 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-1/2 -translate-x-1/2 w-full mt-4 backdrop-blur-xl border rounded-3xl shadow-2xl transition-all duration-300 overflow-hidden ${
          isOpen ? "opacity-100 visible h-auto p-6" : "opacity-0 invisible h-0"
        } ${
          darkMode
            ? "bg-gray-900/95 border-gray-700/50"
            : "bg-white/95 border-gray-300/50"
        }`}
      >
        <div className="flex flex-col space-y-4 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:text-blue-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
