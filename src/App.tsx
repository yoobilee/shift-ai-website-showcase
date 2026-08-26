import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./App.css";
import "./Shell.css";
import "./DetailPages.css";
import {
  PortfolioToolbar,
  PortfolioToolbarToggle,
} from "./components/PortfolioToolbar";
import { ProjectInfoDialog } from "./components/ProjectInfoDialog";
import { industries } from "./config/industries";
import { BasketSeasonDetail } from "./details/BasketSeasonDetail";
import { MoruProjectDetail } from "./details/MoruProjectDetail";
import { VectoronProductDetail } from "./details/VectoronProductDetail";
import { useStickyHeaderHeight } from "./hooks/useStickyHeaderHeight";
import { useTheme } from "./hooks/useTheme";
import { BasketSite } from "./sites/BasketSite";
import { MoruSite } from "./sites/MoruSite";
import { VectoronSite } from "./sites/VectoronSite";
import type { IndustryId, ViewportMode } from "./types";
import {
  buildMainHref,
  readPortfolioRoute,
  type PortfolioRoute,
} from "./utils/routeState";
import { getValidIndustryHash } from "./utils/urlState";

const siteMap = {
  industrial: VectoronSite,
  space: MoruSite,
  food: BasketSite,
};

function App() {
  const [route, setRoute] = useState<PortfolioRoute>(() =>
    readPortfolioRoute(),
  );
  const initialRouteRef = useRef<PortfolioRoute>(route);
  const [industry, setIndustry] = useState<IndustryId>(route.industry);
  const [viewport, setViewport] = useState<ViewportMode>("fullscreen");
  const [projectInfoOpen, setProjectInfoOpen] = useState(false);
  const [toolbarExpanded, setToolbarExpanded] = useState(true);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  const { theme, selectTheme } = useTheme();
  const appContentRef = useRef<HTMLDivElement>(null);
  const projectInfoButtonRef = useRef<HTMLButtonElement>(null);
  const industryPanelRef = useRef<HTMLDivElement>(null);
  const pendingHistoryHashRef = useRef<string | null>(null);
  const restoreInitialHashRef = useRef(true);
  const pendingRouteFocusRef = useRef(false);
  const pendingToolbarLayoutRef = useRef<{
    layoutHeight: number;
    scrollY: number;
  } | null>(null);
  const ActiveSite = siteMap[industry];
  const activeIndustry =
    industries.find((item) => item.id === industry) ?? industries[0];

  useLayoutEffect(() => {
    document.documentElement.dataset.toolbarState = toolbarExpanded
      ? "expanded"
      : "collapsed";

    const pendingLayout = pendingToolbarLayoutRef.current;
    if (pendingLayout) {
      const toolbarHeight =
        document.getElementById("portfolio-toolbar")?.getBoundingClientRect()
          .height ?? 0;
      const industryHeaderHeight =
        industryPanelRef.current
          ?.querySelector<HTMLElement>(".brand-site > header")
          ?.getBoundingClientRect().height ?? 0;
      const nextScrollY = Math.max(
        0,
        pendingLayout.scrollY +
          toolbarHeight +
          industryHeaderHeight -
          pendingLayout.layoutHeight,
      );

      if (pendingLayout.scrollY > 0) {
        window.scrollTo({ top: nextScrollY, behavior: "auto" });
      }
      pendingToolbarLayoutRef.current = null;
    }
  }, [toolbarExpanded]);

  useStickyHeaderHeight(
    industryPanelRef,
    `${industry}:${route.key}`,
    toolbarExpanded,
  );

  useLayoutEffect(() => {
    document.documentElement.dataset.industry = industry;
    const pendingHash =
      route.kind === "main"
        ? (pendingHistoryHashRef.current ??
          (restoreInitialHashRef.current
            ? getValidIndustryHash(industry)
            : null))
        : null;
    if (pendingHash) {
      document
        .getElementById(pendingHash)
        ?.scrollIntoView({ behavior: "auto", block: "start" });
    }
    if (pendingRouteFocusRef.current) {
      industryPanelRef.current?.focus({ preventScroll: true });
      pendingRouteFocusRef.current = false;
    }
    pendingHistoryHashRef.current = null;
    restoreInitialHashRef.current = false;
  }, [industry, route]);

  useEffect(() => {
    const initialRoute = initialRouteRef.current;
    if (initialRoute.kind === "main") {
      const initialHash = getValidIndustryHash(initialRoute.industry);
      const initialHref = buildMainHref(
        initialRoute.industry,
        initialHash ?? undefined,
      );
      window.history.replaceState(
        { ...window.history.state, industry: initialRoute.industry },
        "",
        initialHref,
      );
    }

    const restoreRoute = () => {
      const restoredRoute = readPortfolioRoute();
      pendingHistoryHashRef.current =
        restoredRoute.kind === "main"
          ? getValidIndustryHash(restoredRoute.industry)
          : null;
      setTransitionEnabled(true);
      setIndustry(restoredRoute.industry);
      setRoute(restoredRoute);
    };
    window.addEventListener("popstate", restoreRoute);
    return () => window.removeEventListener("popstate", restoreRoute);
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

  useEffect(() => {
    const pageName =
      route.kind === "main"
        ? activeIndustry.desktopLabel
        : route.detailPage === "vnx-400"
          ? "VNX-400 제품"
          : route.detailPage === "serene-house"
            ? "Serene House 프로젝트"
            : "Tomato Picnic 시즌 메뉴";
    document.title = `${pageName} — SHIFT`;
  }, [activeIndustry.desktopLabel, route]);

  const navigateTo = (
    href: string,
    options: { focusContent?: boolean } = {},
  ) => {
    const url = new URL(href, window.location.href);
    const nextRoute = readPortfolioRoute(url);
    const nextHash =
      nextRoute.kind === "main"
        ? getValidIndustryHash(nextRoute.industry, url.hash)
        : null;

    url.hash = nextHash ? `#${nextHash}` : "";
    window.history.pushState(
      {
        ...window.history.state,
        industry: nextRoute.industry,
        route: nextRoute.key,
      },
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );

    pendingHistoryHashRef.current = nextHash;
    pendingRouteFocusRef.current = options.focusContent ?? true;
    setTransitionEnabled(true);
    setIndustry(nextRoute.industry);
    setRoute(nextRoute);
    if (!nextHash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  const selectIndustry = (nextIndustry: IndustryId) => {
    if (nextIndustry === industry && route.kind === "main") return;
    navigateTo(buildMainHref(nextIndustry), { focusContent: false });
  };

  const closeProjectInfo = () => {
    setProjectInfoOpen(false);
    requestAnimationFrame(() => projectInfoButtonRef.current?.focus());
  };

  const changeToolbarExpanded = (expanded: boolean) => {
    const toolbarHeight =
      document.getElementById("portfolio-toolbar")?.getBoundingClientRect()
        .height ?? 0;
    const industryHeaderHeight =
      industryPanelRef.current
        ?.querySelector<HTMLElement>(".brand-site > header")
        ?.getBoundingClientRect().height ?? 0;

    pendingToolbarLayoutRef.current = {
      layoutHeight: toolbarHeight + industryHeaderHeight,
      scrollY: window.scrollY,
    };
    setToolbarExpanded(expanded);
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
          expanded={toolbarExpanded}
          projectInfoButtonRef={projectInfoButtonRef}
          onIndustryChange={selectIndustry}
          onThemeChange={selectTheme}
          onViewportChange={setViewport}
          onOpenProjectInfo={() => setProjectInfoOpen(true)}
        />
        <PortfolioToolbarToggle
          expanded={toolbarExpanded}
          onExpandedChange={changeToolbarExpanded}
        />

        <main
          id="showcase-content"
          className="showcase-stage"
          data-viewport={viewport}
          aria-label={`${activeIndustry.desktopLabel} ${
            route.kind === "detail" ? "세부 페이지" : "홈페이지"
          } 미리보기`}
        >
          <div
            ref={industryPanelRef}
            key={`${industry}:${route.key}`}
            id={activeIndustry.panelId}
            className="industry-panel"
            data-transition={transitionEnabled ? "enabled" : "disabled"}
            role="tabpanel"
            aria-labelledby={`industry-tab-${industry}`}
            tabIndex={0}
          >
            {route.kind === "detail" ? (
              route.detailPage === "vnx-400" ? (
                <VectoronProductDetail onNavigate={navigateTo} />
              ) : route.detailPage === "serene-house" ? (
                <MoruProjectDetail onNavigate={navigateTo} />
              ) : (
                <BasketSeasonDetail onNavigate={navigateTo} />
              )
            ) : (
              <ActiveSite onNavigate={navigateTo} />
            )}
          </div>
        </main>
      </div>

      <ProjectInfoDialog open={projectInfoOpen} onClose={closeProjectInfo} />
    </>
  );
}

export default App;
