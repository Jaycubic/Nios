// src/components/RoadPath.tsx
// ─── Standalone SVG Winding Road — Learning Journey Asset ─────────────────
// Direction: LEFT (START) → RIGHT (GOAL / flag)
// Completed chapters anchor near left. Not-started chapters anchor near flag (right).

import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

// ─── Exported Constants ───────────────────────────────────────────────────────

/** Unique ID for the invisible reference path used with getPointAtLength() */
export const ROAD_PATH_ID = 'lrn-road-path-ref';

export const ROAD_VIEWBOX_W = 900;
export const ROAD_VIEWBOX_H = 200;
export const ROAD_VIEWBOX = `0 0 ${ROAD_VIEWBOX_W} ${ROAD_VIEWBOX_H}`;

/**
 * Horizontal S-curve road path.
 * Direction: left-center (START) → winding right → right-center (GOAL / flag).
 *
 * pathLength 0 → (30, 100)   left-center   START — completed chapters live here
 * pathLength 1 → (870, 100)  right-center  GOAL  — not-started chapters live here (near flag)
 */
export const ROAD_PATH_D = [
    'M 30 100',
    'C 30 100, 120 40,  220 100',   // left start → first up-crest
    'C 320 160, 420 40,  500 100',  // down → second up-crest
    'C 580 160, 660 40,  740 100',  // down → third up-crest
    'C 800 130, 840 100, 870 100',  // settle into goal
].join(' ');

/**
 * Pre-calibrated node anchor fractions (0–1 along the horizontal path).
 * anchor 0.03 ≈ left (start / completed)
 * anchor 0.97 ≈ right (goal / not-started, near flag)
 */
const ANCHOR_MAP: Record<number, number[]> = {
    1: [0.50],
    2: [0.05, 0.95],
    3: [0.05, 0.50, 0.95],
    4: [0.05, 0.35, 0.65, 0.95],
    5: [0.05, 0.28, 0.50, 0.72, 0.95],
    6: [0.05, 0.22, 0.41, 0.59, 0.78, 0.95],
    7: [0.05, 0.19, 0.36, 0.50, 0.64, 0.81, 0.95],
    8: [0.05, 0.17, 0.31, 0.45, 0.57, 0.69, 0.82, 0.95],
    10: [0.05, 0.14, 0.25, 0.36, 0.47, 0.57, 0.67, 0.77, 0.87, 0.95],
    12: [0.04, 0.12, 0.21, 0.30, 0.39, 0.48, 0.57, 0.66, 0.75, 0.83, 0.90, 0.96],
};

