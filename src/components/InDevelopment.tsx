'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function InDevelopment() {
  return (
    <div className="rounded-card border border-border bg-card p-8 md:p-12 flex flex-col items-center text-center">
      <div style={{ width: 'min(60vw, 260px)', aspectRatio: '1 / 1' }}>
        <DotLottieReact
          src="/claude.lottie"
          autoplay
          loop
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <p className="mt-4 text-xs uppercase tracking-widest text-blue-700 dark:text-blue-400 font-semibold">
        In development
      </p>
      <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-fg">
        Stay tuned
      </h2>
      <p className="mt-3 text-muted max-w-md leading-relaxed">
        The full case study is being written up. Check back soon.
      </p>
    </div>
  );
}
