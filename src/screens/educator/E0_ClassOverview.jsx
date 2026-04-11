import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Chip, Grid, Divider, Button,
  Table, TableBody, TableCell, TableHead, TableRow, Collapse, Tooltip,
} from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── Data ────────────────────────────────────────────────────────────────────
const healthMetrics = [
  { label: 'Overall Accuracy',    value: '58%', icon: '🎯', color: COLORS.yellow, sub: 'Class average' },
  { label: 'Practice Completion', value: '46%', icon: '📝', color: COLORS.blue,   sub: 'Regular tasks' },
  { label: 'Mock Readiness',      value: '40%', icon: '📋', color: COLORS.amber,  sub: 'Exam simulations' },
];

const alerts = [
  { text: '12 students below 50% accuracy', color: COLORS.amber },
  { text: '8 students not practicing regularly', color: COLORS.yellow },
];

const subjects = [
  { name: '📐 Math',    accuracy: 48, practice: 'Low',    readiness: 'Low',    risk: '🔴', riskColor: COLORS.amber  },
  { name: '🔬 Science', accuracy: 55, practice: 'Medium', readiness: 'Medium', risk: '🟡', riskColor: COLORS.yellow },
  { name: '📖 English', accuracy: 72, practice: 'High',   readiness: 'High',   risk: '🟢', riskColor: COLORS.green  },
];

const segments = [
  { label: 'High Performers', count: 8,  color: COLORS.green,  icon: '🏆', desc: '≥75% accuracy & consistent practice' },
  { label: 'Mid Performers',  count: 14, color: COLORS.yellow,  icon: '📈', desc: '50–74% accuracy, moderate engagement' },
  { label: 'At Risk',         count: 10, color: COLORS.amber,   icon: '⚠️', desc: 'Below 50% accuracy or inactive > 7 days' },
];

