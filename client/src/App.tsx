import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Dining from "@/pages/Dining";
import Explore from "@/pages/Explore";
import Transit from "@/pages/Transit";
import Feedback from "@/pages/Feedback";
import BottomNavigation from "@/components/BottomNavigation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dining" component={Dining} />
      <Route path="/explore" component={Explore} />
      <Route path="/transit" component={Transit} />
      <Route path="/feedback" component={Feedback} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative">
        <Router />
        <BottomNavigation />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
