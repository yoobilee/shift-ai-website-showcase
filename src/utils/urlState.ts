import type { IndustryId } from "../types";

const validIndustries = new Set<IndustryId>(["industrial", "space", "food"]);

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
) {
  const url = new URL(window.location.href);
  url.searchParams.set("industry", industry);
  const state = { ...window.history.state, industry };

  if (method === "replace") {
    window.history.replaceState(state, "", url);
    return;
  }

  window.history.pushState(state, "", url);
}
