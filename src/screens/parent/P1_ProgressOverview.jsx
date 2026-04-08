// src/screens/parent/P1_ProgressOverview.jsx
import React from 'react';
import {
  Box, Typography, Card, CardContent, Chip, LinearProgress,
  Grid, Divider,
} from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── Mini stat card ───────────────────────────────────────────────────────────
function StatBadge({ label, value, color }) {
  return (
    <Box sx={{
      px: 2, py: 1.5,
      background: `${color}12`,
      border: `1px solid ${color}30`,
      borderRadius: '12px',
      textAlign: 'center',
      minWidth: 90,
    }}>
      <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color, fontFamily: "'DM Sans'" }}>{value}</Typography>
      <Typography variant="caption" sx={{ color: COLORS.textMuted, display: 'block', mt: 0.3 }}>{label}</Typography>
    </Box>
  );
}

// ─── Plant growth visual ──────────────────────────────────────────────────────
function PlantGrowthVisual({ level }) {
  // level: 0=seed, 1=sprout, 2=growth, 3=maturity
  const stages = [
    { label: 'Seed', emoji: '🌱', done: level >= 0 },
    { label: 'Sprout', emoji: '🌿', done: level >= 1 },
    { label: 'Growth', emoji: '🪴', done: level >= 2 },
    { label: 'Maturity', emoji: '🌳', done: level >= 3 },
  ];
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 3, justifyContent: 'center', py: 1 }}>
      {stages.map((s, i) => (
        <Box key={i} sx={{ textAlign: 'center', opacity: s.done ? 1 : 0.3, transition: 'opacity 0.3s' }}>
          <Box sx={{
            fontSize: i === level ? '2.4rem' : '1.6rem',
            lineHeight: 1,
            filter: s.done ? 'none' : 'grayscale(1)',
            transition: 'font-size 0.3s',
          }}>{s.emoji}</Box>
          <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: s.done ? COLORS.green : COLORS.textMuted, fontWeight: s.done ? 600 : 400 }}>
            {s.label}
          </Typography>
          {i < stages.length - 1 && (
            <Box sx={{
              position: 'absolute',
              // connector handled by gap
            }} />
          )}
        </Box>
      ))}
    </Box>
  );
}

// ─── Subject progress row ─────────────────────────────────────────────────────
function SubjectRow({ label, value, color }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, color: COLORS.textPrimary }}>{label}</Typography>
        <Typography variant="body2" sx={{ fontWeight: 700, color }}>{value}%</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 8,
          borderRadius: 8,
          background: `${color}18`,
          '& .MuiLinearProgress-bar': { background: `linear-gradient(90deg, ${color}cc, ${color})` },
        }}
      />
    </Box>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────
