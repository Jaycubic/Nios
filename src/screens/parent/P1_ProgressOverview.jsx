// src/screens/parent/P1_ProgressOverview.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Grid } from '@mui/material';
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

function OverallStatus() {
  return (
    <Card elevation={0} sx={{ background: `${COLORS.yellow}10`, border: `1px solid ${COLORS.yellow}30` }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Typography sx={{ fontSize: '1.5rem' }}>🟡</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: COLORS.textPrimary }}>
            On track, needs support in a few areas
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: COLORS.textSecondary }}>
          "Your child is making steady progress."
        </Typography>
      </CardContent>
    </Card>
  );
}

function EffortAndHabits() {
  const metrics = [
    { label: 'Study consistency', val: 'Good', desc: '(studied 4 days this week)', color: COLORS.green },
    { label: 'Practice level', val: 'High', desc: '(consistent test taking)', color: COLORS.blue },
  ];
  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent>
        <SectionLabel>Effort & Study Habits</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {metrics.map(m => (
            <Box key={m.label} sx={{
              p: 2, borderRadius: '12px', background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`
            }}>
              <Typography sx={{ fontSize: '0.85rem', color: COLORS.textMuted, mb: 0.5, fontWeight: 700 }}>{m.label}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: m.color }}>{m.val}</Typography>
                <Typography variant="caption" sx={{ color: COLORS.textSecondary, fontWeight: 500 }}>{m.desc}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function SubjectSummary() {
  const subs = [
    { name: 'Math', status: 'Needs Support', note: '(Improving)', color: COLORS.amber },
    { name: 'Science', status: 'Needs Attention', note: '(Low recent practice)', color: COLORS.yellow },
    { name: 'English', status: 'Strong', note: '(Consistent)', color: COLORS.green },
    { name: 'Hindi', status: 'Strong', note: '(Mastered basics)', color: COLORS.green },
    { name: 'Social Science', status: 'On Track', note: '(Steady)', color: COLORS.blue },
  ];
  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <SectionLabel>Subject-Wise Summary</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          {subs.map((s, i) => (
            <Box key={s.name} sx={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
              py: 1.5, 
              borderBottom: i === subs.length - 1 ? 'none' : `1px dashed ${COLORS.divider}` 
            }}>
              <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: COLORS.textPrimary }}>{s.name}</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.3 }}>
                <Chip label={s.status} size="small" sx={{ height: 22, fontSize: '0.65rem', fontWeight: 700, background: `${s.color}15`, color: s.color === COLORS.yellow ? COLORS.yellowDark : s.color, border: `1px solid ${s.color}30` }} />
                <Typography variant="caption" sx={{ color: COLORS.textMuted, fontSize: '0.65rem', fontWeight: 600 }}>{s.note}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

function GoingWell() {
  const items = [
    { icon: '⭐', text: 'Your child is consistent with studying' },
    { icon: '📈', text: 'Improvement seen in English' },
  ];
  return (
    <Card elevation={0} sx={{ background: `${COLORS.green}08`, border: `1px solid ${COLORS.green}20` }}>
      <CardContent>
        <SectionLabel>What's Going Well</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
          {items.map((item, i) => (
             <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, background: COLORS.bgCard, p: 1.5, borderRadius: '10px', border: `1px solid ${COLORS.green}15` }}>
                <Box sx={{ width: 28, height: 28, borderRadius: '8px', background: `${COLORS.green}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon}
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: COLORS.greenDark }}>
                  {item.text}
                </Typography>
             </Box>
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
        
        {/* Full width status */}
        <Grid item xs={12}>
          <OverallStatus />
        </Grid>

        {/* Row 2: What's Going well (Full width) */}
        <Grid item xs={12}>
          <GoingWell />
        </Grid>

        {/* Row 3: Efforts and Subjects */}
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