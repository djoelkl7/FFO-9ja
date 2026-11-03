import os
import sys
import zipfile

IGNORED_NAMES = {'.DS_Store', 'Thumbs.db', '.git'}

def make_zip(source_dir, output_zip):
    source_dir = os.path.abspath(source_dir)
    output_zip = os.path.abspath(output_zip)

    if not os.path.isdir(source_dir):
        print(f"❌ Error: Source directory '{source_dir}' does not exist.")
        sys.exit(1)

    if os.path.exists(output_zip):
        os.remove(output_zip)

    print(f"📦 Packaging into: {output_zip}")
    count = 0
    archived_files = []

    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            # Exclude ignored directories in-place
            dirs[:] = [d for d in dirs if d not in IGNORED_NAMES]
            for file in files:
                if file in IGNORED_NAMES or file.startswith('.env'):
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, source_dir)
                zipf.write(full_path, rel_path)
                archived_files.append(rel_path)
                count += 1

    size_mb = os.path.getsize(output_zip) / (1024 * 1024)

    # Verification checks
    required = ['index.html', '.htaccess', 'robots.txt', 'sitemap.xml']
    missing = [req for req in required if req not in archived_files]
    if missing:
        print(f"⚠️ Warning: Missing expected files: {', '.join(missing)}")
    else:
        print(f"✅ Verified all core deployment files present (.htaccess, index.html, robots.txt, sitemap.xml)")

    print(f"✨ Successfully archived {count} files ({size_mb:.2f} MB)")

if __name__ == '__main__':
    src = sys.argv[1] if len(sys.argv) > 1 else 'dist'
    out = sys.argv[2] if len(sys.argv) > 2 else 'naija-pot-cpanel.zip'
    make_zip(src, out)
