<div align="center">

# BBr (BuscaBares)

**Plataforma de Descubrimiento Social de Bares en Castilla y León**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Stack Tecnológico</a> •
    <a href="#-instalación">Instalación</a> •
    <a href="#-documentación">Docs</a>
  </p>
</div>

---

## 💡 Sobre el Proyecto

**BBr** es una iniciativa de datos abiertos (_Open Data_) diseñada para conectar a las personas con la hostelería real de Castilla y León. A diferencia de otras plataformas basadas en algoritmos comerciales, BBr utiliza datos públicos de la **Junta de Castilla y León** para ofrecer un mapa imparcial y completo de la oferta de ocio.

> "Sin filtros. Pura realidad. Encuentra tu sitio."

---

## 🚀 Features

- **🗺️ Mapa Interactivo**: Visualización geoespacial de bares y locales con Leaflet.
- **🔍 Filtrado Inteligente**: Búsqueda por municipio, tipo de local y nombre.
- **⭐ Grafo Social**: Sistema de favoritos, reseñas y valoraciones de usuarios.
- **🔄 Sincronización ETL**: Pipeline automatizado que ingesta datos diarios del portal de Datos Abiertos de JCyL.
- **📱 PWA Ready**: Interfaz _mobile-first_ con diseño adaptativo y modo oscuro.
- **🔒 Seguridad Robusta**: Autenticación vía Laravel Sanctum (Cookies HTTP-only + CSRF protection).

---

## 🛠 Tech Stack

El proyecto sigue una arquitectura **Monorepo** (Backend API + Frontend SPA).

| Capa              | Tecnología                        | Detalles                                   |
| ----------------- | --------------------------------- | ------------------------------------------ |
| **Frontend**      | Next.js 15 (App Router)           | React 19, TypeScript, Tailwind v4, Zustand |
| **Backend**       | Laravel 12                        | API Resource, Sanctum, Artisan Console     |
| **Base de Datos** | MariaDB                           | Spatial Indexing, Eloquent ORM             |
| **Mapas**         | Leaflet / React-Leaflet           | OpenStreetMap tiles                        |
| **Validación**    | Zod (Front) / FormRequests (Back) | Tipado estricto end-to-end                 |

---

## 📦 Instalación

### Prerrequisitos

- PHP 8.2+ & Composer
- Node.js 20+ & NPM
- MariaDB/MySQL

### Guía de Inicio Rápido (Local)

1.  **Clonar el repositorio**

    ```bash
    git clone https://github.com/tu-usuario/bbr.git
    cd bbr
    ```

2.  **Configurar Backend (API)**

    ```bash
    cd backend
    cp .env.example .env
    # Configurar DB_DATABASE, DB_USERNAME, etc. en .env

    composer install
    php artisan key:generate
    php artisan migrate --seed
    php artisan serve
    # API disponible en http://localhost:8000
    ```

3.  **Configurar Frontend (Cliente)**

    ```bash
    cd ../frontend
    cp .env.example .env.local
    # Asegurar NEXT_PUBLIC_API_URL=http://localhost:8000

    npm install
    npm run dev
    # Web disponible en http://localhost:3000
    ```

4.  **Carga de Datos (ETL)**
    ```bash
    # En la terminal del backend
    php artisan app:sync-bars
    ```

### 🐳 Docker

> [!NOTE]
> **TO-DO**: La configuración completa de Docker (`docker-compose.yml`) para producción está actualmente en desarrollo. Se recomienda utilizar la instalación local para desarrollo.

---

## 📚 Documentación

Para más detalles sobre la arquitectura y el desarrollo:

- [Guía de Análisis](./docs/ANALYSIS_AGAINST_GUIDE.md)
- [Plan de Implementación](./docs/implementation_plan.md)

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](./LICENSE).
