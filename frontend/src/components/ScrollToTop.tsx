import { useScrollToTop } from '../hooks/useScrollToTop';
import { ChevronUp } from 'lucide-react';

export function ScrollToTop() {
  const { isVisible, scrollToTop } = useScrollToTop();

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="btn btn-float top fixed bottom-24 right-6 z-40 max-sm:bottom-20 max-sm:right-4"
      aria-label="Scroll to top"
      title="Back to top"
    >
      <ChevronUp className="w-6 h-6 mx-auto" aria-hidden="true" />
    </button>
  );
}