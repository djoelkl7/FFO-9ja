import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const zipScript = path.join(__dirname, 'create-zip.py');
const zipOutputPrimary = path.join(rootDir, 'FFO-9ja-cPanel-Production-Ready.zip');
const zipOutputLegacy = path.join(rootDir, 'naija-pot-cpanel.zip');
const publicZipPrimary = path.join(rootDir, 'public', 'FFO-9ja-cPanel-Production-Ready.zip');
const publicZipLegacy = path.join(rootDir, 'public', 'naija-pot-cpanel.zip');
const artifactDir = '/.aistudio/artifacts/brain/1e812bb9-ba7c-4225-bed4-9388e57884a3';

console.log('====================================================');
console.log('📦  NAIJA POT KITCHEN & GRILL — cPanel Packager');
console.log('====================================================\n');

// 0. Clean previous zip files from public and dist
for (const p of [publicZipPrimary, publicZipLegacy, path.join(distDir, 'FFO-9ja-cPanel-Production-Ready.zip'), path.join(distDir, 'naija-pot-cpanel.zip')]) {
  if (fs.existsSync(p)) fs.unlinkSync(p);
}

// 1. Run production build with relative paths for cPanel
console.log('1️⃣  Building production assets with Vite...');
execSync('npm run build', {
  stdio: 'inherit',
  cwd: rootDir,
  env: { ...process.env, VITE_BASE_URL: './' },
});

// 2. Ensure .htaccess is in dist
const htaccessPublic = path.join(rootDir, 'public', '.htaccess');
const htaccessDist = path.join(distDir, '.htaccess');
if (fs.existsSync(htaccessPublic) && !fs.existsSync(htaccessDist)) {
  fs.copyFileSync(htaccessPublic, htaccessDist);
  console.log('✅ Copied .htaccess to dist/');
}

// 2b. Ensure /event-caterers/index.html directory and fallback exists for Hostinger/cPanel static hosting
const caterersDir = path.join(distDir, 'event-caterers');
if (!fs.existsSync(caterersDir)) {
  fs.mkdirSync(caterersDir, { recursive: true });
}
const mainIndexDist = path.join(distDir, 'index.html');
if (fs.existsSync(mainIndexDist)) {
  fs.copyFileSync(mainIndexDist, path.join(caterersDir, 'index.html'));
  console.log('✅ Created dist/event-caterers/index.html for Hostinger public_html');
}

// 3. Create CPANEL_README.txt inside dist
const readmeContent = `================================================================================
NAIJA POT KITCHEN & GRILL LTD — cPanel / Hostinger Production Package
File: FFO-9ja-cPanel-Production-Ready.zip
================================================================================

HOW TO DEPLOY TO CPANEL OR HOSTINGER IN 3 SIMPLE STEPS:

1. Log into your hosting control panel (Hostinger hPanel or cPanel File Manager).
2. Open "File Manager" and navigate to "public_html" (or your website root directory).
   - If there are old or default placeholder files, back them up or remove them.
3. Upload "FFO-9ja-cPanel-Production-Ready.zip" into public_html.
4. Right-click the zip file and select "Extract" (extract directly into public_html).
   - This places index.html directly inside public_html (no nested dist/ folder!).
5. Navigate to your website URL (e.g. https://yourdomain.com) to view your live website!

WHAT THIS PACKAGE INCLUDES:
- Complete production HTML, CSS, JavaScript, and fonts
- Pre-configured Apache .htaccess with SPA client-side rewrite rules (no 404s on refresh)
- High-performance Gzip/Deflate compression and browser caching rules
- SEO sitemap.xml and robots.txt
- Full Nigerian menu, bakery selection, catering inquiries, and WhatsApp ordering
- Fully responsive for mobile, tablet, and desktop

Need SSL/HTTPS?
- In cPanel, click "SSL/TLS Status" -> "Run AutoSSL" (or SSL in Hostinger hPanel).
- Once SSL is active, you can uncomment the HTTPS rewrite lines in .htaccess.
================================================================================
`;

fs.writeFileSync(path.join(distDir, 'CPANEL_README.txt'), readmeContent, 'utf-8');
console.log('✅ Created CPANEL_README.txt in dist/');

// 4. Create ZIP archive
console.log('\n2️⃣  Creating cPanel deployable zip archive (FFO-9ja-cPanel-Production-Ready.zip)...');

try {
  execSync(`python3 "${zipScript}" "${distDir}" "${zipOutputPrimary}"`, {
    stdio: 'inherit',
    cwd: rootDir,
  });

  // Create legacy copy for backward compatibility
  fs.copyFileSync(zipOutputPrimary, zipOutputLegacy);

  // Copy to public/ for direct browser download
  fs.copyFileSync(zipOutputPrimary, publicZipPrimary);
  fs.copyFileSync(zipOutputPrimary, publicZipLegacy);
  console.log(`✅ Copied to public folder for direct browser download: ${publicZipPrimary}`);

  // Copy to artifact directory if available
  if (fs.existsSync(artifactDir)) {
    const artifactZipPrimary = path.join(artifactDir, 'FFO-9ja-cPanel-Production-Ready.zip');
    const artifactZipLegacy = path.join(artifactDir, 'naija-pot-cpanel.zip');
    fs.copyFileSync(zipOutputPrimary, artifactZipPrimary);
    fs.copyFileSync(zipOutputPrimary, artifactZipLegacy);
    console.log(`✅ Saved to AI Studio artifacts: ${artifactZipPrimary}`);
  }

  console.log('\n🎉 SUCCESS! cPanel production package is ready:');
  console.log(`📁 File in workspace: FFO-9ja-cPanel-Production-Ready.zip`);
  console.log(`📁 File in public:    public/FFO-9ja-cPanel-Production-Ready.zip`);
  console.log('👉 Upload this file directly to public_html in cPanel or Hostinger File Manager and click Extract.');
} catch (err) {
  console.error('Failed to create zip:', err);
  process.exit(1);
}
