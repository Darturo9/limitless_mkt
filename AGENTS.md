# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router application using strict TypeScript. Public pages live in `app/(site)/` (`/`, `/blog`, `/galeria`); authenticated content management pages live in `app/admin/`; server endpoints are under `app/api/`. Reusable UI belongs in `components/`, with animation primitives in `components/animations/`. Shared clients, constants, and integrations belong in `lib/` (`lib/supabase.ts`, `lib/gsap.ts`). Static images, fonts, icons, and the portfolio PDF belong in `public/`.

## Build, Test, and Development Commands

Run these from the repository root:

```bash
npm install       # Install the locked dependency set
npm run dev       # Start the local Next.js development server
npm run lint      # Run ESLint with Next.js Core Web Vitals rules
npx tsc --noEmit  # Check strict TypeScript without emitting files
npm run build     # Create the production build
npm start         # Serve the latest production build locally
```

`npm start` requires a successful `npm run build`. Configure local secrets from `.env.example` before testing Supabase, email, admin authentication, or revalidation flows.

## Coding Style & Naming Conventions

Use two-space indentation, semicolons, double-quoted strings, and strict TypeScript types. Keep components and files in PascalCase (`ProjectCard.tsx`), variables and functions in camelCase, and route segments lowercase; use dynamic segments such as `[slug]` and `[id]`. Prefer the `@/*` import alias. Follow the client/server boundary: add `"use client"` only to interactive components. ESLint is the enforced linter; no Prettier configuration is present.

## Testing Guidelines

No automated test framework or coverage threshold is currently configured. Every change should at minimum pass `npm run lint`, `npx tsc --noEmit`, and `npm run build`. For UI changes, manually check the affected public route and responsive behavior; for admin or API changes, also exercise authentication, CRUD, contact, or revalidation behavior with valid local environment variables.

## Commit & Pull Request Guidelines

History is mixed, but recent commits use concise Conventional Commit prefixes such as `feat:`, `perf:`, and `fix:`. Prefer an imperative subject under roughly 72 characters, for example `fix: validate contact form recipients`. Pull requests should explain the user-visible change, list validation commands, identify environment or Supabase changes, and include screenshots or recordings for visual updates. Keep unrelated refactors out of the same PR.

## Security & Configuration Tips

Never commit `.env.local`, SMTP passwords, or `REVALIDATE_SECRET`. Use `.env.example` as the configuration reference and keep server-only secrets out of client components. Verify image-host changes in `next.config.ts` and review Supabase authentication/storage permissions when changing admin or upload flows.
