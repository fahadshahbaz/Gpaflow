<div align="center">
  <img src="public/favicon.png" alt="GPAFlow logo" width="80" height="80" />
  <h1>GPAFlow</h1>
  <p>A high-performance, persistent academic dashboard built to track, calculate, and forecast your academic journey over 4 years.</p>
</div>

<br />

## Why GPAFlow?
Most GPA calculators are "one-and-done." You enter marks, get a result, and it's gone. GPAFlow is different it's your long-term academic companion.

- **Track Trends:** Visualize your SGPA/CGPA progress across 8 semesters with interactive charts.
- **Smart Predictions:** Know exactly what grades you need in the next semester to hit your target CGPA.
- **Persistent Data:** Your records are synced and secured via Supabase, accessible anytime, anywhere.
- **Modern UI:** Built with glassmorphism, fluid native CSS transitions, and a mobile-first philosophy.

## Tech Stack
We use the latest tools to ensure the dashboard is fast and reliable:
- **Core:** Next.js (App Router) + React 19
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS v4
- **Animations:** Native CSS & Tailwind CSS v4
- **Tooling:** BiomeJS (Linting/Formatting)

## Getting Started

Want to run it locally or contribute? Check out the [Contributing Guide](CONTRIBUTING.md) for full setup instructions.

## Supported Universities

GPAFlow uses a flexible **Strategy Pattern** for grading - each university has its own grading engine that plugs in seamlessly.

| University | Grading System | Status |
|-----------|---------------|--------|
| **NUML** - National University of Modern Languages | Letter grades with 4.0 GPA scale | ✅ Supported |
| **GCWUF** - GC University for Women Faisalabad | Quality points table system | ✅ Supported |
| **GCUF (Arts)** - GC University Faisalabad | General & arts, ceil rounding | ✅ Supported |
| **GCUF (Engineering)** - GC University Faisalabad | Engineering, 55% pass limit | ✅ Supported |

> 🎓 **Your university not listed?** We're actively looking for contributors to add support for more universities! Check the [Contributing Guide](CONTRIBUTING.md) for details.

Made with 🎓 by [Fahad Shahbaz](https://fahadshahbaz.dev)
