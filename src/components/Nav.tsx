'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';

type NavLink = { href: string; label: string; id: string };

const LINKS: NavLink[] = [
  { href: '/#journey', label: 'Journey', id: 'journey' },
  { href: '/#work', label: 'Work', id: 'work' },
  { href: '/#projects', label: 'Projects', id: 'projects' },
  { href: '/#roadmap', label: 'Roadmap', id: 'roadmap' },
  { href: '/#contact', label: 'Contact', id: 'contact' },
];

const OBSERVED_IDS = ['hero', ...LINKS.map((l) => l.id)];

// useLayoutEffect on client, useEffect on server — avoids a warning
// while still measuring layout synchronously in the browser.
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function routeActiveId(pathname: string): string | null {
  if (pathname.startsWith('/work/')) return 'work';
  if (pathname.startsWith('/projects/')) return 'projects';
  return null;
}

export function Nav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const routeActive = routeActiveId(pathname);

  const [activeId, setActiveId] = useState<string>(routeActive ?? 'hero');

  // IntersectionObserver on the home page's sections; route-based fallback elsewhere.
  useEffect(() => {
    if (!isHome) {
      if (routeActive) setActiveId(routeActive);
      return;
    }

    const elements = OBSERVED_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [isHome, routeActive, pathname]);

  // Single sliding pill: measure the active link's offset + width and transform
  // a single background element via CSS. Deterministic, no shared-layout quirks
  // across route changes — the pill only ever moves horizontally.
  const listRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<{ x: number; w: number; visible: boolean }>({ x: 0, w: 0, visible: false });
  // Suppress the transition on the very first paint AND on route changes so the
  // pill snaps to place instead of sliding in from x=0.
  const [transitionOn, setTransitionOn] = useState(false);

  useIsoLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>(`[data-nav-id="${activeId}"]`);
    if (!active) {
      setPill((p) => ({ ...p, visible: false }));
      return;
    }
    setPill({ x: active.offsetLeft, w: active.offsetWidth, visible: true });
  }, [activeId, pathname]);

  // Enable the slide transition ONE tick after mount and after each route
  // change. That way the initial position + post-navigation position both snap
  // in place, but subsequent in-page changes (scrolling on /) slide smoothly.
  useEffect(() => {
    setTransitionOn(false);
    const id = window.setTimeout(() => setTransitionOn(true), 80);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return (
    <nav
      aria-label="Primary"
      className={cn(
        'fixed z-40 left-1/2 -translate-x-1/2',
        'top-4 md:top-6',
        'max-md:top-auto max-md:bottom-[max(1rem,env(safe-area-inset-bottom))]',
      )}
    >
      <div
        ref={listRef}
        className={cn(
          'relative flex items-center gap-1 rounded-full p-2',
          'bg-white/75 dark:bg-neutral-900/65',
          'backdrop-blur-2xl backdrop-saturate-150',
          'border border-white/50 dark:border-white/10',
          'shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
        )}
      >
        {/* Single sliding pill background */}
        <span
          aria-hidden="true"
          className={cn(
            'absolute top-2 h-9 rounded-full bg-neutral-900 dark:bg-neutral-100 shadow-sm pointer-events-none',
            transitionOn ? 'transition-[transform,width,opacity] duration-300 ease-out' : '',
          )}
          style={{
            transform: `translateX(${pill.x - 8 /* p-2 offset */}px)`,
            width: `${pill.w}px`,
            opacity: pill.visible ? 1 : 0,
          }}
        />

        {LINKS.map((link) => {
          const isActive = activeId === link.id;
          return (
            <Link
              key={link.href}
              href={link.href}
              data-nav-id={link.id}
              className={cn(
                'relative inline-flex items-center h-9 rounded-full px-4 text-sm font-medium transition-colors',
                isActive
                  ? 'text-white dark:text-neutral-900'
                  : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100',
              )}
            >
              <span className="relative z-10">{link.label}</span>
            </Link>
          );
        })}
        <ThemeToggle />
      </div>
    </nav>
  );
}

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  function cycle() {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  }

  const iconTheme = mounted ? (theme === 'system' ? 'system' : resolvedTheme) : 'system';
  const label = mounted
    ? `Theme: ${theme === 'system' ? 'system' : theme}. Click to change.`
    : 'Theme toggle';

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label}
      title={label}
      className={cn(
        'grid place-items-center rounded-full ml-1',
        'w-9 h-9 text-neutral-700 dark:text-neutral-200',
        'hover:bg-black/5 dark:hover:bg-white/10 transition-colors',
      )}
    >
      {iconTheme === 'dark' && <MoonIcon />}
      {iconTheme === 'light' && <SunIcon />}
      {iconTheme === 'system' && <AutoIcon />}
    </button>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function AutoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" />
    </svg>
  );
}
