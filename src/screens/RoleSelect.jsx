// src/screens/RoleSelect.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { COLORS } from '../theme';

const roles = [
  {
    id: 'student',
    emoji: '🎒',
    title: 'Student',
    subtitle: 'Track your progress, goals\n& learning path',
    path: '/student/dashboard',
    color: COLORS.green,
    colorDark: COLORS.greenDark,
    bg: `linear-gradient(145deg, ${COLORS.green}18 0%, ${COLORS.green}06 100%)`,
    border: COLORS.green,
    delay: 0,
  },
  {
    id: 'parent',
    emoji: '👨‍👩‍👦',
    title: 'Parent',
    subtitle: "Monitor your child's journey\n& support areas",
    path: '/parent/overview',
    color: COLORS.blue,
    colorDark: COLORS.blueDark,
    bg: `linear-gradient(145deg, ${COLORS.blue}18 0%, ${COLORS.blue}06 100%)`,
    border: COLORS.blue,
    delay: 120,
  },
  {
    id: 'educator',
    emoji: '🏫',
    title: 'Educator',
    subtitle: 'View class insights, diagnose\n& guide students',
    path: '/educator/class',
    color: COLORS.purple,
    colorDark: COLORS.purpleDark,
    bg: `linear-gradient(145deg, ${COLORS.purple}18 0%, ${COLORS.purple}06 100%)`,
    border: COLORS.purple,
    delay: 240,
  },
];

// Floating particle component
function Particle({ style }) {
  return (
    <Box sx={{
      position: 'absolute',
      borderRadius: '50%',
      opacity: 0.18,
      animation: 'floatUp 6s ease-in-out infinite',
      ...style,
    }} />
  );
}

