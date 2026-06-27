# next2026 Implementation Guide

Step-by-step build order for the three v1 features: **Home Dashboard**, **Watch Song**, and **Continue listening**.

Reference docs:

| Doc | Purpose |
|-----|---------|
| [architecture.md](architecture.md) | System design, features, folder structure |
| [database.md](database.md) | Schema, queries, RLS |
| [ui.md](ui.md) | Visual spec (overrides architecture on UI details) |

**UI precedence:** No hero banner. Home layout is **Continue listening** (top) + **Discover grid** (below).

---

## Prerequisites

1. Supabase project with env vars in `.env.local`
2. Run [`libs/dump.sql`](../../libs/dump.sql) in the Supabase SQL Editor (creattion catalog seed + `watch_history` schema)
3. GitHub OAuth configured (optional, required for watch history)

---

## Phase 1 — Foundation

### 1.1 Database

Run the full [`libs/dump.sql`](../../libs/dump.sql) script. It creates:

- Catalog tables: `artists`, `albums`, `songs` (seeded)
- `watch_history` table (empty — populated at runtime)
- Indexes and RLS policies

Re-running the dump **drops and recreates all tables**, including `watch_history`. User watch history is lost on re-seed.

### 1.2 Dependencies

```bash
npm install @supabase/ssr
```

### 1.3 Server Supabase client

Create `libs/supabase-server.js` using `@supabase/ssr` so Server Components and Server Actions can read the authenticated session (required for RLS on `watch_history`).

Keep `libs/supabase.js` for browser/client usage.

### 1.4 Theme and config

| File | Change |
|------|--------|
| `app/globals.css` | Dark tokens: `#0F0F0F`, `#181818`, `#262626`, `#AAAAAA` |
| `app/layout.tsx` | Dark background on body; update metadata |
| `next.config.ts` | `images.remotePatterns` for `picsum.photos`, `i.ytimg.com`, `avatars.githubusercontent.com` |

---

## Phase 2 — Data layer

### 2.1 Extend `libs/models/song.js`

| Method | Purpose |
|--------|---------|
| `getDiscoverList()` | All songs with album + artist joins for the home grid |
| `getByIdWithDetails(id)` | Song detail with album title, artist name, artist image |
| `getId(id)` | Keep for backward compatibility or delegate to `getByIdWithDetails` |

See example queries in [database.md](database.md).

### 2.2 Create `libs/models/watchHistory.js`

| Method | Purpose |
|--------|---------|
| `listForUser(userId, limit)` | Continue listening rows, ordered by `watched_at DESC` |
| `upsertProgress(userId, songId, progressSeconds)` | INSERT … ON CONFLICT upsert |
| `getProgress(userId, songId)` | Single row for resume on watch page |

### 2.3 Create `app/songs/actions.js`

```js
'use server'
export async function saveWatchProgress(songId, progress) { ... }
```

- Get user from server Supabase client
- No-op if anonymous
- Cap `progress` at song duration
- Call `watchHistory.upsertProgress`

---

## Phase 3 — Home dashboard

### 3.1 Convert `app/page.jsx` to async Server Component

Data flow:

1. `songModel.getDiscoverList()` — always
2. Server Supabase `getUser()` — if signed in, `watchHistory.listForUser(user.id)`
3. Render `ContinueListening` (if history exists) + `SongGrid`

### 3.2 Dashboard components (`components/dashboard/`)

| Component | Notes |
|-----------|-------|
| `SongCard.jsx` | Thumbnail, duration badge, artist avatar, hover states; `variant="grid"` \| `"horizontal"` |
| `SongGrid.jsx` | Responsive: 4 / 3 / 2 columns |
| `ContinueListening.jsx` | Horizontal scroll; progress bar when `progress` prop set |

### 3.3 Navbar (`components/Navbar.jsx`)

- Background `#0F0F0F`
- Nav links: Home only (v1 scope)
- Right: GitHub sign-in when anonymous; avatar + name when signed in

### Continue listening states

| State | Behavior |
|-------|----------|
| Signed in + history | Show horizontal scroll row |
| Signed in, no history | Hide section |
| Anonymous | Hide section |

---

## Phase 4 — Watch song + progress

### 4.1 Player components (`components/player/`)

| Component | Notes |
|-----------|-------|
| `VideoPlayer.jsx` | Client: YouTube iframe, report progress every ~10s via `saveWatchProgress` |
| `SongInfo.jsx` | Title, artist, formatted duration |

### 4.2 Update `app/songs/[id]/page.jsx`

- Use `getByIdWithDetails(id)`
- Fetch initial progress for signed-in user
- Layout: full width mobile, ~70–75% centered desktop
- Pass `initialProgress` to `VideoPlayer`

### Progress rules

- Save only when signed in
- Upsert on play + periodic updates (throttled client-side)
- Cap progress at `duration_seconds`

### YouTube resume (v1)

If IFrame API seek on load is feasible, seek to saved `progress`. Otherwise show progress on home cards only and start playback from the beginning on the watch page.

---

## Phase 5 — Verification checklist

| Step | Expected |
|------|----------|
| Re-run dump in Supabase | All tables, indexes, policies created |
| `/` anonymous | Discover grid visible; no Continue listening |
| Sign in via GitHub | Navbar shows avatar |
| Watch a song (signed in) | Progress saved to `watch_history` |
| Return to `/` | Continue listening row with progress bars |
| Click continue card | Opens `/songs/[id]` |
| Responsive layout | 4 / 3 / 2 grid columns at desktop / tablet / mobile |
| `npm run build` | Passes with no errors |

---

## Out of scope

Do not build in this phase:

- Hero / featured banner
- Search, categories, favorites, playlists
- Dedicated `/history` route
- Artist profile redesign

Existing `/artists` routes remain but are not part of v1 dashboard work.

---

## File checklist

| Action | Path |
|--------|------|
| Create | `docs/plan/implementation.md` |
| Update | `libs/dump.sql` |
| Create | `libs/supabase-server.js` |
| Create | `libs/models/watchHistory.js` |
| Create | `app/songs/actions.js` |
| Update | `libs/models/song.js` |
| Create | `components/dashboard/SongCard.jsx`, `SongGrid.jsx`, `ContinueListening.jsx` |
| Create | `components/player/VideoPlayer.jsx`, `SongInfo.jsx` |
| Update | `app/page.jsx`, `app/songs/[id]/page.jsx` |
| Update | `components/Navbar.jsx`, `app/globals.css`, `next.config.ts`, `app/layout.tsx` |
