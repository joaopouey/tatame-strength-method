
export interface Exercise {
  id: number;
  name: string;
  sets: string;
  note?: string;
  muscleGroup: string;
}

export interface Workout {
  id: string;
  week: number;
  type: 'A' | 'B' | 'C';
  title: string;
  subtitle: string;
  exercises: Exercise[];
}

export const workoutProgram: Workout[] = [
  // Semana 1
  {
    id: 'week1-a',
    week: 1,
    type: 'A',
    title: 'Semana 1 - Treino A',
    subtitle: 'Força Base - Membros Inferiores',
    exercises: [
      { id: 1, name: 'Agachamento Livre', sets: '4x 8-10 reps', note: 'Descer até 90° no joelho', muscleGroup: 'Pernas' },
      { id: 2, name: 'Leg Press 45°', sets: '3x 12-15 reps', note: 'Amplitude completa', muscleGroup: 'Pernas' },
      { id: 3, name: 'Stiff', sets: '4x 10-12 reps', note: 'Focar no alongamento do posterior', muscleGroup: 'Posterior' },
      { id: 4, name: 'Afundo Caminhando', sets: '3x 10 cada perna', note: 'Manter tronco ereto', muscleGroup: 'Pernas' },
      { id: 5, name: 'Panturrilha em Pé', sets: '4x 15-20 reps', note: 'Pausa de 1s no topo', muscleGroup: 'Panturrilha' },
      { id: 6, name: 'Prancha', sets: '3x 45-60s', note: 'Manter alinhamento corporal', muscleGroup: 'Core' }
    ]
  },
  {
    id: 'week1-b',
    week: 1,
    type: 'B',
    title: 'Semana 1 - Treino B',
    subtitle: 'Força Base - Membros Superiores',
    exercises: [
      { id: 7, name: 'Supino Reto', sets: '4x 8-10 reps', note: 'Controlar a descida', muscleGroup: 'Peito' },
      { id: 8, name: 'Puxada Alta', sets: '4x 10-12 reps', note: 'Puxar até o peito', muscleGroup: 'Costas' },
      { id: 9, name: 'Desenvolvimento', sets: '3x 10-12 reps', note: 'Não descer muito a barra', muscleGroup: 'Ombros' },
      { id: 10, name: 'Remada Curvada', sets: '4x 10-12 reps', note: 'Apertar as escápulas', muscleGroup: 'Costas' },
      { id: 11, name: 'Rosca Direta', sets: '3x 12-15 reps', note: 'Sem balançar o corpo', muscleGroup: 'Bíceps' },
      { id: 12, name: 'Tríceps Testa', sets: '3x 12-15 reps', note: 'Manter cotovelos fixos', muscleGroup: 'Tríceps' }
    ]
  },
  {
    id: 'week1-c',
    week: 1,
    type: 'C',
    title: 'Semana 1 - Treino C',
    subtitle: 'Força Base - Funcional BJJ',
    exercises: [
      { id: 13, name: 'Levantamento Terra', sets: '4x 6-8 reps', note: 'Manter coluna neutra', muscleGroup: 'Posterior' },
      { id: 14, name: 'Flexão de Braços', sets: '3x máx reps', note: 'Amplitude completa', muscleGroup: 'Peito' },
      { id: 15, name: 'Puxada Supinada', sets: '4x 10-12 reps', note: 'Focar na pegada', muscleGroup: 'Costas' },
      { id: 16, name: 'Agachamento Búlgaro', sets: '3x 8 cada perna', note: 'Pé de trás elevado', muscleGroup: 'Pernas' },
      { id: 17, name: 'Farmer Walk', sets: '3x 20m', note: 'Manter postura ereta', muscleGroup: 'Pegada' },
      { id: 18, name: 'Abdominal Remador', sets: '3x 15-20 reps', note: 'Controlar o movimento', muscleGroup: 'Core' }
    ]
  },

  // Semana 2
  {
    id: 'week2-a',
    week: 2,
    type: 'A',
    title: 'Semana 2 - Treino A',
    subtitle: 'Progressão - Membros Inferiores',
    exercises: [
      { id: 19, name: 'Agachamento Livre', sets: '4x 6-8 reps', note: 'Aumentar carga, manter técnica', muscleGroup: 'Pernas' },
      { id: 20, name: 'Leg Press 45°', sets: '4x 10-12 reps', note: 'Mais carga que semana 1', muscleGroup: 'Pernas' },
      { id: 21, name: 'Stiff', sets: '4x 8-10 reps', note: 'Aumentar amplitude', muscleGroup: 'Posterior' },
      { id: 22, name: 'Agachamento Sumô', sets: '3x 10-12 reps', note: 'Pés mais abertos', muscleGroup: 'Pernas' },
      { id: 23, name: 'Panturrilha Sentado', sets: '4x 12-15 reps', note: 'Alongar bem na descida', muscleGroup: 'Panturrilha' },
      { id: 24, name: 'Prancha Lateral', sets: '3x 30s cada lado', note: 'Manter quadril alinhado', muscleGroup: 'Core' }
    ]
  },
  {
    id: 'week2-b',
    week: 2,
    type: 'B',
    title: 'Semana 2 - Treino B',
    subtitle: 'Progressão - Membros Superiores',
    exercises: [
      { id: 25, name: 'Supino Inclinado', sets: '4x 8-10 reps', note: 'Inclinação de 30°', muscleGroup: 'Peito' },
      { id: 26, name: 'Remada no Cabo', sets: '4x 10-12 reps', note: 'Puxar até o abdômen', muscleGroup: 'Costas' },
      { id: 27, name: 'Desenvolvimento Halteres', sets: '3x 10-12 reps', note: 'Maior amplitude', muscleGroup: 'Ombros' },
      { id: 28, name: 'Pullover', sets: '3x 12-15 reps', note: 'Expandir caixa torácica', muscleGroup: 'Peito' },
      { id: 29, name: 'Rosca Martelo', sets: '3x 10-12 reps', note: 'Palmas voltadas para dentro', muscleGroup: 'Bíceps' },
      { id: 30, name: 'Tríceps Corda', sets: '3x 12-15 reps', note: 'Abrir a corda na descida', muscleGroup: 'Tríceps' }
    ]
  },
  {
    id: 'week2-c',
    week: 2,
    type: 'C',
    title: 'Semana 2 - Treino C',
    subtitle: 'Progressão - Funcional BJJ',
    exercises: [
      { id: 31, name: 'Levantamento Terra', sets: '4x 5-6 reps', note: 'Aumentar carga', muscleGroup: 'Posterior' },
      { id: 32, name: 'Flexão Diamante', sets: '3x máx reps', note: 'Mãos em formato de diamante', muscleGroup: 'Tríceps' },
      { id: 33, name: 'Chin-up', sets: '3x máx reps', note: 'Pegada supinada', muscleGroup: 'Costas' },
      { id: 34, name: 'Pistol Squat', sets: '3x 5 cada perna', note: 'Assistido se necessário', muscleGroup: 'Pernas' },
      { id: 35, name: 'Plate Pinch', sets: '3x 30-45s', note: 'Apertar anilhas com dedos', muscleGroup: 'Pegada' },
      { id: 36, name: 'Russian Twist', sets: '3x 20 reps', note: 'Com peso se possível', muscleGroup: 'Core' }
    ]
  },

  // Semana 3
  {
    id: 'week3-a',
    week: 3,
    type: 'A',
    title: 'Semana 3 - Treino A',
    subtitle: 'Intensificação - Membros Inferiores',
    exercises: [
      { id: 37, name: 'Agachamento Frontal', sets: '4x 6-8 reps', note: 'Barra na frente, trabalha core', muscleGroup: 'Pernas' },
      { id: 38, name: 'Leg Press Unilateral', sets: '3x 8 cada perna', note: 'Uma perna por vez', muscleGroup: 'Pernas' },
      { id: 39, name: 'Stiff Unilateral', sets: '3x 8 cada perna', note: 'Equilíbrio e força', muscleGroup: 'Posterior' },
      { id: 40, name: 'Jump Squat', sets: '4x 8 reps', note: 'Explosão na subida', muscleGroup: 'Pernas' },
      { id: 41, name: 'Panturrilha Box', sets: '4x 12-15 reps', note: 'Em cima de um step', muscleGroup: 'Panturrilha' },
      { id: 42, name: 'Plank Up-Down', sets: '3x 10 reps', note: 'Alternar apoios', muscleGroup: 'Core' }
    ]
  },
  {
    id: 'week3-b',
    week: 3,
    type: 'B',
    title: 'Semana 3 - Treino B',
    subtitle: 'Intensificação - Membros Superiores',
    exercises: [
      { id: 43, name: 'Supino Declinado', sets: '4x 8-10 reps', note: 'Trabalha parte inferior do peito', muscleGroup: 'Peito' },
      { id: 44, name: 'Pull-up', sets: '4x máx reps', note: 'Pegada pronada', muscleGroup: 'Costas' },
      { id: 45, name: 'Arnold Press', sets: '3x 10-12 reps', note: 'Rotação dos halteres', muscleGroup: 'Ombros' },
      { id: 46, name: 'Face Pull', sets: '3x 15-20 reps', note: 'Puxar para o rosto', muscleGroup: 'Ombros' },
      { id: 47, name: 'Rosca 21', sets: '2x 21 reps', note: '7+7+7 amplitude parcial/completa', muscleGroup: 'Bíceps' },
      { id: 48, name: 'Close Grip Bench', sets: '3x 10-12 reps', note: 'Pegada fechada', muscleGroup: 'Tríceps' }
    ]
  },
  {
    id: 'week3-c',
    week: 3,
    type: 'C',
    title: 'Semana 3 - Treino C',
    subtitle: 'Intensificação - Funcional BJJ',
    exercises: [
      { id: 49, name: 'Deadlift Sumo', sets: '4x 5-6 reps', note: 'Pés mais abertos', muscleGroup: 'Posterior' },
      { id: 50, name: 'Burpees', sets: '4x 8-10 reps', note: 'Movimento completo', muscleGroup: 'Cardio' },
      { id: 51, name: 'Muscle-up', sets: '3x máx reps', note: 'Assistido se necessário', muscleGroup: 'Costas' },
      { id: 52, name: 'Lunge com Rotação', sets: '3x 8 cada lado', note: 'Rotação do tronco', muscleGroup: 'Core' },
      { id: 53, name: 'Grip Crush', sets: '3x 10-15 reps', note: 'Apertar grip trainer', muscleGroup: 'Pegada' },
      { id: 54, name: 'Mountain Climbers', sets: '3x 20 reps', note: 'Ritmo acelerado', muscleGroup: 'Core' }
    ]
  },

  // Semana 4
  {
    id: 'week4-a',
    week: 4,
    type: 'A',
    title: 'Semana 4 - Treino A',
    subtitle: 'Pico - Membros Inferiores',
    exercises: [
      { id: 55, name: 'Agachamento 1.5', sets: '4x 6 reps', note: 'Descer, subir meio, descer, subir', muscleGroup: 'Pernas' },
      { id: 56, name: 'Box Jump', sets: '4x 6-8 reps', note: 'Salto em caixa alta', muscleGroup: 'Pernas' },
      { id: 57, name: 'Single Leg Deadlift', sets: '3x 6 cada perna', note: 'Uma perna, halteres', muscleGroup: 'Posterior' },
      { id: 58, name: 'Cossack Squat', sets: '3x 6 cada lado', note: 'Agachamento lateral', muscleGroup: 'Pernas' },
      { id: 59, name: 'Calf Jump', sets: '4x 10 reps', note: 'Salto só com panturrilha', muscleGroup: 'Panturrilha' },
      { id: 60, name: 'L-Sit', sets: '3x máx tempo', note: 'Suspenso com pernas estendidas', muscleGroup: 'Core' }
    ]
  },
  {
    id: 'week4-b',
    week: 4,
    type: 'B',
    title: 'Semana 4 - Treino B',
    subtitle: 'Pico - Membros Superiores',
    exercises: [
      { id: 61, name: 'Supino 1.5', sets: '4x 6 reps', note: 'Descer, subir meio, descer, subir', muscleGroup: 'Peito' },
      { id: 62, name: 'Weighted Pull-up', sets: '4x 5-6 reps', note: 'Com peso adicional', muscleGroup: 'Costas' },
      { id: 63, name: 'Handstand Push-up', sets: '3x máx reps', note: 'Na parede, assistido', muscleGroup: 'Ombros' },
      { id: 64, name: 'Renegade Row', sets: '3x 8 cada braço', note: 'Prancha + remada', muscleGroup: 'Costas' },
      { id: 65, name: 'Drag Curl', sets: '3x 8-10 reps', note: 'Arrastar barra pelo corpo', muscleGroup: 'Bíceps' },
      { id: 66, name: 'Diamond Push-up', sets: '3x máx reps', note: 'Mãos em diamante', muscleGroup: 'Tríceps' }
    ]
  },
  {
    id: 'week4-c',
    week: 4,
    type: 'C',
    title: 'Semana 4 - Treino C',
    subtitle: 'Pico - Funcional BJJ',
    exercises: [
      { id: 67, name: 'Deadlift 1.5', sets: '4x 5 reps', note: 'Subir, descer meio, subir', muscleGroup: 'Posterior' },
      { id: 68, name: 'Sprawls', sets: '4x 12-15 reps', note: 'Movimento de defesa de queda', muscleGroup: 'Cardio' },
      { id: 69, name: 'Archer Pull-up', sets: '3x 3 cada lado', note: 'Um braço mais que o outro', muscleGroup: 'Costas' },
      { id: 70, name: 'Shrimp Squat', sets: '3x 3 cada perna', note: 'Agachamento em uma perna', muscleGroup: 'Pernas' },
      { id: 71, name: 'Towel Pull-ups', sets: '3x máx reps', note: 'Pendurar em toalhas', muscleGroup: 'Pegada' },
      { id: 72, name: 'Turkish Get-up', sets: '3x 3 cada lado', note: 'Movimento completo com peso', muscleGroup: 'Core' }
    ]
  }
];

export const getCurrentWeekWorkouts = (currentWeek: number): Workout[] => {
  return workoutProgram.filter(workout => workout.week === currentWeek);
};

export const getWorkoutById = (id: string): Workout | undefined => {
  return workoutProgram.find(workout => workout.id === id);
};
