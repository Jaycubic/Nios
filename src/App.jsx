import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

// Parent screens
import P1_ProgressOverview  from './screens/parent/P1_ProgressOverview';

// Educator screens
import E0_ClassOverview       from './screens/educator/E0_ClassOverview';
import E1_StudentOverview     from './screens/educator/E1_StudentOverview';
import E3_ErrorAnalysis       from './screens/educator/E3_ErrorAnalysis';

// Student screens
import S1_Dashboard           from './screens/student/S1_Dashboard';

// Role selection
import RoleSelect             from './screens/RoleSelect';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Role selection landing */}
          <Route path="/" element={<RoleSelect />} />

          {/* Parent */}
          <Route path="/parent/overview"    element={<P1_ProgressOverview />} />

          {/* Educator — Mode 1: Class Overview */}
          <Route path="/educator/class"     element={<E0_ClassOverview />} />

          {/* Educator — Mode 2: Student Deep Dive */}
          <Route path="/educator/overview"  element={<E1_StudentOverview />} />
          <Route path="/educator/diagnosis" element={<E3_ErrorAnalysis />} />

          {/* Student */}
          <Route path="/student/dashboard"  element={<S1_Dashboard />} />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
