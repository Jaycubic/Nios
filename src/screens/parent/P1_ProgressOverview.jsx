import React from 'react';
import {
  Box, Typography, Card, CardContent, Chip,
  LinearProgress, Grid, Divider,
} from '@mui/material';
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
          Parent IA · Screen 1 of 4
        </Typography>
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', fontFamily: "'DM Sans'", lineHeight: 1.3 }}>
          1. Progress Summary
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', fontFamily: "'Inter'", mt: 0.3 }}>
          High-level snapshot — not deep analytics
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', flexGrow: 1 }}>
        {[
          { icon: '📈', text: 'Overall improvement this month' },
          { icon: '🎯', text: 'Current performance level' },
          { icon: '🧭', text: 'General trajectory' },
        ].map(({ icon, text }) => (
          <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Typography sx={{ fontSize: '0.82rem' }}>{icon}</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.73rem', fontFamily: "'Inter'" }}>{text}</Typography>
          </Box>
        ))}
      </Box>
      <Chip label="No overload · No jargon · No negative framing" size="small"
        sx={{ background: `${COLORS.green}20`, color: COLORS.green, border: `1px solid ${COLORS.green}38`, fontSize: '0.67rem', fontWeight: 600, height: 24 }} />
    </Box>
  );
}

function StatBadge({ label, value, color }) {
  return (
    <Box sx={{ px: 2, py: 1.5, background: `${color}10`, border: `1px solid ${color}26`, borderRadius: '12px', textAlign: 'center', flex: 1, minWidth: 78 }}>
      <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color, fontFamily: "'DM Sans'", lineHeight: 1 }}>{value}</Typography>
      <Typography sx={{ display: 'block', mt: 0.4, fontSize: '0.67rem', color: COLORS.textMuted, fontFamily: "'Inter'" }}>{label}</Typography>
    </Box>
  );
}

function PlantGrowth({ level }) {
  const stages = [{ label: 'Seed', emoji: '🌱' }, { label: 'Sprout', emoji: '🌿' }, { label: 'Growth', emoji: '🪴' }, { label: 'Maturity', emoji: '🌳' }];
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 4, py: 1 }}>
      {stages.map((s, i) => {
        const done = i <= level; const cur = i === level;
        return (
          <Box key={i} sx={{ textAlign: 'center', opacity: done ? 1 : 0.25, transition: 'opacity 0.3s' }}>
            <Typography sx={{ fontSize: cur ? '2.2rem' : '1.5rem', lineHeight: 1, filter: done ? 'none' : 'grayscale(1)', transition: 'font-size 0.3s' }}>{s.emoji}</Typography>
            <Typography sx={{ display: 'block', mt: 0.5, fontSize: '0.68rem', fontWeight: cur ? 700 : 400, color: cur ? COLORS.green : done ? COLORS.textSecondary : COLORS.textMuted, fontFamily: "'Inter'" }}>{s.label}</Typography>
            {cur && <Box sx={{ mt: 0.5, height: 2.5, background: COLORS.green, borderRadius: 4 }} />}
          </Box>
        );
      })}
    </Box>
  );
}

function SubjectRow({ label, value, color }) {
  return (
    <Box sx={{ mb: 1.8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.65 }}>
        <Typography sx={{ fontSize: '0.81rem', fontWeight: 500, color: COLORS.textPrimary, fontFamily: "'Inter'" }}>{label}</Typography>
        <Typography sx={{ fontSize: '0.81rem', fontWeight: 700, color, fontFamily: "'DM Sans'" }}>{value}%</Typography>
      </Box>
      <LinearProgress variant="determinate" value={value} sx={{ height: 7, borderRadius: 8, background: `${color}12`, '& .MuiLinearProgress-bar': { background: `linear-gradient(90deg, ${color}aa, ${color})` } }} />
    </Box>
  );
}

