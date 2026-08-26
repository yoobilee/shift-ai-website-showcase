import moruGallery from "../assets/generated/moru-gallery.webp";
import moruHero from "../assets/generated/moru-hero.webp";
import { PortfolioRouteLink } from "../components/PortfolioRouteLink";
import { buildMainHref } from "../utils/routeState";

interface MoruProjectDetailProps {
  onNavigate: (href: string) => void;
}

export function MoruProjectDetail({ onNavigate }: MoruProjectDetailProps) {
  return (
    <article
      className="brand-site moru-site moru-detail"
      aria-label="Serene House 프로젝트 상세"
    >
      <header className="moru-header">
        <PortfolioRouteLink
          className="moru-logo"
          href={buildMainHref("space", "moru-home")}
          onNavigate={onNavigate}
        >
          MORU<span>SPACE</span>
        </PortfolioRouteLink>
        <nav aria-label="모루 스페이스 메인 섹션">
          <PortfolioRouteLink
            href={buildMainHref("space", "moru-philosophy")}
            onNavigate={onNavigate}
          >
            Philosophy
          </PortfolioRouteLink>
          <PortfolioRouteLink
            href={buildMainHref("space", "moru-projects")}
            onNavigate={onNavigate}
          >
            Projects
          </PortfolioRouteLink>
          <PortfolioRouteLink
            href={buildMainHref("space", "moru-process")}
            onNavigate={onNavigate}
          >
            Process
          </PortfolioRouteLink>
        </nav>
        <PortfolioRouteLink
          className="moru-contact"
          href={buildMainHref("space", "moru-contact")}
          onNavigate={onNavigate}
        >
          Start a project <span>↗</span>
        </PortfolioRouteLink>
      </header>

      <div className="moru-detail-main">
        <section className="moru-detail-opening">
          <div className="detail-breadcrumb" aria-label="현재 위치">
            <PortfolioRouteLink
              href={buildMainHref("space")}
              onNavigate={onNavigate}
            >
              MORU SPACE
            </PortfolioRouteLink>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Serene House</span>
          </div>
          <div className="moru-detail-title">
            <p>Residential · Hannam · 2025</p>
            <h1>Serene House</h1>
            <p>
              빛이 이동하는 속도와 가족의 하루를 따라, 필요한 면과 여백만 남긴
              도심 주거 프로젝트입니다.
            </p>
          </div>
          <figure data-reveal="image">
            <img
              src={moruHero}
              width="1402"
              height="1122"
              fetchPriority="high"
              alt="곡면 회벽과 오크 가구에 부드러운 빛이 드는 Serene House 거실"
            />
            <figcaption>Living room · afternoon light</figcaption>
          </figure>
        </section>

        <section className="moru-detail-philosophy" data-reveal="block">
          <span>01 — Spatial philosophy</span>
          <p>
            벽을 더 세우기보다 빛과 시선이 머무는 경계를 조율했습니다.
            <em> 조용하지만 비어 있지 않은 집</em>을 목표로 합니다.
          </p>
        </section>

        <section
          className="moru-detail-gallery"
          data-reveal="gallery"
          aria-label="프로젝트 이미지 갤러리"
        >
          <figure className="moru-detail-gallery-main">
            <img
              src={moruGallery}
              width="1122"
              height="1402"
              loading="lazy"
              alt="천창 아래 석재와 회벽의 재료 대비"
            />
            <figcaption>Light court · limestone</figcaption>
          </figure>
          <figure>
            <img
              src={moruHero}
              width="1402"
              height="1122"
              loading="lazy"
              alt="긴 오크 벤치와 곡면 벽의 연결 디테일"
            />
            <figcaption>Oak bench · curved plaster</figcaption>
          </figure>
        </section>

        <section className="moru-detail-materials" data-reveal="block">
          <div>
            <span>02 — Material palette</span>
            <h2>시간이 지나며 깊어지는 재료</h2>
          </div>
          <dl>
            <div>
              <dt>Wall</dt>
              <dd>Lime plaster</dd>
            </div>
            <div>
              <dt>Floor</dt>
              <dd>Honed limestone</dd>
            </div>
            <div>
              <dt>Joinery</dt>
              <dd>Natural oak</dd>
            </div>
            <div>
              <dt>Textile</dt>
              <dd>Washed linen</dd>
            </div>
          </dl>
        </section>

        <section className="moru-detail-process">
          <span>03 — Process</span>
          <div data-reveal="stagger">
            <article>
              <strong>Observe</strong>
              <p>가족의 이동과 채광을 일주일 단위로 기록했습니다.</p>
            </article>
            <article>
              <strong>Compose</strong>
              <p>공용 공간의 축을 열고 수납을 벽 안으로 정리했습니다.</p>
            </article>
            <article>
              <strong>Refine</strong>
              <p>빛의 반사와 손이 닿는 모서리를 현장에서 조정했습니다.</p>
            </article>
          </div>
        </section>

        <section className="moru-detail-cta" data-reveal="block">
          <p>Have a space in mind?</p>
          <h2>당신의 일상에서 시작하는 공간을 이야기해 주세요.</h2>
          <div>
            <a href="mailto:studio@moru.example">프로젝트 상담하기 ↗</a>
            <PortfolioRouteLink
              href={buildMainHref("space", "moru-projects")}
              onNavigate={onNavigate}
            >
              프로젝트 메인으로 돌아가기
            </PortfolioRouteLink>
          </div>
        </section>
      </div>
    </article>
  );
}
