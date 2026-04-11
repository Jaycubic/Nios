// src/screens/parent/P1_ProgressOverview.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── Data Map (Wireframe) ────────────────────────────────────────────────────
const overviewData = {
  status: {
    emoji: "🟡",
    headline: "On track, needs support in a few areas",
    message: "Your child is making steady progress.",
    color: COLORS.amber
  },
  habits: [
    { id: 1, name: "Study consistency", status: "Good", detail: "studied 4 days this week", color: COLORS.green },
    { id: 2, name: "Practice level", status: "High", detail: "146 questions answered", color: COLORS.blue }
  ],
  subjects: [
    { name: "Math", status: "Needs Support", note: "Improving", dot: COLORS.purple },
    { name: "Science", status: "Needs Attention", note: "Low recent practice", dot: COLORS.amber },
    { name: "English", status: "Strong", note: "Consistent", dot: COLORS.green },
    { name: "Hindi", status: "On Track", note: "Steady volume", dot: COLORS.blue },
    { name: "Social Science", status: "On Track", note: "Steady volume", dot: COLORS.blue },
  ],
  goingWell: [
    "Your child is consistent with studying",
    "Improvement seen in English"
  ]
};

// ─── 1. OVERALL CHILD STATUS ──────────────────────────────────────────────────
function OverallStatus() {
  const { status } = overviewData;
  return (
    <Card elevation={0} sx={{ border: `1px solid ${status.color}40`, background: `${status.color}08`, borderRadius: '16px', mb: 4 }}>
      <CardContent sx={{ p: { xs: 3, md: 4 }, display: 'flex', alignItems: 'center', gap: 2.5 }}>
        <Typography sx={{ fontSize: '2.5rem', lineHeight: 1 }}>{status.emoji}</Typography>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: COLORS.textPrimary, mb: 0.5, letterSpacing: '-0.02em' }}>
            {status.headline}
          </Typography>
          <Typography variant="body1" sx={{ color: COLORS.textSecondary, fontWeight: 500, fontSize: '1.05rem' }}>
            {status.message}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── 2. EFFORT & STUDY HABITS ────────────────────────────────────────────────
function EffortHabits() {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: COLORS.textPrimary }}>Effort & Study Habits</Typography>
      <Grid container spacing={2}>
        {overviewData.habits.map(habit => (
          <Grid item xs={12} md={6} key={habit.id}>
            <Box sx={{
              p: 2.5, borderRadius: '12px', background: COLORS.bgWarm, border: `1px solid ${COLORS.divider}`,
              display: 'flex', alignItems: 'flex-start', gap: 2
            }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: habit.color, mt: 1 }} />
              <Box>
                <Typography sx={{ color: COLORS.textSecondary, fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 0.5, mb: 0.5 }}>
                  {habit.name}
                </Typography>
                <Typography sx={{ color: COLORS.textPrimary, fontWeight: 700, fontSize: '1.1rem', mb: 0.5 }}>
                  {habit.status}
                </Typography>
                <Typography variant="body2" sx={{ color: COLORS.textMuted }}>
                  ({habit.detail})
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ─── 3. SUBJECT-WISE SUMMARY ─────────────────────────────────────────────────
function SubjectSummary() {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: COLORS.textPrimary }}>Subject-Wise Summary</Typography>
      <Card elevation={0} sx={{ border: `1px solid ${COLORS.divider}` }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {overviewData.subjects.map((subj, i) => (
            <React.Fragment key={subj.name}>
              <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 200 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: subj.dot }} />
                  <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: COLORS.textPrimary }}>{subj.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1, justifyContent: 'flex-end' }}>
                  <Typography sx={{ fontWeight: 700, color: COLORS.textSecondary, fontSize: '0.95rem' }}>
                    {subj.status}
                  </Typography>
                  {subj.note && (
                    <Chip label={subj.note} size="small" sx={{ background: `${COLORS.bgWarm}`, color: COLORS.textMuted, fontWeight: 600, fontSize: '0.75rem', border: `1px solid ${COLORS.border}` }} />
                  )}
                </Box>
              </Box>
              {i < overviewData.subjects.length - 1 && <Box sx={{ height: 1, background: COLORS.divider }} />}
            </React.Fragment>
          ))}
        </Box>
      </Card>
    </Box>
  );
}

// ─── 4. WHAT'S GOING WELL ────────────────────────────────────────────────────
function GoingWell() {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: COLORS.textPrimary }}>What’s Going Well</Typography>
      <Card elevation={0} sx={{ background: `${COLORS.green}08`, border: `1px solid ${COLORS.green}30`, borderRadius: '12px' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {overviewData.goingWell.map((item, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography sx={{ color: COLORS.green, fontSize: '1.2rem', lineHeight: 1 }}>✦</Typography>
                <Typography sx={{ fontWeight: 600, color: COLORS.textPrimary, fontSize: '1rem' }}>{item}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function P1_ProgressOverview() {
  return (
    <Layout
      role="parent"
      title="Aarav's Progress Overview"
      subtitle="Here’s how your child is doing."
    >
      <Box sx={{ maxWidth: 800, mx: 'auto', py: 2 }}>
        <OverallStatus />
        <EffortHabits />
        <SubjectSummary />
        <GoingWell />
      </Box>
    </Layout>
  );
}