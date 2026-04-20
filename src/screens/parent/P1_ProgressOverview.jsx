// src/screens/parent/P1_ProgressOverview.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip, Button, Divider } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── Constants for Support Guidance ──────────────────────────────────────────
const needs = [
  { topic: 'Encourage revision', note: 'Consistent revision helps reinforce concepts and overcome struggles.', icon: '📚', color: COLORS.yellow },
  { topic: 'Help maintain routine', note: 'A daily routine keeps learning on track and builds momentum.', icon: '🗓️', color: COLORS.blue },
  { topic: 'Focus on specific topics', note: 'Targeted practice on weak areas yields the best improvements.', icon: '🎯', color: COLORS.purple },
];

const actions = [
  { icon: '⏱️', title: 'Encourage 15–20 minutes of daily practice', detail: 'Short daily sessions are highly effective for long-term retention compared to cramming.', color: COLORS.green },
  { icon: '🗣️', title: 'Ask your child to explain what they learned', detail: 'Teaching back concepts solidifies understanding and naturally exposes any learning gaps.', color: COLORS.blue },
  { icon: '👏', title: 'Appreciate small improvements', detail: 'Positive reinforcement boosts confidence, keeping motivation high through challenges.', color: COLORS.yellow },
];

function NeedCard({ topic, note, icon, color }) {
  return (
    <Box sx={{
      display: 'flex',
      gap: 2,
      p: 2,
      borderRadius: '12px',
      background: `${color}08`,
      border: `1px solid ${color}25`,
      mb: 1.5,
    }}>
      <Box sx={{
        width: 40, height: 40, borderRadius: '10px',
        background: `${color}15`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.1rem', flexShrink: 0,
      }}>{icon}</Box>
      <Box>
        <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', mb: 0.3, color: COLORS.textPrimary }}>{topic}</Typography>
        <Typography variant="body2" sx={{ color: COLORS.textSecondary, lineHeight: 1.5 }}>{note}</Typography>
      </Box>
    </Box>
  );
}

function ActionChip({ icon, title, detail, color }) {
  return (
    <Card
      elevation={0}
      sx={{
        border: `1px solid ${COLORS.border}`,
        mb: 1.2,
        transition: 'all 0.2s ease',
        '&:hover': { borderColor: `${color}40`, boxShadow: `0 4px 16px ${color}15` },
      }}
    >
      <CardContent sx={{ p: '12px 14px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            width: 34, height: 34, borderRadius: '8px',
            background: `${color}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem', flexShrink: 0,
          }}>{icon}</Box>
          <Typography sx={{ fontWeight: 600, fontSize: '0.84rem', color: COLORS.textPrimary, flexGrow: 1, lineHeight: 1.3 }}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ mt: 1, pl: '46px' }}>
          <Typography variant="body2" sx={{ color: COLORS.textSecondary, lineHeight: 1.5, fontSize: '0.8rem' }}>
            {detail}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── Reusable Metric Card for Habits ──────────────────────────────────────────
function MetricCard({ overline, title, subtitle, icon, color, detailLabel }) {
  return (
    <Card elevation={0} sx={{ border: `1px solid ${COLORS.divider}`, height: '100%' }}>
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
  const isWeak = statusType === 'support' || statusType === 'improving';
  const color = statusType === 'support' ? COLORS.amber :
    statusType === 'improving' ? COLORS.blue :
      COLORS.green;

  return (
    <Box sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      p: '6px 12px', borderRadius: '8px',
      background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`,
      mb: 0.8
    }}>
      <Typography sx={{ fontWeight: 700, color: COLORS.textPrimary, fontSize: '0.85rem' }}>{subject}</Typography>
      <Chip
        label={statusText}
        size="small"
        sx={{
          height: 20,
          background: `${color}15`,
          color: isWeak ? color + 'Dark' : color,
          fontWeight: 700,
          fontSize: '0.65rem',
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
      <Grid container spacing={3} alignItems="stretch">

        {/* ── ROW 1 ── */}
        <Grid item xs={12} md={7}>
          <Card elevation={0} sx={{ border: `1px solid ${COLORS.divider}`, height: '100%' }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 }, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 2, color: COLORS.textSecondary, fontWeight: 700, letterSpacing: 1.2 }}>
                Overall Status
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 1 }}>
                <Box sx={{
                  width: 56, height: 56, borderRadius: '16px',
                  background: `${COLORS.blue}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '2rem', flexShrink: 0
                }}>
                  🔵
                </Box>
                <Box>
                  <Typography sx={{ color: COLORS.textPrimary, fontSize: '1.4rem', fontWeight: 800, mb: 0.5, lineHeight: 1.2 }}>
                    Improving
                  </Typography>
                  <Typography variant="body1" sx={{ color: COLORS.textSecondary, fontWeight: 500 }}>
                    Your child is making steady progress.
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card elevation={0} sx={{ background: `linear-gradient(135deg, ${COLORS.green}08, ${COLORS.blue}05)`, border: `1px solid ${COLORS.green}30`, height: '100%' }}>
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

        {/* ── ROW 2 ── */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
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

        <Grid item xs={12} md={5}>
          <Card elevation={0} sx={{ border: `1px solid ${COLORS.divider}`, height: '100%' }}>
            <CardContent sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', pb: '16px !important' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 1.5, color: COLORS.textSecondary, fontWeight: 700, letterSpacing: 1.2 }}>
                Subject-Wise Summary
              </Typography>
              <SubjectRow subject="Math" statusText="Improving" statusType="improving" />
              <SubjectRow subject="Science" statusText="Needs Support" statusType="support" />
              <SubjectRow subject="English" statusText="Consistent" statusType="strong" />
              <SubjectRow subject="Hindi" statusText="Consistent" statusType="strong" />
              <SubjectRow subject="Social Science" statusText="Consistent" statusType="strong" />
            </CardContent>
          </Card>
        </Grid>

        {/* ── ROW 3: Combined Section ── */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{ border: `1px solid ${COLORS.divider}`, height: '100%' }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 3, color: COLORS.textSecondary, fontWeight: 700, letterSpacing: 1.2 }}>
                Where Support Is Needed &amp; How Parents Can Help
              </Typography>

              <Grid container spacing={4}>
                {/* Needs Column */}
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: COLORS.textPrimary, mb: 1 }}>
                    Areas for Attention
                  </Typography>
                  <Typography variant="body2" sx={{ color: COLORS.textSecondary, mb: 2.5, lineHeight: 1.6 }}>
                    Insights into what your child needs to overcome current struggles.
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {needs.map(n => <NeedCard key={n.topic} {...n} />)}
                  </Box>
                </Grid>

                {/* Actions Column */}
                <Grid item xs={12} md={6}>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: COLORS.textPrimary, mb: 1 }}>
                    Actionable Steps
                  </Typography>
                  <Typography variant="body2" sx={{ color: COLORS.textSecondary, mb: 2.5, lineHeight: 1.6 }}>
                    Direct ways you can support their learning effectively.
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {actions.map(a => <ActionChip key={a.title} {...a} />)}
                  </Box>
                </Grid>
              </Grid>

            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
}