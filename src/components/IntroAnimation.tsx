'use client';

import { useEffect, useRef, useState } from 'react';
import { DotLottieReact, setWasmUrl, type DotLottie } from '@lottiefiles/dotlottie-react';

// Serve the renderer WASM from our own /public so the animation doesn't
// depend on a third-party CDN.
setWasmUrl('/dotlottie-player.wasm');

const SESSION_KEY = 'intro-played';
const FADE_MS = 500;
const FALLBACK_TIMEOUT_MS = 5000;

// 'pending' is the SSR + first-paint state: overlay is in the initial HTML,
// covering the portfolio, before any JavaScript runs. This is what makes the
// Lottie feel like a real loading page — the user never sees the portfolio
// flash first. The inline `<script>` in layout.tsx CSS-hides the overlay
// immediately for repeat visitors so THEY don't get a black flash either.
type Phase = 'pending' | 'playing' | 'fading' | 'done';

export function IntroAnimation({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('pending');
  const fallbackTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadyPlayed = window.sessionStorage.getItem(SESSION_KEY);

    if (alreadyPlayed || reduced) {
      if (reduced) window.sessionStorage.setItem(SESSION_KEY, '1');
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
    window.sessionStorage.setItem(SESSION_KEY, '1');
    setPhase('fading');
    window.setTimeout(() => {
      document.body.style.overflow = '';
      setPhase('done');
    }, FADE_MS);
  }

  const overlayVisible = phase === 'pending' || phase === 'playing' || phase === 'fading';

  return (
    <>
      {overlayVisible && (
        <div
          data-intro-overlay
          aria-hidden="true"
          onClick={phase === 'playing' ? startFade : undefined}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#fafafa',
            zIndex: 100,
            display: 'grid',
            placeItems: 'center',
            opacity: phase === 'fading' ? 0 : 1,
            transition: `opacity ${FADE_MS}ms ease-out`,
            pointerEvents: phase === 'fading' ? 'none' : 'auto',
            cursor: phase === 'playing' ? 'pointer' : 'default',
          }}
        >
          {phase === 'playing' && (
            <>
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
              <p
                style={{
                  position: 'absolute',
                  bottom: '2.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  color: '#6b7280',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.02em',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
                  userSelect: 'none',
                }}
              >
                Tap anywhere to skip
              </p>
            </>
          )}
        </div>
      )}
      {children}
    </>
  );
}
