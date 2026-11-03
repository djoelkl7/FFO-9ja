# cPanel Deployment Guide — Naija Pot Kitchen & Grill Ltd

This project includes a dedicated **cPanel packaging tool** that generates an optimized, ready-to-upload ZIP archive (`naija-pot-cpanel.zip`).

---

## 🚀 Quick Deploy in 3 Steps

### Step 1: Generate the cPanel Package
Run the packaging command:
```bash
npm run package:cpanel
```
This builds production assets via Vite, ensures `.htaccess`, `robots.txt`, and `sitemap.xml` are in place, and generates `naija-pot-cpanel.zip` at the project root.

### Step 2: Upload to cPanel File Manager
1. Log into your cPanel account (e.g. `https://yourdomain.com:2083` or via your hosting client portal like Namecheap, GoDaddy, Bluehost, etc.).
2. Click **File Manager** under the **Files** section.
3. Open your web root folder:
   - For your primary domain: open `public_html`
   - For an addon domain or subdomain: open the folder configured for that domain
4. If you have old default files (e.g. `index.html`, placeholder files), delete or back them up.
5. Click **Upload** in the top toolbar, select `naija-pot-cpanel.zip`, and wait for the upload to complete (100% green bar).

### Step 3: Extract & Go Live
1. Back in File Manager, select `naija-pot-cpanel.zip`.
2. Click **Extract** in the top toolbar (or right-click → **Extract**).
3. Confirm the extraction location is `public_html/`.
4. Delete the `.zip` file to save disk space.

**Your website is now live!**

---

## 🛠 What's Included in the cPanel Package

| File / Directory | Purpose |
| :--- | :--- |
| `.htaccess` | Configures Apache URL rewrite rules for SPA fallback, Gzip compression, and 1-year asset caching. |
| `index.html` & `404.html` | Entry points for web browsers and fallback routes. |
| `assets/` | Compiled JavaScript, CSS, custom fonts, and high-resolution food photography. |
| `robots.txt` & `sitemap.xml` | SEO configuration pointing search engines to your official domain. |
| `logo.png` | High-resolution brand logo and favicon. |
| `CPANEL_README.txt` | Quick reminder notes packaged directly with your files. |

---

## 🔒 Enabling SSL / HTTPS in cPanel

1. In your cPanel dashboard, search for **SSL/TLS Status**.
2. Select your domain and click **Run AutoSSL** to generate a free Let's Encrypt / cPanel SSL certificate.
3. Once SSL is active, open `.htaccess` in cPanel File Manager and uncomment lines 10–12 to enforce HTTPS automatically:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```