/** Returns normalized anchor fractions for `count` nodes (1–12). */
export function getNodeAnchors(count: number): number[] {
    const key = Math.min(Math.max(count, 1), 12);
    if (ANCHOR_MAP[key]) return ANCHOR_MAP[key];
    // interpolate for missing keys
    const step = 0.90 / (count - 1);
    return Array.from({ length: count }, (_, i) => 0.05 + i * step);
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
    /** 0–100: how much of the road (from left) is filled with progressColor */
    progressPercent?: number;
    animateProgress?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

// ─── Scenic Decorations ───────────────────────────────────────────────────────

function RoadDecorations({ roadColor, progressColor }: { roadColor: string; progressColor: string }) {
    return (
        <g aria-hidden="true">
            {/* ── GOAL flag at right (870, 100) ── */}
            <line x1="870" y1="100" x2="870" y2="55" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
            <path d="M 870 55 L 898 65 L 870 75 Z" fill="#6C5CE7" opacity={0.92} />
            <text x="882" y="67" textAnchor="middle" fill="#ffffff" fontSize="7" fontWeight="700"
                fontFamily="'Inter',sans-serif" letterSpacing="0.5" style={{ pointerEvents: 'none' }}>
                GOAL
            </text>
            <circle cx="870" cy="100" r="4" fill={roadColor} opacity={0.8} />

            {/* ── START marker at left (30, 100) ── */}
            <circle cx="30" cy="100" r="16" fill="#6C5CE7" opacity={0.08} />
            <circle cx="30" cy="100" r="10" fill="#6C5CE7" opacity={0.14} />
            <circle cx="30" cy="100" r="6" fill="#6C5CE7" opacity={0.55} />
            <circle cx="30" cy="100" r="3" fill="#ffffff" opacity={0.9} />
            <text x="30" y="124" textAnchor="middle" fill="#6C5CE7" fontSize="8" fontWeight="700"
                fontFamily="'Inter',sans-serif" letterSpacing="1" opacity={0.7} style={{ pointerEvents: 'none' }}>
                START
            </text>

            {/* ── Foliage — top ── */}
            <g opacity={0.14} fill="#5AAF68">
                <circle cx="220" cy="28" r="14" /><circle cx="232" cy="20" r="9" />
                <rect x="218" y="40" width="5" height="12" rx="2.5" fill="#A0AEC0" />
                <circle cx="500" cy="24" r="13" /><circle cx="514" cy="17" r="8" />
                <rect x="498" y="35" width="5" height="11" rx="2.5" fill="#A0AEC0" />
            </g>

            {/* ── Foliage — bottom ── */}
            <g opacity={0.14} fill="#5AAF68">
                <circle cx="320" cy="178" r="13" /><circle cx="308" cy="170" r="8" />
                <rect x="318" y="162" width="5" height="-12" rx="2.5" fill="#A0AEC0" />
                <circle cx="640" cy="182" r="12" /><circle cx="628" cy="174" r="8" />
            </g>

            {/* ── Right-pointing chevrons on road ── */}
            <g opacity={0.20} stroke="#6C5CE7" strokeWidth="1.5" strokeLinecap="round" fill="none">
                <polyline points="150,96 156,100 150,104" />
                <polyline points="360,96 366,100 360,104" />
                <polyline points="560,96 566,100 560,104" />
                <polyline points="740,96 746,100 740,104" />
            </g>

            {/* ── Ground pebbles ── */}
            <g opacity={0.08} fill="#6B7280">
                <circle cx="190" cy="145" r="3" />
                <circle cx="420" cy="160" r="3" />
                <circle cx="680" cy="148" r="3" />
            </g>
        </g>
    );
}

// ─── RoadPath Component ───────────────────────────────────────────────────────

/**
 * `RoadPath` — standalone horizontal winding road SVG for learning journey UIs.
 * The road travels LEFT → RIGHT.
 * `progressPercent` fills the road rightward from the left (0% = empty, 100% = full).
 */
const RoadPath = forwardRef<SVGSVGElement, RoadPathProps>(
    ({
        width = '100%',
        height,
        strokeWidth = 20,
        baseColor = '#E8F0FE',
        progressColor = '#6C5CE7',
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
                aria-label="Learning journey roadmap — left to right"
            >
                <RoadDecorations roadColor={baseColor} progressColor={progressColor} />

                {/* Drop shadow */}
                <path d={ROAD_PATH_D} fill="none" stroke="rgba(0,0,0,0.07)"
                    strokeWidth={sw + 7} strokeLinecap="round" strokeLinejoin="round" />

                {/* Base road surface */}
                <path d={ROAD_PATH_D} fill="none" stroke={baseColor}
                    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />

                {/* Edge gloss highlight */}
                <path d={ROAD_PATH_D} fill="none" stroke="rgba(255,255,255,0.50)"
                    strokeWidth={sw * 0.36} strokeLinecap="round" strokeLinejoin="round" />

                {/* Progress fill */}
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

                {/* Centre lane dashes */}
                <path d={ROAD_PATH_D} fill="none"
                    stroke="rgba(255,255,255,0.55)" strokeWidth={1.6} strokeDasharray="14 12" />

                {/* Invisible reference path for getPointAtLength() */}
                <path id={ROAD_PATH_ID} d={ROAD_PATH_D} fill="none" stroke="transparent" strokeWidth={1} />
            </svg>
        );
    }
);

RoadPath.displayName = 'RoadPath';
export default RoadPath;