# IMPLEMENATION PLAN: BBr (BuscaBares) Initialization

> **Goal:** Develop a "BuscaBares" web application to find and filter bars in Castilla y León using Open Data, with a focus on Mobile functionality and Map interaction.

## 📋 Overview

- **Project Type:** HYBRID (Laravel Backend + Next.js Frontend)
- **Data Source:** [JCyL Open Data API](https://analisis.datosabiertos.jcyl.es/explore/dataset/registro-de-turismo-de-castilla-y-leon/)
- **Infrastructure:** Docker (Sail/Compose)
- **Status:** Initial scaffolding exists (`backend/`, `frontend/`, `infra/`).

## 🟢 Phase 1: Data Foundation (Backend Focus)
**Agent:** `backend-specialist`

- [x] **Task 1.1: Database Configuration**
  - **Input:** `infra/docker-compose.yml`, `backend/.env`
  - **Action:** Ensure MariaDB service is correctly mapped and Laravel can connect. Configure `DB_HOST=mariadb` (or service name from compose).
  - **Verify:** `php artisan migrate` runs without connection errors.

- [x] **Task 1.2: Bar Model & Migration**
  - **Input:** JCyL Data Schema (Name, Address, Coordinates, Type).
  - **Action:** Create `Bar` model with migration.
  - **Requirement:** Use specific columns for lat/lng or appropriate spatial types (MariaDB `POINT`).
  - **Verify:** Table `bars` exists with correct columns.

- [x] **Task 1.3: Open Data ETL Command**
  - **Input:** JCyL JSON API URL.
  - **Action:** Create Artisan command `app/Console/Commands/SyncBars.php`.
  - **Logic:** Fetch JSON, iterate records, update-or-create (upsert) based on unique ID (e.g., registry number).
  - **Verify:** Running `php artisan app:sync-bars` populates local database with >1000 records.

- [x] **Task 1.4: Validation & Scheduler**
  - **Action:** Schedule command in `Console/Kernel.php` (daily).
  - **Verify:** `php artisan schedule:list` shows the task.

## 🟡 Phase 2: API & Auth (Backend Focus)
**Agent:** `backend-specialist`

- [x] **Task 2.1: Sanctum Configuration**
  - **Action:** Configure CORS in `config/cors.php` to allow Frontend URL. Ensure Sanctum middleware is ready.
  - **Verify:** Login endpoint returns token/cookie.

- [x] **Task 2.2: Bar API Resources**
  - **Action:** Create `BarResource` to transform data (GeoJSON format preferred for Maps).
  - **Endpoints:**
    - `GET /api/bars` (Paginated, Filterable by bounding box).
    - `GET /api/bars/{id}` (Details).
  - **Verify:** `curl localhost/api/bars` returns JSON data.

- [x] **Task 2.3: User Features (Backend)**
  - **Action:** Add `favorites` table (Many-to-Many: User <-> Bar). Create `reviews` table.
  - **Verify:** Can attach/detach user from bar via Tinker.

## 🔵 Phase 3: Frontend Core (Frontend Focus)
**Agent:** `frontend-specialist`

- [ ] **Task 3.1: Map Foundation**
  - **Input:** `frontend/src/app`
  - **Action:** Install `react-leaflet` and Leaflet CSS. Create `MapComponent`.
  - **Design:** Mobile-full-height view.
  - **Verify:** Map renders tiles (OpenStreetMap) on localhost:3000.

- [ ] **Task 3.2: Fetch & Display**
  - **Action:** Fetch data from Laravel API (`http://localhost:8000/api/bars`).
  - **Action:** Render Clusters/Pins on Map.
  - **Verify:** Pins appear in correct coordinates.

- [ ] **Task 3.3: Bar Details & Routing**
  - **Action:** Create "Bottom Sheet" or Modal for Bar details when clicking a pin.
  - **Verify:** Clicking pin shows Name/Address/Rating.

## 🟣 Phase 4: Polish & User Experience
**Agent:** `frontend-specialist` / `backend-specialist`

- [ ] **Task 4.1: Authentication UI**
  - **Action:** Create Login/Register pages.
  - **Verify:** User can register and stays logged in.

- [ ] **Task 4.2: Welcome Email**
  - **Action:** Create `WelcomeEmail` Mailable in Laravel. Trigger on `Registered` event.
  - **Verify:** Email appears in Mailpit/Log.

- [ ] **Task 4.3: Ranking System**
  - **Action:** Page showing Top Rated bars.
  - **Verify:** List sorts by average rating.

## ✅ Phase X: Verification Checklist

### Manual BBr Audit
- [ ] **ETL Success:** `php artisan app:sync-bars` runs and fills DB?
- [ ] **Map UX:** Can I pan/zoom and see generic markers?
- [ ] **Mobile Touch:** Do touch targets work on mobile simulation?
- [ ] **CORS:** Does Frontend (3000) talk to Backend (8000/8080) without CORS errors?
- [ ] **Linting:** `npm run lint` passes?

### Automated Checks
- [ ] Security Scan (Backend)
- [ ] Lighthouse Audit (Frontend)
