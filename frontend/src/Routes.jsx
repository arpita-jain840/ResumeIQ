import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AnalyzePage from './pages/AnalyzePage';
import DashboardPage from './pages/DashboardPage';
import RewritePage from './pages/RewritePage';
import CoverLetterPage from './pages/CoverLetterPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/analyze" element={<AnalyzePage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/rewrite" element={<RewritePage />} />
      <Route path="/cover-letter" element={<CoverLetterPage />} />
    </Routes>
  );
}

export default AppRoutes;