const atRiskStudents = [
  { name: 'Rahul',  subjectIssue: 'Math',    chapterIssue: 'Trigonometry'       },
  { name: 'Aisha',  subjectIssue: 'Science',  chapterIssue: 'Chemical Reactions'  },
  { name: 'Priya',  subjectIssue: 'Math',    chapterIssue: 'Polynomials'         },
  { name: 'Dev',    subjectIssue: 'English',  chapterIssue: 'Grammar Rules'       },
  { name: 'Meera',  subjectIssue: 'Science',  chapterIssue: 'Acids & Bases'       },
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
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
          {/* Left: metric cards */}
          <Box sx={{ flex: 1, minWidth: 280 }}>
            <SectionLabel>
              Section 1 · Class Health Summary
            </SectionLabel>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {healthMetrics.map(m => (
                <Box key={m.label} sx={{
                  flex: 1, minWidth: 120,
                  p: 2, borderRadius: '16px',
                  background: `${m.color}10`,
                  border: `1px solid ${m.color}30`,
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
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
              ))}
            </Box>
          </Box>

          {/* Right: alert banners */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, minWidth: 260, pt: { xs: 0, md: 4.5 } }}>
            {alerts.map(a => (
              <Box key={a.text} sx={{
                display: 'flex', alignItems: 'center', gap: 1.5,
                p: '12px 16px', borderRadius: '12px',
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
              p: '12px 16px', borderRadius: '12px',
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
    <Card elevation={0}>
      <CardContent>
        <SectionLabel>Section 2 · Subject-wise Performance</SectionLabel>
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
                  <TableCell align="center">
                    <Tooltip title={`Risk: ${s.risk === '🔴' ? 'High' : s.risk === '🟡' ? 'Medium' : 'Low'}`}>
                      <Typography sx={{ fontSize: '1.2rem' }}>{s.risk}</Typography>
                    </Tooltip>
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

  return (
    <Card elevation={0}>
      <CardContent>
        <SectionLabel>Section 3 · Student Segmentation</SectionLabel>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
          {segments.map(seg => {
            const isActive = active === seg.label;
            return (
              <Box
                key={seg.label}
                onClick={() => setActive(isActive ? null : seg.label)}
                sx={{
                  flex: 1, minWidth: 160,
                  p: 2.5, borderRadius: '16px', cursor: 'pointer',
                  background: isActive ? `${seg.color}15` : COLORS.bgWarm,
                  border: `2px solid ${isActive ? seg.color : COLORS.border}`,
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    background: `${seg.color}10`,
                    border: `2px solid ${seg.color}60`,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 20px ${seg.color}20`,
                  },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ fontSize: '1.4rem' }}>{seg.icon}</Typography>
                  <Box sx={{
                    px: 1.5, py: 0.4, borderRadius: '20px',
                    background: `${seg.color}20`,
                  }}>
                    <Typography sx={{ fontWeight: 900, fontSize: '1.2rem', color: seg.color, fontFamily: "'DM Sans'", lineHeight: 1 }}>
                      {seg.count}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: COLORS.textPrimary, mb: 0.4 }}>
                  {seg.label}
                </Typography>
                <Typography variant="caption" sx={{ color: COLORS.textMuted, lineHeight: 1.4 }}>
                  {seg.desc}
                </Typography>
                {isActive && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" sx={{ color: seg.color, fontWeight: 700 }}>
                      ▲ Click to collapse
                    </Typography>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>

        {/* At Risk expanded table */}
        <Collapse in={active === 'At Risk'}>
          <Box sx={{
            mt: 1, borderRadius: '12px',
            border: `1px solid ${COLORS.amber}30`,
            background: `${COLORS.amber}05`,
            overflow: 'hidden',
          }}>
            <Box sx={{
              px: 2, py: 1.5,
              background: `${COLORS.amber}12`,
              borderBottom: `1px solid ${COLORS.amber}20`,
              display: 'flex', alignItems: 'center', gap: 1,
            }}>
              <Typography sx={{ fontSize: '1rem' }}>⚠️</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '0.82rem', color: COLORS.amberDark }}>
                At Risk Students — Requires Immediate Attention
              </Typography>
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ '& th': { border: 'none', py: 1 } }}>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: COLORS.textMuted, textTransform: 'uppercase' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: COLORS.textMuted, textTransform: 'uppercase' }}>Subject Issue</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: COLORS.textMuted, textTransform: 'uppercase' }}>Chapter Issue</TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '0.7rem', color: COLORS.textMuted, textTransform: 'uppercase' }} align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {atRiskStudents.map((s, i) => (
                  <TableRow key={i} sx={{ '& td': { border: 'none', py: 1 }, '&:hover td': { background: `${COLORS.amber}08` } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{
                          width: 28, height: 28, borderRadius: '50%',
                          background: `${COLORS.amber}20`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.72rem', color: COLORS.amberDark }}>
                            {s.name[0]}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.83rem', color: COLORS.textPrimary }}>
                          {s.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={s.subjectIssue}
                        size="small"
                        sx={{ height: 20, fontSize: '0.68rem', fontWeight: 600, background: `${COLORS.blue}12`, color: COLORS.blue, '& .MuiChip-label': { px: 1 } }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary }}>{s.chapterIssue}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" variant="outlined" sx={{
                        fontSize: '0.68rem', py: 0.3, px: 1.2,
                        color: COLORS.amber, borderColor: `${COLORS.amber}50`,
                        '&:hover': { background: `${COLORS.amber}10`, borderColor: COLORS.amber },
                      }}>
                        View →
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>

        {/* Other segments expanded */}
        {active && active !== 'At Risk' && (
          <Box sx={{
            mt: 1, p: 2, borderRadius: '12px',
            background: COLORS.divider,
            border: `1px solid ${COLORS.border}`,
          }}>
            <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>
              {active === 'High Performers'
                ? '8 students performing above 75% accuracy with consistent engagement. No immediate action needed — consider enrichment challenges.'
                : '14 students in developing range (50–74%). Regular check-ins recommended. Assign targeted chapter drills to accelerate progress.'}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Section 5: Class Diagnosis ───────────────────────────────────────────────
function ClassDiagnosis() {
  return (
    <Card elevation={0}>
      <CardContent>
        <SectionLabel>Section 5 · Class-Level Diagnosis</SectionLabel>
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
          Section 6 · Class Intervention Guidance
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
      title="Class Overview — Grade 10 NIOS"
      subtitle="32 Students · Multi-student view · Live performance snapshot"
    >
      {/* Dark hero banner */}
      <Box sx={{
        mb: 3, p: '18px 24px', borderRadius: '16px',
        background: COLORS.bgDark,
        display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap',
      }}>
        <Box>
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem', fontFamily: "'DM Sans'" }}>
            📊 Mode 1: Class Overview
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', mt: 0.3 }}>
            Aggregate analytics for Grade 10 NIOS · Drill into any student from the Segmentation panel
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[
            { label: 'Total Students', value: '32', color: COLORS.blue   },
            { label: 'Active Today',   value: '18', color: COLORS.green  },
            { label: 'Need Attention', value: '10', color: COLORS.amber  },
          ].map(s => (
            <Box key={s.label} sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 900, fontSize: '1.4rem', color: s.color, fontFamily: "'DM Sans'", lineHeight: 1 }}>
                {s.value}
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.68rem' }}>{s.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Grid container spacing={2.5}>
        {/* Section 1 + Section 2 side by side */}
        <Grid item xs={12} lg={6}>
          <ClassHealthSummary />
        </Grid>
        <Grid item xs={12} lg={6}>
          <SubjectTable />
        </Grid>

        {/* Section 3: Full-width segmentation */}
        <Grid item xs={12}>
          <StudentSegmentation />
        </Grid>

        {/* Section 5 + 6 side by side */}
        <Grid item xs={12} lg={6}>
          <ClassDiagnosis />
        </Grid>
        <Grid item xs={12} lg={6}>
          <ClassIntervention />
        </Grid>
      </Grid>
    </Layout>
  );
}
