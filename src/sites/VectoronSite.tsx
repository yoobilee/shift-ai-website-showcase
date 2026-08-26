import { PortfolioRouteLink } from "../components/PortfolioRouteLink";
import { buildDetailHref } from "../utils/routeState";

interface VectoronSiteProps {
  onNavigate: (href: string) => void;
}

export function VectoronSite({ onNavigate }: VectoronSiteProps) {
  return (
    <article
      className="brand-site vectoron-site"
      aria-label="벡터론 시스템즈 산업기술 홈페이지 콘셉트"
    >
      <header className="vectoron-header">
        <a href="#vectoron-home" className="vectoron-logo">
          <VectoronMark />
          <span>
            VECTORON<small>SYSTEMS</small>
          </span>
        </a>
        <nav aria-label="벡터론 주요 메뉴">
          <a href="#vectoron-product">Product</a>
          <a href="#vectoron-application">Application</a>
          <a href="#vectoron-spec">Resources</a>
        </nav>
        <a className="vectoron-contact" href="#vectoron-contact">
          기술 상담 <span>↗</span>
        </a>
      </header>
      <section className="vectoron-hero" id="vectoron-home">
        <div className="vectoron-copy">
          <div className="vectoron-status">
            <i /> Vision inspection platform · VNX-400
          </div>
          <h1>
            보이지 않던 결함까지,
            <br />
            <em>생산 속도 그대로.</em>
          </h1>
          <p>
            AI 비전 검사와 엣지 컴퓨팅을 결합해 생산 라인의 미세 결함을
            실시간으로 판별합니다.
          </p>
          <div className="vectoron-actions">
            <a href="#vectoron-contact">
              도입 견적 요청 <span>→</span>
            </a>
            <PortfolioRouteLink
              href={buildDetailHref("vnx-400")}
              onNavigate={onNavigate}
            >
              제품 상세 보기 <span>↗</span>
            </PortfolioRouteLink>
          </div>
          <dl className="vectoron-metrics" data-reveal="stagger">
            <div>
              <dt>검사 정확도</dt>
              <dd>
                99.97<small>%</small>
              </dd>
            </div>
            <div>
              <dt>최대 처리 속도</dt>
              <dd>
                240<small>fps</small>
              </dd>
            </div>
            <div>
              <dt>현장 구축 기간</dt>
              <dd>
                14<small>days</small>
              </dd>
            </div>
          </dl>
        </div>
        <figure className="vectoron-visual">
          <div
            className="vectoron-visual-canvas"
            role="img"
            aria-label="생산 라인의 부품을 스캔하는 AI 비전 검사 장비 시각화"
          >
            <div className="technical-grid" />
            <div className="scan-head">
              <span>VNX</span>
              <i />
            </div>
            <div className="scan-beam" />
            <div className="scan-object">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <figcaption className="vectoron-telemetry">
            <div className="readout">
              <span>Defect map</span>
              <strong>PASS</strong>
            </div>
            <div className="readout">
              <span>Latency</span>
              <strong>8.4 ms</strong>
            </div>
            <span className="axis">X 240.08</span>
            <span className="axis">Y 118.42</span>
          </figcaption>
        </figure>
      </section>
      <section
        className="vectoron-band section-anchor-target"
        id="vectoron-product"
        aria-label="벡터론 기술 특징"
      >
        <span>01 · Deep vision model</span>
        <span>02 · Edge processing</span>
        <span>03 · Line integration</span>
        <span>ISO 9001 / CE</span>
      </section>
      <section className="vectoron-product">
        <div className="vectoron-section-title" data-reveal="block">
          <span>Platform / 01</span>
          <h3>
            한 화면에서 확인하는
            <br />
            검사 라인의 모든 신호
          </h3>
          <PortfolioRouteLink
            className="vectoron-detail-entry"
            href={buildDetailHref("vnx-400")}
            onNavigate={onNavigate}
          >
            VNX-400 제품 상세 <span>↗</span>
          </PortfolioRouteLink>
        </div>
        <div className="vectoron-dashboard" data-reveal="block">
          <div className="dashboard-top">
            <span>LINE 03 · LIVE</span>
            <span>2026.08.24 14:32:08</span>
          </div>
          <div className="dashboard-content">
            <div className="dashboard-chart">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <b />
            </div>
            <dl>
              <div>
                <dt>Input</dt>
                <dd>12,804</dd>
              </div>
              <div>
                <dt>Pass</dt>
                <dd>12,791</dd>
              </div>
              <div>
                <dt>Defect</dt>
                <dd>13</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <section
        className="vectoron-applications section-anchor-target"
        id="vectoron-application"
        aria-labelledby="vectoron-applications-title"
      >
        <div className="vectoron-application-intro" data-reveal="block">
          <span>Application / 02</span>
          <h3 id="vectoron-applications-title">
            생산 환경에 맞춰
            <br />
            즉시 적용합니다.
          </h3>
          <p>
            기존 라인의 속도와 조명, 결함 기준을 분석해 필요한 검사 모듈만
            구성합니다.
          </p>
        </div>
        <div className="vectoron-application-grid" data-reveal="stagger">
          <article>
            <span>01</span>
            <h4>정밀 전자 부품</h4>
            <p>미세 스크래치와 조립 오차를 고속 촬영으로 판별합니다.</p>
          </article>
          <article>
            <span>02</span>
            <h4>자동차 부품</h4>
            <p>형상, 치수와 체결 상태를 공정 흐름 안에서 함께 확인합니다.</p>
          </article>
          <article>
            <span>03</span>
            <h4>패키징 라인</h4>
            <p>인쇄, 라벨과 밀봉 상태를 생산 속도 저하 없이 추적합니다.</p>
          </article>
        </div>
      </section>
      <section
        className="vectoron-spec section-anchor-target"
        data-reveal="stagger"
        id="vectoron-spec"
      >
        <div>
          <span>Model</span>
          <strong>VNX-400 Edge</strong>
        </div>
        <div>
          <span>Resolution</span>
          <strong>12 MP × 4 CH</strong>
        </div>
        <div>
          <span>Inference</span>
          <strong>8.4 ms average</strong>
        </div>
        <a href="#vectoron-contact">전체 사양서 다운로드 ↓</a>
      </section>
      <section
        className="vectoron-cta section-anchor-target"
        data-reveal="block"
        id="vectoron-contact"
      >
        <span>Build a reliable line.</span>
        <h3>
          귀사의 생산 환경에 맞는
          <br />
          검사 시스템을 설계합니다.
        </h3>
        <a href="mailto:hello@vectoron.example">프로젝트 조건 전달하기 ↗</a>
      </section>
    </article>
  );
}

function VectoronMark() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <path d="M4 4h12v12H4zM20 4h12v12H20zM4 20h12v12H4z" />
      <path d="M20 20h12v12H20z" opacity=".28" />
    </svg>
  );
}
