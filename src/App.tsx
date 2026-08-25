import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { BasketSite } from "./sites/BasketSite";
import { MoruSite } from "./sites/MoruSite";
import { VectoronSite } from "./sites/VectoronSite";
import type { DeviceMode, IndustryId } from "./types";

const industries: Array<{
  id: IndustryId;
  number: string;
  label: string;
  shortLabel: string;
  intent: string;
}> = [
  {
    id: "industry",
    number: "01",
    label: "산업기술 · B2B",
    shortLabel: "Industrial",
    intent: "정보 검증 → 견적 문의",
  },
  {
    id: "space",
    number: "02",
    label: "인테리어 · 공간",
    shortLabel: "Spatial",
    intent: "감도 탐색 → 상담 예약",
  },
  {
    id: "food",
    number: "03",
    label: "로컬 F&B",
    shortLabel: "Local F&B",
    intent: "메뉴 발견 → 매장 방문",
  },
];

const siteMap = { industry: VectoronSite, space: MoruSite, food: BasketSite };

function getInitialIndustry(): IndustryId {
  const value = new URLSearchParams(window.location.search).get("industry");
  return value === "space" || value === "food" ? value : "industry";
}

function App() {
  const [activeIndustry, setActiveIndustry] =
    useState<IndustryId>(getInitialIndustry);
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [dockOpen, setDockOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const ActiveSite = siteMap[activeIndustry];
  const activeMeta = useMemo(
    () =>
      industries.find((industry) => industry.id === activeIndustry) ??
      industries[0],
    [activeIndustry],
  );

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("industry", activeIndustry);
    window.history.replaceState({}, "", url);
  }, [activeIndustry]);

  const selectIndustry = (industry: IndustryId) => {
    setActiveIndustry(industry);
    setDockOpen(false);
  };

  const scrollTo = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setDockOpen(false);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        본문으로 바로가기
      </a>
      <header className="portfolio-header">
        <a
          className="portfolio-brand"
          href="#top"
          aria-label="SHIFT 쇼케이스 처음으로"
        >
          <span className="brand-mark" aria-hidden="true">
            S
          </span>
          <span>
            <strong>SHIFT</strong>
            <small>AI Website Showcase</small>
          </span>
        </a>
        <p className="header-note">Web design · Publishing · AI direction</p>
        <a className="header-link" href="#process">
          설계 과정 보기 <span aria-hidden="true">↘</span>
        </a>
      </header>

      <main id="main-content">
        <section className="intro" id="top" aria-labelledby="intro-title">
          <div className="intro-kicker">
            <span>Portfolio project</span>
            <span>2026</span>
          </div>
          <h1 id="intro-title">
            하나의 제작 시스템으로,
            <br />
            <em>서로 다른 세 업종</em>의 목적과
            <br />
            사용 흐름을 설계했습니다.
          </h1>
          <div className="intro-summary">
            <p>
              같은 화면 안에서 업종을 바꿔 보세요. 색만 교체한 템플릿이 아니라
              정보의 우선순위, 레이아웃, 이미지 비율, 타이포그래피와 행동
              유도까지 함께 전환됩니다.
            </p>
            <span className="scroll-cue" aria-hidden="true">
              Scroll to explore <i />
            </span>
          </div>
        </section>

        <section className="showcase" aria-labelledby="showcase-title">
          <div className="section-heading">
            <div>
              <span className="section-index">01</span>
              <h2 id="showcase-title">Industry switcher</h2>
            </div>
            <p>업종별 목적에 맞춘 세 가지 설계 방향</p>
          </div>

          <div className="showcase-controls" aria-label="쇼케이스 보기 설정">
            <div className="industry-tabs" role="group" aria-label="업종 선택">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  className="industry-tab"
                  type="button"
                  aria-pressed={activeIndustry === industry.id}
                  onClick={() => selectIndustry(industry.id)}
                >
                  <span className="tab-number">{industry.number}</span>
                  <span className="tab-copy">
                    <strong>{industry.label}</strong>
                    <small>{industry.intent}</small>
                  </span>
                  <span className="tab-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>
              ))}
            </div>
            <div
              className="device-toggle"
              role="group"
              aria-label="미리보기 화면 크기"
            >
              <button
                type="button"
                aria-pressed={device === "desktop"}
                onClick={() => setDevice("desktop")}
              >
                <DesktopIcon />
                <span>PC</span>
              </button>
              <button
                type="button"
                aria-pressed={device === "mobile"}
                onClick={() => setDevice("mobile")}
              >
                <MobileIcon />
                <span>Mobile</span>
              </button>
            </div>
          </div>

          <div className="preview-meta" aria-live="polite">
            <span>
              {activeMeta.number} / {activeMeta.shortLabel}
            </span>
            <span>
              {device === "desktop" ? "1440 px preview" : "390 px preview"}
            </span>
          </div>
          <div className="preview-stage" data-device={device}>
            <div className="browser-frame">
              <div className="browser-bar" aria-hidden="true">
                <div className="browser-dots">
                  <i />
                  <i />
                  <i />
                </div>
                <span>
                  {activeMeta.shortLabel.toLowerCase().replace(" ", "")}
                  .showcase.kr
                </span>
                <i className="browser-more">•••</i>
              </div>
              <div className="site-viewport" key={activeIndustry}>
                <ActiveSite />
              </div>
            </div>
          </div>
        </section>

        <section
          className="difference"
          id="difference"
          aria-labelledby="difference-title"
        >
          <div className="section-heading section-heading--light">
            <div>
              <span className="section-index">02</span>
              <h2 id="difference-title">Same system, different behavior</h2>
            </div>
            <p>공통 기능은 조용하게, 업종의 개성은 선명하게</p>
          </div>
          <div className="difference-grid">
            <article>
              <span>Industrial</span>
              <h3>검증 가능한 정보 구조</h3>
              <p>
                제품 사양과 적용 분야를 먼저 확인하고, 맥락이 충분해진 순간
                견적으로 연결합니다.
              </p>
              <ul>
                <li>밀도 높은 12-column grid</li>
                <li>수치·상태 중심 UI</li>
                <li>짧고 정밀한 motion</li>
              </ul>
            </article>
            <article>
              <span>Spatial</span>
              <h3>이미지가 이끄는 편집 흐름</h3>
              <p>
                프로젝트의 인상을 크게 보여준 뒤 철학과 과정을 천천히 읽도록
                호흡을 넓혔습니다.
              </p>
              <ul>
                <li>비대칭 editorial grid</li>
                <li>세리프 display type</li>
                <li>느린 reveal rhythm</li>
              </ul>
            </article>
            <article>
              <span>Local F&amp;B</span>
              <h3>방문을 만드는 캠페인 동선</h3>
              <p>
                시즌 메뉴의 매력을 빠르게 전달하고 영업 중인 가까운 매장으로
                즉시 연결합니다.
              </p>
              <ul>
                <li>프로모션-first layout</li>
                <li>따뜻한 고채도 palette</li>
                <li>즉각적인 CTA feedback</li>
              </ul>
            </article>
          </div>
        </section>

        <section
          className="process"
          id="process"
          aria-labelledby="process-title"
        >
          <div className="section-heading">
            <div>
              <span className="section-index">03</span>
              <h2 id="process-title">AI-assisted workflow</h2>
            </div>
            <p>생성보다 검토가 더 잘 보이는 작업 과정</p>
          </div>
          <div className="process-layout">
            <div className="process-lead">
              <p className="eyebrow">Human-directed, AI-assisted</p>
              <h3>
                AI의 빠른 초안을
                <br />
                사람의 기준으로 좁혔습니다.
              </h3>
              <p>
                업종 리서치와 사용자 목적을 먼저 정의한 뒤, 이미지와 카피의
                초안을 생성했습니다. 결과물은 브랜드 적합성·사실성·가독성·저작권
                리스크 기준으로 다시 검토합니다.
              </p>
            </div>
            <ol className="process-steps">
              <li>
                <span>01 / Frame</span>
                <div>
                  <h4>목적과 금지 기준 정의</h4>
                  <p>
                    업종별 핵심 행동, 필요한 정보, 피해야 할 전형성을
                    프롬프트보다 먼저 문서화합니다.
                  </p>
                </div>
              </li>
              <li>
                <span>02 / Generate</span>
                <div>
                  <h4>콘텐츠·비주얼 방향 생성</h4>
                  <p>
                    한 번에 완성본을 요구하지 않고 구도, 재질, 톤, 카피를 분리해
                    비교 가능한 후보를 만듭니다.
                  </p>
                </div>
              </li>
              <li>
                <span>03 / Verify</span>
                <div>
                  <h4>사실성·표현·접근성 검토</h4>
                  <p>
                    제품 수치와 표현은 가상 정보임을 명시하고, 이미지
                    왜곡·대비·대체 텍스트를 확인합니다.
                  </p>
                </div>
              </li>
              <li>
                <span>04 / Refine</span>
                <div>
                  <h4>컴포넌트에 맞춰 재편집</h4>
                  <p>
                    생성 결과를 그대로 배치하지 않고 실제 반응형 비율과 읽기
                    순서에 맞게 크롭·요약·재작성합니다.
                  </p>
                </div>
              </li>
            </ol>
          </div>
          <div className="system-note">
            <span>Reusable core</span>
            <p>산업 데이터 + 레이아웃 레시피 + 테마 토큰 + 접근성 규칙</p>
            <span>→</span>
            <strong>3 distinct experiences</strong>
          </div>
        </section>
      </main>

      <footer className="portfolio-footer">
        <p>Designed &amp; published as an application portfolio study.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
      <UtilityDock
        open={dockOpen}
        onToggle={() => setDockOpen((value) => !value)}
        onNotice={() => {
          setNoticeOpen(true);
          setDockOpen(false);
        }}
        onProcess={() => scrollTo("process")}
        onShowcase={() => scrollTo("showcase-title")}
      />
      <NoticeDialog open={noticeOpen} onClose={() => setNoticeOpen(false)} />
    </>
  );
}

