import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Chip, Grid, Divider, Button, Tooltip,
} from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── §4A: Step-wise error data ────────────────────────────────────────────────
const questions = [
  {
    id: 'Q1', topic: 'Quadratic Equations',
    question: 'Solve: x² - 5x + 6 = 0',
    steps: [
      { step: 1, label: 'Formula recall',     status: 'correct',  note: 'Correctly recalled quadratic formula'           },
      { step: 2, label: 'Substitution',       status: 'error',    note: 'Substituted wrong values for b and c'           },
      { step: 3, label: 'Calculation',         status: 'error',    note: 'Arithmetic error in discriminant computation'   },
    ],
    insight: 'Student understands formula but fails in execution',
    rootCause: 'Procedural gap: knows the method but makes substitution errors under pressure',
  },
  {
    id: 'Q2', topic: 'Trigonometry',
    question: 'Find sin(30°) + cos(60°)',
    steps: [
      { step: 1, label: 'Recall sin(30°)',    status: 'correct',  note: 'Correctly recalled as 1/2'                      },
      { step: 2, label: 'Recall cos(60°)',    status: 'error',    note: 'Confused with cos(30°) = √3/2'                  },
      { step: 3, label: 'Addition',           status: 'skipped',  note: 'Not attempted — error in step 2'                },
    ],
    insight: 'Trigonometric table recall is inconsistent — confuses 30° and 60° values',
    rootCause: 'Memory gap in trig value table, especially complementary angles',
  },
];

// ─── §4B: Concept gap data ────────────────────────────────────────────────────
const conceptGaps = [
  { label: 'Quadratic Formula application', subject: 'Math',    attempts: 5, severity: 'high'   },
  { label: 'Trigonometric identities',      subject: 'Math',    attempts: 4, severity: 'high'   },
  { label: 'Chemical Reactions balance',    subject: 'Science', attempts: 3, severity: 'medium' },
  { label: 'BODMAS — order of operations',  subject: 'Math',    attempts: 2, severity: 'medium' },
];

// ─── §4C: Prerequisite gap map nodes/edges ────────────────────────────────────
// Node: { id, label, x, y, status }
// status: mastered | proficient | developing | gap | blocked
const mapNodes = [
  // Level 0: Foundation
  { id: 'n1',  label: 'Basic\nArithmetic',    x: 80,  y: 60,  status: 'mastered'   },
  { id: 'n2',  label: 'Fractions',            x: 80,  y: 160, status: 'gap'        },
  { id: 'n3',  label: 'BODMAS',              x: 80,  y: 260, status: 'gap'        },
  // Level 1: Intermediate
  { id: 'n4',  label: 'Algebra\nBasics',      x: 260, y: 100, status: 'developing' },
  { id: 'n5',  label: 'Exponents &\nRoots',   x: 260, y: 210, status: 'developing' },
  { id: 'n6',  label: 'Linear\nEquations',    x: 260, y: 300, status: 'proficient' },
  // Level 2: Advanced
  { id: 'n7',  label: 'Quadratic\nFormula',   x: 450, y: 80,  status: 'blocked'    },
  { id: 'n8',  label: 'Trigonometry',         x: 450, y: 200, status: 'blocked'    },
  { id: 'n9',  label: 'Polynomials',          x: 450, y: 310, status: 'gap'        },
];

const mapEdges = [
  { from: 'n1', to: 'n4' },
  { from: 'n2', to: 'n4' },
  { from: 'n2', to: 'n5' },
  { from: 'n3', to: 'n6' },
  { from: 'n4', to: 'n7' },
  { from: 'n4', to: 'n9' },
  { from: 'n5', to: 'n7' },
  { from: 'n5', to: 'n8' },
  { from: 'n6', to: 'n9' },
];

const levelLabels = [
  { label: 'Foundation', x: 80,  y: 14 },
  { label: 'Intermediate', x: 260, y: 14 },
  { label: 'Advanced',   x: 450, y: 14 },
];

