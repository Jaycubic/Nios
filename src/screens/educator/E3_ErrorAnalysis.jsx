// src/screens/educator/E3_ErrorAnalysis.jsx
import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Chip, Grid, Divider, Button, Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── §4A: Step-wise error data ────────────────────────────────────────────────
const questions = [
  {
    id: 'Q1', topic: 'Trigonometry - Heights & Distances',
    question: 'A kite is flying at a height of 60m. The string makes an angle of 60° with the ground. Find the length of the string.',
    steps: [
      { step: 1, label: 'Identify Ratio', status: 'correct', note: 'Correctly identified sin(60°) = opposite/hypotenuse' },
      { step: 2, label: 'Substitute Values', status: 'error', note: 'Wrote sin(60°) = 1/2 instead of √3/2' },
      { step: 3, label: 'Calculation', status: 'skipped', note: 'Incorrect value led to wrong string length calculation' },
    ],
    insight: 'Student correctly identifies the right trigonometric ratio to use but struggles to recall standard angle values.',
    rootCause: 'Memory gap for standard trigonometric values (30°, 45°, 60°).',
  },
  {
    id: 'Q2', topic: 'Trigonometric Identities',
    question: 'Prove that (sin A + cosec A)² + (cos A + sec A)² = 7 + tan² A + cot² A',
    steps: [
      { step: 1, label: 'Expand Squares', status: 'correct', note: 'Correctly expanded (a+b)²' },
      { step: 2, label: 'Apply Identities', status: 'error', note: 'Failed to substitute sin²A + cos²A = 1' },
      { step: 3, label: 'Simplify', status: 'skipped', note: 'Unable to proceed without fundamental identity substitution' },
    ],
    insight: 'Expansion is solid, but recognition of basic squared identities forms a bottleneck.',
    rootCause: 'Procedural application gap: does not recognize when to substitute fundamental identities.',
  },
];

// ─── §4B: Concept gap data ────────────────────────────────────────────────────
const conceptGaps = [
  { label: 'Standard Angle Values (0°-90°)', subject: 'Math', attempts: 5, severity: 'high' },
  { label: 'Fundamental Identities (sin²θ + cos²θ = 1)', subject: 'Math', attempts: 4, severity: 'high' },
  { label: 'Reciprocal Ratios (sec, cosec, cot)', subject: 'Math', attempts: 2, severity: 'medium' },
];

// ─── §4C: Prerequisite gap map nodes/edges ────────────────────────────────────
// Node: { id, label, x, y, status }
// status: mastered | proficient | developing | gap | blocked
const mapNodes = [
  // Level 0: Foundation
  { id: 'n1', label: 'Basic\nArithmetic', x: 80, y: 60, status: 'mastered' },
  { id: 'n2', label: 'Algebraic\nExpansion', x: 80, y: 160, status: 'proficient' },
  { id: 'n3', label: 'Right\nTriangles', x: 80, y: 260, status: 'mastered' },
  // Level 1: Intermediate
  { id: 'n4', label: 'Pythagorean\nTheorem', x: 260, y: 100, status: 'mastered' },
  { id: 'n5', label: 'Basic Trig\nRatios', x: 260, y: 210, status: 'developing' },
  { id: 'n6', label: 'Standard\nAngles', x: 260, y: 300, status: 'gap' },
  // Level 2: Advanced
  { id: 'n7', label: 'Heights &\nDistances', x: 450, y: 100, status: 'blocked' },
  { id: 'n8', label: 'Trig\nIdentities', x: 450, y: 250, status: 'blocked' },
];

const mapEdges = [
  { from: 'n1', to: 'n2' },
  { from: 'n3', to: 'n4' },
  { from: 'n4', to: 'n5' },
  { from: 'n5', to: 'n6' },
  { from: 'n6', to: 'n7' },
  { from: 'n2', to: 'n8' },
  { from: 'n5', to: 'n8' },
];

const levelLabels = [
  { label: 'Foundation', x: 80, y: 14 },
  { label: 'Intermediate', x: 260, y: 14 },
  { label: 'Advanced', x: 450, y: 14 },
];

const statusStyle = {
  mastered: { fill: COLORS.green, ring: COLORS.green, label: 'Mastered', text: '#fff' },
  proficient: { fill: COLORS.blue, ring: COLORS.blue, label: 'Proficient', text: '#fff' },
  developing: { fill: COLORS.yellow, ring: COLORS.yellow, label: 'Developing', text: '#fff' },
  gap: { fill: COLORS.amber, ring: COLORS.amber, label: 'Not Started', tooltip: 'Prerequisite concept has not been started or needs review.', text: '#fff' },
  blocked: { fill: '#B91C1C', ring: '#B91C1C', label: 'Not Started', tooltip: 'Blocked: Cannot proceed until prerequisite concepts are started.', text: '#fff' },
};

