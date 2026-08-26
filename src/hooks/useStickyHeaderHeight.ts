import { useLayoutEffect, type RefObject } from "react";

export function useStickyHeaderHeight(
  panelRef: RefObject<HTMLDivElement | null>,
  contentKey: string,
  toolbarExpanded: boolean,
) {
  useLayoutEffect(() => {
    const panel = panelRef.current;
    const industryHeader = panel?.querySelector<HTMLElement>(
      ".brand-site > header",
    );
    if (!industryHeader) return;

    const root = document.documentElement;
    const syncHeaderHeight = () => {
      root.style.setProperty(
        "--industry-header-current-height",
        `${industryHeader.getBoundingClientRect().height}px`,
      );
    };

    syncHeaderHeight();
    const resizeObserver = new ResizeObserver(syncHeaderHeight);
    resizeObserver.observe(industryHeader);

    return () => {
      resizeObserver.disconnect();
      root.style.removeProperty("--industry-header-current-height");
    };
  }, [contentKey, panelRef, toolbarExpanded]);
}