export default function P1_ProgressOverview() {
  return (
    <Layout role="parent" title="Aarav's Progress" subtitle="Grade 10 · NIOS Board · Last updated today">
      <IAHeader />
      <Grid container spacing={2.5}>

        {/* Hero */}
        <Grid item xs={12} md={7}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ p: '24px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.textMuted, fontFamily: "'Inter'", mb: 0.5 }}>
                    Monthly Progress
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.2 }}>
                    <Typography sx={{ fontSize: '4rem', fontWeight: 900, color: COLORS.green, lineHeight: 1, fontFamily: "'DM Sans'", letterSpacing: '-0.03em' }}>+20%</Typography>
                    <Typography sx={{ color: COLORS.textMuted, fontSize: '0.88rem', fontWeight: 500, fontFamily: "'Inter'" }}>this month</Typography>
                  </Box>
                </Box>
                <Chip label="↑ Improving" sx={{ background: `${COLORS.green}14`, color: COLORS.greenDark, fontWeight: 700, fontSize: '0.75rem', border: `1px solid ${COLORS.green}30`, height: 28 }} />
              </Box>

              <Box sx={{ background: `linear-gradient(135deg, ${COLORS.green}08, ${COLORS.blue}06)`, border: `1px solid ${COLORS.green}20`, borderRadius: '12px', p: '14px 18px', mb: 2.5 }}>
                <Typography sx={{ fontSize: '0.87rem', color: COLORS.textPrimary, lineHeight: 1.65, fontFamily: "'Inter'" }}>
                  🎉 <strong>Aarav is making great progress!</strong> He has improved consistently over the past 4 weeks and is developing strong understanding across core subjects.
                </Typography>
              </Box>

              <Box sx={{ mb: 2.5 }}>
                <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.textMuted, fontFamily: "'Inter'", mb: 1.2, display: 'block' }}>
                  Learning Journey
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip label="Developing" sx={{ background: `${COLORS.yellow}16`, color: COLORS.yellowDark, fontWeight: 600, fontSize: '0.78rem', border: `1px solid ${COLORS.yellow}36`, height: 28 }} />
                  <Typography sx={{ color: COLORS.textMuted, fontSize: '1.1rem', lineHeight: 1 }}>→</Typography>
                  <Chip label="Proficient" sx={{ background: `${COLORS.green}16`, color: COLORS.greenDark, fontWeight: 600, fontSize: '0.78rem', border: `1px solid ${COLORS.green}36`, height: 28 }} />
                  <Typography sx={{ fontSize: '0.71rem', color: COLORS.textMuted, fontFamily: "'Inter'", fontStyle: 'italic' }}>in progress</Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2.5 }} />
              <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.textMuted, fontFamily: "'Inter'", mb: 0.5, display: 'block' }}>
                Growth Stage
              </Typography>
              <PlantGrowth level={2} />
            </CardContent>
          </Card>
        </Grid>

        {/* Stats + subjects */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, height: '100%' }}>
            <Card elevation={0}>
              <CardContent sx={{ p: '20px 22px !important' }}>
                <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.textMuted, fontFamily: "'Inter'", mb: 1.5, display: 'block' }}>
                  At a Glance
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <StatBadge label="Accuracy" value="72%" color={COLORS.green} />
                  <StatBadge label="Attempted" value="146" color={COLORS.blue} />
                  <StatBadge label="Streak" value="12d" color={COLORS.yellow} />
                  <StatBadge label="Hrs / wk" value="3.5h" color={COLORS.purple} />
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ flexGrow: 1 }}>
              <CardContent sx={{ p: '20px 22px !important' }}>
                <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.textMuted, fontFamily: "'Inter'", mb: 1.8, display: 'block' }}>
                  Subject Overview
                </Typography>
                <SubjectRow label="Mathematics" value={68} color={COLORS.blue} />
                <SubjectRow label="Science" value={52} color={COLORS.yellow} />
                <SubjectRow label="English" value={80} color={COLORS.green} />
                <SubjectRow label="Social Sci." value={61} color={COLORS.purple} />
                <Divider sx={{ my: 1.8 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary, fontFamily: "'Inter'" }}>Overall average</Typography>
                  <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: COLORS.green, fontFamily: "'DM Sans'" }}>65.3%</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Trend bars */}
        <Grid item xs={12}>
          <Card elevation={0}>
            <CardContent sx={{ p: '20px 24px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.93rem', color: COLORS.textPrimary, fontFamily: "'DM Sans'" }}>4-Week Performance Trend</Typography>
                <Chip label="Consistently improving" size="small" sx={{ background: `${COLORS.green}10`, color: COLORS.greenDark, fontWeight: 600, fontSize: '0.69rem', border: `1px solid ${COLORS.green}26`, height: 24 }} />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 68, px: 1 }}>
                {[52, 58, 63, 72].map((val, i) => (
                  <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.7, flex: 1 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', color: i === 3 ? COLORS.green : COLORS.textSecondary, fontFamily: "'DM Sans'" }}>{val}%</Typography>
                    <Box sx={{
                      width: '100%', height: `${(val / 100) * 42}px`,
                      background: i === 3
                        ? `linear-gradient(180deg, ${COLORS.green} 0%, ${COLORS.green}44 100%)`
                        : `linear-gradient(180deg, ${COLORS.blue}70 0%, ${COLORS.blue}18 100%)`,
                      borderRadius: '6px 6px 3px 3px',
                    }} />
                    <Typography sx={{ fontSize: '0.67rem', color: COLORS.textMuted, fontFamily: "'Inter'" }}>Week {i + 1}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
}