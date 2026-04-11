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
  { label: 'Overall Accuracy', value: '58%', icon: '🎯', color: COLORS.yellow, sub: 'Class average' },
  { label: 'Practice Task Completion', value: '46%', icon: '📝', color: COLORS.blue, sub: 'Regular tasks' },
  { label: 'Mock Readiness', value: '40%', icon: '📋', color: COLORS.amber, sub: 'Exam simulations' },
];

const alerts = [
  { text: '12 students need immediate accuracy support', color: COLORS.amber },
  { text: '8 students show low practice consistency', color: COLORS.yellow },
];

const subjects = [
  { name: '📐 Math', accuracy: 48, practice: 'Low', readiness: 'Low', risk: '🔴 High Risk', riskColor: COLORS.amber },
  { name: '🔬 Science', accuracy: 55, practice: 'Medium', readiness: 'Medium', risk: '🟡 Monitor', riskColor: COLORS.yellow },
  { name: '📖 English', accuracy: 72, practice: 'High', readiness: 'High', risk: '🟢 Stable', riskColor: COLORS.green },
];

const segments = [
  { label: 'High Performers', count: 8, color: COLORS.green, icon: '🏆', desc: '≥75% accuracy & consistent practice' },
  { label: 'Mid Performers', count: 14, color: COLORS.yellow, icon: '📈', desc: '50–74% accuracy, moderate engagement' },
  { label: 'At Risk', count: 10, color: COLORS.amber, icon: '⚠️', desc: 'Below 50% accuracy or inactive > 7 days' },
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

const classIssues = [
  { icon: '📐', text: 'High practice but low accuracy in Math → concept gaps exist at class level' },
  { icon: '🔬', text: 'Low retention across Science chapters — students forget within 48 hrs' },
  { icon: '⏱️', text: 'Students struggle after 6–8 questions — attention/fatigue pattern detected' },
];

const interventions = [
  {
    icon: '📐', action: 'Re-teach Trigonometry basics',
    reason: 'Concept gap present across 7 students in class',
    tag: 'Concept Gap', tagColor: COLORS.amber,
  },
  {
    icon: '⏱️', action: 'Conduct timed practice session',
    reason: 'Speed issue detected — students slow after Q6',
    tag: 'Speed', tagColor: COLORS.yellow,
  },
  {
    icon: '🔬', action: 'Assign Chemical Reactions revision',
    reason: 'Low retention (< 40%) across Science chapter',
    tag: 'Retention', tagColor: COLORS.blue,
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
      <CardContent>
        <SectionLabel>Subject-wise Performance</SectionLabel>
        <Box sx={{ overflowX: 'auto' }}>
          <Table size="small" sx={{ minWidth: 540 }}>
            <TableHead>
              <TableRow sx={{ '& th': { border: 'none', pb: 1.5 } }}>
                <TableCell sx={colHeader}>Subject</TableCell>
                <TableCell sx={colHeader} align="left">Avg Accuracy</TableCell>
                <TableCell sx={colHeader} align="center">Practice Level</TableCell>
                <TableCell sx={colHeader} align="center">Mock Readiness</TableCell>
                <TableCell sx={colHeader} align="center">Risk</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map(s => (
                <TableRow key={s.name} sx={{
                  '& td': { border: 'none', py: 1.5 },
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
                      <AccuracyBar value={s.accuracy} color={s.riskColor} />
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
                      label={s.readiness}
                      size="small"
                      sx={{
                        height: 22, fontSize: '0.7rem', fontWeight: 600,
                        background: s.readiness === 'High' ? `${COLORS.green}15` : s.readiness === 'Medium' ? `${COLORS.yellow}15` : `${COLORS.amber}15`,
                        color: s.readiness === 'High' ? COLORS.green : s.readiness === 'Medium' ? COLORS.yellowDark : COLORS.amberDark,
                        border: `1px solid ${s.readiness === 'High' ? COLORS.green : s.readiness === 'Medium' ? COLORS.yellow : COLORS.amber}30`,
                      }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '1.2rem', mb: -0.3 }}>{s.risk.split(' ')[0]}</Typography>
                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 600, color: s.riskColor }}>{s.risk.substring(2)}</Typography>
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
  const [active, setActive] = useState(null);
  const [showAllModal, setShowAllModal] = useState(false);

  return (
    <Card elevation={0} sx={{ position: 'relative', overflow: 'visible' }}>
      <CardContent>
        <SectionLabel>Student Segmentation</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {segments.map(seg => {
            const isActive = active === seg.label;
            return (
              <Box
                key={seg.label}
                onClick={() => setActive(isActive ? null : seg.label)}
                sx={{
                  p: 2, borderRadius: '16px', cursor: 'pointer',
                  background: isActive ? `${seg.color}15` : COLORS.bgWarm,
                  border: `2px solid ${isActive ? seg.color : COLORS.border}`,
                  transition: 'all 0.25s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  '&:hover': {
                    background: `${seg.color}10`,
                    border: `2px solid ${seg.color}60`,
                    transform: 'translateX(2px)',
                    boxShadow: `0 4px 12px ${seg.color}20`,
                  },
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
                    <Typography sx={{ fontSize: '1.2rem' }}>{seg.icon}</Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: COLORS.textPrimary }}>
                      {seg.label}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: COLORS.textMuted, lineHeight: 1.2, display: 'block' }}>
                    {seg.desc}
                  </Typography>
                </Box>
                <Box sx={{
                  px: 1.5, py: 0.4, borderRadius: '20px',
                  background: `${seg.color}20`, ml: 2, flexShrink: 0,
                }}>
                  <Typography sx={{ fontWeight: 900, fontSize: '1.1rem', color: seg.color, fontFamily: "'DM Sans'", lineHeight: 1 }}>
                    {seg.count}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Absolute positioning for expanded popovers to avoid breaking layout */}
        {active && (
          <Box sx={{
            position: 'absolute', top: '20%', left: '105%',
            width: active === 'At Risk' ? 360 : 300,
            zIndex: 10,
            background: COLORS.bgCard,
            borderRadius: '16px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
            border: `1px solid ${COLORS.border}`,
            p: 0,
            overflow: 'hidden',
          }}>
            {active === 'At Risk' ? (
              <Box>
                <Box sx={{
                  px: 2, py: 1.5,
                  background: `${COLORS.amber}12`,
                  borderBottom: `1px solid ${COLORS.amber}20`,
                  display: 'flex', alignItems: 'center', gap: 1,
                }}>
                  <Typography sx={{ fontSize: '1rem' }}>⚠️</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: COLORS.amberDark }}>
                    Requires Immediate Attention
                  </Typography>
                  <Button size="small" onClick={() => setActive(null)} sx={{ ml: 'auto', minWidth: 0, p: 0.5, color: COLORS.textMuted }}>✕</Button>
                </Box>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ '& th': { border: 'none', py: 1 } }}>
                      <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: COLORS.textMuted, textTransform: 'uppercase' }}>Student</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: COLORS.textMuted, textTransform: 'uppercase' }}>Issue</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {atRiskStudents.slice(0, 4).map((s, i) => (
                      <TableRow key={i} sx={{ '& td': { border: 'none', py: 1 }, '&:hover td': { background: `${COLORS.amber}05` } }}>
                        <TableCell>
                          <Typography sx={{ fontWeight: 600, fontSize: '0.83rem', color: COLORS.textPrimary }}>
                            {s.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary, lineHeight: 1.2 }}>
                            {s.subjectIssue}: {s.chapterIssue}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box sx={{ p: 1, textAlign: 'center', background: COLORS.bgWarm, borderTop: `1px solid ${COLORS.border}` }}>
                  <Typography onClick={() => setShowAllModal(true)} sx={{ fontSize: '0.7rem', color: COLORS.blue, fontWeight: 700, cursor: 'pointer' }}>View all 10 students →</Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.85rem' }}>{active}</Typography>
                  <Button size="small" onClick={() => setActive(null)} sx={{ minWidth: 0, p: 0, color: COLORS.textMuted }}>✕</Button>
                </Box>
                <Typography variant="body2" sx={{ color: COLORS.textSecondary, lineHeight: 1.5 }}>
                  {active === 'High Performers'
                    ? '8 students performing above 75% accuracy with consistent engagement. Consider assigning enrichment challenges.'
                    : '14 students in developing range (50–74%). Regular check-ins recommended. Assign targeted chapter drills to accelerate progress.'}
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Dialog for All Students */}
        <Dialog open={showAllModal} onClose={() => setShowAllModal(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
          <DialogTitle sx={{ background: `${COLORS.amber}12`, borderBottom: `1px solid ${COLORS.amber}20`, display: 'flex', alignItems: 'center', gap: 1, p: 2 }}>
            <Typography sx={{ fontSize: '1.2rem' }}>⚠️</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: COLORS.amberDark }}>
              All At Risk Students
            </Typography>
            <IconButton onClick={() => setShowAllModal(false)} sx={{ ml: 'auto' }} size="small">
              <Typography sx={{ fontSize: '1rem', color: COLORS.textMuted }}>✕</Typography>
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ '& th': { borderBottom: `1px solid ${COLORS.border}`, py: 1.5, px: 3 } }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: COLORS.textMuted, textTransform: 'uppercase' }}>Student</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: COLORS.textMuted, textTransform: 'uppercase' }}>Subject Issue</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: COLORS.textMuted, textTransform: 'uppercase' }}>Chapter Issue</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {atRiskStudents.map((s, i) => (
                  <TableRow key={i} sx={{ '& td': { borderBottom: `1px solid ${COLORS.divider}`, py: 1.5, px: 3 }, '&:hover td': { background: `${COLORS.amber}05` } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: `${COLORS.amber}20`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.8rem', color: COLORS.amberDark }}>
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
                        label={s.subjectIssue}
                        size="small"
                        sx={{ height: 24, fontSize: '0.75rem', fontWeight: 600, background: `${COLORS.blue}12`, color: COLORS.blue, '& .MuiChip-label': { px: 1.5 } }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.85rem', color: COLORS.textSecondary }}>{s.chapterIssue}</Typography>
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

// ─── Section 5: Class Diagnosis ───────────────────────────────────────────────
function ClassDiagnosis() {
  return (
    <Card elevation={0}>
      <CardContent>
        <SectionLabel>Class-Level Diagnosis</SectionLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {classIssues.map((issue, i) => (
            <Box key={i} sx={{
              display: 'flex', alignItems: 'flex-start', gap: 2,
              p: '14px 18px', borderRadius: '12px',
              background: COLORS.bgWarm,
              border: `1px solid ${COLORS.border}`,
              transition: 'all 0.15s',
              '&:hover': {
                border: `1px solid ${COLORS.blue}30`,
                background: `${COLORS.blue}04`,
              },
            }}>
              <Box sx={{
                width: 36, height: 36, borderRadius: '10px',
                background: `${COLORS.blue}12`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', flexShrink: 0,
              }}>{issue.icon}</Box>
              <Box>
                <Typography sx={{ fontSize: '0.85rem', color: COLORS.textPrimary, lineHeight: 1.6 }}>
                  {issue.text}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

// ─── Section 6: Class Intervention Guidance ───────────────────────────────────
function ClassIntervention() {
  const [done, setDone] = useState({});

  return (
    <Card elevation={0}>
      <CardContent>
        <SectionLabel
          action={
            <Button
              size="small"
              sx={{
                fontSize: '0.72rem', py: 0.4,
                background: `${COLORS.green}12`,
                color: COLORS.greenDark,
                border: `1px solid ${COLORS.green}30`,
                '&:hover': { background: `${COLORS.green}22` },
              }}
              onClick={() => {
                const all = {};
                interventions.forEach((_, i) => { all[i] = true; });
                setDone(all);
              }}
            >
              Schedule All →
            </Button>
          }
        >
          Class Intervention Guidance
        </SectionLabel>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {interventions.map((item, i) => (
            <Box key={i} sx={{
              display: 'flex', alignItems: 'flex-start', gap: 2,
              p: '16px 18px', borderRadius: '14px',
              background: done[i] ? `${COLORS.green}08` : COLORS.bgWarm,
              border: `1px solid ${done[i] ? COLORS.green + '40' : COLORS.border}`,
              transition: 'all 0.2s',
            }}>
              <Box sx={{
                width: 38, height: 38, borderRadius: '10px',
                background: `${item.tagColor}12`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', flexShrink: 0,
              }}>{item.icon}</Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: COLORS.textPrimary, mb: 0.4 }}>
                  {item.action}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption" sx={{ color: COLORS.textSecondary }}>{item.reason}</Typography>
                  <Chip
                    label={item.tag} size="small"
                    sx={{ height: 18, fontSize: '0.62rem', fontWeight: 600, background: `${item.tagColor}15`, color: item.tagColor, '& .MuiChip-label': { px: 0.8 } }}
                  />
                </Box>
              </Box>
              <Button
                size="small"
                variant={done[i] ? 'outlined' : 'contained'}
                onClick={() => setDone(d => ({ ...d, [i]: !d[i] }))}
                sx={{
                  flexShrink: 0, fontSize: '0.72rem', py: 0.5, minWidth: 90,
                  background: done[i] ? 'transparent' : `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.purpleDark})`,
                  color: done[i] ? COLORS.greenDark : '#fff',
                  borderColor: done[i] ? COLORS.green : 'transparent',
                  boxShadow: done[i] ? 'none' : `0 3px 8px ${COLORS.purple}35`,
                }}
              >
                {done[i] ? '✓ Scheduled' : 'Schedule →'}
              </Button>
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
      <Grid container spacing={2.5}>
        {/* ROW 1: 2 Columns */}
        <Grid item xs={12} lg={6}>
          <ClassHealthSummary />
        </Grid>
        <Grid item xs={12} lg={6}>
          <SubjectTable />
        </Grid>

        {/* ROW 2: 3 Columns (3 - 4 - 5 breakdown) */}
        <Grid item xs={12} lg={3}>
          <StudentSegmentation />
        </Grid>
        <Grid item xs={12} lg={4}>
          <ClassDiagnosis />
        </Grid>
        <Grid item xs={12} lg={5}>
          <ClassIntervention />
        </Grid>
      </Grid>
    </Layout>
  );
}