export default function P1_ProgressOverview() {
  return (
    <Layout
      role="parent"
      title="Aarav's Progress"
      subtitle="Grade 10 · NIOS Board · Last updated today"
    >
      <Grid container spacing={2.5}>

        {/* ── Hero Card: Big number + trajectory ── */}
        <Grid item xs={12} md={7}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                <Box>
                  <Typography variant="overline">Monthly Progress</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 0.5 }}>
                    <Typography sx={{
                      fontSize: '3.8rem',
                      fontWeight: 800,
                      color: COLORS.green,
                      lineHeight: 1,
                      fontFamily: "'DM Sans'",
                      letterSpacing: '-0.03em',
                    }}>+20%</Typography>
                    <Typography sx={{ color: COLORS.textMuted, fontSize: '1rem', fontWeight: 500 }}>this month</Typography>
                  </Box>
                </Box>
                <Chip
                  label="↑ Improving"
                  sx={{
                    background: `${COLORS.green}18`,
                    color: COLORS.greenDark,
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    border: `1px solid ${COLORS.green}35`,
                  }}
                />
              </Box>

              {/* Supportive message */}
              <Box sx={{
                background: `linear-gradient(135deg, ${COLORS.green}10, ${COLORS.blue}08)`,
                border: `1px solid ${COLORS.green}25`,
                borderRadius: '12px',
                p: 2,
                mb: 3,
              }}>
                <Typography sx={{ fontSize: '0.92rem', color: COLORS.textPrimary, lineHeight: 1.6 }}>
                  🎉 <strong>Aarav is making great progress!</strong> He has improved consistently over the past 4 weeks and is developing strong understanding across core subjects.
                </Typography>
              </Box>

              {/* Level transition */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="overline" sx={{ mb: 1.5, display: 'block' }}>Learning Journey</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip label="Developing" sx={{ background: `${COLORS.yellow}20`, color: COLORS.yellowDark, fontWeight: 600, border: `1px solid ${COLORS.yellow}40` }} />
                  <Typography sx={{ color: COLORS.textMuted, fontSize: '1.2rem' }}>→</Typography>
                  <Chip label="Proficient" sx={{ background: `${COLORS.green}20`, color: COLORS.greenDark, fontWeight: 600, border: `1px solid ${COLORS.green}40` }} />
                  <Typography variant="caption" sx={{ ml: 1, color: COLORS.textMuted }}>in progress</Typography>
                </Box>
              </Box>

              {/* Plant growth */}
              <Typography variant="overline" sx={{ mb: 1.5, display: 'block' }}>Growth Stage</Typography>
              <PlantGrowthVisual level={2} />
            </CardContent>
          </Card>
        </Grid>

        {/* ── Quick Stats column ── */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, height: '100%' }}>

            {/* Stats row */}
            <Card elevation={0}>
              <CardContent>
                <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>At a glance</Typography>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                  <StatBadge label="Accuracy" value="72%" color={COLORS.green} />
                  <StatBadge label="Attempted" value="146" color={COLORS.blue} />
                  <StatBadge label="Streak" value="12d" color={COLORS.yellow} />
                  <StatBadge label="Hours/wk" value="3.5h" color={COLORS.purple} />
                </Box>
              </CardContent>
            </Card>

            {/* Subject overview */}
            <Card elevation={0} sx={{ flexGrow: 1 }}>
              <CardContent>
                <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>Subject Overview</Typography>
                <SubjectRow label="Mathematics" value={68} color={COLORS.blue} />
                <SubjectRow label="Science" value={52} color={COLORS.yellow} />
                <SubjectRow label="English" value={80} color={COLORS.green} />
                <SubjectRow label="Social Sci." value={61} color={COLORS.purple} />

                <Divider sx={{ my: 2 }} />

                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 0.5,
                }}>
                  <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>Overall average</Typography>
                  <Typography sx={{ fontWeight: 700, color: COLORS.green, fontSize: '0.9rem' }}>65.3%</Typography>
                </Box>
              </CardContent>
            </Card>

          </Box>
        </Grid>

        {/* ── Trajectory card - full width bottom ── */}
        <Grid item xs={12}>
          <Card elevation={0}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">4-Week Performance Trend</Typography>
                <Chip label="Improving overall" size="small" sx={{ background: `${COLORS.green}15`, color: COLORS.greenDark, fontWeight: 600, fontSize: '0.72rem', border: `1px solid ${COLORS.green}30` }} />
              </Box>

              {/* Simple sparkline-style visual */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 80 }}>
                {[52, 58, 63, 72].map((val, i) => (
                  <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, flex: 1 }}>
                    <Typography sx={{ fontWeight: 700, color: i === 3 ? COLORS.green : COLORS.textSecondary, fontSize: '0.85rem' }}>{val}%</Typography>
                    <Box sx={{
                      width: '100%',
                      height: `${(val / 100) * 50}px`,
                      background: i === 3
                        ? `linear-gradient(180deg, ${COLORS.green}cc, ${COLORS.green}44)`
                        : `linear-gradient(180deg, ${COLORS.blue}80, ${COLORS.blue}20)`,
                      borderRadius: '6px 6px 4px 4px',
                      transition: 'height 0.4s',
                    }} />
                    <Typography variant="caption" sx={{ color: COLORS.textMuted }}>Wk {i + 1}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
}
