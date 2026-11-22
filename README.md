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
- Supabase PostgreSQL and Storage as the single source of truth for certificates and images.

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

### 4. Configure Supabase

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in your local environment and Vercel. Use the public anon/publishable key only; never expose a service-role key.

Apply the SQL migrations in `supabase/migrations` to your Supabase project in filename order. Create the administrator account `ahfayyad.m@gmail.com` through **Authentication → Users**, set its password, and disable public sign-ups. The database policies only grant write access to that account.

The certificates table is publicly readable for the gallery. Mutations require that Supabase Auth account; certificate image reads are public, while uploads are restricted to that account and its own Storage folder. There is no local certificate fallback: Supabase or Storage errors are shown in the UI.

---

## 🔐 Admin Dashboard Access

Navigate to `/admin` in your browser.
- Sign in with the administrator account created in your Supabase project.
- Configure local credentials by copying `.env.example` to `.env` and adding your Supabase project values.

---

## 📄 License & Credits

Created by **Ahmed Fayyad** ([@Ah-Fayyad](https://github.com/Ah-Fayyad)).  
Cairo, Egypt • Contact: [ahfayyad.m@gmail.com](mailto:ahfayyad.m@gmail.com)
