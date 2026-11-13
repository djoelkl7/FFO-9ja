import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const zipScript = path.join(__dirname, 'create-zip.py');

const PRIMARY_ZIP_NAME = 'NAIJA-POT-WEBSITE-PRODUCTION-FIXED.zip';
const zipOutputPrimary = path.join(rootDir, PRIMARY_ZIP_NAME);
const publicZipPrimary = path.join(rootDir, 'public', PRIMARY_ZIP_NAME);
const artifactDir = '/.aistudio/artifacts/brain/1e812bb9-ba7c-4225-bed4-9388e57884a3';

const legacyZips = [
  path.join(rootDir, 'FFO-9ja-cPanel-Production-Ready.zip'),
  path.join(rootDir, 'naija-pot-cpanel.zip'),
  path.join(rootDir, 'public', 'FFO-9ja-cPanel-Production-Ready.zip'),
  path.join(rootDir, 'public', 'naija-pot-cpanel.zip'),
  path.join(distDir, 'FFO-9ja-cPanel-Production-Ready.zip'),
  path.join(distDir, 'naija-pot-cpanel.zip'),
  path.join(distDir, PRIMARY_ZIP_NAME),
  publicZipPrimary,
];

console.log('====================================================');
console.log('📦  NAIJA POT KITCHEN & GRILL — Production Packager');
console.log('====================================================\n');

// 0. Clean previous/legacy zip files from root, public, and dist before building
for (const p of legacyZips) {
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
  }
}
if (fs.existsSync(artifactDir)) {
  for (const oldName of ['FFO-9ja-cPanel-Production-Ready.zip', 'naija-pot-cpanel.zip']) {
    const oldArt = path.join(artifactDir, oldName);
    if (fs.existsSync(oldArt)) fs.unlinkSync(oldArt);
  }
}

// 1. Run production build with relative paths for universal cPanel / Hostinger hosting
console.log('1️⃣  Building production assets with Vite...');
execSync('npm run build', {
  stdio: 'inherit',
  cwd: rootDir,
  env: { ...process.env, VITE_BASE_URL: './' },
});

// 2. Ensure CPANEL_README.txt is included inside dist
const readmeContent = `================================================================================
NAIJA POT KITCHEN & GRILL LTD — Production Hosting Package
File: ${PRIMARY_ZIP_NAME}
Official Website: https://naijapotkitchengrill.co.uk/
================================================================================

HOW TO DEPLOY TO CPANEL OR HOSTINGER IN 4 SIMPLE STEPS:

1. Log into your hosting control panel (Hostinger hPanel or cPanel File Manager).
2. Open "File Manager" and navigate to "public_html" (or your domain root folder).
   - Back up any old website files before removing them.
3. Upload "${PRIMARY_ZIP_NAME}" directly into public_html.
4. Right-click "${PRIMARY_ZIP_NAME}" and select "Extract" into public_html.
   - Ensure index.html is placed directly inside public_html/ (not inside a subfolder).
5. Visit https://naijapotkitchengrill.co.uk/ to verify your live website!

WHAT THIS PACKAGE INCLUDES:
- Complete production HTML, CSS, JavaScript, fonts, and food photography
- Pre-configured canonical, OpenGraph, Twitter, and JSON-LD SEO metadata
- Clean sitemap.xml and robots.txt pointing to https://naijapotkitchengrill.co.uk/
- Pre-rendered route folders (/event-caterers/, /menu/, /bakery/, /specials/, /story/, /contact/)
- Pre-configured Apache .htaccess with SPA fallback routing, Gzip compression, and caching
- Zero placeholder domain references

Need SSL/HTTPS?
- In cPanel: SSL/TLS Status -> Run AutoSSL (or SSL in Hostinger hPanel).
- Once SSL is active, uncomment the HTTPS rewrite lines in .htaccess.
================================================================================
`;

fs.writeFileSync(path.join(distDir, 'CPANEL_README.txt'), readmeContent, 'utf-8');
console.log('✅ Created updated CPANEL_README.txt in dist/');

// 3. Create ZIP archive
console.log(`\n2️⃣  Creating synchronized production zip archive (${PRIMARY_ZIP_NAME})...`);

try {
  execSync(`python3 "${zipScript}" "${distDir}" "${zipOutputPrimary}"`, {
    stdio: 'inherit',
    cwd: rootDir,
  });

  // Copy to public/ for direct browser download if needed
  fs.copyFileSync(zipOutputPrimary, publicZipPrimary);
  console.log(`✅ Copied to public folder: ${publicZipPrimary}`);

  // Copy to AI Studio artifact directory
  if (fs.existsSync(artifactDir)) {
    const artifactZipPrimary = path.join(artifactDir, PRIMARY_ZIP_NAME);
    fs.copyFileSync(zipOutputPrimary, artifactZipPrimary);
    console.log(`✅ Saved to AI Studio artifacts: ${artifactZipPrimary}`);
  }

  console.log('\n🎉 SUCCESS! Synchronized production package is ready:');
  console.log(`📁 Workspace root: ${PRIMARY_ZIP_NAME}`);
  console.log(`📁 Public folder:  public/${PRIMARY_ZIP_NAME}`);
  console.log('👉 Upload directly to public_html in cPanel or Hostinger File Manager and click Extract.');
} catch (err) {
  console.error('Failed to create zip:', err);
  process.exit(1);
}
