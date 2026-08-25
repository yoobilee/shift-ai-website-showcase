import { useEffect, useRef, type KeyboardEvent, type MouseEvent } from "react";

interface ProjectInfoDialogProps {
  open: boolean;
  onClose: () => void;
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function ProjectInfoDialog({ open, onClose }: ProjectInfoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      document.body.classList.add("dialog-open");
      closeButtonRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
      document.body.classList.remove("dialog-open");
    }

    return () => document.body.classList.remove("dialog-open");
  }, [open]);

  const trapFocus = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;

    const focusableElements = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(focusableSelector),
    ).filter((element) => !element.hasAttribute("hidden"));
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (!firstElement || !lastElement) return;
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const closeFromBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="project-info-dialog"
      aria-labelledby="project-info-title"
      aria-describedby="project-info-description"
      onKeyDown={trapFocus}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={closeFromBackdrop}
      onClose={onClose}
    >
      <div className="project-info-drawer">
        <header className="project-info-header">
          <div>
            <span>SHIFT · Project 01</span>
            <h2 id="project-info-title">세 업종, 하나의 제작 시스템</h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="프로젝트 설명 닫기"
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className="project-info-content">
          <p id="project-info-description" className="project-info-lead">
            하나의 제작 시스템으로, 서로 다른 세 업종의 목적과 사용 흐름을
            설계했습니다.
          </p>

          <section aria-labelledby="project-goal-title">
            <span className="info-section-number">01</span>
            <div>
              <h3 id="project-goal-title">프로젝트 목표</h3>
              <p>
                색만 바꾸는 템플릿이 아니라 사용자의 판단 순서에 따라 정보 구조,
                이미지 비율, 타이포그래피와 행동 유도를 달리하는 프론트엔드
                포트폴리오입니다. 브랜드와 수치, 주소는 설계 시연을 위한 가상
                정보입니다.
              </p>
            </div>
          </section>

          <section aria-labelledby="industry-flow-title">
            <span className="info-section-number">02</span>
            <div>
              <h3 id="industry-flow-title">업종별 사용자 목적과 흐름</h3>
              <dl className="industry-flow-list">
                <div>
                  <dt>산업기술·B2B</dt>
                  <dd>
                    기술 신뢰 형성 → 성능·사양 검토 → 적용 가능성 확인 → 견적
                    문의
                  </dd>
                </div>
                <div>
                  <dt>인테리어·공간</dt>
                  <dd>
                    프로젝트 감도 탐색 → 공간 철학 이해 → 작업 방식 확인 → 상담
                  </dd>
                </div>
                <div>
                  <dt>로컬 F&amp;B</dt>
                  <dd>
                    대표 메뉴 발견 → 시즌 행사 인지 → 가격·매장 확인 → 방문
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <section aria-labelledby="system-title">
            <span className="info-section-number">03</span>
            <div>
              <h3 id="system-title">공통 시스템과 차별화</h3>
              <p>
                업종·테마·보기 상태, 상단 도구 모음, URL 규칙과 접근성 로직은
                공유합니다. 섹션 순서, 그리드, 타입 스케일, 이미지 크롭, 색
                역할과 CTA 문장은 업종별로 독립 설계했습니다.
              </p>
            </div>
          </section>

          <section aria-labelledby="quality-title">
            <span className="info-section-number">04</span>
            <div>
              <h3 id="quality-title">반응형·접근성 기준</h3>
              <p>
                320px부터 큰 화면까지 자연스러운 재배치, 44px 수준의 조작 영역,
                키보드 탭 탐색, 명확한 초점, 의미 있는 제목·랜드마크·대체
                텍스트, reduced motion과 확대 사용성을 기준으로 삼았습니다.
              </p>
            </div>
          </section>

          <section aria-labelledby="ai-workflow-title">
            <span className="info-section-number">05</span>
            <div>
              <h3 id="ai-workflow-title">생성형 AI 이미지·콘텐츠 제작 과정</h3>
              <ol className="ai-workflow-list">
                <li>업종별 목적과 이미지 역할 정의</li>
                <li>생성 프롬프트 작성 및 시각 자산 생성</li>
                <li>브랜드 분위기, 구도, 색감, 실제 사용 맥락 검토</li>
                <li>
                  텍스트 왜곡, 비현실적 구조, 저작권 오인 가능성, 업종 부적합
                  요소 점검
                </li>
                <li>이미지 크롭과 압축 및 WebP 최적화</li>
                <li>실제 UI 안에서 가독성, 대비, 반응형 크롭 재검토</li>
              </ol>
            </div>
          </section>

          <section aria-labelledby="review-title">
            <span className="info-section-number">06</span>
            <div>
              <h3 id="review-title">검토 원칙과 개선 배경</h3>
              <p>
                생성 결과를 완성본으로 간주하지 않고 브랜드 적합성, 사실성,
                구조적 왜곡, 가독성과 저작권 오인 가능성을 사람이 다시
                판단합니다. 이번 개편은 브라우저 프레임과 여러 고정 도구가 실제
                사이트 탐색을 방해하던 문제를 줄이고, 업종별 경험 자체가 먼저
                보이도록 했습니다.
              </p>
            </div>
          </section>
        </div>
      </div>
    </dialog>
  );
}