// ─── Prerequisite Gap Map SVG ─────────────────────────────────────────────────
function PrereqGapMap() {
  const [hoveredNode, setHoveredNode] = useState(null);
  const W = 580, H = 380, R = 30;

  const nodeById = Object.fromEntries(mapNodes.map(n => [n.id, n]));

  // Curved bezier path between two nodes
  function edgePath(from, to) {
    const f = nodeById[from];
    const t = nodeById[to];
    const mx = (f.x + t.x) / 2;
    return `M ${f.x + R} ${f.y} C ${mx} ${f.y}, ${mx} ${t.y}, ${t.x - R} ${t.y}`;
  }

  const hovered = mapNodes.find(n => n.id === hoveredNode);

  return (
    <Box sx={{ position: 'relative' }}>
      <Typography variant="overline" sx={{ display: 'block', mb: 1 }}>
        🔗 Prerequisite Knowledge Map
      </Typography>
      <Typography variant="caption" sx={{ color: COLORS.textSecondary, display: 'block', mb: 2 }}>
        Hover a concept node to see details. Concepts marked as "Not Started" block dependent topics.
      </Typography>

      <Box sx={{
        borderRadius: '16px', border: `1px solid ${COLORS.border}`,
        background: `${COLORS.bgWarm}`,
        overflow: 'hidden', position: 'relative',
      }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <defs>
            <marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill={COLORS.border} />
            </marker>
            {/* Glow filters per status */}
            {Object.entries(statusStyle).map(([status, s]) => (
              <filter key={status} id={`glow-${status}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          {/* Level column headers */}
          {levelLabels.map(ll => (
            <text key={ll.label}
              x={ll.x} y={ll.y}
              textAnchor="middle"
              style={{ fill: COLORS.textMuted, fontSize: '9px', fontFamily: "'Inter'", fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}
            >
              {ll.label}
            </text>
          ))}

          {/* Level column lines */}
          {levelLabels.map(ll => (
            <line key={`line-${ll.label}`}
              x1={ll.x} y1={22} x2={ll.x} y2={H - 20}
              stroke={COLORS.border} strokeWidth="1" strokeDasharray="4,4"
            />
          ))}

          {/* Edges */}
          {mapEdges.map((e, i) => {
            const from = nodeById[e.from];
            const to = nodeById[e.to];
            const isBlocked = to.status === 'blocked' || from.status === 'gap' || from.status === 'blocked';
            return (
              <path
                key={i}
                d={edgePath(e.from, e.to)}
                fill="none"
                stroke={isBlocked ? `${COLORS.amber}50` : `${COLORS.border}`}
                strokeWidth={isBlocked ? 1.5 : 1.5}
                strokeDasharray={isBlocked ? '5,3' : '0'}
                markerEnd="url(#arrow)"
              />
            );
          })}

          {/* Nodes */}
          {mapNodes.map(node => {
            const s = statusStyle[node.status];
            const isHovered = hoveredNode === node.id;
            const lines = node.label.split('\n');
            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Outer pulse ring on hover */}
                {isHovered && (
                  <circle
                    cx={node.x} cy={node.y} r={R + 8}
                    fill={`${s.fill}20`}
                    stroke={`${s.fill}40`}
                    strokeWidth="1"
                  />
                )}
                {/* Background circle */}
                <circle
                  cx={node.x} cy={node.y} r={R}
                  fill={isHovered ? s.fill : `${s.fill}20`}
                  stroke={s.ring}
                  strokeWidth={isHovered ? 0 : 2.5}
                  filter={isHovered ? `url(#glow-${node.status})` : undefined}
                  style={{ transition: 'all 0.2s' }}
                />
                {/* Label */}
                {lines.map((line, li) => (
                  <text
                    key={li}
                    x={node.x}
                    y={node.y + (li - (lines.length - 1) / 2) * 13 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fill: isHovered ? s.text : s.ring,
                      fontSize: '9.5px',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      transition: 'all 0.2s',
                    }}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}

          {/* Hovered tooltip box */}
          {hovered && (() => {
            const s = statusStyle[hovered.status];
            const tx = hovered.x > W / 2 ? hovered.x - 160 : hovered.x + 45;
            const ty = Math.max(20, Math.min(H - 70, hovered.y - 25));
            return (
              <g>
                <rect x={tx} y={ty} width={140} height={s.tooltip ? 80 : 54} rx={8} ry={8}
                  fill={COLORS.bgCard} stroke={s.ring} strokeWidth="1.5"
                  style={{ filter: '0 4px 12px rgba(0,0,0,0.12)' }}
                />
                <text x={tx + 10} y={ty + 18}
                  style={{ fill: s.ring, fontSize: '10px', fontWeight: 700, fontFamily: "'DM Sans'" }}>
                  {hovered.label.replace('\n', ' ')}
                </text>
                <rect x={tx + 8} y={ty + 26} width={58} height={14} rx={6}
                  fill={`${s.fill}20`} stroke={`${s.fill}50`} strokeWidth="0.8"
                />
                <text x={tx + 37} y={ty + 35} textAnchor="middle"
                  style={{ fill: s.ring, fontSize: '8px', fontWeight: 700, fontFamily: "'Inter'" }}>
                  {s.label}
                </text>
                {s.tooltip && (
                   <foreignObject x={tx + 10} y={ty + 44} width={120} height={32}>
                     <div xmlns="http://www.w3.org/1999/xhtml" style={{ fontSize: '8px', color: COLORS.textSecondary, fontFamily: 'Inter', lineHeight: 1.2 }}>{s.tooltip}</div>
                   </foreignObject>
                )}
              </g>
            );
          })()}
        </svg>

        {/* Legend */}
        <Box sx={{
          display: 'flex', gap: 2, flexWrap: 'wrap',
          px: 2, pb: 2, pt: 1,
          borderTop: `1px solid ${COLORS.divider}`,
        }}>
          {Object.entries(statusStyle).map(([status, s]) => (
            <Tooltip key={status} title={s.tooltip || ''} arrow placement="top" disableHoverListener={!s.tooltip}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7, cursor: s.tooltip ? 'help' : 'default' }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: s.fill, flexShrink: 0 }} />
                <Typography variant="caption" sx={{ color: COLORS.textMuted, fontSize: '0.68rem', textDecoration: s.tooltip ? `underline dotted ${COLORS.textMuted}` : 'none' }}>{s.label}</Typography>
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// ─── §4A: Step-wise error analysis ───────────────────────────────────────────
const stepStyles = {
  correct: { bg: `${COLORS.green}10`, border: COLORS.green, dot: COLORS.green, icon: '✓', textColor: COLORS.greenDark },
  error: { bg: `${COLORS.amber}10`, border: COLORS.amber, dot: COLORS.amber, icon: '✗', textColor: COLORS.amberDark },
  skipped: { bg: COLORS.divider, border: COLORS.border, dot: COLORS.textMuted, icon: '—', textColor: COLORS.textMuted },
};

function StepRow({ step, label, status, note }) {
  const s = stepStyles[status];
  return (
    <Box sx={{
      display: 'flex', gap: 1.5, p: '10px 14px',
      borderRadius: '10px', background: s.bg,
      border: `1px solid ${s.border}28`, mb: 0.8,
      transition: 'all 0.15s',
      '&:hover': { transform: 'translateX(2px)' },
    }}>
      <Box sx={{
        width: 24, height: 24, borderRadius: '50%',
        background: s.dot, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.72rem', fontWeight: 800, flexShrink: 0,
      }}>{s.icon}</Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.2 }}>
          <Typography sx={{ fontSize: '0.68rem', fontWeight: 600, color: COLORS.textMuted }}>Step {step}</Typography>
          <Chip label={status} size="small" sx={{ height: 16, fontSize: '0.58rem', fontWeight: 700, background: `${s.dot}18`, color: s.textColor, '& .MuiChip-label': { px: 0.7 } }} />
        </Box>
        <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: COLORS.textPrimary, mb: 0.2 }}>{label}</Typography>
        <Typography variant="caption" sx={{ color: COLORS.textSecondary, lineHeight: 1.5 }}>{note}</Typography>
      </Box>
    </Box>
  );
}

function ErrorAnalysisSection() {
  const [expanded, setExpanded] = useState('Q1');
  return (
    <Box>
      <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>🔹 Step-wise Error Analysis</Typography>
      {questions.map(q => {
        const isOpen = expanded === q.id;
        const errors = q.steps.filter(s => s.status === 'error').length;
        return (
          <Card key={q.id} elevation={0} sx={{ mb: 2, border: isOpen ? `1px solid ${COLORS.amber}40` : undefined }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, cursor: 'pointer' }} onClick={() => setExpanded(isOpen ? null : q.id)}>
                <Box sx={{ px: 1.5, py: 0.5, borderRadius: '8px', background: `${COLORS.purple}15`, border: `1px solid ${COLORS.purple}30`, flexShrink: 0 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.75rem', color: COLORS.purple }}>{q.id}</Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
                    <Chip label={q.topic} size="small" sx={{ height: 20, fontSize: '0.68rem', fontWeight: 600, background: `${COLORS.blue}12`, color: COLORS.blue, '& .MuiChip-label': { px: 1 } }} />
                    <Chip label={`${errors} error${errors > 1 ? 's' : ''}`} size="small" sx={{ height: 20, fontSize: '0.68rem', fontWeight: 700, background: `${COLORS.amber}15`, color: COLORS.amberDark, '& .MuiChip-label': { px: 1 } }} />
                  </Box>
                  <Typography sx={{ fontStyle: 'italic', color: COLORS.textSecondary, fontSize: '0.83rem' }}>"{q.question}"</Typography>
                </Box>
                <Typography sx={{ color: COLORS.textMuted, transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none', mt: 0.5 }}>▾</Typography>
              </Box>

              {isOpen && (
                <Box sx={{ mt: 2 }}>
                  {q.steps.map(s => <StepRow key={s.step} {...s} />)}
                  <Box sx={{ mt: 2, p: 2, borderRadius: '10px', background: `${COLORS.blue}08`, border: `1px solid ${COLORS.blue}20` }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', color: COLORS.blue, mb: 0.5 }}>👉 Insight</Typography>
                    <Typography variant="body2" sx={{ color: COLORS.textPrimary }}>{q.insight}</Typography>
                  </Box>
                  <Box sx={{ mt: 1, p: 2, borderRadius: '10px', background: `${COLORS.amber}08`, border: `1px solid ${COLORS.amber}22` }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', color: COLORS.amberDark, mb: 0.5 }}>⚡ Root Cause</Typography>
                    <Typography variant="body2" sx={{ color: COLORS.textPrimary }}>{q.rootCause}</Typography>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}

// ─── §4B: Concept-level gaps ─────────────────────────────────────────────────
function ConceptGapsSection() {
  const sevStyle = {
    high: { color: COLORS.amber, bg: `${COLORS.amber}12`, label: '🔴 High', tooltip: 'High priority topic not started or showing critical weakness.' },
    medium: { color: COLORS.yellow, bg: `${COLORS.yellow}12`, label: '🟡 Medium', tooltip: 'Needs review.' },
    low: { color: COLORS.blue, bg: `${COLORS.blue}10`, label: '🔵 Low', tooltip: 'On track but could use optimization.' },
  };
  return (
    <Box>
      <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>🔹 Concept-Level Progress Updates</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {conceptGaps.map(g => {
          const s = sevStyle[g.severity];
          return (
            <Box key={g.label} sx={{
              display: 'flex', alignItems: 'center', gap: 1.5,
              p: '10px 14px', borderRadius: '10px',
              background: s.bg, border: `1px solid ${s.color}25`,
              transition: 'all 0.15s',
              '&:hover': { transform: 'translateX(3px)' },
            }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
              <Typography sx={{ fontWeight: 600, fontSize: '0.83rem', color: COLORS.textPrimary, flexGrow: 1 }}>{g.label}</Typography>
              <Typography variant="caption" sx={{ color: COLORS.textMuted }}>
                {g.subject} · {g.attempts} attempts
              </Typography>
              <Tooltip title={s.tooltip} placement="top" arrow>
                <Chip label={s.label} size="small" sx={{ cursor: 'help', height: 18, fontSize: '0.62rem', fontWeight: 700, background: `${s.color}15`, color: s.color, '& .MuiChip-label': { px: 0.8 } }} />
              </Tooltip>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function E3_ErrorAnalysis() {
  const navigate = useNavigate();

  return (
    <Layout
      role="educator"
      title="Chapter Diagnosis — Trigonometry"
      subtitle="Step-wise errors · Concept gaps · Prerequisite gap map"
    >
      <Box sx={{ mb: 3 }}>
        <Button 
          onClick={() => navigate('/educator/overview')} 
          sx={{ 
            color: COLORS.textSecondary, fontWeight: 700, fontSize: '0.85rem',
            background: `${COLORS.bgNav}`, borderRadius: '8px', px: 2, py: 1,
            border: `1px solid ${COLORS.border}`,
            '&:hover': { background: COLORS.divider }
          }}
        >
          ← Back to Student View
        </Button>
      </Box>

      <Grid container spacing={2.5}>

        {/* §4A: Error analysis (left) + §4B: Concept gaps (right top) + §4C Gap Map (right bottom) */}
        <Grid item xs={12} md={6}>
          <Card elevation={0}>
            <CardContent>
              <ErrorAnalysisSection />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {/* §4B */}
            <Card elevation={0}>
              <CardContent>
                <ConceptGapsSection />
              </CardContent>
            </Card>

            {/* §4C — Prerequisite Gap Map */}
            <Card elevation={0}>
              <CardContent>
                <PrereqGapMap />
              </CardContent>
            </Card>
          </Box>
        </Grid>

      </Grid>
    </Layout>
  );
}
