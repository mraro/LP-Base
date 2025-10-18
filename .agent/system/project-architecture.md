# Project Architecture

**Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS, Supabase, NextAuth, Framer Motion, GSAP
**Updated**: 2025-10-16

## Technology Stack

### Frontend Framework
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React with Server Components
- **TypeScript 5**: Type-safe JavaScript

### Styling & UI
- **Tailwind CSS v4**: Utility-first CSS framework
- **Radix UI**: Headless UI primitives
  - Accordion, Alert Dialog, Dialog, Dropdown Menu
  - Label, Select, Slot, Tabs, Toast
- **shadcn/ui**: Built on Radix UI with Tailwind
- **class-variance-authority**: Component variants
- **clsx & tailwind-merge**: Conditional class merging
- **tailwindcss-animate**: Animation utilities
- **Lucide React**: Icon library

### Animation
- **Framer Motion 11**: React animation library
- **GSAP 3.12**: Advanced timeline animations

### Forms & Validation
- **React Hook Form 7.50**: Form state management
- **Zod 3.22**: TypeScript-first schema validation
- **@hookform/resolvers**: Integration between RHF and Zod

### Authentication & Database
- **Supabase**: Database and authentication backend
  - @supabase/supabase-js 2.39
  - @supabase/ssr 0.5.2
- **NextAuth v5 beta**: Authentication for Next.js

### Data Visualization
- **Recharts 2.12**: Chart library for React
- **date-fns 3.3**: Date utility library

### Utilities
- **bcryptjs**: Password hashing

### Development Tools
- **ESLint 9**: Code linting
- **Prettier 3.2**: Code formatting
- **PostCSS 8**: CSS transformation
- **Autoprefixer**: CSS vendor prefixing

## Project Structure

```
3S-CARS/
├── .agent/                    # JITD documentation system
│   ├── DEVELOPMENT-README.md  # Navigator
│   ├── tasks/                 # Implementation plans
│   ├── system/                # Architecture docs
│   └── sops/                  # Standard Operating Procedures
│
├── app/                       # Next.js App Router
│   ├── (routes)/              # Route groups
│   ├── api/                   # API routes
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
│
├── components/                # React components
│   ├── ui/                    # shadcn/ui components
│   ├── shared/                # Shared components
│   └── sections/              # Page sections
│
├── config/                    # Configuration files
│
├── lib/                       # Utility functions
│   ├── utils.ts               # General utilities
│   ├── supabase/              # Supabase clients
│   └── auth/                  # Auth utilities
│
├── middleware.ts              # Next.js middleware
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## Key Components

### /app
Next.js 15 App Router with:
- Server Components by default
- Client Components only when needed ('use client')
- API routes for server-side operations
- Layouts for shared UI

### /components
- **ui/**: shadcn/ui components (buttons, forms, dialogs)
- **shared/**: Reusable components across pages
- **sections/**: Landing page sections (hero, features, CTA)

### /lib
- **utils.ts**: Helper functions (cn for class merging)
- **supabase/**: Supabase client configuration
- **auth/**: Authentication utilities

### /config
- Site configuration
- Navigation configuration
- Feature flags

## Development Workflow

### Available Scripts
```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Variables
See `.env.example` for required variables:
- Supabase credentials
- NextAuth configuration
- API keys

### Code Quality Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Enforced on commit
- **Prettier**: Auto-formatting
- **Line length**: Max 100 characters

## Architecture Patterns

### Server-First Architecture
- Default to Server Components
- Use Client Components only for:
  - Event handlers
  - Browser APIs
  - State management
  - Effects

### Data Fetching
- Server Components: async/await directly
- Client Components: use hooks (if necessary)
- API routes: for server-side operations

### Styling
- Tailwind utility classes
- Component variants with CVA
- CSS variables for theming
- Responsive-first design

### Animation
- **Framer Motion**: Component animations, page transitions
- **GSAP**: Complex timelines, scroll-triggered animations
- Performance: 60fps target, respect prefers-reduced-motion

### Forms
```typescript
const schema = z.object({
  email: z.string().email(),
})

const form = useForm({
  resolver: zodResolver(schema)
})
```

## Performance Targets

- **Lighthouse Score**: 90+ on all metrics
- **First Contentful Paint**: <1.5s
- **Time to Interactive**: <3.5s
- **Core Web Vitals**: All green
- **Bundle Size**: Optimized with code splitting

## SEO Strategy

- Server-side rendering for all public pages
- Metadata API for dynamic meta tags
- Semantic HTML
- Sitemap generation
- robots.txt configuration

---

**Last Updated**: 2025-10-16
**Maintained By**: JITD System
