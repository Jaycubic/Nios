// src/screens/parent/P2_EffortConsistency.jsx
import React from 'react';
import { Box, Typography, Card, CardContent, Chip, LinearProgress, Grid, Divider } from '@mui/material'; import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

// ─── GitHub-style study calendar ─────────────────────────────────────────────
function StudyCalendar() {
  const weeksCount = 26; // ~6 months
  // Deterministic pseudo-random data to prevent layout shift on re-renders while looking realistic
  const data = React.useMemo(() => {
    const arr = [];
    for (let day = 0; day < 7; day++) {
      const row = [];
      for (let week = 0; week < weeksCount; week++) {
        const n = Math.sin(day * 13 + week * 17) * 10000;
        const rand = n - Math.floor(n);
        const prob = (day === 5 || day === 6) ? 0.4 : 0.75;
        row.push(rand < prob);
      }
      arr.push(row);
    }
    return arr;
  }, []);

  const daysLabel = ['M', '', 'W', '', 'F', '', 'S']; 

  let activeDays = 0;
  const totalDays = weeksCount * 7;
  data.forEach(row => row.forEach(d => { if(d) activeDays++; }));

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1.5 } }}>
        {/* Y-axis labels */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, sm: 0.75 }, mt: 0.5 }}>
          {daysLabel.map((d, i) => (
            <Typography key={i} variant="caption" sx={{
              width: 16, height: { xs: 20, sm: 24 }, lineHeight: { xs: '20px', sm: '24px' }, textAlign: 'center', 
              color: COLORS.textMuted, fontWeight: 600, fontSize: '0.65rem'
            }}>
              {d}
            </Typography>
          ))}
        </Box>
        
        {/* Grid */}
        <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 0.75 }, overflowX: 'auto', pb: 1, flexGrow: 1, justifyContent: 'space-between' }}>
          {Array.from({ length: weeksCount }).map((_, wi) => (
            <Box key={wi} sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, sm: 0.75 } }}>
              {Array.from({ length: 7 }).map((_, di) => {
                const studied = data[di][wi];
                return (
                  <Box key={`${wi}-${di}`} sx={{
                    width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 },
                    borderRadius: '4px',
                    background: studied
                      ? `linear-gradient(135deg, ${COLORS.green}cc, ${COLORS.greenDark})`
                      : COLORS.divider,
                    border: studied ? `1px solid ${COLORS.green}40` : `1px solid ${COLORS.border}`,
                    transition: 'transform 0.15s',
                    cursor: 'default',
                    '&:hover': { transform: 'scale(1.15)' },
                  }} />
                )
              })}
            </Box>
          ))}
        </Box>
      </Box>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '3px', background: COLORS.green }} />
          <Typography variant="caption" sx={{ color: COLORS.textMuted }}>Studied</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '3px', background: COLORS.divider }} />
          <Typography variant="caption" sx={{ color: COLORS.textMuted }}>Missed</Typography>
        </Box>
        <Typography variant="caption" sx={{ color: COLORS.textMuted, ml: 'auto' }}>
          {activeDays}/{totalDays} days active
        </Typography>
      </Box>
    </Box>
  );
}

// ─── Time ring (simple visual) ────────────────────────────────────────────────
function TimeRing({ hours, label, color, total = 7 }) {
  const pct = (hours / total) * 100;
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={r} fill="none" stroke={`${color}20`} strokeWidth="8" />
          <circle
            cx="44" cy="44" r={r} fill="none"
            stroke={color} strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            transform="rotate(-90 44 44)"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }}
          />
        </svg>
        <Box sx={{ position: 'absolute', textAlign: 'center' }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1.1rem', color, lineHeight: 1, fontFamily: "'DM Sans'" }}>{hours}h</Typography>
        </Box>
      </Box>
      <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: COLORS.textMuted, fontWeight: 500 }}>{label}</Typography>
    </Box>
  );
}

