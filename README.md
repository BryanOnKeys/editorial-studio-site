# Editorial Studio Site

An agency-grade editorial portfolio and brand studio website designed for creative directors, brand strategists, and multidisciplinary design agencies. Built with React 18, TypeScript, Tailwind CSS, Vite, and Radix UI primitives.

## Overview

Editorial Studio Site combines editorial typography, structured whitespace, and intentional asymmetry to present creative work with restraint and sophistication. It pairs high-impact portfolio showcases with functional client acquisition tools, including an interactive investment estimator and a horizontal gallery stream.

## Core Features

- Editorial Typography System: Built around Instrument Serif for display headlines and Inter for legible, measured body copy.
- Curated Work Showcase: Filterable portfolio grid with detailed project case study templates (challenge, solution, deliverables, visual system).
- Horizontal Scroll Gallery: Smooth kinetic horizontal scroll stream highlighting studio outputs and gallery assets.
- Interactive Investment Estimator: Real-time project cost calculator enabling potential clients to select project type, business stage, timeline, and deliverable scope to generate upfront price estimates.
- Refined Motion and Transitions: Lightweight scroll reveals and interaction states configured for fluidity without sensory fatigue.
- Full Accessibility and Mobile-First Layout: Screen-reader friendly semantic structure, keyboard navigation, and responsive layouts across all viewport sizes.
- Reusable Component Architecture: Modular UI components based on Radix UI primitives and styled with utility classes.

## Tech Stack

- Framework: React 18 with TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS, Tailwind Typography, tailwindcss-animate
- UI Primitives: Radix UI (Accordion, Dialog, Tooltip, Dropdown, Toast, etc.)
- Routing: React Router v6
- State and Async: TanStack Query (React Query)
- Icons: Lucide React
- Notifications: Sonner and Radix Toaster

## Site Architecture

```
/                     -> Home page (Hero, selected works preview, philosophy, horizontal gallery)
/about                -> Studio background, creative philosophy, credentials, and experience
/services             -> Practice areas, capabilities, process breakdown, and FAQ
/work                 -> Comprehensive portfolio directory of featured case studies
/work/:slug           -> Individual case study detail pages with editorial layouts
/contact              -> Inquiries form, contact channels, and interactive investment estimator
```

## Directory Structure

```
editorial-studio-site/
├── public/                 # Static public assets and favicons
├── src/
│   ├── assets/             # Photography, imagery, and gallery assets
│   │   ├── gallery/        # Studio archive and texture photographs
│   │   └── projects/       # High-resolution project imagery
│   ├── components/
│   │   ├── layout/         # Header, Footer, and Page Layout wrappers
│   │   ├── shared/         # Reusable features (Estimator, Gallery, Cards, Reveal)
│   │   └── ui/             # Radix-based UI components (buttons, dialogs, inputs)
│   ├── data/               # Project case studies and metadata
│   ├── hooks/              # Custom React hooks (use-mobile, use-toast)
│   ├── lib/                # Utility helpers (cn, tailwind-merge)
│   ├── pages/              # Application route pages
│   ├── App.tsx             # Route definitions and application providers
│   ├── index.css           # Global CSS variables, font definitions, and tokens
│   └── main.tsx            # Application DOM entry point
├── .gitignore              # Git ignore configuration
├── components.json         # Shadcn UI configuration
├── index.html              # HTML document template
├── package.json            # Project dependencies and npm scripts
├── tailwind.config.ts      # Tailwind CSS configuration and theme extensions
├── tsconfig.json           # TypeScript base configuration
└── vite.config.ts          # Vite build and plugin settings
```

## Getting Started

### Prerequisites

- Node.js (version 18.0.0 or higher recommended)
- npm, pnpm, yarn, or bun package manager

### Installation

1. Clone repository:

```bash
git clone git@github.com:girishlade111/editorial-studio-site.git
cd editorial-studio-site
```

2. Install dependencies:

```bash
npm install
```

### Development

Run local development server with Hot Module Replacement:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### Production Build

Create an optimized static build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

### Code Quality and Linting

Run ESLint to check for code consistency:

```bash
npm run lint
```

## Customization

### Palette and Styling Tokens

Color variables are defined in `src/index.css` and referenced through `tailwind.config.ts`:

- Background tones: Off-white and warm cream surfaces (`--background`, `--secondary-bg`).
- Text ink: Soft black and charcoal for reading comfort (`--ink`, `--ink-light`, `--ink-muted`).
- Accents and Borders: Subtle borders and architectural line rules (`--border`, `--divider`).

### Managing Projects

Add or edit portfolio case studies in `src/data/projects.ts`. Each project object includes:

- `slug`: URL parameter identifier
- `title`: Display title
- `category`: Discipline classification (e.g., Brand Identity, Visual System)
- `year`: Project completion year
- `client`: Organization or client name
- `industry`: Client sector
- `services`: Array of delivered capabilities
- `overview`: Narrative summary of the work
- `challenge`: Problem statement
- `solution`: Strategic design resolution

## Deployment

This project produces static assets compatible with any modern static hosting provider:

- Vercel: Connect the repository and select Vite framework preset.
- Netlify: Set build command to `npm run build` and publish directory to `dist`.
- GitHub Pages: Deploy contents of `dist` folder via GitHub Actions workflow.

## License

This project is open-source and available under the MIT License.
