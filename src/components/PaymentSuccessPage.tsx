
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Gift } from "lucide-react";

interface PaymentSuccessPageProps {
  onProceed: () => void;
}

export const PaymentSuccessPage = ({ onProceed }: PaymentSuccessPageProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-4 border-b border-border">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-xl font-bold text-primary">ForçaJJ</h1>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-md mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Pagamento Aprovado!</h2>
            <p className="text-muted-foreground">
              Parabéns! Sua assinatura foi confirmada com sucesso.
            </p>
          </div>

          {/* Welcome Card */}
          <Card className="mb-6 bg-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <Gift className="text-primary mx-auto mb-4" size={32} />
              <h3 className="text-lg font-semibold mb-2">Bem-vindo ao ForçaJJ!</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Agora você tem acesso completo aos nossos treinos especializados para jiu-jitsu.
              </p>
              <div className="bg-primary/10 rounded-lg p-3">
                <p className="text-primary font-medium text-sm">
                  ✓ Planos de treino semanais<br/>
                  ✓ Biblioteca completa de exercícios<br/>
                  ✓ Acompanhamento de progresso<br/>
                  ✓ Suporte especializado
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Próximos Passos:</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Complete sua Anamnese</p>
                    <p className="text-muted-foreground text-sm">
                      Conte-nos sobre seu histórico e objetivos para personalizar seus treinos.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Crie sua Conta</p>
                    <p className="text-muted-foreground text-sm">
                      Defina seu e-mail e senha para acessar a plataforma.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Comece a Treinar</p>
                    <p className="text-muted-foreground text-sm">
                      Acesse seus treinos personalizados e comece sua jornada.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Button */}
          <Button 
            onClick={onProceed} 
            className="w-full primary-button"
            size="lg"
          >
            Continuar para Registro
            <ArrowRight className="ml-2" size={16} />
          </Button>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Este processo levará apenas alguns minutos</p>
          </div>
        </div>
      </div>
    </div>
  );
};
