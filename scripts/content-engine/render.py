"""
render.py — Generate 1080x1080 PNG image cards for Instagram + Facebook
Will & Estate Ready branding: forest green (#0F3020) + gold (#B5935A)

Font priority:
  1. scripts/content-engine/fonts/Inter-Bold.ttf / Inter-Regular.ttf  (run setup.sh to download)
  2. System fonts (Georgia, Helvetica, Times)
  3. Pillow default bitmap font (always works, less polished)
"""

from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

# Brand colors (RGB)
BG          = (15, 48, 32)      # #0F3020
BG_LIGHT    = (26, 74, 46)      # #1A4A2E
GOLD        = (181, 147, 90)    # #B5935A
GOLD_LIGHT  = (212, 180, 131)   # #D4B483
CREAM       = (250, 248, 242)   # #FAF8F2
CREAM_DIM   = (155, 150, 138)   # muted cream for body text

SIZE = 1080
PAD  = 72

OUTPUT_DIR = Path(__file__).parent / "output"
FONTS_DIR  = Path(__file__).parent / "fonts"

_BOLD_PATHS = [
    str(FONTS_DIR / "Inter-Bold.ttf"),
    "/Library/Fonts/Georgia Bold.ttf",
    "/Library/Fonts/Arial Bold.ttf",
    "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
]

_REGULAR_PATHS = [
    str(FONTS_DIR / "Inter-Regular.ttf"),
    "/Library/Fonts/Georgia.ttf",
    "/Library/Fonts/Arial.ttf",
    "/System/Library/Fonts/Supplemental/Georgia.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
]


def _font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    for path in (_BOLD_PATHS if bold else _REGULAR_PATHS):
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            continue
    return ImageFont.load_default()


def _text_wrapped(draw: ImageDraw.Draw, text: str, x: int, y: int,
                  max_w: int, font, color: tuple, spacing: int = 10) -> int:
    """Draw word-wrapped text. Returns y after last line."""
    words = text.split()
    lines, current = [], []
    for word in words:
        test = " ".join(current + [word])
        w = draw.textlength(test, font=font)
        if w <= max_w:
            current.append(word)
        else:
            if current:
                lines.append(" ".join(current))
            current = [word]
    if current:
        lines.append(" ".join(current))

    for line in lines:
        draw.text((x, y), line, font=font, fill=color)
        _, _, _, line_h = draw.textbbox((0, 0), line, font=font)
        y += line_h + spacing
    return y


def render_post(post: dict, index: int = 1) -> Path:
    """Render one 1080x1080 image card. Returns path to PNG."""
    OUTPUT_DIR.mkdir(exist_ok=True)
    output_path = OUTPUT_DIR / f"post_{index:02d}.png"

    img  = Image.new("RGB", (SIZE, SIZE), BG)
    draw = ImageDraw.Draw(img)

    # ── Subtle center panel (slightly lighter) ──
    draw.rectangle([PAD + 40, PAD + 40, SIZE - PAD - 40, SIZE - PAD - 40], fill=BG_LIGHT)
    draw.rectangle([PAD + 44, PAD + 44, SIZE - PAD - 44, SIZE - PAD - 44], fill=BG)

    # ── Corner brackets ──
    b, bw = 36, 2
    corners = [
        # top-left
        ([PAD, PAD, PAD + b, PAD + bw], [PAD, PAD, PAD + bw, PAD + b]),
        # top-right
        ([SIZE - PAD - b, PAD, SIZE - PAD, PAD + bw], [SIZE - PAD - bw, PAD, SIZE - PAD, PAD + b]),
        # bottom-left
        ([PAD, SIZE - PAD - bw, PAD + b, SIZE - PAD], [PAD, SIZE - PAD - b, PAD + bw, SIZE - PAD]),
        # bottom-right
        ([SIZE - PAD - b, SIZE - PAD - bw, SIZE - PAD, SIZE - PAD],
         [SIZE - PAD - bw, SIZE - PAD - b, SIZE - PAD, SIZE - PAD]),
    ]
    for h_rect, v_rect in corners:
        draw.rectangle(h_rect, fill=GOLD)
        draw.rectangle(v_rect, fill=GOLD)

    # ── Gold vertical accent bar (left) ──
    draw.rectangle([PAD + 14, PAD + 100, PAD + 16, SIZE - PAD - 100], fill=GOLD)

    # ── Wordmark (top center) ──
    font_wm = _font(20, bold=True)
    wordmark = "WILL & ESTATE READY"
    wm_w = draw.textlength(wordmark, font=font_wm)
    draw.text(((SIZE - wm_w) // 2, PAD + 16), wordmark, font=font_wm, fill=GOLD)

    # Gold rule under wordmark
    rule_cx = SIZE // 2
    draw.rectangle([rule_cx - 60, PAD + 54, rule_cx + 60, PAD + 56], fill=GOLD)

    # ── Hook text (large, centered vertically in upper half) ──
    hook = post.get("hook", "")
    font_hook = _font(56, bold=True)
    hook_x    = PAD + 48
    hook_max_w = SIZE - (PAD + 48) * 2
    hook_y    = 220
    hook_end_y = _text_wrapped(draw, hook, hook_x, hook_y, hook_max_w, font_hook, CREAM, spacing=16)

    # ── Divider ──
    div_y = hook_end_y + 32
    draw.rectangle([hook_x, div_y, hook_x + 56, div_y + 2], fill=GOLD)

    # ── Body text ──
    body = post.get("body", "")
    font_body = _font(28, bold=False)
    body_y    = div_y + 28
    _text_wrapped(draw, body, hook_x, body_y, hook_max_w, font_body, CREAM_DIM, spacing=12)

    # ── URL (bottom left) ──
    font_url = _font(24, bold=True)
    draw.text((PAD + 48, SIZE - PAD - 60), "willestateready.com", font=font_url, fill=GOLD_LIGHT)

    # ── Price tag (bottom right) ──
    font_price = _font(18, bold=False)
    price_text = "$21 · 10 minutes"
    price_w = draw.textlength(price_text, font=font_price)
    draw.text((SIZE - PAD - 48 - price_w, SIZE - PAD - 56), price_text, font=font_price, fill=CREAM_DIM)

    img.save(str(output_path), "PNG")
    print(f"  Rendered: {output_path.name}")
    return output_path


def render_all(posts: list[dict]) -> list[Path]:
    return [render_post(post, i + 1) for i, post in enumerate(posts)]


if __name__ == "__main__":
    test = {
        "hook": "67% of Americans don't have a will. Are you one of them?",
        "body": "Without one, the state decides what happens to your home, your savings, and who raises your kids. It takes 10 minutes to find out where you stand.",
    }
    path = render_post(test)
    print(f"Done: {path}")
