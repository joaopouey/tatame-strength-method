
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CreditCard, CheckCircle, Clock } from "lucide-react";

interface SubscriptionInfoProps {
  onUpgrade?: () => void;
}

interface SubscriptionData {
  plan: string;
  status: string;
  expiresAt: string;
  isActive: boolean;
  weeksCompleted: number;
  totalWeeksInCycle: number;
  canAccessNextMonth: boolean;
}

export const SubscriptionInfo = ({ onUpgrade }: SubscriptionInfoProps) => {
  const [subscription, setSubscription] = useState<SubscriptionData>({
    plan: "Mensal",
    status: "Ativo",
    expiresAt: "2024-02-15",
    isActive: true,
    weeksCompleted: 2,
    totalWeeksInCycle: 4,
    canAccessNextMonth: false
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getDaysUntilExpiry = () => {
    const expiryDate = new Date(subscription.expiresAt);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilExpiry();
  const progressPercentage = (subscription.weeksCompleted / subscription.totalWeeksInCycle) * 100;

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="text-primary" size={20} />
            <h3 className="font-semibold">Plano {subscription.plan}</h3>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            subscription.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {subscription.status}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-muted-foreground" />
              <span>Expira em:</span>
            </div>
            <span className="font-medium">{formatDate(subscription.expiresAt)}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span>Dias restantes:</span>
            <span className={`font-medium ${daysLeft <= 7 ? 'text-orange-600' : 'text-green-600'}`}>
              {daysLeft} dias
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progresso do Ciclo Atual:</span>
              <span className="font-medium">{subscription.weeksCompleted}/{subscription.totalWeeksInCycle} semanas</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {subscription.weeksCompleted === subscription.totalWeeksInCycle && (
            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
              <div className="flex items-center gap-2 text-primary text-sm">
                <CheckCircle size={16} />
                <span className="font-medium">Ciclo concluído!</span>
              </div>
              {subscription.canAccessNextMonth ? (
                <p className="text-sm text-muted-foreground mt-1">
                  Seu próximo ciclo de treinos está sendo preparado e será liberado em breve.
                </p>
              ) : (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-2">
                    Renove sua assinatura para acessar o próximo ciclo de treinos.
                  </p>
                  <Button size="sm" onClick={onUpgrade}>
                    Renovar Plano
                  </Button>
                </div>
              )}
            </div>
          )}

          {daysLeft <= 7 && subscription.isActive && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 text-orange-800 text-sm">
                <Clock size={16} />
                <span className="font-medium">Renovação necessária em breve</span>
              </div>
              <p className="text-sm text-orange-700 mt-1">
                Sua assinatura expira em {daysLeft} dias. Renove para manter acesso aos treinos.
              </p>
              <Button variant="outline" size="sm" className="mt-2" onClick={onUpgrade}>
                Renovar Agora
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
