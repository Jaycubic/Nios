// src/screens/educator/E0_ClassOverview.jsx
import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Chip, Grid, Divider, Button,
  Table, TableBody, TableCell, TableHead, TableRow, Collapse, Tooltip,
  Dialog, DialogTitle, DialogContent, IconButton
} from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── Data ────────────────────────────────────────────────────────────────────
const healthMetrics = [
  { label: 'Overall Score', value: '58%', icon: '🎯', color: COLORS.yellow, sub: 'Class average' },
  { label: 'Practice Task Completion', value: '46%', icon: '📝', color: COLORS.blue, sub: 'Regular tasks' },
  { label: 'Retention Rate', value: '40%', icon: '📋', color: COLORS.amber, sub: 'Exam simulations' },
];

const alerts = [
  { text: '12 students need immediate score support', color: COLORS.amber },
  { text: '8 students show low practice consistency', color: COLORS.yellow },
];

const subjects = [
  { name: '📐 Math', score: 48, practice: 'Low', retention: 'Low', risk: '🔴 High Risk', riskColor: COLORS.amber },
  { name: '🔬 Science', score: 55, practice: 'Medium', retention: 'Medium', risk: '🟡 Monitor', riskColor: COLORS.yellow },
  { name: '📖 English', score: 72, practice: 'High', retention: 'High', risk: '🟢 Stable', riskColor: COLORS.green },
  { name: '🌍 Social Science', score: 65, practice: 'Medium', retention: 'Medium', risk: '🟡 Monitor', riskColor: COLORS.yellow },
  { name: '✍️ Hindi', score: 80, practice: 'High', retention: 'High', risk: '🟢 Stable', riskColor: COLORS.green },
];

const segments = [
  { label: 'High Performers', count: 8, color: COLORS.green, icon: '🏆', desc: '≥75% score & consistent practice' },
  { label: 'Mid Performers', count: 14, color: COLORS.yellow, icon: '📈', desc: '50–74% score, moderate engagement' },
  { label: 'At Risk', count: 10, color: COLORS.amber, icon: '⚠️', desc: 'Below 50% score or inactive > 7 days' },
];

const atRiskStudents = [
  { name: 'Rahul', subjectIssue: 'Math', chapterIssue: 'Trigonometry' },
  { name: 'Aisha', subjectIssue: 'Science', chapterIssue: 'Chemical Reactions' },
  { name: 'Priya', subjectIssue: 'Math', chapterIssue: 'Polynomials' },
  { name: 'Dev', subjectIssue: 'English', chapterIssue: 'Grammar Rules' },
  { name: 'Meera', subjectIssue: 'Science', chapterIssue: 'Acids & Bases' },
  { name: 'Rohan', subjectIssue: 'Math', chapterIssue: 'Algebra' },
  { name: 'Neha', subjectIssue: 'Science', chapterIssue: 'Electricity' },
  { name: 'Karan', subjectIssue: 'English', chapterIssue: 'Comprehension' },
  { name: 'Simran', subjectIssue: 'Math', chapterIssue: 'Geometry' },
  { name: 'Amit', subjectIssue: 'Science', chapterIssue: 'Evolution' },
];

const highPerformersList = [
  { name: 'Aditi',  subject: 'Math', details: 'Consistent 90%+' },
  { name: 'Vikram', subject: 'Science', details: 'Top in class' },
  { name: 'Sanya',  subject: 'English', details: 'Perfect assignments' },
  { name: 'Kabir',  subject: 'Hindi', details: 'Excellent writing' },
  { name: 'Ananya', subject: 'Social Science', details: 'Active participant' },
  { name: 'Riya',   subject: 'Math', details: 'Fast problem solver' },
  { name: 'Arjun',  subject: 'Science', details: 'High practical score' },
  { name: 'Shruti', subject: 'English', details: 'Strong vocabulary' },
];

