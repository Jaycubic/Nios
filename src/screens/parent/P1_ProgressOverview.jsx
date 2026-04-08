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
      flex: 1,
      px: 2, py: 2,
      background: `${color}12`,
      border: `1px solid ${color}30`,
      borderRadius: '12px',
      textAlign: 'center',
      minWidth: 100,
    }}>
      <Typography sx={{ fontWeight: 700, fontSize: '1.3rem', color, fontFamily: "'DM Sans'" }}>{value}</Typography>
      <Typography variant="caption" sx={{ color: COLORS.textMuted, display: 'block', mt: 0.4, fontSize: '0.8rem' }}>{label}</Typography>
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
            <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
              {/* ── 1. Monthly Progress Section ── */}
              <Box sx={{ mb: 0 }}>
                <Typography variant="overline" sx={{ display: 'block', mb: 1.5, color: COLORS.textSecondary, fontWeight: 600, letterSpacing: 1 }}>
                  Monthly Progress
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Typography sx={{
                    fontSize: '4.2rem',
                    fontWeight: 800,
                    color: COLORS.green,
                    lineHeight: 1,
                    fontFamily: "'DM Sans'",
                    letterSpacing: '-0.04em',
                  }}>+20%</Typography>
                  <Box>
                    <Typography sx={{ color: COLORS.textPrimary, fontSize: '1.15rem', fontWeight: 700, mb: 0.2 }}>
                      overall improvement
                    </Typography>
                    <Chip
                      size="small"
                      label="↑ Up from last month"
                      sx={{
                        background: `${COLORS.green}15`,
                        color: COLORS.greenDark,
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        border: `1px solid ${COLORS.green}30`,
                      }}
                    />
                  </Box>
                </Box>

                {/* Positive emotional summary */}
                <Box sx={{
                  background: `linear-gradient(135deg, ${COLORS.green}08, ${COLORS.blue}05)`,
                  borderLeft: `4px solid ${COLORS.green}`,
                  borderRadius: '0 12px 12px 0',
                  p: 2.5,
                }}>
                  <Typography sx={{ fontSize: '1rem', color: COLORS.textPrimary, lineHeight: 1.6, fontWeight: 500 }}>
                    <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>🎉</span>
                    <strong>Aarav is flourishing!</strong> He's showing highly consistent effort over the past 4 weeks and rapidly building mastery across core subjects.
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2.5, opacity: 0.5 }} />

              {/* ── 2. Learning Journey Section ── */}
              <Box>
                <Typography variant="overline" sx={{ display: 'block', mb: 3, color: COLORS.textSecondary, fontWeight: 600, letterSpacing: 1 }}>
                  Learning Journey
                </Typography>

                {/* Movement from current to next stage */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1.5, mb: 5, px: { xs: 0, sm: 2 } }}>
                  <Box sx={{ textAlign: 'center', flex: 1.2 }}>
                    <Typography variant="caption" sx={{ color: COLORS.textSecondary, fontWeight: 600, display: 'block', mb: 1, textTransform: 'uppercase', letterSpacing: 0.5 }}>Current</Typography>
                    <Chip label="Developing" sx={{ background: `${COLORS.yellow}15`, color: COLORS.yellowDark, fontWeight: 700, fontSize: '0.95rem', py: 2.5, borderRadius: '12px', border: `1px solid ${COLORS.yellow}40`, width: '100%' }} />
                  </Box>

                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, position: 'relative' }}>
                    <Typography variant="caption" sx={{ color: COLORS.green, fontWeight: 700, position: 'absolute', top: -20, whiteSpace: 'nowrap' }}>in progress</Typography>
                    <Box sx={{ width: '100%', height: 4, background: `linear-gradient(90deg, ${COLORS.yellow}40, ${COLORS.green})`, borderRadius: 2, position: 'relative' }}>
                      <Box sx={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)', width: 12, height: 12, borderRadius: '50%', background: COLORS.green, border: '2px solid white', boxShadow: `0 0 0 3px ${COLORS.green}30` }} />
                    </Box>
                  </Box>

                  <Box sx={{ textAlign: 'center', flex: 1.2 }}>
                    <Typography variant="caption" sx={{ color: COLORS.textSecondary, fontWeight: 600, display: 'block', mb: 1, textTransform: 'uppercase', letterSpacing: 0.5 }}>Next</Typography>
                    <Chip label="Proficient" sx={{ background: `transparent`, color: COLORS.textMuted, fontWeight: 600, fontSize: '0.95rem', py: 2.5, borderRadius: '12px', border: `1px dashed ${COLORS.textMuted}`, opacity: 0.8, width: '100%' }} />
                  </Box>
                </Box>

                {/* Current growth stage visual map */}
                <Box sx={{
                  background: 'rgba(0,0,0,0.015)',
                  borderRadius: '16px',
                  p: 3,
                  border: `1px solid rgba(0,0,0,0.04)`,
                }}>
                  <PlantGrowthVisual level={2} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Quick Stats column ── */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, height: '100%' }}>

            {/* Stats row */}
            <Card elevation={0}>
              <CardContent>
                <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>Quick Learning Snapshot</Typography>
                <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                  <StatBadge label="Overall Score" value="72%" color={COLORS.green} />
                  <StatBadge label="Practice sessions" value="146" color={COLORS.blue} />
                  <StatBadge label="Day consistency" value="12-day" color={COLORS.yellow} />
                  <StatBadge label="Study time" value="3.5 hrs" color={COLORS.purple} />
                </Box>
              </CardContent>
            </Card>

            {/* Subject overview */}
            <Card elevation={0}>
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

      </Grid>
    </Layout>
  );
}