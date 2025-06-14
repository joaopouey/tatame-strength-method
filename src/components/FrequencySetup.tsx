
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface FrequencySetupProps {
  currentFrequency: 2 | 3 | 4;
  onFrequencyChange: (frequency: 2 | 3 | 4) => void;
  onBack: () => void;
}

export const FrequencySetup = ({ 
  currentFrequency, 
  onFrequencyChange, 
  onBack 
}: FrequencySetupProps) => {
  const frequencyOptions = [
    {
      days: 2 as const,
      title: '2 Dias por Semana',
      description: 'Treinos A e B - Ideal para iniciantes ou quem tem pouco tempo',
      workouts: 'Treino A (Pernas) + Treino B (Superiores)'
    },
    {
      days: 3 as const,
      title: '3 Dias por Semana',
      description: 'Treinos A, B e C - Equilibrio perfeito para a maioria',
      workouts: 'Treino A (Pernas) + Treino B (Superiores) + Treino C (Funcional BJJ)'
    },
    {
      days: 4 as const,
      title: '4 Dias por Semana',
      description: 'A, B, C e A novamente - Para quem quer máxima evolução',
      workouts: 'Todos os treinos + repetição do Treino A'
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        <header className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 p-0">
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold mb-2">Frequência de Treino</h1>
          <p className="text-muted-foreground">
            Escolha quantos dias por semana você vai treinar. Você pode alterar isso a qualquer momento.
          </p>
        </header>

        <div className="space-y-4">
          {frequencyOptions.map((option) => (
            <Card 
              key={option.days}
              className={`cursor-pointer transition-all ${
                currentFrequency === option.days 
                  ? 'border-primary bg-primary/10' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => onFrequencyChange(option.days)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 mt-1 flex items-center justify-center ${
                    currentFrequency === option.days
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {currentFrequency === option.days && (
                      <CheckCircle className="text-white" size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{option.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{option.description}</p>
                    <p className="text-primary text-xs font-medium">{option.workouts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button onClick={onBack} className="primary-button w-full">
            Confirmar Frequência
          </Button>
        </div>
      </div>
    </div>
  );
};
