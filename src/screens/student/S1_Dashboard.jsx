// src/screens/student/S1_Dashboard.jsx
import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Chip, LinearProgress,
  Divider, Button,
} from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── Data ─────────────────────────────────────────────────────────────────────
const syllabusSubjects = [
  { name: 'Math',           pct: 68, color: COLORS.blue    },
  { name: 'Science',        pct: 55, color: COLORS.green   },
  { name: 'English',        pct: 82, color: COLORS.purple  },
  { name: 'Hindi',          pct: 74, color: COLORS.yellow  },
  { name: 'Social Science', pct: 61, color: COLORS.amber   },
];
const overallPct = Math.round(syllabusSubjects.reduce((s, x) => s + x.pct, 0) / syllabusSubjects.length);

const todayGoals = [
  { id: 1, text: 'Solve 10 Trigonometry practice questions', done: true  },
  { id: 2, text: 'Revise Fundamental Identities (sin²θ + cos²θ)', done: true },
  { id: 3, text: 'Read Chapter 4 — Chemical Reactions (Science)', done: false },
  { id: 4, text: 'Complete 1 English grammar exercise set', done: false },
  { id: 5, text: 'Attempt 1 mock test section (Math)', done: false },
];

// Streak days: true = completed, false = not yet (today onwards)
const streakDays = [
  { day: 'WED', done: true  },
  { day: 'THU', done: true  },
  { day: 'FRI', done: true  },
  { day: 'SAT', done: true  },
  { day: 'SUN', done: true  },
  { day: 'MON', done: true  },
  { day: 'TUE', done: false },
];
const streakCount = 6;

const improvementAreas = [
  { subject: 'Math — Trigonometry',      tag: 'Needs Focus', color: COLORS.amber  },
  { subject: 'Math — Quadratic Equations', tag: 'Needs Focus', color: COLORS.amber },
  { subject: 'Science — Chemical Reactions', tag: 'Review', color: COLORS.yellow  },
  { subject: 'English — Grammar',        tag: 'Needs Focus', color: COLORS.amber  },
];

const workingWell = [
  { subject: 'English — Reading Skills',    icon: '📖' },
  { subject: 'Math — Algebra Basics',       icon: '✅' },
  { subject: 'Science — Physics Numericals', icon: '🔬' },
  { subject: 'Hindi — Essay Writing',       icon: '✍️' },
];

const learningPaths = [
  {
    subject: 'Math — Trigonometry',
    needsAttention: ['Standard Angle Values', 'Trigonometric Identities'],
    strengthen:     ['Basic Trig Ratios (sin/cos/tan)', 'Reciprocal Functions'],
    practice:       { count: 12, label: 'Adaptive Practice Questions' },
    color: COLORS.blue,
  },
  {
    subject: 'Science — Chemical Reactions',
    needsAttention: ['Balancing Equations', 'Types of Reactions'],
    strengthen:     ['Reactants & Products', 'Atomic Mass Concepts'],
    practice:       { count: 8, label: 'Practice Questions' },
    color: COLORS.green,
  },
  {
    subject: 'English — Grammar',
    needsAttention: ['Subject-Verb Agreement', 'Tense Usage'],
    strengthen:     ['Parts of Speech', 'Sentence Structure'],
    practice:       { count: 10, label: 'Practice Questions' },
    color: COLORS.purple,
  },
];

// ─── Ring SVG (donut chart) ───────────────────────────────────────────────────
function DonutRing({ pct, size = 110, stroke = 10, color = COLORS.green }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={COLORS.divider} strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.6s ease' }}
      />
    </svg>
  );
}

// ─── Streak circle ────────────────────────────────────────────────────────────
function StreakCircle({ day, done }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      <Box sx={{
        width: 36, height: 36, borderRadius: '50%',
        border: `2px solid ${done ? COLORS.green : COLORS.border}`,
        background: done ? `${COLORS.green}18` : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
      }}>
        {done ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill={COLORS.green}>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
        ) : (
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: COLORS.border }} />
        )}
      </Box>
      <Typography sx={{ fontSize: '0.6rem', fontWeight: 600, color: done ? COLORS.textSecondary : COLORS.textMuted, letterSpacing: 0.5 }}>
        {day}
      </Typography>
    </Box>
  );
}

