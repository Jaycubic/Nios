// src/screens/parent/P2_EffortConsistency.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, LinearProgress, Chip } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── Reusable Metric Card ──────────────────────────────────────────────────
function MetricCard({ overline, title, subtitle, icon, color, detailLabel, detailValue, progress, progressLabel }) {
  return (
    <Card elevation={0} sx={{ height: '100%', position: 'relative', overflow: 'hidden', border: `1px solid ${COLORS.divider}` }}>
      
      {/* Top subtle background gradient */}
      <Box sx={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 100,
        background: `linear-gradient(180deg, ${color}10, transparent)`,
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
            fontSize: '2rem', border: `1px solid ${color}30`, flexShrink: 0
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
                fontWeight: 600, 
                fontSize: '0.75rem',
                borderRadius: '6px'
              }} 
            />
          </Box>
        </Box>

        <Typography component="div" sx={{ color: COLORS.textPrimary, mb: 5, lineHeight: 1.6, flexGrow: 1, fontWeight: 500 }}>
          {detailLabel}
        </Typography>

        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 }}>{progressLabel}</Typography>
            <Typography variant="caption" sx={{ fontWeight: 800, color: color }}>{detailValue}</Typography>
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
export default function P2_EffortConsistency() {
  return (
    <Layout
      role="parent"
      title="Effort & Study Habits"
      subtitle="Clear, actionable insights based on learning behaviors"
    >
      <Grid container spacing={3.5}>
        
        {/* ── 1. Study Consistency ── */}
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

        {/* ── 2. Practice Level ── */}
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

        {/* ── 3. Accuracy Level ── */}
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
