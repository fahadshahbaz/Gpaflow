# GPAFlow 💙

**Stop using complicated spreadsheets.** GPAFlow is a high-performance, persistent academic dashboard built to track your academic journey over 4 years, not just calculate it once.


## Why GPAFlow?
Most GPA calculators are "one-and-done." You enter marks, get a result, and it's gone. GPAFlow is different it's your long-term academic companion.

- **Track Trends:** Visualize your SGPA/CGPA progress across 8 semesters with interactive charts.
- **Smart Predictions:** Know exactly what grades you need in the next semester to hit your target CGPA.
- **Persistent Data:** Your records are synced and secured via Supabase, accessible anytime, anywhere.
- **Modern UI:** Built with glassmorphism, fluid animations (`motion/react`), and a mobile-first philosophy.

## Tech Stack
We use the latest tools to ensure the dashboard is fast and reliable:
- **Core:** Next.js (App Router) + React 19
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS v4
- **Animations:** `motion/react`
- **Tooling:** BiomeJS (Linting/Formatting)

## Getting Started

1. **Clone & Install**
   ```bash
   git clone https://github.com/fahadshahbaz/gpaflow.git
   pnpm install
   ```

2. **Environment Setup**
   Copy `.env.example` to `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

3. **Run Dev**
   ```bash
   pnpm dev
   ```

## Grading Engine
GPAFlow uses a flexible **Strategy Pattern** for grading. While it currently follows the NUML (2023 Rules) linear interpolation system, the engine is designed to adapt to any university's grading policy with minimal configuration.

Made with 💙 by [Fahad Shahbaz](https://fahadshahbaz.dev)
