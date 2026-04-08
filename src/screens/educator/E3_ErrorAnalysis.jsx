import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Chip, Grid, Divider, Button } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

const questions = [
  {
    id: 'Q1',
    topic: 'Polynomials',
    question: 'Factorise: x² + 5x + 6',
    steps: [
      { step: 1, label: 'Identify the polynomial type',   status: 'correct',  note: 'Correctly identified as quadratic trinomial'     },
      { step: 2, label: 'Find factor pairs of constant',  status: 'correct',  note: 'Correctly listed: (1,6) and (2,3)'               },
      { step: 3, label: 'Select pair that sums to middle',status: 'error',    note: 'Selected (1,6) instead of (2,3) — sum was wrong'  },
      { step: 4, label: 'Write factored form',            status: 'skipped',  note: 'Not attempted — error in step 3 led to confusion'  },
    ],
    rootCause: 'Addition error: confused sum vs product condition for factor pairs',
    concept: 'Factor pair selection in trinomial factorisation',
  },
  {
    id: 'Q2',
    topic: 'Square Roots',
    question: 'Simplify: √(48)',
    steps: [
      { step: 1, label: 'Prime factorisation of 48',        status: 'correct', note: '48 = 2⁴ × 3 — correct'                      },
      { step: 2, label: 'Group factors into pairs',         status: 'error',   note: 'Grouped as (2²×2²×3) — missed pairing rule'  },
      { step: 3, label: 'Extract paired factors',           status: 'error',   note: 'Extracted 4 instead of 4√3'                  },
      { step: 4, label: 'Write simplified radical',         status: 'error',   note: 'Wrote √48 = 4 (incorrect, missed √3)'        },
    ],
    rootCause: 'Misconception: doesn\'t understand that unpaired prime stays inside the radical',
    concept: 'Radical simplification — paired vs unpaired prime factors',
  },
];

function StepRow({ step, label, status, note }) {
  const styles = {
    correct: { bg: `${COLORS.green}12`,  border: `${COLORS.green}30`,  dot: COLORS.green,  icon: '✓', textColor: COLORS.greenDark  },
    error:   { bg: `${COLORS.amber}12`,  border: `${COLORS.amber}30`,  dot: COLORS.amber,  icon: '✗', textColor: COLORS.amberDark  },
    skipped: { bg: COLORS.divider,       border: COLORS.border,        dot: COLORS.textMuted, icon: '—', textColor: COLORS.textMuted },
  };
  const s = styles[status];

  return (
    <Box sx={{
      display: 'flex',
      gap: 1.5,
      p: '10px 14px',
      borderRadius: '10px',
      background: s.bg,
      border: `1px solid ${s.border}`,
      mb: 0.8,
      transition: 'all 0.15s',
      '&:hover': { transform: 'translateX(2px)' },
    }}>
      {/* Step indicator */}
      <Box sx={{
        width: 26, height: 26, borderRadius: '50%',
        background: s.dot,
        color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.75rem',
        fontWeight: 800,
        flexShrink: 0,
        fontFamily: "'DM Sans'",
      }}>{s.icon}</Box>

      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
          <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: COLORS.textMuted, fontFamily: "'Inter'" }}>Step {step}</Typography>
          <Chip label={status} size="small" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 700, background: `${s.dot}18`, color: s.textColor, '& .MuiChip-label': { px: 0.8 } }} />
        </Box>
        <Typography sx={{ fontWeight: 600, fontSize: '0.83rem', color: COLORS.textPrimary, mb: 0.3 }}>{label}</Typography>
        <Typography variant="caption" sx={{ color: COLORS.textSecondary, lineHeight: 1.5 }}>{note}</Typography>
      </Box>
    </Box>
  );
}

