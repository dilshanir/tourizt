"use client";

import { useSyncExternalStore } from "react";

/** Reads a media query without setState-in-effect. Server snapshot is `false`. */
export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True when the preloader should be skipped: seen this session, or the visitor prefers reduced motion. */
export function useSkipPreloader(key: string): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => {
      let seen = false;
      try { seen = sessionStorage.getItem(key) === "1"; } catch { /* storage unavailable */ }
      return seen || !window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
    },
    () => false,
  );
}
