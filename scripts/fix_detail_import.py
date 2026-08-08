from pathlib import Path
p = Path("src/pages/ExperienceDetailPage.jsx")
t = p.read_text(encoding="utf-8")
t = t.replace("import { motion, useReducedMotion } from 'framer-motion';\n", "")
t = t.replace("import { useReducedMotion } from 'framer-motion';\n", "")
t = t.replace("  const reduceMotion = useReducedMotion();\n", "")
p.write_text(t, encoding="utf-8")
print("cleaned", "useReducedMotion" not in t, "framer-motion" not in t)
