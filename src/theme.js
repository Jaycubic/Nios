import { createTheme } from '@mui/material/styles';

// ─── Moodboard-exact palette ────────────────────────────────────────────────
export const COLORS = {
  // Brand primaries (from moodboard)
  green:    '#7aaa8a',   // Muted Green  — growth, mastered, positive
  yellow:   '#c9a94a',   // Warm Yellow  — encouragement, developing, effort
  purple:   '#a49acc',   // Light Purple — cognition, Bloom's taxonomy
  blue:     '#7ba8cc',   // Soft Blue    — trust, clarity, trends
  amber:    '#c4804a',   // Warm Amber   — gaps/errors (replaces harsh red)

  // Deeper variants
  greenDark:  '#4d8060',
  yellowDark: '#9c7c2a',
  purpleDark: '#6b5f9e',
  blueDark:   '#4a7aaa',
  amberDark:  '#9c5a2a',

  // Backgrounds
  bgWarm:  '#f2efe9',   // Warm off-white
  bgCard:  '#ffffff',
  bgNav:   '#2d2a38',   // Warm dark

  // Neutral
  textPrimary:   '#1e1b2e',
  textSecondary: '#6b6880',
  textMuted:     '#a8a4b8',
  border:        '#e4e0d8',
  divider:       '#ede9e1',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary:   { main: COLORS.green,  dark: COLORS.greenDark,  contrastText: '#fff' },
    secondary: { main: COLORS.purple, dark: COLORS.purpleDark, contrastText: '#fff' },
    warning:   { main: COLORS.yellow, dark: COLORS.yellowDark, contrastText: '#fff' },
    info:      { main: COLORS.blue,   dark: COLORS.blueDark,   contrastText: '#fff' },
    error:     { main: COLORS.amber,  dark: COLORS.amberDark,  contrastText: '#fff' },
    background: { default: COLORS.bgWarm, paper: COLORS.bgCard },
    text: {
      primary:   COLORS.textPrimary,
      secondary: COLORS.textSecondary,
      disabled:  COLORS.textMuted,
    },
    divider: COLORS.divider,
  },

  typography: {
    fontFamily: "'DM Sans', 'Inter', sans-serif",
    // Display — big hero numbers
    h1: { fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '3rem',    letterSpacing: '-0.02em', color: COLORS.textPrimary },
    h2: { fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '2rem',    letterSpacing: '-0.015em', color: COLORS.textPrimary },
    h3: { fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '1.5rem',  letterSpacing: '-0.01em',  color: COLORS.textPrimary },
    h4: { fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '1.25rem', letterSpacing: '-0.005em', color: COLORS.textPrimary },
    h5: { fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '1.1rem',  color: COLORS.textPrimary },
    h6: { fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.95rem', color: COLORS.textPrimary },
    subtitle1: { fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.875rem', color: COLORS.textSecondary },
    subtitle2: { fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.8rem',   color: COLORS.textSecondary },
    body1: { fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.6, color: COLORS.textPrimary },
    body2: { fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '0.8rem',   lineHeight: 1.5, color: COLORS.textSecondary },
    caption: { fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '0.72rem',  color: COLORS.textMuted, letterSpacing: '0.02em' },
    overline: { fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '0.68rem',  letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.textMuted },
    button: { fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.02em', textTransform: 'none' },
  },

  shape: { borderRadius: 12 },

  shadows: [
    'none',
    '0 1px 3px rgba(45,42,56,0.06), 0 1px 2px rgba(45,42,56,0.04)',
    '0 2px 8px rgba(45,42,56,0.08), 0 1px 3px rgba(45,42,56,0.05)',
    '0 4px 16px rgba(45,42,56,0.10), 0 2px 6px rgba(45,42,56,0.06)',
    '0 6px 24px rgba(45,42,56,0.12), 0 3px 8px rgba(45,42,56,0.07)',
    '0 8px 32px rgba(45,42,56,0.14), 0 4px 12px rgba(45,42,56,0.08)',
    ...Array(19).fill('none'),
  ],

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${COLORS.border}`,
          boxShadow: '0 2px 8px rgba(45,42,56,0.06)',
          background: COLORS.bgCard,
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          '&:hover': {
            boxShadow: '0 6px 24px rgba(45,42,56,0.12)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: { root: { padding: '20px 24px', '&:last-child': { paddingBottom: 24 } } },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 20, fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.75rem' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.82rem',
          padding: '7px 18px',
          transition: 'all 0.2s ease',
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.greenDark} 100%)`,
          boxShadow: `0 3px 10px ${COLORS.green}40`,
          '&:hover': { boxShadow: `0 5px 16px ${COLORS.green}60` },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { borderRadius: 8, height: 8, background: COLORS.divider },
        bar: { borderRadius: 8 },
      },
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: COLORS.divider } },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { background: COLORS.textPrimary, fontSize: '0.75rem', borderRadius: 8 },
      },
    },
  },
});

export default theme;
