import { PortfolioRouteLink } from "../components/PortfolioRouteLink";
import { buildMainHref } from "../utils/routeState";

interface VectoronProductDetailProps {
  onNavigate: (href: string) => void;
}

export function VectoronProductDetail({
  onNavigate,
}: VectoronProductDetailProps) {
  return (
    <article
      className="brand-site vectoron-site vectoron-detail"
      aria-label="VNX-400 제품 상세"
    >
      <header className="vectoron-header">
        <PortfolioRouteLink
          className="vectoron-logo"
          href={buildMainHref("industrial", "vectoron-home")}
          onNavigate={onNavigate}
        >
          <VectoronMark />
          <span>
            VECTORON<small>SYSTEMS</small>
          </span>
        </PortfolioRouteLink>
        <nav aria-label="벡터론 메인 섹션">
          <PortfolioRouteLink
            href={buildMainHref("industrial", "vectoron-product")}
            onNavigate={onNavigate}
          >
            Product
          </PortfolioRouteLink>
          <PortfolioRouteLink
            href={buildMainHref("industrial", "vectoron-application")}
            onNavigate={onNavigate}
          >
            Application
          </PortfolioRouteLink>
          <PortfolioRouteLink
            href={buildMainHref("industrial", "vectoron-spec")}
            onNavigate={onNavigate}
          >
            Resources
          </PortfolioRouteLink>
        </nav>
        <PortfolioRouteLink
          className="vectoron-contact"
          href={buildMainHref("industrial", "vectoron-contact")}
          onNavigate={onNavigate}
        >
          기술 상담 <span>↗</span>
        </PortfolioRouteLink>
      </header>

      <div className="vectoron-detail-main">
        <section className="vectoron-detail-hero">
          <div className="detail-breadcrumb" aria-label="현재 위치">
            <PortfolioRouteLink
              href={buildMainHref("industrial")}
              onNavigate={onNavigate}
            >
              산업기술 메인
            </PortfolioRouteLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">VNX-400</span>
          </div>
          <div className="vectoron-detail-intro">
            <p>Edge vision controller · Product 01</p>
            <h1>
              VNX-400
              <span>생산 속도를 지키는 엣지 비전 검사 플랫폼</span>
            </h1>
            <p>
              네 개 카메라 채널의 고해상도 영상을 현장에서 바로 분석해 미세
              결함, 조립 오차와 인쇄 상태를 한 시스템에서 판별합니다.
            </p>
            <div className="vectoron-detail-actions">
              <a href="mailto:hello@vectoron.example">기술 상담 요청 ↗</a>
              <PortfolioRouteLink
                href={buildMainHref("industrial", "vectoron-product")}
                onNavigate={onNavigate}
              >
                제품 메인으로 돌아가기
              </PortfolioRouteLink>
            </div>
          </div>
          <div className="vectoron-product-visual" aria-hidden="true">
            <span>VNX</span>
            <strong>400</strong>
            <i />
            <small>EDGE / 4 CH</small>
          </div>
        </section>

        <section className="vectoron-detail-performance">
          <div className="detail-section-heading">
            <span>01 / Performance</span>
            <h2>검토에 필요한 핵심 수치를 한눈에.</h2>
          </div>
          <dl>
            <div>
              <dt>검사 정확도</dt>
              <dd>99.97%</dd>
              <small>검증 샘플 기준</small>
            </div>
            <div>
              <dt>평균 추론 시간</dt>
              <dd>8.4 ms</dd>
              <small>4채널 동시 처리</small>
            </div>
            <div>
              <dt>최대 처리 속도</dt>
              <dd>240 fps</dd>
              <small>라인 조건별 조정</small>
            </div>
          </dl>
        </section>

        <section className="vectoron-detail-specs">
          <div className="detail-section-heading">
            <span>02 / Specification</span>
            <h2>제품 사양</h2>
          </div>
          <div
            className="vectoron-spec-table"
            role="region"
            aria-label="VNX-400 제품 사양표"
          >
            <table>
              <tbody>
                <tr>
                  <th scope="row">카메라 입력</th>
                  <td>12 MP × 4 CH</td>
                </tr>
                <tr>
                  <th scope="row">연산 장치</th>
                  <td>Industrial AI accelerator</td>
                </tr>
                <tr>
                  <th scope="row">통신</th>
                  <td>GigE · OPC UA · Digital I/O</td>
                </tr>
                <tr>
                  <th scope="row">보호 등급</th>
                  <td>IP54 · Fanless enclosure</td>
                </tr>
                <tr>
                  <th scope="row">동작 온도</th>
                  <td>0—45°C</td>
                </tr>
                <tr>
                  <th scope="row">모델 관리</th>
                  <td>버전 비교 · 롤백 · 원격 배포</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="vectoron-detail-deployment">
          <div className="detail-section-heading">
            <span>03 / Deployment</span>
            <h2>현장 조건을 먼저 확인하고 단계적으로 도입합니다.</h2>
          </div>
          <ol>
            <li>
              <span>01</span>
              <strong>라인 진단</strong>
              <p>속도, 조명과 불량 기준을 수집합니다.</p>
            </li>
            <li>
              <span>02</span>
              <strong>파일럿 검증</strong>
              <p>실제 샘플로 정확도와 takt time을 비교합니다.</p>
            </li>
            <li>
              <span>03</span>
              <strong>통합·운영</strong>
              <p>PLC 연동 후 운영자 교육과 모델 관리를 지원합니다.</p>
            </li>
          </ol>
        </section>

        <section className="vectoron-detail-cta">
          <p>Ready for line review?</p>
          <h2>귀사의 검사 조건으로 VNX-400을 검토하세요.</h2>
          <a href="mailto:hello@vectoron.example">견적 및 기술 상담 요청 ↗</a>
        </section>
      </div>
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
