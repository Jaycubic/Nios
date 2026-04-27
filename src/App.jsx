import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

// Parent screens
import P1_ProgressOverview from './screens/parent/P1_ProgressOverview';

// Educator screens
import E0_MyStudents from './screens/educator/E0_MyStudents';
import E1_StudentOverview from './screens/educator/E1_StudentOverview';
import E3_ErrorAnalysis from './screens/educator/E3_ErrorAnalysis';

// Student screens
import S1_Dashboard from './screens/student/S1_Dashboard';
import S2_SubjectMatrix from './screens/student/S2_SubjectMatrix';

// Role selection removed
import Settings from './screens/Settings';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Redirect base to student dashboard */}
          <Route path="/" element={<Navigate to="/student/dashboard" replace />} />

          {/* Parent */}
          <Route path="/parent/overview" element={<P1_ProgressOverview />} />

          {/* Educator — Mode 1: Class Overview */}
          <Route path="/educator/mystudents" element={<E0_MyStudents />} />

          {/* Educator — Mode 2: Student Deep Dive */}
          <Route path="/educator/overview" element={<E1_StudentOverview />} />
          <Route path="/educator/diagnosis" element={<E3_ErrorAnalysis />} />

          {/* Student */}
          <Route path="/student/dashboard" element={<S1_Dashboard />} />
          <Route path="/student/matrix" element={<S2_SubjectMatrix />} />

          {/* Settings */}
          <Route path="/settings" element={<Settings />} />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
