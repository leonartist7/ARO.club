from pathlib import Path
p = Path("src/contexts/CompareContext.jsx")
t = p.read_text(encoding="utf-8")
replacements = [
    ("      addToast('Experience already in compare list', 'info');\n      return false;", "      return false;"),
    ("    setCompareList((prev) => [...prev, experienceId]);\n    addToast('Added to compare list', 'success');\n    return true;", "    setCompareList((prev) => [...prev, experienceId]);\n    return true;"),
    ("    setCompareList((prev) => prev.filter((id) => id !== experienceId));\n    addToast('Removed from compare list', 'info');\n  };", "    setCompareList((prev) => prev.filter((id) => id !== experienceId));\n  };"),
    ("    setCompareList([]);\n    addToast('Compare list cleared', 'info');\n  };", "    setCompareList([]);\n  };"),
]
for a,b in replacements:
    if a not in t:
        print("MISS", a[:50])
    else:
        t = t.replace(a,b)
        print("ok", a[:40])
p.write_text(t, encoding="utf-8")
print("done", "Added to compare" not in t)