const midPerformersList = [
  { name: 'Yash',   subject: 'Math', details: 'Needs speed practice' },
  { name: 'Pooja',  subject: 'Science', details: 'Conceptual clarity good' },
  { name: 'Ravi',   subject: 'English', details: 'Average grammar' },
  { name: 'Sneha',  subject: 'Hindi', details: 'Good spelling' },
  { name: 'Tarun',  subject: 'Social Science', details: 'Needs more reading' },
  { name: 'Isha',   subject: 'Math', details: 'Calculation errors' },
  { name: 'Varun',  subject: 'Science', details: 'Forgets formulas' },
  { name: 'Gargi',  subject: 'English', details: 'Moderate vocabulary' },
  { name: 'Naman',  subject: 'Hindi', details: 'Average reading speed' },
  { name: 'Mitali', subject: 'Social Science', details: 'Needs map practice' },
  { name: 'Aakash', subject: 'Math', details: 'Good at algebra' },
  { name: 'Kavya',  subject: 'Science', details: 'Loves biology' },
  { name: 'Harsh',  subject: 'English', details: 'Good speaking skills' },
  { name: 'Tanya',  subject: 'Hindi', details: 'Needs writing practice' },
];

const unifiedInsights = [
  {
    icon: '📐',
    title: 'Math concept gap detected',
    evidence: 'High practice but low accuracy in Math',
    impact: 'Affects 7 students',
    urgency: 'High Priority',
    actionText: 'Re-teach Trigonometry basics',
    cta: 'Schedule Session',
    color: COLORS.amber,
  },
  {
    icon: '🔬',
    title: 'Retention drop in Science',
    evidence: 'Students forget within 48 hrs',
    impact: 'Class-wide (< 40%)',
    urgency: 'Medium Priority',
    actionText: 'Assign Chemical Reactions revision',
    cta: 'Assign Revision',
    color: COLORS.blue,
  },
  {
    icon: '⏱️',
    title: 'Fatigue pattern after Q6',
    evidence: 'Attention drops after 6–8 questions',
    impact: 'Speed issue',
    urgency: 'Medium Priority',
    actionText: 'Conduct timed practice drill',
    cta: 'Schedule Drill',
    color: COLORS.yellow,
  },
];

// ─── Small components ─────────────────────────────────────────────────────────
function SectionLabel({ children, action }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Typography sx={{
        fontWeight: 700, fontSize: '0.75rem',
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: COLORS.textMuted, fontFamily: "'Inter'",
      }}>{children}</Typography>
      {action}
    </Box>
  );
}

function AccuracyBar({ value, color }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{
        flex: 1, height: 6, borderRadius: 8,
        background: COLORS.divider, overflow: 'hidden',
      }}>
        <Box sx={{
          height: '100%', width: `${value}%`,
          background: `linear-gradient(90deg, ${color}90, ${color})`,
          borderRadius: 8,
          transition: 'width 0.6s ease',
        }} />
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', color, fontFamily: "'DM Sans'", minWidth: 36 }}>
        {value}%
      </Typography>
    </Box>
  );
}

