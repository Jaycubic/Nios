// src/screens/educator/E1_StudentOverview.jsx
import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Chip, Grid, Divider, Button,
  Table, TableBody, TableCell, TableHead, TableRow, Collapse, LinearProgress,
  Dialog, DialogTitle, DialogContent, IconButton, Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── Student data ─────────────────────────────────────────────────────────────
const student = {
  name: 'Rahul Sharma',
  grade: 'Grade 10 · NIOS',
  rollNo: '2024NIOS1048',
  score: 52,
  practice: 'Medium',
  retention: 60,
  status: 'Needs Support',
};

const subjectData = [
  { subject: '📐 Math', score: 45, practice: 'High', retention: 50, status: '🔴', statusColor: COLORS.amber },
  { subject: '🔬 Science', score: 58, practice: 'Medium', retention: 62, status: '🟡', statusColor: COLORS.yellow },
  { subject: '📖 English', score: 72, practice: 'High', retention: 78, status: '🟢', statusColor: COLORS.green },
  { subject: '🌍 Social Science', score: 61, practice: 'Low', retention: 55, status: '🟡', statusColor: COLORS.yellow },
  { subject: '✍️ Hindi', score: 85, practice: 'High', retention: 80, status: '🟢', statusColor: COLORS.green },
];

const chapterData = {
  '📐 Math': [
    { chapter: 'Trigonometry', score: 38, retention: 45, attempts: 4, status: '🔴', statusColor: COLORS.amber },
    { chapter: 'Algebra', score: 60, retention: 65, attempts: 5, status: '🟡', statusColor: COLORS.yellow },
    { chapter: 'Linear Equations', score: 71, retention: 70, attempts: 6, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Number Systems', score: 82, retention: 80, attempts: 4, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Polynomials', score: 42, retention: 48, attempts: 3, status: '🔴', statusColor: COLORS.amber },
    { chapter: 'Coordinate Geometry', score: 65, retention: 60, attempts: 2, status: '🟡', statusColor: COLORS.yellow },
    { chapter: 'Quadratic Equations', score: 55, retention: 50, attempts: 3, status: '🟡', statusColor: COLORS.yellow },
    { chapter: 'Arithmetic', score: 85, retention: 88, attempts: 2, status: '🟢', statusColor: COLORS.green },
  ],
  '🔬 Science': [
    { chapter: 'Chemical Reactions', score: 42, retention: 38, attempts: 3, status: '🔴', statusColor: COLORS.amber },
    { chapter: 'Acids & Bases', score: 58, retention: 60, attempts: 4, status: '🟡', statusColor: COLORS.yellow },
    { chapter: 'Life Processes', score: 67, retention: 70, attempts: 5, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Electricity', score: 45, retention: 50, attempts: 6, status: '🔴', statusColor: COLORS.amber },
    { chapter: 'Magnetic Effects', score: 60, retention: 65, attempts: 3, status: '🟡', statusColor: COLORS.yellow },
    { chapter: 'Sources of Energy', score: 80, retention: 82, attempts: 2, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Our Environment', score: 85, retention: 88, attempts: 1, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Resource Mgmt', score: 90, retention: 90, attempts: 1, status: '🟢', statusColor: COLORS.green },
  ],
  '📖 English': [
    { chapter: 'Grammar Rules', score: 72, retention: 78, attempts: 4, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Reading Comp.', score: 80, retention: 82, attempts: 3, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Lit - Prose', score: 65, retention: 60, attempts: 2, status: '🟡', statusColor: COLORS.yellow },
    { chapter: 'Lit - Poetry', score: 55, retention: 50, attempts: 3, status: '🟡', statusColor: COLORS.yellow },
    { chapter: 'Writing Skills', score: 85, retention: 88, attempts: 2, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Vocabulary', score: 90, retention: 90, attempts: 1, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Connectors', score: 60, retention: 65, attempts: 4, status: '🟡', statusColor: COLORS.yellow },
    { chapter: 'Indirect Speech', score: 45, retention: 50, attempts: 5, status: '🔴', statusColor: COLORS.amber },
  ],
  '🌍 Social Science': [
    { chapter: 'History - WW2', score: 65, retention: 60, attempts: 3, status: '🟡', statusColor: COLORS.yellow },
    { chapter: 'Geography - Maps', score: 55, retention: 50, attempts: 2, status: '🟡', statusColor: COLORS.yellow },
    { chapter: 'Civics - Laws', score: 85, retention: 88, attempts: 2, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Eco - Development', score: 90, retention: 90, attempts: 1, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Nationalism', score: 75, retention: 70, attempts: 3, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Geo - Resources', score: 60, retention: 65, attempts: 4, status: '🟡', statusColor: COLORS.yellow },
    { chapter: 'Federalism', score: 80, retention: 82, attempts: 3, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Eco - Sectors', score: 70, retention: 75, attempts: 2, status: '🟢', statusColor: COLORS.green },
  ],
  '✍️ Hindi': [
    { chapter: 'Grammar', score: 85, retention: 88, attempts: 2, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Reading - Gadya', score: 90, retention: 90, attempts: 1, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Lit - Padya', score: 80, retention: 82, attempts: 3, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Writing - Nibandh', score: 75, retention: 70, attempts: 3, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Vocabulary', score: 65, retention: 60, attempts: 4, status: '🟡', statusColor: COLORS.yellow },
    { chapter: 'Lit - Kritika', score: 85, retention: 88, attempts: 2, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Muhavare', score: 95, retention: 95, attempts: 1, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Unseen Passages', score: 80, retention: 80, attempts: 2, status: '🟢', statusColor: COLORS.green },
  ]
};

// ─── E5 Data: Recommendations & Strategies ──────────────────────────────────
const conceptRecs = [
  { id: 'C1', topic: 'Trigonometry Basics', reason: 'Confusing complementary angle values — needs table review', priority: 'high', icon: '📐', subject: 'Math' },
  { id: 'C2', topic: 'Fundamental Identities', reason: 'Core gap — substitution error pattern confirmed in 4 Qs', priority: 'high', icon: '🔢', subject: 'Math' },
];

const practiceRecs = [
  { id: 'P1', label: '10 questions on Trigonometry', type: 'Adaptive drill', est: '~15 min', icon: '📝', color: COLORS.blue },
  { id: 'P2', label: '2 practice sets — Identities', type: 'Concept building', est: '~20 min', icon: '📝', color: COLORS.purple },
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

// ─── Helpers ──────────────────────────────────────────────────────────────────
function AccuracyBar({ value, color }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box sx={{ flex: 1, height: 6, borderRadius: 8, background: COLORS.divider, overflow: 'hidden', minWidth: 80 }}>
        <Box sx={{
          height: '100%', width: `${value}%`,
          background: `linear-gradient(90deg, ${color}80, ${color})`,
          borderRadius: 8,
        }} />
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', color, fontFamily: "'DM Sans'", minWidth: 32 }}>
        {value}%
      </Typography>
    </Box>
  );
}

function practiceChip(level) {
  const map = {
    High: { bg: `${COLORS.green}15`, color: COLORS.green },
    Medium: { bg: `${COLORS.yellow}15`, color: COLORS.yellowDark },
    Low: { bg: `${COLORS.amber}15`, color: COLORS.amberDark },
  };
  const s = map[level] || {};
  return (
    <Chip
      label={level} size="small"
      sx={{ height: 20, fontSize: '0.68rem', fontWeight: 600, background: s.bg, color: s.color, '& .MuiChip-label': { px: 1 } }}
    />
  );
}

const colHeader = {
  fontWeight: 700, fontSize: '0.7rem', color: COLORS.textMuted,
  textTransform: 'uppercase', letterSpacing: '0.08em', border: 'none', pb: 1.5,
};

// ─── Section 1: Student Snapshot ──────────────────────────────────────────────
function StudentSnapshot() {
  return (
    <Card elevation={0}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, flexWrap: 'wrap' }}>
          {/* Avatar + identity */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{
              width: 56, height: 56, borderRadius: '16px',
              background: `linear-gradient(135deg, ${COLORS.purple}60, ${COLORS.purpleDark})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `2px solid ${COLORS.purple}40`,
            }}>
              <Typography sx={{ fontWeight: 900, fontSize: '1.4rem', color: '#fff', fontFamily: "'DM Sans'" }}>
                R
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: '1.15rem', color: COLORS.textPrimary, fontFamily: "'DM Sans'" }}>
                {student.name}
              </Typography>
              <Typography sx={{ color: COLORS.textSecondary, fontSize: '0.75rem' }}>
                {student.grade} · {student.rollNo}
              </Typography>
              <Chip
                label={`⚠️ ${student.status}`}
                size="small"
                sx={{
                  mt: 0.8, height: 22, fontSize: '0.7rem', fontWeight: 700,
                  background: `${COLORS.amber}15`, color: COLORS.amberDark,
                  border: `1px solid ${COLORS.amber}30`,
                  '& .MuiChip-label': { px: 1 },
                }}
              />
            </Box>
          </Box>

          {/* KPIs */}
          <Box sx={{ display: 'flex', gap: 2, ml: { xs: 0, md: 'auto' }, flexWrap: 'wrap' }}>
            {[
              { label: 'Overall Score', value: `${student.score}%`, color: COLORS.amberDark, bg: `${COLORS.amber}12`, border: `${COLORS.amber}30` },
              { label: 'Practice Level', value: student.practice, color: COLORS.blue, bg: `${COLORS.blue}12`, border: `${COLORS.blue}30` },
              { label: 'Retention Rate', value: `${student.retention}%`, color: COLORS.purple, bg: `${COLORS.purple}12`, border: `${COLORS.purple}30` },
            ].map(k => (
              <Box key={k.label} sx={{
                textAlign: 'center',
                background: COLORS.bgWarm,
                px: 2.5, py: 1.5,
                borderRadius: '16px',
                border: `1px solid ${COLORS.border}`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                minWidth: '110px'
              }}>
                <Typography sx={{ fontWeight: 900, fontSize: '1.6rem', color: k.color, fontFamily: "'DM Sans'", lineHeight: 1 }}>
                  {k.value}
                </Typography>
                <Typography sx={{ color: COLORS.textMuted, fontSize: '0.65rem', mt: 0.6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {k.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── Section 2: Performance Explorer ─────────────────────────────────────────
// ─── Section 2: Performance Explorer ─────────────────────────────────────────
function PerformanceDrilldown() {
  const navigate = useNavigate();
  const [activeSubj, setActiveSubj] = useState('📐 Math');
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewAllSubject, setViewAllSubject] = useState(null);

  // Handle click with gentle fade transition
  const handleSubjectClick = (subj) => {
    if (subj !== activeSubj) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveSubj(subj);
        setIsAnimating(false);
      }, 150); // fast fade
    }
  };
  const activeSubjData = subjectData.find(s => s.subject === activeSubj);
  const activeChapters = [...(chapterData[activeSubj] || [])].sort((a, b) => a.score - b.score);
  const weakChaptersCount = activeChapters.filter(c => c.status === '🔴' || c.status === '🟡').length;
  
  const weakestChapter = activeChapters.length > 0 
    ? activeChapters.reduce((prev, curr) => (prev.score < curr.score ? prev : curr), activeChapters[0]) 
    : { chapter: 'general topics' };
  const insightText = `Main issue detected in ${weakestChapter.chapter}. Targeted revision recommended to improve retention and accuracy.`;

  return (
    <Card elevation={0} sx={{ overflow: 'hidden', position: 'relative' }}>
      <Grid container>
        {/* LEFT RAIL: Subject Navigator */}
        <Grid item xs={12} lg={4} sx={{ borderRight: { lg: `1px solid ${COLORS.divider}` }, background: COLORS.bgWarm, p: 2 }}>
          <Typography variant="overline" sx={{ display: 'block', mb: 2, px: 1 }}>Performance Explorer</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {subjectData.map(s => {
              const isActive = activeSubj === s.subject;
              return (
                <Box
                  key={s.subject}
                  onClick={() => handleSubjectClick(s.subject)}
                  sx={{
                    p: 1.5, borderRadius: '12px', cursor: 'pointer',
                    background: isActive ? `${s.statusColor}08` : 'transparent',
                    border: `1px solid ${isActive ? s.statusColor + '50' : 'transparent'}`,
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    position: 'relative',
                    transform: isActive ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: isActive ? `0 8px 24px ${s.statusColor}15` : 'none',
                    opacity: isActive ? 1 : 0.65,
                    filter: isActive ? 'none' : 'grayscale(40%)',
                    '&:hover': { opacity: 1, filter: 'none', background: isActive ? `${s.statusColor}08` : COLORS.divider },
                  }}
                >
                  {/* Active highlight bar */}
                  {isActive && (
                    <Box sx={{ position: 'absolute', left: -2, top: '15%', height: '70%', width: 4, borderRadius: 2, background: s.statusColor }} />
                  )}
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ fontWeight: isActive ? 800 : 600, fontSize: '0.9rem', color: COLORS.textPrimary }}>
                      {s.subject}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: '0.85rem', color: s.statusColor }}>{s.score}%</Typography>
                      <Typography sx={{ fontSize: '1rem', lineHeight: 1 }}>{s.status}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <LinearProgress variant="determinate" value={s.retention} sx={{ flex: 1, height: 4, borderRadius: 4, background: COLORS.divider, '& .MuiLinearProgress-bar': { background: `${s.statusColor}80` } }} />
                    {practiceChip(s.practice)}
                  </Box>
                </Box>
              )
            })}
          </Box>
        </Grid>

        {/* RIGHT PANEL: Chapter Drilldown */}
        <Grid item xs={12} lg={8} sx={{ p: 0, position: 'relative', background: '#fff' }}>
          <Box sx={{ 
            p: 3, 
            opacity: isAnimating ? 0 : 1, 
            transform: isAnimating ? 'translateY(10px)' : 'translateY(0)', 
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
            height: '100%',
          }}>
            {/* Insight Summary */}
            <Box sx={{ mb: 3, p: 2, borderRadius: '12px', background: `${activeSubjData.statusColor}08`, border: `1px solid ${activeSubjData.statusColor}20`, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '10px', background: `${activeSubjData.statusColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
                {activeSubjData.status}
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, color: COLORS.textPrimary, mb: 0.2 }}>
                  {activeSubj.split(' ')[1] || activeSubj} requires attention in {weakChaptersCount} chapters
                </Typography>
                <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary }}>
                  {insightText}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="overline" sx={{ display: 'block' }}>Chapter detail</Typography>
              <Button size="small" onClick={() => setViewAllSubject(activeSubj)} sx={{ textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', color: COLORS.blue }}>
                View all {activeChapters.length} chapters →
              </Button>
            </Box>
            
            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ '& th': { ...colHeader, borderBottom: `1px solid ${COLORS.divider}` } }}>
                    <TableCell>Chapter</TableCell>
                    <TableCell>Score</TableCell>
                    <TableCell>Retention</TableCell>
                    <TableCell align="center">Activity</TableCell>
                    <TableCell align="center">Risk</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activeChapters.slice(0, 5).map(c => (
                    <Tooltip 
                      key={c.chapter} 
                      title="Click to reveal deep-dive diagnostics on concept accuracy and learning gaps." 
                      arrow 
                      placement="left"
                    >
                      <TableRow
                        onClick={() => c.chapter === 'Trigonometry' ? navigate('/educator/diagnosis') : null}
                        sx={{
                          '& td': { py: 1.5, borderBottom: `1px solid ${COLORS.divider}` },
                          '&:hover td': { background: COLORS.bgWarm },
                          transition: 'all 0.15s',
                          cursor: c.chapter === 'Trigonometry' ? 'pointer' : 'default',
                        }}
                      >
                        <TableCell>
                          <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: COLORS.textPrimary }}>{c.chapter}</Typography>
                        </TableCell>
                        <TableCell sx={{ minWidth: 140 }}><AccuracyBar value={c.score} color={c.statusColor} /></TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress variant="determinate" value={c.retention} sx={{ width: 80, height: 6, borderRadius: 8, background: COLORS.divider, '& .MuiLinearProgress-bar': { background: `${c.statusColor}80` } }} />
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: COLORS.textSecondary, minWidth: 32 }}>{c.retention}%</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'inline-flex', width: 28, height: 28, borderRadius: '8px', background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`, alignItems: 'center', justifyContent: 'center' }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', color: COLORS.textSecondary }}>{c.attempts}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography sx={{ fontSize: '1.2rem' }}>{c.status}</Typography>
                        </TableCell>
                      </TableRow>
                    </Tooltip>
                  ))}
                </TableBody>
              </Table>
            </Box>

          </Box>
        </Grid>
      </Grid>
      
      {/* View All Dialog */}
      <Dialog open={!!viewAllSubject} onClose={() => setViewAllSubject(null)} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: COLORS.bgWarm, borderBottom: `1px solid ${COLORS.divider}`, p: 2, px: 3
        }}>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color: COLORS.textPrimary }}>
              {viewAllSubject}
            </Typography>
            <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary }}>
              All Chapters Performance
            </Typography>
          </Box>
          <IconButton onClick={() => setViewAllSubject(null)} size="small" sx={{ color: COLORS.textMuted }}>✕</IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ '& th': { ...colHeader, px: 3, pt: 2, borderBottom: `1px solid ${COLORS.divider}` } }}>
                <TableCell>Chapter</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Retention</TableCell>
                <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>Activity</TableCell>
                <TableCell align="center">Risk</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {viewAllSubject && chapterData[viewAllSubject].map(c => (
                <Tooltip 
                  key={c.chapter} 
                  title="Click to reveal deep-dive diagnostics on concept accuracy and learning gaps." 
                  arrow 
                  placement="top"
                >
                  <TableRow
                    onClick={() => {
                      if (c.chapter === 'Trigonometry') {
                        navigate('/educator/diagnosis');
                      }
                    }}
                    sx={{
                      '& td': { borderBottom: `1px solid ${COLORS.divider}`, py: 1.5, px: 3 },
                      '&:hover td': { background: COLORS.bgWarm },
                      transition: 'all 0.15s',
                      cursor: c.chapter === 'Trigonometry' ? 'pointer' : 'default',
                    }}>
                    <TableCell>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: COLORS.textPrimary }}>{c.chapter}</Typography>
                    </TableCell>
                    <TableCell sx={{ minWidth: 160 }}><AccuracyBar value={c.score} color={c.statusColor} /></TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={c.retention}
                          sx={{
                            width: 100, height: 6, borderRadius: 8,
                            background: COLORS.divider,
                            '& .MuiLinearProgress-bar': { background: `${c.statusColor}80` },
                          }}
                        />
                        <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary, minWidth: 32 }}>{c.retention}%</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: 28, height: 28, borderRadius: '8px',
                        background: COLORS.bgCard, border: `1px solid ${COLORS.border}`
                      }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', color: COLORS.textSecondary }}>{c.attempts}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Typography sx={{ fontSize: '1.2rem' }}>{c.status}</Typography>
                    </TableCell>
                  </TableRow>
                </Tooltip>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// ─── Section 4: Integrated Interventions ──────────────────────────────────────
function ActionableInterventions() {
  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>Actionable Interventions</Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Typography sx={{ fontSize: '1rem' }}>🔬</Typography>
            <Typography variant="h6" sx={{ fontSize: '0.9rem' }}>Concept Focus</Typography>
          </Box>
          {conceptRecs.map(r => {
            const ps = priorityStyle[r.priority];
            return (
              <Box key={r.id} sx={{
                p: 1.5, borderRadius: '12px', mb: 1,
                background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`,
                display: 'flex', alignItems: 'flex-start', gap: 1.5
              }}>
                <Box sx={{
                  width: 32, height: 32, borderRadius: '8px',
                  background: `${COLORS.blue}12`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', flexShrink: 0,
                }}>{r.icon}</Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: COLORS.textPrimary }}>{r.topic}</Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: COLORS.textSecondary, lineHeight: 1.4, display: 'block', mb: 0.5 }}>{r.reason}</Typography>
                  <Chip label={ps.label} size="small" sx={{ height: 18, fontSize: '0.62rem', fontWeight: 600, background: ps.bg, color: ps.color, border: `1px solid ${ps.color}30`, '& .MuiChip-label': { px: 0.8 } }} />
                </Box>
              </Box>
            );
          })}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            <Typography sx={{ fontSize: '1rem' }}>📋</Typography>
            <Typography variant="h6" sx={{ fontSize: '0.9rem' }}>Suggested Practice</Typography>
          </Box>
          {practiceRecs.map(r => (
            <Box key={r.id} sx={{
              p: 1.5, borderRadius: '12px', mb: 1,
              background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`,
              display: 'flex', alignItems: 'center', gap: 1.5,
            }}>
              <Box sx={{
                width: 32, height: 32, borderRadius: '8px',
                background: `${r.color}12`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem', flexShrink: 0,
              }}>{r.icon}</Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.8rem', color: COLORS.textPrimary, mb: 0.2 }}>{r.label}</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip label={r.type} size="small" sx={{ height: 16, fontSize: '0.6rem', background: `${r.color}12`, color: r.color, '& .MuiChip-label': { px: 0.6 } }} />
                  <Chip label={r.est} size="small" sx={{ height: 16, fontSize: '0.6rem', background: COLORS.divider, color: COLORS.textMuted, '& .MuiChip-label': { px: 0.6 } }} />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

      </CardContent>
    </Card>
  );
}

function TeachingStrategy() {
  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>Teaching Strategy</Typography>
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
              display: 'flex', alignItems: 'flex-start', gap: 1.5,
              p: '12px', borderRadius: '12px',
              background: COLORS.bgWarm, border: `1px solid ${COLORS.border}`,
            }}>
              <Box sx={{
                width: 32, height: 32, borderRadius: '8px',
                background: `${COLORS.purple}12`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem', flexShrink: 0,
              }}>{s.icon}</Box>
              <Typography sx={{ fontSize: '0.82rem', color: COLORS.textPrimary, lineHeight: 1.6, pt: 0.2 }}>
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
export default function E1_StudentOverview() {
  return (
    <Layout
      role="educator"
      title="Student Deep Dive"
      subtitle="Mode 2: Individual performance analysis"
    >
      <Grid container spacing={2.5} alignItems="stretch">
        {/* Student snapshot – full width dark hero */}
        <Grid item xs={12}>
          <StudentSnapshot />
        </Grid>

        {/* Unified Performance Explorer */}
        <Grid item xs={12}>
          <PerformanceDrilldown />
        </Grid>

        {/* Integrated Interventions */}
        <Grid item xs={12} lg={6}>
          <ActionableInterventions />
        </Grid>

        <Grid item xs={12} lg={6}>
          <TeachingStrategy />
        </Grid>
      </Grid>
    </Layout>
  );
}
