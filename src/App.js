// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import AuthProvider from './context/AuthContext';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthProvider>
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
    </AuthProvider>
  );
}
