from pathlib import Path
s=Path(__file__).with_name('FV1-prepare.py').read_text(encoding='utf-8')
exec(s[:s.index('for i in range(1,8):')]+s[s.index("p=docs/'proposed-ARO-FV-1.md'"):])
