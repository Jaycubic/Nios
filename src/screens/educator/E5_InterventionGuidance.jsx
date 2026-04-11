// src/screens/educator/E5_InterventionGuidance.jsx
import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Chip, Button, Grid, Divider, Snackbar, Alert,
} from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── Data ────────────────────────────────────────────────────────────────────
const conceptRecs = [
  { id: 'C1', topic: 'Basic Algebra', reason: 'Foundation required before quadratic formula work', priority: 'high', icon: '📐', subject: 'Math' },
  { id: 'C2', topic: 'Quadratic Formula', reason: 'Core gap — substitution error pattern confirmed in 4 Qs', priority: 'high', icon: '🔢', subject: 'Math' },
  { id: 'C3', topic: 'Trigonometry Basics', reason: 'Confusing complementary angle values — needs table review', priority: 'medium', icon: '📐', subject: 'Math' },
];

const practiceRecs = [
  { id: 'P1', label: '10 questions on Linear Equations', type: 'Adaptive drill', est: '~15 min', icon: '📝', color: COLORS.blue },
  { id: 'P2', label: '2 practice sets — Trigonometry basics', type: 'Concept building', est: '~20 min', icon: '📝', color: COLORS.purple },
  { id: 'P3', label: 'Quadratic Formula step drill (5 Qs)', type: 'Targeted practice', est: '~12 min', icon: '📋', color: COLORS.green },
];

const teachingStrategies = [
  { icon: '🔢', text: 'Focus on step-by-step solving — break each problem into labelled steps before computing' },
  { icon: '📉', text: 'Reduce problem complexity initially — start with simpler variants before full equations' },
  { icon: '🖼️', text: 'Use visual explanations for concepts — triangle diagrams for trig, number lines for algebra' },
];

const priorityStyle = {
  high: { bg: `${COLORS.amber}18`, color: COLORS.amberDark, label: '🔴 High' },
  medium: { bg: `${COLORS.yellow}15`, color: COLORS.yellowDark, label: '🟡 Medium' },
  low: { bg: `${COLORS.blue}12`, color: COLORS.blue, label: '🔵 Low' },
};

// ─── §5A: Concept recommendation card ────────────────────────────────────────
function ConceptRecCard({ id, topic, reason, priority, icon, subject, onAssign, assigned }) {
  const ps = priorityStyle[priority];
  return (
    <Box sx={{
      p: 2, borderRadius: '14px', mb: 1.5,
      background: assigned ? `${COLORS.green}08` : COLORS.bgWarm,
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
            flexShrink: 0, minWidth: 80, fontSize: '0.72rem', py: 0.6,
            background: assigned ? 'transparent' : `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.purpleDark})`,
            color: assigned ? COLORS.greenDark : '#fff',
            borderColor: assigned ? COLORS.green : 'transparent',
            boxShadow: assigned ? 'none' : `0 3px 8px ${COLORS.purple}35`,
          }}
        >
          {assigned ? '✓ Assigned' : 'Assign →'}
        </Button>
      </Box>
    </Box>
  );
}

