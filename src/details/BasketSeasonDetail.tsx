import basketHero from "../assets/generated/basket-hero.webp";
import { PortfolioRouteLink } from "../components/PortfolioRouteLink";
import { buildMainHref } from "../utils/routeState";

interface BasketSeasonDetailProps {
  onNavigate: (href: string) => void;
}

export function BasketSeasonDetail({ onNavigate }: BasketSeasonDetailProps) {
  return (
    <article
      className="brand-site basket-site basket-detail"
      aria-label="토마토 피크닉 시즌 메뉴 상세"
    >
      <div className="basket-banner">
        <span>SEASON!</span> 토마토 피크닉 · 8월 1일—9월 15일{" "}
        <span>성수·망원 매장</span>
      </div>
      <header className="basket-header">
        <PortfolioRouteLink
          className="basket-logo"
          href={buildMainHref("food", "basket-home")}
          onNavigate={onNavigate}
        >
          <BasketMark />
          BASKET DAY<small>NEIGHBORHOOD DELI</small>
        </PortfolioRouteLink>
        <nav aria-label="바스켓 데이 메인 섹션">
          <PortfolioRouteLink
            href={buildMainHref("food", "basket-menu")}
            onNavigate={onNavigate}
          >
            Menu
          </PortfolioRouteLink>
          <PortfolioRouteLink
            href={buildMainHref("food", "basket-season")}
            onNavigate={onNavigate}
          >
            Season
          </PortfolioRouteLink>
          <PortfolioRouteLink
            href={buildMainHref("food", "basket-stores")}
            onNavigate={onNavigate}
          >
            Stores
          </PortfolioRouteLink>
        </nav>
        <PortfolioRouteLink
          className="basket-order"
          href={buildMainHref("food", "basket-stores")}
          onNavigate={onNavigate}
        >
          가까운 매장 <span>↗</span>
        </PortfolioRouteLink>
      </header>

      <div className="basket-detail-main">
        <section className="basket-detail-hero">
          <div className="basket-detail-copy">
            <div className="detail-breadcrumb" aria-label="현재 위치">
              <PortfolioRouteLink
                href={buildMainHref("food")}
                onNavigate={onNavigate}
              >
                BASKET DAY
              </PortfolioRouteLink>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Tomato Picnic</span>
            </div>
            <span className="basket-detail-kicker">Season 08 · Limited</span>
            <h1>
              TOMATO
              <br />
              PICNIC!
            </h1>
            <p>
              제철 토마토, 바질과 갓 구운 포카치아를 한 바구니에 담은 늦여름
              시즌 메뉴입니다.
            </p>
            <div className="basket-detail-actions">
              <PortfolioRouteLink
                href={buildMainHref("food", "basket-menu")}
                onNavigate={onNavigate}
              >
                전체 메뉴 확인 →
              </PortfolioRouteLink>
              <PortfolioRouteLink
                href={buildMainHref("food", "basket-stores")}
                onNavigate={onNavigate}
              >
                매장 방문하기 ↗
              </PortfolioRouteLink>
            </div>
          </div>
          <figure>
            <img
              src={basketHero}
              width="1122"
              height="1402"
              fetchPriority="high"
              alt="토마토 바질 포카치아와 피크닉 바구니로 구성한 시즌 메뉴"
            />
            <span aria-hidden="true">FRESH / LOCAL / SUNNY</span>
          </figure>
        </section>

        <section className="basket-detail-menu">
          <div>
            <span>What’s in the basket?</span>
            <h2>토마토 피크닉 세트</h2>
            <p>2인이 나누기 좋은 샌드위치, 샐러드와 시즌 음료 구성입니다.</p>
          </div>
          <div className="basket-detail-menu-cards">
            <article>
              <span>01</span>
              <h3>토마토 바질 멜트</h3>
              <p>포카치아 · 구운 토마토 · 모차렐라</p>
              <strong>9,800원</strong>
            </article>
            <article>
              <span>02</span>
              <h3>피크닉 그린 컵</h3>
              <p>잎채소 · 오이 · 레몬 비네그레트</p>
              <strong>5,900원</strong>
            </article>
            <article>
              <span>03</span>
              <h3>피치 토마토 소다</h3>
              <p>백도 · 토마토 워터 · 탄산</p>
              <strong>5,500원</strong>
            </article>
          </div>
        </section>

        <section className="basket-detail-ingredients">
          <div className="basket-ingredient-stamp" aria-hidden="true">
            LOCAL
            <br />
            LOVE
          </div>
          <div>
            <span>Main ingredients</span>
            <h2>가까운 곳에서, 가장 맛있을 때.</h2>
          </div>
          <ul>
            <li>
              <strong>완숙 토마토</strong>
              <span>경기 광주 · 주 2회 입고</span>
            </li>
            <li>
              <strong>스위트 바질</strong>
              <span>남양주 · 무농약 재배</span>
            </li>
            <li>
              <strong>포카치아</strong>
              <span>성수 키친 · 매일 아침 굽기</span>
            </li>
          </ul>
        </section>

        <section className="basket-detail-visit">
          <div>
            <span>When & where</span>
            <h2>
              8.01—9.15
              <br />
              매일 한정 수량
            </h2>
          </div>
          <div className="basket-visit-card">
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
          <div className="basket-visit-card">
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

        <section className="basket-detail-footer-cta">
          <p>Bring your appetite!</p>
          <h2>이번 주말, 토마토 피크닉 어때요?</h2>
          <PortfolioRouteLink
            href={buildMainHref("food", "basket-stores")}
            onNavigate={onNavigate}
          >
            가까운 매장 보기 →
          </PortfolioRouteLink>
        </section>
      </div>
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
