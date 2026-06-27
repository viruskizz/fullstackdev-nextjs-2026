# next2026

A music catalog web app built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, and **Supabase**. Browse artists, view profiles, and watch song videos embedded from YouTube.

Bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and extended into a full-stack demo with server components, server actions, and PostgreSQL-backed data.

## Features

- **Artist catalog** — list, view, and create artists stored in Supabase
- **Song pages** — song detail with embedded YouTube player
- **GitHub sign-in** — Supabase Auth OAuth on the home page
- **Shared layout** — Navbar and Footer across all pages
- **Seed data** — sample artists, albums, and songs via `libs/dump.sql`

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (GitHub OAuth) |
| Language | TypeScript + JSX |

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```

3. Load the database schema and seed data from `libs/dump.sql` in the Supabase SQL Editor.

4. Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For full setup instructions — environment variables, GitHub OAuth, database seeding, and deployment — see **[docs/setup.md](docs/setup.md)**.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with GitHub sign-in |
| `/artists` | Artist listing |
| `/artists/create` | Create a new artist |
| `/artists/[id]` | Artist detail page |
| `/songs/[id]` | Song detail with YouTube embed |
| `/users` | Users page |
| `/products` | Products page |

## Project Structure

```
next2026/
├── app/                  # Next.js App Router pages, layouts, and server actions
│   ├── layout.tsx        # Root layout (Navbar, Footer, Roboto font)
│   ├── page.jsx          # Home page
│   ├── artists/          # Artist routes and createArtist action
│   ├── songs/            # Song detail routes
│   ├── users/
│   └── products/
├── components/           # Shared UI (Navbar, Footer, Button, Card, …)
├── libs/                 # Supabase client, auth helpers, models, seed SQL
├── public/               # Static assets
└── docs/                 # Project documentation
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Documentation

- [Setup guide](docs/setup.md) — install, configure, and run locally