// ─── Section 1: Class Health Summary ─────────────────────────────────────────
function ClassHealthSummary() {
  return (
    <Card elevation={0}>
      <CardContent>
        <SectionLabel>
          Class Health Summary
        </SectionLabel>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Top: 3-column metric grid */}
          <Grid container spacing={2}>
            {healthMetrics.map(m => (
              <Grid item xs={12} sm={4} key={m.label}>
                <Box sx={{
                  p: 2, borderRadius: '16px',
                  background: `${m.color}10`,
                  border: `1px solid ${m.color}30`,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                }}>
                  <Box sx={{
                    position: 'absolute', top: -10, right: -10,
                    width: 60, height: 60, borderRadius: '50%',
                    background: `${m.color}10`,
                  }} />
                  <Typography sx={{ fontSize: '1.5rem', mb: 0.5 }}>{m.icon}</Typography>
                  <Typography sx={{
                    fontWeight: 900, fontSize: '2rem', color: m.color,
                    fontFamily: "'DM Sans'", lineHeight: 1,
                  }}>{m.value}</Typography>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: COLORS.textPrimary, mt: 0.5 }}>
                    {m.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: COLORS.textMuted }}>{m.sub}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Bottom: alert banners stacked horizontally if space allows, or vertical */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {alerts.map(a => (
              <Box key={a.text} sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                p: '10px 16px', borderRadius: '12px',
                background: `${a.color}10`,
                border: `1px solid ${a.color}35`,
              }}>
                <Typography sx={{ fontSize: '1.1rem', flexShrink: 0 }}>⚠️</Typography>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: COLORS.textPrimary }}>
                  {a.text}
                </Typography>
              </Box>
            ))}
            <Box sx={{
              p: '10px 16px', borderRadius: '12px',
              background: `${COLORS.blue}08`,
              border: `1px solid ${COLORS.blue}22`,
            }}>
              <Typography sx={{ fontSize: '0.78rem', color: COLORS.textSecondary, lineHeight: 1.5 }}>
                <strong>Grade 10 NIOS</strong> · 32 Students · Last updated today
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── Section 2: Subject-wise Performance Table ────────────────────────────────
function SubjectTable() {
  const colHeader = { fontWeight: 700, fontSize: '0.72rem', color: COLORS.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' };
  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent sx={{ pb: '16px !important' }}>
        <SectionLabel>Subject-wise Performance</SectionLabel>
        <Box sx={{ overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 540 }}>
            <TableHead>
              <TableRow sx={{ '& th': { border: 'none', pb: 1, pt: 0 } }}>
                <TableCell sx={colHeader}>Subject</TableCell>
                <TableCell sx={colHeader} align="left">Avg Score</TableCell>
                <TableCell sx={colHeader} align="center">Practice Level</TableCell>
                <TableCell sx={colHeader} align="center">Retention Rate</TableCell>
                <TableCell sx={colHeader} align="center">Risk</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map(s => (
                <TableRow key={s.name} sx={{
                  '& td': { border: 'none', py: 0.8 },
                  borderRadius: '12px',
                  '&:hover td': { background: COLORS.divider },
                  transition: 'all 0.15s',
                }}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: COLORS.textPrimary }}>
                      {s.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ minWidth: 140 }}>
                      <AccuracyBar value={s.score} color={s.riskColor} />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={s.practice}
                      size="small"
                      sx={{
                        height: 22, fontSize: '0.7rem', fontWeight: 600,
                        background: s.practice === 'High' ? `${COLORS.green}15` : s.practice === 'Medium' ? `${COLORS.yellow}15` : `${COLORS.amber}15`,
                        color: s.practice === 'High' ? COLORS.green : s.practice === 'Medium' ? COLORS.yellowDark : COLORS.amberDark,
                        border: `1px solid ${s.practice === 'High' ? COLORS.green : s.practice === 'Medium' ? COLORS.yellow : COLORS.amber}30`,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={s.retention}
                      size="small"
                      sx={{
                        height: 22, fontSize: '0.7rem', fontWeight: 600,
                        background: s.retention === 'High' ? `${COLORS.green}15` : s.retention === 'Medium' ? `${COLORS.yellow}15` : `${COLORS.amber}15`,
                        color: s.retention === 'High' ? COLORS.green : s.retention === 'Medium' ? COLORS.yellowDark : COLORS.amberDark,
                        border: `1px solid ${s.retention === 'High' ? COLORS.green : s.retention === 'Medium' ? COLORS.yellow : COLORS.amber}30`,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                      <Typography sx={{ fontSize: '1rem' }}>{s.risk.split(' ')[0]}</Typography>
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: s.riskColor }}>{s.risk.substring(2)}</Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── Section 3: Student Segmentation ─────────────────────────────────────────
function StudentSegmentation() {
  const [modalCategory, setModalCategory] = useState(null);
  const studentsListMap = {
    'At Risk': atRiskStudents.map(s => ({ name: s.name, col1: s.subjectIssue, col2: s.chapterIssue })),
    'High Performers': highPerformersList.map(s => ({ name: s.name, col1: s.subject, col2: s.details })),
    'Mid Performers': midPerformersList.map(s => ({ name: s.name, col1: s.subject, col2: s.details })),
  };

  const currentList = modalCategory ? studentsListMap[modalCategory] : [];
  const currentSeg = segments.find(s => s.label === modalCategory);
  const darkColors = {
    'High Performers': COLORS.greenDark,
    'Mid Performers': COLORS.yellowDark,
    'At Risk': COLORS.amberDark,
  };

  return (
    <Card elevation={0}>
      <CardContent>
        <SectionLabel>Student Segmentation</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {segments.map(seg => {
            return (
              <Box
                key={seg.label}
                onClick={() => setModalCategory(seg.label)}
                sx={{
                  borderRadius: '16px', cursor: 'pointer',
                  background: `${seg.color}05`,
                  border: `1px solid ${COLORS.border}`,
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    background: `${seg.color}08`,
                    borderColor: `${seg.color}50`,
                    boxShadow: `0 4px 12px ${seg.color}15`,
                  },
                }}
              >
                {/* Header Row */}
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ fontSize: '1.2rem', filter: 'none' }}>{seg.icon}</Box>
                    <Typography sx={{ fontWeight: 800, fontSize: '0.88rem', color: COLORS.textPrimary }}>
                      {seg.label}
                    </Typography>
                  </Box>
                  <Box sx={{
                    px: 1.2, py: 0.3, borderRadius: '20px',
                    background: `${seg.color}15`, border: `1px solid ${seg.color}30`,
                  }}>
                    <Typography sx={{ fontWeight: 900, fontSize: '1rem', color: seg.color, fontFamily: "'DM Sans'", lineHeight: 1 }}>
                      {seg.count}
                    </Typography>
                  </Box>
                </Box>
                
                {/* Body Content */}
                <Box sx={{ px: 2, pb: 1, textAlign: 'center' }}>
                  <Typography variant="caption" sx={{ color: COLORS.textSecondary, fontWeight: 600, fontSize: '0.72rem', display: 'block', mb: 1.5 }}>
                    {seg.desc}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', pb: 1 }}>
                    <Button
                      variant="text"
                      size="small"
                      onClick={(e) => { e.stopPropagation(); setModalCategory(seg.label); }}
                      sx={{ 
                        textTransform: 'none', 
                        fontWeight: 800, 
                        color: COLORS.textSecondary, 
                        fontSize: '0.72rem',
                        background: COLORS.divider,
                        px: 2,
                        borderRadius: '20px',
                        '&:hover': { 
                          background: `${seg.color}20`,
                          color: seg.color,
                        } 
                      }}
                    >
                      View All {seg.count} Students →
                    </Button>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Dynamic Dialog for Students */}
        <Dialog open={!!modalCategory} onClose={() => setModalCategory(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
          {currentSeg && (
            <DialogTitle sx={{ background: `${currentSeg.color}12`, borderBottom: `1px solid ${currentSeg.color}20`, display: 'flex', alignItems: 'center', gap: 1, p: 2 }}>
              <Typography sx={{ fontSize: '1.2rem' }}>{currentSeg.icon}</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: darkColors[modalCategory] || currentSeg.color }}>
                {modalCategory === 'At Risk' ? 'All At Risk Students' : `All ${modalCategory}`}
              </Typography>
              <IconButton onClick={() => setModalCategory(null)} sx={{ ml: 'auto' }} size="small">
                <Typography sx={{ fontSize: '1rem', color: COLORS.textMuted }}>✕</Typography>
              </IconButton>
            </DialogTitle>
          )}
          <DialogContent sx={{ p: 0 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ '& th': { borderBottom: `1px solid ${COLORS.border}`, py: 1.5, px: 3 } }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: COLORS.textMuted, textTransform: 'uppercase' }}>Student</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: COLORS.textMuted, textTransform: 'uppercase' }}>{modalCategory === 'At Risk' ? 'Subject Issue' : 'Subject'}</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: COLORS.textMuted, textTransform: 'uppercase' }}>{modalCategory === 'At Risk' ? 'Chapter Issue' : 'Details'}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentList.map((s, i) => (
                  <TableRow key={i} sx={{ '& td': { borderBottom: `1px solid ${COLORS.divider}`, py: 1.5, px: 3 }, '&:hover td': { background: currentSeg ? `${currentSeg.color}05` : COLORS.divider } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: currentSeg ? `${currentSeg.color}20` : COLORS.divider,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', color: currentSeg ? darkColors[modalCategory] || currentSeg.color : COLORS.textPrimary }}>
                            {s.name[0]}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: COLORS.textPrimary }}>
                          {s.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={s.col1}
                        size="small"
                        sx={{ height: 24, fontSize: '0.75rem', fontWeight: 600, background: `${COLORS.blue}12`, color: COLORS.blue, '& .MuiChip-label': { px: 1.5 } }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.85rem', color: COLORS.textSecondary }}>{s.col2}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

// ─── Section 5: Class Insights & Actions ──────────────────────────────────────
function ClassInsightsAndActions() {
  return (
    <Card elevation={0} sx={{ height: '100%' }}>
      <CardContent>
        <SectionLabel>Class Insights & Actions</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {unifiedInsights.map((item, i) => (
            <Box key={i} sx={{
              display: 'flex', alignItems: 'stretch', justifyContent: 'space-between',
              p: '16px 20px', borderRadius: '12px', background: COLORS.bgWarm,
              border: `1px solid ${COLORS.border}`,
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 2,
            }}>
              {/* Left side: Diagnosis */}
              <Box sx={{ display: 'flex', gap: 2, flex: 1, alignItems: 'center' }}>
                <Box sx={{
                  width: 44, height: 44, borderRadius: '10px', background: `${item.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
                  flexShrink: 0
                }}>{item.icon}</Box>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: COLORS.textPrimary }}>
                      {item.title}
                    </Typography>
                    {item.impact && <Chip label={item.impact} size="small" sx={{ height: 20, fontSize: '0.65rem', background: COLORS.divider, color: COLORS.textSecondary, fontWeight: 700 }} />}
                    {item.urgency && <Chip label={item.urgency} size="small" sx={{ height: 20, fontSize: '0.65rem', background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30`, fontWeight: 700 }} />}
                  </Box>
                  <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary }}>
                    {item.evidence}
                  </Typography>
                </Box>
              </Box>

              {/* Right side: Action */}
              <Box sx={{
                display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'center',
                minWidth: { xs: '100%', lg: 280 }, p: 1.5, background: `${item.color}08`, borderRadius: '10px',
                border: `1px solid ${item.color}25`,
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.5 }}>
                  <Typography sx={{ fontSize: '0.68rem', color: COLORS.textMuted, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    → Recommended Action
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: COLORS.textPrimary, mb: 1.2 }}>
                  {item.actionText}
                </Typography>
                <Button 
                  variant="outlined" 
                  size="small" 
                  sx={{
                    borderColor: COLORS.border,
                    color: COLORS.textPrimary,
                    background: COLORS.bgWarm,
                    textTransform: 'none', 
                    fontWeight: 700, 
                    fontSize: '0.75rem', 
                    py: 0.6, 
                    width: '100%',
                    boxShadow: 'none',
                    '&:hover': { 
                      background: COLORS.divider, 
                      borderColor: COLORS.textMuted,
                      boxShadow: 'none'
                    }
                  }}
                >
                  {item.cta}
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function E0_ClassOverview() {
  return (
    <Layout
      role="educator"
      title="Class Performance Dashboard — Grade 10 NIOS"
      subtitle="Track class health, identify risk clusters, and drill into student groups"
    >
      <Grid container spacing={2.5} alignItems="stretch">
        {/* ROW 1: 2 Columns */}
        <Grid item xs={12} lg={6}>
          <ClassHealthSummary />
        </Grid>
        <Grid item xs={12} lg={6}>
          <SubjectTable />
        </Grid>

        {/* ROW 2: 2 Columns (3 - 9 breakdown) */}
        <Grid item xs={12} lg={3}>
          <StudentSegmentation />
        </Grid>
        <Grid item xs={12} lg={9}>
          <ClassInsightsAndActions />
        </Grid>
      </Grid>
    </Layout>
  );
}
