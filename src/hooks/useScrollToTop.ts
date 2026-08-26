import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import {
  findScrollContainer,
  getScrollPosition,
  getScrollViewportHeight,
  scrollContainerToTop,
  type ActiveScrollContainer,
} from "../utils/scrollContainer";

export function useScrollToTop(
  containerRef: RefObject<HTMLElement | null>,
  contextKey: string,
) {
  const [visible, setVisible] = useState(false);
  const activeScrollContainerRef = useRef<ActiveScrollContainer>(window);

  useEffect(() => {
    const content = containerRef.current;
    if (!content) return;

    const activeScrollContainer = findScrollContainer(content) ?? window;
    activeScrollContainerRef.current = activeScrollContainer;
    let frame = 0;

    const updateVisibility = () => {
      frame = 0;
      const threshold = getScrollViewportHeight(activeScrollContainer);
      setVisible(getScrollPosition(activeScrollContainer) > threshold);
    };

    const scheduleVisibilityUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    activeScrollContainer.addEventListener("scroll", scheduleVisibilityUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleVisibilityUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      activeScrollContainer.removeEventListener(
        "scroll",
        scheduleVisibilityUpdate,
      );
      window.removeEventListener("resize", scheduleVisibilityUpdate);
    };
  }, [containerRef, contextKey]);

  const scrollToTop = useCallback(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    scrollContainerToTop(
      activeScrollContainerRef.current,
      reducedMotion ? "auto" : "smooth",
    );
    containerRef.current?.focus({ preventScroll: true });
    setVisible(false);
  }, [containerRef]);

  return { visible, scrollToTop };
}
