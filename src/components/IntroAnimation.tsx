'use client';

import { useEffect, useRef, useState } from 'react';
import { DotLottieReact, setWasmUrl, type DotLottie } from '@lottiefiles/dotlottie-react';

// Serve the renderer WASM from our own /public so the animation doesn't
// depend on a third-party CDN. Without this the Lottie renders as a
// black square until the CDN responds (or forever if it's blocked).
setWasmUrl('/dotlottie-player.wasm');

const FADE_MS = 500;
const FALLBACK_TIMEOUT_MS = 5000;

type Phase = 'idle' | 'playing' | 'fading' | 'done';

export function IntroAnimation({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('idle');
  const fallbackTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setPhase('done');
      return;
    }

    setPhase('playing');
    document.body.style.overflow = 'hidden';

    fallbackTimeoutRef.current = window.setTimeout(startFade, FALLBACK_TIMEOUT_MS);
    return () => {
      if (fallbackTimeoutRef.current !== null) {
        window.clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startFade() {
    if (fallbackTimeoutRef.current !== null) {
      window.clearTimeout(fallbackTimeoutRef.current);
      fallbackTimeoutRef.current = null;
    }
    setPhase('fading');
    window.setTimeout(() => {
      document.body.style.overflow = '';
      setPhase('done');
    }, FADE_MS);
  }

  const overlayVisible = phase === 'playing' || phase === 'fading';

  return (
    <>
      {overlayVisible && (
        <div
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000',
            zIndex: 100,
            display: 'grid',
            placeItems: 'center',
            opacity: phase === 'fading' ? 0 : 1,
            transition: `opacity ${FADE_MS}ms ease-out`,
            pointerEvents: phase === 'fading' ? 'none' : 'auto',
          }}
        >
          {phase === 'playing' && (
            <div style={{ width: 'min(70vw, 520px)', aspectRatio: '1 / 1' }}>
              <DotLottieReact
                src="/hello-apple.lottie"
                autoplay
                loop={false}
                dotLottieRefCallback={(dotLottie: DotLottie | null) => {
                  dotLottie?.addEventListener('complete', startFade);
                }}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          )}
        </div>
      )}
      {children}
    </>
  );
}
