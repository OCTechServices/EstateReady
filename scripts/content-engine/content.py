"""
content.py — Weekly content generation for Will & Estate Ready
Uses Claude to generate a 7-day calendar of Facebook + Instagram posts.

Usage:
  generate_calendar(brief)            — returns list of 7 paired post dicts
  generate_facebook_post(brief)       — single FB post (legacy / backfill)
  generate_instagram_post(brief)      — single IG post (legacy / backfill)

Audience angles (rotate across the week):
  your_estate   — Boomers/Gen X, own estate planning
  aging_parents — Gen X/older Millennials, parents without a plan
  young_family  — Older Millennials, guardianship for young kids
"""

import json
import os
from datetime import datetime, timedelta
from typing import Optional
from anthropic import Anthropic


# 7-day topic + angle rotation
POST_PLAN = [
    {"angle": "your_estate",   "topic": "wills"},
    {"angle": "aging_parents", "topic": "family preparedness"},
    {"angle": "young_family",  "topic": "guardianship"},
    {"angle": "your_estate",   "topic": "probate"},
    {"angle": "aging_parents", "topic": "power of attorney"},
    {"angle": "young_family",  "topic": "life insurance"},
    {"angle": "your_estate",   "topic": "trust planning"},
]

ANGLE_CONTEXT = {
    "your_estate": {
        "audience": "Baby Boomers and Gen X (ages 50–75) who need to get their own estate in order",
        "hook_theme": "personal urgency — what happens to your home, savings, and family if you die without a plan",
        "emotional_trigger": "protecting your spouse, avoiding probate, not leaving a mess for your kids",
    },
    "aging_parents": {
        "audience": "Gen X and older Millennials (ages 35–55) with aging parents who likely have no plan",
        "hook_theme": "family preparedness — what happens when mom or dad passes without a will",
        "emotional_trigger": "avoiding family conflict over inheritance, not being blindsided, protecting what was left behind",
    },
    "young_family": {
        "audience": "Older Millennials (ages 30–45) with young children",
        "hook_theme": "guardianship and protection — who raises your kids if something happens to you",
        "emotional_trigger": "naming a guardian, making sure your kids are taken care of, not leaving that decision to a court",
    },
}


def _client() -> Anthropic:
    return Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])


def _parse_json(text: str) -> dict:
    text = text.strip()
    if text.startswith("```"):
        text = text.split("```", 2)[1]
        if text.startswith("json"):
            text = text[4:]
        text = text.rsplit("```", 1)[0]
    return json.loads(text.strip())


def generate_facebook_post(brief: dict) -> dict:
    angle = brief["audience_angle"]
    ctx = ANGLE_CONTEXT[angle]
    headlines = "\n".join(f"- {h['title']}" for h in brief.get("rss_headlines", [])[:4]) or "None today."
    trends = json.dumps(brief.get("google_trends", []), indent=2) or "None today."

    prompt = f"""Generate today's Facebook post for Will & Estate Ready.

Will & Estate Ready is an estate planning readiness tool. Users pay $21, complete a 40-question assessment, and receive a personalized score and action plan. No attorney required to start.
Page URL: willestateready.com
Brand voice: warm, plain English, trust-first. Like advice from a knowledgeable friend — not a salesperson. Never preachy.

Today's audience angle: {angle}
Audience: {ctx['audience']}
Hook theme: {ctx['hook_theme']}
Emotional trigger: {ctx['emotional_trigger']}

Today's signal (use if relevant, skip if not):
Headlines:
{headlines}

Trending searches:
{trends}

Write a Facebook post. Rules:
- Open with a fear hook or a surprising statistic — no fluffy opener, no "Did you know?" cliches
- 2–3 short paragraphs. Plain English. No jargon. No bullet lists.
- End with: "Get your estate readiness score at willestateready.com — $21, 10 minutes."
- Tone: warm, direct, lightly urgent. Never salesy.
- 120–180 words total.
- Never use: "comprehensive", "robust", "peace of mind" as an opener, "game-changer", "leverage"

Return a single JSON object:
{{
  "body": "Complete ready-to-post Facebook text including the CTA at the end",
  "hook": "First sentence only",
  "angle": "{angle}",
  "topic": "one-word topic label"
}}

Return only the JSON. No markdown."""

    response = _client().messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        temperature=0.7,
        messages=[{"role": "user", "content": prompt}],
    )
    post = _parse_json(response.content[0].text)
    return {
        **post,
        "scheduled_date": brief["date"],
        "platform": "facebook",
        "status": "Draft",
        "fb_published": False,
    }


