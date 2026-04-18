// src/components/RoadPath.tsx
// ─── Standalone SVG Winding Road — Learning Journey Asset ─────────────────
// Direction: BOTTOM → TOP  (student starts at bottom, climbs toward the flag/goal at top)
// Completed chapters anchor near bottom. Not-started chapters anchor near the flag (top).

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

// ─── Exported Constants ───────────────────────────────────────────────────────

/** Unique ID for the invisible reference path used with getPointAtLength() */
export const ROAD_PATH_ID = 'lrn-road-path-ref';

export const ROAD_VIEWBOX_W = 320;
export const ROAD_VIEWBOX_H = 660;
export const ROAD_VIEWBOX = `0 0 ${ROAD_VIEWBOX_W} ${ROAD_VIEWBOX_H}`;

/**
 * REVERSED Cubic Bézier winding road path.
 * Direction: bottom-center (START) → winding up → top-center (GOAL / flag).
 *
 * Geometry is identical to the forward path — only the traversal direction is flipped.
 * This means:
 *   pathLength  0   → (160, 622)  bottom-center   START — completed chapters live here
 *   pathLength  1   → (160,  40)  top-center       GOAL  — not-started chapters live here (near flag)
 *
 * Safe node anchor zones along the path (fraction 0→1):
 *   0.04  →  (160, 612)   centre       start area
 *   0.21  →  (244, 532)   right apex
 *   0.39  →  ( 76, 406)   left  apex
 *   0.59  →  (244, 280)   right apex
 *   0.78  →  ( 76, 154)   left  apex
 *   0.95  →  (160,  48)   centre       goal area (near flag)
 */
export const ROAD_PATH_D = [
    'M 160 622',
    'C 160 604, 244 576, 244 532',   // bottom-center → right apex y≈532
    'C 244 476,  76 462,  76 406',   // right apex    → left  apex y≈406
    'C  76 350, 244 336, 244 280',   // left  apex    → right apex y≈280
    'C 244 224,  76 210,  76 154',   // right apex    → left  apex y≈154
    'C  76  98, 160  84, 160  40',   // left  apex    → top-center (GOAL)
].join(' ');

/**
 * Pre-calibrated node anchor fractions (0–1 along the REVERSED path).
 * anchor 0.04 ≈ bottom (start / completed)
 * anchor 0.95 ≈ top    (goal  / not-started, near flag)
 */
const ANCHOR_MAP: Record<number, number[]> = {
    1: [0.50],
    2: [0.04, 0.95],
    3: [0.04, 0.50, 0.95],
    4: [0.04, 0.34, 0.66, 0.95],
    5: [0.04, 0.26, 0.50, 0.74, 0.95],
    6: [0.04, 0.21, 0.39, 0.59, 0.78, 0.95],
    7: [0.04, 0.18, 0.34, 0.50, 0.65, 0.81, 0.95],
    8: [0.04, 0.16, 0.30, 0.44, 0.57, 0.70, 0.83, 0.95],
};

