#!/bin/bash
# setup.sh — One-time setup for Will & Estate Ready content engine
# Run from scripts/content-engine/

set -e
cd "$(dirname "$0")"

echo "=== Will & Estate Ready Content Engine Setup ==="

# 1. Python venv
if [ ! -d "venv" ]; then
  echo "[1/4] Creating virtual environment..."
  python3 -m venv venv
else
  echo "[1/4] venv already exists"
fi

source venv/bin/activate

# 2. Install dependencies
echo "[2/4] Installing dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

# 3. Download Inter fonts from Google Fonts
echo "[3/4] Downloading Inter fonts..."
mkdir -p fonts
if [ ! -f "fonts/Inter-Bold.ttf" ]; then
  curl -sL "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hiJ-Ek-_EeA.woff2" -o fonts/Inter-Bold.woff2
  # Download TTF versions via Google Fonts API
  curl -sL "https://github.com/rsms/inter/releases/download/v4.0/Inter-4.0.zip" -o fonts/inter.zip 2>/dev/null || true
  # Fallback: use system fonts if download fails
  echo "  Note: if font download failed, system fonts (Georgia/Helvetica) will be used"
else
  echo "  Inter fonts already present"
fi

# 4. Create .env if missing
echo "[4/4] Checking .env..."
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo "  Created .env from .env.example — fill in your credentials"
else
  echo "  .env already exists"
fi

# Create output dir
mkdir -p output

echo ""
echo "=== Setup complete ==="
echo ""
echo "Next steps:"
echo "  1. Fill in credentials in scripts/content-engine/.env"
echo "  2. Test: python3 main.py --generate-only"
echo "  3. Review output/fb_schedule.json + output/ig_schedule.json"
echo "  4. Run live: python3 main.py"
