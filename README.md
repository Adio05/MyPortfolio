# Moyinoluwa Adio | Data Engineering Portfolio

A responsive portfolio website documenting my early data engineering journey, current learning goals, and PostgreSQL sales database practice. My email address and profile photo are shown on the public site.

## Stack

- React and TypeScript
- Vite
- Tailwind CSS
- Motion
- Lucide React
- GitHub Pages for hosting

## Run locally

Requirements: Node.js 22 or newer.

```bash
npm install --legacy-peer-deps
npm run dev
```

Open the local address printed by Vite (usually `http://localhost:3000`).

To create a production build:

```bash
npm run build
```

## Project featured

The portfolio links to my [PostgreSQL sales database practice](https://github.com/Adio05/sales-database-practice), where I created a sales table, inserted sample data, and ran queries.

## Deployment

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages whenever changes are pushed to `main`.
