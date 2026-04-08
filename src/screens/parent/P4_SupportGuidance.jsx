import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Chip, Button, Grid, Divider, Collapse } from '@mui/material';
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
          Parent IA · Screen 4 of 4
        </Typography>
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', fontFamily: "'DM Sans'", lineHeight: 1.3 }}>
          4. Support Guidance
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', fontFamily: "'Inter'", mt: 0.3 }}>
          Action-oriented suggestions for parents
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', flexGrow: 1 }}>
        {[
          { icon: '🔍', text: "What your child needs help with" },
          { icon: '🤝', text: 'How you can support' },
          { icon: '📚', text: 'Encourage revision' },
          { icon: '🗓️', text: 'Help maintain routine' },
          { icon: '🎯', text: 'Focus on specific topics' },
        ].map(({ icon, text }) => (
          <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Typography sx={{ fontSize: '0.82rem' }}>{icon}</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.73rem', fontFamily: "'Inter'" }}>{text}</Typography>
          </Box>
        ))}
      </Box>
      <Chip label="Empowered, not anxious" size="small"
        sx={{ background: `${COLORS.blue}20`, color: COLORS.blue, border: `1px solid ${COLORS.blue}38`, fontSize: '0.67rem', fontWeight: 600, height: 24 }} />
    </Box>
  );
}

const needs = [
  { topic: 'Polynomials', note: 'Needs more practice — attempted 3 times, still building confidence', icon: '📐', color: COLORS.yellow },
  { topic: 'Coordinate Geometry', note: "Hasn't started yet — this is coming up in exams soon", icon: '📊', color: COLORS.amber },
  { topic: 'Chemical Reactions', note: 'Completing questions but making small conceptual errors', icon: '🔬', color: COLORS.yellow },
];

const actions = [
  { icon: '📚', title: 'Encourage 20 min revision daily', detail: 'Even short focused sessions compound into big improvements over time. Help Aarav set a fixed study time each evening.', color: COLORS.green },
  { icon: '🗓️', title: 'Help maintain a study routine', detail: 'Consistency matters more than intensity. A daily routine — even on weekends — keeps momentum going.', color: COLORS.blue },
  { icon: '🎯', title: 'Focus on Algebra this week', detail: 'Polynomials and Algebra are linked. A few targeted sessions this week can unlock a lot of progress.', color: COLORS.purple },
  { icon: '💬', title: 'Celebrate small wins', detail: 'A word of encouragement when Aarav completes a chapter or hits a streak milestone goes a long way.', color: COLORS.yellow },
];

