import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Check, Play } from "lucide-react";
import { getWorkoutById } from "@/data/workouts";
import { ExerciseVideoModal } from "./ExerciseVideoModal";

interface WorkoutPageProps {
  workoutId: string | null;
  onBack: () => void;
  onWorkoutCompleted?: (workoutId: string) => void;
}

interface WorkoutHistory {
  exerciseId: number;
  exerciseName: string;
  weight: string;
  rpe: string;
  date: string;
}

export const WorkoutPage = ({ workoutId, onBack, onWorkoutCompleted }: WorkoutPageProps) => {
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [weights, setWeights] = useState<{[key: number]: string}>({});
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>([]);
  const [selectedExerciseVideo, setSelectedExerciseVideo] = useState<string | null>(null);

  useEffect(() => {
    // Carregar histórico do localStorage
    const savedHistory = localStorage.getItem('workoutHistory');
    if (savedHistory) {
      setWorkoutHistory(JSON.parse(savedHistory));
    }
  }, []);

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

  const getLastExerciseData = (exerciseId: number, exerciseName: string) => {
    const lastEntry = workoutHistory
      .filter(h => h.exerciseId === exerciseId || h.exerciseName === exerciseName)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    return lastEntry;
  };

  const completeWorkout = () => {
    // Salvar histórico de cargas
    const newHistory = workout.exercises.map(exercise => ({
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      weight: weights[exercise.id] || '',
      rpe: exercise.rpeGuidance,
      date: new Date().toISOString()
    }));

    const updatedHistory = [...workoutHistory, ...newHistory];
    localStorage.setItem('workoutHistory', JSON.stringify(updatedHistory));
    
    // Marcar treino como concluído
    const completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts') || '[]');
    completedWorkouts.push({
      workoutId,
      date: new Date().toISOString(),
      week: workout.week,
      type: workout.type
    });
    localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));

    if (onWorkoutCompleted) {
      onWorkoutCompleted(workoutId);
    }

    onBack();
  };

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

  const allExercisesCompleted = completedExercises.length === workout.exercises.length;

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
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <h3 className="font-semibold text-primary mb-2">Escala RPE (Percepção de Esforço)</h3>
            <div className="text-primary/80 text-sm space-y-1">
              <p><strong>RPE 6-7:</strong> Moderado a difícil (2-4 reps na reserva)</p>
              <p><strong>RPE 7-8:</strong> Difícil (1-3 reps na reserva)</p>
              <p><strong>RPE 8-9:</strong> Muito difícil (0-2 reps na reserva)</p>
            </div>
          </CardContent>
        </Card>

        {/* Exercise List */}
        <div className="space-y-4">
          {workout.exercises.map((exercise) => {
            const lastExerciseData = getLastExerciseData(exercise.id, exercise.name);
            return (
              <Card key={exercise.id} className="exercise-card">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{exercise.name}</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedExerciseVideo(exercise.name)}
                          className="ml-2"
                        >
                          <Play size={14} className="mr-1" />
                          Vídeo
                        </Button>
                      </div>
                      <p className="text-primary text-sm font-medium mb-2">{exercise.sets}</p>
                      {exercise.note && (
                        <p className="text-muted-foreground text-sm mb-3">{exercise.note}</p>
                      )}
                      
                      {/* Load and RPE Guidance - Always Visible */}
                      <div className="mb-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-slate-700 text-sm mb-1">
                          <strong>Carga:</strong> {exercise.loadGuidance}
                        </p>
                        <p className="text-slate-700 text-sm">
                          <strong>Ajuste da Carga:</strong> {exercise.rpeGuidance}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
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
                        
                        <button
                          onClick={() => toggleComplete(exercise.id)}
                          className="mobile-tap-target"
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
                      </div>
                      
                      {lastExerciseData && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          <span>Última vez: {lastExerciseData.weight}kg | RPE: {lastExerciseData.rpe}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Complete Workout Button */}
        <div className="mt-8">
          <Button 
            onClick={completeWorkout}
            disabled={!allExercisesCompleted}
            className="w-full primary-button"
          >
            <Check className="mr-2" size={16} />
            {allExercisesCompleted ? 'Treino Concluído!' : `Complete todos os exercícios (${completedExercises.length}/${workout.exercises.length})`}
          </Button>
        </div>

        {/* Exercise Video Modal */}
        <ExerciseVideoModal
          exerciseName={selectedExerciseVideo || ""}
          isOpen={!!selectedExerciseVideo}
          onClose={() => setSelectedExerciseVideo(null)}
        />
      </div>
    </div>
  );
};
