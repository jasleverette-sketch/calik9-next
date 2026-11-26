#!/usr/bin/env python3
"""Generate the printable masterclass worksheet.

Run from any directory with Python 3, reportlab and Pillow installed:
    python scripts/generate-first-week-training-planner.py

The checked-in PDF is a static website asset; no Python is needed to serve it.
"""

from pathlib import Path

from PIL import Image
import reportlab
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import letter
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/downloads/cali-k9-first-week-training-planner.pdf"
NAVY = HexColor("#0A1F3C")
BLUE = HexColor("#1746AB")
GOLD = HexColor("#E8B742")
GRAY = HexColor("#555C69")
RULE = HexColor("#CAD0D9")
TINT = HexColor("#F2F5F9")
LEFT, RIGHT = 38, 574


def text(c, x, y, value, size=10, bold=False, color=NAVY):
    c.setFont("PlannerBold" if bold else "Planner", size)
    c.setFillColor(color)
    c.drawString(x, y, value)


def line(c, x1, y, x2=RIGHT):
    c.setStrokeColor(RULE)
    c.setLineWidth(0.65)
    c.line(x1, y, x2, y)


def section(c, number, title, y):
    c.setFillColor(BLUE)
    c.roundRect(LEFT, y - 5, 23, 23, 5, fill=1, stroke=0)
    text(c, LEFT + 6, y + 2, number, size=10, bold=True, color=white)
    text(c, LEFT + 33, y + 2, title, size=12, bold=True)


def generate():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    # Embed ReportLab's bundled Bitstream Vera fonts for reliable rendering.
    # Base-14 PDF font substitution differs between browsers and printers.
    font_dir = Path(reportlab.__file__).resolve().parent / "fonts"
    pdfmetrics.registerFont(TTFont("Planner", str(font_dir / "Vera.ttf")))
    pdfmetrics.registerFont(TTFont("PlannerBold", str(font_dir / "VeraBd.ttf")))
    c = canvas.Canvas(str(OUTPUT), pagesize=letter, invariant=1, pageCompression=1)
    c.setTitle("Cali K9 First-Week Training Planner")
    c.setAuthor("Cali K9")
    c.setSubject("A printable planning worksheet for the free live masterclass")

    # Light ink coverage, with the site's existing wordmark and brand accents.
    logo = Image.open(ROOT / "public/images/logo@2x.webp")
    logo_width = 166
    c.drawImage(ImageReader(logo), LEFT, 742, width=logo_width,
                height=logo_width * logo.height / logo.width, mask="auto")
    text(c, 402, 752, "FREE LIVE MASTERCLASS", size=9, bold=True, color=BLUE)
    c.setFillColor(GOLD)
    c.rect(LEFT, 727, RIGHT - LEFT, 3, fill=1, stroke=0)

    text(c, LEFT, 698, "FIRST-WEEK TRAINING PLANNER", size=21, bold=True)
    text(c, LEFT, 680, "Choose one priority. Make time to practice. Notice what changes.",
         size=10.5, color=GRAY)

    text(c, LEFT, 653, "Dog's name:", size=10, bold=True)
    line(c, 101, 650, 312)
    text(c, 330, 653, "Week beginning:", size=10, bold=True)
    line(c, 412, 650)

    section(c, "01", "CHOOSE YOUR STARTING POINT", 617)
    text(c, LEFT, 594, "One everyday challenge I want to work on:", size=10.5)
    line(c, LEFT, 575)
    text(c, LEFT, 554, "My first priority to discuss in class:", size=10.5)
    line(c, LEFT, 535)

    section(c, "02", "PLAN YOUR PRACTICE", 501)
    text(c, LEFT, 480, "Set aside a 15-minute window. Use the class to decide what to practice first.",
         size=10, color=GRAY)

    columns = [LEFT, 100, 258, 409, RIGHT]
    top = 464
    header_height, row_height = 27, 25
    bottom = top - header_height - 7 * row_height
    c.setFillColor(TINT)
    c.rect(LEFT, top - header_height, RIGHT - LEFT, header_height, fill=1, stroke=0)
    c.setStrokeColor(RULE)
    c.setLineWidth(0.65)
    c.rect(LEFT, bottom, RIGHT - LEFT, top - bottom, fill=0, stroke=1)
    for x in columns[1:-1]:
        c.line(x, bottom, x, top)
    for i in range(8):
        y = top - header_height - i * row_height
        c.line(LEFT, y, RIGHT, y)
    for x, label in zip(columns[:-1], ["DAY", "WHEN / WHERE", "PRACTICE FOCUS", "WHAT I NOTICED"]):
        text(c, x + 9, top - 17, label, size=9, bold=True)
    for i in range(7):
        text(c, LEFT + 9, top - header_height - i * row_height - 16,
             f"Day {i + 1}", size=10, bold=True, color=BLUE)

    section(c, "03", "ASK, OBSERVE, REFLECT", 234)
    text(c, LEFT, 212, "One question I want to ask Jas:", size=10.5)
    line(c, LEFT, 194)
    text(c, LEFT, 173, "What did I notice about my dog's attention and my own consistency?", size=10.5)
    line(c, LEFT, 154)
    text(c, LEFT, 133, "What will I continue, adjust or ask about next week?", size=10.5)
    line(c, LEFT, 114)

    line(c, LEFT, 80)
    text(c, LEFT, 63, "Bring this planner and your Cali K9 50-Step Roadmap to the masterclass.",
         size=9, color=GRAY)
    text(c, LEFT, 48, "Cali K9  |  Jas Leverette", size=9, bold=True)
    c.setFont("Planner", 9)
    c.setFillColor(BLUE)
    c.drawRightString(RIGHT, 48, "calik9.com/free-masterclass")
    c.linkURL("https://calik9.com/free-masterclass", (425, 45, RIGHT, 58), relative=0)
    c.showPage()
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    generate()
