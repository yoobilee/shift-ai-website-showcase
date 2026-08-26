import type { RefObject } from "react";
import type { IndustryId, ThemeMode, ViewportMode } from "../types";
import { IndustrySegmentedControl } from "./IndustrySegmentedControl";

interface PortfolioToolbarProps {
  industry: IndustryId;
  theme: ThemeMode;
  viewport: ViewportMode;
  expanded: boolean;
  projectInfoButtonRef: RefObject<HTMLButtonElement | null>;
  onIndustryChange: (industry: IndustryId) => void;
  onThemeChange: (theme: ThemeMode) => void;
  onViewportChange: (viewport: ViewportMode) => void;
  onOpenProjectInfo: () => void;
}

export function PortfolioToolbar({
  industry,
  theme,
  viewport,
  expanded,
  projectInfoButtonRef,
  onIndustryChange,
  onThemeChange,
  onViewportChange,
  onOpenProjectInfo,
}: PortfolioToolbarProps) {
  return (
    <header
      id="portfolio-toolbar"
      className="portfolio-toolbar"
      data-expanded={expanded}
      aria-label="SHIFT 쇼케이스 도구 모음"
    >
      <a
        className="shift-wordmark"
        href="#showcase-content"
        aria-label="SHIFT 쇼케이스 본문으로 이동"
      >
        SHIFT
      </a>

      <div
        id="portfolio-toolbar-controls"
        className="portfolio-toolbar-controls"
        aria-hidden={!expanded}
        inert={!expanded}
      >
        <div className="toolbar-industry-control">
          <IndustrySegmentedControl
            activeIndustry={industry}
            onChange={onIndustryChange}
          />
        </div>

        <div className="toolbar-actions">
          <div className="theme-control" role="group" aria-label="색상 테마">
            <button
              type="button"
              aria-pressed={theme === "light"}
              aria-label="라이트 모드"
              title="라이트 모드"
              onClick={() => onThemeChange("light")}
            >
              <SunIcon />
            </button>
            <button
              type="button"
              aria-pressed={theme === "dark"}
              aria-label="다크 모드"
              title="다크 모드"
              onClick={() => onThemeChange("dark")}
            >
              <MoonIcon />
            </button>
          </div>

          <div
            className="viewport-control"
            role="group"
            aria-label="미리보기 너비"
          >
            <button
              type="button"
              aria-pressed={viewport === "fullscreen"}
              aria-label="전체 화면 보기"
              title="전체 화면 보기"
              onClick={() => onViewportChange("fullscreen")}
            >
              <DesktopIcon />
            </button>
            <button
              type="button"
              aria-pressed={viewport === "mobile"}
              aria-label="390픽셀 모바일 미리보기"
              title="모바일 미리보기"
              onClick={() => onViewportChange("mobile")}
            >
              <MobileIcon />
            </button>
          </div>

          <button
            ref={projectInfoButtonRef}
            className="project-info-trigger"
            type="button"
            aria-haspopup="dialog"
            onClick={onOpenProjectInfo}
          >
            <InfoIcon />
            <span>프로젝트 설명</span>
          </button>
        </div>
      </div>
    </header>
  );
}

interface PortfolioToolbarToggleProps {
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

export function PortfolioToolbarToggle({
  expanded,
  onExpandedChange,
}: PortfolioToolbarToggleProps) {
  return (
    <button
      className="portfolio-toolbar-toggle"
      data-expanded={expanded}
      type="button"
      aria-expanded={expanded}
      aria-controls="portfolio-toolbar"
      aria-label={
        expanded ? "포트폴리오 도구 모음 접기" : "포트폴리오 도구 모음 펼치기"
      }
      title={expanded ? "도구 모음 접기" : "도구 모음 펼치기"}
      onClick={() => onExpandedChange(!expanded)}
    >
      <ToolbarVisibilityIcon />
    </button>
  );
}

function ToolbarVisibilityIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m7 14 5-5 5 5" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15.2A8 8 0 0 1 8.8 4 8.4 8.4 0 1 0 20 15.2Z" />
    </svg>
  );
}

function DesktopIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.5h.01" />
    </svg>
  );
}
