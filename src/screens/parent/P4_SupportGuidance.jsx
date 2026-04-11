// src/screens/parent/P4_SupportGuidance.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── Data Map (Wireframe) ────────────────────────────────────────────────────
const supportData = {
  needsHelp: [
    { id: 1, issue: "Math revision consistency", action: "Encourage revision" },
    { id: 2, issue: "Daily study habits", action: "Help maintain routine" },
    { id: 3, issue: "Science problem-solving", action: "Focus on specific topics" }
  ],
  howToHelp: [
    { id: 1, text: "Encourage 15–20 minutes of daily practice", icon: "⏱️" },
    { id: 2, text: "Ask your child to explain what they learned", icon: "🗣️" },
    { id: 3, text: "Appreciate small improvements", icon: "🌟" }
  ]
};

// ─── 5. WHERE SUPPORT IS NEEDED ──────────────────────────────────────────────
function WhereSupportNeeded() {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, color: COLORS.textPrimary }}>
        Where Support is Needed
      </Typography>
      <Typography variant="body1" sx={{ color: COLORS.textSecondary, mb: 3 }}>
        Action-oriented suggestions mapped directly to Aarav's recent learning patterns.
      </Typography>

      <Grid container spacing={2.5}>
        {supportData.needsHelp.map(item => (
          <Grid item xs={12} md={4} key={item.id}>
            <Card elevation={0} sx={{ height: '100%', border: `1px solid ${COLORS.amber}30`, background: `${COLORS.amber}05`, borderRadius: '12px' }}>
              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography variant="overline" sx={{ color: COLORS.amberDark, fontWeight: 700, mb: 1, display: 'block', letterSpacing: 0.5 }}>
                  What they need help with
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 700, color: COLORS.textPrimary, mb: 2, flexGrow: 1 }}>
                  {item.issue}
                </Typography>
                
                <Box sx={{ background: '#fff', p: 2, borderRadius: '8px', border: `1px solid ${COLORS.divider}` }}>
                  <Typography variant="caption" sx={{ color: COLORS.textMuted, fontWeight: 600, display: 'block', mb: 0.5, textTransform: 'uppercase' }}>
                    How you can support
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: COLORS.textPrimary }}>
                    {item.action}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ─── 6. HOW PARENTS CAN HELP ──────────────────────────────────────────────────
function HowParentsCanHelp() {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5, color: COLORS.textPrimary }}>
        How You Can Help at Home
      </Typography>
      <Typography variant="body1" sx={{ color: COLORS.textSecondary, mb: 3 }}>
        Small, practical ways to create a positive learning environment.
      </Typography>

      <Card elevation={0} sx={{ border: `1px solid ${COLORS.blue}20`, background: `${COLORS.blue}03`, borderRadius: '16px' }}>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {supportData.howToHelp.map((item) => (
              <Box key={item.id} sx={{ 
                display: 'flex', alignItems: 'center', gap: 2, 
                p: '16px 20px', background: '#fff', 
                borderRadius: '12px', border: `1px solid ${COLORS.divider}`,
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
              }}>
                <Box sx={{ 
                  width: 44, height: 44, borderRadius: '10px', background: `${COLORS.blue}10`, 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' 
                }}>
                  {item.icon}
                </Box>
                <Typography sx={{ fontWeight: 600, color: COLORS.textPrimary, fontSize: '1.05rem' }}>
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

// ─── Main Screen ─────────────────────────────────────────────────────────────
export default function P4_SupportGuidance() {
  return (
    <Layout
      role="parent"
      title="Guidance & Support"
      subtitle="How you can practically support Aarav."
    >
      <Box sx={{ maxWidth: 900, mx: 'auto', py: 2 }}>
        <WhereSupportNeeded />
        <HowParentsCanHelp />
      </Box>
    </Layout>
  );
}