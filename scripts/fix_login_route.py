from pathlib import Path
p = Path("src/lib/routes.jsx")
t = p.read_text(encoding="utf-8")
t = t.replace(
"""      {
        path: 'login',
        element: <ChooseRolePage />,
      },""",
"""      {
        path: 'login',
        element: <LoginPage />,
      },""",
)
p.write_text(t, encoding="utf-8")
print("login -> LoginPage", "path: 'login'" in t and "LoginPage />" in t)
# verify
for i,line in enumerate(t.splitlines(),1):
    if "path: 'login'" in line or (i>0 and "LoginPage" in line and "login" in t.splitlines()[i-2] if i>1 else False):
        pass
import re
m=re.search(r"path: 'login',[\s\S]{0,80}", t)
print(m.group(0) if m else "no")
