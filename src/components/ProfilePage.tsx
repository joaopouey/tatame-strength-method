
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface ProfilePageProps {
  onBack: () => void;
}

export const ProfilePage = ({ onBack }: ProfilePageProps) => {
  return (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 p-0">
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold">Meu Perfil</h1>
        </header>

        {/* Profile Info */}
        <Card className="mb-6">
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="text-primary" size={32} />
            </div>
            <h2 className="font-semibold text-lg mb-1">Bruno Silva</h2>
            <p className="text-muted-foreground">bruno@email.com</p>
            <p className="text-primary text-sm mt-2">Faixa Azul • Ativo desde Jan 2024</p>
          </CardContent>
        </Card>

        {/* Subscription Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Assinatura</h3>
            <div className="flex justify-between items-center mb-4">
              <span>Plano Atual</span>
              <span className="text-primary font-medium">Mensal</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span>Próximo Pagamento</span>
              <span>15/02/2024</span>
            </div>
            <Button variant="outline" className="w-full">
              Gerenciar Assinatura
            </Button>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Configurações</h3>
            <div className="space-y-3">
              <Button variant="ghost" className="w-full justify-start p-0">
                Alterar Senha
              </Button>
              <Button variant="ghost" className="w-full justify-start p-0">
                Notificações
              </Button>
              <Button variant="ghost" className="w-full justify-start p-0 text-destructive">
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
