"""
main.py — Will & Estate Ready content engine daily entrypoint

Runs daily. Pulls signals → generates content → renders image →
uploads to imgbb → publishes to Facebook + Instagram.

Usage:
  cd scripts/content-engine
  python3 main.py                  # generate + publish
  python3 main.py --generate-only  # generate + render, skip publish
  python3 main.py --date=2026-07-11  # run for a specific date
"""

import json
import os
import sys
from pathlib import Path
from datetime import datetime, timezone
from dotenv import load_dotenv

load_dotenv(dotenv_path=Path(__file__).parent / ".env")

OUTPUT_DIR      = Path(__file__).parent / "output"
FB_SCHEDULE_PATH = OUTPUT_DIR / "fb_schedule.json"
IG_SCHEDULE_PATH = OUTPUT_DIR / "ig_schedule.json"


def _upsert(schedule_path: Path, post: dict, key: str = "scheduled_date") -> None:
    """Insert or replace a post by date in a schedule file."""
    existing = []
    if schedule_path.exists():
        try:
            existing = json.loads(schedule_path.read_text())
        except Exception:
            existing = []
    existing = [p for p in existing if p.get(key) != post[key]]
    existing.append(post)
    schedule_path.write_text(json.dumps(existing, indent=2, ensure_ascii=False))


def run(publish: bool = True, target_date=None) -> None:
    from signal_pull import build_signal_brief
    from content import generate_facebook_post, generate_instagram_post
    from render import render_all

    print("=== Will & Estate Ready Content Engine ===\n")

    print("[1/5] Pulling signal brief...")
    brief = build_signal_brief()
    if target_date:
        brief["date"] = target_date
    print(f"  Date:   {brief['date']}")
    print(f"  Angle:  {brief['audience_angle']}")
    print(f"  Headlines: {len(brief['rss_headlines'])}")

    print("\n[2/5] Generating content...")
    fb_post = generate_facebook_post(brief)
    ig_post = generate_instagram_post(brief)
    print(f"  FB  [{fb_post.get('topic')}]: {fb_post.get('hook', '')[:70]}...")
    print(f"  IG  [{ig_post.get('angle')}]: {ig_post.get('hook', '')[:70]}...")

    print("\n[3/5] Rendering image...")
    OUTPUT_DIR.mkdir(exist_ok=True)
    image_paths = render_all([ig_post])
    image_path  = image_paths[0]
    image_rel   = f"output/{image_path.name}"

    fb_post["image_path"] = image_rel
    ig_post["image_path"] = image_rel

    # Pre-upload to imgbb so schedule is self-contained
    imgbb_key = os.environ.get("IMGBB_API_KEY")
    if imgbb_key:
        print("\n[3.5/5] Uploading image to imgbb...")
        from instagram_publisher import upload_image
        url = upload_image(image_path, imgbb_key)
        ig_post["image_url"] = url
        fb_post["image_url"] = url
        print(f"  → {url}")
    else:
        print("\n[3.5/5] IMGBB_API_KEY not set — skipping pre-upload")

    print("\n[4/5] Saving schedules...")
    _upsert(FB_SCHEDULE_PATH, fb_post)
    _upsert(IG_SCHEDULE_PATH, ig_post)
    print(f"  FB: output/fb_schedule.json")
    print(f"  IG: output/ig_schedule.json")

    if not publish:
        print("\n[5/5] --generate-only — skipping publish")
        print("\n=== Done (generate only) ===")
        return

    print("\n[5/5] Publishing...")
    from publish_today import publish_facebook, publish_instagram
    publish_facebook(brief["date"])
    publish_instagram(brief["date"])

    print("\n=== Done ===")


if __name__ == "__main__":
    generate_only = "--generate-only" in sys.argv
    target_date   = next((a.split("=")[1] for a in sys.argv if a.startswith("--date=")), None)
    run(publish=not generate_only, target_date=target_date)
