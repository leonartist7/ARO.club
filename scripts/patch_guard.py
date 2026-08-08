from pathlib import Path
p = Path("src/components/auth/ProtectedRoute.jsx")
t = p.read_text(encoding="utf-8")
t = t.replace('to="/choose-role"', 'to="/login"')
p.write_text(t, encoding="utf-8")
print("ProtectedRoute -> /login", '/choose-role' not in t)
