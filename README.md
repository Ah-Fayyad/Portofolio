# 🚀 Ahmed Fayyad — Personal Career Platform & Developer Portfolio

A modern, high-performance personal portfolio and digital credential platform built with **React 19**, **Vite 7**, **Tailwind CSS v4**, and **Supabase**.

**Live Deployment:** [portofolio-xi-five-68.vercel.app](https://portofolio-xi-five-68.vercel.app/)

---

## 🌟 Architecture & Simplified Structure

The application is structured into **two public pages** and **one private admin area**:

### 1. Portfolio Page (`/`)
- **Hero & Intro**: Executive introduction, CV download, and status badge.
- **About Me**: Computer Science background at Arab Open University, Cairo.
- **Technical Skills**: Verified skills categorized into Frontend, Backend, Databases, Languages, and CS Fundamentals.
- **Featured Projects**: Real-world case studies including the **Roommates Graduation Project (Top 80 of 1,000+ Projects)** and **Almdrasa E-Commerce Platform**.
- **Education**: B.Sc. in Computer Science at Arab Open University, Cairo (2022–2026).
- **Practical Experience**: Capstone engineering leadership and technical milestones.
- **Contact & Inquiries**: Validated form with direct email dispatch and verified WhatsApp, LinkedIn, and GitHub links.
- **Recruiter AI Assistant**: Grounded chatbot providing instant answers strictly based on Ahmed's verified background.

### 2. Certifications Gallery (`/certifications`)
- Dedicated digital credential showcase with preserved image aspect ratios.
- Search, filter by category, and sort by issue date or title.
- Automatic organization logo recognition (Almdrasa, Google, Meta, IBM, AWS, Microsoft, Coursera, Udemy).
- High-resolution preview modal with verification links and credential IDs.

### 3. Private Admin Portal (`/admin`)
- Secure password-protected administrative suite.
- Real-time CRUD management for certificates without code changes or redeployments.
- **AI Certificate Scanner**: Upload certificate images or PDFs to auto-extract Title, Issuer, Date, and Skills via AI.
- Supabase PostgreSQL and Storage bucket synchronization with persistent local fallback.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 19.2.3, Vite 7.3.1
- **Routing**: React Router DOM v7 (with lazy-loaded code-splitting)
- **Styling**: Tailwind CSS v4.0.0 (`@tailwindcss/vite`)
- **Icons**: Lucide React & React Icons
- **Backend & Storage**: Supabase (PostgreSQL, Supabase Auth, Cloud Storage)
- **AI Integration**: Google Gemini Vision & Grounded Assistant
- **Deployment**: Vercel (configured with `vercel.json` SPA rewrites)

---

## 💻 Getting Started Locally

### 1. Clone & Install
```bash
git clone https://github.com/Ah-Fayyad/Portofolio.git
cd Portofolio
npm install
```

### 2. Development Server
```bash
npm run dev
```

### 3. Run Production Build & Linter
```bash
npm run lint
npm run build
```

---

## 🔐 Admin Dashboard Access

Navigate to `/admin` in your browser.
- **Default Administrative Passcode**: `Ahmed@2026` (or `admin123`)
- You can connect your live Supabase project by copying `.env.example` to `.env` and adding your credentials.

---

## 📄 License & Credits

Created by **Ahmed Fayyad** ([@Ah-Fayyad](https://github.com/Ah-Fayyad)).  
Cairo, Egypt • Contact: [ahfayyad.m@gmail.com](mailto:ahfayyad.m@gmail.com)
