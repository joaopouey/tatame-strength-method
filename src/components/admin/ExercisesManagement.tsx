
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Edit, Search, Dumbbell, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ExercisesManagementProps {
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
  instructions: string;
}

export const ExercisesManagement = ({ onBack }: ExercisesManagementProps) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewExercise, setIsNewExercise] = useState(false);

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    const filtered = exercises.filter(exercise =>
      exercise.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExercises(filtered);
  }, [exercises, searchTerm]);

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
      setLoading(false);
    }
  };

  const handleEditClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setEditData({
      name: exercise.name || '',
      description: exercise.description || '',
      muscle_groups: exercise.muscle_groups?.join(', ') || '',
      equipment: exercise.equipment || '',
      difficulty_level: exercise.difficulty_level || '',
      video_url: exercise.video_url || '',
      instructions: exercise.instructions || ''
    });
    setIsNewExercise(false);
    setIsEditModalOpen(true);
  };

  const handleNewExerciseClick = () => {
    setSelectedExercise(null);
    setEditData({
      name: '',
      description: '',
      muscle_groups: '',
      equipment: '',
      difficulty_level: '',
      video_url: '',
      instructions: ''
    });
    setIsNewExercise(true);
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      const exerciseData = {
        name: editData.name,
        description: editData.description,
        muscle_groups: editData.muscle_groups.split(',').map((g: string) => g.trim()).filter(Boolean),
        equipment: editData.equipment,
        difficulty_level: editData.difficulty_level,
        video_url: editData.video_url,
        instructions: editData.instructions
      };

      if (isNewExercise) {
        const { error } = await supabase
          .from('exercises')
          .insert([exerciseData]);

        if (error) {
          console.error('Erro ao criar exercício:', error);
          toast.error("Erro ao criar exercício");
          return;
        }

        toast.success("Exercício criado com sucesso!");
      } else {
        const { error } = await supabase
          .from('exercises')
          .update(exerciseData)
          .eq('id', selectedExercise!.id);

        if (error) {
          console.error('Erro ao atualizar exercício:', error);
          toast.error("Erro ao atualizar exercício");
          return;
        }

        toast.success("Exercício atualizado com sucesso!");
      }

      setIsEditModalOpen(false);
      loadExercises();
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error("Erro inesperado ao salvar alterações");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Carregando exercícios...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            ← Voltar
          </Button>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Dumbbell size={24} />
              Gerenciamento de Exercícios
            </h2>
            <p className="text-muted-foreground">
              {exercises.length} exercícios cadastrados
            </p>
          </div>
        </div>
        <Button onClick={handleNewExerciseClick}>
          <Plus size={16} className="mr-2" />
          Novo Exercício
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Buscar exercícios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Exercises Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Exercícios</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Grupos Musculares</TableHead>
                <TableHead>Equipamento</TableHead>
                <TableHead>Dificuldade</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExercises.map((exercise) => (
                <TableRow key={exercise.id}>
                  <TableCell className="font-medium">{exercise.name}</TableCell>
                  <TableCell>{exercise.muscle_groups?.join(', ') || '-'}</TableCell>
                  <TableCell>{exercise.equipment || '-'}</TableCell>
                  <TableCell>{exercise.difficulty_level || '-'}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(exercise)}
                    >
                      <Edit size={16} className="mr-1" />
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredExercises.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {searchTerm ? 'Nenhum exercício encontrado' : 'Nenhum exercício cadastrado'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isNewExercise ? 'Novo Exercício' : 'Editar Exercício'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome do Exercício</Label>
              <Input
                id="name"
                value={editData.name}
                onChange={(e) => setEditData({...editData, name: e.target.value})}
                placeholder="Ex: Agachamento Livre"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={editData.description}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
                placeholder="Descrição do exercício..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="muscle_groups">Grupos Musculares</Label>
                <Input
                  id="muscle_groups"
                  value={editData.muscle_groups}
                  onChange={(e) => setEditData({...editData, muscle_groups: e.target.value})}
                  placeholder="Ex: Quadríceps, Glúteos (separados por vírgula)"
                />
              </div>
              
              <div>
                <Label htmlFor="equipment">Equipamento</Label>
                <Input
                  id="equipment"
                  value={editData.equipment}
                  onChange={(e) => setEditData({...editData, equipment: e.target.value})}
                  placeholder="Ex: Barra, Halteres"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="difficulty_level">Nível de Dificuldade</Label>
              <select
                id="difficulty_level"
                value={editData.difficulty_level}
                onChange={(e) => setEditData({...editData, difficulty_level: e.target.value})}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Selecionar</option>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="video_url">URL do Vídeo</Label>
              <Input
                id="video_url"
                value={editData.video_url}
                onChange={(e) => setEditData({...editData, video_url: e.target.value})}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
            
            <div>
              <Label htmlFor="instructions">Instruções de Execução</Label>
              <Textarea
                id="instructions"
                value={editData.instructions}
                onChange={(e) => setEditData({...editData, instructions: e.target.value})}
                placeholder="Instruções detalhadas para execução do exercício..."
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveChanges}>
              {isNewExercise ? 'Criar Exercício' : 'Salvar Alterações'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
