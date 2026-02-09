import React from "react";

function Footer() {
  return (
    <footer className="border-t border-blue-500/20 bg-gradient-to-b from-blue-500/5 to-transparent">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-2">
              Ahmed Fayyad
            </h3>
            <p className="text-gray-400">Frontend Developer & Web Designer</p>
          </div>

          <div className="md:text-center">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a
                  href="#home"
                  className="hover:text-blue-500 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-blue-500 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-blue-500 transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-blue-500 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="md:text-right">
            <h4 className="font-semibold mb-4">Social Media</h4>
            <div className="flex md:justify-end gap-4 text-gray-400">
              <a
                href="https://github.com/Ah-Fayyad/"
                className="hover:text-blue-500 transition-colors"
              >
                Github
              </a>
              <a
                href="https://www.linkedin.com/in/ahmed-fayyad-97a727265?trk=contact-info"
                className="hover:text-blue-500 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-500/20 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Ahmed Fayyad. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