// ─── §5B: Practice recommendation card ───────────────────────────────────────
function PracticeRecCard({ id, label, type, est, icon, color, onSend, sent }) {
  return (
    <Box sx={{
      p: 2, borderRadius: '14px', mb: 1.5,
      background: sent ? `${COLORS.green}08` : COLORS.bgWarm,
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
          <Chip label={est} size="small" sx={{ height: 18, fontSize: '0.62rem', background: COLORS.divider, color: COLORS.textMuted, '& .MuiChip-label': { px: 0.8 } }} />
        </Box>
      </Box>
      <Button
        variant={sent ? 'outlined' : 'contained'}
        size="small"
        onClick={() => onSend(id)}
        sx={{
          flexShrink: 0, fontSize: '0.72rem', py: 0.6, minWidth: 100,
          background: sent ? 'transparent' : `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenDark})`,
          color: sent ? COLORS.greenDark : '#fff',
          borderColor: sent ? COLORS.green : 'transparent',
          boxShadow: sent ? 'none' : `0 3px 8px ${COLORS.green}35`,
        }}
      >
        {sent ? '✓ Sent' : 'Send →'}
      </Button>
    </Box>
  );
}

// ─── §5C: Teaching Strategy ───────────────────────────────────────────────────
function TeachingStrategy() {
  const [copied, setCopied] = useState(false);
  return (
    <Card elevation={0}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ fontSize: '1.1rem' }}>🎓</Typography>
            <Typography variant="h6">Teaching Strategy</Typography>
          </Box>
          <Button
            size="small"
            sx={{
              fontSize: '0.7rem', py: 0.4,
              background: copied ? `${COLORS.green}15` : `${COLORS.blue}12`,
              color: copied ? COLORS.greenDark : COLORS.blue,
              border: `1px solid ${copied ? COLORS.green : COLORS.blue}30`,
              '&:hover': { background: copied ? `${COLORS.green}22` : `${COLORS.blue}22` },
            }}
            onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          >
            {copied ? '✓ Copied!' : 'Copy Plan →'}
          </Button>
        </Box>

        <Box sx={{
          p: 2, borderRadius: '12px', mb: 2,
          background: `${COLORS.purple}08`, border: `1px solid ${COLORS.purple}20`,
        }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: COLORS.purpleDark, mb: 0.5 }}>
            🎯 Suggested Approach for Rahul
          </Typography>
          <Typography variant="caption" sx={{ color: COLORS.textSecondary, lineHeight: 1.5 }}>
            Based on diagnosed error patterns and concept gaps. Tailored to student learning pace and struggle zones.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {teachingStrategies.map((s, i) => (
            <Box key={i} sx={{
              display: 'flex', alignItems: 'flex-start', gap: 2,
              p: '12px 16px', borderRadius: '12px',
              background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`,
              transition: 'all 0.15s',
              '&:hover': { border: `1px solid ${COLORS.purple}35`, background: `${COLORS.purple}05` },
            }}>
              <Box sx={{
                width: 34, height: 34, borderRadius: '10px',
                background: `${COLORS.purple}12`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', flexShrink: 0,
              }}>{s.icon}</Box>
              <Typography sx={{ fontSize: '0.85rem', color: COLORS.textPrimary, lineHeight: 1.6, pt: 0.3 }}>
                {s.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function E5_InterventionGuidance() {
  const [assigned, setAssigned] = useState({});
  const [sent, setSent] = useState({});
  const [snack, setSnack] = useState(null);

  const handleAssign = (id) => {
    setAssigned(p => ({ ...p, [id]: !p[id] }));
    setSnack(assigned[id] ? null : 'Concept revision task assigned to Rahul!');
  };
  const handleSend = (id) => {
    setSent(p => ({ ...p, [id]: !p[id] }));
    setSnack(sent[id] ? null : 'Practice questions sent to Rahul\'s dashboard!');
  };
  const assignAll = () => { const s = {}; conceptRecs.forEach(r => s[r.id] = true); setAssigned(s); setSnack('All concept tasks assigned!'); };
  const sendAll = () => { const s = {}; practiceRecs.forEach(r => s[r.id] = true); setSent(s); setSnack('All practice sets sent!'); };

  return (
    <Layout
      role="educator"
      title="Intervention Guidance — Rahul Sharma"
      subtitle="Concept · Practice · Teaching strategy"
    >
      <Grid container spacing={2.5}>

        {/* §5A: Concept Recommendations */}
        <Grid item xs={12} lg={4}>
          <Card elevation={0}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: '1.1rem' }}>🔬</Typography>
                  <Typography variant="h6">Concept Recommendations</Typography>
                </Box>
                <Chip label="Revisit" size="small" sx={{ background: `${COLORS.purple}12`, color: COLORS.purpleDark, fontWeight: 600, fontSize: '0.68rem', border: `1px solid ${COLORS.purple}28` }} />
              </Box>
              {conceptRecs.map(r => (
                <ConceptRecCard key={r.id} {...r} onAssign={handleAssign} assigned={!!assigned[r.id]} />
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* §5B: Practice Recommendations */}
        <Grid item xs={12} lg={4}>
          <Card elevation={0}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontSize: '1.1rem' }}>📋</Typography>
                  <Typography variant="h6">Practice Recommendations</Typography>
                </Box>
                <Chip label="Assign" size="small" sx={{ background: `${COLORS.green}12`, color: COLORS.greenDark, fontWeight: 600, fontSize: '0.68rem', border: `1px solid ${COLORS.green}28` }} />
              </Box>
              {practiceRecs.map(r => (
                <PracticeRecCard key={r.id} {...r} onSend={handleSend} sent={!!sent[r.id]} />
              ))}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ p: 1.5, borderRadius: '10px', background: `${COLORS.blue}08`, border: `1px solid ${COLORS.blue}20` }}>
                <Typography variant="caption" sx={{ color: COLORS.textSecondary, lineHeight: 1.6 }}>
                  📬 Sent questions appear directly in Rahul's practice panel for next session.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* §5C: Teaching Strategy */}
        <Grid item xs={12} lg={4}>
          <TeachingStrategy />
        </Grid>

      </Grid>

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