function UtilityDock({
  open,
  onToggle,
  onNotice,
  onProcess,
  onShowcase,
}: {
  open: boolean;
  onToggle: () => void;
  onNotice: () => void;
  onProcess: () => void;
  onShowcase: () => void;
}) {
  return (
    <div className="utility-dock">
      <div className="utility-actions" id="utility-actions" hidden={!open}>
        <button type="button" onClick={onNotice}>
          <span aria-hidden="true">!</span> 프로젝트 안내
        </button>
        <button type="button" onClick={onProcess}>
          <span aria-hidden="true">AI</span> 작업 과정
        </button>
        <button type="button" onClick={onShowcase}>
          <span aria-hidden="true">↗</span> 쇼케이스
        </button>
      </div>
      <button
        className="utility-trigger"
        type="button"
        aria-expanded={open}
        aria-controls="utility-actions"
        aria-label={open ? "빠른 메뉴 닫기" : "빠른 메뉴 열기"}
        onClick={onToggle}
      >
        <span aria-hidden="true">{open ? "×" : "+"}</span>
      </button>
    </div>
  );
}

function NoticeDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const notices = [
    {
      tag: "Project note",
      title: "본 프로젝트의 브랜드와 수치는 모두 가상입니다.",
      body: "실제 기업의 제품을 홍보하지 않으며, 업종별 정보 설계와 퍼블리싱 역량을 보여주기 위해 제작한 포트폴리오 콘셉트입니다.",
    },
    {
      tag: "AI disclosure",
      title: "생성형 AI는 초안과 탐색 도구로 활용했습니다.",
      body: "콘텐츠는 목적에 맞게 다시 쓰고, 사실처럼 보일 수 있는 정보는 가상 데이터임을 분명히 했습니다. 최종 선택과 편집은 사람이 수행합니다.",
    },
  ];

  useEffect(() => {
    const dialog = document.getElementById(
      "project-notice",
    ) as HTMLDialogElement | null;
    if (open && dialog && !dialog.open) dialog.showModal();
    if (!open && dialog?.open) dialog.close();
  }, [open]);

  const notice = notices[index];
  return (
    <dialog id="project-notice" className="notice-dialog" onClose={onClose}>
      <div className="notice-card">
        <div className="notice-topline">
          <span>{notice.tag}</span>
          <button type="button" aria-label="안내 창 닫기" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="notice-body">
          <span className="notice-count">
            0{index + 1} / 0{notices.length}
          </span>
          <h2>{notice.title}</h2>
          <p>{notice.body}</p>
        </div>
        <div className="notice-footer">
          <button
            type="button"
            onClick={() =>
              setIndex((value) => (value - 1 + notices.length) % notices.length)
            }
          >
            ← 이전
          </button>
          <div aria-label={`안내 ${index + 1} / ${notices.length}`}>
            {notices.map((item, itemIndex) => (
              <i key={item.title} data-active={itemIndex === index} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIndex((value) => (value + 1) % notices.length)}
          >
            다음 →
          </button>
        </div>
      </div>
    </dialog>
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

export default App;
