import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const zipScript = path.join(__dirname, 'create-zip.py');
const zipOutput = path.join(rootDir, 'naija-pot-cpanel.zip');

console.log('====================================================');
console.log('📦  NAIJA POT KITCHEN & GRILL — cPanel Packager');
console.log('====================================================\n');

// 1. Run production build
console.log('1️⃣  Building production assets with Vite...');
execSync('npm run build', { stdio: 'inherit', cwd: rootDir });

// 2. Ensure .htaccess is in dist
const htaccessPublic = path.join(rootDir, 'public', '.htaccess');
const htaccessDist = path.join(distDir, '.htaccess');
if (fs.existsSync(htaccessPublic) && !fs.existsSync(htaccessDist)) {
  fs.copyFileSync(htaccessPublic, htaccessDist);
  console.log('✅ Copied .htaccess to dist/');
}

// 3. Create CPANEL_README.txt inside dist
const readmeContent = `================================================================================
NAIJA POT KITCHEN & GRILL LTD — cPanel Deployment Package
================================================================================

HOW TO DEPLOY TO CPANEL IN 3 SIMPLE STEPS:

1. Log into your cPanel dashboard (e.g. yourdomain.com:2083).
2. Open "File Manager" and navigate to "public_html" (or your subdomain directory).
   - If there are existing files, back them up or clear out previous old build files.
3. Upload "naija-pot-cpanel.zip" into public_html, right-click the zip, and click "Extract".

That's it! Your website is live with:
- Full SPA client-side navigation
- Apache .htaccess URL rewriting (no 404s on refresh)
- Gzip/Deflate compression for fast loading
- 1-year browser caching for CSS/JS/images
- Robots.txt & Sitemap.xml pre-configured
- WhatsApp ordering and custom meal inquiries

Need SSL? In cPanel, click "SSL/TLS Status" -> "Run AutoSSL".
To enforce HTTPS, open the .htaccess file and uncomment the HTTPS rewrite lines.
================================================================================
`;

fs.writeFileSync(path.join(distDir, 'CPANEL_README.txt'), readmeContent, 'utf-8');
console.log('✅ Created CPANEL_README.txt in dist/');

// 4. Create ZIP archive
console.log('\n2️⃣  Creating cPanel deployable zip archive (naija-pot-cpanel.zip)...');

try {
  execSync(`python3 "${zipScript}" "${distDir}" "${zipOutput}"`, {
    stdio: 'inherit',
    cwd: rootDir,
  });
  console.log('\n🎉 SUCCESS! cPanel package is ready:');
  console.log(`📁 File: ${zipOutput}`);
  console.log('👉 Upload this file directly to public_html in cPanel File Manager and click Extract.');
} catch (err) {
  console.error('Failed to create zip:', err);
  process.exit(1);
}
