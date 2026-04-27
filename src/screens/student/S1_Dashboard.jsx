// src/screens/student/S1_Dashboard.jsx
import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Chip, LinearProgress,
  Divider, Button, Collapse, Dialog, DialogTitle, DialogContent, IconButton, DialogActions, Drawer
} from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';
import subjectQuestions from '../../data/subjectQuestions.json';

// ─── Data ─────────────────────────────────────────────────────────────────────
const syllabusSubjects = [
  { name: 'Math',           pct: 68, icon: '📐' },
  { name: 'Science',        pct: 55, icon: '🔬' },
  { name: 'English',        pct: 82, icon: '📖' },
  { name: 'Hindi',          pct: 74, icon: '✍️' },
  { name: 'Social Science', pct: 61, icon: '🌍' },
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
  { subject: '📐 Math — Trigonometry',      tag: 'Start with Foundation', color: COLORS.amber,
    needsAttention: ['Standard Angle Values', 'Trigonometric Identities'],
    strengthen:     ['Basic Trig Ratios (sin/cos/tan)', 'Reciprocal Functions'],
    practice:       { count: 12, label: 'Adaptive Practice Questions' }
  },
  { subject: '📐 Math — Quadratic Equations', tag: 'Start with Foundation', color: COLORS.amber,
    needsAttention: ['Roots of Equations', 'Completing the Square'],
    strengthen:     ['Factoring Basics', 'Standard Form'],
    practice:       { count: 10, label: 'Adaptive Practice Questions' }
  },
  { subject: '🔬 Science — Chemical Reactions', tag: 'Quick Revision', color: COLORS.yellow,
    needsAttention: ['Balancing Equations', 'Types of Reactions'],
    strengthen:     ['Reactants & Products', 'Atomic Mass Concepts'],
    practice:       { count: 8, label: 'Practice Questions' }
  },
  { subject: '📖 English — Grammar',        tag: 'Start with Foundation', color: COLORS.amber,
    needsAttention: ['Subject-Verb Agreement', 'Tense Usage'],
    strengthen:     ['Parts of Speech', 'Sentence Structure'],
    practice:       { count: 10, label: 'Practice Questions' }
  },
];