export default function RoleSelect() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    // Stagger: title first then cards
    const t1 = setTimeout(() => setTitleVisible(true), 100);
    const t2 = setTimeout(() => setVisible(true), 350);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleSelect = (role) => {
    setSelected(role.id);
    setTimeout(() => navigate(role.path), 480);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: `radial-gradient(ellipse at 20% 50%, ${COLORS.green}0A 0%, transparent 60%),
                   radial-gradient(ellipse at 80% 20%, ${COLORS.blue}0A 0%, transparent 55%),
                   radial-gradient(ellipse at 60% 80%, ${COLORS.purple}08 0%, transparent 50%),
                   ${COLORS.bgWarm}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      px: 3,
    }}>

      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.12; }
          50%       { transform: translateY(-22px) scale(1.05); opacity: 0.22; }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>

      {/* ── Decorative background particles ── */}
      <Particle style={{ width: 180, height: 180, background: COLORS.green, top: '8%',  left: '5%',  animationDelay: '0s',    animationDuration: '7s'  }} />
      <Particle style={{ width: 120, height: 120, background: COLORS.blue,  top: '15%', right: '8%', animationDelay: '1.5s',  animationDuration: '5.5s'}} />
      <Particle style={{ width: 90,  height: 90,  background: COLORS.purple,bottom:'18%',left: '12%', animationDelay: '3s',    animationDuration: '8s'  }} />
      <Particle style={{ width: 60,  height: 60,  background: COLORS.yellow,bottom:'25%',right:'15%', animationDelay: '0.8s',  animationDuration: '6s'  }} />
      <Particle style={{ width: 50,  height: 50,  background: COLORS.amber, top: '55%', left: '48%', animationDelay: '2.2s',  animationDuration: '9s'  }} />

      {/* ── Logo mark ── */}
      <Box sx={{
        width: 52, height: 52, borderRadius: '14px', mb: 4,
        background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.greenDark} 100%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 8px 24px ${COLORS.green}40`,
        opacity: titleVisible ? 1 : 0,
        transform: titleVisible ? 'translateY(0) scale(1)' : 'translateY(-16px) scale(0.9)',
        transition: 'all 0.55s cubic-bezier(.34,1.56,.64,1)',
      }}>
        <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem', fontFamily: "'DM Sans'" }}>N</Typography>
      </Box>

      {/* ── Heading ── */}
      <Box sx={{
        textAlign: 'center', mb: 1,
        opacity: titleVisible ? 1 : 0,
        transform: titleVisible ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'all 0.55s ease 0.1s',
      }}>
        <Typography sx={{
          fontWeight: 800, fontSize: { xs: '1.9rem', sm: '2.4rem' },
          fontFamily: "'DM Sans'", color: COLORS.textPrimary,
          lineHeight: 1.15, mb: 1,
          background: `linear-gradient(135deg, ${COLORS.textPrimary} 0%, ${COLORS.textSecondary} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Who are you?
        </Typography>
        <Typography sx={{
          fontSize: '1rem', color: COLORS.textSecondary,
          fontWeight: 500, fontFamily: "'Inter'",
        }}>
          Choose your role to get started
        </Typography>
      </Box>

      {/* ── Animated dots ── */}
      <Box sx={{
        display: 'flex', gap: 0.8, mb: 5, mt: 1,
        opacity: titleVisible ? 1 : 0,
        transition: 'opacity 0.4s ease 0.3s',
      }}>
        {[COLORS.green, COLORS.blue, COLORS.purple].map((c, i) => (
          <Box key={i} sx={{
            width: 7, height: 7, borderRadius: '50%', background: c,
            animation: 'bounce 1.4s ease-in-out infinite',
            animationDelay: `${i * 0.18}s`,
          }} />
        ))}
      </Box>

      {/* ── Role Cards ── */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2.5, sm: 3 },
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 880,
      }}>
        {roles.map((role) => {
          const isHovered = hovered === role.id;
          const isSelected = selected === role.id;
          const isOtherSelected = selected && selected !== role.id;

          return (
            <Box
              key={role.id}
              onClick={() => handleSelect(role)}
              onMouseEnter={() => setHovered(role.id)}
              onMouseLeave={() => setHovered(null)}
              sx={{
                flex: 1,
                minWidth: { xs: '100%', sm: 220 },
                maxWidth: { sm: 270 },
                cursor: 'pointer',
                borderRadius: '20px',
                border: `2px solid ${isHovered || isSelected ? role.border + 'C0' : COLORS.border}`,
                background: isHovered || isSelected ? role.bg : '#ffffff',
                padding: '32px 28px 28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: isHovered || isSelected
                  ? `0 16px 48px ${role.color}25, 0 4px 12px ${role.color}18`
                  : '0 2px 12px rgba(45,42,56,0.06)',
                // entrance animation
                opacity: visible ? (isOtherSelected ? 0.35 : 1) : 0,
                transform: visible
                  ? isSelected ? 'translateY(-6px) scale(1.03)' : isHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)'
                  : 'translateY(32px) scale(0.95)',
                transition: `
                  opacity    0.55s ease ${role.delay}ms,
                  transform  0.55s cubic-bezier(.34,1.3,.64,1) ${role.delay}ms,
                  box-shadow 0.25s ease,
                  border     0.25s ease,
                  background 0.25s ease
                `,
                userSelect: 'none',
              }}
            >
              {/* Pulse ring on hover */}
              {isHovered && (
                <Box sx={{
                  position: 'absolute', top: '50%', left: '50%',
                  width: 80, height: 80,
                  transform: 'translate(-50%, -50%)',
                  borderRadius: '50%',
                  border: `2px solid ${role.color}60`,
                  animation: 'pulseRing 1.2s ease-out infinite',
                  pointerEvents: 'none',
                }} />
              )}

              {/* Top accent line */}
              <Box sx={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                borderRadius: '20px 20px 0 0',
                background: `linear-gradient(90deg, ${role.color}, ${role.colorDark})`,
                opacity: isHovered || isSelected ? 1 : 0,
                transition: 'opacity 0.25s ease',
              }} />

              {/* Emoji icon */}
              <Box sx={{
                width: 72, height: 72, borderRadius: '20px', mb: 2.5,
                background: `linear-gradient(135deg, ${role.color}20, ${role.color}0A)`,
                border: `1.5px solid ${role.color}35`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem',
                transform: isHovered ? 'scale(1.1) rotate(-3deg)' : 'scale(1) rotate(0deg)',
                transition: 'transform 0.3s cubic-bezier(.34,1.56,.64,1)',
                boxShadow: isHovered ? `0 8px 20px ${role.color}30` : 'none',
              }}>
                {role.emoji}
              </Box>

              {/* Title */}
              <Typography sx={{
                fontWeight: 800, fontSize: '1.3rem',
                fontFamily: "'DM Sans'", color: isHovered || isSelected ? role.colorDark : COLORS.textPrimary,
                mb: 0.8, transition: 'color 0.2s ease',
              }}>
                {role.title}
              </Typography>

              {/* Subtitle */}
              <Typography sx={{
                fontSize: '0.8rem', color: COLORS.textSecondary,
                fontFamily: "'Inter'", lineHeight: 1.6, whiteSpace: 'pre-line',
                mb: 3,
              }}>
                {role.subtitle}
              </Typography>

              {/* CTA pill */}
              <Box sx={{
                mt: 'auto',
                px: 3, py: 1,
                borderRadius: '100px',
                background: isHovered || isSelected
                  ? `linear-gradient(135deg, ${role.color} 0%, ${role.colorDark} 100%)`
                  : COLORS.divider,
                color: isHovered || isSelected ? '#fff' : COLORS.textMuted,
                fontSize: '0.78rem', fontWeight: 700,
                fontFamily: "'DM Sans'",
                letterSpacing: '0.02em',
                boxShadow: isHovered || isSelected ? `0 6px 18px ${role.color}45` : 'none',
                transition: 'all 0.25s ease',
                display: 'flex', alignItems: 'center', gap: 0.8,
              }}>
                {isSelected ? '✓ Opening...' : `Enter as ${role.title}`}
                {!isSelected && (
                  <Box component="span" sx={{
                    display: 'inline-block',
                    transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'transform 0.2s ease',
                  }}>→</Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* ── Footer ── */}
      <Typography sx={{
        mt: 5, fontSize: '0.72rem',
        color: COLORS.textMuted, fontFamily: "'Inter'",
        opacity: titleVisible ? 1 : 0,
        transition: 'opacity 0.5s ease 0.6s',
      }}>
        NIOS Academic Planning Platform · Grade 10
      </Typography>

    </Box>
  );
}
