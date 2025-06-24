
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Search } from "lucide-react";
import { ExerciseVideoModal } from "./ExerciseVideoModal";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ExerciseLibraryProps {
  onBack: () => void;
}

interface Exercise {
  id: string;
  name: string;
  description: string;
  muscle_groups: string[];
  equipment: string;
  difficulty_level: string;
  video_url: string;
}

export const ExerciseLibrary = ({ onBack }: ExerciseLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExerciseVideo, setSelectedExerciseVideo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar exercícios do banco de dados
  useEffect(() => {
    const loadExercises = async () => {
      try {
        const { data, error } = await supabase
          .from('exercises')
          .select('*')
          .order('name');

        if (error) {
          console.error('Erro ao carregar exercícios:', error);
          toast.error("Erro ao carregar exercícios");
          return;
        }

        setExercises(data || []);
      } catch (error) {
        console.error('Erro inesperado:', error);
        toast.error("Erro inesperado ao carregar exercícios");
      } finally {
        setIsLoading(false);
      }
    };

    loadExercises();
  }, []);

  const filters = [
    { value: 'all', label: 'Todos' },
    { value: 'Iniciante', label: 'Iniciante' },
    { value: 'Intermediário', label: 'Intermediário' },
    { value: 'Avançado', label: 'Avançado' },
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || exercise.difficulty_level === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getMuscleGroupsText = (muscleGroups: string[]) => {
    if (!muscleGroups || muscleGroups.length === 0) return 'Múltiplos grupos';
    return muscleGroups.join(', ');
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-md mx-auto text-center">
          <p className="text-muted-foreground">Carregando exercícios...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 p-0">
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold mb-4">Biblioteca de Exercícios</h1>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <input
              type="text"
              placeholder="Buscar exercício..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-input border border-border rounded-lg pl-10 pr-4 py-3 mobile-tap-target"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap mobile-tap-target ${
                  selectedFilter === filter.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </header>

        {/* Exercise Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredExercises.map((exercise) => (
            <Card key={exercise.id} className="exercise-card">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedExerciseVideo(exercise.name)}
                    className="flex-shrink-0"
                  >
                    <Play size={16} />
                  </Button>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{exercise.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {getMuscleGroupsText(exercise.muscle_groups)}
                    </p>
                    {exercise.description && (
                      <p className="text-sm text-muted-foreground mb-2">{exercise.description}</p>
                    )}
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                        {exercise.difficulty_level}
                      </span>
                      {exercise.equipment && (
                        <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded">
                          {exercise.equipment}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Nenhum exercício encontrado</p>
          </div>
        )}

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
