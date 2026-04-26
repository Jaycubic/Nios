// src/screens/educator/E0_MyStudents.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Grid, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

const studentCardsData = [
  { id: '1', name: 'Rahul Sharma', grade: 'Class 10 - NIOS', subjects: ['📐 Math', '🔬 Science', '📖 English'], state: 'Needs Support', stateColor: COLORS.amber, struggle: 'Trigonometry basics, Substitution errors', strengths: 'Geometry' },
  { id: '2', name: 'Aisha Khan', grade: 'Class 10 - NIOS', subjects: ['📐 Math', '🔬 Science', '✍️ Hindi'], state: 'Improving', stateColor: COLORS.blue, struggle: 'Chemical Equations', strengths: 'Physics conceptuals' },
  { id: '3', name: 'Priya Patel', grade: 'Class 10 - NIOS', subjects: ['📖 English', '🌍 Social Science', '✍️ Hindi'], state: 'On Track', stateColor: COLORS.green, struggle: 'None apparent', strengths: 'Writing skills, Comprehension' },
  { id: '4', name: 'Dev Joshi', grade: 'Class 10 - NIOS', subjects: ['📐 Math', '📖 English', '🔬 Science'], state: 'Needs Support', stateColor: COLORS.amber, struggle: 'Grammar rules, Vocabulary retention', strengths: 'Reading comprehension' },
  { id: '5', name: 'Meera Reddy', grade: 'Class 10 - NIOS', subjects: ['🔬 Science', '🌍 Social Science', '✍️ Hindi'], state: 'Improving', stateColor: COLORS.blue, struggle: 'Acids & Bases', strengths: 'Geography mapping' },
  { id: '6', name: 'Rohan Gupta', grade: 'Class 10 - NIOS', subjects: ['📐 Math', '✍️ Hindi', '🌍 Social Science'], state: 'On Track', stateColor: COLORS.green, struggle: 'Algebra expressions', strengths: 'Hindi grammar' },
];

function StudentCard({ student }) {
  const navigate = useNavigate();
  return (
    <Card elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: `1px solid ${COLORS.border}`, borderRadius: '16px', '&:hover': { borderColor: student.stateColor, boxShadow: `0 8px 24px ${student.stateColor}15` }, transition: 'all 0.25s' }}>
      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar sx={{ width: 56, height: 56, bgcolor: `${student.stateColor}20`, color: student.stateColor, fontWeight: 800, fontSize: '1.4rem' }}>{student.name[0]}</Avatar>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', color: COLORS.textPrimary }}>{student.name}</Typography>
            <Typography sx={{ fontSize: '0.8rem', color: COLORS.textSecondary, mb: 0.5 }}>{student.grade}</Typography>
            <Chip label={student.state} size="small" sx={{ height: 22, fontSize: '0.7rem', fontWeight: 700, background: `${student.stateColor}15`, color: student.stateColor, border: `1px solid ${student.stateColor}30` }} />
          </Box>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: '0.7rem', textTransform: 'uppercase', color: COLORS.textMuted, fontWeight: 700, mb: 0.5 }}>Active Subjects</Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {student.subjects.map(sub => (
              <Chip key={sub} label={sub} size="small" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600, background: COLORS.bgWarm }} />
            ))}
          </Box>
        </Box>

        <Box sx={{ p: 1.5, borderRadius: '10px', background: `${COLORS.amber}07`, border: `1px solid ${COLORS.amber}20`, mb: 1.5 }}>
          <Typography sx={{ fontSize: '0.7rem', color: COLORS.amberDark, fontWeight: 800, textTransform: 'uppercase', mb: 0.3 }}>Primary Struggle</Typography>
          <Typography sx={{ fontSize: '0.85rem', color: COLORS.textPrimary, fontWeight: 500 }}>{student.struggle}</Typography>
        </Box>

        <Box sx={{ p: 1.5, borderRadius: '10px', background: `${COLORS.green}07`, border: `1px solid ${COLORS.green}20`, mb: 2, flexGrow: 1 }}>
          <Typography sx={{ fontSize: '0.7rem', color: COLORS.greenDark, fontWeight: 800, textTransform: 'uppercase', mb: 0.3 }}>Strengths</Typography>
          <Typography sx={{ fontSize: '0.85rem', color: COLORS.textPrimary, fontWeight: 500 }}>{student.strengths}</Typography>
        </Box>

        <Button fullWidth variant="contained" color="primary" onClick={() => navigate('/educator/overview?studentId=' + student.id)} sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '10px', py: 1 }}>
          Deep Dive Analysis →
        </Button>
      </CardContent>
    </Card>
  );
}

export default function E0_MyStudents() {
  return (
    <Layout role="educator" title="Grade 10 NIOS" subtitle="Track progress and guide learning outcomes">
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography sx={{ fontSize: '1.2rem' }}>👥</Typography>
        <Typography variant="overline" sx={{ color: COLORS.textSecondary, fontWeight: 700, letterSpacing: 1.2 }}>{studentCardsData.length} Learners Assigned</Typography>
      </Box>
      <Grid container spacing={3} alignItems="stretch">
        {studentCardsData.map(student => (
          <Grid item xs={12} sm={6} lg={4} key={student.id}>
            <StudentCard student={student} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
