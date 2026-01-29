# BBr (BuscaBares) Development Tasks

- [x] **Phase 1: Data Foundation** <!-- id: 0 -->
  - [x] Database Configuration (Docker/MariaDB) <!-- id: 1 -->
  - [x] Bar Model & Migrations (Geospatial) <!-- id: 2 -->
  - [x] ETL Command (`sync-bars`) <!-- id: 3 -->
  - [x] Daily Scheduler <!-- id: 4 -->

- [x] **Phase 2: API & Auth** <!-- id: 5 -->
  - [x] Sanctum & CORS Config <!-- id: 6 -->
  - [x] Bar API Resources & Controller <!-- id: 7 -->
  - [x] User Interactions Schema (Favorites/Reviews) <!-- id: 8 -->

- [x] **Phase 3: Frontend Core** <!-- id: 9 -->
  - [x] Map Integration (Leaflet) <!-- id: 10 -->
  - [x] Data Fetching (`useBars` hook) <!-- id: 11 -->
  - [x] Map UI Components <!-- id: 12 -->

- [x] **Phase 4: Polish & UX** <!-- id: 13 -->
  - [x] **Authentication UI** <!-- id: 14 -->
    - [x] `useAuth` Hook (Login/Register/Logout) <!-- id: 15 -->
    - [x] Login Page <!-- id: 16 -->
    - [x] Register Page <!-- id: 17 -->
  - [x] **Welcome Email** <!-- id: 18 -->
    - [x] Create Mailable (`WelcomeEmail`) <!-- id: 19 -->
    - [x] Register Event Listener <!-- id: 20 -->
  - [x] **Ranking System** <!-- id: 21 -->
  - [x] Top Rated Page <!-- id: 22 -->
  - [x] **Phase 4.5: Compliance Fixes (PDF Guide)** <!-- id: 26 -->
    - [x] **User Filters (Frontend & Backend)** <!-- id: 27 -->
      - [x] Backend: Add `province` & `type` to BarController <!-- id: 28 -->
      - [x] Frontend: Add UI Selectors & Update Hook <!-- id: 29 -->
    - [x] **Validation & Security** <!-- id: 30 -->
      - [x] Register: Add Client-side Validation (Zod) <!-- id: 31 -->
      - [x] Register: Add Simple Captcha (Math Challenge) <!-- id: 32 -->

- [x] **Phase 5: UI/UX Overhaul (Discovery Platform)** <!-- id: 33 -->
  - [x] **Layout Architecture** <!-- id: 34 -->
    - [x] Sidebar Navigation (Glassmorphism) <!-- id: 35 -->
    - [x] Dynamic Header (Auth-aware, Breadcrumbs) <!-- id: 36 -->
    - [x] Global Layout Implementation <!-- id: 37 -->
  - [x] **New Views Implementation** <!-- id: 38 -->
    - [x] Profile Page (User Dashboard) <!-- id: 39 -->
    - [x] About Page (Static Content) <!-- id: 40 -->
    - [x] Ranking Page (Chart.js Integration) <!-- id: 41 -->
  - [x] **Map & Home Refinement** <!-- id: 42 -->
    - [x] Random Reviews Overlay <!-- id: 43 -->
    - [x] Style Polish (Blue/Cyan Theme) <!-- id: 44 -->

- [ ] **Phase X: Verification** <!-- id: 23 -->
  - [ ] Manual Audit <!-- id: 24 -->
  - [ ] Automated Checks <!-- id: 25 -->
