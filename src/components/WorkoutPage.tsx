
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Info } from "lucide-react";
import { getWorkoutById } from "@/data/workouts";

interface WorkoutPageProps {
  workoutId: string | null;
  onBack: () => void;
}

export const WorkoutPage = ({ workoutId, onBack }: WorkoutPageProps) => {
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [weights, setWeights] = useState<{[key: number]: string}>({});
  const [showLoadInfo, setShowLoadInfo] = useState<{[key: number]: boolean}>({});

  if (!workoutId) {
    return (
      <div className="p-6">
        <div className="max-w-md mx-auto text-center">
          <p className="text-muted-foreground">Treino não encontrado</p>
          <Button onClick={onBack} className="mt-4">Voltar</Button>
        </div>
      </div>
    );
  }

  const workout = getWorkoutById(workoutId);
  
  if (!workout) {
    return (
      <div className="p-6">
        <div className="max-w-md mx-auto text-center">
          <p className="text-muted-foreground">Treino não encontrado</p>
          <Button onClick={onBack} className="mt-4">Voltar</Button>
        </div>
      </div>
    );
  }

  const toggleComplete = (id: number) => {
    setCompletedExercises(prev => 
      prev.includes(id) 
        ? prev.filter(exerciseId => exerciseId !== id)
        : [...prev, id]
    );
  };

  const updateWeight = (id: number, weight: string) => {
    setWeights(prev => ({ ...prev, [id]: weight }));
  };

  const toggleLoadInfo = (id: number) => {
    setShowLoadInfo(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 p-0">
            ← Voltar
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold">Dia {workout.dayNumber}</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">{workout.title}</h1>
              <p className="text-primary font-medium text-sm">{workout.subtitle}</p>
            </div>
          </div>
        </header>

        {/* RPE Explanation */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Escala RPE (Percepção de Esforço)</h3>
            <div className="text-blue-800 text-sm space-y-1">
              <p><strong>RPE 6-7:</strong> Moderado a difícil (2-4 reps na reserva)</p>
              <p><strong>RPE 7-8:</strong> Difícil (1-3 reps na reserva)</p>
              <p><strong>RPE 8-9:</strong> Muito difícil (0-2 reps na reserva)</p>
            </div>
          </CardContent>
        </Card>

        {/* Exercise List */}
        <div className="space-y-4">
          {workout.exercises.map((exercise) => (
            <Card key={exercise.id} className="exercise-card">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleComplete(exercise.id)}
                    className="mt-1 mobile-tap-target"
                  >
                    <CheckCircle 
                      className={`${
                        completedExercises.includes(exercise.id) 
                          ? 'text-primary' 
                          : 'text-muted-foreground'
                      } transition-colors`}
                      size={24}
                    />
                  </button>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{exercise.name}</h3>
                    <p className="text-primary text-sm font-medium mb-2">{exercise.sets}</p>
                    {exercise.note && (
                      <p className="text-muted-foreground text-sm mb-3">{exercise.note}</p>
                    )}
                    
                    {/* Load Guidance */}
                    <div className="mb-3">
                      <button 
                        onClick={() => toggleLoadInfo(exercise.id)}
                        className="flex items-center gap-2 text-blue-600 text-sm hover:text-blue-800"
                      >
                        <Info size={16} />
                        Como escolher a carga?
                      </button>
                      
                      {showLoadInfo[exercise.id] && (
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                          <p className="text-blue-900 text-sm mb-2">
                            <strong>Carga:</strong> {exercise.loadGuidance}
                          </p>
                          <p className="text-blue-900 text-sm">
                            <strong>Esforço:</strong> {exercise.rpeGuidance}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-muted-foreground">Carga usada:</label>
                      <input
                        type="text"
                        value={weights[exercise.id] || ''}
                        onChange={(e) => updateWeight(exercise.id, e.target.value)}
                        placeholder="ex: 60"
                        className="bg-input border border-border rounded px-2 py-1 text-sm w-20 mobile-tap-target"
                      />
                      <span className="text-sm text-muted-foreground">kg</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-8 p-4 bg-card rounded-lg">
          <p className="text-center text-muted-foreground">
            Progresso: {completedExercises.length}/{workout.exercises.length} exercícios
          </p>
          <div className="w-full bg-secondary rounded-full h-2 mt-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedExercises.length / workout.exercises.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