function NeedCard({ topic, note, icon, color }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.8, p: '14px 16px', borderRadius: '12px', background: `${color}07`, border: `1px solid ${color}22`, mb: 1.4 }}>
      <Box sx={{ width: 38, height: 38, borderRadius: '10px', background: `${color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: '0.87rem', mb: 0.3, color: COLORS.textPrimary, fontFamily: "'DM Sans'" }}>{topic}</Typography>
        <Typography sx={{ fontSize: '0.78rem', color: COLORS.textSecondary, lineHeight: 1.55, fontFamily: "'Inter'" }}>{note}</Typography>
      </Box>
    </Box>
  );
}

function ActionCard({ icon, title, detail, color }) {
  const [open, setOpen] = useState(false);
  return (
    <Card elevation={0} onClick={() => setOpen(v => !v)} sx={{
      cursor: 'pointer', mb: 1.4,
      border: `1px solid ${open ? color + '45' : COLORS.border}`,
      transition: 'all 0.2s ease',
      '&:hover': { borderColor: `${color}38`, boxShadow: `0 4px 14px ${color}12` },
    }}>
      <CardContent sx={{ p: '13px 16px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: `${color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
            {icon}
          </Box>
          <Typography sx={{ fontWeight: 600, fontSize: '0.86rem', color: COLORS.textPrimary, flexGrow: 1, fontFamily: "'Inter'" }}>{title}</Typography>
          <Typography sx={{ color: COLORS.textMuted, fontSize: '0.78rem', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none', lineHeight: 1 }}>▾</Typography>
        </Box>
        <Collapse in={open}>
          <Box sx={{ mt: 1.4, pl: '52px' }}>
            <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary, lineHeight: 1.65, fontFamily: "'Inter'" }}>{detail}</Typography>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default function P4_SupportGuidance() {
  return (
    <Layout role="parent" title="How to Support Aarav" subtitle="Practical, friendly guidance for parents">
      <IAHeader />
      <Grid container spacing={2.5}>

        {/* Dark hero banner */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{ background: `linear-gradient(135deg, ${COLORS.bgNav} 0%, #3d3858 100%)`, border: 'none' }}>
            <CardContent sx={{ p: '20px 24px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap' }}>
                <Typography sx={{ fontSize: '2.2rem' }}>🧭</Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem', mb: 0.4, fontFamily: "'DM Sans'" }}>
                    You're a key part of Aarav's learning journey
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', lineHeight: 1.6, fontFamily: "'Inter'" }}>
                    Small, consistent encouragement from you has a huge impact. Here's how you can help right now.
                  </Typography>
                </Box>
                <Chip label="GPS Rerouting: On track 🗺️" sx={{ background: `${COLORS.green}28`, color: COLORS.green, fontWeight: 600, fontSize: '0.76rem', border: `1px solid ${COLORS.green}48`, flexShrink: 0 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* What Aarav needs */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ p: '22px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                <Typography sx={{ fontSize: '1.1rem' }}>🔍</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', fontFamily: "'DM Sans'", color: COLORS.textPrimary }}>What Aarav Needs Help With</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary, mb: 2, lineHeight: 1.65, fontFamily: "'Inter'" }}>
                These are areas where extra attention — practice time or encouragement — will make the biggest difference right now.
              </Typography>
              {needs.map(n => <NeedCard key={n.topic} {...n} />)}
              <Box sx={{ mt: 1.5, p: '12px 16px', background: `${COLORS.blue}07`, border: `1px solid ${COLORS.blue}18`, borderRadius: '10px' }}>
                <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary, lineHeight: 1.65, fontFamily: "'Inter'" }}>
                  💡 <strong>Framing matters.</strong> Say <em>"Let's work on this together"</em> rather than <em>"Why don't you know this?"</em> — it keeps motivation high.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* How you can support */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ p: '22px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                <Typography sx={{ fontSize: '1.1rem' }}>🚀</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', fontFamily: "'DM Sans'", color: COLORS.textPrimary }}>How You Can Support</Typography>
                <Chip label="Tap to expand" size="small" sx={{ ml: 'auto', background: COLORS.divider, color: COLORS.textMuted, fontSize: '0.66rem', height: 22 }} />
              </Box>
              <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary, mb: 2, lineHeight: 1.65, fontFamily: "'Inter'" }}>
                Suggested actions — tap any card below for more detail.
              </Typography>
              {actions.map(a => <ActionCard key={a.title} {...a} />)}
              <Divider sx={{ my: 2 }} />
              <Button variant="contained" fullWidth sx={{ background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenDark})`, color: '#fff', py: 1.2, fontSize: '0.82rem', fontFamily: "'DM Sans'", fontWeight: 700, boxShadow: `0 4px 14px ${COLORS.green}38`, '&:hover': { boxShadow: `0 6px 20px ${COLORS.green}52` } }}>
                📨 Send Aarav an Encouragement Note
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Check-in reminder */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{ border: `1px solid ${COLORS.green}28`, background: `${COLORS.green}05` }}>
            <CardContent sx={{ p: '13px 20px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Typography sx={{ fontSize: '1.1rem' }}>📅</Typography>
                <Typography sx={{ fontWeight: 600, fontSize: '0.88rem', color: COLORS.textPrimary, fontFamily: "'DM Sans'" }}>
                  Next progress check-in: <strong>April 14, 2026</strong>
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary, fontFamily: "'Inter'" }}>
                  Check back after 1 week to see Aarav's improvement in Polynomials and Science.
                </Typography>
                <Button variant="outlined" size="small" sx={{ ml: 'auto', borderColor: COLORS.green, color: COLORS.greenDark, fontSize: '0.78rem', fontFamily: "'Inter'", flexShrink: 0 }}>
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