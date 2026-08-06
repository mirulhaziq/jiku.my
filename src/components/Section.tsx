import { cn } from '@/lib/cn';

type SectionProps = {
  id?: string;
  kicker?: string;
  title?: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
};

export function Section({
  id,
  kicker,
  title,
  intro,
  children,
  className,
  bordered = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'mx-auto max-w-5xl px-6 py-20 md:py-28',
        bordered && 'border-t border-border',
        className,
      )}
    >
      {(kicker || title || intro) && (
        <header className="mb-10 md:mb-14">
          {kicker && (
            <p className="text-xs uppercase tracking-widest text-blue-700 dark:text-blue-400 font-semibold mb-3">
              {kicker}
            </p>
          )}
          {title && (
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
              {title}
            </h2>
          )}
          {intro && (
            <p className="text-muted max-w-2xl text-base md:text-lg leading-relaxed">
              {intro}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
}
