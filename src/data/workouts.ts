export interface Exercise {
  id: number;
  name: string;
  sets: string;
  rpeGuidance: string;
  bjjBenefit: string;
  note?: string;
}

export interface Workout {
  id: string;
  title: string;
  subtitle: string;
  type: 'strength' | 'mobility';
  week: number;
  dayNumber: number;
  exercises: Exercise[];
}

// Base exercises for strength workouts
const strengthExercisesWeek1Day1: Exercise[] = [
  {
    id: 1,
    name: 'Supino Reto com Barra',
    sets: '3 séries de 6-8 reps',
    rpeGuidance: 'Ajuste a carga para RPE 7-8 na última repetição de cada série.',
    bjjBenefit: 'Fortalece os músculos do peito, ombros e tríceps, essenciais para empurrar e controlar o oponente no jiu-jitsu.',
    note: 'Mantenha a postura correta e controle a descida da barra.'
  },
  {
    id: 2,
    name: 'Remada Curvada com Barra',
    sets: '3 séries de 6-8 reps',
    rpeGuidance: 'Ajuste a carga para RPE 7-8 na última repetição de cada série.',
    bjjBenefit: 'Fortalece os músculos das costas e bíceps, importantes para puxar e manter a postura durante a luta.',
    note: 'Mantenha a coluna reta e puxe a barra em direção ao abdômen.'
  },
  {
    id: 3,
    name: 'Agachamento Livre',
    sets: '3 séries de 8-10 reps',
    rpeGuidance: 'Ajuste a carga para RPE 7-8 na última repetição de cada série.',
    bjjBenefit: 'Fortalece as pernas e o core, proporcionando base sólida e potência para movimentos de projeção e defesa de quedas.',
    note: 'Mantenha a postura correta e desça até a linha dos joelhos.'
  },
  {
    id: 4,
    name: 'Desenvolvimento Militar com Barra',
    sets: '3 séries de 6-8 reps',
    rpeGuidance: 'Ajuste a carga para RPE 7-8 na última repetição de cada série.',
    bjjBenefit: 'Fortalece os ombros e o core, melhorando a estabilidade e a força para controlar o oponente em posições de domínio.',
    note: 'Mantenha a postura correta e controle a descida da barra.'
  },
  {
    id: 5,
    name: 'Barra Fixa',
    sets: '3 séries até a falha',
    rpeGuidance: 'Tente alcançar o máximo de repetições possíveis em cada série.',
    bjjBenefit: 'Fortalece os músculos das costas, ombros e bíceps, essenciais para puxar e controlar o oponente, além de melhorar a força de pegada.',
    note: 'Se necessário, utilize uma assistência para realizar o movimento completo.'
  }
];

const strengthExercisesWeek1Day2: Exercise[] = [
  {
    id: 6,
    name: 'Levantamento Terra',
    sets: '1 série de 5 reps, 1 série de 3 reps, 1 série de 1 rep',
    rpeGuidance: 'Ajuste a carga para RPE 7 na série de 5, RPE 8 na série de 3 e RPE 9 na série de 1.',
    bjjBenefit: 'Fortalece todo o corpo, melhorando a força e a potência para movimentos de projeção, raspagem e finalização.',
    note: 'Mantenha a postura correta e utilize a técnica adequada para evitar lesões.'
  },
  {
    id: 7,
    name: 'Supino Inclinado com Halteres',
    sets: '3 séries de 8-10 reps',
    rpeGuidance: 'Ajuste a carga para RPE 7-8 na última repetição de cada série.',
    bjjBenefit: 'Fortalece os músculos do peito, ombros e tríceps, importantes para empurrar e controlar o oponente em posições de domínio.',
    note: 'Mantenha a postura correta e controle a descida dos halteres.'
  },
  {
    id: 8,
    name: 'Remada Serrote com Haltere',
    sets: '3 séries de 8-10 reps',
    rpeGuidance: 'Ajuste a carga para RPE 7-8 na última repetição de cada série.',
    bjjBenefit: 'Fortalece os músculos das costas e bíceps, importantes para puxar e manter a postura durante a luta.',
    note: 'Mantenha a coluna reta e puxe o haltere em direção ao abdômen.'
  },
  {
    id: 9,
    name: 'Agachamento Frontal com Barra',
    sets: '3 séries de 8-10 reps',
    rpeGuidance: 'Ajuste a carga para RPE 7-8 na última repetição de cada série.',
    bjjBenefit: 'Fortalece as pernas e o core, proporcionando base sólida e potência para movimentos de projeção e defesa de quedas.',
    note: 'Mantenha a postura correta e desça até a linha dos joelhos.'
  },
  {
    id: 10,
    name: 'Desenvolvimento com Halteres',
    sets: '3 séries de 8-10 reps',
    rpeGuidance: 'Ajuste a carga para RPE 7-8 na última repetição de cada série.',
    bjjBenefit: 'Fortalece os ombros e o core, melhorando a estabilidade e a força para controlar o oponente em posições de domínio.',
    note: 'Mantenha a postura correta e controle a descida dos halteres.'
  }
];

