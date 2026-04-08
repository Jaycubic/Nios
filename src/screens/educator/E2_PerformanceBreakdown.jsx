import React from 'react';
import { Box, Typography, Card, CardContent, Chip, LinearProgress, Grid, Divider, Tooltip } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

const subjects = [
  { label: 'Mathematics', value: 68, color: COLORS.blue,   icon: '📐' },
  { label: 'Science',     value: 52, color: COLORS.yellow, icon: '🔬' },
  { label: 'English',     value: 80, color: COLORS.green,  icon: '📖' },
  { label: 'Social Sci.', value: 61, color: COLORS.purple, icon: '🌍' },
];

// Chapter data: { label, score }  score: 0=not attempted, 1-100
const mathChapters = [
  { label: 'Number Systems',       score: 82 },
  { label: 'Polynomials',          score: 38 },
  { label: 'Linear Equations',     score: 74 },
  { label: 'Coordinate Geometry',  score: 0  },
  { label: 'Triangles',            score: 65 },
  { label: 'Circles',              score: 55 },
  { label: 'Statistics',           score: 0  },
  { label: 'Probability',          score: 72 },
];

const scienceChapters = [
  { label: 'Chemical Reactions',   score: 42 },
  { label: 'Acids & Bases',        score: 58 },
  { label: 'Metals & Non-Metals',  score: 0  },
  { label: 'Carbon Compounds',     score: 0  },
  { label: 'Life Processes',       score: 67 },
  { label: 'Electricity',          score: 50 },
];

function scoreToColor(score) {
  if (score === 0)    return COLORS.divider;
  if (score >= 75)    return COLORS.green;
  if (score >= 50)    return COLORS.yellow;
  return COLORS.amber;
}

function scoreToLabel(score) {
  if (score === 0)    return 'Not attempted';
  if (score >= 75)    return 'Strong';
  if (score >= 50)    return 'Developing';
  return 'Needs support';
}

// ─── Heatmap cell ─────────────────────────────────────────────────────────────
function HeatCell({ label, score }) {
  const bg = scoreToColor(score);
  return (
    <Tooltip title={`${label}: ${score === 0 ? 'Not attempted' : score + '%'}`} arrow>
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 1.5,
        p: '8px 10px',
        borderRadius: '8px',
        background: score === 0 ? COLORS.divider : `${bg}18`,
        border: `1px solid ${bg}35`,
        cursor: 'default',
        transition: 'all 0.15s',
        '&:hover': { background: `${bg}28`, transform: 'scale(1.01)' },
      }}>
        <Box sx={{
          width: 10, height: 10, borderRadius: '50%',
          background: bg, flexShrink: 0,
        }} />
        <Typography sx={{ fontSize: '0.78rem', fontWeight: 500, color: COLORS.textPrimary, flexGrow: 1, fontFamily: "'Inter'" }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: score === 0 ? COLORS.textMuted : bg, fontFamily: "'DM Sans'" }}>
          {score === 0 ? '—' : `${score}%`}
        </Typography>
      </Box>
    </Tooltip>
  );
}

// ─── Subject bar ──────────────────────────────────────────────────────────────
function SubjectBar({ label, value, color, icon }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Typography sx={{ fontSize: '1rem' }}>{icon}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: COLORS.textPrimary, flexGrow: 1 }}>{label}</Typography>
        <Typography sx={{ fontWeight: 800, fontSize: '1rem', color, fontFamily: "'DM Sans'" }}>{value}%</Typography>
        <Chip
          label={scoreToLabel(value)}
          size="small"
          sx={{
            fontSize: '0.65rem', height: 20,
            background: `${color}18`, color,
            fontWeight: 600,
            border: `1px solid ${color}30`,
            '& .MuiChip-label': { px: 1 },
          }}
        />
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 10,
          borderRadius: 8,
          background: `${color}14`,
          '& .MuiLinearProgress-bar': { background: `linear-gradient(90deg, ${color}aa, ${color})` },
        }}
      />
    </Box>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────
function HeatLegend() {
  const items = [
    { label: 'Strong (≥75%)',     color: COLORS.green  },
    { label: 'Developing (50-74%)', color: COLORS.yellow },
    { label: 'Needs support (<50%)', color: COLORS.amber  },
    { label: 'Not attempted',     color: COLORS.divider },
  ];
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 1 }}>
      {items.map(it => (
        <Box key={it.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: it.color }} />
          <Typography variant="caption" sx={{ color: COLORS.textMuted }}>{it.label}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default function E2_PerformanceBreakdown() {
  return (
    <Layout
      role="educator"
      title="Performance Breakdown — Aarav Mehta"
      subtitle="Subject-wise accuracy and chapter-level heatmap"
    >
      <Grid container spacing={2.5}>

        {/* ── Subject bars ── */}
        <Grid item xs={12} md={5}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="overline" sx={{ display: 'block', mb: 2.5 }}>Subject-wise Performance</Typography>
              {subjects.map(s => <SubjectBar key={s.label} {...s} />)}

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ color: COLORS.textSecondary, fontWeight: 500 }}>Weighted average</Typography>
                <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: COLORS.blue, fontFamily: "'DM Sans'" }}>65.3%</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Chapter heatmap ── */}
        <Grid item xs={12} md={7}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="overline">Chapter-Level Heatmap</Typography>
                <Chip label="Tap cell for detail" size="small" sx={{ background: COLORS.divider, color: COLORS.textMuted, fontSize: '0.68rem' }} />
              </Box>
              <HeatLegend />

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: COLORS.blue }}>📐 Mathematics</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6, mb: 2 }}>
                  {mathChapters.map(c => <HeatCell key={c.label} {...c} />)}
                </Box>

                <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: COLORS.yellow }}>🔬 Science</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.6 }}>
                  {scienceChapters.map(c => <HeatCell key={c.label} {...c} />)}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Insight bar ── */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{ background: `${COLORS.blue}08`, border: `1px solid ${COLORS.blue}22` }}>
            <CardContent sx={{ py: '14px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Typography sx={{ fontSize: '1.1rem' }}>📊</Typography>
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  <strong>4 of 14 chapters not started.</strong> Coordinate Geometry and Statistics (Math) + Metals & Carbon Compounds (Science) are untouched — these need to be scheduled soon.
                </Typography>
                <Chip label="4 gaps detected" sx={{ background: `${COLORS.amber}18`, color: COLORS.amberDark, fontWeight: 700, fontSize: '0.75rem', border: `1px solid ${COLORS.amber}35` }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
}
