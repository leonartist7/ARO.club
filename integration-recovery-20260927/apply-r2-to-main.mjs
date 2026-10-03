import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2]);
if (!root.endsWith(`${path.sep}ARO-r2-integration`)) throw new Error('Unexpected target checkout');
const changed = [];

function visit(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) visit(full);
    else if (/\.(jsx|tsx|css)$/.test(entry.name)) {
      let value = fs.readFileSync(full, 'utf8');
      const before = value;
      value = value
        .replaceAll('222,67,37', '244,208,0')
        .replaceAll('222 67 37', '244 208 0')
        .replaceAll('239 193 75', '245 130 32')
        .replaceAll('239,193,75', '245,130,32')
        .replaceAll('#efc14b', '#f58220')
        .replaceAll('190,50,25', '244,208,0');

      value = value.replace(/(['"])([^'"\n]*\bbg-primary-500\b[^'"\n]*)\1/g, (whole, quote, classes) =>
        quote + classes.replace(/(?<![-\w:])text-white\b/g, 'text-ink').replaceAll('hover:bg-primary-600', 'hover:bg-primary-400') + quote
      );
      value = value.replace(/(['"])([^'"\n]*\bfrom-primary-(?:500|600)\b[^'"\n]*\btext-white\b[^'"\n]*)\1/g, (whole, quote, classes) =>
        quote + classes.replace(/from-primary-(500|600)/g, 'from-primary-700').replaceAll('via-primary-500', 'via-primary-700').replaceAll('to-secondary-500', 'to-secondary-700') + quote
      );
      if (value !== before) {
        fs.writeFileSync(full, value);
        changed.push(path.relative(root, full).replaceAll(path.sep, '/'));
      }
    }
  }
}

visit(path.join(root, 'src'));
console.log(changed.join('\n'));
