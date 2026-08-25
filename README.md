# SHIFT — AI Website Showcase

아이웹 웹디자이너·퍼블리셔 지원을 위해 제작한 단일 페이지 포트폴리오 프로젝트입니다.

> 하나의 제작 시스템으로, 서로 다른 세 업종의 목적과 사용 흐름을 설계했습니다.

업종 선택에 따라 같은 미리보기 안에서 레이아웃, 타이포그래피, 이미지 비율, 정보 구조, CTA와 모션이 함께 전환됩니다. 백엔드·로그인·DB 없이 React와 CSS만으로 동작합니다.

## Three experiences

| 업종          | 가상 브랜드      | 핵심 사용자 흐름      | 디자인 방향                                    |
| ------------- | ---------------- | --------------------- | ---------------------------------------------- |
| 산업기술·B2B  | VECTORON SYSTEMS | 정보 검증 → 견적 문의 | 다크 네이비, 고밀도 그리드, 수치와 사양 중심   |
| 인테리어·공간 | MORU SPACE       | 감도 탐색 → 상담 예약 | 아이보리, 비대칭 편집 그리드, 대형 이미지 중심 |
| 로컬 F&B      | BASKET DAY DELI  | 메뉴 발견 → 매장 방문 | 버터 옐로·토마토 레드, 캠페인과 행동 중심      |

## Interaction decisions

- 업종 상태를 `?industry=industry|space|food` URL 파라미터와 동기화합니다.
- PC 1440 px / 모바일 390 px 미리보기를 같은 화면에서 전환합니다.
- 여러 고정 버튼은 하나의 확장형 Utility Dock으로 축약했습니다.
- 여러 팝업을 동시에 띄우지 않고, 한 번에 한 공지만 읽는 Unified Notice Dialog를 사용합니다.
- 주요 조작은 네이티브 버튼·링크로 제공하고, 키보드 포커스와 reduced motion을 지원합니다.

## AI-assisted workflow

1. `Frame` — 업종 목적, 핵심 행동, 필요한 정보와 금지 기준을 먼저 정의합니다.
2. `Generate` — 카피와 이미지 방향을 구도·재질·톤 단위로 나눠 생성합니다.
3. `Verify` — 브랜드 적합성, 사실성, 이미지 왜곡, 가독성, 저작권 리스크를 검토합니다.
4. `Refine` — 생성 결과를 그대로 쓰지 않고 반응형 비율과 읽기 순서에 맞춰 재편집합니다.

표시된 브랜드·제품 수치·주소는 정보 설계를 위한 가상 데이터입니다.

## Tech

- React 19
- TypeScript 6
- Vite 8
- CSS custom properties, container queries, native `<dialog>`
- oxlint

## Run locally

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```

## Structure

```text
src/
├── App.tsx              # portfolio shell, controls, notice dialog
├── App.css              # shared tokens and three visual systems
├── index.css            # global and accessibility foundations
├── sites/
│   ├── VectoronSite.tsx
│   ├── MoruSite.tsx
│   └── BasketSite.tsx
└── types.ts
```
