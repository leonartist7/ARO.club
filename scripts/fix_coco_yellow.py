from pathlib import Path
p = Path("src/components/ui/CocoMascot.jsx")
t = p.read_text(encoding="utf-8")
t = t.replace("bg-gradient-to-br from-primary-500 to-secondary-500", "bg-primary-500")
if "bg-primary-500 text-gray-900" not in t:
    t = t.replace("'bg-primary-500 text-gray-900'", "'bg-primary-500 text-gray-900'")
p.write_text(t, encoding="utf-8")
print("coco", "to-secondary" not in t)
