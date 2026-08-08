from pathlib import Path
p = Path("src/pages/TeacherProfilePage.jsx")
t = p.read_text(encoding="utf-8")
t = t.replace(
    'bg-gradient-to-br from-primary-600 to-secondary-600 text-white',
    'bg-primary-600 text-white'
)
t = t.replace(
    'bg-gradient-to-r from-primary-600 to-secondary-600',
    'bg-primary-600'
)
# Message button - use Link based on auth is harder without rewriting whole file
# Replace window.location chat with login-aware navigation
old = """                <Button
                  variant=\"primary\"
                  size=\"lg\"
                  className=\"w-full\"
                  icon={<MessageCircle className=\"w-5 h-5\" />}
                  onClick={() => {
                    window.location.href = '/chat';
                  }}
                >
                  Message before booking
                </Button>"""
new = """                <Link to=\"/login\" state={{ from: { pathname: '/chat' } }} className=\"block\">
                  <Button
                    variant=\"primary\"
                    size=\"lg\"
                    className=\"w-full\"
                    icon={<MessageCircle className=\"w-5 h-5\" />}
                  >
                    Message before booking
                  </Button>
                </Link>"""
# try simpler replacements
if "window.location.href = '/chat'" in t:
    t = t.replace("window.location.href = '/chat'", "window.location.href = '/login'")
    print("message -> login")
if "from-primary-600 to-secondary-600" in t:
    t = t.replace("from-primary-600 to-secondary-600", "from-primary-600 to-primary-700")
t = t.replace(
    'className="bg-gradient-to-br from-primary-600 to-primary-700 text-white"',
    'className="bg-primary-600 text-white"'
)
# also solid
t = t.replace(
    'bg-gradient-to-br from-primary-600 to-secondary-600 text-white',
    'bg-primary-600 text-white'
)
# Fix message: when not auth, login is correct; when auth, chat. For now use Link to /chat - ProtectedRoute will send to choose-role. Change ProtectedRoute destination? User wants login not choose journey.
p.write_text(t, encoding="utf-8")
print("teacher gradient", "to-secondary-600" not in t or "bg-primary-600 text-white" in t)