// ─── Goal Row ─────────────────────────────────────────────────────────────────
function GoalRow({ text, done, index, totalDone }) {
  return (
    <Box sx={{
      display: 'flex', alignItems: 'flex-start', gap: 1.5,
      py: 1, borderBottom: `1px solid ${COLORS.divider}`,
      '&:last-child': { borderBottom: 'none', pb: 0 },
    }}>
      <Box sx={{
        width: 22, height: 22, borderRadius: '50%', flexShrink: 0, mt: 0.1,
        border: `2px solid ${done ? COLORS.green : COLORS.border}`,
        background: done ? COLORS.green : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
      }}>
        {done && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
        )}
      </Box>
      <Typography sx={{
        fontSize: '0.82rem', fontWeight: done ? 500 : 600,
        color: done ? COLORS.textMuted : COLORS.textPrimary,
        textDecoration: done ? 'line-through' : 'none',
        lineHeight: 1.45, flexGrow: 1,
        transition: 'all 0.2s',
      }}>
        {text}
      </Typography>
    </Box>
  );
}

// ─── Learning Path Row ────────────────────────────────────────────────────────
function LearningPathRow({ subject, needsAttention, strengthen, practice, color }) {
  const stages = [
    {
      label: '① Needs Attention',
      bg: `${COLORS.amber}15`, border: `${COLORS.amber}35`,
      labelColor: COLORS.amberDark,
      items: needsAttention,
      dotColor: COLORS.amber,
    },
    {
      label: '② Strengthen Foundation',
      bg: `${COLORS.yellow}12`, border: `${COLORS.yellow}35`,
      labelColor: COLORS.yellowDark,
      items: strengthen,
      dotColor: COLORS.yellow,
    },
    {
      label: '③ Apply & Practice',
      bg: `${COLORS.green}12`, border: `${COLORS.green}35`,
      labelColor: COLORS.greenDark,
      items: null,
      dotColor: COLORS.green,
    },
  ];

  return (
    <Box sx={{
      borderRadius: '14px', overflow: 'hidden',
      border: `1px solid ${COLORS.border}`,
      mb: 2,
      '&:last-child': { mb: 0 },
    }}>
      {/* Subject header */}
      <Box sx={{
        px: 2.5, py: 1.5,
        background: `${color}08`,
        borderBottom: `1px solid ${COLORS.border}`,
        display: 'flex', alignItems: 'center', gap: 1.5,
      }}>
        <Box sx={{ width: 10, height: 10, borderRadius: '3px', background: color, flexShrink: 0 }} />
        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: COLORS.textPrimary }}>{subject}</Typography>
      </Box>

      {/* Three stage columns */}
      <Grid container sx={{ minHeight: 100 }}>
        {stages.map((stage, i) => (
          <Grid item xs={12} sm={4} key={stage.label} sx={{
            borderRight: i < 2 ? `1px solid ${COLORS.border}` : 'none',
            '&:last-child': { borderRight: 'none' },
          }}>
            <Box sx={{
              p: 2, height: '100%',
              background: stage.bg,
              borderTop: `2px solid ${stage.border.replace('35', '60')}`,
            }}>
              <Typography sx={{
                fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.04em',
                textTransform: 'uppercase', color: stage.labelColor, mb: 1.2,
              }}>
                {stage.label}
              </Typography>
              {stage.items ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
                  {stage.items.map(item => (
                    <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: stage.dotColor, mt: 0.55, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: '0.78rem', color: COLORS.textPrimary, lineHeight: 1.4 }}>{item}</Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box>
                  <Typography sx={{ fontSize: '0.78rem', color: COLORS.textSecondary, mb: 1.2 }}>
                    {practice.count} {practice.label}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.greenDark} 100%)`,
                      color: '#fff', fontSize: '0.75rem', py: 0.6, px: 2,
                      boxShadow: `0 3px 8px ${COLORS.green}35`,
                      '&:hover': { boxShadow: `0 5px 14px ${COLORS.green}55` },
                    }}
                  >
                    Start Practice →
                  </Button>
                </Box>
              )}
            </Box>
            {/* Arrow connector (except last) */}
            {i < 2 && (
              <Box sx={{
                position: 'relative',
                display: { xs: 'none', sm: 'block' },
              }} />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function S1_Dashboard() {
  const [goals, setGoals] = useState(todayGoals);
  const doneCnt = goals.filter(g => g.done).length;
  const goalPct = Math.round((doneCnt / goals.length) * 100);

  const toggleGoal = (id) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  return (
    <Layout role="student" title="My Dashboard" subtitle="Grade 10 · NIOS Board · Aarav Singh">
      <Grid container spacing={2.5} alignItems="stretch">

        {/* ── ROW 1: 3 cards ── */}

        {/* 1A: Overall Syllabus Completion */}
        <Grid item xs={12} sm={4}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>
                Overall Syllabus Completion
              </Typography>

              {/* Big donut */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, position: 'relative' }}>
                <DonutRing pct={overallPct} size={120} stroke={11} color={COLORS.green} />
                <Box sx={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                }}>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.55rem', color: COLORS.textPrimary, lineHeight: 1, fontFamily: "'DM Sans'" }}>
                    {overallPct}%
                  </Typography>
                  <Typography sx={{ fontSize: '0.62rem', color: COLORS.textSecondary, fontWeight: 500 }}>Overall</Typography>
                </Box>
              </Box>

              {/* Per-subject bars */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, flexGrow: 1 }}>
                {syllabusSubjects.map(s => (
                  <Box key={s.name}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.4 }}>
                      <Typography sx={{ fontSize: '0.76rem', fontWeight: 600, color: COLORS.textPrimary }}>{s.name}</Typography>
                      <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: s.color }}>{s.pct}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={s.pct}
                      sx={{
                        height: 6, borderRadius: 6,
                        background: COLORS.divider,
                        '& .MuiLinearProgress-bar': { background: s.color, borderRadius: 6 },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 1B: Today's Goals — taller block */}
        <Grid item xs={12} sm={5}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="overline">Today's Goals</Typography>
                <Chip
                  label={`${doneCnt}/${goals.length} Done`}
                  size="small"
                  sx={{
                    height: 20, fontSize: '0.62rem', fontWeight: 700,
                    background: goalPct === 100 ? `${COLORS.green}18` : `${COLORS.blue}12`,
                    color: goalPct === 100 ? COLORS.greenDark : COLORS.blue,
                    border: `1px solid ${goalPct === 100 ? COLORS.green : COLORS.blue}30`,
                  }}
                />
              </Box>

              {/* Progress bar */}
              <Box sx={{ mb: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={goalPct}
                  sx={{
                    height: 7, borderRadius: 6,
                    background: COLORS.divider,
                    '& .MuiLinearProgress-bar': {
                      background: `linear-gradient(90deg, ${COLORS.green}, ${COLORS.greenDark})`,
                      borderRadius: 6,
                    },
                  }}
                />
                <Typography sx={{ fontSize: '0.68rem', color: COLORS.textMuted, mt: 0.5, textAlign: 'right' }}>
                  {goalPct}% complete today
                </Typography>
              </Box>

              {/* Goal list */}
              <Box sx={{ flexGrow: 1 }}>
                {goals.map((g, i) => (
                  <Box
                    key={g.id}
                    onClick={() => toggleGoal(g.id)}
                    sx={{ cursor: 'pointer', '&:hover': { opacity: 0.85 } }}
                  >
                    <GoalRow text={g.text} done={g.done} index={i} totalDone={doneCnt} />
                  </Box>
                ))}
              </Box>

              {/* Motivational note */}
              {goalPct === 100 ? (
                <Box sx={{
                  mt: 2, p: 1.5, borderRadius: '10px',
                  background: `${COLORS.green}10`, border: `1px solid ${COLORS.green}30`,
                }}>
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: COLORS.greenDark, textAlign: 'center' }}>
                    🎉 All done for today! Excellent work.
                  </Typography>
                </Box>
              ) : doneCnt > 0 ? (
                <Box sx={{ mt: 2, p: 1.2, borderRadius: '10px', background: `${COLORS.blue}08`, border: `1px solid ${COLORS.blue}20` }}>
                  <Typography sx={{ fontSize: '0.75rem', color: COLORS.blue, fontWeight: 600, textAlign: 'center' }}>
                    💪 Keep going — {goals.length - doneCnt} goal{goals.length - doneCnt > 1 ? 's' : ''} left!
                  </Typography>
                </Box>
              ) : null}
            </CardContent>
          </Card>
        </Grid>

        {/* 1C: Study Streaks */}
        <Grid item xs={12} sm={3}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Typography variant="overline" sx={{ display: 'block', mb: 0.5 }}>Study Streak</Typography>

              {/* Flame + count */}
              <Box sx={{ textAlign: 'center', mb: 2.5, mt: 1 }}>
                <Typography sx={{ fontSize: '2.8rem', lineHeight: 1, mb: 0.5 }}>🔥</Typography>
                <Typography sx={{
                  fontWeight: 800, fontSize: '2rem', color: COLORS.yellow,
                  fontFamily: "'DM Sans'", lineHeight: 1,
                }}>
                  {streakCount}
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: COLORS.textSecondary, fontWeight: 500, mt: 0.3 }}>
                  days streak
                </Typography>
              </Box>

              {/* Circle row */}
              <Box sx={{
                display: 'flex', justifyContent: 'space-between',
                gap: 0.5, mb: 2,
              }}>
                {streakDays.map(d => (
                  <StreakCircle key={d.day} day={d.day} done={d.done} />
                ))}
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* One-tick-on-arrival note */}
              <Box sx={{
                p: 1.5, borderRadius: '10px',
                background: `${COLORS.green}08`,
                border: `1px solid ${COLORS.green}20`,
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.6 }}>
                  <Box sx={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: COLORS.green,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </Box>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: COLORS.greenDark }}>
                    Today logged ✓
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.7rem', color: COLORS.textSecondary, lineHeight: 1.5 }}>
                  Complete all today's goals to fill the circle fully.
                </Typography>
                {/* Mini goal completion ring */}
                <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ position: 'relative', width: 38, height: 38, flexShrink: 0 }}>
                    <DonutRing pct={goalPct} size={38} stroke={4} color={COLORS.green} />
                    <Typography sx={{
                      position: 'absolute', top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '0.58rem', fontWeight: 800, color: COLORS.green,
                    }}>
                      {goalPct}%
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.72rem', color: COLORS.textSecondary, lineHeight: 1.4 }}>
                    Today's goal progress — circle fills as you complete tasks.
                  </Typography>
                </Box>
              </Box>

              {/* Encouragement */}
              <Box sx={{ mt: 'auto', pt: 2, textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.72rem', color: COLORS.textMuted, fontStyle: 'italic' }}>
                  "Small steps every day lead to big results."
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── ROW 2: Improvement Areas + What's Working ── */}
        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Box sx={{ width: 3, height: 22, borderRadius: 2, background: COLORS.amber }} />
                <Typography variant="overline">Improvement Areas</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary, mb: 2 }}>
                Focus on these to grow faster.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {improvementAreas.map(a => (
                  <Box key={a.subject} sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    p: '10px 14px', borderRadius: '10px',
                    background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`,
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: a.color, flexShrink: 0 }} />
                      <Typography sx={{ fontWeight: 600, fontSize: '0.84rem', color: COLORS.textPrimary }}>{a.subject}</Typography>
                    </Box>
                    <Chip
                      label={a.tag}
                      size="small"
                      sx={{
                        height: 20, fontSize: '0.62rem', fontWeight: 700,
                        background: `${a.color}15`, color: a.color,
                        border: `1px solid ${a.color}30`,
                        '& .MuiChip-label': { px: 1 },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card elevation={0} sx={{ height: '100%', background: `linear-gradient(135deg, ${COLORS.green}06, ${COLORS.blue}04)`, border: `1px solid ${COLORS.green}25` }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography sx={{ fontSize: '1.3rem' }}>🏆</Typography>
                <Typography variant="overline" sx={{ color: COLORS.greenDark }}>What's Working</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary, mb: 2 }}>
                You're doing great in these!
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {workingWell.map(w => (
                  <Box key={w.subject} sx={{
                    display: 'flex', alignItems: 'center', gap: 1.5,
                    p: '10px 14px', borderRadius: '10px',
                    background: `${COLORS.green}09`, border: `1px solid ${COLORS.green}25`,
                  }}>
                    <Box sx={{
                      width: 26, height: 26, borderRadius: '8px',
                      background: COLORS.green,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                    </Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.84rem', color: COLORS.textPrimary }}>{w.subject}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── ROW 3: Recommended Learning Path ── */}
        <Grid item xs={12}>
          <Card elevation={0}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Typography sx={{ fontSize: '1.1rem' }}>🗺️</Typography>
                <Typography variant="overline" sx={{ fontSize: '0.72rem' }}>Recommended Learning Path</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.78rem', color: COLORS.textSecondary, mb: 2.5, lineHeight: 1.6 }}>
                Follow each path from left to right — address gaps first, build your foundation, then apply with practice.
              </Typography>

              {/* Column header labels */}
              <Grid container sx={{ mb: 1.5, px: 0.5 }}>
                {[
                  { label: '① Needs Attention',      color: COLORS.amberDark  },
                  { label: '② Strengthen Foundation', color: COLORS.yellowDark },
                  { label: '③ Apply & Practice',      color: COLORS.greenDark  },
                ].map(h => (
                  <Grid item xs={12} sm={4} key={h.label}>
                    <Box sx={{
                      display: 'flex', alignItems: 'center', gap: 0.8,
                      px: 2, py: 0.8,
                    }}>
                      <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: h.color }} />
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: h.color, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                        {h.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              {learningPaths.map(lp => (
                <LearningPathRow key={lp.subject} {...lp} />
              ))}
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
}
