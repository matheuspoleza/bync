import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ui/lib/ThemeProvider.component";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui";
import { useYNABAuth } from "./hooks/ynab";
import { queryClient } from "./api";
import { SignupPage } from "./routes/pages/Signup";
import { LoginPage } from "./routes/pages/Login";
import PrivateRoute from "./components/PrivateRoute.component";
import { DashboardPage } from "./routes/pages/Dashboard/Dashboard.component";
import { OnboardingPage } from "./routes/pages/Onboarding";
import { ynabConnectedLoader } from "./routes/loaders";
import { LoadingPage } from "./components/LoadingPage.component";
import { ModalProvider } from "./components/Modal/modal";

const YNABProvider = () => {
  useYNABAuth();
  return null;
};

const App = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="@bync/ui-theme">
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <div id="belvo" />
        <YNABProvider />
        <BrowserRouter>
          <ModalProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignupPage />} />
              <Route
                path="/"
                loader={ynabConnectedLoader}
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/onboarding"
                element={
                  <PrivateRoute>
                    <OnboardingPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </ModalProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
