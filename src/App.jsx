import { useRoutes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import useAuth from "src/hooks/useAuth";

import { CssBaseline } from "@mui/material";
import ThemeProvider from "./theme/ThemeProvider";
import AppInit from "./components/AppInit";
import router from "src/router";

const queryClient = new QueryClient();

function App() {
  const content = useRoutes(router);
  const auth = useAuth();

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider
            maxSnack={6}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <CssBaseline />
            {auth.isInitialized ? content : <AppInit />}
          </SnackbarProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
