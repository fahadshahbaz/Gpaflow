# GPAFlow

A modern, intuitive GPA tracking dashboard for university students. Track your academic progress, calculate SGPA/CGPA, and visualize your performance across semesters.

![GPAFlow Dashboard](https://via.placeholder.com/800x400.png?text=GPAFlow+Dashboard)

## Live Demo

Try GPAFlow now - no installation needed!

**[https://gpaflow.vercel.app](https://gpaflow.vercel.app)**

Simply sign up and start tracking your GPA immediately.

## What is GPAFlow?

GPAFlow helps students effortlessly track their academic performance. Whether you're in your first semester or final year, simply add your subjects with marks and credit hours, GPAFlow handles the rest, calculating your SGPA and CGPA instantly.

## Why GPAFlow?

- **Simple & Intuitive**: No complicated spreadsheets or manual calculations
- **Visual Progress Tracking**: See your GPA trends with beautiful charts
- **Semester Management**: Organize subjects by semester, edit anytime
- **Smart Insights**: Get personalized tips and motivation to improve
- **Secure**: Your data is private and protected with enterprise-grade security

## Features

### Dashboard
- Real-time GPA calculations (SGPA & CGPA)
- Interactive GPA progression chart
- Grade distribution breakdown (A's, B's, C's, D's)
- Subject visualization per semester
- Smart insights with study tips

### Semester Management
- Add unlimited semesters
- Add/edit/delete subjects with marks and credit hours
- Automatic GPA recalculation on every change
- Dedicated page for academic records

### User Account
- Secure sign up and login
- Profile management
- Password reset functionality

## Supported Universities

- **NUML** (National University of Modern Languages) - *Currently Supported*
- More universities coming soon... (or suggest yours!)

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gpaflow.git
cd gpaflow
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Supabase credentials to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## How to Use

1. **Sign Up**: Create an account with your email
2. **Add Semester**: Go to Semesters tab and click "Add Semester" and give it a name
3. **Add Subjects**: For each subject, enter:
   - Subject name
   - Obtained marks (0-100)
   - Credit hours (1-4)
4. **View Dashboard**: See your SGPA, CGPA, and visual analytics
5. **Track Progress**: Add more semesters to see your GPA progression over time

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Charts**: Recharts
- **Linting & Formatting**: Biome
- **Package Manager**: pnpm

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter
- `pnpm format` - Format code with Biome

## Support

For issues and feature requests, please open an issue on GitHub.

## License

MIT License - feel free to use and modify!

---

Built with ❤️ by [Fahad Shahbaz](https://fahadshahbaz.dev)
