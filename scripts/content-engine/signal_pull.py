"""
signal_pull.py — Daily signal pull for Will & Estate Ready content engine
Sources: Estate planning RSS feeds · Google Trends

Audience angles rotate daily (by day of year mod 3):
  your_estate   — Boomers/Gen X thinking about their own plan
  aging_parents — Gen X/Millennials with parents who haven't planned
  young_family  — Older Millennials protecting young kids
"""

import json
import feedparser
from datetime import datetime


RSS_FEEDS = [
    ("AARP",        "https://www.aarp.org/rss/topics/money-retirement.xml"),
    ("Kiplinger",   "https://www.kiplinger.com/rss/channel/index/estate-planning.html"),
    ("NerdWallet",  "https://www.nerdwallet.com/blog/estate-planning/rss/"),
    ("Forbes",      "https://www.forbes.com/retirement/feed/"),
]

ESTATE_KEYWORDS = [
    "estate planning",
    "last will and testament",
    "living trust",
    "power of attorney",
]

ANGLES = ["your_estate", "aging_parents", "young_family"]


def get_rss_headlines() -> list[dict]:
    headlines = []
    for name, url in RSS_FEEDS:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:3]:
                headlines.append({
                    "source": name,
                    "title": entry.get("title", ""),
                    "summary": entry.get("summary", "")[:300],
                })
        except Exception as e:
            print(f"  RSS error ({name}): {e}")
    return headlines


def get_google_trends() -> list[dict]:
    try:
        from pytrends.request import TrendReq
        pytrends = TrendReq(hl="en-US", tz=360)
        results = []
        for kw in ESTATE_KEYWORDS[:2]:
            pytrends.build_payload([kw], timeframe="now 7-d", geo="US")
            related = pytrends.related_queries()
            rising = related.get(kw, {}).get("rising")
            if rising is not None and not rising.empty:
                results.append({
                    "keyword": kw,
                    "rising_queries": rising.head(3)["query"].tolist(),
                })
        return results
    except Exception as e:
        print(f"  Google Trends error: {e}")
        return []


def build_signal_brief() -> dict:
    print("  Pulling RSS headlines...")
    headlines = get_rss_headlines()

    print("  Pulling Google Trends...")
    trends = get_google_trends()

    angle = ANGLES[datetime.now().toordinal() % 3]
    print(f"  Audience angle: {angle}")

    return {
        "date": datetime.now().strftime("%Y-%m-%d"),
        "audience_angle": angle,
        "rss_headlines": headlines,
        "google_trends": trends,
    }


if __name__ == "__main__":
    brief = build_signal_brief()
    print(json.dumps(brief, indent=2))
