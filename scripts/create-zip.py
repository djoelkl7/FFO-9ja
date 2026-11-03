import os
import sys
import zipfile

def make_zip(source_dir, output_zip):
    source_dir = os.path.abspath(source_dir)
    output_zip = os.path.abspath(output_zip)

    if os.path.exists(output_zip):
        os.remove(output_zip)

    print(f"Creating archive: {output_zip}")
    count = 0
    with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(source_dir):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, source_dir)
                zipf.write(full_path, rel_path)
                count += 1

    size_mb = os.path.getsize(output_zip) / (1024 * 1024)
    print(f"Archived {count} files ({size_mb:.2f} MB)")

if __name__ == '__main__':
    src = sys.argv[1] if len(sys.argv) > 1 else 'dist'
    out = sys.argv[2] if len(sys.argv) > 2 else 'naija-pot-cpanel.zip'
    make_zip(src, out)
