import { useEffect, type RefObject } from "react";

function findScrollContainer(element: HTMLElement): Element | null {
  let parent = element.parentElement;

  while (parent && parent !== document.body) {
    const { overflowY } = window.getComputedStyle(parent);
    if (/auto|scroll|overlay/.test(overflowY)) return parent;
    parent = parent.parentElement;
  }

  return null;
}

export function useScrollReveal(
  containerRef: RefObject<HTMLElement | null>,
  routeKey: string,
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = Array.from(
      container.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!targets.length) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => {
        target.dataset.revealState = "visible";
      });
      return;
    }

    container.dataset.motionReady = "true";
    targets.forEach((target) => {
      target.dataset.revealState = "pending";
    });
    const revealListenerCleanups = new Set<() => void>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.dataset.revealState = "visible";
          observer.unobserve(entry.target);

          const completionTarget =
            target.dataset.reveal === "block" ||
            target.dataset.reveal === "image"
              ? target
              : (target.lastElementChild as HTMLElement | null);
          if (!completionTarget) {
            target.dataset.revealState = "complete";
            return;
          }

          const removeRevealListeners = () => {
            completionTarget.removeEventListener(
              "transitionend",
              completeReveal,
            );
            completionTarget.removeEventListener(
              "transitioncancel",
              completeReveal,
            );
            revealListenerCleanups.delete(removeRevealListeners);
          };
          const completeReveal = () => {
            target.dataset.revealState = "complete";
            removeRevealListeners();
          };
          revealListenerCleanups.add(removeRevealListeners);
          completionTarget.addEventListener("transitionend", completeReveal);
          completionTarget.addEventListener("transitioncancel", completeReveal);
        });
      },
      {
        root: findScrollContainer(container),
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    const frame = window.requestAnimationFrame(() => {
      targets.forEach((target) => observer.observe(target));
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      revealListenerCleanups.forEach((cleanup) => cleanup());
      delete container.dataset.motionReady;
    };
  }, [containerRef, routeKey]);
}
