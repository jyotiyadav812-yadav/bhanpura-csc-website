import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTopRoute() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hash) {
      const id = decodeURIComponent(hash.replace('#', ''));
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
