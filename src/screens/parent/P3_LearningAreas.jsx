import React from 'react';
import { Box, Typography, Card, CardContent, Chip, LinearProgress, Grid, Divider } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

const greatAt = ['Number Systems', 'Basic Algebra', 'English Grammar', 'Linear Equations', 'Ratio & Proportion'];
const workingOn = ['Polynomials', 'Coordinate Geometry', 'Chemical Reactions', 'Periodic Table'];
const notStarted = ['Trigonometry', 'Statistics', 'Organic Chemistry'];

const subjects = [
  { label: 'Mathematics', value: 68, color: COLORS.blue, icon: '📐', chapters: 12, done: 8 },
  { label: 'Science', value: 52, color: COLORS.yellow, icon: '🔬', chapters: 10, done: 5 },
  { label: 'English', value: 80, color: COLORS.green, icon: '📖', chapters: 8, done: 6 },
  { label: 'Social Sci.', value: 61, color: COLORS.purple, icon: '🌍', chapters: 14, done: 9 },
];

function TopicPill({ label, type }) {
  const styles = {
    great: { bg: `${COLORS.green}18`, border: `${COLORS.green}35`, color: COLORS.greenDark },
    working: { bg: `${COLORS.yellow}18`, border: `${COLORS.yellow}35`, color: COLORS.yellowDark },
    notStarted: { bg: COLORS.divider, border: COLORS.border, color: COLORS.textMuted },
  };
  const s = styles[type];
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
        fontWeight: 600,
        fontSize: '0.75rem',
        height: 28,
        '& .MuiChip-label': { px: 1.5 },
      }}
    />
  );
}

function SubjectCard({ label, value, color, icon, chapters, done }) {
  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Box sx={{
            width: 40, height: 40,
            background: `${color}15`,
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem',
          }}>{icon}</Box>
          <Box>
            <Typography variant="h6" sx={{ fontSize: '0.95rem' }}>{label}</Typography>
            <Typography variant="caption" sx={{ color: COLORS.textMuted }}>{done}/{chapters} chapters</Typography>
          </Box>
          <Box sx={{ ml: 'auto', textAlign: 'right' }}>
            <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', color, fontFamily: "'DM Sans'", lineHeight: 1 }}>{value}%</Typography>
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={value}
          sx={{
            height: 10,
            borderRadius: 8,
            background: `${color}15`,
            '& .MuiLinearProgress-bar': {
              background: `linear-gradient(90deg, ${color}bb, ${color})`,
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="caption" sx={{ color: COLORS.textMuted }}>0%</Typography>
          <Chip
            label={value >= 70 ? 'Strong' : value >= 50 ? 'Developing' : 'Needs focus'}
            size="small"
            sx={{
              fontSize: '0.65rem',
              height: 20,
              background: value >= 70 ? `${COLORS.green}15` : value >= 50 ? `${COLORS.yellow}15` : `${COLORS.amber}15`,
              color: value >= 70 ? COLORS.greenDark : value >= 50 ? COLORS.yellowDark : COLORS.amberDark,
              fontWeight: 600,
              '& .MuiChip-label': { px: 1 },
            }}
          />
          <Typography variant="caption" sx={{ color: COLORS.textMuted }}>100%</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function P3_LearningAreas() {
  return (
    <Layout
      role="parent"
      title="Aarav's Learning Areas"
      subtitle="Strengths, areas being developed, and subjects overview"
    >
      <Grid container spacing={2.5}>

        {/* ── Great at topics ── */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography sx={{ fontSize: '1.2rem' }}>✨</Typography>
                <Typography variant="h6">Great At</Typography>
                <Chip label={`${greatAt.length} topics`} size="small" sx={{ ml: 'auto', background: `${COLORS.green}15`, color: COLORS.greenDark, fontWeight: 600, fontSize: '0.7rem' }} />
              </Box>
              <Typography variant="body2" sx={{ color: COLORS.textSecondary, mb: 2, lineHeight: 1.6 }}>
                These are areas where Aarav has shown strong understanding and consistent performance.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {greatAt.map(t => <TopicPill key={t} label={t} type="great" />)}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Working on ── */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography sx={{ fontSize: '1.2rem' }}>🌱</Typography>
                <Typography variant="h6">Working On</Typography>
                <Chip label={`${workingOn.length} topics`} size="small" sx={{ ml: 'auto', background: `${COLORS.yellow}15`, color: COLORS.yellowDark, fontWeight: 600, fontSize: '0.7rem' }} />
              </Box>
              <Typography variant="body2" sx={{ color: COLORS.textSecondary, mb: 2, lineHeight: 1.6 }}>
                These topics are being actively developed. A bit more practice will help Aarav feel confident here.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {workingOn.map(t => <TopicPill key={t} label={t} type="working" />)}
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Typography variant="overline">Not yet started</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {notStarted.map(t => <TopicPill key={t} label={t} type="notStarted" />)}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Subject cards ── */}
        {subjects.map(s => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <SubjectCard {...s} />
          </Grid>
        ))}

        {/* ── Summary insight ── */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{ background: `linear-gradient(135deg, ${COLORS.green}08, ${COLORS.blue}06)`, border: `1px solid ${COLORS.green}20` }}>
            <CardContent sx={{ py: '16px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ fontSize: '1.5rem' }}>💡</Typography>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.3 }}>
                    Aarav's strongest subject is English at 80% — well done!
                  </Typography>
                  <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
                    Science needs the most attention right now. Even 15–20 minutes of focused revision daily can make a big difference.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
}
