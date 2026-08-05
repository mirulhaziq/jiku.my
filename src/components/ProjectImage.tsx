import Image from 'next/image';
import { cn } from '@/lib/cn';

/** Minimum shape ProjectImage needs. Any object with these fields works —
 *  Project entries, WorkEntry entries, or ad-hoc objects for previews. */
export type ImageSource = {
  slug: string;
  /** Text used for the gradient-tile fallback letter and the img alt. */
  label: string;
  image?: string;
  imageAlt?: string;
};

type Props = {
  source: ImageSource;
  aspect?: '16/10' | '16/9';
  className?: string;
  priority?: boolean;
};

// Deterministic pick from a palette so each item keeps the same
// gradient across renders and route navigations.
const GRADIENTS = [
  'from-sky-400 to-indigo-500',
  'from-emerald-400 to-cyan-500',
  'from-orange-400 to-pink-500',
  'from-violet-400 to-fuchsia-500',
  'from-amber-400 to-rose-500',
  'from-lime-400 to-teal-500',
  'from-blue-400 to-purple-500',
  'from-red-400 to-orange-500',
];

function pickGradient(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  return GRADIENTS[hash % GRADIENTS.length];
}

export function ProjectImage({ source, aspect = '16/10', className, priority = false }: Props) {
  const aspectClass = aspect === '16/9' ? 'aspect-[16/9]' : 'aspect-[16/10]';
  const gradient = pickGradient(source.slug);

  if (source.image) {
    return (
      <div className={cn(aspectClass, 'relative overflow-hidden rounded-lg bg-card', className)}>
        <Image
          src={source.image}
          alt={source.imageAlt ?? source.label}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  const letter = source.label.trim().charAt(0).toUpperCase();
  return (
    <div
      className={cn(
        aspectClass,
        'relative overflow-hidden rounded-lg bg-gradient-to-br grid place-items-center',
        gradient,
        className,
      )}
      aria-hidden="true"
    >
      <span className="text-white/90 font-semibold tracking-tight select-none text-[clamp(3rem,10vw,6rem)] leading-none drop-shadow">
        {letter}
      </span>
    </div>
  );
}
