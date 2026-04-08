import React from 'react';
import { Box, Typography, Card, CardContent, Chip, LinearProgress, Grid, Divider } from '@mui/material';
import Layout from '../../components/Layout';
import { COLORS } from '../../theme';

function IAHeader() {
  return (
    <Box sx={{
      mb: 3, p: '14px 20px', borderRadius: '14px',
      background: `linear-gradient(135deg, ${COLORS.bgNav} 0%, #3a3650 100%)`,
      display: 'flex', alignItems: 'center', gap: 2.5, flexWrap: 'wrap',
    }}>
      <Box sx={{ flexShrink: 0, minWidth: 160 }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'Inter'", mb: 0.4 }}>
          Parent IA · Screen 2 of 4
        </Typography>
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', fontFamily: "'DM Sans'", lineHeight: 1.3 }}>
          2. Effort & Consistency
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', fontFamily: "'Inter'", mt: 0.3 }}>
          Behavioral patterns — not performance
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', flexGrow: 1 }}>
        {[
          { icon: '🔥', text: 'Study streaks' },
          { icon: '📝', text: 'Number of attempts' },
          { icon: '📅', text: 'Regularity of study sessions' },
          { icon: '⏱️', text: 'Time spent learning' },
        ].map(({ icon, text }) => (
          <Box key={text} sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Typography sx={{ fontSize: '0.82rem' }}>{icon}</Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.73rem', fontFamily: "'Inter'" }}>{text}</Typography>
          </Box>
        ))}
      </Box>
      <Chip label="Supporters, not analysts" size="small"
        sx={{ background: `${COLORS.yellow}20`, color: COLORS.yellow, border: `1px solid ${COLORS.yellow}38`, fontSize: '0.67rem', fontWeight: 600, height: 24 }} />
    </Box>
  );
}

// ─── GitHub-style study calendar ─────────────────────────────────────────────
function StudyCalendar() {
  const weeksCount = 26;
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
  data.forEach(row => row.forEach(d => { if (d) activeDays++; }));

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1.5 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.5, sm: 0.6 }, mt: 0.5 }}>
          {daysLabel.map((d, i) => (
            <Typography key={i} sx={{ width: 16, height: { xs: 20, sm: 22 }, lineHeight: { xs: '20px', sm: '22px' }, textAlign: 'center', color: COLORS.textMuted, fontWeight: 600, fontSize: '0.63rem', fontFamily: "'Inter'" }}>
              {d}
            </Typography>
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: { xs: 0.4, sm: 0.6 }, overflowX: 'auto', pb: 1, flexGrow: 1 }}>
          {Array.from({ length: weeksCount }).map((_, wi) => (
            <Box key={wi} sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.4, sm: 0.6 } }}>
              {Array.from({ length: 7 }).map((_, di) => {
                const studied = data[di][wi];
                return (
                  <Box key={`${wi}-${di}`} sx={{
                    width: { xs: 18, sm: 22 }, height: { xs: 18, sm: 22 },
                    borderRadius: '4px',
                    background: studied ? `linear-gradient(135deg, ${COLORS.green}cc, ${COLORS.greenDark})` : COLORS.divider,
                    border: studied ? `1px solid ${COLORS.green}38` : `1px solid ${COLORS.border}`,
                    transition: 'transform 0.15s',
                    '&:hover': { transform: 'scale(1.2)' },
                  }} />
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
          <Box sx={{ width: 11, height: 11, borderRadius: '3px', background: COLORS.green }} />
          <Typography sx={{ fontSize: '0.7rem', color: COLORS.textMuted, fontFamily: "'Inter'" }}>Studied</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
          <Box sx={{ width: 11, height: 11, borderRadius: '3px', background: COLORS.divider }} />
          <Typography sx={{ fontSize: '0.7rem', color: COLORS.textMuted, fontFamily: "'Inter'" }}>Missed</Typography>
        </Box>
        <Typography sx={{ fontSize: '0.7rem', color: COLORS.textMuted, fontFamily: "'Inter'", ml: 'auto' }}>
          {activeDays}/{weeksCount * 7} days active
        </Typography>
      </Box>
    </Box>
  );
}

function TimeRing({ hours, label, color, total = 7 }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(hours / total, 1);
  const offset = circ - pct * circ;
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="84" height="84" viewBox="0 0 84 84">
          <circle cx="42" cy="42" r={r} fill="none" stroke={`${color}18`} strokeWidth="8" />
          <circle cx="42" cy="42" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset} transform="rotate(-90 42 42)"
            style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
        </svg>
        <Box sx={{ position: 'absolute', textAlign: 'center' }}>
          <Typography sx={{ fontWeight: 800, fontSize: '1rem', color, lineHeight: 1, fontFamily: "'DM Sans'" }}>{hours}h</Typography>
        </Box>
      </Box>
      <Typography sx={{ display: 'block', mt: 0.5, fontSize: '0.68rem', color: COLORS.textMuted, fontWeight: 500, fontFamily: "'Inter'" }}>{label}</Typography>
    </Box>
  );
}

function ConsistencyStat({ icon, label, value, sub, color }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8, py: 1.4, borderBottom: `1px solid ${COLORS.divider}` }}>
      <Box sx={{ width: 38, height: 38, borderRadius: '10px', background: `${color}16`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
        {icon}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontSize: '0.83rem', fontWeight: 500, color: COLORS.textPrimary, fontFamily: "'Inter'" }}>{label}</Typography>
        {sub && <Typography sx={{ fontSize: '0.7rem', color: COLORS.textMuted, fontFamily: "'Inter'" }}>{sub}</Typography>}
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color, fontFamily: "'DM Sans'", flexShrink: 0 }}>{value}</Typography>
    </Box>
  );
}

