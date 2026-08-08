from pathlib import Path

# FavoriteButton
p = Path("src/components/ui/FavoriteButton.jsx")
t = p.read_text(encoding="utf-8")
t = t.replace("sm: 'p-1.5'", "sm: 'p-2 min-w-11 min-h-11 inline-flex items-center justify-center'")
t = t.replace("default: 'p-2'", "default: 'p-2.5 min-w-11 min-h-11 inline-flex items-center justify-center'")
t = t.replace("lg: 'p-3'", "lg: 'p-3 min-w-11 min-h-11 inline-flex items-center justify-center'")
# if already partially replaced
if "min-w-11" not in t:
    t = t.replace("p-1.5", "p-2 min-w-11 min-h-11 inline-flex items-center justify-center")
p.write_text(t, encoding="utf-8")
print("FavoriteButton min-w-11 count", t.count("min-w-11"))

# Header - only nav active colors, avoid double dark:
p = Path("src/components/layout/Header.jsx")
t = p.read_text(encoding="utf-8")
# restore if we double-patched earlier - normalize then apply once
t = t.replace("text-primary-700 dark:text-primary-300 dark:text-primary-300", "text-primary-700 dark:text-primary-300")
t = t.replace("hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-300", "hover:text-primary-700 dark:hover:text-primary-300")
if "text-primary-500" in t:
    t = t.replace(
        "? 'text-primary-500'\n                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-500'",
        "? 'text-primary-700 dark:text-primary-300'\n                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300'",
    )
    t = t.replace("text-primary-500", "text-primary-700 dark:text-primary-300")
p.write_text(t, encoding="utf-8")
print("Header primary-700", "text-primary-700" in t, "primary-500 left", "text-primary-500" in t)
