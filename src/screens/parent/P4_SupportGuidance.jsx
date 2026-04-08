import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Chip, Button, Grid, Divider, Collapse } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

const needs = [
  { topic: 'Polynomials', note: 'Needs more practice — attempted 3 times, still struggling', icon: '📐', color: COLORS.yellow },
  { topic: 'Coordinate Geometry', note: "Hasn't started yet — this is coming up in exams soon", icon: '📊', color: COLORS.amber },
  { topic: 'Chemical Reactions', note: 'Completing questions but making conceptual errors', icon: '🔬', color: COLORS.yellow },
];

const actions = [
  { icon: '📚', title: 'Encourage 20 min revision daily', detail: 'Even short focused sessions compound into big improvements over time. Help Aarav set a fixed study time each evening.', color: COLORS.green },
  { icon: '🗓️', title: 'Help maintain a study routine', detail: 'Consistency matters more than intensity. A daily routine — even on weekends — keeps momentum going.', color: COLORS.blue },
  { icon: '🎯', title: 'Focus on Algebra this week', detail: 'Polynomials and Algebra are linked. A few targeted sessions this week can unlock a lot of progress.', color: COLORS.purple },
  { icon: '💬', title: 'Celebrate small wins', detail: 'A word of encouragement when Aarav completes a chapter or hits a streak milestone goes a long way.', color: COLORS.yellow },
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
      title="How to Support Aarav"
      subtitle="Practical, friendly guidance for parents"
    >
      <Grid container spacing={2.5}>

        {/* ── Header card ── */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{
            background: `linear-gradient(135deg, ${COLORS.bgDark} 0%, #3d3858 100%)`,
            border: 'none',
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Typography sx={{ fontSize: '2.5rem' }}>🧭</Typography>
                <Box>
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', mb: 0.5, fontFamily: "'DM Sans'" }}>
                    You're a key part of Aarav's learning journey
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                    Small, consistent encouragement from you has a huge impact. Here's how you can help right now.
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto', textAlign: 'right' }}>
                  <Chip label="GPS Rerouting: On track 🗺️" sx={{ background: `${COLORS.green}30`, color: COLORS.green, fontWeight: 600, fontSize: '0.78rem', border: `1px solid ${COLORS.green}50` }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── What Aarav needs ── */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                <Typography sx={{ fontSize: '1.2rem' }}>🔍</Typography>
                <Typography variant="h6">What Aarav Needs Help With</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: COLORS.textSecondary, mb: 2.5, lineHeight: 1.6 }}>
                These are areas where extra attention — either practice time or encouragement — will make the biggest difference right now.
              </Typography>

              {needs.map(n => <NeedCard key={n.topic} {...n} />)}

              <Box sx={{
                mt: 2,
                p: 2,
                background: `${COLORS.blue}08`,
                border: `1px solid ${COLORS.blue}20`,
                borderRadius: '10px',
              }}>
                <Typography variant="body2" sx={{ color: COLORS.textSecondary, lineHeight: 1.6 }}>
                  💡 <strong>Remember:</strong> Framing matters. Say <em>"Let's work on this together"</em> rather than <em>"Why don't you know this?"</em> — it keeps motivation high.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Action chips ── */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                <Typography sx={{ fontSize: '1.2rem' }}>🚀</Typography>
                <Typography variant="h6">How You Can Support</Typography>
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
                  📨 Send Aarav an Encouragement Note
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Next check-in ── */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{ border: `1px solid ${COLORS.green}30`, background: `${COLORS.green}06` }}>
            <CardContent sx={{ py: '14px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Typography sx={{ fontSize: '1.2rem' }}>📅</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Next progress check-in suggested: <strong>April 14, 2026</strong>
                </Typography>
                <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
                  Check back after 1 week to see Aarav's improvement in Polynomials and Science.
                </Typography>
                <Button variant="outlined" size="small" sx={{ ml: 'auto', borderColor: COLORS.green, color: COLORS.greenDark }}>
                  Set Reminder
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
}
