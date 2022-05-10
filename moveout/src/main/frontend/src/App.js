// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import {UserContext} from "./userContext";
import {useState, useMemo} from "react";
// ----------------------------------------------------------------------

export default function App() {
    const [user, setUser] = useState(null);
    const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
        <UserContext.Provider value={value}>
            <Router />
        </UserContext.Provider>
    </ThemeProvider>
  );
}