const strengthExercisesWeek1Day3: Exercise[] = [
  {
    id: 11,
    name: 'Paralelas',
    sets: '3 séries até a falha',
    rpeGuidance: 'Tente alcançar o máximo de repetições possíveis em cada série.',
    bjjBenefit: 'Fortalece os músculos do peito, ombros e tríceps, essenciais para empurrar e controlar o oponente no jiu-jitsu.',
    note: 'Se necessário, utilize uma assistência para realizar o movimento completo.'
  },
  {
    id: 12,
    name: 'Remada Alta com Barra',
    sets: '3 séries de 8-10 reps',
    rpeGuidance: 'Ajuste a carga para RPE 7-8 na última repetição de cada série.',
    bjjBenefit: 'Fortalece os músculos das costas e ombros, importantes para puxar e manter a postura durante a luta.',
    note: 'Mantenha a coluna reta e puxe a barra em direção ao queixo.'
  },
  {
    id: 13,
    name: 'Avanço com Halteres',
    sets: '3 séries de 10-12 reps por perna',
    rpeGuidance: 'Ajuste a carga para RPE 7-8 na última repetição de cada série.',
    bjjBenefit: 'Fortalece as pernas e o core, proporcionando base sólida e potência para movimentos de projeção e defesa de quedas.',
    note: 'Mantenha a postura correta e controle o movimento.'
  },
  {
    id: 14,
    name: 'Elevação Lateral com Halteres',
    sets: '3 séries de 10-12 reps',
    rpeGuidance: 'Ajuste a carga para RPE 7-8 na última repetição de cada série.',
    bjjBenefit: 'Fortalece os ombros, melhorando a estabilidade e a força para controlar o oponente em posições de domínio.',
    note: 'Mantenha a postura correta e controle a descida dos halteres.'
  },
  {
    id: 15,
    name: 'Rosca Direta com Barra',
    sets: '3 séries de 8-10 reps',
    rpeGuidance: 'Ajuste a carga para RPE 7-8 na última repetição de cada série.',
    bjjBenefit: 'Fortalece os bíceps, importantes para puxar e controlar o oponente, além de melhorar a força de pegada.',
    note: 'Mantenha a postura correta e controle o movimento.'
  }
];

