# Documentation

Project documentation for **next2026**.

## Guides

| Guide | Description |
|-------|-------------|
| [Setup](setup.md) | Install dependencies, configure Supabase, seed the database, enable GitHub OAuth, and run the app |

## Plan

| Doc | Description |
|-----|-------------|
| [Architecture](plan/architecture.md) | System design, features, and folder structure |
| [Database](plan/database.md) | Schema, queries, and RLS |
| [UI](plan/ui.md) | Visual specification |
| [Implementation](plan/implementation.md) | Phased build order and verification checklist |

## About the Project

**next2026** is a music catalog app that demonstrates modern Next.js patterns:

- **Server Components** for data fetching (e.g. artist and song pages)
- **Server Actions** for form submissions (`app/artists/actions.js`)
- **Supabase** as the backend for PostgreSQL data and GitHub OAuth
- **App Router** file-based routing under `app/`

### Data Model

The database schema (defined in `libs/dump.sql`) has four related tables:

```
auth.users ──< watch_history
artists ──< albums ──< songs ──< watch_history
```

- **artists** — name, genre, image
- **albums** — title, release year, cover image (linked to an artist)
- **songs** — title, track number, duration, cover image, YouTube URL (linked to an album)
- **watch_history** — per-user playback progress (linked to auth.users and songs)

Data access is handled by model modules in `libs/models/` (`artist.js`, `song.js`, `watchHistory.js`).

### Key Files

| Path | Purpose |
|------|---------|
| `libs/supabase.js` | Supabase client (reads env vars) |
| `libs/authentication.js` | GitHub sign-in, getUser, signOut |
| `libs/models/artist.js` | CRUD queries for the artists table |
| `libs/models/song.js` | Queries for the songs table |
| `libs/models/watchHistory.js` | Watch history upsert and list queries |
| `app/artists/actions.js` | Server action to create artists |
| `components/GithubSignInButton.jsx` | OAuth trigger on the home page |
