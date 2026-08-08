from pathlib import Path
import re

# --- tailwind: secondary = orange ---
tw_path = Path("tailwind.config.js")
tw = tw_path.read_text(encoding="utf-8")

orange_secondary = """// SECONDARY — Warm orange (yellow + orange brand gradient pair)
        secondary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316', // brand orange
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },"""

# Match secondary block until accent comment
new_tw, n = re.subn(
    r"// SECONDARY[\s\S]*?(?=\s*// ACCENT)",
    orange_secondary + "\n        ",
    tw,
    count=1,
)
if n == 0:
    new_tw, n = re.subn(
        r"secondary:\s*\{[\s\S]*?\n\s*\},",
        orange_secondary.replace("// SECONDARY — Warm orange (yellow + orange brand gradient pair)\n        ", "") + ",",
        tw,
        count=1,
    )
tw_path.write_text(new_tw, encoding="utf-8")
print("tailwind orange secondary", "#F97316" in new_tw, "n=", n)

# --- index.css brand gradients ---
css_path = Path("src/index.css")
css = css_path.read_text(encoding="utf-8")
css2, cn = re.subn(
    r"/\* Gradient text \*/\s*\.gradient-text\s*\{[^}]*\}",
    """/* Brand gradients: yellow → orange */
  .gradient-text {
    @apply bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent;
  }
  .gradient-brand {
    @apply bg-gradient-to-r from-primary-500 to-secondary-500;
  }
  .gradient-brand-br {
    @apply bg-gradient-to-br from-primary-500 to-secondary-500;
  }
  .gradient-brand-soft {
    @apply bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30;
  }""",
    css,
    count=1,
)
if cn == 0:
    css2, cn = re.subn(
        r"\.gradient-text\s*\{[^}]*\}",
        """.gradient-text {
    @apply bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent;
  }
  .gradient-brand {
    @apply bg-gradient-to-r from-primary-500 to-secondary-500;
  }
  .gradient-brand-br {
    @apply bg-gradient-to-br from-primary-500 to-secondary-500;
  }
  .gradient-brand-soft {
    @apply bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30;
  }""",
        css,
        count=1,
    )
css_path.write_text(css2, encoding="utf-8")
print("css gradients", cn, "from-primary-500 to-secondary-500" in css2)

# --- Coco yellow-orange orb ---
coco_path = Path("src/components/ui/CocoMascot.jsx")
if coco_path.exists():
    coco = coco_path.read_text(encoding="utf-8")
    coco = coco.replace(
        "'bg-primary-500 text-gray-900'",
        "'bg-gradient-to-br from-primary-500 to-secondary-500 text-gray-900'",
    )
    coco = coco.replace(
        "bg-primary-500 text-gray-900",
        "bg-gradient-to-br from-primary-500 to-secondary-500 text-gray-900",
    )
    coco_path.write_text(coco, encoding="utf-8")
    print("coco", "to-secondary-500" in coco)

# --- Avatar already from-primary-400 to-secondary-400: auto yellow-orange ---
# --- Header wordmark gradient ---
header_path = Path("src/components/layout/Header.jsx")
h = header_path.read_text(encoding="utf-8")
h = h.replace(
    "text-2xl font-display font-bold text-primary-600 dark:text-primary-400 shrink-0",
    "text-2xl font-display font-bold gradient-text shrink-0",
)
h = h.replace(
    "w-9 h-9 rounded-full bg-primary-500 text-lg shadow-sm",
    "w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-lg shadow-sm",
)
header_path.write_text(h, encoding="utf-8")
print("header gradient", "gradient-text" in h)

# --- Footer ---
footer_path = Path("src/components/layout/Footer.jsx")
if footer_path.exists():
    f = footer_path.read_text(encoding="utf-8")
    f = f.replace(
        "text-2xl font-display font-bold mb-4 text-primary-600 dark:text-primary-400",
        "text-2xl font-display font-bold mb-4 gradient-text",
    )
    f = f.replace(
        "bg-primary-50 dark:bg-primary-900/20 border-b border-primary-100 dark:border-primary-900/40",
        "bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-b border-primary-100 dark:border-primary-900/40",
    )
    footer_path.write_text(f, encoding="utf-8")
    print("footer ok")

# --- Home teacher band soft gradient ---
home_path = Path("src/pages/HomePage.jsx")
if home_path.exists():
    home = home_path.read_text(encoding="utf-8")
    home = home.replace(
        "bg-primary-50 dark:bg-primary-900/20 border-t border-primary-100 dark:border-primary-900/40",
        "bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-t border-primary-100 dark:border-primary-900/40",
    )
    # title highlight use gradient if solid yellow
    home = home.replace(
        '<span className="text-primary-600 dark:text-primary-400">{t(\'home.hero.titleHighlight\')}</span>',
        '<span className="gradient-text">{t(\'home.hero.titleHighlight\')}</span>',
    )
    home_path.write_text(home, encoding="utf-8")
    print("home ok")

# --- ForTeachersPage: ensure heroes use primary-secondary (already do) ---
# Replace any teal leftovers in ForTeachers if present
ftp = Path("src/pages/ForTeachersPage.jsx")
if ftp.exists():
    ft = ftp.read_text(encoding="utf-8")
    before = ft
    ft = ft.replace("from-teal-", "from-secondary-").replace("to-teal-", "to-secondary-")
    ft = ft.replace("via-teal-", "via-secondary-")
    if ft != before:
        ftp.write_text(ft, encoding="utf-8")
        print("for teachers teal scrubbed")
    else:
        print("for teachers already primary-secondary gradients")

print("DONE", "#F97316" in Path("tailwind.config.js").read_text(encoding="utf-8"))
