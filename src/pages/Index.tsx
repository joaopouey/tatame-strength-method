
import { useState, useEffect } from "react";
import { LandingPage } from "@/components/LandingPage";
import { Dashboard } from "@/components/Dashboard";
import { PaymentPage } from "@/components/PaymentPage";
import { PaymentSuccessPage } from "@/components/PaymentSuccessPage";
import { RegistrationPage } from "@/components/RegistrationPage";
import { LoginPage } from "@/components/LoginPage";
import { supabase } from "@/integrations/supabase/client";
import type { User } from '@supabase/supabase-js';

type AppState = 'landing' | 'login' | 'payment' | 'paymentSuccess' | 'registration' | 'dashboard';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setCurrentState('dashboard');
      }
      setLoading(false);
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user);
          setCurrentState('dashboard');
        } else {
          setUser(null);
          setCurrentState('landing');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = () => {
    setCurrentState('login');
  };

  const handleLoginSuccess = () => {
    setCurrentState('dashboard');
  };

  const handleGoToSignUp = () => {
    setCurrentState('payment');
  };

  const handlePaymentComplete = () => {
    setCurrentState('paymentSuccess');
  };

  const handleProceedToRegistration = () => {
    setCurrentState('registration');
  };

  const handleRegistrationComplete = () => {
    setCurrentState('dashboard');
  };

  const handleBackToLanding = () => {
    setCurrentState('landing');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  switch (currentState) {
    case 'login':
      return (
        <LoginPage 
          onLoginSuccess={handleLoginSuccess}
          onBack={handleBackToLanding}
          onSignUp={handleGoToSignUp}
        />
      );
    
    case 'payment':
      return <PaymentPage onPaymentComplete={handlePaymentComplete} onBack={handleBackToLanding} />;
    
    case 'paymentSuccess':
      return <PaymentSuccessPage onProceed={handleProceedToRegistration} />;
    
    case 'registration':
      return <RegistrationPage onComplete={handleRegistrationComplete} />;
    
    case 'dashboard':
      return <Dashboard />;
    
    default:
      return <LandingPage onSignIn={handleSignIn} onSignUp={handleGoToSignUp} />;
  }
};

export default Index;
