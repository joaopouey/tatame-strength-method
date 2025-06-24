
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Filter, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ExerciseHistoryProps {
  onBack: () => void;
}

interface ExerciseLogEntry {
  id: string;
  exercise_name: string;
  weight_used: number;
  rpe_score: number;
  completed_at: string;
  workout_name?: string;
}

export const ExerciseHistory = ({ onBack }: ExerciseHistoryProps) => {
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<ExerciseLogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterRPE, setFilterRPE] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadExerciseHistory();
  }, []);

  useEffect(() => {
    let filtered = exerciseLogs.filter(log =>
      log.exercise_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterRPE !== "all") {
      filtered = filtered.filter(log => log.rpe_score.toString() === filterRPE);
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.completed_at).getTime();
      const dateB = new Date(b.completed_at).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    setFilteredLogs(filtered);
  }, [exerciseLogs, searchTerm, sortOrder, filterRPE]);

  const loadExerciseHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error("Usuário não autenticado");
        return;
      }

      const { data, error } = await supabase
        .from('exercise_logs')
        .select(`
          id,
          exercise_name,
          weight_used,
          rpe_score,
          completed_at,
          workout_id
        `)
        .eq('user_id', user.id)
        .eq('is_completed', true)
        .order('completed_at', { ascending: false });

      if (error) {
        console.error('Erro ao carregar histórico:', error);
        toast.error("Erro ao carregar histórico de exercícios");
        return;
      }

      setExerciseLogs(data || []);
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error("Erro inesperado ao carregar histórico");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = () => {
    const headers = ['Exercício', 'Peso (kg)', 'RPE', 'Data', 'Hora'];
    const csvContent = [
      headers.join(','),
      ...filteredLogs.map(log => [
        `"${log.exercise_name}"`,
        log.weight_used,
        log.rpe_score,
        formatDate(log.completed_at),
        formatTime(log.completed_at)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `historico-exercicios-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Histórico exportado com sucesso!");
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-muted-foreground">Carregando histórico...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-4xl mx-auto px-4 py-4">
        {/* Header */}
        <header className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 p-0">
            ← Voltar
          </Button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-xl font-bold">Histórico de Exercícios</h1>
            <Button onClick={exportToCSV} variant="outline" size="sm" className="w-fit">
              <Download size={16} className="mr-2" />
              Exportar
            </Button>
          </div>
        </header>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Search */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                <Input
                  type="text"
                  placeholder="Buscar exercício..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* RPE Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full sm:w-auto justify-between">
                      <div className="flex items-center">
                        <Filter size={16} className="mr-2" />
                        RPE: {filterRPE === "all" ? "Todos" : filterRPE}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuItem onClick={() => setFilterRPE("all")}>
                      Todos
                    </DropdownMenuItem>
                    {[6, 7, 8, 9, 10].map(rpe => (
                      <DropdownMenuItem key={rpe} onClick={() => setFilterRPE(rpe.toString())}>
                        RPE {rpe}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Sort Order */}
                <Button
                  variant="outline"
                  onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                  className="w-full sm:w-auto"
                >
                  Data: {sortOrder === "desc" ? "Mais recente" : "Mais antiga"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Mostrando {filteredLogs.length} de {exerciseLogs.length} registros
          </p>
        </div>

        {/* Exercise History Table - Mobile Responsive */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              {/* Mobile view - Cards */}
              <div className="block sm:hidden">
                {filteredLogs.length === 0 ? (
                  <div className="text-center py-8 px-4 text-muted-foreground">
                    {searchTerm || filterRPE !== "all" 
                      ? "Nenhum registro encontrado com os filtros aplicados"
                      : "Nenhum exercício registrado ainda"
                    }
                  </div>
                ) : (
                  <div className="space-y-3 p-4">
                    {filteredLogs.map((log) => (
                      <Card key={log.id} className="p-3">
                        <div className="space-y-2">
                          <div className="font-medium text-sm">{log.exercise_name}</div>
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="text-muted-foreground">Peso: </span>
                              <span className="font-medium">{log.weight_used}kg</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">RPE: </span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                log.rpe_score >= 8.5 ? 'bg-red-100 text-red-700' :
                                log.rpe_score >= 7.5 ? 'bg-orange-100 text-orange-700' :
                                log.rpe_score >= 6.5 ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {log.rpe_score}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Data: </span>
                              <span className="font-medium">{formatDate(log.completed_at)}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Hora: </span>
                              <span className="font-medium">{formatTime(log.completed_at)}</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Desktop view - Table */}
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Exercício</TableHead>
                      <TableHead className="text-center">Peso (kg)</TableHead>
                      <TableHead className="text-center">RPE</TableHead>
                      <TableHead className="text-center">Data</TableHead>
                      <TableHead className="text-center">Hora</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          {searchTerm || filterRPE !== "all" 
                            ? "Nenhum registro encontrado com os filtros aplicados"
                            : "Nenhum exercício registrado ainda"
                          }
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLogs.map((log) => (
                        <TableRow key={log.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{log.exercise_name}</TableCell>
                          <TableCell className="text-center">{log.weight_used}</TableCell>
                          <TableCell className="text-center">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              log.rpe_score >= 8.5 ? 'bg-red-100 text-red-700' :
                              log.rpe_score >= 7.5 ? 'bg-orange-100 text-orange-700' :
                              log.rpe_score >= 6.5 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {log.rpe_score}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">{formatDate(log.completed_at)}</TableCell>
                          <TableCell className="text-center">{formatTime(log.completed_at)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Card */}
        {exerciseLogs.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3 text-sm">Estatísticas Gerais</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-xl font-bold text-primary">{exerciseLogs.length}</p>
                  <p className="text-xs text-muted-foreground">Total de Exercícios</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-bold text-primary">
                    {new Set(exerciseLogs.map(log => log.exercise_name)).size}
                  </p>
                  <p className="text-xs text-muted-foreground">Exercícios Únicos</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-bold text-primary">
                    {(exerciseLogs.reduce((sum, log) => sum + log.rpe_score, 0) / exerciseLogs.length).toFixed(1)}
                  </p>
                  <p className="text-xs text-muted-foreground">RPE Médio</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-bold text-primary">
                    {Math.max(...exerciseLogs.map(log => log.weight_used))}kg
                  </p>
                  <p className="text-xs text-muted-foreground">Maior Peso</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
