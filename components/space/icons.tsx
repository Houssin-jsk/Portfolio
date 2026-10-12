import type { SVGProps } from "react";

type OrbitIconProps = Omit<SVGProps<SVGSVGElement>, "children" | "direction"> & { title?: string; size?: 16 | 20 | 24 };
type Direction = "navigate" | "external" | "down" | "up";

/** Angled arrowheads and a fluid orbital tail, on a shared 24px optical grid. */
function OrbitIcon({ direction, title, size = 20, ...props }: OrbitIconProps & { direction: Direction }) {
  const paths: Record<Direction, string> = {
    navigate: "M4 18C4 11 10 7 19 5M11 4L20 4L20 13",
    external: "M4 10V19H13M8 16C9 11 13 7 20 4M13 4H20V11",
    down: "M5 4C13 4 16 10 16 19M10 14L16 20L22 14",
    up: "M5 20C13 20 16 14 16 5M10 10L16 4L22 10",
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="miter" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true} focusable="false" {...props}>{title ? <title>{title}</title> : null}<path d={paths[direction]} /></svg>;
}

export function NavigateIcon(props: OrbitIconProps) { return <OrbitIcon direction="navigate" {...props} />; }
export function ExternalLinkIcon(props: OrbitIconProps) { return <OrbitIcon direction="external" {...props} />; }
export function ScrollDownIcon(props: OrbitIconProps) { return <OrbitIcon direction="down" {...props} />; }
export function BackToTopIcon(props: OrbitIconProps) { return <OrbitIcon direction="up" {...props} />; }
