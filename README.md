# Silk Road — Storefront

Customer-facing storefront for the Silk Road e-commerce platform: product catalog with category filtering and pagination, product pages with reviews, cart, checkout and customer accounts with email verification.

Built with **React 18** and **TypeScript**, styled with **Tailwind CSS**, routed with **React Router 7**.

> Backend API: [silk_road_e-commerce_backend](https://github.com/MergenUchiha/silk_road_e-commerce_backend)

---

## Table of contents

- [Tech stack](#tech-stack)
- [Features](#features)
- [Routes](#routes)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [How authentication works](#how-authentication-works)
- [Project structure](#project-structure)
- [Scripts](#scripts)

---

## Tech stack

| Layer      | Choice                                        |
| ---------- | --------------------------------------------- |
| Framework  | React 18 + TypeScript (Create React App)      |
| Routing    | React Router 7                                |
| Styling    | Tailwind CSS                                  |
| Icons      | lucide-react                                  |
| Analytics  | PostHog (optional)                            |
| Data layer | `fetch` wrapper with automatic token refresh  |

## Features

- **Catalog** — category filter, pagination, product cards linking to shareable product URLs.
- **Product page** — image gallery, quantity picker, customer reviews with ratings.
- **Cart** — quantity updates, item removal, running total, checkout with shipping details.
- **Accounts** — registration, email verification with a 6-digit code, login, profile editing.
- **Orders** — order history with details and cancellation.
- **Session handling** — expired access tokens are refreshed transparently; the failed request is replayed instead of bouncing the user to the login page.
- **Guarded routes** — `/orders` and `/profile` redirect signed-out visitors to login and remember where they came from.

## Routes

| Path                    | Page              | Access        |
| ----------------------- | ----------------- | ------------- |
| `/`                     | Home              | public        |
| `/products`             | Catalog           | public        |
| `/products/:productId`  | Product details   | public        |
| `/about`                | About             | public        |
| `/cart`                 | Cart & checkout   | public        |
| `/login`                | Login             | guests only   |
| `/register`             | Registration      | guests only   |
| `/verification/:userId` | Email verification| public        |
| `/orders`               | Order history     | signed in     |
| `/profile`              | Profile           | signed in     |
| `*`                     | 404               | public        |

Every view has its own URL, so pages can be bookmarked, shared and navigated with the browser's back button.

## Getting started

Requirements: Node.js 18+ (or Bun 1.x) and a running Silk Road API.

```bash
git clone https://github.com/MergenUchiha/silk_road_e-commerce_frontend.git
cd silk_road_e-commerce_frontend

bun install          # or: npm install
cp .env.example .env # then set REACT_APP_BACKEND_URL

bun start            # or: npm start
```

The app runs at http://localhost:3000 and expects the API at the URL from `.env`.

Make sure the API allows this origin — add `http://localhost:3000` to `FRONTEND_ORIGINS` on the backend, otherwise the browser blocks the requests and cookies.

## Environment variables

Create React App only exposes variables prefixed with `REACT_APP_`, and it **inlines them into the bundle at build time** — never put a secret in them.

| Variable                  | Required | Description                                   |
| ------------------------- | -------- | --------------------------------------------- |
| `REACT_APP_BACKEND_URL`   | yes      | API base URL, no trailing slash               |
| `REACT_APP_POSTHOG_KEY`   | no       | PostHog project key; empty disables analytics |
| `REACT_APP_POSTHOG_HOST`  | no       | PostHog host, defaults to the US cloud        |

Without `REACT_APP_BACKEND_URL` the app renders an error screen explaining what is missing, instead of silently firing requests at `undefined/...`.

## How authentication works

The two tokens are stored differently, on purpose:

- **Access token** — kept in `localStorage` and sent as `Authorization: Bearer …`.
- **Refresh token** — never touched by JavaScript. The API returns it as an `httpOnly` cookie, and `credentials: "include"` replays it on `/client/auth/refresh`.

When a request comes back `401`, the API layer refreshes the session once and retries the original request. Concurrent 401s share a single refresh call rather than firing one each. If the refresh fails, the access token is cleared and the user is asked to sign in again.

## Deployment

```bash
bun run build   # outputs to build/
```

The app uses client-side routing, so **the server must serve `index.html` for
every unknown path**. Without this rule a visitor who opens
`/products/<id>` directly — or refreshes the page — gets a 404 from the
web server before React ever loads.

Nginx:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

Netlify (`public/_redirects`):

```
/*  /index.html  200
```

Vercel and most static hosts detect Create React App and apply this
automatically.

## Project structure

```
src/
├── components/
│   ├── cart/        cart item and order summary
│   ├── common/      pagination
│   ├── layout/      navbar and footer
│   └── products/    product card, list, category filter
├── pages/           one component per route
├── services/
│   ├── api.ts       request layer, token refresh, endpoint functions
│   └── posthog.ts   analytics wrapper (no-op without a key)
├── types/           shared API types
├── App.tsx          route table and application state
└── index.tsx        entry point, router and analytics setup
```

## Scripts

| Command         | What it does                          |
| --------------- | ------------------------------------- |
| `bun start`     | Dev server with hot reload            |
| `bun run build` | Production build into `build/`        |
| `bun test`      | Test runner (no tests written yet)    |
