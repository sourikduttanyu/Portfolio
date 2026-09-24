#!/usr/bin/env bash
# Encode a raw screen recording into a web demo clip + poster.
# Usage: scripts/encode-clip.sh <input.mov|mp4> <slug> [start_sec] [duration_sec]
#   slug must match a project slug in src/data/projects.js (e.g. sentinel, go-pubsub).
# Output: public/clips/<slug>.mp4 (H.264, 1280w, 30fps, no audio, faststart) and <slug>.jpg.
set -euo pipefail
in="$1"; slug="$2"; start="${3:-0}"; dur="${4:-12}"
out="$(dirname "$0")/../public/clips"
mkdir -p "$out"
ffmpeg -y -loglevel error -ss "$start" -t "$dur" -i "$in" -an \
  -vf "fps=30,scale=1280:-2:flags=lanczos" \
  -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart \
  "$out/$slug.mp4"
ffmpeg -y -loglevel error -i "$out/$slug.mp4" -frames:v 1 -q:v 4 "$out/$slug.jpg"
ls -lh "$out/$slug.mp4" "$out/$slug.jpg"
