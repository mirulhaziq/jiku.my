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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      'data-reveal': true,
      'data-visible': visible ? 'true' : undefined,
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
      className: cn(className),
    },
    children
  );
}
