
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

interface ExerciseLibraryProps {
  onBack: () => void;
}

export const ExerciseLibrary = ({ onBack }: ExerciseLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const exercises = [
    { id: 1, name: "Agachamento Livre", category: "pernas", muscleGroup: "Pernas" },
    { id: 2, name: "Supino Reto", category: "empurrada", muscleGroup: "Peito" },
    { id: 3, name: "Puxada Alta", category: "puxada", muscleGroup: "Costas" },
    { id: 4, name: "Desenvolvimento", category: "empurrada", muscleGroup: "Ombros" },
    { id: 5, name: "Remada Curvada", category: "puxada", muscleGroup: "Costas" },
    { id: 6, name: "Leg Press", category: "pernas", muscleGroup: "Pernas" },
    { id: 7, name: "Rosca Direta", category: "puxada", muscleGroup: "Bíceps" },
    { id: 8, name: "Tríceps Testa", category: "empurrada", muscleGroup: "Tríceps" },
  ];

  const filters = [
    { value: 'all', label: 'Todos' },
    { value: 'pernas', label: 'Pernas' },
    { value: 'puxada', label: 'Puxada' },
    { value: 'empurrada', label: 'Empurrada' },
  ];

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || exercise.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

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
          <input
            type="text"
            placeholder="Buscar exercício..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-input border border-border rounded-lg px-4 py-3 mb-4 mobile-tap-target"
          />
          
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
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Play className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{exercise.name}</h3>
                    <p className="text-muted-foreground text-sm">{exercise.muscleGroup}</p>
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
      </div>
    </div>
  );
};