const mobilityExercisesDay1: Exercise[] = [
  {
    id: 16,
    name: 'Alongamento de Peito na Porta',
    sets: '3 séries de 30 segundos',
    rpeGuidance: 'Mantenha um alongamento leve a moderado, sem sentir dor.',
    bjjBenefit: 'Melhora a mobilidade do peito e ombros, facilitando a movimentação e a defesa em posições de pressão.',
    note: 'Mantenha a postura correta e respire fundo durante o alongamento.'
  },
  {
    id: 17,
    name: 'Alongamento de Costas com Rotação',
    sets: '3 séries de 30 segundos por lado',
    rpeGuidance: 'Mantenha um alongamento leve a moderado, sem sentir dor.',
    bjjBenefit: 'Melhora a mobilidade da coluna vertebral, facilitando a movimentação e a defesa em posições de pressão.',
    note: 'Mantenha a postura correta e respire fundo durante o alongamento.'
  },
  {
    id: 18,
    name: 'Alongamento de Quadril com Rotação',
    sets: '3 séries de 30 segundos por lado',
    rpeGuidance: 'Mantenha um alongamento leve a moderado, sem sentir dor.',
    bjjBenefit: 'Melhora a mobilidade do quadril, facilitando a movimentação e a defesa em posições de pressão.',
    note: 'Mantenha a postura correta e respire fundo durante o alongamento.'
  },
  {
    id: 19,
    name: 'Alongamento de Isquiotibiais Sentado',
    sets: '3 séries de 30 segundos',
    rpeGuidance: 'Mantenha um alongamento leve a moderado, sem sentir dor.',
    bjjBenefit: 'Melhora a flexibilidade dos isquiotibiais, facilitando a movimentação e a defesa em posições de pressão.',
    note: 'Mantenha a postura correta e respire fundo durante o alongamento.'
  },
  {
    id: 20,
    name: 'Alongamento de Panturrilha em Pé',
    sets: '3 séries de 30 segundos por perna',
    rpeGuidance: 'Mantenha um alongamento leve a moderado, sem sentir dor.',
    bjjBenefit: 'Melhora a flexibilidade da panturrilha, facilitando a movimentação e a defesa em posições de pressão.',
    note: 'Mantenha a postura correta e respire fundo durante o alongamento.'
  }
];

const mobilityExercisesDay2: Exercise[] = [
  {
    id: 21,
    name: 'Rotação de Ombros com Bastão',
    sets: '3 séries de 10 repetições',
    rpeGuidance: 'Mantenha um movimento suave e controlado, sem sentir dor.',
    bjjBenefit: 'Melhora a mobilidade dos ombros, facilitando a movimentação e a defesa em posições de pressão.',
    note: 'Mantenha a postura correta e respire fundo durante o movimento.'
  },
  {
    id: 22,
    name: 'Rotação de Tronco Sentado',
    sets: '3 séries de 10 repetições por lado',
    rpeGuidance: 'Mantenha um movimento suave e controlado, sem sentir dor.',
    bjjBenefit: 'Melhora a mobilidade da coluna vertebral, facilitando a movimentação e a defesa em posições de pressão.',
    note: 'Mantenha a postura correta e respire fundo durante o movimento.'
  },
  {
    id: 23,
    name: 'Rotação de Quadril em Pé',
    sets: '3 séries de 10 repetições por lado',
    rpeGuidance: 'Mantenha um movimento suave e controlado, sem sentir dor.',
    bjjBenefit: 'Melhora a mobilidade do quadril, facilitando a movimentação e a defesa em posições de pressão.',
    note: 'Mantenha a postura correta e respire fundo durante o movimento.'
  },
  {
    id: 24,
    name: 'Flexão Lateral do Tronco em Pé',
    sets: '3 séries de 10 repetições por lado',
    rpeGuidance: 'Mantenha um movimento suave e controlado, sem sentir dor.',
    bjjBenefit: 'Melhora a flexibilidade lateral do tronco, facilitando a movimentação e a defesa em posições de pressão.',
    note: 'Mantenha a postura correta e respire fundo durante o movimento.'
  },
  {
    id: 25,
    name: 'Círculos com o Tornozelo',
    sets: '3 séries de 10 repetições por lado',
    rpeGuidance: 'Mantenha um movimento suave e controlado, sem sentir dor.',
    bjjBenefit: 'Melhora a mobilidade do tornozelo, facilitando a movimentação e a defesa em posições de pressão.',
    note: 'Mantenha a postura correta e respire fundo durante o movimento.'
  }
];

