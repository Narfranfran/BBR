# Análisis de Cumplimiento - Proyecto Intermodular DAW

Este documento detalla el estado actual del proyecto "BuscaBares" (BBr) frente a los requisitos establecidos en la guía `DAW-PI-Guía para los alumnos de 2.º.pdf`.

## 1. Resumen Ejecutivo

El proyecto cumple satisfactoriamente con la arquitectura base (Backend API + Frontend SPA), la sincronización de datos abiertos y la visualización de mapas. Se han identificado carencias específicas en la interfaz de usuario (filtros), validación en cliente y elementos opcionales (Captcha) que deben abordarse para alcanzar la máxima calificación.

## 2. Análisis Detallado

### 2.1. Backend (Lógica y Datos)

| Requisito                      | Estado       | Observación                                              |
| ------------------------------ | ------------ | -------------------------------------------------------- |
| **Descarga/Integración Datos** | ✅ CUMPLIDO  | Comando `app:sync-bars` integra datos de JCyL Open Data. |
| **BBDD Relacional / PDO**      | ✅ CUMPLIDO  | MariaDB + Eloquent (Laravel).                            |
| **API Consumo (cURL)**         | ✅ CUMPLIDO  | Implementado vía `Http` (Guzzle) en comando ETL.         |
| **Patrón MVC / Framework**     | ✅ CUMPLIDO  | Laravel implementa MVC.                                  |
| **Auth (Session + Hash)**      | ✅ CUMPLIDO  | Laravel Sanctum + Hash nativo.                           |
| **Captcha**                    | ❌ PENDIENTE | No implementado en registro/login. (Elemento valorable). |

### 2.2. Frontend (Cliente e Interfaz)

| Requisito                          | Estado      | Observación                                                                                                                                      |
| ---------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Fetch asíncrono**                | ✅ CUMPLIDO | Hook `useBars` / `swr` consume API.                                                                                                              |
| **Visualización Estructurada**     | ✅ CUMPLIDO | Mapa interactivo implementado.                                                                                                                   |
| **Preferencias Usuario (Filtros)** | ⚠️ PARCIAL  | Falta interfaz de filtrado (Provincia, Tipo) exigida explícitamente ("mínimo un control de interfaz"). Backend actual solo filtra por Municipio. |
| **Validación Cliente**             | ⚠️ BÁSICO   | Solo validación HTML5 (`required`). Se requiere validación JS explícita.                                                                         |
| **Diseño Responsive**              | ✅ CUMPLIDO | Tailwind CSS y diseño adaptable.                                                                                                                 |

### 2.3. Infraestructura y Extras

| Requisito                | Estado      | Observación                             |
| ------------------------ | ----------- | --------------------------------------- |
| **Control de Versiones** | ✅ CUMPLIDO | Repositorio Git activo.                 |
| **Docker**               | ✅ CUMPLIDO | Entorno configurado con Docker Compose. |
| **Documentación**        | ℹ️ MANUAL   | Pendiente de redacción (Memoria .docx). |

## 3. Acciones Recomendadas

Para cumplir estrictamente con el enunciado y maximizar la nota:

1.  **Implementar Filtros de Usuario**:
    - Backend: Añadir soporte para filtrar por `provincia` y `tipo` en `BarController`.
    - Frontend: Añadir selectores flotantes sobre el mapa.
2.  **Mejorar Validación Cliente**:
    - Frontend: Implementar feedback de errores en tiempo real (JS) en formularios de registro.
3.  **Añadir Captcha**:
    - Integrar un desafío simple (matemático o checkbox) para cumplir el criterio de valoración extra.

## 4. Conclusión

El proyecto está en un estado avanzado ("Phase 4" terminada), pero requiere una **Fase de Cumplimiento (Phase 4.5)** para cerrar las brechas identificadas respecto al enunciado oficial antes de la verificación final.
