
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowLeft, ArrowRight, Play, User, Check } from "lucide-react";
import { getWorkoutsByFrequency } from "@/data/workouts";

interface DashboardHomeProps {
  currentWeek: number;
  weeklyFrequency: 2 | 3 | 4;
  onNavigate: (page: string) => void;
  onWeekChange: (week: number) => void;
  onSelectWorkout: (workoutId: string) => void;
}

interface CompletedWorkout {
  workoutId: string;
  date: string;
  week: number;
  type: string;
}

export const DashboardHome = ({ 
  currentWeek, 
  weeklyFrequency,
  onNavigate, 
  onWeekChange,
  onSelectWorkout 
}: DashboardHomeProps) => {
  const [completedWorkouts, setCompletedWorkouts] = useState<CompletedWorkout[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('completedWorkouts');
    if (saved) {
      setCompletedWorkouts(JSON.parse(saved));
    }
  }, []);

  const currentWeekWorkouts = getWorkoutsByFrequency(currentWeek, weeklyFrequency);
  
  // Encontrar próximo treino não concluído
  const getNextWorkout = () => {
    const weekCompleted = completedWorkouts.filter(cw => cw.week === currentWeek);
    const nextWorkout = currentWeekWorkouts.find(workout => 
      !weekCompleted.some(cw => cw.workoutId === workout.id)
    );
    return nextWorkout || currentWeekWorkouts[0];
  };

  const nextWorkout = getNextWorkout();
  const weekProgress = completedWorkouts.filter(cw => cw.week === currentWeek).length;

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Olá, Bruno!</h1>
          <p className="text-muted-foreground">Pronto para o treino de hoje?</p>
        </header>

        {/* Week Progress */}
        {weekProgress > 0 && (
          <Card className="mb-6 bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Check className="text-primary" size={20} />
                <h3 className="font-semibold text-primary">Progresso da Semana {currentWeek}</h3>
              </div>
              <p className="text-primary/80 text-sm">
                {weekProgress}/{currentWeekWorkouts.length} treinos concluídos
              </p>
              <div className="w-full bg-primary/20 rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(weekProgress / currentWeekWorkouts.length) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Week Selector */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Semana de Treino</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onWeekChange(Math.max(1, currentWeek - 1))}
                  disabled={currentWeek === 1}
                >
                  <ArrowLeft size={16} />
                </Button>
                <span className="font-bold text-primary">Semana {currentWeek}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onWeekChange(Math.min(4, currentWeek + 1))}
                  disabled={currentWeek === 4}
                >
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
            <Button 
              onClick={() => onNavigate('week-view')} 
              variant="outline" 
              className="w-full"
            >
              <Calendar className="mr-2" size={16} />
              Ver Todos os Treinos da Semana
            </Button>
          </CardContent>
        </Card>

        {/* Main CTA */}
        {nextWorkout && (
          <Card className="bg-primary/10 border-primary mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">Dia {nextWorkout.dayNumber}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{nextWorkout.title}</h3>
                  <p className="text-muted-foreground">{nextWorkout.subtitle}</p>
                  {weekProgress >= currentWeekWorkouts.length ? (
                    <p className="text-primary text-sm mt-1">✓ Semana concluída!</p>
                  ) : (
                    <p className="text-primary text-sm mt-1">Próximo treino</p>
                  )}
                </div>
              </div>
              <Button 
                onClick={() => onSelectWorkout(nextWorkout.id)} 
                className="primary-button w-full"
              >
                {weekProgress >= currentWeekWorkouts.length ? 'Refazer Treino' : 'Começar Treino'}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Frequency Display */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Sua Rotina</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('frequency-setup')}
              >
                Alterar
              </Button>
            </div>
            <p className="text-primary font-medium">{weeklyFrequency} dias por semana</p>
            <p className="text-muted-foreground text-sm">
              {weeklyFrequency === 2 && "Treinos A e B"}
              {weeklyFrequency === 3 && "Treinos A, B e C"}
              {weeklyFrequency === 4 && "Treinos A, B, C e A"}
            </p>
          </CardContent>
        </Card>

        {/* Quick Access */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Acesso Rápido</h2>
          
          <Button 
            variant="outline" 
            onClick={() => onNavigate('frequency-setup')}
            className="secondary-button w-full justify-start"
          >
            <Calendar className="mr-3" size={20} />
            Alterar Frequência de Treino
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => onNavigate('exercises')}
            className="secondary-button w-full justify-start"
          >
            <Play className="mr-3" size={20} />
            Biblioteca de Exercícios
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => onNavigate('profile')}
            className="secondary-button w-full justify-start"
          >
            <User className="mr-3" size={20} />
            Meu Perfil
          </Button>
        </div>
      </div>
    </div>
  );
};
