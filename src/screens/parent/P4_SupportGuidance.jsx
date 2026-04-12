// src/screens/parent/P4_SupportGuidance.jsx
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Chip, Button, Grid, Divider, Collapse } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

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
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      elevation={0}
      onClick={() => setExpanded(e => !e)}
      sx={{
        cursor: 'pointer',
        border: `1px solid ${expanded ? color + '50' : COLORS.border}`,
        mb: 1.5,
        transition: 'all 0.2s ease',
        '&:hover': { borderColor: `${color}40`, boxShadow: `0 4px 16px ${color}15` },
      }}
    >
      <CardContent sx={{ py: '14px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{
            width: 38, height: 38, borderRadius: '10px',
            background: `${color}15`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.1rem', flexShrink: 0,
          }}>{icon}</Box>
          <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: COLORS.textPrimary, flexGrow: 1 }}>
            {title}
          </Typography>
          <Typography sx={{ color: COLORS.textMuted, fontSize: '0.8rem', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'none' }}>▾</Typography>
        </Box>
        <Collapse in={expanded}>
          <Box sx={{ mt: 1.5, pl: '54px' }}>
            <Typography variant="body2" sx={{ color: COLORS.textSecondary, lineHeight: 1.6 }}>
              {detail}
            </Typography>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default function P4_SupportGuidance() {
  return (
    <Layout
      role="parent"
      title="Guidance for Parents"
      subtitle="Action-oriented suggestions to support learning"
    >
      <Grid container spacing={2.5}>

        {/* ── 5. Where Support Is Needed ── */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                <Typography sx={{ fontSize: '1.2rem' }}>🔍</Typography>
                <Typography variant="h6">Where Support Is Needed</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: COLORS.textSecondary, mb: 2.5, lineHeight: 1.6 }}>
                What your child needs help with and how you can support.
              </Typography>

              {needs.map(n => <NeedCard key={n.topic} {...n} />)}

            </CardContent>
          </Card>
        </Grid>

        {/* ── 6. How Parents Can Help ── */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                <Typography sx={{ fontSize: '1.2rem' }}>🚀</Typography>
                <Typography variant="h6">How Parents Can Help</Typography>
                <Chip label="Tap to expand" size="small" sx={{ ml: 'auto', background: COLORS.divider, color: COLORS.textMuted, fontSize: '0.68rem' }} />
              </Box>

              {actions.map(a => <ActionChip key={a.title} {...a} />)}

              <Divider sx={{ my: 2.5 }} />

              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenDark})`,
                    color: '#fff',
                    py: 1.2,
                    boxShadow: `0 4px 14px ${COLORS.green}40`,
                    '&:hover': { boxShadow: `0 6px 20px ${COLORS.green}55` },
                  }}
                >
                  📨 Send an Encouragement Note
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
}