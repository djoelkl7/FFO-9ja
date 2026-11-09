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
const publicZip = path.join(rootDir, 'public', 'naija-pot-cpanel.zip');
const artifactDir = '/.aistudio/artifacts/brain/1e812bb9-ba7c-4225-bed4-9388e57884a3';

console.log('====================================================');
console.log('📦  NAIJA POT KITCHEN & GRILL — cPanel Packager');
console.log('====================================================\n');

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
NAIJA POT KITCHEN & GRILL LTD — cPanel Deployment Package
================================================================================

HOW TO DEPLOY TO CPANEL IN 3 SIMPLE STEPS:

1. Log into your cPanel dashboard (e.g. https://yourdomain.com:2083).
2. Open "File Manager" and navigate to "public_html" (or your subdomain folder).
   - If there are existing default files, back them up or clear out previous old files.
3. Upload "naija-pot-cpanel.zip" into public_html, right-click the zip, and click "Extract".
4. Navigate to your hosting URL (e.g. https://yourdomain.com) to view your live website!

That's it! Your website is live with:
- Full SPA client-side navigation (hash routing works out-of-the-box on all hosts)
- Apache .htaccess URL rewriting (no 404s on direct page refresh)
- Gzip/Deflate compression for fast mobile loading
- 1-year browser caching for CSS, JS, and images
- Robots.txt & Sitemap.xml pre-configured
- WhatsApp ordering and custom meal inquiries

Need SSL? In cPanel, click "SSL/TLS Status" -> "Run AutoSSL".
To enforce HTTPS, open the .htaccess file in File Manager and uncomment the HTTPS rewrite lines.
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

  // Copy to public/ so users can download it directly via their browser URL
  fs.copyFileSync(zipOutput, publicZip);
  console.log(`✅ Copied to public folder for direct browser download: ${publicZip}`);

  // Copy to artifact directory if available
  if (fs.existsSync(artifactDir)) {
    const artifactZip = path.join(artifactDir, 'naija-pot-cpanel.zip');
    fs.copyFileSync(zipOutput, artifactZip);
    console.log(`✅ Saved to AI Studio artifacts: ${artifactZip}`);
  }

  console.log('\n🎉 SUCCESS! cPanel package is ready:');
  console.log(`📁 File in workspace: naija-pot-cpanel.zip (root directory)`);
  console.log(`📁 File in public:    public/naija-pot-cpanel.zip`);
  console.log('👉 Upload this file directly to public_html in cPanel File Manager and click Extract.');
} catch (err) {
  console.error('Failed to create zip:', err);
  process.exit(1);
}
