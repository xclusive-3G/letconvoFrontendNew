# Luminous AI — Frontend

> The Future of Receptionist Services  
> Built with **React 18 · Tailwind CSS · Framer Motion**

---

## 📁 Project Structure

```
luminous-ai-project/
├── public/
│   ├── index.html          # HTML shell
│   ├── manifest.json       # PWA manifest
│   └── office-bg.png       # Background image (copy)
├── src/
│   ├── assets/
│   │   ├── office-bg.png   # Background image (used in components)
│   │   └── index.js        # Asset exports
│   ├── components/
│   │   ├── AnimatedBg.jsx  # Ken Burns + parallax background
│   │   ├── Counter.jsx     # Animated number counter
│   │   ├── Footer.jsx      # Site footer
│   │   ├── Navbar.jsx      # Fixed top navigation
│   │   ├── PageHero.jsx    # Hero banner for inner pages
│   │   ├── Reveal.jsx      # Scroll-triggered fade-up wrapper
│   │   └── SectionLabel.jsx# Decorative section label
│   ├── pages/
│   │   ├── BenefitsPage.jsx
│   │   ├── PricingPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── GetStartedPage.jsx
│   ├── App.jsx             # Root component + client-side router
│   ├── index.js            # React entry point
│   └── index.css           # Tailwind base + global animations
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
```

The optimised output will be in the `build/` folder.

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.2.0 | UI framework |
| `react-dom` | ^18.2.0 | DOM renderer |
| `framer-motion` | ^10.16.4 | Animations & transitions |
| `react-intersection-observer` | ^9.5.3 | Scroll-triggered counters |
| `tailwindcss` | ^3.4.0 | Utility-first CSS |
| `autoprefixer` | ^10.4.16 | CSS vendor prefixes |
| `postcss` | ^8.4.32 | CSS processing |

---

## 🎨 Design System

### Colours
| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#8B6E3C` | CTA buttons, headings, icons |
| `primary-d` | `#6b5228` | Button hover states |
| `cyan` | `#0097A7` | Gradient accent |
| `sec` | `#545F7E` | Gradient accent |

### Fonts
- **Syne** — headings, labels, buttons (loaded from Google Fonts)
- **DM Sans** — body text (loaded from Google Fonts)
- **Material Symbols Outlined** — icons (loaded from Google Fonts)

---

## 🖼️ Background Image

The animated office background (`src/assets/office-bg.png`) uses three motion layers:

1. **Ken Burns** — slow 32-second zoom + drift (`@keyframes kb`)
2. **Shimmer overlay** — 10-second opacity pulse
3. **Mouse parallax** — real-time cursor tracking via `mousemove`

---

## 📄 Pages

| Route (state) | Component | Description |
|---------------|-----------|-------------|
| `benefits` | `BenefitsPage` | 8 benefit cards, stats, comparison, testimonials |
| `pricing` | `PricingPage` | 3 plan cards, feature table, FAQ accordion |
| `contact` | `ContactPage` | Contact form, office locations |
| `login` | `LoginPage` | Email/password + Google/GitHub social login |
| `getstarted` | `GetStartedPage` | 3-step onboarding wizard |

> Navigation is handled client-side via React state (no React Router needed for this SPA).

---

## ✨ Features

- **Persistent animated background** across all pages
- **Framer Motion** page transitions & micro-interactions
- **Scroll reveal** animations on every section
- **Animated counters** triggered by intersection observer
- **FAQ accordion** with smooth height transitions
- **3-step onboarding wizard** with animated step indicator
- **Mobile-responsive** hamburger menu
- **Dark overlay** on hero sections for readability
- **Custom scrollbar** styled to match brand

---

© 2025 Luminous AI
