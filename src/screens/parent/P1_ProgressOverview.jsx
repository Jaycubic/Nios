// src/screens/parent/P1_ProgressOverview.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Grid, Divider } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// Common card base style
const cardProps = {
  elevation: 0,
  sx: {
    borderRadius: '20px',
    border: `1px solid ${COLORS.border}60`,
    background: '#FAFAFB', // warm neutral white
    overflow: 'hidden',
    height: '100%',
    transition: 'all 0.2s ease',
  }
};

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
      <Typography sx={{
        fontWeight: 700, fontSize: '0.7rem',
        letterSpacing: '0.05em', textTransform: 'uppercase',
        color: COLORS.textMuted, fontFamily: "'Inter'",
      }}>{children}</Typography>
    </Box>
  );
}

// ─── Row 1: Primary Status Hero ──────────────────────────────────────────────
function OverallStatus() {
  return (
    <Card {...cardProps} sx={{ 
      ...cardProps.sx, 
      background: `linear-gradient(135deg, ${COLORS.yellow}05, ${COLORS.yellow}0C)`, 
      border: `1px solid ${COLORS.yellow}20` 
    }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Typography sx={{ fontSize: '2rem', lineHeight: 1 }}>🟡</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: '1.5rem', color: COLORS.textPrimary, letterSpacing: '-0.01em', lineHeight: 1.3 }}>
            On track, needs support in a few areas
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: COLORS.textSecondary, fontSize: '1.05rem', fontWeight: 500, lineHeight: 1.7 }}>
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
    <Card {...cardProps} sx={{ 
      ...cardProps.sx, 
      background: `${COLORS.green}05`, 
      border: `1px solid ${COLORS.green}15` 
    }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <SectionLabel>What's Going Well</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map((item, i) => (
             <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box sx={{ fontSize: '1.2rem', lineHeight: 1.2, pt: '2px', opacity: 0.9 }}>
                  {item.icon}
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: '1rem', color: COLORS.greenDark, lineHeight: 1.4 }}>
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
    <Card {...cardProps}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <SectionLabel>Quick Snapshot</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {kpis.map((k, i) => (
            <React.Fragment key={i}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                <Typography sx={{ fontSize: '0.88rem', color: COLORS.textSecondary, fontWeight: 500 }}>{k.label}</Typography>
                <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: COLORS.textPrimary }}>{k.val}</Typography>
              </Box>
              {i < kpis.length - 1 && <Divider sx={{ borderColor: `${COLORS.divider}40` }} />}
            </React.Fragment>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── Row 3 Left: Effort & Habits ────────────────────────────────────────────
function EffortAndHabits() {
  const metrics = [
    { label: 'Study Consistency', val: 'Good', desc: '4 days this week', color: COLORS.green },
    { label: 'Practice Level', val: 'High', desc: '85 Qs answered', color: COLORS.blue },
  ];
  return (
    <Card {...cardProps}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <SectionLabel>Effort & Study Habits</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {metrics.map((m, i) => (
            <React.Fragment key={m.label}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
                <Typography sx={{ fontSize: '0.95rem', color: COLORS.textPrimary, fontWeight: 600 }}>{m.label}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
                  <Typography variant="caption" sx={{ color: COLORS.textMuted, fontWeight: 500, fontSize: '0.8rem' }}>{m.desc}</Typography>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: m.color }}>{m.val}</Typography>
                </Box>
              </Box>
              {i < metrics.length - 1 && <Divider sx={{ borderColor: `${COLORS.divider}40` }} />}
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
    { name: 'Science', status: 'Attention', note: 'Low practice', color: COLORS.yellow },
    { name: 'English', status: 'Strong', note: 'Consistent', color: COLORS.green },
    { name: 'Hindi', status: 'Strong', note: 'Mastered basics', color: COLORS.green },
    { name: 'Social Sci', status: 'On Track', note: 'Steady', color: COLORS.blue },
  ];
  return (
    <Card {...cardProps}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <SectionLabel>Subject-Wise Summary</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {subs.map((s, i) => (
            <React.Fragment key={s.name}>
              <Box sx={{ 
                display: 'flex', alignItems: 'center', py: 1.5
              }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: COLORS.textPrimary, width: 85, flexShrink: 0 }}>
                  {s.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
                  <Chip label={s.status} size="small" sx={{ 
                    height: 22, fontSize: '0.68rem', fontWeight: 700, 
                    background: s.color === COLORS.yellow ? `${COLORS.yellow}20` : `${s.color}15`, 
                    color: s.color === COLORS.yellow ? COLORS.yellowDark : (s.color === COLORS.amber ? COLORS.amberDark : s.color), 
                    border: 'none',
                    px: 0.5
                  }} />
                  <Typography variant="caption" sx={{ color: COLORS.textSecondary, fontSize: '0.8rem', fontWeight: 500 }}>
                     {s.note}
                  </Typography>
                </Box>
              </Box>
               {i < subs.length - 1 && <Divider sx={{ borderColor: `${COLORS.divider}40` }} />}
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