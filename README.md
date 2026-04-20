# NewsHub

https://news-hub-6gcx.vercel.app/

NewsHub is a news aggregation application built with Next.js 16.2.0, React 19, TypeScript, and styled-components. It fetches news content from NewsAPI.org, handles user authentication via Supabase Auth, and persists bookmarks and likes using MongoDB + Mongoose.

The current implementation includes browsing, category filtering, keyword search, article detail view, likes, bookmarks, and a complete authentication flow.

## Tech Stack

- **Frontend Framework**: Next.js 16.2.0, React 19
- **Language**: TypeScript
- **Styling**: styled-components
- **Authentication**: Supabase Auth
- **Database**: MongoDB + Mongoose
- **External Content Source**: NewsAPI.org

## Project Structure

The project uses the App Router and follows Next.js 16 conventions. The root-level `proxy.ts` file replaces the old Middleware in Next.js 16.

```
.
|-- app/
|   |-- actions/
|   |   `-- auth.ts                 # Auth-related Server Actions
|   |-- api/
|   |   |-- bookmarks/
|   |   |   |-- [id]/route.ts       # Delete a bookmark
|   |   |   `-- route.ts            # Get / create bookmarks
|   |   |-- likes/
|   |   |   `-- [id]/route.ts       # Like count + toggle like
|   |   `-- news/
|   |       `-- route.ts            # News fetch, search, category, caching
|   |-- article/
|   |   `-- [id]/page.tsx           # Article detail page
|   |-- auth/
|   |   `-- callback/route.ts       # Supabase OAuth / email callback
|   |-- bookmarks/page.tsx          # Bookmarks page
|   |-- components/
|   |   |-- ArticleDetail.tsx
|   |   |-- BookmarkList.tsx
|   |   |-- CategoryTabs.tsx
|   |   |-- Navbar.tsx
|   |   |-- NewsCard.tsx
|   |   `-- SearchBar.tsx
|   |-- forgot-password/page.tsx
|   |-- login/page.tsx
|   |-- reset-password/page.tsx
|   |-- search/page.tsx
|   |-- signup/page.tsx
|   |-- favicon.ico
|   |-- globals.css
|   |-- layout.tsx
|   `-- registry.tsx                # styled-components SSR + Providers
|-- context/
|   `-- BookmarkContext.tsx         # Global bookmark state
|-- lib/
|   |-- mongodb.ts                  # MongoDB connection helper
|   `-- supabase/
|       |-- client.ts               # Browser Supabase client
|       `-- server.ts               # Server Supabase client
|-- models/
|   |-- Bookmark.ts
|   `-- Like.ts
|-- public/
|-- styles/
|-- types/
|   `-- index.ts
|-- next.config.ts
|-- proxy.ts                        # Request proxy + session refresh
|-- package.json
`-- tsconfig.json
```

## Core Modules

### 1. Routing & Pages

- **app/page.tsx** — Homepage showing latest news
- **app/search/page.tsx** — Keyword search results
- **app/article/[id]/page.tsx** — Article detail view
- **app/bookmarks/page.tsx** — User bookmarks
- **app/login / signup / forgot-password / reset-password** — Full auth flow

### 2. API Layer

- **GET /api/news**
  - Fetch news list
  - Category filtering
  - Keyword search
  - Article detail
  - Includes 15-minute in-memory caching

- **POST /api/bookmarks**
  - Get bookmarks
  - Add bookmark

- **DELETE /api/bookmarks/[id]**
  - Delete bookmark

- **POST/GET /api/likes/[id]**
  - Get like count
  - Toggle like

### 3. Data & Services

- **Supabase Auth**
  - Server-side client for SSR
  - Browser client for client-side auth

- **MongoDB + Mongoose**
  - Bookmark model
  - Like model
  - Singleton connection to avoid hot-reload issues

- **BookmarkContext**
  - Client-side global bookmark state

### 4. Styling & Global Providers

- **layout.tsx**
  - Reads Supabase user on server
  - Passes user to Navbar

- **registry.tsx**
  - styled-components SSR
  - BookmarkProvider

## Implemented Features

### News Homepage

- Fetches `/api/news?category=all`
- Category tabs: All, Tech, World, Culture, Finance, Sports
- Search bar

### Keyword Search

- Route: `/search?q=keyword`
- Shows result count, empty state

### Article Detail

- Category, title, author, date
- Cover image
- Summary or content snippet
- Link to original article

### Likes

- Route: `/api/likes/[id]`
- Toggle like
- Persisted in MongoDB
- Current implementation uses a unique index per article → like count is effectively 0 or 1

### Bookmarks

- Add / remove bookmark
- Bookmark list page
- Persisted in MongoDB
- Current implementation is not user-isolated (global bookmarks)

### Share

- Uses Web Share API when available
- Fallback: copy link to clipboard

### Authentication

- Email/password login
- Email/password signup
- Google OAuth
- Forgot password email
- Reset password flow
- Session refresh via `proxy.ts`
- Redirect logged-in users away from auth pages

## Data Flow

### News Data

- Not stored in DB
- Fetched from NewsAPI.org
- Cached in memory for 15 minutes
- Article ID = base64url(original URL)

### Bookmarks & Likes

- Stored in MongoDB
- Mongoose models reused safely across hot reloads

## Environment Variables

### Required

```env
NEWS_API_KEY=
MONGODB_URI=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### Optional (for Google OAuth)

Configure Google provider in Supabase console

## Local Development

```bash
npm install
npm run dev
```

Default URL: `http://localhost:3000`

## Current Limitations

- Bookmarks and likes are not user-isolated
- Like model only supports 0/1 (not per-user likes)
- No persistent article storage
- No automated tests yet
