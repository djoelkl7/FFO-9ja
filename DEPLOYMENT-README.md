# NAIJA POT KITCHEN & GRILL LTD — Production Deployment Guide

This guide covers deployment for both **cPanel / Hostinger File Manager** and **GitHub Pages**.

---

## 🚀 Option 1: cPanel or Hostinger File Manager (Direct ZIP Upload)

We have prepared a production-ready package: **`FFO-9ja-cPanel-Production-Ready.zip`**.

### Steps to Deploy:
1. Log in to your hosting account (cPanel or Hostinger hPanel).
2. Open **File Manager** and navigate to your website root directory: `public_html/`.
3. If there are previous default placeholder files (e.g. `default.php` or older files), back them up or delete them.
4. Upload **`FFO-9ja-cPanel-Production-Ready.zip`** directly into `public_html/`.
5. Right-click **`FFO-9ja-cPanel-Production-Ready.zip`** and choose **Extract**.
   - Make sure the extraction destination is `public_html/` directly.
   - This places `index.html`, `.htaccess`, `assets/`, `logo.png`, `robots.txt`, and `sitemap.xml` directly inside `public_html/` (no nested folders!).
6. Delete the uploaded `.zip` file to save disk space.
7. Visit your domain name in the browser (e.g. `https://yourdomain.com`).

### Included Hosting Features:
* **Apache `.htaccess` Pre-configured:** Handles single-page application (SPA) client-side routing so refreshing `/event-caterers/`, `/bakery/`, `/menu/`, or `#contact` never throws a 404.
* **Gzip & Deflate Compression:** High-speed asset loading for mobile devices.
* **1-Year Browser Caching:** Content-hashed JS, CSS, and images are cached efficiently.
* **Security Headers:** Protects against MIME-sniffing, clickjacking, and enforces strict referrer policy.
* **SSL / HTTPS:** Enable SSL in cPanel via *SSL/TLS Status* -> *Run AutoSSL* (or *SSL* in Hostinger). To enforce HTTPS, simply uncomment the 2 rewrite lines in `.htaccess`.

---

## 🐙 Option 2: GitHub Actions & GitHub Pages Deployment

The automated GitHub Actions workflow is located at `.github/workflows/deploy.yml`.

### Key Fixes Applied:
1. **Valid `package-lock.json`:** Replaced the corrupted 1-byte file on GitHub with a complete, clean lockfileVersion 3 lockfile.
2. **Jekyll Bypass (`dist/.nojekyll`):** Automatically injected into `dist/` on build so GitHub Pages serves all assets without filtering.
3. **GitHub Pages Router (`dist/404.html`):** Redirects direct URL hits into SPA routes seamlessly.
4. **Automated Base URL:** Correctly maps to `/FFO-9ja/` on GitHub Pages repository sites or `/` on custom domains.

### How to Trigger:
* Simply push changes to the `main` branch.
* GitHub Actions will run `npm ci`, build with `npm run build`, and publish the verified `dist/` folder to GitHub Pages.
