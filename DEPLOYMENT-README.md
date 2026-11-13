# NAIJA POT KITCHEN & GRILL LTD — Production Deployment Guide

Official Domain: **https://naijapotkitchengrill.co.uk/**  
Synchronized Archive: **`NAIJA-POT-WEBSITE-PRODUCTION-FIXED.zip`**

---

## 🚀 Option 1: cPanel or Hostinger File Manager (Direct ZIP Upload)

### Steps to Deploy:
1. Log in to your hosting account (cPanel File Manager or Hostinger hPanel).
2. Open **File Manager** and navigate to your website root directory (`public_html/`).
3. Back up and clear any outdated or placeholder files inside `public_html/`.
4. Upload **`NAIJA-POT-WEBSITE-PRODUCTION-FIXED.zip`** directly into `public_html/`.
5. Right-click **`NAIJA-POT-WEBSITE-PRODUCTION-FIXED.zip`** and select **Extract** directly into `public_html/`.
   - Confirm that `index.html`, `.htaccess`, `assets/`, `sitemap.xml`, `robots.txt`, and route directories (`event-caterers/`, `menu/`, `bakery/`, etc.) sit directly inside `public_html/`.
6. Delete the `.zip` archive after extraction to save server disk space.
7. Visit **`https://naijapotkitchengrill.co.uk/`** in your browser.

---

## 🐙 Option 2: GitHub Actions & GitHub Pages Deployment

The automated GitHub Actions workflow is located at `.github/workflows/deploy.yml`.

### Included Fixes:
1. Valid lockfileVersion 3 `package-lock.json` so `npm ci` runs cleanly.
2. Automatic `.nojekyll` and `404.html` generation in `dist/` via `scripts/post-build.js`.
3. Synchronized SEO metadata (`index.html`, `sitemap.xml`, `robots.txt`, route HTMLs) pointing to `https://naijapotkitchengrill.co.uk/`.
4. Zero `yourdomain.com` placeholder URLs anywhere in the codebase or build artifacts.
