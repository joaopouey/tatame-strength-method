
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff, User, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LoginPageProps {
  onLoginSuccess: () => void;
  onBack: () => void;
  onSignUp: () => void;
}

export const LoginPage = ({ onLoginSuccess, onBack, onSignUp }: LoginPageProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Erro no login:', error);
        if (error.message.includes("Invalid login credentials")) {
          toast.error("E-mail ou senha incorretos");
        } else if (error.message.includes("Email not confirmed")) {
          toast.error("Por favor, confirme seu e-mail antes de fazer login");
        } else {
          toast.error("Erro ao fazer login: " + error.message);
        }
        return;
      }

      if (data.user) {
        toast.success("Login realizado com sucesso!");
        onLoginSuccess();
      }
    } catch (error) {
      console.error('Erro inesperado no login:', error);
      toast.error("Erro inesperado ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-4 border-b border-border">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-xl font-bold text-primary">ForçaJJ</h1>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-md mx-auto">
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-primary" size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Bem-vindo de volta!</h2>
            <p className="text-muted-foreground">
              Faça login para acessar seus treinos personalizados
            </p>
          </div>

          {/* Login Form */}
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full primary-button" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Entrando...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2" size={16} />
                      Entrar
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Ainda não tem uma conta?
            </p>
            <Button 
              variant="outline" 
              onClick={onSignUp}
              className="w-full"
            >
              Criar Nova Conta
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>Problemas para acessar? Entre em contato conosco</p>
          </div>
        </div>
      </div>
    </div>
  );
};
