#!/bin/bash
#
# Generate branded Open Graph (OG) images for BestIT Consultants.
# Output: public/og-images/*.png (1200x630, <200KB each)
#
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT/public/og-images"
LOGO="$ROOT/public/b11-logo.png"
mkdir -p "$OUT_DIR"

ARIAL_BLACK="/System/Library/Fonts/Supplemental/Arial Black.ttf"
ARIAL="/System/Library/Fonts/Supplemental/Arial.ttf"
DOMAIN="www.bestitconsultants.ca"
TAGLINE="Elite IT Outsourcing and AI Consulting"

generate() {
  local name="$1"
  local title="$2"
  local out="$OUT_DIR/$name.png"

  magick -size 1200x630 "gradient:#0f172a-#1e3a8a" \
    \( "$LOGO" -resize x90 \) -gravity north -geometry +0+60 -composite \
    -gravity north -fill white -font "$ARIAL_BLACK" -pointsize 72 \
    -annotate +0+240 "$title" \
    -gravity north -fill "rgba(255,255,255,0.85)" -font "$ARIAL" -pointsize 30 \
    -annotate +0+352 "$TAGLINE" \
    -gravity north -fill "#22d3ee" -draw "rectangle 545,428 655,438" \
    -gravity north -fill "rgba(255,255,255,0.65)" -font "$ARIAL" -pointsize 24 \
    -annotate +0+470 "$DOMAIN" \
    -strip -define png:compression-level=9 "$out"

  echo "generated $out"
}

generate "default"     "BestIT Consultants"
generate "home"        "Home"
generate "services"    "Services"
generate "case-studies" "Case Studies"
generate "portfolio"   "Portfolio"
generate "testimonials" "Testimonials"
generate "contact"     "Contact"
generate "team"        "Our Team"
