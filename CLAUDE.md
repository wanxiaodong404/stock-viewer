# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Stock/fund treemap visualization tool. Displays Chinese stock market and fund data as interactive treemaps using CarrotSearch FoamTree. Data is fetched from EastMoney (东方财富) public APIs.

## Tech Stack

- Vue 3 + Composition API (`<script setup>`)
- Vite 4 build tool
- Vue Router 4 (HTML5 history mode)
- CarrotSearch FoamTree 3.5 — interactive treemap rendering
- Less CSS preprocessor
- No state management library (component-level reactive state only)

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (Vite)
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # ESLint with auto-fix
npm run format     # Prettier formatting on src/
```

## Architecture

### Path alias
`@` → `./src` (configured in vite.config.js)

### Proxy
Vite dev server proxies `/Data/` requests to `http://fund.eastmoney.com` to avoid CORS issues.

### API layer (`src/lib/api.js`)
Uses a `createRequest` factory that returns closures. Each API export is a pre-configured request function:
- Accepts a `data` object (query params for GET, body for POST)
- Supports an optional pre-send hook (`fn` callback) to mutate data before sending
- All endpoints hit EastMoney APIs directly (hardcoded URLs with JSONP callbacks)

### Data flow
1. View component mounts → calls API function → gets raw response
2. Response parsed via `jsonpReceive()` helper in `src/lib/utils.js` (extracts JSON from JSONP wrappers)
3. Data mapped to FoamTree `groups` format (with `label`, `weight`, `changeRatio`/`data` fields)
4. `COLOR.setColor()` in `src/lib/enum.js` generates HSL colors based on percentage change (red=up, green=down)

### FoamTree pattern
Every visualization view follows the same structure:
- Template: a single `<main>` container at full viewport
- Script: create `new FoamTree({id: 'container', dataObject: {groups}, ...})` in `onMounted`
- Color customization via `groupColorDecorator` callback
- Window resize handled with debounced `viewer.resize()`

### Routes
| Path | View | Description |
|------|------|-------------|
| `/` | Index.vue | Home page with navigation |
| `/overview` | overview.vue | Sector overview |
| `/stock` | Stock.vue | Stock treemap |
| `/fund` | fund/index.vue | Fund treemap |
| `/fundBlock` | fund/block.vue | Fund sector blocks |

### Static data
`src/data/subscribe-fund.json` — hardcoded fund subscription list used by the fund view.

## Code Style

- Prettier: no semicolons, single quotes, 2-space indent, 100 char width
- ESLint: vue3-essential + skip-formatting config
- Vue SFCs use `<script setup>` syntax throughout