const mobilityExercisesDay3: Exercise[] = [
  {
    id: 26,
    name: 'Mobilização de Punho',
    sets: '3 séries de 10 repetições em cada direção',
    rpeGuidance: 'Mantenha um movimento suave e controlado, sem sentir dor.',
    bjjBenefit: 'Melhora a mobilidade dos punhos, importante para a pegada e defesa em diversas posições.',
    note: 'Realize movimentos de flexão, extensão, pronação, supinação e círculos.'
  },
  {
    id: 27,
    name: 'Alongamento Dinâmico de Perna',
    sets: '3 séries de 10 repetições em cada perna',
    rpeGuidance: 'Mantenha um movimento suave e controlado, sem sentir dor.',
    bjjBenefit: 'Prepara a musculatura para o exercício, aumentando a flexibilidade e amplitude de movimento.',
    note: 'Realize movimentos de balanço para frente, para trás e lateralmente.'
  },
  {
    id: 28,
    name: 'Gato-Camelo',
    sets: '3 séries de 10 repetições',
    rpeGuidance: 'Mantenha um movimento suave e controlado, sem sentir dor.',
    bjjBenefit: 'Aumenta a mobilidade da coluna vertebral, importante para a postura e prevenção de lesões.',
    note: 'Alterne entre as posições de flexão e extensão da coluna.'
  },
  {
    id: 29,
    name: 'Mobilidade de Tornozelo com Joelho na Parede',
    sets: '3 séries de 10 repetições em cada perna',
    rpeGuidance: 'Mantenha um movimento suave e controlado, sem sentir dor.',
    bjjBenefit: 'Melhora a mobilidade do tornozelo, importante para a movimentação e equilíbrio.',
    note: 'Aproxime o joelho da parede sem levantar o calcanhar do chão.'
  },
  {
    id: 30,
    name: 'Liberação Miofascial com Rolo (Panturrilha)',
    sets: '3 séries de 30 segundos em cada perna',
    rpeGuidance: 'Aplique uma pressão moderada e role lentamente sobre a musculatura.',
    bjjBenefit: 'Ajuda a relaxar a musculatura e melhorar a circulação, auxiliando na recuperação e prevenção de lesões.',
    note: 'Role o rolo sobre a panturrilha, buscando pontos de tensão.'
  }
];

// Function to generate workouts for all 24 weeks
const generateWorkouts = (): Workout[] => {
  const workouts: Workout[] = [];
  let exerciseIdCounter = 31; // Start after the existing exercises

  for (let week = 1; week <= 24; week++) {
    // Calculate phase based on 4-week cycles
    const phase = Math.ceil(week / 4);
    const weekInPhase = ((week - 1) % 4) + 1;
    
    // Determine progression multipliers
    const intensityMultiplier = 1 + (phase - 1) * 0.1;
    const phaseDescription = getPhaseDescription(phase, weekInPhase);

    // Generate strength workouts
    for (let day = 1; day <= 3; day++) {
      const baseExercises = day === 1 ? strengthExercisesWeek1Day1 : 
                           day === 2 ? strengthExercisesWeek1Day2 : 
                           strengthExercisesWeek1Day3;
      
      const progressedExercises = baseExercises.map(exercise => ({
        ...exercise,
        id: exerciseIdCounter++,
        sets: progressSets(exercise.sets, phase, weekInPhase),
        rpeGuidance: progressRPE(exercise.rpeGuidance, phase, weekInPhase)
      }));

      workouts.push({
        id: `strength-week${week}-day${day}`,
        title: 'Treino de Força',
        subtitle: `Semana ${week} - Dia ${day} - ${phaseDescription}`,
        type: 'strength',
        week,
        dayNumber: day,
        exercises: progressedExercises
      });
    }

    // Generate mobility workouts
    for (let day = 1; day <= 3; day++) {
      const baseExercises = day === 1 ? mobilityExercisesDay1 : 
                           day === 2 ? mobilityExercisesDay2 : 
                           mobilityExercisesDay3;
      
      const progressedExercises = baseExercises.map(exercise => ({
        ...exercise,
        id: exerciseIdCounter++
      }));

      workouts.push({
        id: `mobility-week${week}-day${day}`,
        title: 'Treino de Mobilidade',
        subtitle: `Semana ${week} - Dia ${day} - ${phaseDescription}`,
        type: 'mobility',
        week,
        dayNumber: day,
        exercises: progressedExercises
      });
    }
  }

  return workouts;
};

