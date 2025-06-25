
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Dumbbell, Settings, LogOut, FileDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { StudentsManagement } from "@/components/admin/StudentsManagement";
import { ExercisesManagement } from "@/components/admin/ExercisesManagement";
import { generateWorkoutPDF } from "@/utils/pdfGenerator";

type AdminPage = 'overview' | 'students' | 'exercises';

const AdminDashboard = () => {
  const [currentPage, setCurrentPage] = useState<AdminPage>('overview');
  const [adminData, setAdminData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminAuth();
  }, []);

  const checkAdminAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/admin');
        return;
      }

      // Verificar se é um admin usando query direta
      const { data: adminData, error } = await supabase
        .from('admins' as any)
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error || !adminData) {
        toast.error("Acesso não autorizado");
        await supabase.auth.signOut();
        navigate('/admin');
        return;
      }

      setAdminData(adminData);
    } catch (error) {
      console.error('Erro ao verificar autenticação admin:', error);
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logout realizado com sucesso");
      navigate('/admin');
    } catch (error) {
      console.error('Erro no logout:', error);
      toast.error("Erro ao fazer logout");
    }
  };

  const handleGeneratePDF = () => {
    generateWorkoutPDF();
    toast.success("PDF gerado com sucesso!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'students':
        return <StudentsManagement onBack={() => setCurrentPage('overview')} />;
      case 'exercises':
        return <ExercisesManagement onBack={() => setCurrentPage('overview')} />;
      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('students')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Gerenciar Alunos
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Visualizar, editar e gerenciar dados dos alunos
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentPage('exercises')}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Gerenciar Exercícios
                  </CardTitle>
                  <Dumbbell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Editar descrições, vídeos e detalhes dos exercícios
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={handleGeneratePDF}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Gerar PDF Completo
                  </CardTitle>
                  <FileDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    Baixar PDF com todas as semanas de treino
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Administração ForçaJJ</h1>
              <p className="text-muted-foreground">Bem-vindo, {adminData?.name}</p>
            </div>
            <div className="flex items-center gap-4">
              {currentPage !== 'overview' && (
                <Button variant="outline" onClick={() => setCurrentPage('overview')}>
                  ← Dashboard
                </Button>
              )}
              <Button variant="outline" onClick={handleLogout}>
                <LogOut size={16} className="mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default AdminDashboard;