// ─── Stat row ─────────────────────────────────────────────────────────────────
function ConsistencyStat({ icon, label, value, sub, color }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, borderBottom: `1px solid ${COLORS.divider}` }}>
      <Box sx={{
        width: 40, height: 40, borderRadius: '10px',
        background: `${color}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.2rem', flexShrink: 0,
      }}>{icon}</Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, color: COLORS.textPrimary }}>{label}</Typography>
        {sub && <Typography variant="caption" sx={{ color: COLORS.textMuted }}>{sub}</Typography>}
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: '1rem', color, fontFamily: "'DM Sans'" }}>{value}</Typography>
    </Box>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────
export default function P2_EffortConsistency() {
  return (
    <Layout
      role="parent"
      title="Aarav's Effort & Consistency"
      subtitle="Focus on behavior, not just performance"
    >
      <Grid container spacing={2.5}>

        {/* ── Streak hero ── */}
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>Current Streak</Typography>

              <Box sx={{
                textAlign: 'center',
                py: 3,
                background: `linear-gradient(135deg, ${COLORS.yellow}12, ${COLORS.amber}08)`,
                borderRadius: '12px',
                border: `1px solid ${COLORS.yellow}25`,
                mb: 3,
              }}>
                <Typography sx={{ fontSize: '3rem', lineHeight: 1 }}>🔥</Typography>
                <Typography sx={{
                  fontSize: '3.5rem', fontWeight: 800, color: COLORS.yellow,
                  fontFamily: "'DM Sans'", letterSpacing: '-0.03em', lineHeight: 1.1,
                }}>12</Typography>
                <Typography sx={{ color: COLORS.textSecondary, fontWeight: 500, fontSize: '0.9rem', mt: 0.5 }}>
                  day streak
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontWeight: 700, color: COLORS.green, fontSize: '1.1rem', fontFamily: "'DM Sans'" }}>25</Typography>
                  <Typography variant="caption" sx={{ color: COLORS.textMuted }}>active days</Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontWeight: 700, color: COLORS.blue, fontSize: '1.1rem', fontFamily: "'DM Sans'" }}>71%</Typography>
                  <Typography variant="caption" sx={{ color: COLORS.textMuted }}>consistency</Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontWeight: 700, color: COLORS.purple, fontSize: '1.1rem', fontFamily: "'DM Sans'" }}>🏆</Typography>
                  <Typography variant="caption" sx={{ color: COLORS.textMuted }}>best: 18d</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Study calendar ── */}
        <Grid item xs={12} md={8}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
                <Typography variant="overline">Study Calendar — Past 6 Months</Typography>
                <Chip label="Nov - Apr 2026" size="small" sx={{ background: COLORS.divider, color: COLORS.textSecondary, fontSize: '0.7rem' }} />
              </Box>
              <StudyCalendar />
            </CardContent>
          </Card>
        </Grid>

        {/* ── Left Column: Time Invested + Weekly Goal ── */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, height: '100%' }}>
            
            {/* ── Time spent rings ── */}
            <Card elevation={0} sx={{ flexGrow: 1 }}>
              <CardContent>
                <Typography variant="overline" sx={{ display: 'block', mb: 2 }}>Time Invested</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 1 }}>
                  <TimeRing hours={3.5} label="This week" color={COLORS.green} total={7} />
                  <TimeRing hours={14} label="This month" color={COLORS.blue} total={30} />
                  <TimeRing hours={48} label="Total" color={COLORS.purple} total={100} />
                </Box>
              </CardContent>
            </Card>

            {/* ── Weekly goal bar ── */}
            <Card elevation={0}>
              <CardContent sx={{ py: '16px !important' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap', minWidth: 100 }}>
                    Weekly goal: 5h
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={70}
                      sx={{
                        height: 12,
                        borderRadius: 8,
                        background: `${COLORS.green}15`,
                        '& .MuiLinearProgress-bar': {
                          background: `linear-gradient(90deg, ${COLORS.green}aa, ${COLORS.green})`,
                        },
                      }}
                    />
                  </Box>
                  <Typography sx={{ fontWeight: 700, color: COLORS.green, fontFamily: "'DM Sans'", whiteSpace: 'nowrap' }}>
                    3.5h / 5h
                  </Typography>
                </Box>
              </CardContent>
            </Card>

          </Box>
        </Grid>

        {/* ── Right Column: Detailed stats ── */}
        <Grid item xs={12} md={7}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="overline" sx={{ display: 'block', mb: 1 }}>This Week's Activity</Typography>
              <ConsistencyStat icon="📝" label="Questions attempted" value="14" sub="+4 from last week" color={COLORS.blue} />
              <ConsistencyStat icon="⏱️" label="Avg session length" value="28 min" sub="recommended: 30 min" color={COLORS.green} />
              <ConsistencyStat icon="🎯" label="Completion rate" value="82%" sub="7 of 8 tasks done" color={COLORS.yellow} />
              <ConsistencyStat icon="📅" label="Days studied" value="5/7" sub="missed Sat & Sun" color={COLORS.purple} />

              <Box sx={{
                mt: 2.5,
                p: 2,
                background: `${COLORS.green}08`,
                border: `1px solid ${COLORS.green}20`,
                borderRadius: '10px',
              }}>
                <Typography variant="body2" sx={{ color: COLORS.textPrimary, lineHeight: 1.6 }}>
                  ✅ <strong>Consistent effort!</strong> Aarav has been studying almost every weekday. Encourage him to include weekends for even better results.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Layout>
  );
}


