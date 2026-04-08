import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Grid, Divider } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── Bloom's taxonomy ladder ──────────────────────────────────────────────────
const bloomLevels = [
  { label: 'Remember',  color: COLORS.textMuted,  active: true  },
  { label: 'Understand',color: COLORS.blue,        active: true  },
  { label: 'Apply',     color: COLORS.green,       active: true  },
  { label: 'Analyse',   color: COLORS.yellow,      active: false },
  { label: 'Evaluate',  color: COLORS.purple,      active: false },
  { label: 'Create',    color: COLORS.amber,       active: false },
];

function BloomLadder({ current = 'Apply' }) {
  return (
    <Box>
      <Typography variant="overline" sx={{ display: 'block', mb: 1.5 }}>Bloom's Taxonomy Level</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column-reverse', gap: 0.6 }}>
        {bloomLevels.map((level, i) => {
          const isCurrent = level.label === current;
          return (
            <Box key={i} sx={{
              display: 'flex', alignItems: 'center', gap: 1.5,
              p: '7px 12px',
              borderRadius: '8px',
              background: level.active ? `${level.color}14` : 'transparent',
              border: `1px solid ${level.active ? level.color + '35' : COLORS.border}`,
              opacity: level.active ? 1 : 0.4,
              position: 'relative',
              transition: 'all 0.2s',
            }}>
              <Box sx={{
                width: 10, height: 10, borderRadius: '50%',
                background: level.active ? level.color : COLORS.border,
                flexShrink: 0,
                boxShadow: isCurrent ? `0 0 0 3px ${level.color}30` : 'none',
              }} />
              <Typography sx={{
                fontSize: '0.8rem',
                fontWeight: isCurrent ? 700 : 500,
                color: level.active ? COLORS.textPrimary : COLORS.textMuted,
                fontFamily: "'Inter'",
              }}>{level.label}</Typography>
              {isCurrent && (
                <Chip
                  label="Current"
                  size="small"
                  sx={{
                    ml: 'auto', height: 20, fontSize: '0.65rem',
                    background: `${level.color}20`, color: level.color,
                    fontWeight: 700, '& .MuiChip-label': { px: 1 },
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

// ─── Sparkline ────────────────────────────────────────────────────────────────
function Sparkline({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const h = 60, w = 240;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min + 1)) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <Box>
      <svg width={w} height={h + 10} viewBox={`0 0 ${w} ${h + 10}`}>
        <polyline
          points={pts}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((v, i) => {
          const x = (i / (data.length - 1)) * w;
          const y = h - ((v - min) / (max - min + 1)) * h;
          return <circle key={i} cx={x} cy={y} r={i === data.length - 1 ? 5 : 3} fill={color} />;
        })}
      </svg>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
        {['Wk1','Wk2','Wk3','Wk4','Wk5','Wk6','Wk7','Wk8'].map(w => (
          <Typography key={w} variant="caption" sx={{ color: COLORS.textMuted, fontSize: '0.65rem' }}>{w}</Typography>
        ))}
      </Box>
    </Box>
  );
}

// ─── Quick KPI box ────────────────────────────────────────────────────────────
function KPI({ label, value, color, sub }) {
  return (
    <Box sx={{
      p: 2, borderRadius: '12px',
      background: `${color}10`,
      border: `1px solid ${color}28`,
      textAlign: 'center',
    }}>
      <Typography sx={{ fontWeight: 800, fontSize: '1.6rem', color, fontFamily: "'DM Sans'", lineHeight: 1 }}>{value}</Typography>
      <Typography sx={{ fontWeight: 500, fontSize: '0.75rem', color: COLORS.textSecondary, mt: 0.5 }}>{label}</Typography>
      {sub && <Typography variant="caption" sx={{ color: COLORS.textMuted }}>{sub}</Typography>}
    </Box>
  );
}

export default function E1_StudentOverview() {
  const sparkData = [55, 58, 53, 61, 59, 64, 67, 68];

  return (
    <Layout
      role="educator"
      title="Student: Aarav Mehta"
      subtitle="Grade 10 · Roll No. 2024NIOS1047 · Joined Jan 2024"
    >
      <Grid container spacing={2.5}>

        {/* ── Accuracy hero ── */}
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="overline">Overall Accuracy</Typography>
                <Chip label="Developing" size="small" sx={{ background: `${COLORS.yellow}18`, color: COLORS.yellowDark, fontWeight: 700, fontSize: '0.7rem', border: `1px solid ${COLORS.yellow}35` }} />
              </Box>

              <Box sx={{ textAlign: 'center', py: 2 }}>
                {/* Big accuracy ring */}
                <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <svg width="130" height="130" viewBox="0 0 130 130">
                    <circle cx="65" cy="65" r="52" fill="none" stroke={`${COLORS.green}18`} strokeWidth="12" />
                    <circle
                      cx="65" cy="65" r="52" fill="none"
                      stroke={COLORS.green} strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 52}`}
                      strokeDashoffset={`${2 * Math.PI * 52 * (1 - 0.68)}`}
                      transform="rotate(-90 65 65)"
                    />
                  </svg>
                  <Box sx={{ position: 'absolute', textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 900, fontSize: '2rem', color: COLORS.green, fontFamily: "'DM Sans'", lineHeight: 1 }}>68%</Typography>
                    <Typography variant="caption" sx={{ color: COLORS.textMuted }}>accuracy</Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>Questions attempted</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>146</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>Correct answers</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: COLORS.green }}>99</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>Incorrect</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: COLORS.amber }}>47</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: COLORS.textSecondary }}>Avg time/question</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>2m 18s</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Bloom's + trend ── */}
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <BloomLadder current="Apply" />
            </CardContent>
          </Card>
        </Grid>

        {/* ── KPIs + sparkline ── */}
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>8-Week Performance Trend</Typography>
              <Sparkline data={sparkData} color={COLORS.blue} />

              <Divider sx={{ my: 2.5 }} />

              <Grid container spacing={1.5}>
                <Grid item xs={6}><KPI label="Study Streak"  value="12d"  color={COLORS.yellow} /></Grid>
                <Grid item xs={6}><KPI label="Completion"    value="82%"  color={COLORS.green}  /></Grid>
                <Grid item xs={6}><KPI label="Concepts Done" value="38"   color={COLORS.blue}   /></Grid>
                <Grid item xs={6}><KPI label="Gaps Found"    value="6"    color={COLORS.amber}  /></Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Alert bar ── */}
        <Grid item xs={12}>
          <Card elevation={0} sx={{ background: `${COLORS.amber}10`, border: `1px solid ${COLORS.amber}28` }}>
            <CardContent sx={{ py: '14px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ fontSize: '1.2rem' }}>⚠️</Typography>
                <Typography variant="body2" sx={{ color: COLORS.textPrimary }}>
                  <strong>Intervention suggested:</strong> Aarav has attempted Polynomial questions 5 times with &lt;40% accuracy. A concept-level gap likely exists. See Diagnosis tab for root cause.
                </Typography>
                <Chip label="View Diagnosis →" size="small" clickable sx={{ ml: 'auto', background: `${COLORS.amber}20`, color: COLORS.amberDark, fontWeight: 600, fontSize: '0.72rem', border: `1px solid ${COLORS.amber}40`, whiteSpace: 'nowrap' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
}
