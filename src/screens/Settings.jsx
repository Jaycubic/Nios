import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Layout from '../components/Layout';
import { COLORS } from '../theme';

export default function Settings() {
  return (
    <Layout role="student" title="Settings" subtitle="Manage your account preferences">
      <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Card elevation={0} sx={{ border: `1px solid ${COLORS.border}`, borderRadius: '16px' }}>
          <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Box sx={{ width: 64, height: 64, borderRadius: '16px', background: COLORS.purpleLight, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
              <Typography sx={{ fontSize: '2rem' }}>⚙️</Typography>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: COLORS.textPrimary, mb: 1 }}>
              Settings Overview
            </Typography>
            <Typography sx={{ color: COLORS.textSecondary, mb: 4, maxWidth: 400 }}>
              This is a dummy settings screen. Additional configuration options will be available here in the future.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
}
