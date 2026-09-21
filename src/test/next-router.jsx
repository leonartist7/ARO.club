// Test-only navigation harness: production navigation uses Next.js directly.
import React, { cloneElement, useState } from 'react';
import { vi } from 'vitest';
import { LanguageProvider } from '../contexts/LanguageContext';
import { NavigationContext } from './navigation-context';

vi.mock('next/navigation', async () => {
  const { useTestNavigation } = await import('./navigation-context');
  return {
    usePathname: () => useTestNavigation().url.pathname,
    useSearchParams: () => useTestNavigation().url.searchParams,
    useParams: () => useTestNavigation().params,
    useRouter: () => useTestNavigation().navigation,
  };
});
vi.mock('next/link', async () => {
  const { useTestNavigation } = await import('./navigation-context');
  return { default: function TestLink({ href, children, onClick, ...props }) {
    const { navigation } = useTestNavigation();
    return <a href={href} {...props} onClick={(event) => {
      onClick?.(event);
      if (!event.defaultPrevented) { event.preventDefault(); navigation.push(href); }
    }}>{children}</a>;
  } };
});

export function createMemoryRouter(routes, { initialEntries }) {
  return { routes, initialPath: initialEntries[0] };
}

function matchRoute(routes, pathname, prefix = '') {
  for (const route of routes) {
    const path = route.index ? prefix : `${prefix}/${route.path ?? ''}`.replace(/\/+/g, '/');
    if (route.children) {
      const nested = matchRoute(route.children, pathname, path);
      if (nested) return { ...nested, element: cloneElement(route.element, {}, nested.element) };
    }
    const names = [];
    const expression = path.replace(/:([^/]+)/g, (_, name) => { names.push(name); return '([^/]+)'; });
    const match = pathname.match(new RegExp(`^${expression}/?$`));
    if (match && !route.children) return {
      element: route.element,
      params: Object.fromEntries(names.map((name, i) => [name, decodeURIComponent(match[i + 1])])),
    };
  }
  return null;
}

export function RouterProvider({ router }) {
  const [path, setPath] = useState(router.initialPath);
  const url = new URL(path, 'https://aro.test');
  const matched = matchRoute(router.routes, url.pathname);
  const navigation = { push: setPath, replace: setPath, refresh() {}, back() {}, forward() {} };
  return <NavigationContext.Provider value={{ url, params: matched?.params ?? {}, navigation }}>
    <LanguageProvider>{matched?.element}</LanguageProvider>
  </NavigationContext.Provider>;
}
