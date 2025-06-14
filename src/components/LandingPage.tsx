
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Zap, Shield, Target, User } from "lucide-react";

interface LandingPageProps {
  onSignIn: () => void;
}

export const LandingPage = ({ onSignIn }: LandingPageProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="p-4 border-b border-border">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">ForçaJJ</h1>
          <Button variant="ghost" size="sm" onClick={onSignIn}>
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="p-6 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            A Força que <span className="text-primary">Finaliza</span>.
            <br />
            O Gás que <span className="text-primary">não Acaba</span>.
          </h1>
          <p className="text-muted-foreground mb-6 text-lg">
            O treino físico definitivo para o Jiu-Jitsu. Desenvolvido por especialistas para máxima performance no tatame.
          </p>
          <Button onClick={onSignIn} className="primary-button w-full text-lg">
            Começar Meu Treino
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="p-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Por que Funciona</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Target className="text-primary mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Mais Pegada e Força</h3>
                <p className="text-muted-foreground">Exercícios específicos para aumentar a força de preensão e potência muscular no jiu-jitsu.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Zap className="text-primary mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Explosão nas Posições</h3>
                <p className="text-muted-foreground">Desenvolva a explosão necessária para transições rápidas e finalizações eficazes.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Shield className="text-primary mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Prevenção de Lesões</h3>
                <p className="text-muted-foreground">Fortalecimento inteligente para proteger articulações e músculos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="p-6 bg-card">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Para Quem É</h2>
          <Card className="bg-background border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <User className="text-primary" size={32} />
                <div>
                  <h3 className="font-semibold text-lg">O Lutador Focado</h3>
                  <p className="text-primary text-sm">Faixa Azul • Roxa • Marrom</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Para praticantes sérios que querem levar seu jiu-jitsu ao próximo nível. 
                Ideal para quem busca mais força, resistência e prevenção de lesões.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="p-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Acesso Total</h2>
          <Card className="bg-primary/10 border-primary">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <span className="text-3xl font-bold">R$ 97</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-3 mb-6 text-left">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-primary" size={20} />
                  <span>Planos de treino semanais</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-primary" size={20} />
                  <span>Biblioteca completa de exercícios</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-primary" size={20} />
                  <span>Acompanhamento de progresso</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-primary" size={20} />
                  <span>Suporte direto com especialistas</span>
                </li>
              </ul>
              <Button onClick={onSignIn} className="primary-button w-full">
                Assinar Agora
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Instructor */}
      <section className="p-6 bg-card">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Sobre o Professor</h2>
          <div className="bg-background rounded-lg p-6">
            <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="text-primary" size={40} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Professor [Nome]</h3>
            <p className="text-muted-foreground">
              Faixa preta de Jiu-Jitsu com mais de 15 anos de experiência. 
              Especialista em preparação física para artes marciais e autor do método de treino ForçaJJ.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 border-t border-border text-center">
        <p className="text-muted-foreground">&copy; 2024 ForçaJJ. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};
