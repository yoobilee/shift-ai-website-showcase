export type ActiveScrollContainer = HTMLElement | Window;

const scrollableOverflowPattern = /auto|scroll|overlay/;

export function findScrollContainer(element: HTMLElement): HTMLElement | null {
  let current: HTMLElement | null = element;

  while (current && current !== document.body) {
    const { overflowY } = window.getComputedStyle(current);
    const hasScrollableContent =
      current.scrollHeight > current.clientHeight + 1;

    if (scrollableOverflowPattern.test(overflowY) && hasScrollableContent) {
      return current;
    }

    current = current.parentElement;
  }

  return null;
}

export function getScrollPosition(container: ActiveScrollContainer) {
  return container === window
    ? window.scrollY
    : (container as HTMLElement).scrollTop;
}

export function getScrollViewportHeight(container: ActiveScrollContainer) {
  return container === window
    ? window.innerHeight
    : (container as HTMLElement).clientHeight;
}

export function scrollContainerToTop(
  container: ActiveScrollContainer,
  behavior: ScrollBehavior,
) {
  if (container === window) {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  (container as HTMLElement).scrollTo({ top: 0, behavior });
}
