import type { ComponentPropsWithoutRef, MouseEvent } from "react";

interface PortfolioRouteLinkProps extends Omit<
  ComponentPropsWithoutRef<"a">,
  "href" | "onClick"
> {
  href: string;
  onNavigate: (href: string) => void;
}

export function PortfolioRouteLink({
  href,
  onNavigate,
  ...props
}: PortfolioRouteLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    onNavigate(href);
  };

  return <a {...props} href={href} onClick={handleClick} />;
}
