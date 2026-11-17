import React from "react";
import Navbar from "../components/common/Navbar";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Skills from "../components/home/Skills";
import Projects from "../components/home/Projects";
import Education from "../components/home/Education";
import Experience from "../components/home/Experience";
import Contact from "../components/home/Contact";
import Footer from "../components/common/Footer";
import RecruiterAssistant from "../components/home/RecruiterAssistant";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <RecruiterAssistant />
    </div>
  );
}
