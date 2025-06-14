
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import { getWorkoutsByFrequency } from "@/data/workouts";

interface WeekViewProps {
  week: number;
  frequency: 2 | 3 | 4;
  onSelectWorkout: (workoutId: string) => void;
  onBack: () => void;
}

export const WeekView = ({ 
  week, 
  frequency,
  onSelectWorkout, 
  onBack 
}: WeekViewProps) => {
  const weekWorkouts = getWorkoutsByFrequency(week, frequency);

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 p-0">
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold mb-2">Semana {week}</h1>
          <p className="text-muted-foreground">
            {week === 1 && "Base - Construindo os fundamentos"}
            {week === 2 && "Progressão - Aumentando a intensidade"}
            {week === 3 && "Intensificação - Desafiando os limites"}
            {week === 4 && "Pico - Performance máxima"}
          </p>
          <p className="text-primary text-sm mt-2">{frequency} dias de treino</p>
        </header>

        {/* Workout List */}
        <div className="space-y-4">
          {weekWorkouts.map((workout, index) => (
            <Card key={`${workout.id}-${index}`} className="exercise-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-primary font-bold text-lg">Dia {workout.dayNumber}</div>
                      <div className="text-primary text-xs">{workout.type}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Treino {workout.type}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{workout.subtitle}</p>
                    <p className="text-xs text-muted-foreground">{workout.exercises.length} exercícios</p>
                  </div>
                  <Button onClick={() => onSelectWorkout(workout.id)} className="mobile-tap-target">
                    <Play size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
