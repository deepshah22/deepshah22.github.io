import { useEffect, useLayoutEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AICrashCourse from "./pages/AICrashCourse";
import AILearningRoadmapPage from "./pages/AILearningRoadmapPage";
import DistributedDatabasesCoursePage from "./pages/DistributedDatabasesCoursePage";


function Router() {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    // Handle redirect from 404.html
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath && redirectPath !== "/") {
      sessionStorage.removeItem('redirectPath');
      setLocation(redirectPath);
    }
  }, [setLocation]);

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/ai-crash-course"} component={AICrashCourse} />
      <Route path={"/ai-learning-roadmap"} component={AILearningRoadmapPage} />
      <Route path={"/distributed-databases"} component={DistributedDatabasesCoursePage} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow pt-16 md:pt-20">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
