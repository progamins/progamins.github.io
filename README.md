<div align="center">

# Progamins — Portfolio

**Full-Stack Developer · Perú 🇵🇪 · Since 2023**
*Build. Experiment. Ship.*

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fprogamins.github.io&up_message=online&down_message=offline&label=progamins.github.io)](https://progamins.github.io)
[![GitHub](https://img.shields.io/badge/GitHub-%40progamins-181717?logo=github&logoColor=white)](https://github.com/progamins)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/license-not%20specified-lightgrey)](#license)

**[🌐 Live Site](https://progamins.github.io)** · **[🇪🇸 Versión en español](https://progamins.github.io/es/)**

</div>

---

## About

This repository is the source code for my personal portfolio site — a fast, framework-free build (plain HTML/CSS/JS) that showcases real, shipped projects rather than templates. It's optimized for SEO and accessibility, and pulls live activity data from the GitHub API.

## Table of Contents

- [Featured Work](#featured-work)
- [Screenshots — OpenMedia Downloader](#screenshots--openmedia-downloader)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Deployment](#deployment)
- [Contact](#contact)

## Featured Work

| # | Project | Year | Description | Stack | Links |
|---|---------|------|-------------|-------|-------|
| 01 | **OpenMedia Downloader** 🆕 | 2026 | Hybrid downloader: Vercel (React + Vite) ↔ Cloudflare Tunnel ↔ local Express server. Two concurrent downloads (yt-dlp + FFmpeg), live SSE progress, File System Access API. A one-click `INICIAR.bat → Producción` script auto-detects the tunnel URL, validates `/health`, updates `config.json`, and pushes to Vercel. | React, TypeScript, Vite, Tailwind, Node.js, Express, SQLite, yt-dlp, FFmpeg, Cloudflare Tunnel | [Repo](https://github.com/progamins/opendowload) · [Live](https://opendowload.vercel.app) |
| 02 | **Maison Rosas** | 2026 | E-commerce for a Peruvian bakery: product catalog, order tracking, multi-role admin panel, offline-capable PWA, real-time notifications. | React, TypeScript, Express, MySQL, Docker | [Repo](https://github.com/progamins/webhermanos) · [Live](https://webhermanos-client.vercel.app) |
| 03 | **iestp** | 2026 | Academic management system in PHP + MySQL: QR-based attendance with anti-duplication, schedules, course units, justifications, payments, PDF generation, CSRF protection and hardened sessions. | PHP, JavaScript, MySQL, FPDF | [Repo](https://github.com/progamins/iestp) |
| 04 | **proceso-nodes** | 2026 | REST API built with Node + Express + MySQL for students, grades, units and schedules, with file uploads, QR codes, JWT + bcrypt auth, rate limiting and automated tests. | Node.js, Express, MySQL | [Repo](https://github.com/progamins/proceso-nodes) |
| 05 | **android-login-sqlserver** | 2024 | Android authentication app in Java with a direct SQL Server connection via jTDS. | Java, Android, SQL Server | [Repo](https://github.com/progamins/android-login-sqlserver) |

## Screenshots — OpenMedia Downloader

> Screenshots from `https://opendowload.vercel.app` and the local `INICIAR.bat` workflow.

| View | Description |
|------|-------------|
| ![Home](https://raw.githubusercontent.com/progamins/opendowload/main/docs/screenshots/home.png) | **Home** — paste 1–2 YouTube links, validate and analyze. |
| ![Analyzing](https://raw.githubusercontent.com/progamins/opendowload/main/docs/screenshots/analyzing.png) | **Analyzing** — cards with thumbnail, title and duration. |
| ![Downloading](https://raw.githubusercontent.com/progamins/opendowload/main/docs/screenshots/downloading.png) | **Downloading** — real byte/total progress, speed, ETA, 2 downloads in parallel. |
| ![Production](https://raw.githubusercontent.com/progamins/opendowload/main/docs/screenshots/produccion.png) | **`INICIAR.bat → [2] Producción`** — backend, tunnel, `config.json`, git push, Vercel poll. |

If the images above don't load, check the [live demo](https://opendowload.vercel.app) or the [`docs/screenshots`](https://github.com/progamins/opendowload/tree/main/docs/screenshots) folder in the project repo.

## Tech Stack

<div align="left">

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![PHP](https://img.shields.io/badge/PHP-777BB4?logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL_Server-CC2927?logo=microsoftsqlserver&logoColor=white)
![Java](https://img.shields.io/badge/Java-007396?logo=openjdk&logoColor=white)
![Android](https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=githubactions&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare_Tunnel-F38020?logo=cloudflare&logoColor=white)

</div>

Only technologies that appear in real, shipped projects are listed here.

## Project Structure

```
├── index.html          # EN — main portfolio page
├── es/index.html        # ES — translated portfolio page
├── chollo/index.html    # Chollo & Glam project page
├── assets/
│   ├── css/main.css
│   └── js/main.js       # animations, cached GitHub API calls (10 min), i18n
├── robots.txt
├── sitemap.xml
└── .nojekyll
```

**SEO & metadata:** canonical URLs, `hreflang` alternates, Open Graph, Twitter Cards, JSON-LD (`Person`, `WebSite`, `FAQ`).
**Design:** theme color `#0a0a0d`, fonts Syne / Inter / JetBrains Mono.

## Local Development

No build step required — it's static HTML/CSS/JS.

```bash
git clone https://github.com/progamins/progamins.github.io.git
cd progamins.github.io
python -m http.server 8000
# then open http://localhost:8000
```

## Deployment

Pushes to `main` deploy automatically via **GitHub Pages** (Settings → Pages → Branch: `main` / root). The `.nojekyll` file disables Jekyll processing so assets are served as-is.

## Contact

- **GitHub:** [@progamins](https://github.com/progamins)
- **Portfolio:** [progamins.github.io](https://progamins.github.io)

## License

No license file is currently included in this repository, so all rights are reserved by default. If you'd like others to reuse this code, consider adding an [MIT](https://choosealicense.com/licenses/mit/) or similar license.

---

<div align="center">

© 2026 Progamins — Peru 🇵🇪 · Always learning.

</div>
