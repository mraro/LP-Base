# 3S-CARS - Claude Code Configuration

## Context
3S-CARS Landing Page - A modern landing page for automotive services

**Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS, Supabase, NextAuth, Framer Motion, GSAP

**Core Principle**: Server-first architecture with minimal client-side JavaScript, modern animations, and seamless authentication

---

## JITD Workflow (CRITICAL - ENFORCE STRICTLY)

### SESSION START PROTOCOL (MANDATORY)

**🚨 EVERY new conversation/session MUST begin with**:

```bash
/jitd:start
```

**What `/jitd:start` does**:
1. Loads `.agent/DEVELOPMENT-README.md` (navigator)
2. Checks for assigned tasks from PM tool
3. Sets JITD workflow context
4. Activates token optimization strategy
5. Reminds about agent usage for complex tasks

**If user doesn't explicitly run `/jitd:start`**:
- You MUST proactively run it or ask to run it
- Never proceed with work without loading navigator
- This is NOT optional - it's the foundation of JITD

**Alternative (if `/jitd:start` unavailable)**:
```
Read .agent/DEVELOPMENT-README.md
```

---

### 1. Read Documentation Navigator First (Always)

**AFTER running `/jitd:start`, the navigator is loaded**:

This navigator provides:
- Documentation index
- "When to read what" decision tree
- Current task context
- Quick start guides
- Integration setup status

**Never load all docs at once** - This defeats JITD's purpose

### 2. Lazy-Load Documentation Based on Task

**Implementing feature?**
```
1. Read .agent/DEVELOPMENT-README.md (2k)
2. Read relevant .agent/tasks/TASK-XX-feature.md (3k)
3. Read relevant .agent/system/ doc (5k)
Total: 10k tokens vs 150k
```

**Debugging issue?**
```
1. Read .agent/DEVELOPMENT-README.md (2k)
2. Check .agent/sops/debugging/ for relevant SOP (2k)
3. Read relevant system doc if needed (5k)
Total: 9k tokens vs 150k
```

**Adding integration?**
```
1. Read .agent/DEVELOPMENT-README.md (2k)
2. Check .agent/sops/integrations/ for similar pattern (2k)
3. Read .agent/system/project-architecture.md (5k)
Total: 9k tokens vs 150k
```

### 3. Update Documentation As You Go

**After completing feature**:
```bash
/jitd:update-doc feature TASK-XX
```

**After solving novel issue**:
```bash
/jitd:update-doc sop debugging issue-name
```

**After architecture change**:
```bash
/jitd:update-doc system architecture
```

### 4. Smart Compact Strategy

**Run `/jitd:compact` after**:
- Completing isolated sub-task
- Finishing documentation update
- Creating SOP
- Switching between unrelated tasks

**Don't compact when**:
- In middle of feature implementation
- Context needed for next sub-task
- Debugging complex issue

---

## Code Standards

### Architecture
- KISS, DRY, SOLID principles
- Server-first approach (Server Components by default)
- Client components only when needed for interactivity
- API routes for server-side operations

### Next.js 15 + React 19 Patterns
- **Server Components by default** (no 'use client' unless interactive)
- Functional components only, no classes
- TypeScript strict mode, avoid `any` without justification
- Async/await for data fetching on server
- SEO optimization through SSR

### Styling
- **Tailwind CSS v4** for all styling
- No inline styles unless absolutely necessary
- Use CSS variables for theming
- Responsive-first design (mobile → desktop)
- shadcn/ui components with Radix UI primitives

### TypeScript
- Strict mode enabled
- No `any` without justification
- Type all function parameters and returns
- Use interfaces for object shapes
- Leverage type inference when clear

### Animations
- **Framer Motion** for React-based animations
- **GSAP** for complex timeline animations
- Performance-first (60fps target)
- Respect `prefers-reduced-motion`

### Forms & Validation
- React Hook Form for form state
- Zod for schema validation
- @hookform/resolvers for integration

### Line Length
- Max 100 characters per line
- Use Prettier for formatting

### Testing
- High coverage targets: backend 90%+, frontend 85%+
- Test user flows, not implementation

---

## Forbidden Actions

### JITD Violations (HIGHEST PRIORITY)
- ❌ NEVER load all `.agent/` docs at once (defeats context optimization)
- ❌ NEVER skip reading DEVELOPMENT-README.md (navigator is essential)
- ❌ NEVER create docs outside `.agent/` structure (breaks discovery)
- ❌ NEVER skip documentation after completing features (knowledge loss)

### General Violations
- ❌ No Claude Code mentions in commits/code
- ❌ No package.json modifications without approval
- ❌ Never commit secrets/API keys/.env files
- ❌ Don't delete tests without replacement
- ❌ No 'use client' without justification (breaks SSR-first principle)
- ❌ No inline styles (use Tailwind)
- ❌ No class components (functional only)

---

## Development Workflow

1. **Read Navigator First** → `.agent/DEVELOPMENT-README.md`
2. **Check Task Context** → Load only current task doc
3. **Load Relevant Docs** → Only what's needed for current work
4. **Plan** → Use TodoWrite for complex tasks
5. **Implement** → Follow Next.js 15 + React 19 patterns
6. **Test** → Run tests, verify functionality
7. **Document** → `/jitd:update-doc feature TASK-XX` when complete
8. **Compact** → Run `/jitd:compact` after isolated tasks

---

## Documentation System

### Structure
```
.agent/
├── DEVELOPMENT-README.md      # Navigator (always load first)
├── tasks/                     # Implementation plans
├── system/                    # Living architecture docs
└── sops/                      # Standard Operating Procedures
    ├── integrations/
    ├── debugging/
    ├── development/
    └── deployment/
```

