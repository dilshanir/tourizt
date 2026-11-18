"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, Flip, DrawSVGPlugin, MotionPathPlugin, useGSAP);

export const NO_REDUCED = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, Flip, useGSAP };