const statusStyle = {
  mastered:   { fill: COLORS.green,    ring: COLORS.green,    label: 'Mastered',   text: '#fff' },
  proficient: { fill: COLORS.blue,     ring: COLORS.blue,     label: 'Proficient', text: '#fff' },
  developing: { fill: COLORS.yellow,   ring: COLORS.yellow,   label: 'Developing', text: '#fff' },
  gap:        { fill: COLORS.amber,    ring: COLORS.amber,    label: 'Gap',        text: '#fff' },
  blocked:    { fill: '#B91C1C',       ring: '#B91C1C',       label: 'Blocked',    text: '#fff' },
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
        🔗 Prerequisite Gap Map
      </Typography>
      <Typography variant="caption" sx={{ color: COLORS.textSecondary, display: 'block', mb: 2 }}>
        Hover a concept node to see details. Blocked nodes cannot be unlocked until prerequisite gaps are resolved.
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
            const to   = nodeById[e.to];
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
                <rect x={tx} y={ty} width={140} height={54} rx={8} ry={8}
                  fill={COLORS.bgCard} stroke={s.ring} strokeWidth="1.5"
                  style={{ filter: '0 4px 12px rgba(0,0,0,0.12)' }}
                />
                <text x={tx + 10} y={ty + 18}
                  style={{ fill: s.ring, fontSize: '10px', fontWeight: 700, fontFamily: "'DM Sans'" }}>
                  {hovered.label.replace('\n', ' ')}
                </text>
                <rect x={tx + 8} y={ty + 26} width={50} height={14} rx={6}
                  fill={`${s.fill}20`} stroke={`${s.fill}50`} strokeWidth="0.8"
                />
                <text x={tx + 33} y={ty + 35} textAnchor="middle"
                  style={{ fill: s.ring, fontSize: '8px', fontWeight: 700, fontFamily: "'Inter'" }}>
                  {s.label}
                </text>
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
            <Box key={status} sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: s.fill, flexShrink: 0 }} />
              <Typography variant="caption" sx={{ color: COLORS.textMuted, fontSize: '0.68rem' }}>{s.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// ─── §4A: Step-wise error analysis ───────────────────────────────────────────
const stepStyles = {
  correct: { bg: `${COLORS.green}10`,  border: COLORS.green,  dot: COLORS.green,     icon: '✓', textColor: COLORS.greenDark  },
  error:   { bg: `${COLORS.amber}10`,  border: COLORS.amber,  dot: COLORS.amber,     icon: '✗', textColor: COLORS.amberDark  },
  skipped: { bg: COLORS.divider,       border: COLORS.border, dot: COLORS.textMuted, icon: '—', textColor: COLORS.textMuted  },
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
    high:   { color: COLORS.amber,  bg: `${COLORS.amber}12`,  label: '🔴 High'   },
    medium: { color: COLORS.yellow, bg: `${COLORS.yellow}12`, label: '🟡 Medium' },
    low:    { color: COLORS.blue,   bg: `${COLORS.blue}10`,   label: '🔵 Low'    },
  };
  return (
    <Box>
      <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>🔹 Concept-Level Gaps</Typography>
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
              <Chip label={s.label} size="small" sx={{ height: 18, fontSize: '0.62rem', fontWeight: 700, background: `${s.color}15`, color: s.color, '& .MuiChip-label': { px: 0.8 } }} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function E3_ErrorAnalysis() {
  return (
    <Layout
      role="educator"
      title="Learning Diagnosis — Rahul Sharma"
      subtitle="Mode 2 §4: Step-wise errors · Concept gaps · Prerequisite gap map"
    >
      <Grid container spacing={2.5}>

        {/* Dark summary bar */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{ background: COLORS.bgDark, border: 'none' }}>
            <CardContent sx={{ py: '16px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                <Typography sx={{ color: '#fff', fontWeight: 700, fontFamily: "'DM Sans'" }}>🧠 Learning Diagnosis</Typography>
                {[
                  { label: 'Questions analysed', value: '2',  color: COLORS.blue   },
                  { label: 'Steps checked',       value: '6',  color: COLORS.purple },
                  { label: 'Errors found',        value: '4',  color: COLORS.amber  },
                  { label: 'Correct steps',       value: '2',  color: COLORS.green  },
                  { label: 'Concept gaps',        value: '4',  color: COLORS.yellow },
                  { label: 'Blocked  concepts',   value: '2',  color: '#EF4444'     },
                ].map(s => (
                  <Box key={s.label} sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 900, fontSize: '1.2rem', color: s.color, fontFamily: "'DM Sans'", lineHeight: 1 }}>{s.value}</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.68rem' }}>{s.label}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* §4A: Error analysis (left) + §4B: Concept gaps (right top) + §4C Gap Map (right bottom) */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
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
