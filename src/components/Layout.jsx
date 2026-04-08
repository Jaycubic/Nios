import React from 'react';
import { Box, Typography, Avatar, Tooltip, IconButton, Chip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { COLORS } from '../theme';

// ─── Icons (inline SVG to avoid import complexity) ───────────────────────────
const IconDashboard  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>;
const IconConsistency= () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>;
const IconLearning   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18V15c0 3.31 3.13 6 7 6s7-2.69 7-6v-3.82L23 9 12 3zm0 12.5c-2.76 0-5-1.57-5-3.5V12.7L12 15l5-2.3V12c0 1.93-2.24 3.5-5 3.5z"/></svg>;
const IconSupport    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>;
const IconDiagnosis  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>;
const IconIntervene  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const IconSettings   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87a.48.48 0 00.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.48.48 0 00-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>;
const IconPerf       = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>;

// ─── Nav config ──────────────────────────────────────────────────────────────
const PARENT_NAV = [
  { label: 'Overview',    path: '/parent/overview',     Icon: IconDashboard   },
  { label: 'Consistency', path: '/parent/consistency',  Icon: IconConsistency },
  { label: 'Learning',    path: '/parent/learning',     Icon: IconLearning    },
  { label: 'Support',     path: '/parent/support',      Icon: IconSupport     },
];

const EDUCATOR_NAV = [
  { label: 'Overview',    path: '/educator/overview',   Icon: IconDashboard  },
  { label: 'Performance', path: '/educator/performance',Icon: IconPerf       },
  { label: 'Diagnosis',   path: '/educator/diagnosis',  Icon: IconDiagnosis  },
  { label: 'Gaps',        path: '/educator/gaps',       Icon: IconLearning   },
  { label: 'Intervene',   path: '/educator/intervene',  Icon: IconIntervene  },
];

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ navItems, role }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{
      width: 72,
      minHeight: '100vh',
      background: COLORS.bgNav,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pt: 2,
      pb: 3,
      gap: 0.5,
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <Box sx={{
        width: 40, height: 40,
        background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.greenDark} 100%)`,
        borderRadius: '10px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        mb: 3,
      }}>
        <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1rem', fontFamily: "'DM Sans'" }}>N</Typography>
      </Box>

      {navItems.map(({ label, path, Icon }) => {
        const active = location.pathname === path;
        return (
          <Tooltip title={label} placement="right" key={path}>
            <IconButton
              onClick={() => navigate(path)}
              sx={{
                width: 48, height: 48,
                borderRadius: '12px',
                color: active ? COLORS.greenDark : COLORS.textSecondary,
                background: active ? `${COLORS.green}30` : 'transparent',
                border: active ? `1px solid ${COLORS.green}60` : '1px solid transparent',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: `${COLORS.green}20`,
                  color: COLORS.greenDark,
                },
              }}
            >
              <Icon />
            </IconButton>
          </Tooltip>
        );
      })}

      <Box sx={{ flexGrow: 1 }} />

      <Tooltip title="Settings" placement="right">
        <IconButton sx={{
          width: 48, height: 48, borderRadius: '12px',
          color: COLORS.textSecondary,
          '&:hover': { color: COLORS.textPrimary, background: COLORS.divider },
        }}>
          <IconSettings />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

// ─── Top Nav ─────────────────────────────────────────────────────────────────
function TopNav({ title, subtitle, role, onSwitch }) {
  return (
    <Box sx={{
      height: 64,
      background: COLORS.bgNav,
      position: 'fixed',
      top: 0,
      left: 72,
      right: 0,
      zIndex: 99,
      display: 'flex',
      alignItems: 'center',
      px: 3,
      gap: 2,
      borderBottom: `1px solid ${COLORS.border}`,
    }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography sx={{ color: COLORS.textPrimary, fontWeight: 600, fontSize: '0.95rem', fontFamily: "'DM Sans'" }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography sx={{ color: COLORS.textSecondary, fontSize: '0.75rem', fontFamily: "'Inter'" }}>
            {subtitle}
          </Typography>
        )}
      </Box>

      <Chip
        label={role === 'parent' ? 'Parent View' : 'Educator View'}
        size="small"
        sx={{
          background: role === 'parent' ? `${COLORS.blue}25` : `${COLORS.purple}25`,
          color:      role === 'parent' ? COLORS.blue         : COLORS.purple,
          border:     `1px solid ${role === 'parent' ? COLORS.blue : COLORS.purple}40`,
          fontWeight: 600,
          fontSize:   '0.7rem',
          fontFamily: "'Inter'",
        }}
      />

      <Chip
        label={role === 'parent' ? 'Switch to Educator →' : 'Switch to Parent →'}
        size="small"
        onClick={onSwitch}
        clickable
        sx={{
          background: 'transparent',
          color: COLORS.textSecondary,
          border: `1px solid ${COLORS.border}`,
          fontSize: '0.7rem',
          fontFamily: "'Inter'",
          cursor: 'pointer',
          '&:hover': { background: COLORS.divider, color: COLORS.textPrimary },
        }}
      />

      <Avatar sx={{ width: 34, height: 34, background: COLORS.textPrimary, color: COLORS.bgWarm, fontSize: '0.85rem', fontWeight: 700 }}>A</Avatar>
    </Box>
  );
}

// ─── Layout wrapper ───────────────────────────────────────────────────────────
export default function Layout({ children, role, title, subtitle }) {
  const navigate = useNavigate();
  const navItems = role === 'parent' ? PARENT_NAV : EDUCATOR_NAV;

  const handleSwitch = () => {
    if (role === 'parent') navigate('/educator/overview');
    else navigate('/parent/overview');
  };

  return (
    <Box sx={{ background: COLORS.bgWarm, minHeight: '100vh' }}>
      <Sidebar navItems={navItems} role={role} />
      <TopNav title={title} subtitle={subtitle} role={role} onSwitch={handleSwitch} />
      <Box sx={{ ml: '72px', pt: '64px', minHeight: '100vh' }}>
        <Box sx={{ p: 3, maxWidth: 1440 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
