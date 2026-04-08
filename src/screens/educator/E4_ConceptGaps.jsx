import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Grid, Divider } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

const conceptGaps = [
  { label: 'Fraction Division',    subject: 'Math',    severity: 'high',   attempts: 6, lastErr: '3 days ago' },
  { label: 'Square Root Rules',    subject: 'Math',    severity: 'high',   attempts: 4, lastErr: '1 day ago'  },
  { label: 'BODMAS / Order of Ops',subject: 'Math',    severity: 'medium', attempts: 3, lastErr: '5 days ago' },
  { label: 'Chemical Balancing',   subject: 'Science', severity: 'medium', attempts: 2, lastErr: '4 days ago' },
  { label: 'Acid-Base Reactions',  subject: 'Science', severity: 'low',    attempts: 1, lastErr: '7 days ago' },
  { label: 'Periodic Trends',      subject: 'Science', severity: 'low',    attempts: 1, lastErr: '6 days ago' },
];

const prereqChains = [
  {
    chain: [
      { label: 'Fractions',       status: 'gap' },
      { label: 'Algebra Basics',  status: 'weak' },
      { label: 'Polynomials',     status: 'failing' },
    ],
    explanation: 'Weak fractions directly impacts ability to manipulate polynomial expressions',
  },
  {
    chain: [
      { label: 'Square Roots',    status: 'gap' },
      { label: 'Exponents',       status: 'weak' },
      { label: 'Trigonometry',    status: 'blocked' },
    ],
    explanation: 'Trigonometry is fully blocked without understanding of square root simplification',
  },
  {
    chain: [
      { label: 'BODMAS',          status: 'gap' },
      { label: 'Equations',       status: 'weak' },
      { label: 'Linear Systems',  status: 'affected' },
    ],
    explanation: 'Order of operations errors cascade into multi-step equation solving',
  },
];

const chainStatusStyle = {
  gap:      { bg: `${COLORS.amber}20`,  border: `${COLORS.amber}45`,  color: COLORS.amberDark,   label: 'Gap'      },
  weak:     { bg: `${COLORS.yellow}18`, border: `${COLORS.yellow}40`, color: COLORS.yellowDark,  label: 'Weak'     },
  failing:  { bg: `${COLORS.amber}30`,  border: `${COLORS.amber}60`,  color: COLORS.amberDark,   label: 'Failing'  },
  blocked:  { bg: `${COLORS.amber}15`,  border: `${COLORS.amber}35`,  color: COLORS.amberDark,   label: 'Blocked'  },
  affected: { bg: `${COLORS.yellow}12`, border: `${COLORS.yellow}30`, color: COLORS.yellowDark,  label: 'Affected' },
};

const severityStyle = {
  high:   { bg: `${COLORS.amber}18`,  color: COLORS.amberDark,  label: 'High priority'   },
  medium: { bg: `${COLORS.yellow}18`, color: COLORS.yellowDark, label: 'Medium priority' },
  low:    { bg: `${COLORS.blue}14`,   color: COLORS.blue,       label: 'Low priority'    },
};

