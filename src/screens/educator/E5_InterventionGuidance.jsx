import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Chip, Button, Grid, Divider, Snackbar, Alert } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

const conceptRecs = [
  { id: 'C1', topic: 'Fraction Division',     reason: 'Attempted 6× with <45% accuracy — root cause confirmed', priority: 'high',   icon: '📐', subject: 'Math'    },
  { id: 'C2', topic: 'Square Root Basics',    reason: 'Misapplying simplification rule — needs rebuild from basics', priority: 'high', icon: '√',  subject: 'Math'    },
  { id: 'C3', topic: 'BODMAS Rules',          reason: 'Order of operations errors in multi-step problems',       priority: 'medium', icon: '🔢', subject: 'Math'    },
];

const practiceRecs = [
  { id: 'P1', label: '5 questions — Fraction Division (Basic)',  type: 'Adaptive drill',   est: '~12 min', icon: '📝', color: COLORS.blue   },
  { id: 'P2', label: '3 questions — Square Root Simplification', type: 'Concept building', est: '~8 min',  icon: '📝', color: COLORS.purple  },
  { id: 'P3', label: 'Chapter Test: Number Systems',             type: 'Assessment',       est: '~20 min', icon: '📋', color: COLORS.green   },
];

const priorityStyle = {
  high:   { bg: `${COLORS.amber}18`,  color: COLORS.amberDark,  label: '🔴 High priority'   },
  medium: { bg: `${COLORS.yellow}15`, color: COLORS.yellowDark, label: '🟡 Medium priority' },
  low:    { bg: `${COLORS.blue}12`,   color: COLORS.blue,       label: '🔵 Low priority'    },
};

function ConceptRecCard({ id, topic, reason, priority, icon, subject, onAssign, assigned }) {
  const ps = priorityStyle[priority];
  return (
    <Box sx={{
      p: 2, borderRadius: '12px', mb: 1.5,
      background: assigned ? `${COLORS.green}08` : `${COLORS.bgWarm}`,
      border: `1px solid ${assigned ? COLORS.green + '40' : COLORS.border}`,
      transition: 'all 0.2s',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <Box sx={{
          width: 38, height: 38, borderRadius: '10px',
          background: `${COLORS.blue}12`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem', flexShrink: 0,
        }}>{icon}</Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.4 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: COLORS.textPrimary }}>{topic}</Typography>
            <Chip label={subject} size="small" sx={{ height: 18, fontSize: '0.63rem', fontWeight: 600, background: `${COLORS.blue}12`, color: COLORS.blue, '& .MuiChip-label': { px: 0.8 } }} />
          </Box>
          <Typography variant="caption" sx={{ color: COLORS.textSecondary, lineHeight: 1.5, display: 'block', mb: 1 }}>{reason}</Typography>
          <Chip label={ps.label} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600, background: ps.bg, color: ps.color, border: `1px solid ${ps.color}30`, '& .MuiChip-label': { px: 1 } }} />
        </Box>
        <Button
          variant={assigned ? 'outlined' : 'contained'}
          size="small"
          onClick={() => onAssign(id)}
          sx={{
            flexShrink: 0,
            minWidth: 80,
            fontSize: '0.72rem',
            py: 0.6,
            background: assigned ? 'transparent' : `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.purpleDark})`,
            color: assigned ? COLORS.greenDark : '#fff',
            borderColor: assigned ? COLORS.green : 'transparent',
            boxShadow: assigned ? 'none' : `0 3px 8px ${COLORS.purple}35`,
            '&:hover': { boxShadow: assigned ? 'none' : `0 4px 12px ${COLORS.purple}50` },
          }}
        >
          {assigned ? '✓ Assigned' : 'Assign →'}
        </Button>
      </Box>
    </Box>
  );
}

function PracticeRecCard({ id, label, type, est, icon, color, onSend, sent }) {
  return (
    <Box sx={{
      p: 2, borderRadius: '12px', mb: 1.5,
      background: sent ? `${COLORS.green}08` : `${COLORS.bgWarm}`,
      border: `1px solid ${sent ? COLORS.green + '40' : COLORS.border}`,
      display: 'flex', alignItems: 'center', gap: 1.5,
      transition: 'all 0.2s',
    }}>
      <Box sx={{
        width: 38, height: 38, borderRadius: '10px',
        background: `${color}12`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1rem', flexShrink: 0,
      }}>{icon}</Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '0.83rem', color: COLORS.textPrimary, mb: 0.3 }}>{label}</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip label={type} size="small" sx={{ height: 18, fontSize: '0.62rem', background: `${color}12`, color, '& .MuiChip-label': { px: 0.8 } }} />
          <Chip label={est}  size="small" sx={{ height: 18, fontSize: '0.62rem', background: COLORS.divider, color: COLORS.textMuted, '& .MuiChip-label': { px: 0.8 } }} />
        </Box>
      </Box>
      <Button
        variant={sent ? 'outlined' : 'contained'}
        size="small"
        onClick={() => onSend(id)}
        sx={{
          flexShrink: 0,
          fontSize: '0.72rem',
          py: 0.6,
          minWidth: 100,
          background: sent ? 'transparent' : `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenDark})`,
          color: sent ? COLORS.greenDark : '#fff',
          borderColor: sent ? COLORS.green : 'transparent',
          boxShadow: sent ? 'none' : `0 3px 8px ${COLORS.green}35`,
        }}
      >
        {sent ? '✓ Sent' : 'Send to Student →'}
      </Button>
    </Box>
  );
}

