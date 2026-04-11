// src/screens/parent/P1_ProgressOverview.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Grid, Divider } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Typography sx={{
        fontWeight: 700, fontSize: '0.75rem',
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: COLORS.textMuted, fontFamily: "'Inter'",
      }}>{children}</Typography>
    </Box>
  );
}

// ─── Row 1: Primary Status Hero ──────────────────────────────────────────────
function OverallStatus() {
  return (
    <Card elevation={0} sx={{ background: `${COLORS.yellow}10`, border: `1px solid ${COLORS.yellow}30` }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
          <Typography sx={{ fontSize: '1.8rem', lineHeight: 1 }}>🟡</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: '1.45rem', color: COLORS.textPrimary, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            On track, needs support in a few areas
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: COLORS.textSecondary, fontSize: '1.05rem', fontWeight: 500, lineHeight: 1.6 }}>
          Your child is making steady progress. With slightly more consistent practice, they will master the remaining core concepts.
        </Typography>
      </CardContent>
    </Card>
  );
}

// ─── Row 2 Left: What's Going Well ──────────────────────────────────────────
function GoingWell() {
  const items = [
    { icon: '⭐', text: 'Consistent with daily studying' },
    { icon: '📈', text: 'Significant improvement in English' },
  ];
  return (
    <Card elevation={0} sx={{ height: '100%', background: `${COLORS.green}08`, border: `1px solid ${COLORS.green}20` }}>
      <CardContent sx={{ p: 3 }}>
        <SectionLabel>What's Going Well</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {items.map((item, i) => (
             <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box sx={{ fontSize: '1.1rem', lineHeight: 1.2, pt: '1px' }}>
                  {item.icon}
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: COLORS.greenDark, lineHeight: 1.4 }}>
                  {item.text}
                </Typography>
             </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── Row 2 Right: Quick Snapshot ────────────────────────────────────────────
function QuickSnapshot() {
  const kpis = [
    { label: 'Overall Score', val: '68%' },
    { label: 'Consistency', val: '4/7 Days' },
    { label: 'Study Time', val: '5h 20m' },
  ];
  return (
    <Card elevation={0} sx={{ height: '100%', background: COLORS.bgWarm, border: `1px solid ${COLORS.divider}` }}>
      <CardContent sx={{ p: 3 }}>
        <SectionLabel>Quick Snapshot</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
          {kpis.map((k, i) => (
            <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontSize: '0.85rem', color: COLORS.textMuted, fontWeight: 600 }}>{k.label}</Typography>
              <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: COLORS.textPrimary }}>{k.val}</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── Row 3 Left: Effort & Habits ────────────────────────────────────────────
function EffortAndHabits() {
  const metrics = [
    { label: 'Study Consistency', val: 'Good', desc: '(4 days this week)', color: COLORS.green },
    { label: 'Practice Level', val: 'High', desc: '(85 Qs answered)', color: COLORS.blue },
  ];
  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3 }}>
        <SectionLabel>Effort & Study Habits</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {metrics.map((m, i) => (
            <React.Fragment key={m.label}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
                <Typography sx={{ fontSize: '0.9rem', color: COLORS.textPrimary, fontWeight: 600 }}>{m.label}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: COLORS.textMuted, fontWeight: 500 }}>{m.desc}</Typography>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: m.color }}>{m.val}</Typography>
                </Box>
              </Box>
              {i < metrics.length - 1 && <Divider sx={{ borderColor: `${COLORS.divider}80` }} />}
            </React.Fragment>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── Row 3 Right: Subject Summary ───────────────────────────────────────────
function SubjectSummary() {
  const subs = [
    { name: 'Math', status: 'Needs Support', note: 'Improving', color: COLORS.amber },
    { name: 'Science', status: 'Needs Attention', note: 'Low practice', color: COLORS.yellow },
    { name: 'English', status: 'Strong', note: 'Consistent', color: COLORS.green },
    { name: 'Hindi', status: 'Strong', note: 'Mastered basics', color: COLORS.green },
    { name: 'Social Sci', status: 'On Track', note: 'Steady', color: COLORS.blue },
  ];
  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: 3, pt: 3, pb: 2 }}>
        <SectionLabel>Subject-Wise Summary</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {subs.map((s, i) => (
            <React.Fragment key={s.name}>
              <Box sx={{ 
                display: 'flex', alignItems: 'center', py: 1.2
              }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: COLORS.textPrimary, width: 85, flexShrink: 0 }}>
                  {s.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
                  <Chip label={s.status} size="small" sx={{ 
                    height: 22, fontSize: '0.65rem', fontWeight: 700, 
                    background: `${s.color}15`, 
                    color: s.color === COLORS.yellow ? COLORS.yellowDark : s.color, 
                    border: `1px solid ${s.color}30` 
                  }} />
                  <Typography variant="caption" sx={{ color: COLORS.textSecondary, fontSize: '0.75rem', fontWeight: 500 }}>
                    ({s.note})
                  </Typography>
                </Box>
              </Box>
               {i < subs.length - 1 && <Divider sx={{ borderColor: `${COLORS.divider}60` }} />}
            </React.Fragment>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function P1_ProgressOverview() {
  return (
    <Layout role="parent" title="Aarav's Overview" subtitle="Here's how your child is doing">
      <Grid container spacing={3}>
        
        {/* Row 1: Primary Status Hero */}
        <Grid item xs={12}>
          <OverallStatus />
        </Grid>

        {/* Row 2: Positive Reinforcement + Quick Snapshot */}
        <Grid item xs={12} md={8}>
          <GoingWell />
        </Grid>
        <Grid item xs={12} md={4}>
          <QuickSnapshot />
        </Grid>

        {/* Row 3: Detailed Insights */}
        <Grid item xs={12} md={6}>
          <EffortAndHabits />
        </Grid>
        <Grid item xs={12} md={6}>
          <SubjectSummary />
        </Grid>

      </Grid>
    </Layout>
  );
}