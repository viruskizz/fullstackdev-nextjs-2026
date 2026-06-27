# ui.md

````md
# next2026 UI Specification

## Goal

UI spec for next2026's three features: **Home Dashboard**, **Watch Song**, and **User Watch History** (surfaced as Continue listening on home). The experience is dark, minimal, and content-first — inspired by the YouTube home layout in [`homepage.png`](homepage.png), not a full YouTube clone.

For data flow and behavior, see [`architecture.md`](architecture.md).

---

## Design Principles

- Dark mode
- Modern and minimal
- Rounded corners (12px on cards)
- Responsive
- Focus on content, not navigation
- No permanent left sidebar

---

## Tech Stack

| Item | Value |
|------|-------|
| Framework | Next.js 16, React 19 |
| Styling | Tailwind CSS 4 |
| Font | Roboto (configured in `app/layout.tsx`) |
| Icons | Inline SVG only when needed |

---

# Global Layout

```text
+--------------------------------------------------------------+
| Logo    Home                              [Sign in / Avatar] |
+--------------------------------------------------------------+
|                                                              |
|                     Page Content                             |
|                                                              |
+--------------------------------------------------------------+
| Footer                                                       |
+--------------------------------------------------------------+
```

### Navbar

- Logo (left)
- Home link
- GitHub sign-in button or user avatar (right)
- Dark bar styling aligned with YouTube (`#0F0F0F` background)
- Extend existing `components/Navbar.jsx`

### Footer

- Keep existing `components/Footer.jsx`

**Not in navbar:** search bar, category chips, create button, notifications bell.

---

# Home Dashboard (`/`)

Visual reference for the song grid: [`homepage.png`](homepage.png).

Layout is two stacked sections — **Continue listening on top**, **Discover grid below**. No hero banner.

```text
+--------------------------------------------------------------+
| Continue listening                                           |
| [card] [card] [card] [card]  -->                           |
+--------------------------------------------------------------+
| Discover                                                     |
| +----------+ +----------+ +----------+ +----------+           |
| | thumb    | | thumb    | | thumb    | | thumb    |           |
| |    [3:48]| |   [12:04]| |    [4:21]| |  [1:01:10]|          |
| +----------+ +----------+ +----------+ +----------+           |
| (o) Title    (o) Title    (o) Title    (o) Title             |
|     Artist       Artist       Artist       Artist            |
| ...more rows...                                              |
+--------------------------------------------------------------+
```

---

## Section A — Continue listening (top panel)

Horizontal scroll row for signed-in users with watch history.

### Content

- Section title: **Continue listening**
- Each item: thumbnail, song title, artist name, progress bar or resume indicator (`progress` / `duration_seconds` from `watch_history`)
- Click navigates to `/songs/[id]` to resume playback

### States

- **Signed in with history** — show horizontal scroll of cards
- **Signed in, no history** — hide section
- **Anonymous** — hide section or show a short prompt with sign-in button

### Card layout

Reuse `SongCard` in a horizontal layout. Show a thin progress bar below the thumbnail to indicate how far the user watched.

---

## Section B — Discover songs (grid below)

YouTube-style responsive grid matching [`homepage.png`](homepage.png).

### Section title

**Discover** or **All songs**

### Grid breakpoints

| Viewport | Columns |
|----------|---------|
| Desktop | 4 |
| Tablet | 3 |
| Mobile | 2 |

### Song card anatomy

```text
+------------------+
|                  |
|    Thumbnail     |
|           [3:48] |  <- duration badge, bottom-right
+------------------+
(o) Song title (max 2 lines, bold)
    Artist name (secondary)
    Genre or album (tertiary, optional)
```

Per card:

- Cover image (`song.cover_image`, album cover as fallback)
- Duration badge overlaid on thumbnail (bottom-right, dark background)
- Small circular artist avatar (`artists.image`) beside metadata
- Song title — bold white, max 2 lines
- Artist name — gray secondary text
- Optional tertiary line: album title or genre

### Hover state

- Slight thumbnail zoom
- Play icon overlay on thumbnail
- Card background lift to `#262626`
- Soft shadow

### Interaction

- Entire card is a link to `/songs/[id]`

---

# Watch Song (`/songs/[id]`)

Simplified watch page — player and metadata only.

```text
+--------------------------------------------------------------+
|                                                              |
|                  YouTube embed player (16:9)                 |
|                                                              |
+--------------------------------------------------------------+
Song Title
Artist name • Duration
[Optional: thin progress indicator when resuming from history]
```

### Requirements

- Player full width on mobile; ~70–75% centered on desktop
- Song metadata immediately below the player
- `VideoPlayer` client component handles YouTube embed and progress tracking for signed-in users
- No recommendation sidebar, no left navigation

### Not on this page

Related songs, likes, favorites, playlists, share, description block, comments.

---

# Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `Navbar` | `components/Navbar.jsx` | Logo, Home, auth |
| `Footer` | `components/Footer.jsx` | Site footer |
| `GithubSignInButton` | `components/GithubSignInButton.jsx` | Auth CTA |
| `ContinueListening` | `components/dashboard/` | Top home panel |
| `SongCard` | `components/dashboard/` | Card for grid and horizontal scroll |
| `SongGrid` | `components/dashboard/` | Responsive discover grid |
| `VideoPlayer` | `components/player/` | YouTube embed + progress tracking |
| `SongInfo` | `components/player/` | Title, artist, duration below player |

---

# Visual Style

| Token | Value |
|-------|-------|
| Background | `#0F0F0F` |
| Surface / card | `#181818` |
| Hover | `#262626` |
| Primary accent | `#FF0000` (play actions) |
| Text primary | `#FFFFFF` |
| Text secondary | `#AAAAAA` |
| Thumbnail radius | 8px |
| Card radius | 12px |
| Font | Roboto |

Duration badge: small dark pill (`rgba(0,0,0,0.8)`), white text, bottom-right of thumbnail.

---

# UX Guidelines

- Lazy image loading via `next/image`
- Skeleton placeholders for Continue listening and Discover grid while data loads
- Responsive layout at all breakpoints
- Keyboard focus visible on links and cards
- Semantic HTML for headings and navigation

**Out of scope for UX:** infinite scroll, page transition animations, keyboard shortcuts.

---

# Out of Scope

These appear in [`homepage.png`](homepage.png) or the old UI spec but are **not** part of next2026:

- Search bar and voice search
- Category filter chips
- Hero / featured banner
- Create button and notifications bell
- Artist profile pages
- Favorites, playlists, likes, share
- Comments and descriptions on watch page
- Dedicated `/history` page
- Infinite scroll and advanced animations

See [`architecture.md`](architecture.md) for the full feature and implementation scope.

---

## Overall Experience

The UI should feel like a focused slice of YouTube's home page — dark theme, song cards in a grid, continue watching at the top — built only for discovering songs, watching them, and picking up where you left off.
````
