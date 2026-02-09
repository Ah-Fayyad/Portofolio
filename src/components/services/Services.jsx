import React from "react";
import { FaCode, FaMobileAlt, FaDatabase } from "react-icons/fa";

function Services() {
  const services = [
    {
      id: 1,
      title: "Web Development",
      description:
        "Build responsive and modern web applications using React, Node.js, and other cutting-edge technologies.",
      icon: FaCode,
      color: "#61DAFB",
    },
    {
      id: 2,
      title: "Mobile Responsive",
      description:
        "Create fully responsive designs that work seamlessly across all devices and screen sizes.",
      icon: FaMobileAlt,
      color: "#06B6D4",
    },
    {
      id: 3,
      title: "Database Design",
      description:
        "Design and implement efficient databases using Firebase, Supabase, and other modern solutions.",
      icon: FaDatabase,
      color: "#FFCA28",
    },
  ];

  return (
    <section id="services" className="py-20 px-4 mt-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-blue-500 mb-2">
            What I Offer
          </p>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            My Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-linear-to-b from-blue-500/10 to-cyan-400/10 border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500 hover:from-blue-500/20 hover:to-cyan-400/20 transition-all duration-300 hover:-translate-y-3 hover:shadow-lg hover:shadow-blue-500/20"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-blue-500/10 rounded-full flex items-center justify-center hover:bg-blue-500/20 transition-all duration-300">
                  <IconComponent
                    className="text-4xl transition-all duration-300 hover:scale-110 hover:drop-shadow-lg"
                    style={{ color: service.color }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-center leading-relaxed mb-6">
                  {service.description}
                </p>
                <a
                  href="#contact"
                  className="block text-center text-blue-500 font-semibold hover:text-cyan-400 transition-colors duration-300"
                >
                  Learn More →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
