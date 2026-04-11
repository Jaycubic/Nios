// src/screens/parent/P1_ProgressOverview.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── Reusable Metric Card for Habits ──────────────────────────────────────────
function MetricCard({ overline, title, subtitle, icon, color, detailLabel }) {
  return (
    <Card elevation={0} sx={{ height: '100%', border: `1px solid ${COLORS.divider}` }}>
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Typography variant="overline" sx={{ display: 'block', mb: 2, color: COLORS.textSecondary, fontWeight: 700, letterSpacing: 1.2 }}>
          {overline}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
          <Box sx={{
            width: 48, height: 48, borderRadius: '12px',
            background: `${color}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem', border: `1px solid ${color}30`, flexShrink: 0
          }}>
            {icon}
          </Box>
          <Box>
            <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: color, lineHeight: 1, fontFamily: "'DM Sans'", mb: 0.5, letterSpacing: '-0.02em' }}>
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
                fontSize: '0.7rem',
                borderRadius: '6px'
              }} 
            />
          </Box>
        </Box>

        <Typography component="div" sx={{ color: COLORS.textPrimary, lineHeight: 1.5, fontWeight: 500, fontSize: '0.9rem' }}>
          {detailLabel}
        </Typography>
      </CardContent>
    </Card>
  );
}

// ─── Subject Summary Row ──────────────────────────────────────────────────────
function SubjectRow({ subject, statusText, statusType }) {
  const isWeak = statusType === 'support' || statusType === 'attention';
  const color = statusType === 'support' ? COLORS.amber : 
                statusType === 'attention' ? COLORS.yellow : 
                COLORS.green;
  
  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      p: '12px 16px', borderRadius: '10px',
      background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`,
      mb: 1
    }}>
      <Typography sx={{ fontWeight: 700, color: COLORS.textPrimary, fontSize: '0.95rem' }}>{subject}</Typography>
      <Chip 
        label={statusText} 
        size="small" 
        sx={{ 
          background: `${color}15`, 
          color: isWeak ? color + 'Dark' : color, 
          fontWeight: 700, 
          border: `1px solid ${color}30` 
        }} 
      />
    </Box>
  );
}


export default function P1_ProgressOverview() {
  return (
    <Layout
      role="parent"
      title="Aarav's Progress"
      subtitle="Grade 10 · NIOS Board · Last updated today"
    >
      <Grid container spacing={3}>

        {/* ── 1. OVERALL CHILD STATUS ── */}
        <Grid item xs={12} md={7}>
          <Card elevation={0} sx={{ height: '100%', border: `1px solid ${COLORS.divider}` }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 }, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 2, color: COLORS.textSecondary, fontWeight: 700, letterSpacing: 1.2 }}>
                Overall Status
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 1 }}>
                <Box sx={{
                  width: 56, height: 56, borderRadius: '16px',
                  background: `${COLORS.yellow}20`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', flexShrink: 0
                }}>
                  🟡
                </Box>
                <Box>
                  <Typography sx={{ color: COLORS.textPrimary, fontSize: '1.4rem', fontWeight: 800, mb: 0.5, lineHeight: 1.2 }}>
                    On track, needs support in a few areas
                  </Typography>
                  <Typography variant="body1" sx={{ color: COLORS.textSecondary, fontWeight: 500 }}>
                    Your child is making steady progress.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── 4. WHAT’S GOING WELL ── */}
        <Grid item xs={12} md={5}>
          <Card elevation={0} sx={{ height: '100%', background: `linear-gradient(135deg, ${COLORS.green}08, ${COLORS.blue}05)`, border: `1px solid ${COLORS.green}30` }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 }, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 2, color: COLORS.greenDark, fontWeight: 800, letterSpacing: 1.2 }}>
                What's Going Well
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Typography sx={{ fontSize: '1.2rem', mt: -0.2 }}>🌟</Typography>
                  <Typography sx={{ color: COLORS.textPrimary, fontWeight: 600, fontSize: '0.95rem' }}>
                    Your child is consistent with studying.
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                  <Typography sx={{ fontSize: '1.2rem', mt: -0.2 }}>📈</Typography>
                  <Typography sx={{ color: COLORS.textPrimary, fontWeight: 600, fontSize: '0.95rem' }}>
                    Improvement seen in English.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── 2. EFFORT & STUDY HABITS ── */}
        <Grid item xs={12} md={7}>
          <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "'DM Sans'", mb: 2, mt: 1 }}>Effort & Study Habits</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MetricCard
                overline="Study Consistency"
                icon="🔥"
                title="Good"
                subtitle="Based on streaks & goals"
                color={COLORS.yellow}
                detailLabel={<>Studied <strong>4 days this week</strong>. Maintaining steady momentum.</>}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MetricCard
                overline="Practice Level"
                icon="📝"
                title="Active"
                subtitle="Questions Practiced"
                color={COLORS.blue}
                detailLabel={<>Actively engaging with practice sets and modules.</>}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* ── 3. SUBJECT-WISE SUMMARY ── */}
        <Grid item xs={12} md={5}>
          <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: "'DM Sans'", mb: 2, mt: 1 }}>Subject Summary</Typography>
          <Card elevation={0} sx={{ border: `1px solid ${COLORS.divider}` }}>
            <CardContent sx={{ p: 2 }}>
              <SubjectRow subject="Math" statusText="Needs Support (Improving)" statusType="support" />
              <SubjectRow subject="Science" statusText="Needs Attention (Low recent practice)" statusType="attention" />
              <SubjectRow subject="English" statusText="Strong (Consistent)" statusType="strong" />
              <SubjectRow subject="Hindi" statusText="On Track" statusType="strong" />
              <SubjectRow subject="Social Science" statusText="On Track" statusType="strong" />
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
}