import type { IndustryId } from "../types";

export interface IndustryOption {
  id: IndustryId;
  desktopLabel: string;
  mobileLabel: string;
  panelId: string;
  purpose: string;
}

export const industries: IndustryOption[] = [
  {
    id: "industrial",
    desktopLabel: "산업기술·B2B",
    mobileLabel: "산업기술·B2B",
    panelId: "industry-panel-industrial",
    purpose: "기술 검토에서 견적 문의까지",
  },
  {
    id: "space",
    desktopLabel: "인테리어·공간",
    mobileLabel: "공간",
    panelId: "industry-panel-space",
    purpose: "프로젝트 탐색에서 상담까지",
  },
  {
    id: "food",
    desktopLabel: "로컬 F&B",
    mobileLabel: "F&B",
    panelId: "industry-panel-food",
    purpose: "메뉴 탐색에서 매장 방문까지",
  },
];

export function getIndustryIndex(industry: IndustryId) {
  return industries.findIndex((item) => item.id === industry);
}
