// src/components/Layout.jsx
import React from 'react';
import { Box, Typography, Avatar, Tooltip, IconButton, Chip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { COLORS } from '../theme';

// ─── Icons ────────────────────────────────────────────────────────────────────
const IconClass = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>;
const IconDashboard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>;
const IconLearning = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18V15c0 3.31 3.13 6 7 6s7-2.69 7-6v-3.82L23 9 12 3zm0 12.5c-2.76 0-5-1.57-5-3.5V12.7L12 15l5-2.3V12c0 1.93-2.24 3.5-5 3.5z" /></svg>;
const IconSettings = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87a.48.48 0 00.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.48.48 0 00-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" /></svg>;
const IconHome = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>;
const IconMatrix = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" /></svg>;

// ─── Nav configs ──────────────────────────────────────────────────────────────
const PARENT_NAV = [
  { label: 'Overview', path: '/parent/overview', Icon: IconDashboard },
];
const EDUCATOR_NAV = [
  { label: 'My Students', path: '/educator/mystudents', Icon: IconLearning },
  { label: 'Student View', path: '/educator/overview', Icon: IconDashboard },
];
const STUDENT_NAV = [
  { label: 'My Dashboard', path: '/student/dashboard', Icon: IconLearning },
  { label: 'Subject Matrix', path: '/student/matrix', Icon: IconMatrix },
];

// ─── Role badge meta ──────────────────────────────────────────────────────────
const ROLE_META = {
  parent: { label: 'Parent View', color: COLORS.blue, bg: `${COLORS.blue}22` },
  student: { label: 'Student View', color: COLORS.greenDark, bg: `${COLORS.green}20` },
  educator: { label: 'Educator View', color: COLORS.purple, bg: `${COLORS.purple}22` },
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ navItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Box 
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      sx={{
      width: isExpanded ? 240 : 72, minHeight: '100vh',
      background: COLORS.bgNav,
      borderRight: `1px solid ${COLORS.border}`,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      px: isExpanded ? 2 : 0,
      pt: 2, pb: 3, gap: 0.5,
      position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100,
      transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      overflowX: 'hidden',
    }}>

      {/* Logo — navigates home */}
      <Tooltip title={!isExpanded ? "Home" : ""} placement="right">
        <Box onClick={() => navigate('/')} sx={{
          width: isExpanded ? '100%' : 40, height: 40, borderRadius: '10px',
          background: `linear-gradient(135deg, ${COLORS.primaryPurple} 0%, ${COLORS.purpleHover} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: isExpanded ? 'flex-start' : 'center',
          mb: 3, cursor: 'pointer',
          boxShadow: `0 4px 12px ${COLORS.primaryPurple}35`,
          transition: 'all 0.2s ease',
          px: isExpanded ? 2 : 0,
          '&:hover': { transform: isExpanded ? 'none' : 'scale(1.09)', boxShadow: `0 6px 20px ${COLORS.primaryPurple}55` },
        }}>
          <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1rem', fontFamily: "'DM Sans'" }}>N</Typography>
          {isExpanded && <Typography sx={{ color: '#fff', fontWeight: 800, ml: 1.5, fontSize: '1rem', fontFamily: "'DM Sans'", whiteSpace: 'nowrap' }}>NIOS Tracker</Typography>}
        </Box>
      </Tooltip>

      {/* Nav items */}
      {navItems.map(({ label, path, Icon }) => {
        const active = location.pathname === path;
        return (
          <Tooltip title={!isExpanded ? label : ""} placement="right" key={path}>
            <Box onClick={() => navigate(path)} sx={{
              width: isExpanded ? '100%' : 48, height: 48, borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: isExpanded ? 'flex-start' : 'center',
              color: active ? COLORS.primaryPurple : COLORS.textSecondary,
              background: active ? COLORS.purpleLight : 'transparent',
              border: active ? `1px solid ${COLORS.purpleBorder}` : '1px solid transparent',
              cursor: 'pointer',
              px: isExpanded ? 2 : 0,
              transition: 'all 0.2s ease',
              '&:hover': { background: `${COLORS.primaryPurple}10`, color: COLORS.primaryPurple },
            }}>
              <Icon />
              {isExpanded && <Typography sx={{ ml: 2, fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{label}</Typography>}
            </Box>
          </Tooltip>
        );
      })}

      <Box sx={{ flexGrow: 1 }} />

      <Tooltip title={!isExpanded ? "Settings" : ""} placement="right">
        <Box onClick={() => navigate('/settings')} sx={{
          width: isExpanded ? '100%' : 48, height: 48, borderRadius: '12px', color: COLORS.textSecondary,
          display: 'flex', alignItems: 'center', justifyContent: isExpanded ? 'flex-start' : 'center',
          cursor: 'pointer',
          px: isExpanded ? 2 : 0,
          '&:hover': { color: COLORS.primaryPurple, background: `${COLORS.primaryPurple}10` },
        }}>
          <IconSettings />
          {isExpanded && <Typography sx={{ ml: 2, fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap' }}>Settings</Typography>}
        </Box>
      </Tooltip>
    </Box>
  );
}

// ─── Top Nav ─────────────────────────────────────────────────────────────────
function TopNav({ title, subtitle, role }) {
  const navigate = useNavigate();
  const meta = ROLE_META[role] ?? ROLE_META.educator;

  return (
    <Box sx={{
      height: 64, background: COLORS.bgNav,
      position: 'fixed', top: 0, left: 72, right: 0, zIndex: 99,
      display: 'flex', alignItems: 'center', px: 3, gap: 2,
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

      {/* Role badge */}
      <Chip label={meta.label} size="small" sx={{
        background: meta.bg, color: meta.color,
        border: `1px solid ${meta.color}40`,
        fontWeight: 700, fontSize: '0.7rem', fontFamily: "'Inter'",
      }} />

      <Avatar sx={{ width: 34, height: 34, background: COLORS.textPrimary, color: COLORS.bgWarm, fontSize: '0.85rem', fontWeight: 700 }}>A</Avatar>
    </Box>
  );
}

// ─── Layout wrapper ───────────────────────────────────────────────────────────
export default function Layout({ children, role, title, subtitle }) {
  const navItems = role === 'parent' ? PARENT_NAV : role === 'student' ? STUDENT_NAV : EDUCATOR_NAV;

  return (
    <Box sx={{ background: COLORS.bgWarm, minHeight: '100vh' }}>
      <Sidebar navItems={navItems} />
      <TopNav title={title} subtitle={subtitle} role={role} />
      <Box sx={{ ml: '72px', pt: '64px', minHeight: '100vh' }}>
        <Box sx={{ p: 3, maxWidth: 1440 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
