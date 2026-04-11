// src/screens/parent/P1_ProgressOverview.jsx
import React from 'react';
import {
  Box, Typography, Card, CardContent, Chip, LinearProgress,
  Grid
} from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

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
    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: { xs: 2, sm: 4 }, justifyContent: 'center', py: 1 }}>
      {stages.map((s, i) => (
        <Box key={i} sx={{ textAlign: 'center', opacity: s.done ? 1 : 0.3, transition: 'opacity 0.3s' }}>
          <Box sx={{
            fontSize: i === level ? '3rem' : '2rem',
            lineHeight: 1,
            filter: s.done ? 'none' : 'grayscale(1)',
            transition: 'font-size 0.3s',
            mb: 1
          }}>{s.emoji}</Box>
          <Typography variant="caption" sx={{ display: 'block', color: s.done ? COLORS.greenDark : COLORS.textMuted, fontWeight: s.done ? 700 : 500, fontSize: '0.85rem' }}>
            {s.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

// ─── Reusable Metric Card ───────────────────────────────────────────────────
function MetricCard({ overline, title, subtitle, icon, color, detailLabel, detailValue, progress, progressLabel }) {
  return (
    <Card elevation={0} sx={{ height: '100%', position: 'relative', overflow: 'hidden', border: `1px solid ${COLORS.divider}` }}>
      
      {/* Top subtle background gradient */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 100,
        background: `linear-gradient(180deg, ${color}0D, transparent)`,
        pointerEvents: 'none'
      }} />

      <CardContent sx={{ p: { xs: 3, sm: 4 }, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 1 }}>
        <Typography variant="overline" sx={{ display: 'block', mb: 3, color: COLORS.textSecondary, fontWeight: 700, letterSpacing: 1.2 }}>
          {overline}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2.5, mb: 4, alignItems: 'center' }}>
          <Box sx={{
            width: 56, height: 56, borderRadius: '16px',
            background: `${color}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.2rem', border: `1px solid ${color}30`, flexShrink: 0
          }}>
            {icon}
          </Box>
          <Box>
            <Typography sx={{ fontSize: '2.2rem', fontWeight: 800, color: color, lineHeight: 1, fontFamily: "'DM Sans'", mb: 0.8, letterSpacing: '-0.02em' }}>
              {title}
            </Typography>
            <Chip 
              label={subtitle} 
              size="small" 
              sx={{ 
                background: 'transparent',
                border: `1px solid ${COLORS.divider}`,
                color: COLORS.textSecondary, 
                fontWeight: 700, 
                fontSize: '0.75rem',
                borderRadius: '6px'
              }} 
            />
          </Box>
        </Box>

        <Typography component="div" sx={{ color: COLORS.textPrimary, mb: 5, lineHeight: 1.6, flexGrow: 1, fontWeight: 500, fontSize: '0.95rem' }}>
          {detailLabel}
        </Typography>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography variant="caption" sx={{ fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{progressLabel}</Typography>
            <Typography variant="caption" sx={{ fontWeight: 800, color: color, fontSize: '0.85rem' }}>{detailValue}</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 10,
              borderRadius: 5,
              background: `${color}15`,
              '& .MuiLinearProgress-bar': { background: `linear-gradient(90deg, ${color}cc, ${color})`, borderRadius: 5 },
            }}
          />
        </Box>
      </CardContent>
    </Card>
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
      <Grid container spacing={3.5}>

        {/* ── ROW 1: High-Level Insights ── */}
        
        {/* Monthly Progress */}
        <Grid item xs={12} md={5}>
          <Card elevation={0} sx={{ height: '100%', border: `1px solid ${COLORS.divider}` }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 2, color: COLORS.textSecondary, fontWeight: 700, letterSpacing: 1.2 }}>
                Monthly Progress
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4, mt: 2 }}>
                <Typography sx={{
                  fontSize: '4.8rem',
                  fontWeight: 800,
                  color: COLORS.green,
                  lineHeight: 1,
                  fontFamily: "'DM Sans'",
                  letterSpacing: '-0.04em',
                }}>+20%</Typography>
                <Box>
                  <Typography sx={{ color: COLORS.textPrimary, fontSize: '1.25rem', fontWeight: 800, mb: 1, lineHeight: 1.2 }}>
                    Overall<br/>Improvement
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
                      borderRadius: '8px'
                    }}
                  />
                </Box>
              </Box>

              {/* Positive emotional summary */}
              <Box sx={{
                background: `linear-gradient(135deg, ${COLORS.green}08, ${COLORS.blue}05)`,
                borderLeft: `4px solid ${COLORS.green}`,
                borderRadius: '0 12px 12px 0',
                p: 3,
                mt: 'auto'
              }}>
                <Typography sx={{ fontSize: '1.05rem', color: COLORS.textPrimary, lineHeight: 1.6, fontWeight: 500 }}>
                  <span style={{ fontSize: '1.4rem', marginRight: '12px', verticalAlign: 'middle' }}>🎉</span>
                  <strong>Aarav is flourishing!</strong> He's showing highly consistent effort over the past 4 weeks and rapidly building mastery across core subjects.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Learning Journey */}
        <Grid item xs={12} md={7}>
          <Card elevation={0} sx={{ height: '100%', border: `1px solid ${COLORS.divider}` }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 }, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 3, color: COLORS.textSecondary, fontWeight: 700, letterSpacing: 1.2 }}>
                Learning Journey
              </Typography>

              {/* Movement from current to next stage */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 4, px: { xs: 0, sm: 2 }, mt: 2 }}>
                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Typography variant="caption" sx={{ color: COLORS.textSecondary, fontWeight: 700, display: 'block', mb: 1.5, textTransform: 'uppercase', letterSpacing: 0.8 }}>Current</Typography>
                  <Chip label="Developing" sx={{ background: `${COLORS.yellow}15`, color: COLORS.yellowDark, fontWeight: 800, fontSize: '1.05rem', py: 3, borderRadius: '12px', border: `1px solid ${COLORS.yellow}40`, width: '100%' }} />
                </Box>

                <Box sx={{ flex: 1.5, display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4, position: 'relative' }}>
                  <Typography variant="caption" sx={{ color: COLORS.green, fontWeight: 800, position: 'absolute', top: -24, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: 1 }}>In Progress</Typography>
                  <Box sx={{ width: '100%', height: 6, background: `linear-gradient(90deg, ${COLORS.yellow}40, ${COLORS.green})`, borderRadius: 3, position: 'relative' }}>
                    <Box sx={{ position: 'absolute', right: -4, top: '50%', transform: 'translateY(-50%)', width: 14, height: 14, borderRadius: '50%', background: COLORS.green, border: '3px solid white', boxShadow: `0 0 0 3px ${COLORS.green}30` }} />
                  </Box>
                </Box>

                <Box sx={{ textAlign: 'center', flex: 1 }}>
                  <Typography variant="caption" sx={{ color: COLORS.textSecondary, fontWeight: 700, display: 'block', mb: 1.5, textTransform: 'uppercase', letterSpacing: 0.8 }}>Next</Typography>
                  <Chip label="Proficient" sx={{ background: `transparent`, color: COLORS.textMuted, fontWeight: 700, fontSize: '1.05rem', py: 3, borderRadius: '12px', border: `1px dashed ${COLORS.border}`, opacity: 0.8, width: '100%' }} />
                </Box>
              </Box>

              {/* Current growth stage visual map */}
              <Box sx={{
                background: COLORS.bgWarm,
                borderRadius: '16px',
                p: 3,
                border: `1px solid ${COLORS.divider}`,
                mt: 'auto'
              }}>
                <PlantGrowthVisual level={2} />
              </Box>
            </CardContent>
          </Card>
        </Grid>


        {/* ── ROW 2: Effort & Study Habits ── */}

        <Grid item xs={12} md={4}>
          <MetricCard
            overline="Study Consistency"
            icon="🔥"
            title="Good"
            subtitle="Streaks & Goals"
            color={COLORS.yellow}
            detailLabel={<>Aarav has studied <strong>4 days this week</strong>, maintaining steady momentum towards his weekly goals.</>}
            progressLabel="Active this week"
            detailValue="4 / 7 Days"
            progress={(4/7) * 100}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <MetricCard
            overline="Practice Level"
            icon="📝"
            title="High"
            subtitle="Questions Practiced"
            color={COLORS.blue}
            detailLabel={<>He has actively answered <strong>146 practice questions</strong>, demonstrating deep cognitive engagement with the material.</>}
            progressLabel="Monthly Volume"
            detailValue="146 Qs"
            progress={85}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <MetricCard
            overline="Accuracy Level"
            icon="🎯"
            title="72%"
            subtitle="Mock Test Results"
            color={COLORS.green}
            detailLabel={<>His mock test accuracy is currently at <strong>72%</strong>, showing strong and developing comprehension across core subjects.</>}
            progressLabel="Average Score"
            detailValue="72%"
            progress={72}
          />
        </Grid>

      </Grid>
    </Layout>
  );
}