def generate_instagram_post(brief: dict) -> dict:
    angle = brief["audience_angle"]
    ctx = ANGLE_CONTEXT[angle]

    prompt = f"""Generate today's Instagram post for @willestateready.

Will & Estate Ready: estate planning readiness assessment. $21. 10 minutes. willestateready.com
Brand voice: direct, trust-building, plain English. No hype, no hashtag spam.

Today's audience angle: {angle}
Audience: {ctx['audience']}
Hook theme: {ctx['hook_theme']}

Rules:
- Hook: punchy opening line, 8–12 words. Make someone stop scrolling.
- Body: 2–3 sentences. Specific and real. No filler.
- CTA: always "Get your score → willestateready.com"
- Hashtags: 6–8 — always include #EstatePlanning #WillAndTestament, add angle-relevant tags
- Caption before hashtags: 60–90 words

Return a single JSON object:
{{
  "hook": "Opening line",
  "body": "2–3 body sentences",
  "cta": "Get your score → willestateready.com",
  "hashtags": "#EstatePlanning #WillAndTestament ...",
  "angle": "{angle}"
}}

Return only the JSON. No markdown."""

    response = _client().messages.create(
        model="claude-sonnet-4-6",
        max_tokens=512,
        temperature=0.7,
        messages=[{"role": "user", "content": prompt}],
    )
    post = _parse_json(response.content[0].text)
    return {
        **post,
        "scheduled_date": brief["date"],
        "platform": "instagram",
        "status": "Draft",
        "ig_published": False,
    }


def generate_calendar(brief: dict, start_date: Optional[datetime] = None) -> list[dict]:
    """Generate a 7-day paired FB + IG content calendar.

    Returns a list of 7 dicts, each with:
      scheduled_date, angle, topic,
      fb_body, fb_hook,
      ig_hook, ig_body, ig_cta, ig_hashtags,
      fb_published, ig_published
    """
    if start_date is None:
        start_date = datetime.now()

    headlines = "\n".join(f"- {h['title']}" for h in brief.get("rss_headlines", [])[:5]) or "None today."
    trends    = json.dumps(brief.get("google_trends", []), indent=2) or "None today."

    plan_desc = "\n".join(
        f"Day {i+1} ({(start_date + timedelta(days=i)).strftime('%A %Y-%m-%d')}) "
        f"— angle: {p['angle']}, topic: {p['topic']}"
        for i, p in enumerate(POST_PLAN)
    )

    prompt = f"""You are the content strategist for Will & Estate Ready (willestateready.com).

Will & Estate Ready is an estate planning readiness assessment tool. Users pay $21, complete a 40-question assessment, and receive a personalized score and action plan across 7 estate planning domains.
Brand voice: warm, plain English, trust-first. Like advice from a knowledgeable friend — not a salesperson, never preachy, never fluffy.
Never use: "comprehensive", "robust", "peace of mind" as an opener, "game-changer", "leverage", "Did you know?"

Audience angles:
- your_estate: Baby Boomers and Gen X (50–75) focused on their own estate planning. Hook theme: what happens to your home, savings, and family if you die without a plan.
- aging_parents: Gen X and older Millennials (35–55) with aging parents who likely have no plan. Hook theme: what happens when a parent passes without a will.
- young_family: Older Millennials (30–45) with young children. Hook theme: who raises your kids if something happens to you.

This week's signal (use if relevant):
Headlines: {headlines}
Trending: {trends}

Generate a 7-day content calendar. For each day produce:
- Facebook post: 2–3 short paragraphs, 120–180 words, ends with "Get your estate readiness score at willestateready.com — $21, 10 minutes."
- Instagram post: punchy hook (8–12 words), 2–3 body sentences, CTA "Get your score → willestateready.com", 6–8 hashtags (always include #EstatePlanning #WillAndTestament)

Day plan:
{plan_desc}

Return ONLY a JSON array of 7 objects, one per day:
[
  {{
    "scheduled_date": "YYYY-MM-DD",
    "angle": "your_estate|aging_parents|young_family",
    "topic": "topic label",
    "fb_hook": "Opening sentence of the Facebook post",
    "fb_body": "Complete ready-to-post Facebook text including CTA",
    "ig_hook": "Instagram opening line",
    "ig_body": "2–3 Instagram body sentences",
    "ig_cta": "Get your score → willestateready.com",
    "ig_hashtags": "#EstatePlanning #WillAndTestament ..."
  }},
  ...
]

No markdown. No explanation. JSON array only."""

    response = _client().messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        temperature=0.7,
        messages=[{"role": "user", "content": prompt}],
    )

    raw = response.content[0].text.strip()
    if raw.startswith("```"):
        raw = raw.split("```", 2)[1]
        if raw.startswith("json"):
            raw = raw[4:]
        raw = raw.rsplit("```", 1)[0]
    posts = json.loads(raw.strip())

    return [
        {
            **post,
            "fb_published":  False,
            "ig_published":  False,
            "status":        "Draft",
        }
        for post in posts
    ]


if __name__ == "__main__":
    test_brief = {
        "date": "2026-07-11",
        "audience_angle": "your_estate",
        "rss_headlines": [],
        "google_trends": [],
    }
    fb = generate_facebook_post(test_brief)
    ig = generate_instagram_post(test_brief)
    print("=== Facebook ===")
    print(json.dumps(fb, indent=2))
    print("\n=== Instagram ===")
    print(json.dumps(ig, indent=2))
