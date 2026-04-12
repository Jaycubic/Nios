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

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Default */}
          <Route path="/" element={<Navigate to="/parent/overview" replace />} />

          {/* Parent */}
          <Route path="/parent/overview"    element={<P1_ProgressOverview />} />

          {/* Educator — Mode 1: Class Overview */}
          <Route path="/educator/class"     element={<E0_ClassOverview />} />

          {/* Educator — Mode 2: Student Deep Dive */}
          <Route path="/educator/overview"  element={<E1_StudentOverview />} />
          <Route path="/educator/diagnosis" element={<E3_ErrorAnalysis />} />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