// Helper functions for progression
const getPhaseDescription = (phase: number, weekInPhase: number): string => {
  const phaseNames = {
    1: 'Adaptação Anatômica',
    2: 'Força Base',
    3: 'Força Específica',
    4: 'Pico de Força',
    5: 'Força Avançada',
    6: 'Potência'
  };
  
  const weekDescriptions = {
    1: 'Introdução',
    2: 'Progressão',
    3: 'Intensificação',
    4: 'Pico'
  };

  return `${phaseNames[phase as keyof typeof phaseNames] || 'Especialização'} - ${weekDescriptions[weekInPhase as keyof typeof weekDescriptions]}`;
};

const progressSets = (originalSets: string, phase: number, weekInPhase: number): string => {
  // Progressive overload logic
  if (originalSets.includes('6-8 reps')) {
    if (phase === 1) return originalSets;
    if (phase === 2) return originalSets.replace('6-8 reps', '5-7 reps');
    if (phase === 3) return originalSets.replace('6-8 reps', '4-6 reps');
    return originalSets.replace('6-8 reps', '3-5 reps');
  }
  
  if (originalSets.includes('8-10 reps')) {
    if (phase === 1) return originalSets;
    if (phase === 2) return originalSets.replace('8-10 reps', '6-8 reps');
    if (phase === 3) return originalSets.replace('8-10 reps', '5-7 reps');
    return originalSets.replace('8-10 reps', '4-6 reps');
  }
  
  return originalSets;
};

const progressRPE = (originalRPE: string, phase: number, weekInPhase: number): string => {
  if (phase <= 2) return originalRPE;
  if (phase === 3) return originalRPE.replace('RPE 7-8', 'RPE 8-9');
  return originalRPE.replace('RPE 7-8', 'RPE 9');
};

export const workouts: Workout[] = generateWorkouts();

export const getWorkoutById = (id: string): Workout | undefined => {
  return workouts.find(workout => workout.id === id);
};

export const getWorkoutsByFrequency = (week: number, frequency: 2 | 3 | 4): Workout[] => {
  // Filter workouts by week
  const weekWorkouts = workouts.filter(workout => workout.week === week);
  
  // Based on frequency, return appropriate workouts
  if (frequency === 2) {
    // For 2x per week: 1 strength + 1 mobility
    return [
      weekWorkouts.find(w => w.type === 'strength') || weekWorkouts[0],
      weekWorkouts.find(w => w.type === 'mobility') || weekWorkouts[1]
    ].filter(Boolean);
  } else if (frequency === 3) {
    // For 3x per week: 2 strength + 1 mobility
    const strengthWorkouts = weekWorkouts.filter(w => w.type === 'strength').slice(0, 2);
    const mobilityWorkouts = weekWorkouts.filter(w => w.type === 'mobility').slice(0, 1);
    return [...strengthWorkouts, ...mobilityWorkouts];
  } else if (frequency === 4) {
    // For 4x per week: 3 strength + 1 mobility
    const strengthWorkouts = weekWorkouts.filter(w => w.type === 'strength');
    const mobilityWorkouts = weekWorkouts.filter(w => w.type === 'mobility').slice(0, 1);
    return [...strengthWorkouts, ...mobilityWorkouts];
  }
  
  return weekWorkouts;
};
