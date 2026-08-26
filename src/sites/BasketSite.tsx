import basketHero from "../assets/generated/basket-hero.webp";
import { PortfolioRouteLink } from "../components/PortfolioRouteLink";
import { buildDetailHref } from "../utils/routeState";

interface BasketSiteProps {
  onNavigate: (href: string) => void;
}

export function BasketSite({ onNavigate }: BasketSiteProps) {
  return (
    <article
      className="brand-site basket-site"
      aria-label="바스켓 데이 델리 로컬 F&B 홈페이지 콘셉트"
    >
      <div className="basket-banner">
        <span>NEW!</span> 늦여름 토마토 피크닉 메뉴 오픈{" "}
        <span>매일 11:00—20:30</span>
      </div>
      <header className="basket-header">
        <a href="#basket-home" className="basket-logo">
          <BasketMark />
          BASKET DAY<small>NEIGHBORHOOD DELI</small>
        </a>
        <nav aria-label="바스켓 데이 주요 메뉴">
          <a href="#basket-menu">Menu</a>
          <a href="#basket-season">Season</a>
          <a href="#basket-stores">Stores</a>
        </nav>
        <a className="basket-order" href="#basket-stores">
          가까운 매장 <span>↗</span>
        </a>
      </header>
      <section className="basket-hero" id="basket-home">
        <div className="basket-copy">
          <span className="basket-sticker">
            <span>SEASON</span>
            <strong>08</strong>
            <span>LIMITED</span>
          </span>
          <p>Fresh from the neighborhood.</p>
          <h1>
            오늘의 기분을
            <br />한 바구니 가득!
          </h1>
          <p className="basket-description">
            제철 토마토와 바질, 갓 구운 포카치아로 만든 우리 동네의 산뜻한 여름
            한 끼.
          </p>
          <div className="basket-actions">
            <PortfolioRouteLink
              href={buildDetailHref("tomato-picnic")}
              onNavigate={onNavigate}
            >
              시즌 메뉴 자세히 보기 <span>→</span>
            </PortfolioRouteLink>
            <a href="#basket-stores">매장 찾기</a>
          </div>
          <div className="basket-rating">
            <span>★★★★★</span>
            <strong>4.9</strong>
            <small>이웃 리뷰 1,284개</small>
          </div>
        </div>
        <div className="basket-visual">
          <img
            src={basketHero}
            width="1122"
            height="1402"
            fetchPriority="high"
            alt="버터 옐로 배경의 피크닉 바구니에 담긴 토마토 바질 포카치아 샌드위치"
          />
          <span className="visual-copy">
            TOMATO
            <br />
            PICNIC
          </span>
          <span className="scribble">made fresh →</span>
        </div>
      </section>
      <div className="basket-marquee" aria-hidden="true">
        <span>
          GOOD FOOD · GOOD MOOD · GOOD NEIGHBORS · GOOD FOOD · GOOD MOOD · GOOD
          NEIGHBORS ·
        </span>
      </div>
      <section className="basket-menu section-anchor-target" id="basket-menu">
        <div className="basket-section-head" data-reveal="block">
          <div>
            <span>Fresh picks</span>
            <h3>이번 주의 바스켓</h3>
          </div>
          <a href="#basket-stores">전체 메뉴 보기 ↗</a>
        </div>
        <div className="menu-grid" data-reveal="stagger">
          <article>
            <div className="menu-art menu-art--red">
              <span>BEST</span>
              <b>01</b>
            </div>
            <div>
              <h4>토마토 바질 멜트</h4>
              <p>구운 토마토 · 바질 페스토 · 모차렐라</p>
              <strong>9,800원</strong>
            </div>
          </article>
          <article>
            <div className="menu-art menu-art--green">
              <span>VEGAN</span>
              <b>02</b>
            </div>
            <div>
              <h4>그린 마켓 볼</h4>
              <p>여름 잎채소 · 병아리콩 · 레몬 타히니</p>
              <strong>10,500원</strong>
            </div>
          </article>
          <article>
            <div className="menu-art menu-art--cream">
              <span>NEW</span>
              <b>03</b>
            </div>
            <div>
              <h4>피치 얼그레이 소다</h4>
              <p>백도 · 얼그레이 · 레몬 버블</p>
              <strong>5,500원</strong>
            </div>
          </article>
        </div>
      </section>
      <section
        className="basket-season section-anchor-target"
        data-reveal="block"
        id="basket-season"
      >
        <div className="season-badge">
          LOCAL
          <br />
          LOVE
        </div>
        <div>
          <span>August story</span>
          <h3>
            가까운 농장에서 온<br />
            제철의 맛
          </h3>
          <p>
            경기 광주의 작은 농장에서 잘 익은 토마토를 매주 두 번 받아요. 가장
            맛있는 순간을 놓치지 않도록.
          </p>
        </div>
        <PortfolioRouteLink
          href={buildDetailHref("tomato-picnic")}
          onNavigate={onNavigate}
        >
          토마토 피크닉 자세히 보기 →
        </PortfolioRouteLink>
      </section>
      <section
        className="basket-stores section-anchor-target"
        data-reveal="stagger"
        id="basket-stores"
      >
        <div>
          <span>We’re open today</span>
          <h3>
            지금, 가까운
            <br />
            바스켓 데이로!
          </h3>
        </div>
        <div className="store-card">
          <i>OPEN</i>
          <strong>성수 키친</strong>
          <p>
            서울 성동구 연무장길 24
            <br />
            11:00—20:30
          </p>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer">
            길찾기 ↗
          </a>
        </div>
        <div className="store-card">
          <i>OPEN</i>
          <strong>망원 델리</strong>
          <p>
            서울 마포구 포은로 81
            <br />
            10:30—20:00
          </p>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer">
            길찾기 ↗
          </a>
        </div>
      </section>
    </article>
  );
}

function BasketMark() {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true">
      <path d="M10 17h24l-2.5 19h-19L10 17Z" />
      <path d="M15 18c1-7 13-10 15 0" />
      <path d="M17 23v8M22 23v8M27 23v8" opacity=".45" />
    </svg>
  );
}
