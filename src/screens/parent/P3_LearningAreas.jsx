import React from 'react';
import { Box, Typography, Card, CardContent, Chip, LinearProgress, Grid, Divider } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

function IAHeader() {
  return (
    <Box sx={{
      mb: 3, p: '14px 20px', borderRadius: '14px',
      background: `linear-gradient(135deg, ${COLORS.bgNav} 0%, #3a3650 100%)`,
      display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap',
    }}>
      <Box sx={{ flexShrink: 0, minWidth: 160 }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Inter'", mb: 0.4 }}>
          Parent IA · Screen 3 of 4
        </Typography>
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', fontFamily: "'DM Sans'", lineHeight: 1.3 }}>
          3. Learning Areas
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', fontFamily: "'Inter'", mt: 0.3 }}>
          High-level strengths & subject overview
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', flexGrow: 1 }}>
        {[
          { icon: '✨', text: 'Strengths' },
          { icon: '🌱', text: 'Areas needing improvement' },
          { icon: '📊', text: 'Subject overview' },
          { icon: '🔍', text: 'High-level concept gaps' },
        ].map(({ icon, text }) => (
          <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Typography sx={{ fontSize: '0.82rem' }}>{icon}</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.73rem', fontFamily: "'Inter'" }}>{text}</Typography>
          </Box>
        ))}
      </Box>
      <Chip label="Positive framing only" size="small"
        sx={{ background: `${COLORS.purple}20`, color: COLORS.purple, border: `1px solid ${COLORS.purple}38`, fontSize: '0.67rem', fontWeight: 600, height: 24 }} />
    </Box>
  );
}

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
  const s = {
    great: { bg: `${COLORS.green}16`, border: `${COLORS.green}32`, color: COLORS.greenDark },
    working: { bg: `${COLORS.yellow}16`, border: `${COLORS.yellow}32`, color: COLORS.yellowDark },
    notStarted: { bg: COLORS.divider, border: COLORS.border, color: COLORS.textMuted },
  }[type];
  return (
    <Chip label={label} size="small" sx={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color, fontWeight: 600, fontSize: '0.74rem', height: 27, '& .MuiChip-label': { px: 1.5 } }} />
  );
}

function SubjectCard({ label, value, color, icon, chapters, done }) {
  const statusLabel = value >= 70 ? 'Strong' : value >= 50 ? 'Developing' : 'Needs focus';
  const statusColor = value >= 70 ? COLORS.greenDark : value >= 50 ? COLORS.yellowDark : COLORS.amberDark;
  const statusBg = value >= 70 ? `${COLORS.green}12` : value >= 50 ? `${COLORS.yellow}12` : `${COLORS.amber}12`;
  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ p: '18px 20px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.4, mb: 1.8 }}>
          <Box sx={{ width: 38, height: 38, background: `${color}12`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
            {icon}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: COLORS.textPrimary, fontFamily: "'DM Sans'" }}>{label}</Typography>
            <Typography sx={{ fontSize: '0.67rem', color: COLORS.textMuted, fontFamily: "'Inter'" }}>{done}/{chapters} chapters done</Typography>
          </Box>
          <Typography sx={{ fontWeight: 900, fontSize: '1.35rem', color, fontFamily: "'DM Sans'", lineHeight: 1 }}>{value}%</Typography>
        </Box>
        <LinearProgress variant="determinate" value={value} sx={{ height: 8, borderRadius: 8, background: `${color}12`, '& .MuiLinearProgress-bar': { background: `linear-gradient(90deg, ${color}aa, ${color})` } }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Typography sx={{ fontSize: '0.65rem', color: COLORS.textMuted, fontFamily: "'Inter'" }}>0%</Typography>
          <Chip label={statusLabel} size="small" sx={{ fontSize: '0.63rem', height: 19, background: statusBg, color: statusColor, fontWeight: 600, '& .MuiChip-label': { px: 0.9 } }} />
          <Typography sx={{ fontSize: '0.65rem', color: COLORS.textMuted, fontFamily: "'Inter'" }}>100%</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function P3_LearningAreas() {
  return (
    <Layout role="parent" title="Aarav's Learning Areas" subtitle="Strengths, areas being developed, and subject overview">
      <IAHeader />
      <Grid container spacing={2.5}>

        {/* Great at */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ p: '22px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                <Typography sx={{ fontSize: '1.1rem' }}>✨</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', fontFamily: "'DM Sans'", color: COLORS.textPrimary }}>Great At</Typography>
                <Chip label={`${greatAt.length} topics`} size="small" sx={{ ml: 'auto', background: `${COLORS.green}14`, color: COLORS.greenDark, fontWeight: 700, fontSize: '0.68rem', height: 22 }} />
              </Box>
              <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary, mb: 2, lineHeight: 1.65, fontFamily: "'Inter'" }}>
                These are areas where Aarav has shown strong understanding and consistent performance.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.9 }}>
                {greatAt.map(t => <TopicPill key={t} label={t} type="great" />)}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Working on */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ p: '22px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                <Typography sx={{ fontSize: '1.1rem' }}>🌱</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', fontFamily: "'DM Sans'", color: COLORS.textPrimary }}>Working On</Typography>
                <Chip label={`${workingOn.length} topics`} size="small" sx={{ ml: 'auto', background: `${COLORS.yellow}14`, color: COLORS.yellowDark, fontWeight: 700, fontSize: '0.68rem', height: 22 }} />
              </Box>
              <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary, mb: 2, lineHeight: 1.65, fontFamily: "'Inter'" }}>
                These topics are being actively developed. A bit more practice will help Aarav feel confident here.
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.9, mb: 2 }}>
                {workingOn.map(t => <TopicPill key={t} label={t} type="working" />)}
              </Box>
              <Divider sx={{ mb: 1.8 }} />
              <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: COLORS.textMuted, fontFamily: "'Inter'", mb: 1, display: 'block' }}>
                Not yet started
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.9 }}>
                {notStarted.map(t => <TopicPill key={t} label={t} type="notStarted" />)}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Subject cards */}
        {subjects.map(s => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <SubjectCard {...s} />
          </Grid>
        ))}

        {/* Insight */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{ background: `linear-gradient(135deg, ${COLORS.green}07, ${COLORS.blue}05)`, border: `1px solid ${COLORS.green}18` }}>
            <CardContent sx={{ p: '14px 20px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ fontSize: '1.4rem' }}>💡</Typography>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: COLORS.textPrimary, mb: 0.3, fontFamily: "'DM Sans'" }}>
                    Aarav's strongest subject is English at 80% — well done!
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary, fontFamily: "'Inter'", lineHeight: 1.6 }}>
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