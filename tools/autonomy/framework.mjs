import fs from 'node:fs';
import path from 'node:path';

// Callers supply AUTO0's existing safeFile boundary; only committed inputs count.
export function frameworkInventory(root, tracked, safeFile) {
  const read = file => {
    if (!tracked.includes(file)) throw Error('Framework input is not committed');
    return fs.readFileSync(safeFile(root, file), 'utf8');
  };
  const pkg = JSON.parse(read('package.json'));
  const deps = { ...pkg.devDependencies, ...pkg.dependencies };
  const next = Boolean(deps.next) && pkg.scripts?.build === 'next build';
  const vite = !deps.next && Boolean(deps.vite) && pkg.scripts?.build === 'vite build';
  if (next === vite) throw Error('Unsupported or ambiguous framework');
  if (next) {
    if (tracked.includes('src/lib/routes.jsx') || tracked.some(f => /^(app|pages|src\/pages)\//.test(f))) throw Error('Unsupported mixed router roots');
    const pages = tracked.filter(f => /^src\/app\/(?:.*\/)?page\.(tsx|ts|jsx|js)$/.test(f)).sort();
    if (!pages.length || !tracked.some(f => /^src\/app\/layout\.(tsx|ts|jsx|js)$/.test(f))) throw Error('Missing App Router inputs');
    for (const file of tracked.filter(f => /^src\/app\/layout\.(tsx|ts|jsx|js)$/.test(f))) read(file);
    const configs = tracked.filter(f => /^next\.config\./.test(f));
    if (configs.length > 1) throw Error('Ambiguous Next configuration');
    for (const file of configs) {
      if (!/^next\.config\.(js|mjs|ts)$/.test(file) || /\b(?:pageExtensions|distDir)\b|\boutput\s*:/.test(read(file))) throw Error('Unsupported Next output or page configuration');
    }
    if (tracked.some(f => /^src\/app\/(?:.*\/)?page\./.test(f) && !pages.includes(f))) throw Error('Unsupported page extension');
    const routes = [], seen = new Set();
    for (const source of pages) {
      read(source);
      const segments = source.slice('src/app/'.length).split('/').slice(0, -1);
      if (segments.some(s => s.startsWith('_'))) continue;
      const url = [];
      for (const segment of segments) {
        if (/^\([A-Za-z0-9_-]+\)$/.test(segment)) continue;
        if (!/^(?:[A-Za-z0-9_-]+|\[[A-Za-z0-9_]+\]|\[\.\.\.[A-Za-z0-9_]+\]|\[\[\.\.\.[A-Za-z0-9_]+\]\])$/.test(segment)) throw Error('Unsupported App Router segment');
        url.push(segment);
      }
      const declaredPath = '/' + url.join('/');
      const identity = declaredPath.replace(/\[\[\.\.\.[^\]]+\]\]/g, '[[...param]]').replace(/\[\.\.\.[^\]]+\]/g, '[...param]').replace(/(?<!\[)\[(?!\.|\[)[^\]]+\]/g, '[param]');
      if (seen.has(identity)) throw Error('Ambiguous App Router page');
      seen.add(identity);
      routes.push({ declaredPath, source, line: 1 });
    }
    return { framework: 'next', routes };
  }
  if (tracked.some(f => /^(src\/)?app\//.test(f))) throw Error('Unsupported mixed router roots');
  const source = 'src/lib/routes.jsx';
  const routes = read(source).split('\n').flatMap((line, index) => [...line.matchAll(/path:\s*['"]([^'"]+)['"]/g)]
    .map(match => ({ declaredPath: match[1], source, line: index + 1 })));
  if (!routes.length) throw Error('Missing literal Vite route inventory');
  return { framework: 'vite', routes };
}

export function frameworkCommands(framework) {
  if (framework === 'next') return { executable: 'node_modules/next/dist/bin/next', build: ['build'], serve: ['start', '--hostname', '127.0.0.1', '--port', '5199'], output: '.next' };
  if (framework === 'vite') return { executable: 'node_modules/vite/bin/vite.js', build: ['build'], serve: ['preview', '--host', '127.0.0.1', '--port', '5199', '--strictPort'], output: 'dist' };
  throw Error('Unsupported framework launch');
}

export function syntheticEnvironment(root, inherited) {
  // Next/Vite load local files even when no variables are passed to the child.
  if (fs.readdirSync(root).some(name => /^\.env(?:$|\.)/i.test(name) && !['.env.example', '.env.sample'].includes(name.toLowerCase()))) throw Error('Synthetic capture rejects local environment files');
  const flags = ['NEXT_PUBLIC_ENABLE_STAGING_ACCOUNTS', 'NEXT_PUBLIC_ENABLE_PRODUCTION_ACCOUNTS'];
  for (const [key, value] of Object.entries(inherited)) {
    if (!value) continue;
    if (flags.includes(key) && value === 'false') continue;
    if (/^(NEXT_PUBLIC_|VITE_|VERCEL|SUPABASE|OPENAI|ANTHROPIC|AI_GATEWAY|STRIPE|RESEND)|^NODE_OPTIONS$|^DOTENV/i.test(key)) throw Error('Synthetic capture rejects provider or injected configuration');
  }
  const env = {};
  for (const key of ['PATH', 'Path', 'SystemRoot', 'SYSTEMROOT', 'WINDIR', 'HOME', 'USERPROFILE', 'TEMP', 'TMP', 'TMPDIR', 'LANG', 'LC_ALL']) {
    if (inherited[key]) env[key] = inherited[key];
  }
  return { ...env, NODE_ENV: 'production', CI: 'true', NEXT_TELEMETRY_DISABLED: '1',
    NEXT_PUBLIC_ENABLE_STAGING_ACCOUNTS: 'false', NEXT_PUBLIC_ENABLE_PRODUCTION_ACCOUNTS: 'false',
    NEXT_PUBLIC_SUPABASE_URL: '', NEXT_PUBLIC_SUPABASE_ANON_KEY: '', NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: '',
    NEXT_PUBLIC_PRODUCTION_SUPABASE_REF: '', NEXT_PUBLIC_VERCEL_ENV: '', VERCEL_ENV: '' };
}

export function freshBuildDirectory(root, tracked, directory) {
  if (!['.next', 'dist'].includes(directory)) throw Error('Unsupported build directory');
  const target = path.resolve(root, directory);
  if (path.dirname(target) !== fs.realpathSync(root) || tracked.some(f => f === directory || f.startsWith(directory + '/'))) throw Error('Build output overlaps source');
  if (fs.existsSync(target) && fs.lstatSync(target).isSymbolicLink()) throw Error('Build output cannot be a symlink');
  return target;
}
