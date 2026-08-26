import type { ViewportMode } from "../types";

interface ScrollToTopButtonProps {
  visible: boolean;
  viewport: ViewportMode;
  onActivate: () => void;
}

export function ScrollToTopButton({
  visible,
  viewport,
  onActivate,
}: ScrollToTopButtonProps) {
  return (
    <button
      className="scroll-to-top-button"
      data-visible={visible ? "true" : "false"}
      data-viewport={viewport}
      type="button"
      tabIndex={visible ? 0 : -1}
      aria-hidden={visible ? undefined : "true"}
      aria-label="페이지 최상단으로 이동"
      onClick={onActivate}
    >
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 19V5M6.5 10.5 12 5l5.5 5.5" />
      </svg>
    </button>
  );
}
