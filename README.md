# Progamins — Portfolio

> **Full-Stack Developer · Peru 🇵🇪 · Since 2023** — Build. Experiment. Ship.

Live: **https://progamins.github.io** · ES: **https://progamins.github.io/es/**

This repo is my personal portfolio. Minimal, fast, no framework — just HTML/CSS/JS with SEO, a11y, and live GitHub data.

## Featured Work

| # | Project | Year | Description | Stack | Links |
|---|---------|------|-------------|-------|-------|
| 01 | **OpenMedia Downloader** · NEW | 2026 | Hybrid downloader: Vercel (React+Vite) ↔ Cloudflare Tunnel ↔ Express :3001 on your PC. 2 concurrent downloads (yt-dlp + FFmpeg), SSE progress, File System Access API. One-click `INICIAR.bat → Producción` auto-detects tunnel URL, validates /health, updates config.json and pushes to Vercel. | React, TypeScript, Vite, Tailwind, Node.js, Express, SQLite, yt-dlp, FFmpeg, Cloudflare Tunnel | [Repo](https://github.com/progamins/opendowload) · [Live](https://opendowload.vercel.app) |
| 02 | **Maison Rosas** | 2026 | E-commerce for Peruvian bakery: catalog, tracked orders, multi-role admin, offline PWA, real-time notifications | React, TypeScript, Express, MySQL, Docker | [Repo](https://github.com/progamins/webhermanos) · [Live](https://webhermanos-client.vercel.app) |
| 03 | **iestp** | 2026 | Academic system PHP+MySQL: QR attendance anti-duplicate, schedules, units, justifications, payments, PDFs, CSRF + hardened sessions | PHP, JS, MySQL, FPDF | [Repo](https://github.com/progamins/iestp) |
| 04 | **proceso-nodes** | 2026 | REST API Node+Express+MySQL: students, grades, units, schedules, justifications with upload, QR, JWT+bcrypt, rate-limit, tests | Node.js, Express, MySQL | [Repo](https://github.com/progamins/proceso-nodes) |
| 05 | **android-login-sqlserver** | 2024 | Android auth app Java with direct SQL Server via jTDS | Java, Android, SQL Server | [Repo](https://github.com/progamins/android-login-sqlserver) |

## Screenshots — OpenMedia Downloader

> Capturas tomadas de `https://opendowload.vercel.app` + flujo local `INICIAR.bat`

| Vista | Descripción |
|-------|-------------|
| ![Home](https://raw.githubusercontent.com/progamins/opendowload/main/docs/screenshots/home.png) | Home — pegar 1-2 enlaces YouTube, validar y analizar |
| ![Analizando](https://raw.githubusercontent.com/progamins/opendowload/main/docs/screenshots/analyzing.png) | Estado ANALYZING · tarjetas con thumbnail, título, duración |
| ![Descargando](https://raw.githubusercontent.com/progamins/opendowload/main/docs/screenshots/downloading.png) | DOWNLOADING · progreso real bytes/total, speed, ETA, 2 simultáneas |
| ![Producción](https://raw.githubusercontent.com/progamins/opendowload/main/docs/screenshots/produccion.png) | `INICIAR.bat → [2] Producción` — backend, tunnel, config.json, git push, Vercel poll |

Si las imágenes no cargan aún, ve el [live demo](https://opendowload.vercel.app) y la carpeta [`docs/screenshots` en opendowload](https://github.com/progamins/opendowload/tree/main/docs/screenshots).

## Stack

Frontend: TypeScript, React, Next.js, Vite, Tailwind · Backend: Node.js, Express, Python, PHP · DB: MySQL, Postgres, MongoDB, SQL Server · Mobile: Java, Android Studio · DevOps: Git, Docker, Vercel, GitHub Actions, Cloudflare Tunnel

Only technologies that appear in real shipped projects.

## Structure

```
index.html      # EN — main portfolio
es/index.html   # ES — translated
assets/css/main.css
assets/js/main.js  # animations, GitHub API (cached 10 min), i18n
```

SEO: canonical, hreflang, Open Graph, Twitter, JSON-LD Person/WebSite/FAQ. Theme `#0a0a0d`, fonts Syne/Inter/JetBrains Mono.

## Local dev

```bash
git clone https://github.com/progamins/progamins.github.io
cd progamins.github.io
# just open index.html — no build step
python -m http.server 8000
```

## Deploy

Push to `main` → GitHub Pages (Settings → Pages → Branch main / root). No Jekyll (`.nojekyll`).

## Contact

- GitHub: [@progamins](https://github.com/progamins)
- Portfolio: https://progamins.github.io

© 2026 Progamins — Peru 🇵🇪 · Always learning.
