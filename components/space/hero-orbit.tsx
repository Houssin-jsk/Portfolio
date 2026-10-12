"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import styles from "./hero-orbit.module.css";

type HeroOrbitProps = { children: ReactNode; className: string; orbitClassName: string };
// Exact original ellipse, expressed as two joined arcs. Shared by line and motion.
const orbitPath = "M870 285 A420 150 0 1 1 30 285 A420 150 0 1 1 870 285 Z";

export function HeroOrbit({ children, className, orbitClassName }: HeroOrbitProps) {
  const svg = useRef<SVGSVGElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const pathId = `orbit-${id}`;
  const travelId = `travel-${id}`;
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState<"hidden" | "visible" | "leaving">("hidden");
  const [paused, setPaused] = useState(false);
  const [motionSupported, setMotionSupported] = useState(true);

  useEffect(() => {
    const element = svg.current;
    if (!element) return;
    const motion = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
    setMotionSupported(typeof motion.beginElement === "function");
    // Counter SVG scaling: fixed optical size and an unchanged 44px hit target.
    const resize = () => {
      const bounds = element.getBoundingClientRect();
      const scale = Math.min(bounds.width / 900, bounds.height / 550);
      if (scale > 0) element.style.setProperty("--light-scale", String(1 / scale));
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();
    const visibility = () => {
      setPaused(document.hidden);
      if (document.hidden) element.pauseAnimations?.();
      else element.unpauseAnimations?.();
    };
    document.addEventListener("visibilitychange", visibility);
    visibility();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  function stayCurious() {
    timers.current.forEach(clearTimeout);
    setActive(true);
    setMessage("visible");
    timers.current = [setTimeout(() => setActive(false), 700), setTimeout(() => setMessage("leaving"), 1400), setTimeout(() => setMessage("hidden"), 1600)];
  }
  function activateWithKeyboard(event: KeyboardEvent<SVGGElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) stayCurious();
    }
  }

  return (
    <figure className={className} data-orbit-active={active} data-orbit-paused={paused}>
      <svg ref={svg} className={`${orbitClassName} ${styles.orbit}`} viewBox="0 0 900 550" fill="none">
        <defs>
          <radialGradient id={`light-${id}`}>
            <stop offset="0" stopColor="#fffef6" /><stop offset=".18" stopColor="#fff5d4" />
            <stop offset=".5" stopColor="#F3A339" stopOpacity=".8" /><stop offset="1" stopColor="#F3A339" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`ray-${id}`}>
            <stop offset="0" stopColor="#fffef6" /><stop offset=".3" stopColor="#ffe5ad" />
            <stop offset=".85" stopColor="#F3A339" stopOpacity=".65" /><stop offset="1" stopColor="#F3A339" stopOpacity=".15" />
          </radialGradient>
          <filter id={`bloom-${id}`} x="-18" y="-18" width="36" height="36" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="1.2" /></filter>
        </defs>
        <g transform="rotate(-22 450 285)">
          <path id={pathId} className={styles.line} d={orbitPath} pathLength="1" aria-hidden="true" />
          <g className={styles.traveler} transform={motionSupported ? undefined : "translate(870 285)"}>
            {/* 8s travel, including 200ms arrival/departure easing; then a 550ms hold. */}
            {motionSupported ? <animateMotion id={travelId} dur="8.55s" begin="1.6s" repeatCount="indefinite" calcMode="spline" keyPoints="0;0.0128205128;0.9871794872;1;1" keyTimes="0;0.0233918129;0.9122807018;0.9356725146;1" keySplines=".333333 0 .666667 .333333;0 0 1 1;.333333 .666667 .666667 1;0 0 1 1"><mpath href={`#${pathId}`} /></animateMotion> : null}
            <g transform="rotate(22)">
              <g className={styles.light} role="button" tabIndex={0} aria-label="A little reminder to stay curious" onClick={stayCurious} onKeyDown={activateWithKeyboard}>
                <circle className={styles.target} r="22" fill="transparent" />
                <g className={styles.optics} transform="scale(1.18)" aria-hidden="true">
                  <circle r="11" fill={`url(#light-${id})`} opacity=".25" filter={`url(#bloom-${id})`} />
                  <path d="M0-9L1.35-1.35L9 0L1.35 1.35L0 9L-1.35 1.35L-9 0L-1.35-1.35Z" fill={`url(#ray-${id})`} />
                  <path d="M-11 0H11M0-11V11" stroke={`url(#ray-${id})`} strokeWidth=".35" opacity=".65" />
                  <circle r="1.6" fill="#fffef6" />
                  <g className={motionSupported ? styles.glint : undefined} opacity="0">
                    <circle r="9" fill={`url(#light-${id})`} filter={`url(#bloom-${id})`} />
                    <path d="M-12 0H12M0-12V12" stroke="#fff9e7" strokeWidth=".4" />
                    <circle r="2" fill="#fffef6" />
                  </g>
                </g>
                <text className={styles.message} data-visible={message === "visible"} y="30" textAnchor="middle" aria-hidden="true">{message !== "hidden" ? "Stay curious." : ""}</text>
              </g>
            </g>
          </g>
        </g>
      </svg>
      {children}
      <span className={styles.announcement} role="status" aria-live="polite">{message === "visible" ? "Stay curious." : ""}</span>
    </figure>
  );
}