function GapPill({ label, subject, severity, attempts, lastErr }) {
  const ss = severityStyle[severity];
  return (
    <Box sx={{
      p: '10px 14px',
      borderRadius: '10px',
      background: ss.bg,
      border: `1px solid ${ss.color}30`,
      mb: 1,
      display: 'flex', alignItems: 'center', gap: 1.5,
      transition: 'all 0.15s',
      '&:hover': { transform: 'translateX(3px)' },
    }}>
      <Box sx={{
        width: 32, height: 32, borderRadius: '8px',
        background: `${ss.color}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Typography sx={{ fontSize: '0.7rem', fontWeight: 800, color: ss.color }}>!</Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: COLORS.textPrimary }}>{label}</Typography>
        <Typography variant="caption" sx={{ color: COLORS.textMuted }}>{subject} · {attempts} attempts · last error {lastErr}</Typography>
      </Box>
      <Chip label={ss.label} size="small" sx={{ height: 20, fontSize: '0.63rem', fontWeight: 700, background: `${ss.color}15`, color: ss.color, border: `1px solid ${ss.color}30`, '& .MuiChip-label': { px: 1 } }} />
    </Box>
  );
}

function PrereqChain({ chain, explanation }) {
  return (
    <Box sx={{
      p: 2, borderRadius: '12px',
      background: `${COLORS.amber}06`,
      border: `1px solid ${COLORS.amber}22`,
      mb: 2,
    }}>
      {/* Node chain */}
      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
        {chain.map((node, i) => {
          const ns = chainStatusStyle[node.status];
          return (
            <React.Fragment key={i}>
              <Box sx={{
                px: 1.5, py: 0.6,
                borderRadius: '20px',
                background: ns.bg,
                border: `1px solid ${ns.border}`,
                display: 'flex', alignItems: 'center', gap: 0.5,
              }}>
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: ns.color }}>{node.label}</Typography>
                <Chip label={ns.label} size="small" sx={{ height: 16, fontSize: '0.6rem', fontWeight: 600, background: 'transparent', color: ns.color, '& .MuiChip-label': { px: 0.5 } }} />
              </Box>
              {i < chain.length - 1 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.2, color: COLORS.amberDark }}>
                  <Typography sx={{ fontSize: '0.7rem', color: COLORS.textMuted, fontFamily: "'Inter'" }}>needs for</Typography>
                  <Typography sx={{ fontSize: '1rem', color: COLORS.amber }}>→</Typography>
                </Box>
              )}
            </React.Fragment>
          );
        })}
      </Box>
      <Typography variant="caption" sx={{ color: COLORS.textSecondary, lineHeight: 1.5, display: 'block' }}>{explanation}</Typography>
    </Box>
  );
}

export default function E4_ConceptGaps() {
  const high   = conceptGaps.filter(g => g.severity === 'high');
  const medium = conceptGaps.filter(g => g.severity === 'medium');
  const low    = conceptGaps.filter(g => g.severity === 'low');

  return (
    <Layout
      role="educator"
      title="Concept Gaps & Prerequisite Chains — Aarav Mehta"
      subtitle="What's missing and what it's blocking downstream"
    >
      <Grid container spacing={2.5}>

        {/* ── Concept gap list ── */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="overline">Concept-Level Gaps</Typography>
                <Chip label={`${conceptGaps.length} gaps identified`} size="small" sx={{ background: `${COLORS.amber}18`, color: COLORS.amberDark, fontWeight: 700, fontSize: '0.7rem', border: `1px solid ${COLORS.amber}35` }} />
              </Box>

              {high.length > 0 && (
                <>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: COLORS.amberDark, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', mb: 0.8 }}>🔴 High Priority</Typography>
                  {high.map(g => <GapPill key={g.label} {...g} />)}
                  <Divider sx={{ my: 1.5 }} />
                </>
              )}

              {medium.length > 0 && (
                <>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: COLORS.yellowDark, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', mb: 0.8 }}>🟡 Medium Priority</Typography>
                  {medium.map(g => <GapPill key={g.label} {...g} />)}
                  <Divider sx={{ my: 1.5 }} />
                </>
              )}

              {low.length > 0 && (
                <>
                  <Typography variant="caption" sx={{ fontWeight: 700, color: COLORS.blue, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', mb: 0.8 }}>🔵 Low Priority</Typography>
                  {low.map(g => <GapPill key={g.label} {...g} />)}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* ── Prerequisite chains ── */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="overline">Dependency Chains</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: COLORS.textSecondary, mb: 2.5, lineHeight: 1.6 }}>
                These show WHY advanced topics are failing — foundational gaps cascade upward. Address the leftmost node first.
              </Typography>
              {prereqChains.map((c, i) => <PrereqChain key={i} {...c} />)}

              <Box sx={{
                p: 2, borderRadius: '10px',
                background: `${COLORS.purple}10`,
                border: `1px solid ${COLORS.purple}25`,
                mt: 1,
              }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: COLORS.purpleDark, mb: 0.5 }}>💡 Key insight</Typography>
                <Typography variant="body2" sx={{ color: COLORS.textSecondary, lineHeight: 1.6 }}>
                  Resolving <strong>Fraction Division</strong> and <strong>Square Root Rules</strong> will unblock 3 downstream topics simultaneously and significantly improve overall accuracy.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
}
