# Tech Stack Patterns

**Framework**: Next.js 15 + React 19
**Updated**: 2025-10-16

---

## Next.js 15 + React 19 Best Practices

### Server vs Client Components

#### Server Components (Default)
```typescript
// ✅ Server Component - No 'use client' directive
// Can fetch data directly, no client bundle
async function ProductList() {
  const products = await db.products.findMany()

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}
```

**Use Server Components for**:
- Static content
- Data fetching from database/API
- Server-side logic
- SEO-critical content
- Reducing client bundle size

#### Client Components
```typescript
// ✅ Client Component - Has 'use client' directive
'use client'

import { useState } from 'react'

export function InteractiveButton() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  )
}
```

**Use Client Components for**:
- Event handlers (onClick, onChange, onSubmit)
- Browser APIs (window, document, localStorage)
- State (useState, useReducer, useContext)
- Effects (useEffect, useLayoutEffect)
- Browser-only libraries (Framer Motion, GSAP)

#### Common Pattern: Composition
```typescript
// ✅ Server Component wraps Client Component
import { InteractiveButton } from './interactive-button'

async function Page() {
  const data = await fetchData()

  return (
    <div>
      <h1>{data.title}</h1>
      {/* Client component for interactivity */}
      <InteractiveButton />
    </div>
  )
}
```

---

## Data Fetching Patterns

### Server-Side Fetching (Preferred)
```typescript
// ✅ Fetch directly in Server Component
async function ProductPage({ params }: { params: { id: string } }) {
  const product = await db.product.findUnique({
    where: { id: params.id }
  })

  if (!product) notFound()

  return <ProductDetails product={product} />
}
```

### API Routes
```typescript
// app/api/products/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const products = await db.products.findMany()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const body = await request.json()
  const product = await db.products.create({ data: body })
  return NextResponse.json(product)
}
```

### Parallel Data Fetching
```typescript
async function Page() {
  // ✅ Fetch in parallel
  const [user, products] = await Promise.all([
    fetchUser(),
    fetchProducts()
  ])

  return <Dashboard user={user} products={products} />
}
```

---

## Styling with Tailwind CSS

### Basic Component
```typescript
export function Button({ children, variant = 'primary' }) {
  return (
    <button className="px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-90">
      {children}
    </button>
  )
}
```

### Component Variants with CVA
```typescript
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        outline: 'border-2 border-gray-300 hover:bg-gray-100',
      },
      size: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

### Responsive Design
```typescript
<div className="
  grid
  grid-cols-1     /* Mobile: 1 column */
  sm:grid-cols-2  /* Small: 2 columns */
  md:grid-cols-3  /* Medium: 3 columns */
  lg:grid-cols-4  /* Large: 4 columns */
  gap-4
">
  {/* Content */}
</div>
```

---

## Animation Patterns

### Framer Motion - Component Animations
```typescript
'use client'

import { motion } from 'framer-motion'

export function FadeInCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="rounded-lg bg-white p-6 shadow-lg"
    >
      {children}
    </motion.div>
  )
}
```

### Framer Motion - Stagger Children
```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function StaggerList({ items }: { items: string[] }) {
  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map((text, i) => (
        <motion.li key={i} variants={item}>
          {text}
        </motion.li>
      ))}
    </motion.ul>
  )
}
```

### GSAP - Timeline Animations
```typescript
'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'

export function AnimatedHero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.from('.hero-title', {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-cta', {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      ease: 'back.out(1.7)'
    }, '-=0.3')
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>
      <h1 className="hero-title">Welcome</h1>
      <p className="hero-subtitle">Subtitle</p>
      <button className="hero-cta">Get Started</button>
    </div>
  )
}
```

### Respect Reduced Motion
```typescript
'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

export function AccessibleAnimation() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5
      }}
    >
      Content
    </motion.div>
  )
}
```

---

## Form Handling with React Hook Form + Zod

### Basic Form
```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type FormData = z.infer<typeof formSchema>

export function LoginForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  async function onSubmit(data: FormData) {
    // Handle form submission
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input
        type="email"
        {...form.register('email')}
        className="border rounded px-3 py-2"
      />
      {form.formState.errors.email && (
        <p className="text-red-500 text-sm">
          {form.formState.errors.email.message}
        </p>
      )}

      <input
        type="password"
        {...form.register('password')}
        className="border rounded px-3 py-2"
      />
      {form.formState.errors.password && (
        <p className="text-red-500 text-sm">
          {form.formState.errors.password.message}
        </p>
      )}

      <button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
```

### With shadcn/ui Form Components
```typescript
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
})

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

---

## Authentication with Supabase + NextAuth

### Supabase Client Setup
```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Server-Side Auth Check
```typescript
// In Server Component
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function ProtectedPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <Dashboard user={user} />
}
```

---

## Common Patterns

### Loading States
```typescript
// app/products/loading.tsx
export default function Loading() {
  return (
    <div className="grid gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-32 bg-gray-200 animate-pulse rounded" />
      ))}
    </div>
  )
}
```

### Error Boundaries
```typescript
// app/products/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="mb-4">{error.message}</p>
      <button onClick={reset} className="px-4 py-2 bg-blue-600 text-white rounded">
        Try again
      </button>
    </div>
  )
}
```

### Not Found Pages
```typescript
// app/products/[id]/not-found.tsx
export default function NotFound() {
  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
      <p>Could not find the requested product.</p>
    </div>
  )
}
```

---

## Common Mistakes to Avoid

### ❌ Don't Use Client Components Unnecessarily
```typescript
// ❌ Bad - Client Component for static content
'use client'
function StaticHeader() {
  return <header>My Site</header>
}

// ✅ Good - Server Component
function StaticHeader() {
  return <header>My Site</header>
}
```

### ❌ Don't Fetch on Client When You Can Fetch on Server
```typescript
// ❌ Bad - Client-side data fetching
'use client'
function Products() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch('/api/products').then(r => r.json()).then(setProducts)
  }, [])
  return <div>{products.map(...)}</div>
}

// ✅ Good - Server-side data fetching
async function Products() {
  const products = await db.products.findMany()
  return <div>{products.map(...)}</div>
}
```

### ❌ Don't Use Inline Styles
```typescript
// ❌ Bad - Inline styles
<div style={{ padding: '16px', backgroundColor: 'blue' }}>

// ✅ Good - Tailwind classes
<div className="p-4 bg-blue-600">
```

### ❌ Don't Ignore TypeScript Errors
```typescript
// ❌ Bad - Using 'any' to bypass errors
const data: any = await fetch('...')

// ✅ Good - Proper typing
interface Product {
  id: string
  name: string
  price: number
}
const data: Product[] = await fetch('...')
```

---

## Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // For above-the-fold images
  placeholder="blur" // Optional: blur-up effect
/>
```

### Dynamic Imports
```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable SSR if needed
})
```

### Memoization
```typescript
import { memo } from 'react'

const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // Expensive rendering logic
  return <div>{/* ... */}</div>
})
```

---

**Last Updated**: 2025-10-16
**Maintained By**: JITD System
