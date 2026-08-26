import moruGallery from "../assets/generated/moru-gallery.webp";
import moruHero from "../assets/generated/moru-hero.webp";
import { PortfolioRouteLink } from "../components/PortfolioRouteLink";
import { buildDetailHref } from "../utils/routeState";

interface MoruSiteProps {
  onNavigate: (href: string) => void;
}

export function MoruSite({ onNavigate }: MoruSiteProps) {
  return (
    <article
      className="brand-site moru-site"
      aria-label="모루 스페이스 인테리어 스튜디오 홈페이지 콘셉트"
    >
      <header className="moru-header">
        <a href="#moru-home" className="moru-logo">
          MORU<span>SPACE</span>
        </a>
        <nav aria-label="모루 스페이스 주요 메뉴">
          <a href="#moru-philosophy">Philosophy</a>
          <a href="#moru-projects">Projects</a>
          <a href="#moru-process">Process</a>
        </nav>
        <a className="moru-contact" href="#moru-contact">
          Start a project <span>↗</span>
        </a>
      </header>
      <section className="moru-hero" id="moru-home">
        <div className="moru-intro">
          <span>Seoul · Since 2018</span>
          <h1>
            Space,
            <br />
            made to <em>linger.</em>
          </h1>
          <p>
            머무는 사람의 속도와 빛의 방향에서 시작하는 공간 디자인 스튜디오.
          </p>
        </div>
        <figure className="moru-photo moru-photo--main">
          <div className="moru-main-image" data-reveal="image">
            <img
              className="room-scene room-scene--warm"
              src={moruHero}
              width="1402"
              height="1122"
              fetchPriority="high"
              alt="곡면 회벽과 긴 오크 벤치에 늦은 오후 빛이 드는 주거 라운지"
            />
          </div>
          <figcaption>
            <span>01</span>
            <p>
              House of Quiet
              <br />
              <small>Residential · Hannam</small>
            </p>
            <i>2025</i>
          </figcaption>
        </figure>
        <figure className="moru-photo moru-photo--detail">
          <img
            className="room-scene room-scene--detail"
            src={moruGallery}
            width="1122"
            height="1402"
            loading="lazy"
            alt="천창의 자연광과 그림자가 만든 미니멀한 석재 갤러리"
          />
          <figcaption>
            <span>Material note</span>
            <i>Stone / Lime plaster</i>
          </figcaption>
        </figure>
        <div className="moru-side-meta">
          <span className="moru-side-line" aria-hidden="true" />
          <p className="moru-side-note">
            Selected works
            <br />
            2023—2026
          </p>
          <span className="moru-side-orbit" aria-hidden="true" />
        </div>
      </section>
      <section
        className="moru-manifesto section-anchor-target"
        data-reveal="block"
        id="moru-philosophy"
      >
        <span>Our philosophy</span>
        <p>
          좋은 공간은 먼저 자신을 드러내지 않습니다. 빛, 재료, 사람의 움직임이
          자연스럽게 관계 맺도록 <em>필요한 것만 남깁니다.</em>
        </p>
      </section>
      <section
        className="moru-projects section-anchor-target"
        id="moru-projects"
      >
        <div className="moru-section-head" data-reveal="block">
          <span>Selected projects</span>
          <span>View all 18 ↗</span>
        </div>
        <div className="moru-project-grid" data-reveal="gallery">
          <figure>
            <img
              className="room-scene room-scene--gallery"
              src={moruGallery}
              width="1122"
              height="1402"
              loading="lazy"
              alt="직사각형 천창 아래 고요한 석재 중정"
            />
            <figcaption>
              <strong>Courtyard Gallery</strong>
              <span>Culture · Seochon</span>
            </figcaption>
          </figure>
          <figure>
            <img
              className="room-scene room-scene--cafe"
              src={moruHero}
              width="1402"
              height="1122"
              loading="lazy"
              alt="곡면 회벽과 오크 가구가 조화를 이룬 공간"
            />
            <figcaption>
              <strong>Serene House</strong>
              <span>Residential · Hannam</span>
            </figcaption>
          </figure>
          <PortfolioRouteLink
            className="moru-detail-entry"
            href={buildDetailHref("serene-house")}
            onNavigate={onNavigate}
          >
            <span>프로젝트 자세히 보기</span>
            <span aria-hidden="true">↗</span>
          </PortfolioRouteLink>
        </div>
      </section>
      <section
        className="moru-process section-anchor-target"
        id="moru-process"
        data-reveal="stagger"
      >
        <div>
          <span>01</span>
          <h3>Observe</h3>
          <p>장소와 사람의 습관을 관찰합니다.</p>
        </div>
        <div>
          <span>02</span>
          <h3>Compose</h3>
          <p>빛과 동선, 재료의 관계를 설계합니다.</p>
        </div>
        <div>
          <span>03</span>
          <h3>Refine</h3>
          <p>현장에서 디테일을 끝까지 조정합니다.</p>
        </div>
      </section>
      <section
        className="moru-cta section-anchor-target"
        id="moru-contact"
        data-reveal="block"
      >
        <p>Have a space in mind?</p>
        <h3>
          Let’s make room
          <br />
          for a new story.
        </h3>
        <a href="mailto:studio@moru.example">
          프로젝트 상담하기 <span>↗</span>
        </a>
      </section>
    </article>
  );
}
