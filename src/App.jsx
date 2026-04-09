import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

// Parent screens
import P1_ProgressOverview  from './screens/parent/P1_ProgressOverview';
import P3_LearningAreas     from './screens/parent/P3_LearningAreas';
import P4_SupportGuidance   from './screens/parent/P4_SupportGuidance';

// Educator screens
import E1_StudentOverview      from './screens/educator/E1_StudentOverview';
import E2_PerformanceBreakdown from './screens/educator/E2_PerformanceBreakdown';
import E3_ErrorAnalysis        from './screens/educator/E3_ErrorAnalysis';
import E4_ConceptGaps          from './screens/educator/E4_ConceptGaps';
import E5_InterventionGuidance from './screens/educator/E5_InterventionGuidance';

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
          <Route path="/parent/learning"    element={<P3_LearningAreas />} />
          <Route path="/parent/support"     element={<P4_SupportGuidance />} />

          {/* Educator */}
          <Route path="/educator/overview"    element={<E1_StudentOverview />} />
          <Route path="/educator/performance" element={<E2_PerformanceBreakdown />} />
          <Route path="/educator/diagnosis"   element={<E3_ErrorAnalysis />} />
          <Route path="/educator/gaps"        element={<E4_ConceptGaps />} />
          <Route path="/educator/intervene"   element={<E5_InterventionGuidance />} />

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
