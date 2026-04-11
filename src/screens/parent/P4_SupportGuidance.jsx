// src/screens/parent/P4_SupportGuidance.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

function SectionLabel({ children }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Typography sx={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.textMuted, fontFamily: "'Inter'" }}>
        {children}
      </Typography>
    </Box>
  );
}

export default function P4_SupportGuidance() {
  const supportNeeds = [
    { issue: 'Needs more practice in Math', action: 'Encourage revision of specific topics.' },
    { issue: 'Inconsistent study schedule', action: 'Help maintain a daily routine.' },
    { issue: 'Science concepts are confusing', action: 'Focus on recent textbook chapters.' }
  ];

  const parentTips = [
    { icon: '⏱️', text: 'Encourage 15–20 minutes of daily practice' },
    { icon: '🗣️', text: 'Ask your child to explain what they learned' },
    { icon: '🌟', text: 'Appreciate small improvements' }
  ];

  return (
    <Layout role="parent" title="Support Guidance" subtitle="How you can support Aarav at home">
      <Grid container spacing={3}>
        
        {/* WHERE SUPPORT IS NEEDED */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <SectionLabel>Where Support Is Needed</SectionLabel>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {supportNeeds.map((item, i) => (
                  <Box key={i} sx={{ p: 2.5, borderRadius: '12px', background: COLORS.bgWarm, border: `1px solid ${COLORS.border}` }}>
                    <Box sx={{ mb: 1.5 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.75rem', color: COLORS.textMuted, textTransform: 'uppercase', mb: 0.5 }}>What your child needs help with</Typography>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: COLORS.textPrimary }}>
                        {item.issue}
                      </Typography>
                    </Box>
                    <Box sx={{ p: 1.5, background: `${COLORS.amber}10`, borderRadius: '8px', border: `1px solid ${COLORS.amber}25` }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.75rem', color: COLORS.amberDark, textTransform: 'uppercase', mb: 0.5 }}>How you can support</Typography>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: COLORS.textPrimary, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <span style={{ fontSize: '1.1rem'}}>💡</span> {item.action}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* HOW PARENTS CAN HELP */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%', background: `${COLORS.purple}08`, border: `1px solid ${COLORS.purple}20` }}>
            <CardContent>
              <SectionLabel>How Parents Can Help Today</SectionLabel>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {parentTips.map((tip, i) => (
                   <Box key={i} sx={{ 
                     display: 'flex', alignItems: 'center', gap: 2, p: 2, 
                     borderRadius: '12px', background: COLORS.bgCard, border: `1px solid ${COLORS.divider}` 
                   }}>
                      <Box sx={{ 
                        width: 44, height: 44, borderRadius: '12px', 
                        background: `${COLORS.purple}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        fontSize: '1.2rem', flexShrink: 0 
                      }}>
                        {tip.icon}
                      </Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: COLORS.textPrimary }}>
                        {tip.text}
                      </Typography>
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