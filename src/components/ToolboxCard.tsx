'use client';

import { useRef } from 'react';
import { cn } from '@/lib/cn';

export type ToolboxGroup = {
  label: string;
  items: readonly string[];
  icon: React.ReactNode;
  tileTint: string;
  glowRgb: string;
};

export function ToolboxCard({ group }: { group: ToolboxGroup }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }

  const glowStyle = {
    background: `radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(${group.glowRgb}, 0.08), transparent 40%)`,
  } as React.CSSProperties;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-card border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={glowStyle}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <span className={cn('w-11 h-11 rounded-xl grid place-items-center', group.tileTint)}>
            {group.icon}
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-muted">
            {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <h4 className="text-lg font-semibold text-fg mb-4">{group.label}</h4>

        <div className="flex flex-wrap gap-1.5">
          {group.items.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted transition-colors hover:border-fg/20 hover:text-fg"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
