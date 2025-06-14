
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Zap, Shield, Target, User, Play, Calendar, ArrowLeft, ArrowRight, Info } from "lucide-react";
import { workoutProgram, getCurrentWeekWorkouts, getWorkoutById, getWorkoutsByFrequency, type Workout } from "@/data/workouts";

const Index = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  if (isSignedIn) {
    return <Dashboard />;
  }

  return <LandingPage onSignIn={() => setIsSignedIn(true)} />;
};

const LandingPage = ({ onSignIn }: { onSignIn: () => void }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="p-4 border-b border-border">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">ForçaJJ</h1>
          <Button variant="ghost" size="sm" onClick={onSignIn}>
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="p-6 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            A Força que <span className="text-primary">Finaliza</span>.
            <br />
            O Gás que <span className="text-primary">não Acaba</span>.
          </h1>
          <p className="text-muted-foreground mb-6 text-lg">
            O treino físico definitivo para o Jiu-Jitsu. Desenvolvido por especialistas para máxima performance no tatame.
          </p>
          <Button onClick={onSignIn} className="primary-button w-full text-lg">
            Começar Meu Treino
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="p-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Por que Funciona</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <Target className="text-primary mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Mais Pegada e Força</h3>
                <p className="text-muted-foreground">Exercícios específicos para aumentar a força de preensão e potência muscular no jiu-jitsu.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Zap className="text-primary mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Explosão nas Posições</h3>
                <p className="text-muted-foreground">Desenvolva a explosão necessária para transições rápidas e finalizações eficazes.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Shield className="text-primary mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold mb-2">Prevenção de Lesões</h3>
                <p className="text-muted-foreground">Fortalecimento inteligente para proteger articulações e músculos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="p-6 bg-card">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Para Quem É</h2>
          <Card className="bg-background border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <User className="text-primary" size={32} />
                <div>
                  <h3 className="font-semibold text-lg">O Lutador Focado</h3>
                  <p className="text-primary text-sm">Faixa Azul • Roxa • Marrom</p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Para praticantes sérios que querem levar seu jiu-jitsu ao próximo nível. 
                Ideal para quem busca mais força, resistência e prevenção de lesões.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing */}
      <section className="p-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Acesso Total</h2>
          <Card className="bg-primary/10 border-primary">
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <span className="text-3xl font-bold">R$ 97</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <ul className="space-y-3 mb-6 text-left">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-primary" size={20} />
                  <span>Planos de treino semanais</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-primary" size={20} />
                  <span>Biblioteca completa de exercícios</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-primary" size={20} />
                  <span>Acompanhamento de progresso</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-primary" size={20} />
                  <span>Suporte direto com especialistas</span>
                </li>
              </ul>
              <Button onClick={onSignIn} className="primary-button w-full">
                Assinar Agora
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About Instructor */}
      <section className="p-6 bg-card">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">Sobre o Professor</h2>
          <div className="bg-background rounded-lg p-6">
            <div className="w-24 h-24 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="text-primary" size={40} />
            </div>
            <h3 className="font-semibold text-lg mb-2">Professor [Nome]</h3>
            <p className="text-muted-foreground">
              Faixa preta de Jiu-Jitsu com mais de 15 anos de experiência. 
              Especialista em preparação física para artes marciais e autor do método de treino ForçaJJ.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 border-t border-border text-center">
        <p className="text-muted-foreground">&copy; 2024 ForçaJJ. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [weeklyFrequency, setWeeklyFrequency] = useState<2 | 3 | 4>(3); // Nova state para frequência

  const renderPage = () => {
    switch (currentPage) {
      case 'workout':
        return (
          <WorkoutPage 
            workoutId={selectedWorkoutId} 
            onBack={() => setCurrentPage('dashboard')} 
          />
        );
      case 'exercises':
        return <ExerciseLibrary onBack={() => setCurrentPage('dashboard')} />;
      case 'profile':
        return <ProfilePage onBack={() => setCurrentPage('dashboard')} />;
      case 'week-view':
        return (
          <WeekView 
            week={currentWeek}
            frequency={weeklyFrequency}
            onSelectWorkout={(workoutId) => {
              setSelectedWorkoutId(workoutId);
              setCurrentPage('workout');
            }}
            onBack={() => setCurrentPage('dashboard')} 
          />
        );
      case 'frequency-setup':
        return (
          <FrequencySetup 
            currentFrequency={weeklyFrequency}
            onFrequencyChange={setWeeklyFrequency}
            onBack={() => setCurrentPage('dashboard')} 
          />
        );
      default:
        return (
          <DashboardHome 
            currentWeek={currentWeek}
            weeklyFrequency={weeklyFrequency}
            onNavigate={setCurrentPage} 
            onWeekChange={setCurrentWeek}
            onSelectWorkout={(workoutId) => {
              setSelectedWorkoutId(workoutId);
              setCurrentPage('workout');
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
    </div>
  );
};

const FrequencySetup = ({ 
  currentFrequency, 
  onFrequencyChange, 
  onBack 
}: { 
  currentFrequency: 2 | 3 | 4;
  onFrequencyChange: (frequency: 2 | 3 | 4) => void;
  onBack: () => void;
}) => {
  const frequencyOptions = [
    {
      days: 2 as const,
      title: '2 Dias por Semana',
      description: 'Treinos A e B - Ideal para iniciantes ou quem tem pouco tempo',
      workouts: 'Treino A (Pernas) + Treino B (Superiores)'
    },
    {
      days: 3 as const,
      title: '3 Dias por Semana',
      description: 'Treinos A, B e C - Equilibrio perfeito para a maioria',
      workouts: 'Treino A (Pernas) + Treino B (Superiores) + Treino C (Funcional BJJ)'
    },
    {
      days: 4 as const,
      title: '4 Dias por Semana',
      description: 'A, B, C e A novamente - Para quem quer máxima evolução',
      workouts: 'Todos os treinos + repetição do Treino A'
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        <header className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 p-0">
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold mb-2">Frequência de Treino</h1>
          <p className="text-muted-foreground">
            Escolha quantos dias por semana você vai treinar. Você pode alterar isso a qualquer momento.
          </p>
        </header>

        <div className="space-y-4">
          {frequencyOptions.map((option) => (
            <Card 
              key={option.days}
              className={`cursor-pointer transition-all ${
                currentFrequency === option.days 
                  ? 'border-primary bg-primary/10' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => onFrequencyChange(option.days)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 mt-1 flex items-center justify-center ${
                    currentFrequency === option.days
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`}>
                    {currentFrequency === option.days && (
                      <CheckCircle className="text-white" size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{option.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{option.description}</p>
                    <p className="text-primary text-xs font-medium">{option.workouts}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button onClick={onBack} className="primary-button w-full">
            Confirmar Frequência
          </Button>
        </div>
      </div>
    </div>
  );
};

const DashboardHome = ({ 
  currentWeek, 
  weeklyFrequency,
  onNavigate, 
  onWeekChange,
  onSelectWorkout 
}: { 
  currentWeek: number;
  weeklyFrequency: 2 | 3 | 4;
  onNavigate: (page: string) => void;
  onWeekChange: (week: number) => void;
  onSelectWorkout: (workoutId: string) => void;
}) => {
  const currentWeekWorkouts = getWorkoutsByFrequency(currentWeek, weeklyFrequency);
  const nextWorkout = currentWeekWorkouts[0];

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Olá, Bruno!</h1>
          <p className="text-muted-foreground">Pronto para o treino de hoje?</p>
        </header>

        {/* Frequency Display */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Sua Rotina</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('frequency-setup')}
              >
                Alterar
              </Button>
            </div>
            <p className="text-primary font-medium">{weeklyFrequency} dias por semana</p>
            <p className="text-muted-foreground text-sm">
              {weeklyFrequency === 2 && "Treinos A e B"}
              {weeklyFrequency === 3 && "Treinos A, B e C"}
              {weeklyFrequency === 4 && "Treinos A, B, C e A"}
            </p>
          </CardContent>
        </Card>

        {/* Week Selector */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Semana de Treino</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onWeekChange(Math.max(1, currentWeek - 1))}
                  disabled={currentWeek === 1}
                >
                  <ArrowLeft size={16} />
                </Button>
                <span className="font-bold text-primary">Semana {currentWeek}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onWeekChange(Math.min(4, currentWeek + 1))}
                  disabled={currentWeek === 4}
                >
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
            <Button 
              onClick={() => onNavigate('week-view')} 
              variant="outline" 
              className="w-full"
            >
              <Calendar className="mr-2" size={16} />
              Ver Todos os Treinos da Semana
            </Button>
          </CardContent>
        </Card>

        {/* Main CTA */}
        {nextWorkout && (
          <Card className="bg-primary/10 border-primary mb-8">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">Dia {nextWorkout.dayNumber}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{nextWorkout.title}</h3>
                  <p className="text-muted-foreground">{nextWorkout.subtitle}</p>
                </div>
              </div>
              <Button 
                onClick={() => onSelectWorkout(nextWorkout.id)} 
                className="primary-button w-full"
              >
                Começar Treino
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Access */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Acesso Rápido</h2>
          
          <Button 
            variant="outline" 
            onClick={() => onNavigate('frequency-setup')}
            className="secondary-button w-full justify-start"
          >
            <Calendar className="mr-3" size={20} />
            Alterar Frequência de Treino
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => onNavigate('exercises')}
            className="secondary-button w-full justify-start"
          >
            <Play className="mr-3" size={20} />
            Biblioteca de Exercícios
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => onNavigate('profile')}
            className="secondary-button w-full justify-start"
          >
            <User className="mr-3" size={20} />
            Meu Perfil
          </Button>
        </div>
      </div>
    </div>
  );
};

const WeekView = ({ 
  week, 
  frequency,
  onSelectWorkout, 
  onBack 
}: { 
  week: number;
  frequency: 2 | 3 | 4;
  onSelectWorkout: (workoutId: string) => void;
  onBack: () => void;
}) => {
  const weekWorkouts = getWorkoutsByFrequency(week, frequency);

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 p-0">
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold mb-2">Semana {week}</h1>
          <p className="text-muted-foreground">
            {week === 1 && "Base - Construindo os fundamentos"}
            {week === 2 && "Progressão - Aumentando a intensidade"}
            {week === 3 && "Intensificação - Desafiando os limites"}
            {week === 4 && "Pico - Performance máxima"}
          </p>
          <p className="text-primary text-sm mt-2">{frequency} dias de treino</p>
        </header>

        {/* Workout List */}
        <div className="space-y-4">
          {weekWorkouts.map((workout, index) => (
            <Card key={`${workout.id}-${index}`} className="exercise-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-primary font-bold text-lg">Dia {workout.dayNumber}</div>
                      <div className="text-primary text-xs">{workout.type}</div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Treino {workout.type}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{workout.subtitle}</p>
                    <p className="text-xs text-muted-foreground">{workout.exercises.length} exercícios</p>
                  </div>
                  <Button onClick={() => onSelectWorkout(workout.id)} className="mobile-tap-target">
                    <Play size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const WorkoutPage = ({ workoutId, onBack }: { workoutId: string | null; onBack: () => void }) => {
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

const ExerciseLibrary = ({ onBack }: { onBack: () => void }) => {
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

const ProfilePage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <header className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4 p-0">
            ← Voltar
          </Button>
          <h1 className="text-2xl font-bold">Meu Perfil</h1>
        </header>

        {/* Profile Info */}
        <Card className="mb-6">
          <CardContent className="p-6 text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="text-primary" size={32} />
            </div>
            <h2 className="font-semibold text-lg mb-1">Bruno Silva</h2>
            <p className="text-muted-foreground">bruno@email.com</p>
            <p className="text-primary text-sm mt-2">Faixa Azul • Ativo desde Jan 2024</p>
          </CardContent>
        </Card>

        {/* Subscription Info */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Assinatura</h3>
            <div className="flex justify-between items-center mb-4">
              <span>Plano Atual</span>
              <span className="text-primary font-medium">Mensal</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span>Próximo Pagamento</span>
              <span>15/02/2024</span>
            </div>
            <Button variant="outline" className="w-full">
              Gerenciar Assinatura
            </Button>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Configurações</h3>
            <div className="space-y-3">
              <Button variant="ghost" className="w-full justify-start p-0">
                Alterar Senha
              </Button>
              <Button variant="ghost" className="w-full justify-start p-0">
                Notificações
              </Button>
              <Button variant="ghost" className="w-full justify-start p-0 text-destructive">
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
