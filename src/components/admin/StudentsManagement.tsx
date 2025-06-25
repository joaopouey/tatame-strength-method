
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Edit, Search, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface StudentsManagementProps {
  onBack: () => void;
}

interface Student {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  anamnesis?: {
    age: number;
    weight: number;
    height: number;
    sex: string;
    bjj_experience: string;
    training_goals: string;
  };
}

export const StudentsManagement = ({ onBack }: StudentsManagementProps) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(student =>
      student.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [students, searchTerm]);

  const loadStudents = async () => {
    try {
      // Buscar profiles dos usuários
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('full_name');

      if (profilesError) {
        console.error('Erro ao carregar profiles:', profilesError);
        toast.error("Erro ao carregar alunos");
        return;
      }

      // Para cada profile, buscar anamnese
      const studentsWithAnamnesis = await Promise.all(
        profiles.map(async (profile) => {
          const { data: anamnesis } = await supabase
            .from('anamnesis')
            .select('*')
            .eq('user_id', profile.id)
            .single();

          return {
            ...profile,
            anamnesis: anamnesis || null
          };
        })
      );

      setStudents(studentsWithAnamnesis);
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error("Erro inesperado ao carregar alunos");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setEditData({
      full_name: student.full_name || '',
      email: student.email || '',
      phone: student.phone || '',
      age: student.anamnesis?.age || '',
      weight: student.anamnesis?.weight || '',
      height: student.anamnesis?.height || '',
      sex: student.anamnesis?.sex || '',
      bjj_experience: student.anamnesis?.bjj_experience || '',
      training_goals: student.anamnesis?.training_goals || ''
    });
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!selectedStudent) return;

    try {
      // Atualizar profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: editData.full_name,
          email: editData.email,
          phone: editData.phone
        })
        .eq('id', selectedStudent.id);

      if (profileError) {
        console.error('Erro ao atualizar profile:', profileError);
        toast.error("Erro ao atualizar dados do aluno");
        return;
      }

      // Atualizar ou criar anamnese
      const anamnesisData = {
        user_id: selectedStudent.id,
        age: editData.age ? parseInt(editData.age) : null,
        weight: editData.weight ? parseFloat(editData.weight) : null,
        height: editData.height ? parseFloat(editData.height) : null,
        sex: editData.sex || null,
        bjj_experience: editData.bjj_experience || null,
        training_goals: editData.training_goals || null
      };

      const { error: anamnesisError } = await supabase
        .from('anamnesis')
        .upsert([anamnesisData]);

      if (anamnesisError) {
        console.error('Erro ao atualizar anamnese:', anamnesisError);
        toast.error("Erro ao atualizar anamnese");
        return;
      }

      toast.success("Dados do aluno atualizados com sucesso!");
      setIsEditModalOpen(false);
      loadStudents();
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error("Erro inesperado ao salvar alterações");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Carregando alunos...</p>
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
              <Users size={24} />
              Gerenciamento de Alunos
            </h2>
            <p className="text-muted-foreground">
              {students.length} alunos cadastrados
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Buscar por nome ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Alunos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Experiência BJJ</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    {student.full_name || 'Nome não informado'}
                  </TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone || '-'}</TableCell>
                  <TableCell>{student.anamnesis?.bjj_experience || '-'}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(student)}
                    >
                      <Edit size={16} className="mr-1" />
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {searchTerm ? 'Nenhum aluno encontrado' : 'Nenhum aluno cadastrado'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Dados do Aluno</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="full_name">Nome Completo</Label>
              <Input
                id="full_name"
                value={editData.full_name}
                onChange={(e) => setEditData({...editData, full_name: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={editData.email}
                onChange={(e) => setEditData({...editData, email: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={editData.phone}
                onChange={(e) => setEditData({...editData, phone: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="age">Idade</Label>
              <Input
                id="age"
                type="number"
                value={editData.age}
                onChange={(e) => setEditData({...editData, age: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="0.1"
                value={editData.weight}
                onChange={(e) => setEditData({...editData, weight: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="height">Altura (cm)</Label>
              <Input
                id="height"
                type="number"
                value={editData.height}
                onChange={(e) => setEditData({...editData, height: e.target.value})}
              />
            </div>
            
            <div>
              <Label htmlFor="sex">Sexo</Label>
              <select
                id="sex"
                value={editData.sex}
                onChange={(e) => setEditData({...editData, sex: e.target.value})}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Selecionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="bjj_experience">Experiência em BJJ</Label>
              <Input
                id="bjj_experience"
                value={editData.bjj_experience}
                onChange={(e) => setEditData({...editData, bjj_experience: e.target.value})}
              />
            </div>
          </div>
          
          <div className="col-span-2">
            <Label htmlFor="training_goals">Objetivos do Treino</Label>
            <Input
              id="training_goals"
              value={editData.training_goals}
              onChange={(e) => setEditData({...editData, training_goals: e.target.value})}
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveChanges}>
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
