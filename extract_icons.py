import os
import sys
import json
import urllib.request
import subprocess
import re
import zipfile
import io
import shutil
import time
from PIL import Image

OUTPUT_DIRS = [
    os.path.join("app", "src", "main", "assets", "icons"),
    os.path.join("icons")
]
METADATA_FILE = os.path.join("app", "src", "main", "assets", "apk_metadata.json")
TEMP_DIR = os.path.join("build", "temp_icons")

for d in OUTPUT_DIRS:
    os.makedirs(d, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

def find_aapt():
    # 1. Custom env / SDK
    android_home = os.environ.get("ANDROID_HOME") or os.environ.get("ANDROID_SDK_ROOT")
    candidates = [
        r"C:\Users\Windows 10\AppData\Local\Android\Sdk\build-tools\34.0.0\aapt.exe",
        shutil.which("aapt"),
        shutil.which("aapt.exe")
    ]
    if android_home:
        bt = os.path.join(android_home, "build-tools")
        if os.path.exists(bt):
            for v in sorted(os.listdir(bt), reverse=True):
                exe = os.path.join(bt, v, "aapt.exe" if os.name == 'nt' else "aapt")
                if os.path.exists(exe):
                    candidates.insert(0, exe)
    for c in candidates:
        if c and os.path.exists(c):
            return c
    return None

AAPT_EXE = find_aapt()

def sanitize_name(filename):
    clean = re.sub(r'\.apk$', '', filename, flags=re.I)
    clean = re.sub(r'[^a-zA-Z0-9_]', '_', clean).lower()
    clean = re.sub(r'_+', '_', clean).strip('_')
    return clean

def extract_icon_from_apk(apk_path, target_png_path):
    pkg_name = ""
    ver_name = ""
    ver_code = ""

    icon_paths = []
    if AAPT_EXE:
        try:
            res = subprocess.run([AAPT_EXE, "dump", "badging", apk_path], capture_output=True, text=True, encoding="utf-8", errors="ignore")
            out = res.stdout

            m_pkg = re.search(r"package:\s+name='([^']+)'", out)
            if m_pkg: pkg_name = m_pkg.group(1)
            m_vc = re.search(r"versionCode='([^']+)'", out)
            if m_vc: ver_code = m_vc.group(1)
            m_vn = re.search(r"versionName='([^']+)'", out)
            if m_vn: ver_name = m_vn.group(1)

            icon_paths = re.findall(r"application-icon-[0-9]+:'([^']+)'", out)
            m_app = re.search(r"application:\s+label='[^']*'\s+icon='([^']+)'", out)
            if m_app: icon_paths.append(m_app.group(1))
        except Exception:
            pass

    try:
        zf = zipfile.ZipFile(apk_path, 'r')
    except Exception:
        return False, pkg_name, ver_name, ver_code, None

    namelist = zf.namelist()
    valid_icons = []
    for ip in icon_paths:
        if ip in namelist:
            try:
                header = zf.read(ip)[:16]
                if header.startswith(b'\x89PNG\r\n\x1a\n') or (header.startswith(b'RIFF') and b'WEBP' in header) or header.startswith(b'\xff\xd8\xff'):
                    valid_icons.append(ip)
            except Exception:
                pass

    if not valid_icons:
        for n in namelist:
            nl = n.lower()
            if (nl.endswith('.png') or nl.endswith('.webp')) and not nl.endswith('.9.png'):
                if 'ic_launcher' in nl or 'app_icon' in nl or 'logo' in nl or 'icon' in nl:
                    valid_icons.append(n)

    # If still not found, search all square images or candidates in zip
    if not valid_icons:
        square_candidates = []
        for n in namelist:
            if n.startswith('lib/') or n.startswith('META-INF/'):
                continue
            try:
                header = zf.read(n)[:16]
                if header.startswith(b'\x89PNG\r\n\x1a\n') or (header.startswith(b'RIFF') and b'WEBP' in header):
                    data = zf.read(n)
                    im = Image.open(io.BytesIO(data))
                    w, h = im.size
                    if w == h and w >= 48:
                        square_candidates.append((w, n))
            except Exception:
                pass
        if square_candidates:
            square_candidates.sort(key=lambda x: x[0], reverse=True)
            valid_icons = [x[1] for x in square_candidates]

    if valid_icons:
        def score(name):
            s = 0
            nl = name.lower()
            if 'xxxhdpi' in nl: s += 50
            elif 'xxhdpi' in nl: s += 100
            elif 'xhdpi' in nl: s += 80
            elif 'hdpi' in nl: s += 60
            elif 'mdpi' in nl: s += 40
            if 'ic_launcher' in nl: s += 30
            if 'round' in nl: s -= 10
            if 'back' in nl or 'fore' in nl: s -= 15
            return s

        best_entry = sorted(valid_icons, key=score, reverse=True)[0]
        raw_data = zf.read(best_entry)
        try:
            im = Image.open(io.BytesIO(raw_data)).convert('RGBA')
            if im.size != (512, 512):
                im = im.resize((512, 512), Image.Resampling.LANCZOS)
            im.save(target_png_path, format='PNG', optimize=True)
            for d in OUTPUT_DIRS:
                copy_path = os.path.join(d, os.path.basename(target_png_path))
                if copy_path != target_png_path:
                    shutil.copyfile(target_png_path, copy_path)
            return True, pkg_name, ver_name, ver_code, best_entry
        except Exception:
            with open(target_png_path, 'wb') as f:
                f.write(raw_data)
            return True, pkg_name, ver_name, ver_code, best_entry

    return False, pkg_name, ver_name, ver_code, None

def main():
    gas_url = "https://script.google.com/macros/s/AKfycbx_z7mqkuftzUnC8a4cHRfuApHsoMoqQDT6kC85yDCeuf7H6YUw2gbehvU0jSdwOmKenA/exec?action=guest"
    print(f"Checking catalog from GAS / GitHub Releases...")
    catalog = []
    try:
        req = urllib.request.Request(gas_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
        catalog = data.get("catalog", [])
    except Exception as e:
        print(f"Warning: Could not fetch GAS: {e}")
        # Fallback to local catalog_seed or io_catalog
        for local_cat in ["io_catalog.json", "app/src/main/assets/catalog_seed.json"]:
            if os.path.exists(local_cat):
                try:
                    with open(local_cat, 'r', encoding='utf-8') as f:
                        catalog = json.load(f).get("catalog", [])
                    break
                except Exception:
                    pass

    print(f"Total apps to evaluate: {len(catalog)}")

    metadata = {}
    if os.path.exists(METADATA_FILE):
        try:
            with open(METADATA_FILE, 'r', encoding='utf-8') as f:
                metadata = json.load(f)
        except Exception:
            metadata = {}

    headers = {"User-Agent": "Mozilla/5.0"}
    new_icons_count = 0

    for idx, item in enumerate(catalog):
        fn = item.get("fileName")
        clean_name = item.get("cleanName")
        url = item.get("directDownloadUrl") or item.get("directUrl")
        sanitized = sanitize_name(fn)
        target_png = os.path.join(OUTPUT_DIRS[0], f"{sanitized}.png")

        # Skip if already extracted and mapped
        if os.path.exists(target_png) and fn in metadata and metadata[fn].get("packageName"):
            # Ensure copy exists in icons/
            copy_root = os.path.join(OUTPUT_DIRS[1], f"{sanitized}.png")
            if not os.path.exists(copy_root):
                shutil.copyfile(target_png, copy_root)
            continue

        if not url:
            continue

        print(f"[{idx+1}/{len(catalog)}] New APK detected: {fn}. Extracting icon...")
        temp_apk = os.path.join(TEMP_DIR, f"temp_{idx}.apk")
        try:
            t0 = time.time()
            req_dl = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req_dl, timeout=30) as r, open(temp_apk, 'wb') as f_out:
                shutil.copyfileobj(r, f_out)

            success, pkg, vn, vc, entry = extract_icon_from_apk(temp_apk, target_png)
            if success:
                print(f"  -> SUCCESS: Icon extracted ({entry}), Pkg: {pkg}, Ver: {vn} in {time.time()-t0:.1f}s")
                new_icons_count += 1
            else:
                print(f"  -> WARNING: No icon found. Pkg: {pkg}, Ver: {vn}")

            metadata[fn] = {
                "cleanName": clean_name,
                "packageName": pkg,
                "versionName": vn,
                "versionCode": vc,
                "iconAsset": f"icons/{sanitized}.png" if success else None
            }

            with open(METADATA_FILE, 'w', encoding='utf-8') as f_meta:
                json.dump(metadata, f_meta, indent=2, ensure_ascii=False)

        except Exception as e:
            print(f"  -> ERROR extracting {fn}: {e}")
        finally:
            if os.path.exists(temp_apk):
                try: os.remove(temp_apk)
                except Exception: pass

    print(f"\nAll done! New icons extracted: {new_icons_count}")

if __name__ == "__main__":
    main()
