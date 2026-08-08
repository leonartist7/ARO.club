from pathlib import Path

# Teacher profile message button
p = Path("src/pages/TeacherProfilePage.jsx")
t = p.read_text(encoding="utf-8")
# find message button block
if "window.location.href = '/login'" in t:
    t = t.replace(
        """onClick={() => {
                    window.location.href = '/login';
                  }}""",
        """onClick={() => {
                    window.location.href = '/login?next=/chat';
                  }}"""
    )
# better: use Link if already imported
if "Message before booking" in t and "to=\"/login\"" not in t:
    import re
    t = re.sub(
        r'<Button\s+variant="primary"\s+size="lg"\s+className="w-full"\s+icon=\{<MessageCircle className="w-5 h-5" />\}\s+onClick=\{\(\) => \{\s*window\.location\.href = \'[^\']+\';\s*\}\}\s*>\s*Message before booking\s*</Button>',
        '<Link to="/login" state={{ from: { pathname: "/chat" } }} className="block w-full"><Button variant="primary" size="lg" className="w-full" icon={<MessageCircle className="w-5 h-5" />}>Message before booking</Button></Link>',
        t,
    )
p.write_text(t, encoding="utf-8")
print("teacher msg", "login" in t)

# Experience detail Message -> login with return to chat
p = Path("src/pages/ExperienceDetailPage.jsx")
t = p.read_text(encoding="utf-8")
t = t.replace('<Link to="/chat">', '<Link to="/login" state={{ from: { pathname: "/chat" } }}>')
# Remove page-level motion remount flicker: use plain div instead of motion when not needed
# Keep simple
if "const motionProps" in t:
    t = t.replace(
        """  const motionProps = reduceMotion
    ? {}
    : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4 } };

  const BookingCard""",
        """  const BookingCard"""
    )
    t = t.replace(
        "<motion.div {...motionProps} className=\"min-h-screen bg-gray-50 dark:bg-gray-950 pb-28 lg:pb-12\">",
        "<div className=\"min-h-screen bg-gray-50 dark:bg-gray-950 pb-28 lg:pb-12\">"
    )
    t = t.replace("</motion.div>\n  );\n}", "</div>\n  );\n}")
    # clean unused imports if motion no longer used
    if "motion." not in t and "useReducedMotion" not in t:
        t = t.replace("import { motion, useReducedMotion } from 'framer-motion';\n", "")
    elif "motion." not in t:
        t = t.replace("import { motion, useReducedMotion } from 'framer-motion';\n", "import { useReducedMotion } from 'framer-motion';\n")
        # if reduceMotion unused
        if "reduceMotion" not in t:
            t = t.replace("import { useReducedMotion } from 'framer-motion';\n", "")
    # remove unused reduceMotion const
    t = t.replace("  const reduceMotion = useReducedMotion();\n", "")
p.write_text(t, encoding="utf-8")
print("detail message+motion", "from: { pathname: \"/chat\" }" in t or "pathname: \"/chat\"" in t)

# Footer: remove coco gradient dependency - use solid yellow text
p = Path("src/components/layout/Footer.jsx")
t = p.read_text(encoding="utf-8")
t = t.replace(
    """            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-display font-bold mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
            >
              <CocoMascot pose="idle" size="sm" className="!w-9 !h-9 !text-lg" />
              <span className="gradient-text">Tonguee</span>
            </Link>""",
    """            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-display font-bold mb-4 text-primary-600 dark:text-primary-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg"
            >
              <span className="text-2xl" aria-hidden="true">🦎</span>
              Tonguee
            </Link>"""
)
if "CocoMascot" in t and "<CocoMascot" not in t:
    t = t.replace("import CocoMascot from '../ui/CocoMascot';\n", "")
# trust strip: less teal-heavy - use gray/primary warm
t = t.replace(
    "bg-secondary-50 dark:bg-secondary-900/30 border-b border-secondary-100 dark:border-secondary-800/50",
    "bg-primary-50 dark:bg-primary-900/20 border-b border-primary-100 dark:border-primary-900/40"
)
t = t.replace(
    "text-secondary-700 dark:text-secondary-300",
    "text-primary-800 dark:text-primary-200"
)
t = t.replace(
    "text-secondary-300 dark:text-secondary-700",
    "text-primary-300 dark:text-primary-700"
)
p.write_text(t, encoding="utf-8")
print("footer ok")