function QuestionCard({ q, expanded, onToggle }) {
  return (
    <Card elevation={0} sx={{ mb: 2, border: expanded ? `1px solid ${COLORS.amber}40` : `1px solid ${COLORS.border}` }}>
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: expanded ? 2 : 0, cursor: 'pointer' }} onClick={onToggle}>
          <Box sx={{
            px: 1.5, py: 0.5, borderRadius: '8px',
            background: `${COLORS.purple}18`,
            border: `1px solid ${COLORS.purple}30`,
            flexShrink: 0,
          }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.78rem', color: COLORS.purple, fontFamily: "'DM Sans'" }}>{q.id}</Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
              <Chip label={q.topic} size="small" sx={{ height: 20, fontSize: '0.68rem', fontWeight: 600, background: `${COLORS.blue}15`, color: COLORS.blue, '& .MuiChip-label': { px: 1 } }} />
              <Chip
                label={`${q.steps.filter(s => s.status === 'error').length} error${q.steps.filter(s => s.status === 'error').length > 1 ? 's' : ''}`}
                size="small"
                sx={{ height: 20, fontSize: '0.68rem', fontWeight: 700, background: `${COLORS.amber}18`, color: COLORS.amberDark, '& .MuiChip-label': { px: 1 } }}
              />
            </Box>
            <Typography sx={{ fontStyle: 'italic', color: COLORS.textSecondary, fontSize: '0.85rem' }}>"{q.question}"</Typography>
          </Box>
          <Typography sx={{ color: COLORS.textMuted, transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'none', mt: 0.5 }}>▾</Typography>
        </Box>

        {/* Expanded steps */}
        {expanded && (
          <>
            <Typography variant="overline" sx={{ display: 'block', mb: 1 }}>Step-by-step breakdown</Typography>
            {q.steps.map(s => <StepRow key={s.step} {...s} />)}

            <Divider sx={{ my: 2 }} />

            {/* Root cause */}
            <Box sx={{
              p: 2, borderRadius: '10px',
              background: `${COLORS.amber}10`,
              border: `1px solid ${COLORS.amber}28`,
              mb: 1.5,
            }}>
              <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: COLORS.amberDark, mb: 0.5 }}>⚡ Root Cause Identified</Typography>
              <Typography variant="body2" sx={{ color: COLORS.textPrimary, lineHeight: 1.6 }}>{q.rootCause}</Typography>
            </Box>

            <Box sx={{
              p: 2, borderRadius: '10px',
              background: `${COLORS.purple}10`,
              border: `1px solid ${COLORS.purple}28`,
            }}>
              <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: COLORS.purpleDark, mb: 0.5 }}>🔬 Concept to Address</Typography>
              <Typography variant="body2" sx={{ color: COLORS.textPrimary }}>{q.concept}</Typography>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function E3_ErrorAnalysis() {
  const [expanded, setExpanded] = useState(questions[0].id);

  return (
    <Layout
      role="educator"
      title="Step-wise Error Analysis — Aarav Mehta"
      subtitle="Understanding where and why errors occur at each problem step"
    >
      <Grid container spacing={2.5}>

        {/* ── Summary bar ── */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{ background: `${COLORS.bgNav}`, border: 'none' }}>
            <CardContent sx={{ py: '16px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                <Typography sx={{ color: '#fff', fontWeight: 600, fontFamily: "'DM Sans'" }}>🔍 Diagnosis Mode</Typography>
                {[
                  { label: 'Questions analysed', value: '2',  color: COLORS.blue   },
                  { label: 'Steps checked',       value: '8',  color: COLORS.purple },
                  { label: 'Errors found',        value: '5',  color: COLORS.amber  },
                  { label: 'Correct steps',       value: '3',  color: COLORS.green  },
                  { label: 'Root causes',         value: '2',  color: COLORS.yellow },
                ].map(s => (
                  <Box key={s.label} sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: s.color, fontFamily: "'DM Sans'", lineHeight: 1 }}>{s.value}</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>{s.label}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Question cards ── */}
        <Grid item xs={12} md={8}>
          <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>
            Recent errors with step analysis
          </Typography>
          {questions.map(q => (
            <QuestionCard
              key={q.id}
              q={q}
              expanded={expanded === q.id}
              onToggle={() => setExpanded(expanded === q.id ? null : q.id)}
            />
          ))}
        </Grid>

        {/* ── Pattern summary ── */}
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>Error Pattern Summary</Typography>
              {[
                { pattern: 'Calculation errors mid-step', count: 3, color: COLORS.amber  },
                { pattern: 'Incorrect rule application',  count: 2, color: COLORS.yellow },
                { pattern: 'Skipped steps',               count: 1, color: COLORS.textMuted },
              ].map(p => (
                <Box key={p.pattern} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ flexGrow: 1, color: COLORS.textPrimary }}>{p.pattern}</Typography>
                  <Chip label={p.count} size="small" sx={{ height: 20, minWidth: 28, fontSize: '0.72rem', fontWeight: 700, background: `${p.color}18`, color: p.color, '& .MuiChip-label': { px: 0.8 } }} />
                </Box>
              ))}
            </CardContent>
          </Card>

          <Card elevation={0}>
            <CardContent>
              <Typography variant="overline" sx={{ display: 'block', mb: 1.5 }}>Suggested Next Step</Typography>
              <Typography variant="body2" sx={{ color: COLORS.textSecondary, lineHeight: 1.7, mb: 2 }}>
                Based on error patterns, Aarav needs targeted practice on <strong>factor selection logic</strong> and <strong>radical simplification rules</strong> before advancing.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                size="small"
                sx={{
                  background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.purpleDark})`,
                  color: '#fff',
                  boxShadow: `0 3px 10px ${COLORS.purple}40`,
                }}
              >
                → View Concept Gaps
              </Button>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
}
