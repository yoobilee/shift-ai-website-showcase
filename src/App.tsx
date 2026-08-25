import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import "./Shell.css";
import { PortfolioToolbar } from "./components/PortfolioToolbar";
import { ProjectInfoDialog } from "./components/ProjectInfoDialog";
import { industries } from "./config/industries";
import { useTheme } from "./hooks/useTheme";
import { BasketSite } from "./sites/BasketSite";
import { MoruSite } from "./sites/MoruSite";
import { VectoronSite } from "./sites/VectoronSite";
import type { IndustryId, ViewportMode } from "./types";
import { readIndustryFromUrl, writeIndustryToUrl } from "./utils/urlState";

const siteMap = {
  industrial: VectoronSite,
  space: MoruSite,
  food: BasketSite,
};

function App() {
  const [industry, setIndustry] = useState<IndustryId>(readIndustryFromUrl);
  const [viewport, setViewport] = useState<ViewportMode>("fullscreen");
  const [projectInfoOpen, setProjectInfoOpen] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const { theme, selectTheme } = useTheme();
  const appContentRef = useRef<HTMLDivElement>(null);
  const projectInfoButtonRef = useRef<HTMLButtonElement>(null);
  const ActiveSite = siteMap[industry];
  const activeIndustry =
    industries.find((item) => item.id === industry) ?? industries[0];

  useLayoutEffect(() => {
    document.documentElement.dataset.industry = industry;
  }, [industry]);

  useEffect(() => {
    const initialIndustry = readIndustryFromUrl();
    const requestedIndustry = new URLSearchParams(window.location.search).get(
      "industry",
    );
    if (requestedIndustry !== initialIndustry) {
      writeIndustryToUrl(initialIndustry, "replace");
    }

    const restoreIndustry = () => {
      setTransitionEnabled(true);
      setIndustry(readIndustryFromUrl());
    };
    window.addEventListener("popstate", restoreIndustry);
    return () => window.removeEventListener("popstate", restoreIndustry);
  }, []);

  useEffect(() => {
    const appContent = appContentRef.current;
    if (!appContent) return;
    appContent.inert = projectInfoOpen;
    if (projectInfoOpen) {
      appContent.setAttribute("aria-hidden", "true");
    } else {
      appContent.removeAttribute("aria-hidden");
    }
  }, [projectInfoOpen]);

  const selectIndustry = (nextIndustry: IndustryId) => {
    if (nextIndustry === industry) return;
    setTransitionEnabled(true);
    setIndustry(nextIndustry);
    writeIndustryToUrl(nextIndustry);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const closeProjectInfo = () => {
    setProjectInfoOpen(false);
    requestAnimationFrame(() => projectInfoButtonRef.current?.focus());
  };

  return (
    <>
      <a className="skip-link" href="#showcase-content">
        홈페이지 본문으로 바로가기
      </a>

      <div ref={appContentRef} className="showcase-app">
        <PortfolioToolbar
          industry={industry}
          theme={theme}
          viewport={viewport}
          projectInfoButtonRef={projectInfoButtonRef}
          onIndustryChange={selectIndustry}
          onThemeChange={selectTheme}
          onViewportChange={setViewport}
          onOpenProjectInfo={() => setProjectInfoOpen(true)}
        />

        <main
          id="showcase-content"
          className="showcase-stage"
          data-viewport={viewport}
          aria-label={`${activeIndustry.desktopLabel} 홈페이지 미리보기`}
        >
          <div
            key={industry}
            id={activeIndustry.panelId}
            className="industry-panel"
            data-transition={transitionEnabled ? "enabled" : "disabled"}
            role="tabpanel"
            aria-labelledby={`industry-tab-${industry}`}
            tabIndex={0}
          >
            <ActiveSite />
          </div>
        </main>
      </div>

      <ProjectInfoDialog open={projectInfoOpen} onClose={closeProjectInfo} />
    </>
  );
}

export default App;
