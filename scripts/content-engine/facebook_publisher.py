"""
facebook_publisher.py — Publish photo posts to Facebook Page via Graph API

Posts the rendered 1080x1080 image + caption to the Will & Estate Ready Page.

Required env vars:
  FACEBOOK_PAGE_ID    — 61592036873045
  FACEBOOK_PAGE_TOKEN — Page Access Token with pages_manage_posts permission

Get credentials:
  1. developers.facebook.com → your app → Tools → Graph API Explorer
  2. Generate token with: pages_manage_posts, pages_read_engagement, pages_show_list
  3. Run GET /me/accounts → copy access_token for Will & Estate Ready
"""

import os
import base64
import requests
from pathlib import Path

GRAPH_API_BASE = "https://graph.facebook.com/v21.0"


def _get_credentials() -> tuple[str, str]:
    page_id    = os.environ.get("FACEBOOK_PAGE_ID")
    page_token = os.environ.get("FACEBOOK_PAGE_TOKEN")
    if not page_id:
        raise ValueError("FACEBOOK_PAGE_ID not set")
    if not page_token:
        raise ValueError("FACEBOOK_PAGE_TOKEN not set")
    return page_id, page_token


def post_photo(image_path: Path, caption: str) -> str:
    """
    Publish a photo post to the Facebook Page.
    Uploads image as base64 + posts caption. Returns post ID.
    """
    page_id, page_token = _get_credentials()

    with open(image_path, "rb") as f:
        image_data = f.read()

    resp = requests.post(
        f"{GRAPH_API_BASE}/{page_id}/photos",
        data={
            "message":      caption,
            "access_token": page_token,
        },
        files={
            "source": (image_path.name, image_data, "image/png"),
        },
    )
    resp.raise_for_status()
    result = resp.json()

    if "id" not in result:
        raise ValueError(f"Facebook photo post failed: {result}")

    return result["id"]


def build_caption(post: dict) -> str:
    """Assemble Facebook caption from post fields."""
    return post.get("body", "").strip()
