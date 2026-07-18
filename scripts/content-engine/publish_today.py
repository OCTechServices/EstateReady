"""
publish_today.py — Publish today's content (Facebook + Instagram)

Reads schedule files written by main.py and publishes today's posts.
Idempotent: if a post is already marked published, it is skipped.

Usage:
  python3 publish_today.py              # publishes today's post
  python3 publish_today.py 2026-07-11   # publish for a specific date
"""

import json
import sys
from datetime import datetime, timezone
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(dotenv_path=Path(__file__).parent / ".env")

FB_SCHEDULE_PATH = Path(__file__).parent / "output" / "fb_schedule.json"
IG_SCHEDULE_PATH = Path(__file__).parent / "output" / "ig_schedule.json"


def publish_facebook(target_date: str) -> None:
    if not FB_SCHEDULE_PATH.exists():
        print("[FB] No fb_schedule.json — run main.py first")
        return

    schedule = json.loads(FB_SCHEDULE_PATH.read_text())
    post = next((p for p in schedule if p.get("scheduled_date") == target_date), None)

    if not post:
        print(f"[FB] No post scheduled for {target_date}")
        return

    if post.get("fb_published"):
        print("[FB] Already published — skipping")
        return

    image_path = Path(__file__).parent / post["image_path"]

    try:
        from facebook_publisher import post_photo, build_caption
        caption   = build_caption(post)
        image_url = post.get("image_url")
        post_id   = post_photo(image_path, caption, image_url=image_url)
        post["fb_published"] = True
        FB_SCHEDULE_PATH.write_text(json.dumps(schedule, indent=2, ensure_ascii=False))
        print(f"[FB] Done — post_id: {post_id}")
    except Exception as e:
        print(f"[FB] Failed: {e}")


def publish_instagram(target_date: str) -> None:
    if not IG_SCHEDULE_PATH.exists():
        print("[IG] No ig_schedule.json — run main.py first")
        return

    schedule = json.loads(IG_SCHEDULE_PATH.read_text())
    post = next((p for p in schedule if p.get("scheduled_date") == target_date), None)

    if not post:
        print(f"[IG] No post scheduled for {target_date}")
        return

    if post.get("ig_published"):
        print("[IG] Already published — skipping")
        return

    image_path = Path(__file__).parent / post["image_path"]

    try:
        from instagram_publisher import publish_post
        media_id = publish_post(post, image_path)
        post["ig_published"] = True
        IG_SCHEDULE_PATH.write_text(json.dumps(schedule, indent=2, ensure_ascii=False))
        print(f"[IG] Done — media_id: {media_id}")
    except Exception as e:
        print(f"[IG] Failed: {e}")
        if hasattr(e, "response") and e.response is not None:
            print(f"[IG] Error body: {e.response.text[:500]}")


if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else datetime.now(timezone.utc).strftime("%Y-%m-%d")
    print(f"=== Publishing for {target} ===\n")
    publish_facebook(target)
    publish_instagram(target)
    print("\nDone.")
