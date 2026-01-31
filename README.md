# GPAFlow

A modern, intuitive GPA tracking dashboard designed specifically for NUML (National University of Modern Languages) students. Built with Next.js 16, Supabase, and Tailwind CSS.

![GPAFlow Dashboard](https://via.placeholder.com/800x400.png?text=GPAFlow+Dashboard)

## Features

### Dashboard & Analytics
- **Real-time GPA Calculations**: Automatic SGPA and CGPA calculation using official NUML grading scale
- **Visual Progress Tracking**: Interactive charts showing GPA progression over semesters
- **Grade Distribution**: Visual breakdown of A's, B's, C's, D's across all subjects
- **Subject Visualization**: Dot matrix showing subjects per semester with recency indicators
- **Smart Insights**: Personalized tips and performance analysis with motivational quotes
- **Target Tracking**: See how close you are to your target CGPA

### Semester Management
- **Add/Edit/Delete Semesters**: Full CRUD operations for semester records
- **Subject Management**: Add subjects with marks and credit hours per semester
- **Automatic Calculations**: Real-time SGPA updates as you add/modify subjects
- **Academic Records**: Dedicated page to view and manage all semester data

### Authentication & Security
- **Complete Auth Flow**: Sign up, login, forgot password, reset password
- **Row Level Security (RLS)**: All data is user-isolated and secure
- **Profile Management**: Update display name and view account settings
- **Supabase Auth**: Enterprise-grade authentication with email verification

### UI/UX
- **Light Theme**: Clean, modern light theme with blue primary accent
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Top Navigation**: Horizontal navigation bar with profile dropdown
- **Smooth Animations**: Motion-based transitions and micro-interactions
- **Consistent Branding**: GPAFlow logo with graduation cap icon across all pages

## Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui, Radix UI primitives
- **Animation**: Motion (Framer Motion successor)
- **Charts**: Recharts
- **Icons**: Lucide React, Phosphor Icons
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Linting**: Biome
- **Package Manager**: pnpm

## NUML Grading System

GPAFlow implements the official NUML Examination Rules 2023 grading scale:

| Marks | Grade | Grade Point |
|-------|-------|-------------|
| 85-100 | A+ | 4.00 |
| 80-84 | A | 3.95-3.99 |
| 75-79 | B+ | 3.50-3.49 |
| 70-74 | B | 3.00-3.29 |
| 65-69 | C+ | 2.50-2.99 |
| 60-64 | C | 2.00-2.49 |
| 55-59 | D+ | 1.50-1.99 |
| 50-54 | D | 1.00-1.49 |
| 0-49 | F | 0.00 |

### Calculation Formulas
- **SGPA**: Sum of (Grade Point × Credit Hours) / Total Credit Hours
- **CGPA**: Weighted average of all semester SGPAs based on credit hours
- **Grade Points**: Uses fipnizen formula (e.g., 73 = 3.29, 74 = 3.39, 75 = 3.50)

## Database Schema

### Tables

**profiles**
- `id` (uuid, PK) - References auth.users
- `email` (text)
- `name` (text)
- `created_at` (timestamp)

**semesters**
- `id` (uuid, PK)
- `user_id` (uuid, FK) - References auth.users
- `name` (text)
- `semester_number` (integer)
- `year` (integer)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**subjects**
- `id` (uuid, PK)
- `semester_id` (uuid, FK) - References semesters
- `name` (text)
- `obtained_marks` (numeric)
- `credit_hours` (integer)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Row Level Security (RLS)
All tables have RLS policies ensuring users can only access their own data:
- Users can only view/modify their own semesters
- Subjects are protected through semester ownership
- Profile data is user-specific

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
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

5. Run the development server:
```bash
pnpm dev
```

### Database Setup

Run the following SQL in your Supabase SQL Editor:

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;

-- Create function for new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$;
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Biome linter
- `pnpm format` - Format code with Biome
- `pnpm fix` - Auto-fix linting issues

## Project Structure

```
gpaflow/
├── app/
│   ├── (auth)/           # Auth pages (login, signup, etc.)
│   ├── dashboard/        # Dashboard pages
│   │   ├── semesters/    # Semester management page
│   │   ├── settings/     # User settings page
│   │   └── page.tsx      # Main dashboard
│   ├── page.tsx          # Landing page
│   └── layout.tsx        # Root layout
├── components/
│   ├── dashboard/        # Dashboard components
│   │   ├── activity-dots.tsx
│   │   ├── add-semester-dialog.tsx
│   │   ├── add-subject-dialog.tsx
│   │   ├── delete-semester-dialog.tsx
│   │   ├── delete-subject-dialog.tsx
│   │   ├── edit-semester-dialog.tsx
│   │   ├── edit-subject-dialog.tsx
│   │   ├── gpa-trend-chart.tsx
│   │   ├── grade-progress.tsx
│   │   ├── insight-card.tsx
│   │   ├── semester-list.tsx
│   │   └── stats-cards.tsx
│   ├── top-nav.tsx       # Navigation bar
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── grading/
│   │   └── numl.ts       # NUML grading calculations
│   └── supabase/
│       ├── auth.ts       # Auth utilities
│       ├── client.ts     # Supabase client
│       ├── mutations.ts  # Database mutations
│       ├── queries.ts    # Database queries
│       └── server.ts     # Server-side client
├── public/
│   └── favicon.png
└── package.json
```

## Recent Updates

### UI/UX Improvements
- Switched to light theme with blue primary color
- Improved dashboard layout with better visual hierarchy
- Added GraduationCap icon branding across all auth pages
- Enhanced GPA chart with smooth lines and better tooltips

### Feature Enhancements
- Subjects card now shows semester-based visualization (S1, S2, etc.)
- Insights card displays motivational study tips
- Academic Records moved to dedicated Semesters page
- Added favicon support

### Security & Performance
- Optimized RLS policies for better performance
- Fixed function search_path for security
- Added proper TypeScript types throughout

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Support

For issues and feature requests, please use the GitHub Issues page.

---

Built with ❤️ for NUML students by [Your Name]
