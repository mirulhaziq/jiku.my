'use client';

import { useEffect, useRef, useState, createElement } from 'react';
import { cn } from '@/lib/cn';

export function Reveal({
  children,
  delay,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'li';
}) {
  const ref = useRef<HTMLDivElement | HTMLLIElement>(null);
  const [state, setState] = useState<'initial' | 'ready' | 'visible'>('initial');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const inViewport = () => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight - 40 && rect.bottom > 0;
    };

    setState('ready');

    if (inViewport()) {
      requestAnimationFrame(() => setState('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState('visible');
            observer.disconnect();
            window.removeEventListener('scroll', onScroll);
          }
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);

    const onScroll = () => {
      if (inViewport()) {
        setState('visible');
        observer.disconnect();
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return createElement(
    as,
    {
      ref,
      'data-reveal': state === 'initial' ? undefined : 'ready',
      'data-visible': state === 'visible' ? 'true' : undefined,
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
      className: cn(className),
    },
    children,
  );
}
