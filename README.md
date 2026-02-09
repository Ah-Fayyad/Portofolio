# 🎨 Ahmed Fayyad - Portfolio Website

A modern, responsive portfolio website built with **React 19**, **Vite**, and **Tailwind CSS v4**, showcasing projects, skills, and services.

## ✨ Features

- 🎯 **Responsive Design** - Optimized for mobile, tablet, and desktop
- 🌓 **Dark/Light Mode** - Theme toggle with localStorage persistence
- ⚡ **Ultra-Fast** - Built with Vite for instant HMR and optimized builds
- 🎭 **Smooth Animations** - Custom fadeInUp, float, and scale animations
- 💼 **Project Showcase** - Interactive project cards with live demo links
- 📞 **Contact Section** - Email contact form with multiple communication options
- 🎨 **Modern UI** - Gradient backgrounds, hover effects, and premium styling
- 🔍 **SEO Ready** - Semantic HTML and meta tags

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.3
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS v4.0.0
- **Icons**: 
  - lucide-react (Menu, X, Sun, Moon)
  - react-icons (Font Awesome, Feather, VS Code, Simple Icons)
- **State Management**: Custom ThemeContext
- **Package Manager**: npm

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Ah-Fayyad/Portofolio.git
cd Portofolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── About/          # About section with stats
│   ├── contact/        # Contact form & quick contact
│   ├── footer/         # Footer with links
│   ├── home/           # Hero section
│   ├── nav/            # Navigation & theme toggle
│   ├── projects/       # Portfolio projects
│   ├── services/       # Services offered
│   └── skills/         # Technical skills
├── context/
│   └── ThemeContext.jsx # Dark/light mode state
├── hooks/
│   └── useFetch.js    # Custom fetch hook
├── i18n/
│   └── i18n.js        # Internationalization
├── lib/
│   └── utils.js       # Utility functions
├── App.jsx            # Main app component
├── main.jsx           # Entry point
└── index.css          # Global styles & animations
```

## 🎨 Design Highlights

- **Color Palette**: Blue (#3b82f6) to Cyan (#06b6d4) gradients
- **Dark Mode**: Gray-900 background with cyan accents
- **Light Mode**: White background with blue accents
- **Custom Animations**: Staggered fade, floating effects, and smooth transitions

## 📱 Pages/Sections

- **Home**: Hero section with CTA buttons
- **About**: Professional background with stats cards
- **Services**: Web development, mobile responsiveness, database design
- **Skills**: 11 technical skills with icons
- **Projects**: 4 featured projects with live demos and GitHub links
- **Contact**: Contact form and quick contact options (Email, Messenger, WhatsApp)

## 🚀 Performance

- Optimized for lighthouse performance
- Fast build times with Vite
- Efficient CSS with Tailwind utilities
- Lazy-loaded optimized images

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

**Ahmed Fayyad**
- GitHub: [@Ah-Fayyad](https://github.com/Ah-Fayyad)
- Email: your-email@example.com

---

Made with ❤️ using React & Tailwind CSS
