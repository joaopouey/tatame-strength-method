
import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  if (isSignedIn) {
    return <Dashboard />;
  }

  return <LandingPage onSignIn={() => setIsSignedIn(true)} />;
};

export default Index;
