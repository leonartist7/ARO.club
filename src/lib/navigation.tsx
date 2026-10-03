"use client";
import NextLink from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams as useNextSearchParams,
} from "next/navigation";
import { useCallback, useEffect } from "react";
import type { ComponentProps, ReactNode } from "react";
export { useParams } from "next/navigation";
type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & { to: string };
export function Link({ to, ...props }: LinkProps) {
  return <NextLink href={to} {...props} />;
}
type Active = { isActive: boolean };
type NavProps = Omit<LinkProps, "className" | "children"> & {
  end?: boolean;
  className?: string | ((state: Active) => string);
  children?: ReactNode | ((state: Active) => ReactNode);
};
export function NavLink({ to, end, className, children, ...props }: NavProps) {
  const pathname = usePathname();
  const state = {
    isActive: end
      ? pathname === to
      : pathname === to || pathname.startsWith(to + "/"),
  };
  return (
    <Link
      to={to}
      aria-current={state.isActive ? "page" : undefined}
      className={typeof className === "function" ? className(state) : className}
      {...props}
    >
      {typeof children === "function" ? children(state) : children}
    </Link>
  );
}
export function useLocation() {
  const pathname = usePathname();
  const params = useNextSearchParams();
  return {
    pathname,
    search: params.size ? "?" + params.toString() : "",
    hash: "",
    state: null,
  };
}
export function useNavigate() {
  const router = useRouter();
  return useCallback(
    (to: string | number, options?: { replace?: boolean; state?: unknown }) => {
      if (typeof to === "number") {
        if (to === -1) router.back();
        else if (to === 1) router.forward();
        return;
      }
      if (options?.replace) router.replace(to);
      else router.push(to);
    },
    [router],
  );
}
export function Navigate({
  to,
  replace = false,
}: {
  to: string;
  replace?: boolean;
}) {
  const navigate = useNavigate();
  useEffect(() => navigate(to, { replace }), [navigate, to, replace]);
  return null;
}
export function useSearchParams() {
  const params = useNextSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return [
    params,
    (value: URLSearchParams | string | Record<string, string>) =>
      router.push(pathname + "?" + new URLSearchParams(value).toString()),
  ] as const;
}
