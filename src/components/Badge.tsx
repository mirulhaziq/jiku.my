import { cn } from '@/lib/cn';

export function Badge({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'accent' | 'done' | 'in_progress' | 'planned';
}) {
  const styles: Record<string, string> = {
    neutral: 'bg-card text-muted border-border',
    accent: 'bg-accent/10 text-accent border-accent/30',
    done: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400',
    in_progress: 'bg-accent/10 text-accent border-accent/30',
    planned: 'bg-card text-muted border-border',
  };
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs', styles[tone])}>
      {children}
    </span>
  );
}
