// src/screens/student/S1_Dashboard.jsx
import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Chip, LinearProgress,
  Divider, Button, Collapse, Dialog, DialogTitle, DialogContent, IconButton, DialogActions
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
function StreakCircle({ day, done, isToday, goalPct = 0 }) {
  const size = isToday ? 42 : 36;
  const stroke = 3;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (goalPct / 100) * circ;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      <Box sx={{
        width: size, height: size, borderRadius: '50%',
        position: 'relative',
        border: (done && !isToday) ? `2px solid ${COLORS.green}` : (!isToday) ? `2px solid ${COLORS.border}` : 'none',
        background: done && !isToday ? `${COLORS.green}18` : isToday && goalPct === 100 ? `${COLORS.green}18` : isToday ? `${COLORS.green}08` : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
      }}>
        {isToday && (
          <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
            <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={COLORS.border} strokeWidth={stroke} />
            <circle
              cx={size/2} cy={size/2} r={r} fill="none"
              stroke={COLORS.green} strokeWidth={stroke}
              strokeDasharray={`${dash} ${circ}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.6s ease' }}
            />
          </svg>
        )}

        {done || (isToday && goalPct === 100) ? (
          <svg width={isToday ? "18" : "16"} height={isToday ? "18" : "16"} viewBox="0 0 24 24" fill={COLORS.green} style={{ zIndex: 1 }}>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
        ) : (
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: isToday ? COLORS.textSecondary : COLORS.border, zIndex: 1 }} />
        )}
      </Box>
      <Typography sx={{ 
        fontSize: '0.6rem', fontWeight: isToday ? 800 : 600, 
        color: isToday ? COLORS.textPrimary : done ? COLORS.textSecondary : COLORS.textMuted, 
        letterSpacing: 0.5 
      }}>
        {day}
      </Typography>
    </Box>
  );
}

// ─── Goal Row ─────────────────────────────────────────────────────────────────
function GoalRow({ text, done }) {
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

// ─── Learning Path Row (Horizontal Expandable Flow) ───────────────────────────
function LearningPathRow({ subject, needsAttention, strengthen, practice, color }) {
  const [activeStep, setActiveStep] = useState(0); 
  const [formatModalOpen, setFormatModalOpen] = useState(false);
  const [studyModalOpen, setStudyModalOpen] = useState(false);
  const [practiceModalOpen, setPracticeModalOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(null);

  const handleNext = () => setActiveStep(prev => prev + 1);
  const isAllDone = activeStep === 3;

  const handleActionClick = (index) => {
    if (index === 0 || index === 1) {
      setFormatModalOpen(true);
    } else if (index === 2) {
      setPracticeModalOpen(true);
    }
  }

  const handleFormatSelect = (fmt) => {
    setSelectedFormat(fmt);
    setFormatModalOpen(false);
    setStudyModalOpen(true);
  }

  const handleStudyComplete = () => {
    setStudyModalOpen(false);
    handleNext();
  }

  const handlePracticeComplete = () => {
    setPracticeModalOpen(false);
    handleNext();
  }

  const steps = [
    {
      title: 'Strengthen Foundation',
      subtitle: 'Recap core concepts first',
      btnLabel: 'Select Study Mode',
      color: COLORS.yellow,
      items: strengthen,
    },
    {
      title: 'Needs Attention',
      subtitle: 'Review weak concepts',
      btnLabel: 'Select Study Mode',
      color: COLORS.amber,
      items: needsAttention,
    },
    {
      title: 'Apply & Practice',
      subtitle: 'Ready to test skills',
      btnLabel: 'Start Practice →',
      color: COLORS.green,
      items: null,
    }
  ];

  return (
    <Box sx={{ mb: 3.5 }}>
      {/* Subject header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Box sx={{ width: 10, height: 10, borderRadius: '3px', background: color, flexShrink: 0 }} />
        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: COLORS.textPrimary }}>{subject}</Typography>
        {isAllDone && <Chip label="All Steps Completed" size="small" sx={{ ml: 'auto', background: `${COLORS.green}15`, color: COLORS.greenDark, fontWeight: 700, height: 22, fontSize: '0.7rem' }} />}
      </Box>

      {/* Horizontal Expandable Steps */}
      <Box sx={{ 
        display: 'flex', gap: 1.5, alignItems: 'stretch',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: { md: 200 }
      }}>
        {steps.map((step, index) => {
          const isLocked = activeStep < index;
          const isCompleted = activeStep > index;
          const isActive = activeStep === index;

          // Width expansion logic
          // Active step gets most space, but we preserve space (flex: 1) for locked/completed to show content
          const flexAmt = isAllDone ? 1 : isActive ? 1.5 : 1;

          return (
            <Box key={step.title} sx={{
              flex: { xs: 'none', md: flexAmt },
              borderRadius: '12px',
              border: `1px solid ${isActive ? step.color : isCompleted || isAllDone ? `${step.color}30` : isLocked ? `${COLORS.border}50` : 'transparent'}`,
              background: isAllDone ? `${step.color}06` : isActive ? `${step.color}08` : isCompleted ? `${step.color}04` : `${COLORS.divider}20`,
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
              opacity: isLocked ? 0.6 : 1,
            }}>
              
              {/* Header Box (Icon + Title) */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Box sx={{
                  width: 24, height: 24, flexShrink: 0, borderRadius: '50%',
                  background: isCompleted || isAllDone ? step.color : isActive ? step.color : COLORS.divider,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isCompleted || isAllDone || isActive ? '#fff' : COLORS.textMuted,
                  fontSize: '0.75rem', fontWeight: 700
                }}>
                  {isCompleted || isAllDone ? '✓' : isLocked ? '🔒' : index + 1}
                </Box>
                
                <Typography noWrap sx={{ 
                  fontWeight: 700, fontSize: '0.85rem', 
                  color: isActive ? step.color : isCompleted || isAllDone ? COLORS.textPrimary : COLORS.textSecondary,
                  transition: 'all 0.3s',
                }}>
                  {step.title}
                </Typography>
              </Box>

              {/* Main Content Area (Shown for Active, Locked, and Completed) */}
              {!isAllDone && (
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, animation: 'fadeIn 0.5s ease', opacity: !isActive ? 0.6 : 1, transition: 'opacity 0.3s' }}>
                  <Typography sx={{ fontSize: '0.78rem', color: COLORS.textSecondary, mb: 1.5 }}>
                    {step.subtitle}
                  </Typography>
                  
                  {step.items ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, mb: 2, flexGrow: 1 }}>
                      {step.items.map(item => (
                        <Box key={item} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                          <Box sx={{ width: 5, height: 5, borderRadius: '50%', background: !isActive ? COLORS.textMuted : step.color, mt: 0.55, flexShrink: 0 }} />
                          <Typography sx={{ fontSize: '0.78rem', color: !isActive ? COLORS.textSecondary : COLORS.textPrimary, lineHeight: 1.3 }}>{item}</Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: '10px', background: !isActive ? COLORS.border : `${COLORS.green}15`, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.2rem', flexShrink: 0}}>🎯</Box>
                      <Box>
                        <Typography sx={{ fontSize: '0.85rem', color: !isActive ? COLORS.textSecondary : COLORS.textPrimary, fontWeight: 700 }}>
                          {practice.count} {practice.label}
                        </Typography>
                        <Typography sx={{ fontSize: '0.7rem', color: COLORS.textMuted }}>Adaptive difficulty</Typography>
                      </Box>
                    </Box>
                  )}

                  <Box sx={{ mt: 'auto', display: 'flex', justifyContent: !isActive ? 'flex-start' : 'flex-end', pt: 1 }}>
                    {isActive && (
                      <Button
                        variant={index === 2 ? "contained" : "outlined"}
                        size="small"
                        onClick={() => handleActionClick(index)}
                        sx={{
                          ... (index === 2 ? {
                            background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.greenDark} 100%)`,
                            color: '#fff', boxShadow: `0 3px 10px ${COLORS.green}35`,
                          } : {
                            color: step.color, borderColor: `${step.color}50`,
                          }),
                          textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', py: 0.6, px: 2,
                        }}
                      >
                        {step.btnLabel}
                      </Button>
                    )}
                    {!isActive && (
                      <Typography sx={{ fontSize: '0.7rem', color: isCompleted ? COLORS.green : COLORS.textMuted, fontStyle: 'italic', fontWeight: 600, p: '4px 8px', background: isCompleted ? `${COLORS.green}10` : `${COLORS.border}30`, borderRadius: '6px' }}>
                        {isCompleted ? '✓ Completed' : '🔒 Locked'}
                      </Typography>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      {/* Modals for UX UX Flow */}
      <Dialog open={formatModalOpen} onClose={() => setFormatModalOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ fontWeight: 800, fontSize: '1.1rem', background: `${COLORS.blue}08`, borderBottom: `1px solid ${COLORS.divider}` }}>How would you like to study?</DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {[ { label: 'Use Text', icon: '📖', fmt: 'text' }, { label: 'Use Video', icon: '▶️', fmt: 'video' }, { label: 'Use Audio', icon: '🎧', fmt: 'audio' }].map(o => (
              <Button key={o.label} variant="outlined" onClick={() => handleFormatSelect(o.fmt)} sx={{ justifyContent: 'flex-start', p: 1.5, borderRadius: '10px', borderColor: COLORS.border, color: COLORS.textPrimary, '&:hover': { background: `${color}0A`, borderColor: color } }}>
                <Typography sx={{ fontSize: '1.2rem', mr: 1.5 }}>{o.icon}</Typography>
                <Typography sx={{ fontWeight: 700, textTransform: 'none' }}>{o.label}</Typography>
              </Button>
            ))}
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={studyModalOpen} onClose={() => setStudyModalOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 800 }}>Learning Mode: {selectedFormat?.toUpperCase()}</Typography>
          <IconButton size="small" onClick={() => setStudyModalOpen(false)}>✕</IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: COLORS.bgWarm }}>
          {selectedFormat === 'video' && <Box sx={{ width: '100%', height: 180, background: '#000', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Typography sx={{ color: '#fff', fontSize: '2rem' }}>▶️</Typography></Box>}
          {selectedFormat === 'audio' && <Box sx={{ width: '100%', p: 3, background: `${COLORS.purple}10`, borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Typography sx={{ color: COLORS.purpleDark, fontSize: '2rem' }}>🔊 Audio Player</Typography></Box>}
          {selectedFormat === 'text' && <Box><Typography sx={{ color: COLORS.textPrimary, mb: 1, fontWeight: 700 }}>Concept Notes</Typography><Typography sx={{ color: COLORS.textSecondary, lineHeight: 1.6 }}>Here is the detailed theory regarding the selected concepts. Reading this will help clarify doubts and solidify foundational knowledge required for the upcoming challenges.</Typography></Box>}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleStudyComplete} variant="contained" sx={{ background: `linear-gradient(135deg, ${color}, ${color}CC)`, color: '#fff', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}>Mark Reviewed & Continue</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={practiceModalOpen} onClose={() => setPracticeModalOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ fontWeight: 800 }}>Practice Challenge</DialogTitle>
        <DialogContent dividers sx={{ minHeight: 180, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography sx={{ mb: 3, fontWeight: 600, fontSize: '1rem' }}>Q1. What is the correct sequence of steps to solve this problem?</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {['Option A', 'Option B', 'Option C', 'Option D'].map(o => (
              <Button key={o} variant="outlined" sx={{ justifyContent: 'flex-start', color: COLORS.textPrimary, borderColor: COLORS.divider, textTransform: 'none' }}>{o}</Button>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handlePracticeComplete} variant="contained" sx={{ background: `linear-gradient(135deg, ${COLORS.green}, ${COLORS.greenDark})`, color: '#fff', textTransform: 'none', fontWeight: 700, borderRadius: '8px' }}>Submit Answer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function S1_Dashboard() {
  const [goals, setGoals] = useState(todayGoals);
  const doneCnt = goals.filter(g => g.done).length;
  const goalPct = Math.round((doneCnt / goals.length) * 100);

  // Dynamic 7 day streak calculation
  const todayDate = new Date();
  const dynamicStreakDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(todayDate);
    d.setDate(d.getDate() - (6 - i));
    const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const isToday = i === 6;
    return {
      day: dayStr,
      done: isToday ? false : true, // all past days mock completed
      isToday
    };
  });

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
                {goals.map(g => (
                  <Box
                    key={g.id}
                    onClick={() => toggleGoal(g.id)}
                    sx={{ cursor: 'pointer', '&:hover': { opacity: 0.85 } }}
                  >
                    <GoalRow text={g.text} done={g.done} />
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

              {/* Today & Streak sub-cards */}
              <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5, mt: 1 }}>
                <Box sx={{
                  flex: 1, p: 1.5, borderRadius: '12px',
                  background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: COLORS.textPrimary, mb: 1, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {dynamicStreakDays.find(d => d.isToday).day}
                  </Typography>
                  <Box sx={{ position: 'relative', width: 56, height: 56 }}>
                    <DonutRing pct={goalPct} size={56} stroke={6} color={COLORS.green} />
                    <Typography sx={{
                      position: 'absolute', top: '50%', left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '0.8rem', fontWeight: 800, color: COLORS.green,
                    }}>
                      {goalPct}%
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{
                  flex: 1, p: 1.5, borderRadius: '12px',
                  background: `${COLORS.yellow}08`, border: `1px solid ${COLORS.yellow}30`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Typography sx={{ fontSize: '2.2rem', lineHeight: 1, mb: 0.5 }}>🔥</Typography>
                  <Typography sx={{
                    fontWeight: 800, fontSize: '1.6rem', color: COLORS.yellow,
                    fontFamily: "'DM Sans'", lineHeight: 1,
                  }}>
                    {streakCount}
                  </Typography>
                  <Typography sx={{ fontSize: '0.62rem', color: COLORS.yellowDark, fontWeight: 700, mt: 0.3, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                    Day Streak
                  </Typography>
                </Box>
              </Box>

              {/* Circle row (past days only) */}
              <Box sx={{
                display: 'flex', justifyContent: 'space-between',
                gap: 0.5, mb: 2, alignItems: 'center'
              }}>
                {dynamicStreakDays.filter(d => !d.isToday).map(d => (
                  <StreakCircle key={d.day} day={d.day} done={d.done} isToday={false} goalPct={0} />
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
              <Typography sx={{ fontSize: '0.78rem', color: COLORS.textSecondary, mb: 3, lineHeight: 1.6 }}>
                Follow each path step-by-step. Address gaps first, build your foundation, then unlock practice.
              </Typography>

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
