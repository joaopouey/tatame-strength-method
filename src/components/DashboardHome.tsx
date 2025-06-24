
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  Dumbbell, 
  Book, 
  User,
  Settings,
  Play,
  CheckCircle,
  Lock
} from "lucide-react";
import { getWorkoutsByFrequency } from "@/data/workouts";
import { SubscriptionInfo } from "./SubscriptionInfo";

interface DashboardHomeProps {
  currentWeek: number;
  weeklyFrequency: 2 | 3 | 4;
  onNavigate: (page: string) => void;
  onWeekChange: (week: number) => void;
  onSelectWorkout: (workoutId: string) => void;
}

export const DashboardHome = ({
  currentWeek,
  weeklyFrequency,
  onNavigate,
  onWeekChange,
  onSelectWorkout,
}: DashboardHomeProps) => {
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([]);
  const [canAccessWeek, setCanAccessWeek] = useState<{[key: number]: boolean}>({
    1: true,
    2: false,
    3: false,
    4: false
  });

  useEffect(() => {
    // Carregar treinos concluídos do localStorage
    const savedWorkouts = localStorage.getItem('completedWorkouts');
    if (savedWorkouts) {
      const completed = JSON.parse(savedWorkouts);
      setCompletedWorkouts(completed.map((w: any) => w.workoutId));
      
      // Lógica para liberar semanas baseada em treinos concluídos
      updateWeekAccess(completed);
    }
  }, []);

  const updateWeekAccess = (completed: any[]) => {
    const weeklyProgress = {
      1: false,
      2: false,
      3: false,
      4: false
    };

    // Verificar se cada semana foi concluída
    for (let week = 1; week <= 4; week++) {
      const weekWorkouts = getWorkoutsByFrequency(week, weeklyFrequency);
      const weekWorkoutIds = weekWorkouts.map(w => w.id);
      const completedInWeek = completed.filter(c => 
        c.week === week && weekWorkoutIds.includes(c.workoutId)
      );
      
      weeklyProgress[week as keyof typeof weeklyProgress] = 
        completedInWeek.length === weekWorkoutIds.length;
    }

    // Liberar acesso: semana 1 sempre liberada, próximas liberadas após conclusão da anterior
    const newAccess = {
      1: true,
      2: weeklyProgress[1],
      3: weeklyProgress[2],
      4: weeklyProgress[3]
    };

    setCanAccessWeek(newAccess);
  };

  const todayWorkouts = getWorkoutsByFrequency(currentWeek, weeklyFrequency);
  const totalWeekWorkouts = todayWorkouts.length;
  const completedThisWeek = todayWorkouts.filter(w => completedWorkouts.includes(w.id)).length;
  const weekProgress = totalWeekWorkouts > 0 ? (completedThisWeek / totalWeekWorkouts) * 100 : 0;

  const handleUpgradeSubscription = () => {
    onNavigate('payment');
  };

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">ForçaJJ</h1>
            <p className="text-muted-foreground">Treinamento para Jiu-Jitsu</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => onNavigate('profile')}>
              <User size={20} />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('frequency-setup')}>
              <Settings size={20} />
            </Button>
          </div>
        </header>

        {/* Subscription Info */}
        <SubscriptionInfo onUpgrade={handleUpgradeSubscription} />

        {/* Current Week Progress */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Semana {currentWeek}</h2>
              <Badge variant="secondary">{weeklyFrequency}x por semana</Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Progresso da semana</span>
                <span className="font-medium">{completedThisWeek}/{totalWeekWorkouts} treinos</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${weekProgress}%` }}
                />
              </div>
              
              {weekProgress === 100 && currentWeek < 4 && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle size={16} />
                  <span>Semana concluída! Próxima semana liberada.</span>
                </div>
              )}

              {weekProgress === 100 && currentWeek === 4 && (
                <div className="flex items-center gap-2 text-primary text-sm">
                  <CheckCircle size={16} />
                  <span>Ciclo mensal concluído! Preparando próximo mês...</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            variant="outline"
            onClick={() => onNavigate('exercises')}
            className="h-20 flex flex-col gap-2"
          >
            <Book size={24} />
            <span className="text-sm">Exercícios</span>
          </Button>
          
          <Button
            variant="outline"
            onClick={() => onNavigate('week-view')}
            className="h-20 flex flex-col gap-2"
          >
            <Calendar size={24} />
            <span className="text-sm">Ver Semana</span>
          </Button>
        </div>

        {/* Week Navigation */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Selecionar Semana</h3>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((week) => {
                const isAccessible = canAccessWeek[week as keyof typeof canAccessWeek];
                const isCurrent = week === currentWeek;
                
                return (
                  <Button
                    key={week}
                    variant={isCurrent ? "default" : "outline"}
                    disabled={!isAccessible}
                    onClick={() => onWeekChange(week)}
                    className={`h-12 relative ${!isAccessible ? 'opacity-50' : ''}`}
                  >
                    {!isAccessible && (
                      <Lock size={12} className="absolute top-1 right-1" />
                    )}
                    <div className="text-center">
                      <div className="font-medium">S{week}</div>
                      {isAccessible && (
                        <div className="text-xs opacity-75">
                          {getWorkoutsByFrequency(week, weeklyFrequency)
                            .filter(w => completedWorkouts.includes(w.id)).length}/
                          {getWorkoutsByFrequency(week, weeklyFrequency).length}
                        </div>
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Today's Workouts */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Treinos da Semana {currentWeek}</h3>
            {!canAccessWeek[currentWeek as keyof typeof canAccessWeek] ? (
              <div className="text-center py-8">
                <Lock className="mx-auto mb-2 text-muted-foreground" size={32} />
                <p className="text-muted-foreground">Complete a semana anterior para desbloquear</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayWorkouts.map((workout, index) => (
                  <div key={`${workout.id}-${index}`} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">D{workout.dayNumber}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Treino {workout.type}</h4>
                      <p className="text-xs text-muted-foreground">{workout.exercises.length} exercícios</p>
                    </div>
                    {completedWorkouts.includes(workout.id) ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => onSelectWorkout(workout.id)}
                        className="mobile-tap-target"
                      >
                        <Play size={14} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
