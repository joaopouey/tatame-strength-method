
import { useState } from "react";
import { DashboardHome } from "./DashboardHome";
import { WorkoutPage } from "./WorkoutPage";
import { ExerciseLibrary } from "./ExerciseLibrary";
import { ProfilePage } from "./ProfilePage";
import { WeekView } from "./WeekView";
import { FrequencySetup } from "./FrequencySetup";

export const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [weeklyFrequency, setWeeklyFrequency] = useState<2 | 3 | 4>(3);

  const handleWorkoutCompleted = (workoutId: string) => {
    // Força atualização da tela inicial
    setCurrentPage('dashboard');
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
      {renderPage()}
    </div>
  );
};
