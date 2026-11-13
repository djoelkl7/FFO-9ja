# cPanel Deployment Guide — Naija Pot Kitchen & Grill Ltd

This project builds a synchronized, ready-to-upload production ZIP archive: **`NAIJA-POT-WEBSITE-PRODUCTION-FIXED.zip`**.

---

## 📥 Generating or Downloading the Package

Run the packaging command:
```bash
npm run package:cpanel
```

Once built, `NAIJA-POT-WEBSITE-PRODUCTION-FIXED.zip` is placed in:
1. **Workspace Root**: `NAIJA-POT-WEBSITE-PRODUCTION-FIXED.zip`
2. **Public Folder**: `/public/NAIJA-POT-WEBSITE-PRODUCTION-FIXED.zip`

---

## 🚀 Quick Deploy in 4 Steps

1. Log into your cPanel or Hostinger hPanel account (`https://naijapotkitchengrill.co.uk:2083` or via your hosting dashboard).
2. Open **File Manager** → navigate to **`public_html/`**.
3. Upload **`NAIJA-POT-WEBSITE-PRODUCTION-FIXED.zip`** into `public_html/` and click **Extract**.
4. Delete the uploaded `.zip` file and visit **`https://naijapotkitchengrill.co.uk/`**.

---

## 🛠 Package Contents

| File / Directory | Purpose |
| :--- | :--- |
| `.htaccess` | Apache SPA rewrite rules, Gzip compression, security headers, and 1-year asset caching. |
| `index.html` & `404.html` | Compiled entry HTML with canonical, OpenGraph, Twitter, and Schema.org JSON-LD metadata. |
| `assets/` | Compiled JavaScript, CSS, fonts, and all Nigerian cuisine & catering photography. |
| `event-caterers/`, `menu/`, `bakery/`, `specials/`, `story/`, `contact/` | Pre-rendered route directories with route-specific SEO tags for direct HTTP 200 visits. |
| `robots.txt` & `sitemap.xml` | Search engine discovery configured for `https://naijapotkitchengrill.co.uk/`. |
| `logo.png` | Brand icon & favicon. |
| `CPANEL_README.txt` | Extraction reminder inside the archive. |