export default function E5_InterventionGuidance() {
  const [assigned, setAssigned] = useState({});
  const [sent, setSent]         = useState({});
  const [snack, setSnack]       = useState(null);

  const handleAssign = (id) => {
    setAssigned(p => ({ ...p, [id]: !p[id] }));
    setSnack(assigned[id] ? null : 'Concept revision task assigned to Aarav!');
  };
  const handleSend = (id) => {
    setSent(p => ({ ...p, [id]: !p[id] }));
    setSnack(sent[id] ? null : 'Practice questions sent to Aarav\'s dashboard!');
  };

  const assignAll  = () => { const s = {}; conceptRecs.forEach(r => s[r.id] = true); setAssigned(s); setSnack('All concept tasks assigned!'); };
  const sendAll    = () => { const s = {}; practiceRecs.forEach(r => s[r.id] = true); setSent(s);    setSnack('All practice sets sent to Aarav!'); };

  return (
    <Layout
      role="educator"
      title="Intervention Guidance — Aarav Mehta"
      subtitle="Translate diagnosis into actionable next steps"
    >
      <Grid container spacing={2.5}>

        {/* ── Header summary ── */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{ background: COLORS.bgNav, border: 'none' }}>
            <CardContent sx={{ py: '16px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                <Box>
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontFamily: "'DM Sans'", fontSize: '1rem' }}>🎯 Intervention Plan for Aarav Mehta</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', mt: 0.3 }}>
                    Based on 6 concept gaps and 5 diagnosed errors — personalised recommendations below
                  </Typography>
                </Box>
                <Box sx={{ ml: 'auto', display: 'flex', gap: 1.5 }}>
                  <Button
                    size="small"
                    onClick={assignAll}
                    sx={{ background: `${COLORS.purple}30`, color: COLORS.purple, border: `1px solid ${COLORS.purple}50`, fontSize: '0.75rem', '&:hover': { background: `${COLORS.purple}45` } }}
                  >
                    Assign All →
                  </Button>
                  <Button
                    size="small"
                    onClick={sendAll}
                    sx={{ background: `${COLORS.green}30`, color: COLORS.green, border: `1px solid ${COLORS.green}50`, fontSize: '0.75rem', '&:hover': { background: `${COLORS.green}45` } }}
                  >
                    Send All →
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Concept recommendations ── */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: '1.1rem' }}>🔬</Typography>
                  <Typography variant="h6">Concept Recommendations</Typography>
                </Box>
                <Chip label="Topics to revisit" size="small" sx={{ background: `${COLORS.purple}14`, color: COLORS.purpleDark, fontWeight: 600, fontSize: '0.7rem', border: `1px solid ${COLORS.purple}30` }} />
              </Box>

              {conceptRecs.map(r => (
                <ConceptRecCard key={r.id} {...r} onAssign={handleAssign} assigned={!!assigned[r.id]} />
              ))}

              <Divider sx={{ my: 2 }} />

              <Typography variant="body2" sx={{ color: COLORS.textSecondary, lineHeight: 1.6 }}>
                💡 Assigning a concept task sends it to Aarav's <em>To-Do</em> panel with linked revision material.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Practice recommendations ── */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: '1.1rem' }}>📋</Typography>
                  <Typography variant="h6">Practice Recommendations</Typography>
                </Box>
                <Chip label="Suggested exercises" size="small" sx={{ background: `${COLORS.green}14`, color: COLORS.greenDark, fontWeight: 600, fontSize: '0.7rem', border: `1px solid ${COLORS.green}30` }} />
              </Box>

              {practiceRecs.map(r => (
                <PracticeRecCard key={r.id} {...r} onSend={handleSend} sent={!!sent[r.id]} />
              ))}

              <Divider sx={{ my: 2 }} />

              <Box sx={{
                p: 2, borderRadius: '10px',
                background: `${COLORS.green}08`,
                border: `1px solid ${COLORS.green}22`,
              }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: COLORS.greenDark }}>📈 Expected impact</Typography>
                <Typography variant="body2" sx={{ color: COLORS.textSecondary, lineHeight: 1.6 }}>
                  Completing these 3 practice sets is estimated to improve overall accuracy by <strong>8–12%</strong> within 2 weeks, based on similar student patterns.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>

      {/* ── Toast notification ── */}
      <Snackbar
        open={!!snack}
        autoHideDuration={3000}
        onClose={() => setSnack(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSnack(null)} sx={{ borderRadius: '12px', fontFamily: "'Inter'" }}>
          {snack}
        </Alert>
      </Snackbar>
    </Layout>
  );
}