const workingWell = [
  { subject: '📖 English — Reading Skills' },
  { subject: '📐 Math — Algebra Basics' },
  { subject: '🔬 Science — Physics Numericals' },
  { subject: '✍️ Hindi — Essay Writing' },
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
function LearningPathRow({ subject, needsAttention, strengthen, practice, onComplete, onPracticeOpenChange }) {
  const [activeStep, setActiveStep] = useState(0); 
  const [studyModalOpen, setStudyModalOpen] = useState(false);
  const [practiceModalOpen, setPracticeModalOpen] = useState(false);

  React.useEffect(() => {
    if (onPracticeOpenChange) onPracticeOpenChange(practiceModalOpen);
  }, [practiceModalOpen, onPracticeOpenChange]);
  const [selected, setSelected] = useState({});

  const subjectKey = subject.toLowerCase().includes('math') ? 'math' : 
                     subject.toLowerCase().includes('science') ? 'science' : 
                     subject.toLowerCase().includes('english') ? 'english' : 
                     subject.toLowerCase().includes('hindi') ? 'hindi' : 
                     subject.toLowerCase().includes('social') ? 'social' : 'math';
  
  const questions = (subjectQuestions[subjectKey] || subjectQuestions['math']).slice(0, 2);

  const handleNext = () => {
    setActiveStep(prev => {
      const nextStep = prev + 1;
      if (nextStep === 3 && onComplete) {
        // Delay before triggering completion to allow user to see the success state
        setTimeout(() => {
          onComplete();
        }, 1200);
      }
      return nextStep;
    });
  };
  const isAllDone = activeStep === 3;

  const handleActionClick = (index) => {
    if (index === 0 || index === 1) {
      setStudyModalOpen(true);
    } else if (index === 2) {
      setPracticeModalOpen(true);
    }
  }

  const handleStudyComplete = () => {
    setStudyModalOpen(false);
    handleNext();
  }

  const handlePracticeComplete = () => {
    setPracticeModalOpen(false);
    setSelected({});
    handleNext();
  }

  const steps = [
    {
      title: 'Strengthen Foundation',
      subtitle: 'Recap core concepts first',
      btnLabel: 'Review & Prepare',
      color: COLORS.primaryPurple,
      items: strengthen,
    },
    {
      title: 'Needs Attention',
      subtitle: 'Review weak concepts',
      btnLabel: 'Review & Prepare',
      color: COLORS.primaryPurple,
      items: needsAttention,
    },
    {
      title: 'Apply & Practice',
      subtitle: 'Ready to test skills',
      btnLabel: 'Start Practice →',
      color: COLORS.primaryPurple,
      items: null,
    }
  ];

  return (
    <Box>
      {/* Header with completion chip if done */}
      {isAllDone && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
          <Chip label="All Steps Completed" size="small" sx={{ ml: 'auto', background: `${COLORS.green}15`, color: COLORS.greenDark, fontWeight: 700, height: 22, fontSize: '0.7rem' }} />
        </Box>
      )}

      {/* Horizontal Expandable Steps */}
      <Box sx={{ 
        display: 'flex', gap: 1.5, alignItems: 'stretch',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: isAllDone ? 'auto' : { md: 200 }
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
              borderRadius: '16px',
              border: `1.5px solid ${isActive ? COLORS.primaryPurple : isCompleted || isAllDone ? COLORS.purpleBorder : isLocked ? `${COLORS.border}50` : 'transparent'}`,
              background: isAllDone ? `${COLORS.purpleLight}40` : isActive ? COLORS.purpleLight : isCompleted ? `${COLORS.purpleLight}20` : `${COLORS.divider}20`,
              boxShadow: isActive ? `0 6px 20px ${COLORS.primaryPurple}15` : 'none',
              p: isAllDone ? 2 : 2.5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: isAllDone ? 'center' : 'flex-start',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
              opacity: isLocked ? 0.5 : 1,
            }}>
              
              {/* Header Box (Icon + Title) */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: isAllDone ? 0 : 1.5 }}>
                <Box sx={{
                  width: 28, height: 28, flexShrink: 0, borderRadius: '50%',
                  background: isCompleted || isAllDone || isActive ? step.color : '#fff',
                  border: isCompleted || isAllDone || isActive ? 'none' : `1px solid ${COLORS.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isCompleted || isAllDone || isActive ? '#fff' : COLORS.textMuted,
                  fontSize: '0.8rem', fontWeight: 800,
                  boxShadow: isActive ? `0 2px 8px ${step.color}40` : 'none'
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
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, animation: 'fadeIn 0.5s ease', opacity: !isActive ? 0.7 : 1, transition: 'opacity 0.3s' }}>
                  <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary, mb: 2 }}>
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
                            background: COLORS.primaryPurple,
                            color: '#fff', boxShadow: `0 3px 10px ${COLORS.primaryPurple}35`,
                            '&:hover': { background: COLORS.purpleHover, boxShadow: `0 5px 16px ${COLORS.primaryPurple}60` }
                          } : {
                            color: COLORS.primaryPurple, borderColor: COLORS.purpleBorder, background: '#fff',
                            '&:hover': { background: COLORS.purpleLight, borderColor: COLORS.primaryPurple }
                          }),
                          textTransform: 'none', fontWeight: 700, fontSize: '0.8rem', py: 0.8, px: 2, borderRadius: '8px', mt: 'auto'
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

      {/* Modals for UX Flow */}
      <Dialog open={studyModalOpen} onClose={() => setStudyModalOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: COLORS.purpleLight, borderBottom: `1px solid ${COLORS.purpleBorder}` }}>
          <Typography sx={{ fontWeight: 800, color: COLORS.primaryPurple }}>Review & Prepare</Typography>
          <IconButton size="small" onClick={() => setStudyModalOpen(false)}>✕</IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', background: COLORS.bgWarm, p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 800, color: COLORS.textPrimary, mb: 1, fontSize: '0.9rem' }}>📌 What to focus on</Typography>
            <ul style={{ margin: 0, paddingLeft: '20px', color: COLORS.textSecondary, fontSize: '0.85rem' }}>
              {needsAttention && needsAttention.map(item => <li key={item} style={{ marginBottom: '4px' }}>{item}</li>)}
              {strengthen && strengthen.map(item => <li key={item} style={{ marginBottom: '4px' }}>{item}</li>)}
              <li style={{ marginBottom: '4px' }}>Common mistakes: Keep an eye on typical pitfalls.</li>
            </ul>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontWeight: 800, color: COLORS.textPrimary, mb: 1, fontSize: '0.9rem' }}>💡 How to study (tips & tricks)</Typography>
            <ul style={{ margin: 0, paddingLeft: '20px', color: COLORS.textSecondary, fontSize: '0.85rem' }}>
              <li style={{ marginBottom: '4px' }}>Solve 3–5 textbook examples first</li>
              <li style={{ marginBottom: '4px' }}>Break formulas into patterns instead of memorizing</li>
              <li style={{ marginBottom: '4px' }}>Revise key identities once before solving</li>
              <li style={{ marginBottom: '4px' }}>Optional: watch a short concept video</li>
            </ul>
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, color: COLORS.textPrimary, mb: 1, fontSize: '0.9rem' }}>🎯 Suggested actions</Typography>
            <ul style={{ margin: 0, paddingLeft: '20px', color: COLORS.textSecondary, fontSize: '0.85rem' }}>
              <li style={{ marginBottom: '4px' }}>Do textbook examples / small boxes</li>
              <li style={{ marginBottom: '4px' }}>Attempt a few warm-up questions</li>
            </ul>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, background: COLORS.bgCard }}>
          <Button onClick={handleStudyComplete} variant="contained" color="primary" fullWidth>Mark as Reviewed & Continue</Button>
        </DialogActions>
      </Dialog>

      <Drawer anchor="right" open={practiceModalOpen} onClose={() => { setPracticeModalOpen(false); setSelected({}); }} sx={{ zIndex: 1400 }} slotProps={{ backdrop: { invisible: true } }}>
        <Box sx={{ width: { xs: '100vw', sm: 480 }, height: '100%', overflowY: 'auto', background: '#fff', p: 0, outline: 'none', borderLeft: `1px solid ${COLORS.border}` }}>
            <Box sx={{ p: '20px 24px 16px', borderBottom: `1px solid ${COLORS.divider}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: COLORS.textPrimary }}>Practice Challenge ✏️</Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary, mt: 0.2 }}>{subject} · 2 questions</Typography>
                </Box>
                <IconButton size="small" onClick={() => { setPracticeModalOpen(false); setSelected({}); }} sx={{ color: '#000' }}>✕</IconButton>
            </Box>

            <Box sx={{ p: 3 }}>
                {questions.map((q, qi) => (
                    <Box key={qi} sx={{ mb: 3 }}>
                        <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: COLORS.textPrimary, mb: 1.5, lineHeight: 1.5 }}>{q.q}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {q.options.map((opt, oi) => (
                                <Box key={oi} onClick={() => setSelected(s => ({ ...s, [qi]: oi }))}
                                    sx={{ p: '10px 14px', borderRadius: '10px', cursor: 'pointer', border: `1.5px solid ${selected[qi] === oi ? COLORS.primaryPurple : COLORS.border}`, background: selected[qi] === oi ? COLORS.purpleLight : '#fff', transition: 'all 0.15s' }}>
                                    <Typography sx={{ fontSize: '0.82rem', color: selected[qi] === oi ? COLORS.primaryPurple : COLORS.textPrimary, fontWeight: selected[qi] === oi ? 600 : 400 }}>{opt}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))}
                <Button fullWidth variant="contained" disabled={Object.keys(selected).length < questions.length}
                    onClick={handlePracticeComplete}
                    sx={{ mt: 1, background: COLORS.primaryPurple, color: '#fff', textTransform: 'none', fontWeight: 700, borderRadius: '10px', py: 1.2, '&:hover': { background: COLORS.purpleHover }, '&.Mui-disabled': { background: COLORS.divider } }}>
                    Submit Answer & Complete →
                </Button>
            </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function S1_Dashboard() {
  const [goals, setGoals] = useState(todayGoals);
  const [activeLearningPath, setActiveLearningPath] = useState(null);
  const [completedAreas, setCompletedAreas] = useState([]);
  const [isPracticeDrawerOpen, setIsPracticeDrawerOpen] = useState(false);
  const doneCnt = goals.filter(g => g.done).length;
  const goalPct = Math.round((doneCnt / goals.length) * 100);

  const handleLearningPathComplete = (subject) => {
    setActiveLearningPath(null); // Close modal
    setTimeout(() => {
      setCompletedAreas(prev => [...prev, subject]); // Trigger slide-out animation after modal closes
    }, 300);
  };

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
                <DonutRing pct={overallPct} size={120} stroke={11} color={COLORS.primaryPurple} />
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
                      <Typography sx={{ fontSize: '0.76rem', fontWeight: 600, color: COLORS.textPrimary }}>{s.icon} {s.name}</Typography>
                      <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: COLORS.primaryPurple }}>{s.pct}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={s.pct}
                      sx={{
                        height: 6, borderRadius: 6,
                        background: COLORS.divider,
                        '& .MuiLinearProgress-bar': { background: COLORS.primaryPurple, borderRadius: 6 },
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
                {dynamicStreakDays.map(d => (
                  <StreakCircle key={d.day} day={d.day} done={d.done} isToday={d.isToday} goalPct={d.isToday ? goalPct : 0} />
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
                <Typography sx={{ fontSize: '1.2rem' }}>📈</Typography>
                <Typography variant="overline">Improvement Areas</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary, mb: 2 }}>
                Focus on these to grow faster.
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {improvementAreas.map(a => (
                  <Collapse key={a.subject} in={!completedAreas.includes(a.subject)} timeout={600} unmountOnExit>
                    <Box 
                      onClick={() => setActiveLearningPath(a)}
                      sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        p: '12px 16px', borderRadius: '12px', mb: 1.5,
                        background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`,
                        cursor: 'pointer', transition: 'all 0.2s',
                        '&:hover': { background: `${a.color}0A`, borderColor: a.color, transform: 'translateY(-2px)', boxShadow: `0 4px 12px ${a.color}20` }
                      }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: COLORS.textPrimary }}>{a.subject}</Typography>
                      </Box>
                      <Chip
                        label={a.tag}
                        size="small"
                        sx={{
                          height: 24, fontSize: '0.65rem', fontWeight: 700,
                          background: `${a.color}15`, color: a.color,
                          border: `1px solid ${a.color}30`,
                          '& .MuiChip-label': { px: 1.5 },
                        }}
                      />
                    </Box>
                  </Collapse>
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
                      <Typography sx={{ fontSize: '1.2rem' }}>{w.icon}</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.84rem', color: COLORS.textPrimary }}>{w.subject}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Modal for Active Learning Path ── */}
        <Dialog open={!!activeLearningPath} onClose={() => setActiveLearningPath(null)} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '28px', background: COLORS.bgCard, overflow: 'hidden', transform: isPracticeDrawerOpen ? 'translateX(-12vw)' : 'translateX(0)', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' } }}>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', p: '24px 24px 16px 24px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '14px', background: COLORS.purpleLight, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '1.6rem' }}>🗺️</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: COLORS.textPrimary, lineHeight: 1.2, mb: 0.5 }}>{activeLearningPath?.subject}</Typography>
                <Typography sx={{ fontSize: '0.85rem', color: COLORS.textSecondary }}>Recommended Learning Path</Typography>
              </Box>
            </Box>
            <IconButton size="small" onClick={() => setActiveLearningPath(null)} sx={{ color: '#000', '&:hover': { background: `${COLORS.textMuted}15` } }}>✕</IconButton>
          </DialogTitle>
          <DialogContent sx={{ px: '24px', pb: '24px', pt: 0 }}>
            <Box sx={{ mb: 3.5, mt: 1 }}>
              <Typography sx={{ fontSize: '0.9rem', color: COLORS.textSecondary, lineHeight: 1.5 }}>
                Follow this path step-by-step. Address gaps first, build your foundation, then unlock practice.
              </Typography>
            </Box>
            {activeLearningPath && (
              <LearningPathRow 
                subject={activeLearningPath.subject} 
                needsAttention={activeLearningPath.needsAttention} 
                strengthen={activeLearningPath.strengthen} 
                practice={activeLearningPath.practice} 
                onComplete={() => handleLearningPathComplete(activeLearningPath.subject)}
                onPracticeOpenChange={setIsPracticeDrawerOpen}
              />
            )}
          </DialogContent>
        </Dialog>

      </Grid>
    </Layout>
  );
}
