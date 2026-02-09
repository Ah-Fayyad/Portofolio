import { BsWhatsapp } from "react-icons/bs";
import { RiMessengerLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import React from "react";

const ContactData = [
  {
    id: 1,
    icon: <MdOutlineEmail />,
    title: "Email",
    info: "ahfayyad.m@gmail.com",
    link: "mailto:ahfayyad.m@gmail.com",
  },
  {
    id: 2,
    icon: <RiMessengerLine />,
    title: "Messenger",
    info: "Ahmed Fayyad",
    link: "https://m.me/",
  },
  {
    id: 3,
    icon: <BsWhatsapp />,
    title: "WhatsApp",
    info: "+201014563940",
    link: "https://api.whatsapp.com/send?phone=201014563940",
  },
];

function Contact() {
  return (
    <section id="contact" className="py-20 px-4 mt-32">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-wider text-blue-500 mb-2">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent mb-4">
            Contact Me
          </h2>
          <p className="text-gray-400">
            Feel free to reach out! I'm always open to new opportunities.
          </p>
        </div>

        <div className="bg-linear-to-b from-blue-500/10 to-cyan-400/10 border border-blue-500/20 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
            {/* Contact Options */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold mb-6">Quick Contact</h3>
              {ContactData.map(({ id, icon, title, info, link }) => (
                <a
                  key={id}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group bg-white/5 border border-blue-500/30 rounded-xl p-5 hover:border-blue-500 hover:bg-blue-500/15 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  <div className="text-3xl text-blue-400 mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>
                  <h4 className="text-base font-bold mb-1">{title}</h4>
                  <p className="text-gray-400 text-xs">{info}</p>
                </a>
              ))}
            </div>

            {/* Contact Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <h3 className="text-xl font-bold mb-6">Send Message</h3>
              <div>
                <label className="block text-lg font-semibold text-blue-400 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-linear-to-b from-white/10 to-white/5 border border-blue-500/30 rounded-lg hover:border-blue-500/50 focus:border-blue-500 focus:bg-white/5 focus:outline-none transition-all duration-300 text-base placeholder:text-gray-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-blue-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-linear-to-b from-white/10 to-white/5 border border-blue-500/30 rounded-lg hover:border-blue-500/50 focus:border-blue-500 focus:bg-white/5 focus:outline-none transition-all duration-300 text-base placeholder:text-gray-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-blue-400 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 bg-linear-to-b from-white/10 to-white/5 border border-blue-500/30 rounded-lg hover:border-blue-500/50 focus:border-blue-500 focus:bg-white/5 focus:outline-none transition-all duration-300 resize-none text-base placeholder:text-gray-500"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button className="w-full px-8 py-3 bg-linear-to-r from-blue-500 to-cyan-400 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 active:scale-95">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
