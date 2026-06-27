# Project Setup

This guide covers how to install, configure, and run the **next2026** project locally.

See the [project README](../README.md) for an overview and the [docs index](README.md) for architecture and key files.

## Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- npm (included with Node.js)
- A [Supabase](https://supabase.com/) project

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (GitHub OAuth) |

## Installation

1. Clone the repository and enter the project directory:

```bash
cd next2026
```

2. Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_KEY=your_supabase_anon_key
```

These values are used by `libs/supabase.js` to connect to Supabase. Find them in the Supabase dashboard under **Project Settings → API**.

Optional:

```env
ENVIRONMENT=development
```

## Database Setup

The project includes a seed script at `libs/dump.sql` with sample data for a music app:

- **artists** — artist name, genre, image
- **albums** — linked to artists via `artist_id`
- **songs** — linked to albums via `album_id`
- **watch_history** — per-user playback progress (schema only; populated when signed-in users watch songs)

To load the schema and seed data:

1. Open your Supabase project dashboard.
2. Go to **SQL Editor**.
3. Paste the contents of `libs/dump.sql` and run the script.

**Note:** Re-running the dump drops and recreates all tables, including `watch_history`. Catalog seed data is restored, but user watch history is lost.

## GitHub OAuth (Optional)

The home page includes GitHub sign-in via Supabase Auth. To enable it:

1. In Supabase, go to **Authentication → Providers → GitHub**.
2. Create a GitHub OAuth App and add the Client ID and Secret.
3. Set the callback URL to your Supabase auth callback (shown in the Supabase dashboard).

Auth helpers live in `libs/authentication.js`.

## Running the Project

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The dev server hot-reloads as you edit files.

### Production Build

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## Available Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/artists` | Artist listing |
| `/artists/create` | Create a new artist |
| `/artists/[id]` | Artist detail page |
| `/songs/[id]` | Song detail page |
| `/users` | Users page |
| `/products` | Products page |

## Project Structure

```
next2026/
├── app/                  # Next.js App Router pages and layouts
│   ├── layout.tsx        # Root layout (Navbar, Footer, Roboto font)
│   ├── page.jsx          # Home page
│   ├── artists/          # Artist routes and server actions
│   ├── songs/            # Song routes
│   ├── users/
│   └── products/
├── components/           # Shared UI components
├── libs/                 # Supabase client, auth, models, seed SQL
├── public/               # Static assets
└── docs/                 # Project documentation
```

## Notes

- Only files named `page.jsx` (or `page.tsx`) under `app/` become routes. Files like `app/server.jsx` and `app/client.jsx` are not routes unless imported by a page.
- Supabase queries must have valid credentials in `.env.local`; missing values will cause runtime errors on data-fetching pages.
