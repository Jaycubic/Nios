// src/screens/educator/E1_StudentOverview.jsx
import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Chip, Grid, Divider, Button,
  Table, TableBody, TableCell, TableHead, TableRow, Collapse, LinearProgress,
} from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── Student data ─────────────────────────────────────────────────────────────
const student = {
  name: 'Rahul Sharma',
  grade: 'Grade 10 · NIOS',
  rollNo: '2024NIOS1048',
  accuracy: 52,
  practice: 'Medium',
  retention: 60,
  status: 'Needs Support',
};

const subjectData = [
  { subject: '📐 Math', accuracy: 45, practice: 'High', retention: 50, status: '🔴', statusColor: COLORS.amber },
  { subject: '🔬 Science', accuracy: 58, practice: 'Medium', retention: 62, status: '🟡', statusColor: COLORS.yellow },
  { subject: '📖 English', accuracy: 72, practice: 'High', retention: 78, status: '🟢', statusColor: COLORS.green },
  { subject: '🌍 Social', accuracy: 61, practice: 'Low', retention: 55, status: '🟡', statusColor: COLORS.yellow },
];

const chapterData = {
  '📐 Math': [
    { chapter: 'Trigonometry', accuracy: 38, retention: 45, attempts: 4, status: '🔴', statusColor: COLORS.amber },
    { chapter: 'Algebra', accuracy: 60, retention: 65, attempts: 5, status: '🟡', statusColor: COLORS.yellow },
    { chapter: 'Linear Equations', accuracy: 71, retention: 70, attempts: 6, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Number Systems', accuracy: 82, retention: 80, attempts: 4, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Polynomials', accuracy: 42, retention: 48, attempts: 3, status: '🔴', statusColor: COLORS.amber },
  ],
  '🔬 Science': [
    { chapter: 'Chemical Reactions', accuracy: 42, retention: 38, attempts: 3, status: '🔴', statusColor: COLORS.amber },
    { chapter: 'Acids & Bases', accuracy: 58, retention: 60, attempts: 4, status: '🟡', statusColor: COLORS.yellow },
    { chapter: 'Life Processes', accuracy: 67, retention: 70, attempts: 5, status: '🟢', statusColor: COLORS.green },
  ],
  '📖 English': [
    { chapter: 'Grammar Rules', accuracy: 72, retention: 78, attempts: 4, status: '🟢', statusColor: COLORS.green },
    { chapter: 'Reading Comp.', accuracy: 80, retention: 82, attempts: 3, status: '🟢', statusColor: COLORS.green },
  ],
  '🌍 Social': [
    { chapter: 'History - WW2', accuracy: 65, retention: 60, attempts: 3, status: '🟡', statusColor: COLORS.yellow },
    { chapter: 'Geography - Maps', accuracy: 55, retention: 50, attempts: 2, status: '🟡', statusColor: COLORS.yellow },
  ],
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
          <Box sx={{ display: 'flex', gap: 3, ml: { xs: 0, md: 'auto' }, flexWrap: 'wrap' }}>
            {[
              { label: 'Overall Accuracy', value: `${student.accuracy}%`, color: COLORS.amberDark },
              { label: 'Practice Level', value: student.practice, color: COLORS.blue },
              { label: 'Retention Rate', value: `${student.retention}%`, color: COLORS.purple },
            ].map(k => (
              <Box key={k.label} sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontWeight: 900, fontSize: '1.8rem', color: k.color, fontFamily: "'DM Sans'", lineHeight: 1 }}>
                  {k.value}
                </Typography>
                <Typography sx={{ color: COLORS.textMuted, fontSize: '0.7rem', mt: 0.3 }}>
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

// ─── Section 2: Subject-wise Performance ─────────────────────────────────────
function SubjectTable() {
  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>📊 Subject-wise Performance</Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ '& th': colHeader }}>
                <TableCell>Subject</TableCell>
                <TableCell>Accuracy</TableCell>
                <TableCell align="center">Practice</TableCell>
                <TableCell>Retention</TableCell>
                <TableCell align="center">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjectData.map(s => (
                <TableRow key={s.subject} sx={{
                  '& td': { border: 'none', py: 1.4 },
                  '&:hover td': { background: COLORS.divider },
                  transition: 'all 0.15s',
                }}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: COLORS.textPrimary }}>{s.subject}</Typography>
                  </TableCell>
                  <TableCell sx={{ minWidth: 160 }}><AccuracyBar value={s.accuracy} color={s.statusColor} /></TableCell>
                  <TableCell align="center">{practiceChip(s.practice)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={s.retention}
                        sx={{
                          flex: 1, height: 6, borderRadius: 8,
                          background: COLORS.divider,
                          '& .MuiLinearProgress-bar': { background: s.statusColor },
                        }}
                      />
                      <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: s.statusColor, minWidth: 32 }}>
                        {s.retention}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{ fontSize: '1.2rem' }}>{s.status}</Typography>
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

