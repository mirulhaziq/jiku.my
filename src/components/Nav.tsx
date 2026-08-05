'use client';

import { useEffect, useState } from 'react';
import { motion, LayoutGroup } from 'motion/react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/cn';

type NavLink = { href: string; label: string; id: string };

const LINKS: NavLink[] = [
  { href: '#journey', label: 'Journey', id: 'journey' },
  { href: '#projects', label: 'Projects', id: 'projects' },
  { href: '#roadmap', label: 'Roadmap', id: 'roadmap' },
  { href: '#contact', label: 'Contact', id: 'contact' },
];

const OBSERVED_IDS = ['hero', ...LINKS.map((l) => l.id)];

export function Nav() {
  const [activeId, setActiveId] = useState<string>('hero');

  useEffect(() => {
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
  }, []);

  return (
    <nav
      aria-label="Primary"
      className={cn(
        'fixed z-40 left-1/2 -translate-x-1/2',
        'top-4 md:top-6',
        'max-md:top-auto max-md:bottom-[max(1rem,env(safe-area-inset-bottom))]',
      )}
    >
      <LayoutGroup>
        <div
          className={cn(
            'flex items-center gap-1 rounded-full p-2',
            'bg-white/75 dark:bg-neutral-900/65',
            'backdrop-blur-2xl backdrop-saturate-150',
            'border border-white/50 dark:border-white/10',
            'shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]',
          )}
        >
          {LINKS.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'relative inline-flex items-center h-9 rounded-full px-4 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-white dark:text-neutral-900'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    initial={false}
                    className="absolute inset-0 rounded-full bg-neutral-900 dark:bg-neutral-100 shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
          <ThemeToggle />
        </div>
      </LayoutGroup>
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
