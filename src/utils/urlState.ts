import type { IndustryId } from "../types";

const validIndustries = new Set<IndustryId>(["industrial", "space", "food"]);
const industryHashes: Record<IndustryId, ReadonlySet<string>> = {
  industrial: new Set([
    "vectoron-home",
    "vectoron-product",
    "vectoron-application",
    "vectoron-applications-title",
    "vectoron-spec",
    "vectoron-contact",
  ]),
  space: new Set([
    "moru-home",
    "moru-projects",
    "moru-philosophy",
    "moru-process",
    "moru-contact",
  ]),
  food: new Set([
    "basket-home",
    "basket-menu",
    "basket-season",
    "basket-stores",
  ]),
};

export function readIndustryFromUrl(
  search = window.location.search,
): IndustryId {
  const value = new URLSearchParams(search).get("industry");

  if (value === "industry") return "industrial";
  if (value && validIndustries.has(value as IndustryId)) {
    return value as IndustryId;
  }

  return "industrial";
}

export function writeIndustryToUrl(
  industry: IndustryId,
  method: "push" | "replace" = "push",
  options: { preserveValidHash?: boolean } = {},
) {
  const url = new URL(window.location.href);
  url.searchParams.set("industry", industry);
  if (!options.preserveValidHash || !getValidIndustryHash(industry, url.hash)) {
    url.hash = "";
  }
  const state = { ...window.history.state, industry };

  if (method === "replace") {
    window.history.replaceState(state, "", url);
    return;
  }

  window.history.pushState(state, "", url);
}

export function getValidIndustryHash(
  industry: IndustryId,
  hash = window.location.hash,
) {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  return industryHashes[industry].has(id) ? id : null;
}
