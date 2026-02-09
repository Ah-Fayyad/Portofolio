import React from "react";
import Nav from "./components/nav/Nav.jsx";
import Home from "./components/home/Home.jsx";
import About from "./components/About/About.jsx";
import Services from "./components/services/Services.jsx";
import Skills from "./components/skills/Skills.jsx";
import Projects from "./components/projects/Projects.jsx";
import Contact from "./components/contact/Contact.jsx";
import Footer from "./components/footer/Footer.jsx";

export default function App() {
  return (
    <>
      <Nav />
      <Home />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}
