from pathlib import Path
p = Path("src/components/layout/Header.jsx")
t = p.read_text(encoding="utf-8")
needle = """          <div className=\"md:hidden flex items-center gap-1\">
            <ThemeToggle />"""
repl = """          <div className=\"md:hidden flex items-center gap-1\">
            <LanguageToggle />
            <ThemeToggle />"""
if needle in t and t.count("<LanguageToggle") < 2:
    t = t.replace(needle, repl, 1)
    p.write_text(t, encoding="utf-8")
    print("added")
else:
    print("LanguageToggle count", t.count("LanguageToggle"))
