// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import {UserContext, UserContextProvider} from "./userContext";
// ----------------------------------------------------------------------

export default function App(factory, deps) {
    return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
        <UserContextProvider>
            <Router />
        </UserContextProvider>
    </ThemeProvider>
  );
}
