import React, { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";
import { personalInfo } from "../../data/portfolioData";

export default function RecruiterAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: `Hello! I'm Ahmed's AI Portfolio Assistant. I can answer questions about his technical stack, university graduation project (Top 80 of 1,000+), certifications, or contact details. How can I help you today?`
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "What is Ahmed's primary tech stack?",
    "Tell me about the graduation project award",
    "What certifications does he hold?",
    "How can I contact him for a role?"
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Grounded question answering
  const generateGroundedResponse = (query) => {
    const q = query.toLowerCase();

    if (q.includes("stack") || q.includes("technolog") || q.includes("skill") || q.includes("react") || q.includes("typescript")) {
      return `Ahmed specializes in modern Frontend and Full-Stack Web Development. His primary stack includes:\n• Frontend: React.js, TypeScript, Next.js, Tailwind CSS, Material UI, JavaScript (ES6+)\n• Backend: Node.js, Express.js, REST APIs, Socket.IO\n• Databases: PostgreSQL, Prisma ORM, Supabase, Firebase, SQL\n• CS Fundamentals: Data Structures, OOP, Problem Solving.`;
    }

    if (q.includes("graduation") || q.includes("roommates") || q.includes("award") || q.includes("top 80") || q.includes("project")) {
      return `Ahmed's primary academic capstone is the "Roommates Platform"—an AI-powered roommate matching and housing discovery platform. It was selected among the Top 80 out of 1,000+ university projects! Key technical highlights include React & TypeScript frontend, Node.js/Express backend with Prisma & PostgreSQL, and real-time chat powered by Socket.IO.`;
    }

    if (q.includes("certificat") || q.includes("diploma") || q.includes("almdrasa")) {
      return `Ahmed holds a professional "Frontend Development Diploma" from Almdrasa, covering advanced React.js, Next.js, state management, REST APIs, and full-stack development. You can view his digital credential in the Certifications Gallery at /certifications!`;
    }

    if (q.includes("education") || q.includes("university") || q.includes("degree") || q.includes("college")) {
      return `Ahmed is in his final year of a Bachelor of Science (B.Sc.) in Computer Science at Arab Open University, Cairo (2022–2026), focusing on software engineering, algorithms, and web architectures.`;
    }

    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("hire") || q.includes("reach")) {
      return `You can reach Ahmed directly at:\n• Email: ${personalInfo.email}\n• Phone / WhatsApp: ${personalInfo.phone}\n• LinkedIn: linkedin.com/in/ahmad-fayyad-97a727265\n• Location: Cairo, Egypt (Available for remote and international roles).`;
    }

    return `Ahmed is a Frontend Developer & Computer Science Graduate (AOU Cairo, 2026) specializing in React, TypeScript, and modern web architectures. He delivered the Roommates Platform (Top 80 of 1,000+ projects). Would you like to know more about his skills, projects, or certifications?`;
  };

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { role: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateGroundedResponse(query);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      setIsTyping(false);
    }, 500);
  };

  return (
    <aside aria-label="Recruiter AI Assistant" className="fixed bottom-5 right-5 z-40">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-linear-to-r from-sky-500 to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-xl shadow-sky-500/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all group"
          aria-label="Open Recruiter AI Assistant"
        >
          <Sparkles size={17} className="animate-spin text-amber-300" style={{ animationDuration: "6s" }} />
          <span>Ask AI About Ahmed</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[400px] h-[520px] max-h-[85vh] rounded-3xl border border-sky-500/30 bg-card/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeInUp">
          
          {/* Header */}
          <div className="p-4 border-b border-border bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center">
                <Bot size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  Recruiter Assistant
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                    Verified
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400">Strictly grounded in Ahmed's CV &amp; Projects</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Assistant"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot size={14} />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] whitespace-pre-line leading-relaxed ${
                    m.role === "user"
                      ? "bg-sky-500 text-white rounded-tr-xs"
                      : "bg-muted/60 border border-border/80 text-foreground rounded-tl-xs"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground p-2">
                <Bot size={14} className="text-sky-500 animate-pulse" />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 border-t border-border/60 bg-muted/20 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-card border border-border text-[11px] text-muted-foreground hover:text-sky-400 hover:border-sky-500/40 transition-all shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-border bg-card flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about skills, projects, background..."
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-border bg-muted/40 focus:border-sky-500 outline-hidden"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-sky-500 text-white disabled:opacity-40 hover:bg-sky-600 transition-colors"
              aria-label="Send query"
            >
              <Send size={15} />
            </button>
          </form>

        </div>
      )}
    </aside>
  );
}
