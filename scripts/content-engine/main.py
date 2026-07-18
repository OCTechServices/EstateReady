"""
main.py — Will & Estate Ready content engine weekly entrypoint

Runs once per week. Pulls signals → generates 7-day calendar →
renders 7 images → uploads to imgbb → saves schedule files.
publish_today.py runs daily to publish each day's Instagram post.

Usage:
  cd scripts/content-engine
  python3 main.py                          # generate week starting today
  python3 main.py --start-date=2026-07-21  # generate week starting given date
  python3 main.py --generate-only          # generate + render, skip imgbb upload
"""

import json
import os
import sys
from pathlib import Path
from datetime import datetime, timezone
from typing import Optional
from dotenv import load_dotenv

load_dotenv(dotenv_path=Path(__file__).parent / ".env")

OUTPUT_DIR       = Path(__file__).parent / "output"
FB_SCHEDULE_PATH = OUTPUT_DIR / "fb_schedule.json"
IG_SCHEDULE_PATH = OUTPUT_DIR / "ig_schedule.json"


def _save_schedules(posts: list[dict]) -> None:
    """Upsert all posts into the schedule files by date."""
    fb_existing, ig_existing = [], []
    if FB_SCHEDULE_PATH.exists():
        try:
            fb_existing = json.loads(FB_SCHEDULE_PATH.read_text())
        except Exception:
            pass
    if IG_SCHEDULE_PATH.exists():
        try:
            ig_existing = json.loads(IG_SCHEDULE_PATH.read_text())
        except Exception:
            pass

    new_dates = {p["scheduled_date"] for p in posts}
    fb_existing = [p for p in fb_existing if p.get("scheduled_date") not in new_dates]
    ig_existing = [p for p in ig_existing if p.get("scheduled_date") not in new_dates]

    for post in posts:
        fb_existing.append({
            "scheduled_date": post["scheduled_date"],
            "angle":          post["angle"],
            "topic":          post["topic"],
            "hook":           post["fb_hook"],
            "body":           post["fb_body"],
            "image_path":     post.get("image_path", ""),
            "image_url":      post.get("image_url"),
            "platform":       "facebook",
            "status":         "Draft",
            "fb_published":   False,
        })
        ig_existing.append({
            "scheduled_date": post["scheduled_date"],
            "angle":          post["angle"],
            "topic":          post["topic"],
            "hook":           post["ig_hook"],
            "body":           post["ig_body"],
            "cta":            post["ig_cta"],
            "hashtags":       post["ig_hashtags"],
            "image_path":     post.get("image_path", ""),
            "image_url":      post.get("image_url"),
            "platform":       "instagram",
            "status":         "Draft",
            "ig_published":   False,
        })

    OUTPUT_DIR.mkdir(exist_ok=True)
    FB_SCHEDULE_PATH.write_text(json.dumps(fb_existing, indent=2, ensure_ascii=False))
    IG_SCHEDULE_PATH.write_text(json.dumps(ig_existing, indent=2, ensure_ascii=False))


def run(start_date: Optional[datetime] = None, upload: bool = True) -> None:
    from signal_pull import build_signal_brief
    from content import generate_calendar
    from render import render_post

    if start_date is None:
        start_date = datetime.now(timezone.utc)

    print("=== Will & Estate Ready Content Engine — Weekly Run ===\n")

    print("[1/4] Pulling signal brief...")
    brief = build_signal_brief()
    print(f"  Headlines: {len(brief['rss_headlines'])}  |  Trends: {len(brief['google_trends'])}")

    print("\n[2/4] Generating 7-day calendar...")
    posts = generate_calendar(brief, start_date=start_date)
    print(f"  {len(posts)} posts generated")
    for i, p in enumerate(posts):
        print(f"  Day {i+1} [{p['scheduled_date']}] {p['angle']:15s} {p['topic']:20s}  IG: {p['ig_hook'][:50]}...")

    print("\n[3/4] Rendering images...")
    imgbb_key = os.environ.get("IMGBB_API_KEY") if upload else None
    if imgbb_key:
        from instagram_publisher import upload_image

    for i, post in enumerate(posts):
        image_path = render_post({"hook": post["ig_hook"], "body": post["ig_body"]}, index=i + 1)
        image_rel  = f"output/{image_path.name}"
        post["image_path"] = image_rel

        if imgbb_key:
            url = upload_image(image_path, imgbb_key)
            post["image_url"] = url
            print(f"  [{i+1}/7] Rendered + uploaded → {url}")
        else:
            post["image_url"] = None
            print(f"  [{i+1}/7] Rendered → {image_rel} (upload skipped)")

    print("\n[4/4] Saving schedules...")
    _save_schedules(posts)
    print(f"  IG: {IG_SCHEDULE_PATH}")
    print(f"  FB: {FB_SCHEDULE_PATH} (post manually — Meta App Review required for API)")

    print("\n=== Done ===")
    print("  Run publish_today.py daily (or set up cron) to auto-publish Instagram.")
    print("  Copy FB posts from output/fb_schedule.json and post manually to your Page.")


if __name__ == "__main__":
    _upload = "--generate-only" not in sys.argv
    _start  = None
    for arg in sys.argv[1:]:
        if arg.startswith("--start-date="):
            _start = datetime.strptime(arg.split("=", 1)[1], "%Y-%m-%d")
    run(start_date=_start, upload=_upload)