// ─── Section 3: Chapter-wise Performance ─────────────────────────────────────
function ChapterTable() {
  const [openSubject, setOpenSubject] = useState('📐 Math');

  return (
    <Card elevation={0}>
      <CardContent>
        <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>📚 Chapter-wise Performance</Typography>

        {/* Subject tabs */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {Object.keys(chapterData).map(subj => {
            const isOpen = openSubject === subj;
            const subjectInfo = subjectData.find(s => s.subject === subj);
            return (
              <Chip
                key={subj}
                label={subj}
                onClick={() => setOpenSubject(isOpen ? null : subj)}
                sx={{
                  fontWeight: isOpen ? 700 : 500,
                  background: isOpen ? `${subjectInfo?.statusColor}20` : COLORS.divider,
                  color: isOpen ? subjectInfo?.statusColor : COLORS.textSecondary,
                  border: `1px solid ${isOpen ? subjectInfo?.statusColor + '50' : 'transparent'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': { background: `${subjectInfo?.statusColor}15` },
                }}
              />
            );
          })}
        </Box>

        {/* Chapter rows */}
        {Object.entries(chapterData).map(([subj, chapters]) => (
          <Collapse key={subj} in={openSubject === subj}>
            <Box sx={{ overflowX: 'auto' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ '& th': colHeader }}>
                    <TableCell>Chapter</TableCell>
                    <TableCell>Accuracy</TableCell>
                    <TableCell>Retention</TableCell>
                    <TableCell align="center">Attempts</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chapters.map(c => (
                    <TableRow key={c.chapter} sx={{
                      '& td': { border: 'none', py: 1.2 },
                      '&:hover td': { background: COLORS.divider },
                      transition: 'all 0.15s',
                    }}>
                      <TableCell>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.82rem', color: COLORS.textPrimary }}>{c.chapter}</Typography>
                      </TableCell>
                      <TableCell sx={{ minWidth: 140 }}><AccuracyBar value={c.accuracy} color={c.statusColor} /></TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={c.retention}
                            sx={{
                              width: 80, height: 5, borderRadius: 8,
                              background: COLORS.divider,
                              '& .MuiLinearProgress-bar': { background: `${c.statusColor}80` },
                            }}
                          />
                          <Typography sx={{ fontSize: '0.75rem', color: COLORS.textSecondary }}>{c.retention}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: 26, height: 26, borderRadius: '8px',
                          background: COLORS.divider,
                        }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.78rem', color: COLORS.textSecondary }}>{c.attempts}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="center">
                        <Typography sx={{ fontSize: '1.1rem' }}>{c.status}</Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        ))}
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
      <Grid container spacing={2.5}>
        {/* Student snapshot – full width dark hero */}
        <Grid item xs={12}>
          <StudentSnapshot />
        </Grid>

        {/* Subject table */}
        <Grid item xs={12} lg={6}>
          <SubjectTable />
        </Grid>

        {/* Chapter table */}
        <Grid item xs={12} lg={6}>
          <ChapterTable />
        </Grid>
      </Grid>
    </Layout>
  );
}
