import React from "react";

function Home() {
  return (
    <section
      className="home min-h-screen flex items-center justify-center px-4 py-8 overflow-x-hidden relative"
      id="home"
    >
      <div className="home-container text-center relative max-w-[800px] w-full animate-fadeInUp">
        <div className="image-wrapper mb-8 animate-fadeInUp-2">
          <img
            className="me w-[300px] h-[400px] mx-auto block rounded-t-full overflow-hidden bg-linear-to-b from-blue-500/30 to-cyan-400/30 object-cover animate-float shadow-lg hover:scale-105 transition-transform duration-300"
            src="/photo.png"
            alt="Ahmed Fayyad"
          />
        </div>
        <p className="greeting text-blue-500 mb-2 text-lg font-medium animate-fadeInUp-3">
          Hello, I'm
        </p>
        <h1 className="name-title text-6xl md:text-7xl font-bold mb-4 bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent animate-fadeInUp-4 leading-tight">
          Ahmed Fayyad
        </h1>
        <p className="role text-2xl font-semibold text-gray-300 mb-4 animate-fadeInUp-5">
          Frontend Developer
        </p>
        <p className="bio text-base text-gray-400 mb-8 max-w-[600px] mx-auto leading-relaxed animate-fadeInUp-6">
          I create beautiful, responsive, and user-friendly web applications
          with modern technologies.
        </p>

        <div className="btns flex gap-5 mt-10 justify-center flex-wrap animate-fadeInUp-7">
          <a
            href="/Ahmed Fayyad_CV.pdf"
            download
            className="px-8 py-3 rounded-full font-semibold bg-linear-to-r from-blue-500 to-cyan-400 text-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            Download CV
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full font-semibold border-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white hover:-translate-y-1 transition-all duration-300"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;
