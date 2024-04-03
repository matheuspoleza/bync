import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { ModalProvider } from "./components/Modal/modal";
import { useOnboarding } from "./hooks";
import { LoadingPage } from "./components/LoadingPage.component";

const YNABProvider = () => {
  useYNABAuth();
  return null;
};

const PrivateRouteRedirect = () => {
  const { isCompleted, isLoading } = useOnboarding();

  if (isLoading) return <LoadingPage />;

  if (!isCompleted) return <Navigate to="/onboarding" replace />;

  return <Navigate to="/dashboard" replace />;
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
              <Route path="/" loader={ynabConnectedLoader}>
                <Route index element={<PrivateRouteRedirect />} />

                <Route
                  path="/dashboard"
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
              </Route>
            </Routes>
          </ModalProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
