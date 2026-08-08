from pathlib import Path
p = Path("src/components/features/ExperienceCard.jsx")
t = p.read_text(encoding="utf-8")
t = t.replace(
    'className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"',
    'className="w-full h-full object-cover"'
)
t = t.replace(
    'text-lg font-semibold text-gray-900 mb-2 line-clamp-2',
    'text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2'
)
t = t.replace(
    'text-sm text-gray-600 mb-3 line-clamp-2',
    'text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2'
)
t = t.replace(
    'text-sm font-medium text-gray-900 truncate',
    'text-sm font-medium text-gray-900 dark:text-white truncate'
)
t = t.replace(
    'text-xs text-gray-500',
    'text-xs text-gray-500 dark:text-gray-400'
)
t = t.replace(
    'space-y-1.5 mb-3 text-sm text-gray-600',
    'space-y-1.5 mb-3 text-sm text-gray-600 dark:text-gray-300'
)
t = t.replace(
    'text-2xl font-bold text-primary-500',
    'text-2xl font-bold text-primary-700 dark:text-primary-300'
)
p.write_text(t, encoding="utf-8")
print("ExperienceCard ok", "hover:scale-110" not in t, "dark:text-white" in t)