### Load Strategy (Token Optimization)
**Always load**: `.agent/DEVELOPMENT-README.md` (~2k tokens)
**Load for current work**: Specific task doc (~3k tokens)
**Load as needed**: Relevant system doc (~5k tokens)
**Load if required**: Specific SOP (~2k tokens)
**Total**: ~12k tokens vs ~150k if loading all docs

### Slash Commands
```bash
/jitd:init                     # Initialize JITD in project (one-time setup)
/jitd:start                    # Start JITD session (EVERY new conversation)
/jitd:update-doc feature TASK-XX    # Archive implementation plan
/jitd:update-doc sop <category> <name>  # Create SOP
/jitd:update-doc system <doc-name>  # Update architecture doc
/jitd:marker [name]            # Create context save point (anytime)
/jitd:markers                  # Manage markers: list, load, clean
/jitd:compact                  # Smart context compact
```

---

## Project Management Integration (Optional)

### Supported Tools
- **Linear**: Full MCP integration
- **GitHub Issues**: Via gh CLI
- **Jira**: Via API
- **GitLab**: Via glab CLI
- **None**: Manual documentation from conversation

### Workflow (if configured)
```
1. Read ticket via PM tool
2. Generate implementation plan → .agent/tasks/
3. Implement features
4. Update system docs as architecture evolves
5. Complete → /jitd:update-doc feature TASK-XX
6. Notify team (if chat configured)
```

---

## Context Optimization

### Token Budget Strategy
- System + tools: ~50k (fixed)
- CLAUDE.md: ~15k (this file, optimized)
- Message history: ~60k (managed via /jitd:compact)
- **Documentation**: ~66k (on-demand loading)

### /jitd:compact Strategy
**Run after**:
- Completing isolated sub-task
- Finishing documentation update
- Creating SOP
- Research phase before implementation
- Resolving blocker

**Don't run when**:
- In middle of feature
- Context needed for next sub-task
- Debugging complex issue

---

## Commit Guidelines

- Format: `type(scope): description`
- Reference ticket: `feat(feature): implement X TASK-XX`
- No Claude Code mentions
- Concise and descriptive
- Examples:
  - `feat(auth): add Supabase authentication`
  - `fix(ui): resolve button hover animation glitch`
  - `refactor(api): optimize data fetching`

---

## Quick Reference

### Start Session
```
1. Run /jitd:start (loads navigator, checks PM tool, sets context)
2. Select task to work on
3. Load only that task's docs
```

### During Work
```
1. Follow JITD lazy-loading (don't load everything)
2. Use TodoWrite for complex tasks
3. Create SOPs for new patterns discovered
4. Update system docs if architecture changes
```

### After Completion
```
1. /jitd:update-doc feature TASK-XX
2. Update ticket status (if PM configured)
3. /jitd:compact to clear context
```

---

## Configuration

JITD configuration stored in `.agent/.jitd-config.json`:

```json
{
  "version": "1.0.0",
  "project_management": "none",
  "task_prefix": "TASK",
  "team_chat": "none",
  "auto_load_navigator": true,
  "compact_strategy": "conservative"
}
```

**Customize after `/jitd:init`**

---

## Success Metrics

### Context Efficiency
- [ ] <70% token usage for typical tasks
- [ ] <12,000 tokens loaded per session (documentation)
- [ ] 10+ exchanges per session without compact
- [ ] Zero session restarts during features

### Documentation Coverage
- [ ] 100% completed features have task docs
- [ ] 90%+ integrations have SOPs
- [ ] System docs updated within 24h of changes
- [ ] Zero repeated mistakes (SOPs working)

### Productivity
- [ ] 10x more work per token spent (vs no JITD)
- [ ] Team finds docs within 30 seconds
- [ ] New developers productive in 48 hours

---

## JITD Benefits Reminder

**Token Savings**: 92% reduction (12k vs 150k tokens)
**Context Available**: 86%+ free for actual work
**Session Restarts**: Zero (vs 3-4 per day without JITD)
**Productivity**: 10x more commits per token spent

---

## Project-Specific Guidelines

### Next.js 15 + React 19 SSR-First Principles

**Server Components (Default)**:
- All components are Server Components by default
- Only add 'use client' when you need:
  - Browser APIs (window, document, localStorage)
  - Event handlers (onClick, onChange, etc.)
  - State (useState, useReducer)
  - Effects (useEffect, useLayoutEffect)
  - Browser-only libraries

**Data Fetching**:
```typescript
// ✅ Good - Server Component with async/await
async function Page() {
  const data = await fetch('...')
  return <div>{data}</div>
}

// ❌ Bad - Client Component with useEffect
'use client'
function Page() {
  const [data, setData] = useState()
  useEffect(() => { fetch('...') }, [])
  return <div>{data}</div>
}
```

**Styling with Tailwind**:
- Use Tailwind utility classes
- Create reusable components with shadcn/ui
- Use CSS variables for theming
- Responsive design: `sm:`, `md:`, `lg:`, `xl:` prefixes

**Animations**:
```typescript
// Framer Motion for component animations
'use client'
import { motion } from 'framer-motion'

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      Content
    </motion.div>
  )
}

// GSAP for complex timelines
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
```

**Authentication with Supabase + NextAuth**:
- Use Supabase for database and auth backend
- NextAuth v5 for session management
- Server-side auth checks in Server Components
- Client-side auth UI with 'use client'

**Form Handling**:
```typescript
'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  // ...
})

export function ContactForm() {
  const form = useForm({
    resolver: zodResolver(schema)
  })
  // ...
}
```

---

**For complete JITD documentation**: See `.agent/DEVELOPMENT-README.md`

**Last Updated**: 2025-10-16
**JITD Version**: 1.0.0
