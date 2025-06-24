import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Play, Save, History, ChevronDown, ChevronUp } from "lucide-react";
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

interface ExerciseHistory {
  lastExecuted: string;
  lastWeight: number;
  lastRpe: number;
}

export const WorkoutPage = ({ workoutId, onBack, onWorkoutCompleted }: WorkoutPageProps) => {
  const [exerciseLogs, setExerciseLogs] = useState<{[key: number]: ExerciseLog}>({});
  const [exerciseHistory, setExerciseHistory] = useState<{[key: string]: ExerciseHistory}>({});
  const [selectedExerciseVideo, setSelectedExerciseVideo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedBenefits, setExpandedBenefits] = useState<{[key: number]: boolean}>({});

  // Carregar histórico dos exercícios
  useEffect(() => {
    const loadExerciseHistory = async () => {
      const workout = getWorkoutById(workoutId!);
      if (!workout) return;

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Buscar o último treino de cada exercício
        for (const exercise of workout.exercises) {
          const { data: lastLog } = await supabase
            .from('exercise_logs')
            .select('completed_at, weight_used, rpe_score')
            .eq('user_id', user.id)
            .eq('exercise_name', exercise.name)
            .eq('is_completed', true)
            .order('completed_at', { ascending: false })
            .limit(1);

          if (lastLog && lastLog.length > 0) {
            const log = lastLog[0];
            setExerciseHistory(prev => ({
              ...prev,
              [exercise.name]: {
                lastExecuted: log.completed_at,
                lastWeight: log.weight_used,
                lastRpe: log.rpe_score
              }
            }));
          }
        }
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      }
    };

    if (workoutId) {
      loadExerciseHistory();
    }
  }, [workoutId]);

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
      
      // Atualizar histórico
      setExerciseHistory(prev => ({
        ...prev,
        [exerciseName]: {
          lastExecuted: new Date().toISOString(),
          lastWeight: parseFloat(exerciseLog.weight),
          lastRpe: exerciseLog.rpe
        }
      }));

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const toggleBenefit = (exerciseId: number) => {
    setExpandedBenefits(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
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
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-md mx-auto px-4 py-4">
        {/* Header */}
        <header className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 p-0">
            ← Voltar
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-primary font-bold text-sm">Dia {workout.dayNumber}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg font-bold leading-tight">{workout.title}</h1>
              <p className="text-primary font-medium text-sm">{workout.subtitle}</p>
            </div>
          </div>
        </header>

        {/* RPE Explanation */}
        <Card className="mb-6 bg-primary/5 border-primary/20">
          <CardContent className="p-3">
            <h3 className="font-semibold text-primary mb-2 text-sm">Escala RPE (Percepção de Esforço)</h3>
            <div className="text-primary/80 text-xs space-y-1">
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
            const history = exerciseHistory[exercise.name];
            const isBenefitExpanded = expandedBenefits[exercise.id];
            
            return (
              <Card key={exercise.id} className={`w-full ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
                <CardContent className="p-3">
                  <div className="w-full">
                    <div className="flex items-start justify-between mb-2">
                      <div className="min-w-0 flex-1 pr-2">
                        <h3 className="font-semibold text-sm leading-tight">{exercise.name}</h3>
                        <p className="text-primary text-xs font-medium mt-1">{exercise.sets}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedExerciseVideo(exercise.name)}
                        className="flex-shrink-0 h-8 px-2 text-xs"
                      >
                        <Play size={12} className="mr-1" />
                        Vídeo
                      </Button>
                    </div>
                    
                    {exercise.note && (
                      <p className="text-muted-foreground text-xs mb-3 break-words">{exercise.note}</p>
                    )}
                    
                    {/* BJJ Benefit - Collapsible */}
                    {exercise.bjjBenefit && (
                      <div className="mb-3">
                        <button
                          onClick={() => toggleBenefit(exercise.id)}
                          className="flex items-center gap-2 text-xs font-medium text-blue-700 hover:text-blue-800 mb-2 w-full text-left"
                        >
                          Benefício no Jiu-Jitsu
                          {isBenefitExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                        {isBenefitExpanded && (
                          <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-blue-700 text-xs break-words">
                              {exercise.bjjBenefit}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Exercise History */}
                    {history && (
                      <div className="mb-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2 mb-1">
                          <History size={12} className="text-slate-600 flex-shrink-0" />
                          <span className="text-slate-700 text-xs font-medium">Última execução:</span>
                        </div>
                        <div className="text-slate-600 text-xs space-y-0.5">
                          <p><strong>Data:</strong> {formatDate(history.lastExecuted)}</p>
                          <p><strong>Peso:</strong> {history.lastWeight}kg</p>
                          <p><strong>RPE:</strong> {history.lastRpe}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Load and RPE Guidance */}
                    <div className="mb-3 p-2 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-slate-700 text-xs break-words">
                        <strong>Ajuste da Carga:</strong> {exercise.rpeGuidance}
                      </p>
                    </div>
                    
                    {/* Weight and RPE Inputs - Mobile Optimized */}
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground block">Peso (kg)</label>
                          <input
                            type="number"
                            step="0.5"
                            value={exerciseLog?.weight || ''}
                            onChange={(e) => updateExerciseLog(exercise.id, exercise.name, { weight: e.target.value })}
                            placeholder="60"
                            className="w-full bg-input border border-border rounded px-2 py-2 text-sm mobile-tap-target"
                            disabled={isCompleted}
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground block">RPE</label>
                          <select
                            value={exerciseLog?.rpe || ''}
                            onChange={(e) => updateExerciseLog(exercise.id, exercise.name, { rpe: parseInt(e.target.value) })}
                            className="w-full bg-input border border-border rounded px-2 py-2 text-sm mobile-tap-target"
                            disabled={isCompleted}
                          >
                            <option value="">Selecione</option>
                            {[6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10].map(rpe => (
                              <option key={rpe} value={rpe}>RPE {rpe}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      {/* Save/Complete Button */}
                      <div className="w-full">
                        {isCompleted ? (
                          <div className="flex items-center justify-center gap-2 text-green-600 py-2">
                            <CheckCircle size={16} />
                            <span className="text-xs font-medium">Exercício Concluído</span>
                          </div>
                        ) : (
                          <Button
                            onClick={() => saveExerciseLog(exercise.id, exercise.name)}
                            disabled={!exerciseLog?.weight || !exerciseLog?.rpe || isLoading}
                            className="w-full mobile-tap-target text-sm py-2"
                          >
                            <Save size={14} className="mr-1" />
                            Exercício Concluído
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Complete Workout Button */}
        <div className="mt-6 pb-4">
          <Button 
            onClick={completeWorkout}
            disabled={!allExercisesCompleted || isLoading}
            className="w-full primary-button text-sm py-3"
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
