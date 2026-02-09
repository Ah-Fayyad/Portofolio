import React from "react";

function Home() {
  return (
    <section
      className="home min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden relative"
      id="home"
    >
      {/* Premium Background */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-950 via-blue-950/30 to-gray-950"></div>
      
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl"></div>
      </div>

      {/* Grid overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)]"></div>
      
      <div className="home-container text-center relative max-w-5xl w-full z-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <div className="image-wrapper animate-fadeInUp-2 relative group order-2 lg:order-1">
            {/* Premium Halo Effect */}
            <div className="absolute -inset-8 bg-linear-to-br from-blue-600/60 via-cyan-500/40 to-blue-600/30 rounded-full blur-3xl group-hover:blur-3xl transition-all duration-700 opacity-60 group-hover:opacity-80"></div>
            
            {/* Inner glow ring */}
            <div className="absolute -inset-5 bg-linear-to-tr from-cyan-500/30 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Image Container with Border */}
            <div className="relative mx-auto rounded-2xl overflow-hidden bg-linear-to-br from-blue-500/50 to-cyan-400/50 p-1 shadow-2xl shadow-blue-500/50 group-hover:shadow-cyan-500/50 transition-all duration-500">
              {/* Inner border */}
              <div className="relative w-80 h-96 rounded-xl overflow-hidden bg-linear-to-br from-gray-900 to-gray-800 border border-blue-400/40 shadow-inner">
                {/* Reflective overlay */}
                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
                
                {/* Image */}
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-110"
                  src="/photo.png"
                  alt="Ahmed Fayyad"
                />
                
                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-gray-900 via-gray-900/50 to-transparent opacity-40"></div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all duration-500"></div>
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-600/20 rounded-full blur-2xl group-hover:bg-blue-600/30 transition-all duration-500"></div>
          </div>

          {/* Text Section */}
          <div className="text-section animate-fadeInUp order-1 lg:order-2">
            <p className="greeting text-blue-400 mb-3 text-lg font-medium animate-fadeInUp-3 tracking-widest uppercase">
              Welcome to my portfolio
            </p>
            <h1 className="name-title text-5xl lg:text-7xl font-black mb-6 bg-linear-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent animate-fadeInUp-4 leading-tight">
              Ahmed Fayyad
            </h1>
            <p className="role text-2xl lg:text-3xl font-bold text-cyan-300 mb-6 animate-fadeInUp-5">
              Frontend Developer
            </p>
            <p className="bio text-base lg:text-lg text-gray-300 mb-10 max-w-md leading-relaxed animate-fadeInUp-6">
              I craft stunning, responsive web experiences using cutting-edge technologies. Passionate about creating beautiful interfaces that users love to interact with.
            </p>

            {/* Stats */}
            <div className="flex gap-8 justify-center lg:justify-start mb-10 animate-fadeInUp-6 flex-wrap">
              <div className="text-center">
                <div className="text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">5+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">2+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">100%</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Dedication</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="btns flex gap-4 justify-center lg:justify-start flex-wrap animate-fadeInUp-7">
              <a
                href="/Ahmed Fayyad_CV.pdf"
                download
                className="group px-8 py-4 rounded-full font-bold bg-linear-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/50 hover:shadow-2xl hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                <span>Download CV</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">↓</span>
              </a>
              <a
                href="#contact"
                className="group px-8 py-4 rounded-full font-bold border-2 border-cyan-400 text-cyan-300 bg-cyan-500/5 hover:bg-cyan-500/15 hover:text-cyan-200 hover:-translate-y-1 transition-all duration-300 hover:border-cyan-300"
              >
                Let's Connect
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
