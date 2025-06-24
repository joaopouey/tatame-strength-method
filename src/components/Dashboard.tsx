
import { useState } from "react";
import { DashboardHome } from "./DashboardHome";
import { WorkoutPage } from "./WorkoutPage";
import { ExerciseLibrary } from "./ExerciseLibrary";
import { ProfilePage } from "./ProfilePage";
import { WeekView } from "./WeekView";
import { FrequencySetup } from "./FrequencySetup";
import { generateWorkoutPDF } from "../utils/pdfGenerator";
import { Button } from "./ui/button";
import { FileDown } from "lucide-react";

export const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [weeklyFrequency, setWeeklyFrequency] = useState<2 | 3 | 4>(3);

  const handleWorkoutCompleted = (workoutId: string) => {
    // Força atualização da tela inicial
    setCurrentPage('dashboard');
  };

  const handleGeneratePDF = () => {
    generateWorkoutPDF();
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'workout':
        return (
          <WorkoutPage 
            workoutId={selectedWorkoutId} 
            onBack={() => setCurrentPage('dashboard')}
            onWorkoutCompleted={handleWorkoutCompleted}
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
      {/* Botão flutuante para gerar PDF */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button 
          onClick={handleGeneratePDF}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          size="lg"
        >
          <FileDown className="w-5 h-5 mr-2" />
          Baixar PDF Completo
        </Button>
      </div>
      
      {renderPage()}
    </div>
  );
};