/** Returns normalized anchor fractions for `count` nodes (1–8). */
export function getNodeAnchors(count: number): number[] {
    const key = Math.min(Math.max(count, 1), 8);
    return ANCHOR_MAP[key] ?? ANCHOR_MAP[8];
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface RoadPathProps {
    width?: number | string;
    height?: number | string;
    strokeWidth?: number;
    /** Road surface (unfinished section) colour */
    baseColor?: string;
    /** Animated progress fill colour — use subject/brand colour */
    progressColor?: string;
    /** 0–100: how much of the road (from bottom) is filled with progressColor */
    progressPercent?: number;
    animateProgress?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

// ─── Scenic Decorations ───────────────────────────────────────────────────────

function RoadDecorations({ roadColor }: { roadColor: string }) {
    return (
        <g aria-hidden="true">

            {/* ── GOAL flag at top (160, 40) ── */}
            <line x1="160" y1="40" x2="160" y2="4" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" />
            {/* Flag pennant */}
            <path d="M 160 4 L 182 12 L 160 20 Z" fill="#4F81ED" opacity={0.92} />
            {/* "GOAL" text on pennant */}
            <text x="168" y="14" textAnchor="middle" fill="#ffffff" fontSize="5.5" fontWeight="700"
                fontFamily="'Inter',sans-serif" letterSpacing="0.5" style={{ pointerEvents: 'none' }}>
                GOAL
            </text>
            {/* Pole base circle */}
            <circle cx="160" cy="40" r="3.5" fill={roadColor} opacity={0.8} />

            {/* ── START marker at bottom (160, 622) ── */}
            {/* Glow ring */}
            <circle cx="160" cy="622" r="14" fill="#4F81ED" opacity={0.08} />
            <circle cx="160" cy="622" r="9" fill="#4F81ED" opacity={0.14} />
            <circle cx="160" cy="622" r="5" fill="#4F81ED" opacity={0.55} />
            <circle cx="160" cy="622" r="2.5" fill="#ffffff" opacity={0.9} />
            {/* START label */}
            <text x="160" y="638" textAnchor="middle" fill="#4F81ED" fontSize="7" fontWeight="700"
                fontFamily="'Inter',sans-serif" letterSpacing="1" opacity={0.7} style={{ pointerEvents: 'none' }}>
                START
            </text>

            {/* ── Foliage — left side ── */}
            <g opacity={0.16} fill="#5AAF68">
                <circle cx="28" cy="126" r="15" /><circle cx="42" cy="116" r="10" />
                <rect x="26" y="139" width="5" height="14" rx="2.5" fill="#A0AEC0" />
                <circle cx="24" cy="390" r="13" /><circle cx="36" cy="382" r="9" />
                <rect x="22" y="401" width="5" height="12" rx="2.5" fill="#A0AEC0" />
            </g>

            {/* ── Foliage — right side ── */}
            <g opacity={0.16} fill="#5AAF68">
                <circle cx="294" cy="254" r="14" /><circle cx="282" cy="244" r="9" />
                <rect x="292" y="267" width="5" height="13" rx="2.5" fill="#A0AEC0" />
                <circle cx="298" cy="514" r="12" /><circle cx="286" cy="506" r="8" />
                <rect x="296" y="525" width="5" height="11" rx="2.5" fill="#A0AEC0" />
            </g>

            {/* ── Upward chevrons — hint the direction of travel ── */}
            <g opacity={0.22} stroke="#4F81ED" strokeWidth="1.5" strokeLinecap="round" fill="none">
                <polyline points="155,580 160,574 165,580" />
                <polyline points="155,440 160,434 165,440" />
                <polyline points="155,310 160,304 165,310" />
                <polyline points="155,180 160,174 165,180" />
            </g>

            {/* ── Ground pebbles ── */}
            <g opacity={0.09} fill="#6B7280">
                <circle cx="52" cy="208" r="3" />
                <circle cx="268" cy="338" r="3" />
                <circle cx="52" cy="462" r="3" />
            </g>
        </g>
    );
}

// ─── RoadPath Component ───────────────────────────────────────────────────────

/**
 * `RoadPath` — standalone winding road SVG for learning journey UIs.
 *
 * The road travels BOTTOM → TOP.
 * Completed chapters should be placed near the bottom anchors (low fractions).
 * Not-started chapters should be placed near the top anchors (high fractions, near flag).
 *
 * `progressPercent` fills the road upward from the bottom (0 % = empty, 100 % = full).
 */
const RoadPath = forwardRef<SVGSVGElement, RoadPathProps>(
    ({
        width = '100%',
        height,
        strokeWidth = 26,
        baseColor = '#E8F0FE',   // light blue-tinted road surface
        progressColor = '#4F81ED',   // default to theme blue
        progressPercent = 0,
        animateProgress = true,
        className,
        style,
    }, ref) => {
        const progress = Math.min(1, Math.max(0, progressPercent / 100));
        const sw = strokeWidth;

        return (
            <svg
                ref={ref}
                viewBox={ROAD_VIEWBOX}
                width={width}
                height={height}
                preserveAspectRatio="xMidYMid meet"
                className={className}
                style={{ display: 'block', overflow: 'visible', ...style }}
                aria-label="Learning journey roadmap — bottom to top"
            >
                <RoadDecorations roadColor={baseColor} />

                {/* Drop shadow */}
                <path d={ROAD_PATH_D} fill="none" stroke="rgba(0,0,0,0.07)"
                    strokeWidth={sw + 7} strokeLinecap="round" strokeLinejoin="round" />

                {/* Base road surface (unfinished / upcoming) */}
                <path d={ROAD_PATH_D} fill="none" stroke={baseColor}
                    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />

                {/* Edge gloss highlight */}
                <path d={ROAD_PATH_D} fill="none" stroke="rgba(255,255,255,0.50)"
                    strokeWidth={sw * 0.36} strokeLinecap="round" strokeLinejoin="round" />

                {/* ── Progress fill: animates from bottom upward ── */}
                <motion.path
                    d={ROAD_PATH_D} fill="none"
                    stroke={progressColor} strokeWidth={sw} strokeLinecap="round" opacity={0.84}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: animateProgress ? progress : progress }}
                    transition={{ duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 }}
                />

                {/* Progress gloss sheen */}
                <motion.path
                    d={ROAD_PATH_D} fill="none"
                    stroke="rgba(255,255,255,0.30)" strokeWidth={sw * 0.34} strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: animateProgress ? progress : progress }}
                    transition={{ duration: 1.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.3 }}
                />

                {/* Centre lane dashes (full road) */}
                <path d={ROAD_PATH_D} fill="none"
                    stroke="rgba(255,255,255,0.55)" strokeWidth={1.6} strokeDasharray="14 12" />

                {/* ── Invisible reference path for getPointAtLength() ──
            Keep last so DOM paint order stays clean.              */}
                <path id={ROAD_PATH_ID} d={ROAD_PATH_D} fill="none" stroke="transparent" strokeWidth={1} />
            </svg>
        );
    }
);

RoadPath.displayName = 'RoadPath';
export default RoadPath;

/*
 * ─── Path Interpolation ───────────────────────────────────────────────────────
 * ViewBox: "0 0 320 660"  →  aspect ratio ≈ 1 : 2.06
 *
 * const el    = document.getElementById(ROAD_PATH_ID) as SVGPathElement;
 * const total = el.getTotalLength();                    // ≈ 1320 viewBox-px
 * const pt    = el.getPointAtLength(t * total);         // {x, y}
 *
 * ─── Reversed-path anchor safe zones (fraction t → viewBox coordinate) ───────
 *   t = 0.04  →  (160, 612)  centre   completed / START area
 *   t = 0.21  →  (244, 532)  right    first right apex (going up)
 *   t = 0.39  →  ( 76, 406)  left     first left  apex
 *   t = 0.59  →  (244, 280)  right    second right apex
 *   t = 0.78  →  ( 76, 154)  left     second left apex
 *   t = 0.95  →  (160,  48)  centre   GOAL area (near flag)
 *
 * ─── Progress semantics ──────────────────────────────────────────────────────
 *   progressPercent = (completedChapters / totalChapters) * 100
 *   The fill grows upward from the bottom, visually showing how far the
 *   student has climbed toward the goal flag at the top.
 */