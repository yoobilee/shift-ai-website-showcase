import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { getIndustryIndex, industries } from "../config/industries";
import type { IndustryId } from "../types";

interface IndustrySegmentedControlProps {
  activeIndustry: IndustryId;
  onChange: (industry: IndustryId) => void;
}

export function IndustrySegmentedControl({
  activeIndustry,
  onChange,
}: IndustrySegmentedControlProps) {
  const activeIndex = getIndustryIndex(activeIndustry);
  const [focusedIndex, setFocusedIndex] = useState(activeIndex);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const moveFocus = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + industries.length) % industries.length;
    setFocusedIndex(normalizedIndex);
    tabRefs.current[normalizedIndex]?.focus();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveFocus(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveFocus(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveFocus(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveFocus(industries.length - 1);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onChange(industries[index].id);
    }
  };

  return (
    <div
      className="industry-segmented-control"
      role="tablist"
      aria-label="업종 홈페이지 선택"
      style={{ "--active-index": activeIndex } as CSSProperties}
    >
      {industries.map((industry, index) => (
        <button
          key={industry.id}
          ref={(node) => {
            tabRefs.current[index] = node;
          }}
          id={`industry-tab-${industry.id}`}
          type="button"
          role="tab"
          aria-selected={activeIndustry === industry.id}
          aria-controls={industry.panelId}
          tabIndex={focusedIndex === index ? 0 : -1}
          onFocus={() => setFocusedIndex(index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onClick={() => {
            setFocusedIndex(index);
            onChange(industry.id);
          }}
        >
          <span className="industry-label industry-label--desktop">
            {industry.desktopLabel}
          </span>
          <span className="industry-label industry-label--mobile">
            {industry.mobileLabel}
          </span>
        </button>
      ))}
    </div>
  );
}
