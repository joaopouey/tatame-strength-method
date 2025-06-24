
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Play, Save } from "lucide-react";
import { getWorkoutById } from "@/data/workouts";
import { ExerciseVideoModal } from "./ExerciseVideoModal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface WorkoutPageProps {
  workoutId: string | null;
  onBack: () => void;
  onWorkoutCompleted?: (workoutId: string) => void;
}

interface ExerciseLog {
  exerciseId: number;
  exerciseName: string;
  weight: string;
  rpe: number | null;
  isCompleted: boolean;
}

export const WorkoutPage = ({ workoutId, onBack, onWorkoutCompleted }: WorkoutPageProps) => {
  const [exerciseLogs, setExerciseLogs] = useState<{[key: number]: ExerciseLog}>({});
  const [selectedExerciseVideo, setSelectedExerciseVideo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateExerciseLog = (exerciseId: number, exerciseName: string, updates: Partial<ExerciseLog>) => {
    setExerciseLogs(prev => ({
      ...prev,
      [exerciseId]: {
        exerciseId,
        exerciseName,
        weight: '',
        rpe: null,
        isCompleted: false,
        ...prev[exerciseId],
        ...updates
      }
    }));
  };

  const saveExerciseLog = async (exerciseId: number, exerciseName: string) => {
    const exerciseLog = exerciseLogs[exerciseId];
    
    if (!exerciseLog?.weight || !exerciseLog?.rpe) {
      toast.error("Por favor, preencha o peso e o RPE antes de salvar");
      return;
    }

    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Usuário não autenticado");
        return;
      }

      const { error } = await supabase
        .from('exercise_logs')
        .insert({
          user_id: user.id,
          exercise_name: exerciseName,
          weight_used: parseFloat(exerciseLog.weight),
          rpe_score: exerciseLog.rpe,
          is_completed: true,
          completed_at: new Date().toISOString()
        });

      if (error) {
        console.error('Erro ao salvar exercício:', error);
        toast.error("Erro ao salvar exercício");
        return;
      }

      // Marcar como concluído localmente
      updateExerciseLog(exerciseId, exerciseName, { isCompleted: true });
      toast.success("Exercício salvo com sucesso!");

    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error("Erro inesperado ao salvar exercício");
    } finally {
      setIsLoading(false);
    }
  };

  const completeWorkout = async () => {
    const workout = getWorkoutById(workoutId!);
    if (!workout) return;

    const completedExercises = Object.values(exerciseLogs).filter(log => log.isCompleted);
    
    if (completedExercises.length !== workout.exercises.length) {
      toast.error("Complete todos os exercícios antes de finalizar o treino");
      return;
    }

    try {
      setIsLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Usuário não autenticado");
        return;
      }

      // Salvar o treino como concluído
      const { error } = await supabase
        .from('workouts')
        .insert({
          user_id: user.id,
          workout_name: workout.title,
          workout_type: workout.type,
          week_number: workout.week,
          day_number: workout.dayNumber,
          is_completed: true,
          completed_at: new Date().toISOString()
        });

      if (error) {
        console.error('Erro ao salvar treino:', error);
        toast.error("Erro ao salvar treino");
        return;
      }

      // Manter compatibilidade com localStorage para o sistema atual
      const completedWorkouts = JSON.parse(localStorage.getItem('completedWorkouts') || '[]');
      completedWorkouts.push({
        workoutId,
        date: new Date().toISOString(),
        week: workout.week,
        type: workout.type
      });
      localStorage.setItem('completedWorkouts', JSON.stringify(completedWorkouts));

      toast.success("Treino concluído com sucesso!");
      
      if (onWorkoutCompleted) {
        onWorkoutCompleted(workoutId);
      }

      onBack();

    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error("Erro inesperado ao concluir treino");
    } finally {
      setIsLoading(false);
    }
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

  const completedExercisesCount = Object.values(exerciseLogs).filter(log => log.isCompleted).length;
  const allExercisesCompleted = completedExercisesCount === workout.exercises.length;

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
            const exerciseLog = exerciseLogs[exercise.id];
            const isCompleted = exerciseLog?.isCompleted || false;
            
            return (
              <Card key={exercise.id} className={`exercise-card ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
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
                      
                      {/* Load and RPE Guidance */}
                      <div className="mb-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-slate-700 text-sm">
                          <strong>Ajuste da Carga:</strong> {exercise.rpeGuidance}
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        {/* Weight Input */}
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-muted-foreground min-w-fit">Peso usado:</label>
                          <input
                            type="number"
                            step="0.5"
                            value={exerciseLog?.weight || ''}
                            onChange={(e) => updateExerciseLog(exercise.id, exercise.name, { weight: e.target.value })}
                            placeholder="60"
                            className="bg-input border border-border rounded px-2 py-1 text-sm w-20 mobile-tap-target"
                            disabled={isCompleted}
                          />
                          <span className="text-sm text-muted-foreground">kg</span>
                        </div>
                        
                        {/* RPE Input */}
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-muted-foreground min-w-fit">Nível de esforço (RPE):</label>
                          <select
                            value={exerciseLog?.rpe || ''}
                            onChange={(e) => updateExerciseLog(exercise.id, exercise.name, { rpe: parseInt(e.target.value) })}
                            className="bg-input border border-border rounded px-2 py-1 text-sm mobile-tap-target"
                            disabled={isCompleted}
                          >
                            <option value="">Selecione</option>
                            {[6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10].map(rpe => (
                              <option key={rpe} value={rpe}>RPE {rpe}</option>
                            ))}
                          </select>
                        </div>
                        
                        {/* Save/Complete Button */}
                        <div className="flex justify-end">
                          {isCompleted ? (
                            <div className="flex items-center gap-2 text-green-600">
                              <CheckCircle size={20} />
                              <span className="text-sm font-medium">Exercício Concluído</span>
                            </div>
                          ) : (
                            <Button
                              onClick={() => saveExerciseLog(exercise.id, exercise.name)}
                              disabled={!exerciseLog?.weight || !exerciseLog?.rpe || isLoading}
                              size="sm"
                              className="mobile-tap-target"
                            >
                              <Save size={16} className="mr-1" />
                              Exercício Concluído
                            </Button>
                          )}
                        </div>
                      </div>
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
            disabled={!allExercisesCompleted || isLoading}
            className="w-full primary-button"
          >
            {allExercisesCompleted ? 'Finalizar Treino' : `Complete todos os exercícios (${completedExercisesCount}/${workout.exercises.length})`}
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
