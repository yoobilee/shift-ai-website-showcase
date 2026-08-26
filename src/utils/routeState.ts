import type { IndustryId } from "../types";
import { readIndustryFromUrl } from "./urlState";

export type DetailPageId = "vnx-400" | "serene-house" | "tomato-picnic";

export type PortfolioRoute =
  | { kind: "main"; industry: IndustryId; key: "main" }
  | {
      kind: "detail";
      industry: IndustryId;
      detailPage: DetailPageId;
      path: string;
      key: string;
    };

const detailRoutes: Record<
  string,
  { industry: IndustryId; detailPage: DetailPageId }
> = {
  "/industrial/products/vnx-400": {
    industry: "industrial",
    detailPage: "vnx-400",
  },
  "/space/projects/serene-house": {
    industry: "space",
    detailPage: "serene-house",
  },
  "/food/season/tomato-picnic": {
    industry: "food",
    detailPage: "tomato-picnic",
  },
};

function normalizePathname(pathname: string) {
  if (pathname === "/") return pathname;
  return pathname.replace(/\/+$/, "");
}

export function readPortfolioRoute(
  location: Pick<Location, "pathname" | "search"> = window.location,
): PortfolioRoute {
  const pathname = normalizePathname(location.pathname);
  const detailRoute = detailRoutes[pathname];

  if (detailRoute) {
    return {
      kind: "detail",
      path: pathname,
      key: pathname,
      ...detailRoute,
    };
  }

  return {
    kind: "main",
    industry: readIndustryFromUrl(location.search),
    key: "main",
  };
}

export function buildMainHref(industry: IndustryId, hash?: string) {
  const search = new URLSearchParams({ industry });
  const normalizedHash = hash
    ? `#${hash.startsWith("#") ? hash.slice(1) : hash}`
    : "";
  return `/?${search.toString()}${normalizedHash}`;
}

export function buildDetailHref(detailPage: DetailPageId) {
  const entry = Object.entries(detailRoutes).find(
    ([, route]) => route.detailPage === detailPage,
  );
  return entry?.[0] ?? "/";
}