export default function P2_EffortConsistency() {
  return (
    <Layout role="parent" title="Aarav's Effort & Consistency" subtitle="Focus on behavior, not just performance">
      <IAHeader />
      <Grid container spacing={2.5}>

        {/* Streak hero */}
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ p: '22px !important' }}>
              <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.textMuted, fontFamily: "'Inter'", mb: 1.8, display: 'block' }}>
                Current Streak
              </Typography>

              <Box sx={{ textAlign: 'center', py: 3, background: `linear-gradient(135deg, ${COLORS.yellow}10, ${COLORS.amber}07)`, borderRadius: '12px', border: `1px solid ${COLORS.yellow}22`, mb: 2.5 }}>
                <Typography sx={{ fontSize: '2.8rem', lineHeight: 1 }}>🔥</Typography>
                <Typography sx={{ fontSize: '3.5rem', fontWeight: 900, color: COLORS.yellow, fontFamily: "'DM Sans'", letterSpacing: '-0.04em', lineHeight: 1.05 }}>12</Typography>
                <Typography sx={{ color: COLORS.textSecondary, fontWeight: 500, fontSize: '0.85rem', mt: 0.5, fontFamily: "'Inter'" }}>day streak</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0, alignItems: 'stretch' }}>
                {[
                  { label: 'active days', value: '25', color: COLORS.green },
                  { label: 'consistency', value: '71%', color: COLORS.blue },
                  { label: 'best streak', value: '18d', color: COLORS.purple },
                ].map((item, i) => (
                  <React.Fragment key={item.label}>
                    {i > 0 && <Divider orientation="vertical" flexItem sx={{ mx: 1.2 }} />}
                    <Box sx={{ textAlign: 'center', flex: 1 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: item.color, fontFamily: "'DM Sans'", lineHeight: 1 }}>{item.value}</Typography>
                      <Typography sx={{ fontSize: '0.67rem', color: COLORS.textMuted, fontFamily: "'Inter'", mt: 0.3 }}>{item.label}</Typography>
                    </Box>
                  </React.Fragment>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Calendar */}
        <Grid item xs={12} md={8}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ p: '22px !important' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.textMuted, fontFamily: "'Inter'" }}>
                  Study Calendar — Past 6 Months
                </Typography>
                <Chip label="Nov 2025 – Apr 2026" size="small" sx={{ background: COLORS.divider, color: COLORS.textSecondary, fontSize: '0.68rem', height: 22 }} />
              </Box>
              <StudyCalendar />
            </CardContent>
          </Card>
        </Grid>

        {/* Time rings + goal */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, height: '100%' }}>
            <Card elevation={0} sx={{ flexGrow: 1 }}>
              <CardContent sx={{ p: '20px 22px !important' }}>
                <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.textMuted, fontFamily: "'Inter'", mb: 2, display: 'block' }}>
                  Time Invested
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 0.5 }}>
                  <TimeRing hours={3.5} label="This week" color={COLORS.green} total={7} />
                  <TimeRing hours={14} label="This month" color={COLORS.blue} total={30} />
                  <TimeRing hours={48} label="Total" color={COLORS.purple} total={100} />
                </Box>
              </CardContent>
            </Card>
            <Card elevation={0}>
              <CardContent sx={{ p: '16px 22px !important' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap', fontFamily: "'Inter'", color: COLORS.textPrimary }}>Weekly goal: 5h</Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <LinearProgress variant="determinate" value={70} sx={{ height: 10, borderRadius: 8, background: `${COLORS.green}12`, '& .MuiLinearProgress-bar': { background: `linear-gradient(90deg, ${COLORS.green}99, ${COLORS.green})` } }} />
                  </Box>
                  <Typography sx={{ fontWeight: 800, fontSize: '0.88rem', color: COLORS.green, fontFamily: "'DM Sans'", whiteSpace: 'nowrap' }}>3.5 / 5h</Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Weekly stats */}
        <Grid item xs={12} md={7}>
          <Card elevation={0} sx={{ height: '100%' }}>
            <CardContent sx={{ p: '20px 22px !important' }}>
              <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.textMuted, fontFamily: "'Inter'", mb: 0.5, display: 'block' }}>
                This Week's Activity
              </Typography>
              <ConsistencyStat icon="📝" label="Questions attempted" value="14" sub="+4 from last week" color={COLORS.blue} />
              <ConsistencyStat icon="⏱️" label="Avg session length" value="28 min" sub="recommended: 30 min" color={COLORS.green} />
              <ConsistencyStat icon="🎯" label="Completion rate" value="82%" sub="7 of 8 tasks done" color={COLORS.yellow} />
              <ConsistencyStat icon="📅" label="Days studied" value="5 / 7" sub="missed Sat & Sun" color={COLORS.purple} />
              <Box sx={{ mt: 2, p: '12px 16px', background: `${COLORS.green}07`, border: `1px solid ${COLORS.green}18`, borderRadius: '10px' }}>
                <Typography sx={{ fontSize: '0.83rem', color: COLORS.textPrimary, lineHeight: 1.65, fontFamily: "'Inter'" }}>
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