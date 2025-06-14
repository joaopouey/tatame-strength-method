export interface Exercise {
  id: number;
  name: string;
  sets: string;
  note?: string;
  muscleGroup: string;
  loadGuidance: string; // Nova propriedade para orientações de carga
  rpeGuidance: string;  // Nova propriedade para RPE (Rate of Perceived Exertion)
}

export interface Workout {
  id: string;
  week: number;
  type: 'A' | 'B' | 'C';
  title: string;
  subtitle: string;
  exercises: Exercise[];
  dayNumber: number; // Nova propriedade para indicar o dia
}

export const workoutProgram: Workout[] = [
  // Semana 1
  {
    id: 'week1-a',
    week: 1,
    type: 'A',
    title: 'Semana 1 - Treino A',
    subtitle: 'Força Base - Membros Inferiores',
    dayNumber: 1,
    exercises: [
      { 
        id: 1, 
        name: 'Agachamento Livre', 
        sets: '4x 8-10 reps', 
        note: 'Descer até 90° no joelho', 
        muscleGroup: 'Pernas',
        loadGuidance: '70-80% da sua força máxima estimada',
        rpeGuidance: 'RPE 7-8 (difícil, mas consegue fazer 2-3 reps a mais)'
      },
      { 
        id: 2, 
        name: 'Leg Press 45°', 
        sets: '3x 12-15 reps', 
        note: 'Amplitude completa', 
        muscleGroup: 'Pernas',
        loadGuidance: '60-70% da sua força máxima',
        rpeGuidance: 'RPE 6-7 (moderado a difícil)'
      },
      { 
        id: 3, 
        name: 'Stiff', 
        sets: '4x 10-12 reps', 
        note: 'Focar no alongamento do posterior', 
        muscleGroup: 'Posterior',
        loadGuidance: '50-60% da sua força máxima',
        rpeGuidance: 'RPE 6-7 (sinta o alongamento, não force)'
      },
      { 
        id: 4, 
        name: 'Afundo Caminhando', 
        sets: '3x 10 cada perna', 
        note: 'Manter tronco ereto', 
        muscleGroup: 'Pernas',
        loadGuidance: 'Peso corporal ou halteres de 10-20kg',
        rpeGuidance: 'RPE 6-7 (controle e equilíbrio são prioridades)'
      },
      { 
        id: 5, 
        name: 'Panturrilha em Pé', 
        sets: '4x 15-20 reps', 
        note: 'Pausa de 1s no topo', 
        muscleGroup: 'Panturrilha',
        loadGuidance: 'Peso que permita movimento controlado',
        rpeGuidance: 'RPE 7-8 (sinta a queimação nas últimas reps)'
      },
      { 
        id: 6, 
        name: 'Prancha', 
        sets: '3x 45-60s', 
        note: 'Manter alinhamento corporal', 
        muscleGroup: 'Core',
        loadGuidance: 'Peso corporal (progressão: elevar pés)',
        rpeGuidance: 'RPE 7-8 (tremor muscular é normal)'
      }
    ]
  },
  {
    id: 'week1-b',
    week: 1,
    type: 'B',
    title: 'Semana 1 - Treino B',
    subtitle: 'Força Base - Membros Superiores',
    dayNumber: 2,
    exercises: [
      { 
        id: 7, 
        name: 'Supino Reto', 
        sets: '4x 8-10 reps', 
        note: 'Controlar a descida', 
        muscleGroup: 'Peito',
        loadGuidance: '70-80% da sua força máxima',
        rpeGuidance: 'RPE 7-8 (difícil, mas técnica perfeita)'
      },
      { 
        id: 8, 
        name: 'Puxada Alta', 
        sets: '4x 10-12 reps', 
        note: 'Puxar até o peito', 
        muscleGroup: 'Costas',
        loadGuidance: '60-70% da sua força máxima',
        rpeGuidance: 'RPE 6-7 (sinta as costas trabalhando)'
      },
      { 
        id: 9, 
        name: 'Desenvolvimento', 
        sets: '3x 10-12 reps', 
        note: 'Não descer muito a barra', 
        muscleGroup: 'Ombros',
        loadGuidance: '50-60% da força do supino',
        rpeGuidance: 'RPE 6-7 (ombros são delicados, não force)'
      },
      { 
        id: 10, 
        name: 'Remada Curvada', 
        sets: '4x 10-12 reps', 
        note: 'Apertar as escápulas', 
        muscleGroup: 'Costas',
        loadGuidance: '60-70% da sua força máxima',
        rpeGuidance: 'RPE 7 (foque na contração das costas)'
      },
      { 
        id: 11, 
        name: 'Rosca Direta', 
        sets: '3x 12-15 reps', 
        note: 'Sem balançar o corpo', 
        muscleGroup: 'Bíceps',
        loadGuidance: '40-50% da força do supino',
        rpeGuidance: 'RPE 6-7 (movimento controlado)'
      },
      { 
        id: 12, 
        name: 'Tríceps Testa', 
        sets: '3x 12-15 reps', 
        note: 'Manter cotovelos fixos', 
        muscleGroup: 'Tríceps',
        loadGuidance: '30-40% da força do supino',
        rpeGuidance: 'RPE 6-7 (cotovelos são sensíveis)'
      }
    ]
  },
  {
    id: 'week1-c',
    week: 1,
    type: 'C',
    title: 'Semana 1 - Treino C',
    subtitle: 'Força Base - Funcional BJJ',
    dayNumber: 3,
    exercises: [
      { 
        id: 13, 
        name: 'Levantamento Terra', 
        sets: '4x 6-8 reps', 
        note: 'Manter coluna neutra', 
        muscleGroup: 'Posterior',
        loadGuidance: '80-90% da sua força máxima',
        rpeGuidance: 'RPE 8 (muito difícil, técnica impecável)'
      },
      { 
        id: 14, 
        name: 'Flexão de Braços', 
        sets: '3x máx reps', 
        note: 'Amplitude completa', 
        muscleGroup: 'Peito',
        loadGuidance: 'Peso corporal (progressão: pés elevados)',
        rpeGuidance: 'RPE 8-9 (até quase a falha muscular)'
      },
      { 
        id: 15, 
        name: 'Puxada Supinada', 
        sets: '4x 10-12 reps', 
        note: 'Focar na pegada', 
        muscleGroup: 'Costas',
        loadGuidance: '60-70% da sua força máxima',
        rpeGuidance: 'RPE 7 (trabalha pegada e costas)'
      },
      { 
        id: 16, 
        name: 'Agachamento Búlgaro', 
        sets: '3x 8 cada perna', 
        note: 'Pé de trás elevado', 
        muscleGroup: 'Pernas',
        loadGuidance: 'Peso corporal + halteres 10-20kg',
        rpeGuidance: 'RPE 7 (equilibrio e força)'
      },
      { 
        id: 17, 
        name: 'Farmer Walk', 
        sets: '3x 20m', 
        note: 'Manter postura ereta', 
        muscleGroup: 'Pegada',
        loadGuidance: '50-70% do seu peso corporal em cada mão',
        rpeGuidance: 'RPE 7-8 (pegada deve arder no final)'
      },
      { 
        id: 18, 
        name: 'Abdominal Remador', 
        sets: '3x 15-20 reps', 
        note: 'Controlar o movimento', 
        muscleGroup: 'Core',
        loadGuidance: 'Peso corporal ou anilha 5-10kg',
        rpeGuidance: 'RPE 7-8 (core deve tremer)'
      }
    ]
  },

  // Semana 2 - Continuando com a mesma estrutura...
  {
    id: 'week2-a',
    week: 2,
    type: 'A',
    title: 'Semana 2 - Treino A',
    subtitle: 'Progressão - Membros Inferiores',
    dayNumber: 1,
    exercises: [
      { 
        id: 19, 
        name: 'Agachamento Livre', 
        sets: '4x 6-8 reps', 
        note: 'Aumentar carga, manter técnica', 
        muscleGroup: 'Pernas',
        loadGuidance: '75-85% da sua força máxima (+5% da semana 1)',
        rpeGuidance: 'RPE 8 (mais pesado que semana 1)'
      },
      { 
        id: 20, 
        name: 'Leg Press 45°', 
        sets: '4x 10-12 reps', 
        note: 'Mais carga que semana 1', 
        muscleGroup: 'Pernas',
        loadGuidance: '65-75% da sua força máxima (+5-10kg)',
        rpeGuidance: 'RPE 7-8 (progressão controlada)'
      },
      { 
        id: 21, 
        name: 'Stiff', 
        sets: '4x 8-10 reps', 
        note: 'Aumentar amplitude', 
        muscleGroup: 'Posterior',
        loadGuidance: '55-65% da sua força máxima (+2-5kg)',
        rpeGuidance: 'RPE 7 (mais alongamento, mais carga)'
      },
      { 
        id: 22, 
        name: 'Agachamento Sumô', 
        sets: '3x 10-12 reps', 
        note: 'Pés mais abertos', 
        muscleGroup: 'Pernas',
        loadGuidance: '60-70% da força do agachamento normal',
        rpeGuidance: 'RPE 6-7 (nova variação, foque na técnica)'
      },
      { 
        id: 23, 
        name: 'Panturrilha Sentado', 
        sets: '4x 12-15 reps', 
        note: 'Alongar bem na descida', 
        muscleGroup: 'Panturrilha',
        loadGuidance: 'Carga que permita amplitude completa',
        rpeGuidance: 'RPE 7-8 (variação para trabalho completo)'
      },
      { 
        id: 24, 
        name: 'Prancha Lateral', 
        sets: '3x 30s cada lado', 
        note: 'Manter quadril alinhado', 
        muscleGroup: 'Core',
        loadGuidance: 'Peso corporal (progressão: braço elevado)',
        rpeGuidance: 'RPE 7-8 (laterais do core)'
      }
    ]
  },
  {
    id: 'week2-b',
    week: 2,
    type: 'B',
    title: 'Semana 2 - Treino B',
    subtitle: 'Progressão - Membros Superiores',
    dayNumber: 2,
    exercises: [
      { id: 25, name: 'Supino Inclinado', sets: '4x 8-10 reps', note: 'Inclinação de 30°', muscleGroup: 'Peito', loadGuidance: '70-80% da sua força máxima', rpeGuidance: 'RPE 7-8 (difícil, mas técnica perfeita)' },
      { id: 26, name: 'Remada no Cabo', sets: '4x 10-12 reps', note: 'Puxar até o abdômen', muscleGroup: 'Costas', loadGuidance: '60-70% da sua força máxima', rpeGuidance: 'RPE 6-7 (sinta as costas trabalhando)' },
      { id: 27, name: 'Desenvolvimento Halteres', sets: '3x 10-12 reps', note: 'Maior amplitude', muscleGroup: 'Ombros', loadGuidance: '50-60% da força do supino', rpeGuidance: 'RPE 6-7 (ombros são delicados, não force)' },
      { id: 28, name: 'Pullover', sets: '3x 12-15 reps', note: 'Expandir caixa torácica', muscleGroup: 'Peito', loadGuidance: '30-40% da força do supino', rpeGuidance: 'RPE 6-7 (alongamento e expansão)' },
      { id: 29, name: 'Rosca Martelo', sets: '3x 10-12 reps', note: 'Palmas voltadas para dentro', muscleGroup: 'Bíceps', loadGuidance: '30-40% da força do supino', rpeGuidance: 'RPE 6-7 (variação para o bíceps)' },
      { id: 30, name: 'Tríceps Corda', sets: '3x 12-15 reps', note: 'Abrir a corda na descida', muscleGroup: 'Tríceps', loadGuidance: '20-30% da força do supino', rpeGuidance: 'RPE 6-7 (foco na contração do tríceps)' }
    ]
  },
  {
    id: 'week2-c',
    week: 2,
    type: 'C',
    title: 'Semana 2 - Treino C',
    subtitle: 'Progressão - Funcional BJJ',
    dayNumber: 3,
    exercises: [
      { id: 31, name: 'Levantamento Terra', sets: '4x 5-6 reps', note: 'Aumentar carga', muscleGroup: 'Posterior', loadGuidance: '85-95% da sua força máxima', rpeGuidance: 'RPE 8-9 (muito difícil, técnica impecável)' },
      { id: 32, name: 'Flexão Diamante', sets: '3x máx reps', note: 'Mãos em formato de diamante', muscleGroup: 'Tríceps', loadGuidance: 'Peso corporal (mais difícil que a normal)', rpeGuidance: 'RPE 8-9 (até quase a falha muscular)' },
      { id: 33, name: 'Chin-up', sets: '3x máx reps', note: 'Pegada supinada', muscleGroup: 'Costas', loadGuidance: 'Peso corporal (progressão: adicionar peso)', rpeGuidance: 'RPE 8-9 (até quase a falha muscular)' },
      { id: 34, name: 'Pistol Squat', sets: '3x 5 cada perna', note: 'Assistido se necessário', muscleGroup: 'Pernas', loadGuidance: 'Peso corporal (assistência para iniciantes)', rpeGuidance: 'RPE 7-8 (equilíbrio e força)' },
      { id: 35, name: 'Plate Pinch', sets: '3x 30-45s', note: 'Apertar anilhas com dedos', muscleGroup: 'Pegada', loadGuidance: 'Anilhas de 5-10kg (comece leve)', rpeGuidance: 'RPE 7-8 (pegada deve arder)' },
      { id: 36, name: 'Russian Twist', sets: '3x 20 reps', note: 'Com peso se possível', muscleGroup: 'Core', loadGuidance: 'Peso corporal ou anilha 5-10kg', rpeGuidance: 'RPE 7-8 (core deve tremer)' }
    ]
  },

  // Semana 3
  {
    id: 'week3-a',
    week: 3,
    type: 'A',
    title: 'Semana 3 - Treino A',
    subtitle: 'Intensificação - Membros Inferiores',
    dayNumber: 1,
    exercises: [
      { id: 37, name: 'Agachamento Frontal', sets: '4x 6-8 reps', note: 'Barra na frente, trabalha core', muscleGroup: 'Pernas', loadGuidance: '70-80% da sua força máxima', rpeGuidance: 'RPE 7-8 (difícil, mas consegue fazer 2-3 reps a mais)' },
      { id: 38, name: 'Leg Press Unilateral', sets: '3x 8 cada perna', note: 'Uma perna por vez', muscleGroup: 'Pernas', loadGuidance: '50-60% da sua força máxima', rpeGuidance: 'RPE 6-7 (moderado a difícil)' },
      { id: 39, name: 'Stiff Unilateral', sets: '3x 8 cada perna', note: 'Equilíbrio e força', muscleGroup: 'Posterior', loadGuidance: '40-50% da sua força máxima', rpeGuidance: 'RPE 6-7 (sinta o alongamento, não force)' },
      { id: 40, name: 'Jump Squat', sets: '4x 8 reps', note: 'Explosão na subida', muscleGroup: 'Pernas', loadGuidance: 'Peso corporal ou halteres de 5-10kg', rpeGuidance: 'RPE 6-7 (controle e equilíbrio são prioridades)' },
      { id: 41, name: 'Panturrilha Box', sets: '4x 12-15 reps', note: 'Em cima de um step', muscleGroup: 'Panturrilha', loadGuidance: 'Peso que permita movimento controlado', rpeGuidance: 'RPE 7-8 (sinta a queimação nas últimas reps)' },
      { id: 42, name: 'Plank Up-Down', sets: '3x 10 reps', note: 'Alternar apoios', muscleGroup: 'Core', loadGuidance: 'Peso corporal (progressão: aumentar repetições)', rpeGuidance: 'RPE 7-8 (tremor muscular é normal)' }
    ]
  },
  {
    id: 'week3-b',
    week: 3,
    type: 'B',
    title: 'Semana 3 - Treino B',
    subtitle: 'Intensificação - Membros Superiores',
    dayNumber: 2,
    exercises: [
      { id: 43, name: 'Supino Declinado', sets: '4x 8-10 reps', note: 'Trabalha parte inferior do peito', muscleGroup: 'Peito', loadGuidance: '70-80% da sua força máxima', rpeGuidance: 'RPE 7-8 (difícil, mas técnica perfeita)' },
      { id: 44, name: 'Pull-up', sets: '4x máx reps', note: 'Pegada pronada', muscleGroup: 'Costas', loadGuidance: 'Peso corporal (progressão: adicionar peso)', rpeGuidance: 'RPE 8-9 (até quase a falha muscular)' },
      { id: 45, name: 'Arnold Press', sets: '3x 10-12 reps', note: 'Rotação dos halteres', muscleGroup: 'Ombros', loadGuidance: '50-60% da força do supino', rpeGuidance: 'RPE 6-7 (ombros são delicados, não force)' },
      { id: 46, name: 'Face Pull', sets: '3x 15-20 reps', note: 'Puxar para o rosto', muscleGroup: 'Ombros', loadGuidance: '20-30% da força do supino', rpeGuidance: 'RPE 6-7 (foco na postura e rotação)' },
      { id: 47, name: 'Rosca 21', sets: '2x 21 reps', note: '7+7+7 amplitude parcial/completa', muscleGroup: 'Bíceps', loadGuidance: '30-40% da força do supino', rpeGuidance: 'RPE 6-7 (movimento controlado)' },
      { id: 48, name: 'Close Grip Bench', sets: '3x 10-12 reps', note: 'Pegada fechada', muscleGroup: 'Tríceps', loadGuidance: '60-70% da força do supino', rpeGuidance: 'RPE 7-8 (cotovelos próximos ao corpo)' }
    ]
  },
  {
    id: 'week3-c',
    week: 3,
    type: 'C',
    title: 'Semana 3 - Treino C',
    subtitle: 'Intensificação - Funcional BJJ',
    dayNumber: 3,
    exercises: [
      { id: 49, name: 'Deadlift Sumo', sets: '4x 5-6 reps', note: 'Pés mais abertos', muscleGroup: 'Posterior', loadGuidance: '85-95% da sua força máxima', rpeGuidance: 'RPE 8-9 (muito difícil, técnica impecável)' },
      { id: 50, name: 'Burpees', sets: '4x 8-10 reps', note: 'Movimento completo', muscleGroup: 'Cardio', loadGuidance: 'Peso corporal', rpeGuidance: 'RPE 8-9 (cardio e força)' },
      { id: 51, name: 'Muscle-up', sets: '3x máx reps', note: 'Assistido se necessário', muscleGroup: 'Costas', loadGuidance: 'Peso corporal (assistência para iniciantes)', rpeGuidance: 'RPE 8-9 (força e técnica)' },
      { id: 52, name: 'Lunge com Rotação', sets: '3x 8 cada lado', note: 'Rotação do tronco', muscleGroup: 'Core', loadGuidance: 'Peso corporal ou halteres de 5-10kg', rpeGuidance: 'RPE 6-7 (equilíbrio e coordenação)' },
      { id: 53, name: 'Grip Crush', sets: '3x 10-15 reps', note: 'Apertar grip trainer', muscleGroup: 'Pegada', loadGuidance: 'Grip trainer com resistência ajustável', rpeGuidance: 'RPE 7-8 (pegada deve arder)' },
      { id: 54, name: 'Mountain Climbers', sets: '3x 20 reps', note: 'Ritmo acelerado', muscleGroup: 'Core', loadGuidance: 'Peso corporal', rpeGuidance: 'RPE 7-8 (cardio e core)' }
    ]
  },

  // Semana 4
  {
    id: 'week4-a',
    week: 4,
    type: 'A',
    title: 'Semana 4 - Treino A',
    subtitle: 'Pico - Membros Inferiores',
    dayNumber: 1,
    exercises: [
      { id: 55, name: 'Agachamento 1.5', sets: '4x 6 reps', note: 'Descer, subir meio, descer, subir', muscleGroup: 'Pernas', loadGuidance: '75-85% da sua força máxima', rpeGuidance: 'RPE 8-9 (muito difícil, técnica impecável)' },
      { id: 56, name: 'Box Jump', sets: '4x 6-8 reps', note: 'Salto em caixa alta', muscleGroup: 'Pernas', loadGuidance: 'Altura da caixa desafiadora, mas segura', rpeGuidance: 'RPE 7-8 (explosão e coordenação)' },
      { id: 57, name: 'Single Leg Deadlift', sets: '3x 6 cada perna', note: 'Uma perna, halteres', muscleGroup: 'Posterior', loadGuidance: '40-50% da sua força máxima', rpeGuidance: 'RPE 7-8 (equilíbrio e força)' },
      { id: 58, name: 'Cossack Squat', sets: '3x 6 cada lado', note: 'Agachamento lateral', muscleGroup: 'Pernas', loadGuidance: 'Peso corporal ou halteres de 5-10kg', rpeGuidance: 'RPE 7-8 (mobilidade e força)' },
      { id: 59, name: 'Calf Jump', sets: '4x 10 reps', note: 'Salto só com panturrilha', muscleGroup: 'Panturrilha', loadGuidance: 'Peso corporal', rpeGuidance: 'RPE 7-8 (sinta a queimação nas últimas reps)' },
      { id: 60, name: 'L-Sit', sets: '3x máx tempo', note: 'Suspenso com pernas estendidas', muscleGroup: 'Core', loadGuidance: 'Peso corporal', rpeGuidance: 'RPE 8-9 (força e controle)' }
    ]
  },
  {
    id: 'week4-b',
    week: 4,
    type: 'B',
    title: 'Semana 4 - Treino B',
    subtitle: 'Pico - Membros Superiores',
    dayNumber: 2,
    exercises: [
      { id: 61, name: 'Supino 1.5', sets: '4x 6 reps', note: 'Descer, subir meio, descer, subir', muscleGroup: 'Peito', loadGuidance: '75-85% da sua força máxima', rpeGuidance: 'RPE 8-9 (muito difícil, técnica impecável)' },
      { id: 62, name: 'Weighted Pull-up', sets: '4x 5-6 reps', note: 'Com peso adicional', muscleGroup: 'Costas', loadGuidance: 'Peso corporal + peso adicional', rpeGuidance: 'RPE 8-9 (até quase a falha muscular)' },
      { id: 63, name: 'Handstand Push-up', sets: '3x máx reps', note: 'Na parede, assistido', muscleGroup: 'Ombros', loadGuidance: 'Peso corporal (assistência para iniciantes)', rpeGuidance: 'RPE 8-9 (força e controle)' },
      { id: 64, name: 'Renegade Row', sets: '3x 8 cada braço', note: 'Prancha + remada', muscleGroup: 'Costas', loadGuidance: 'Halteres de 10-20kg', rpeGuidance: 'RPE 7-8 (equilíbrio e força)' },
      { id: 65, name: 'Drag Curl', sets: '3x 8-10 reps', note: 'Arrastar barra pelo corpo', muscleGroup: 'Bíceps', loadGuidance: '30-40% da força do supino', rpeGuidance: 'RPE 6-7 (movimento controlado)' },
      { id: 66, name: 'Diamond Push-up', sets: '3x máx reps', note: 'Mãos em diamante', muscleGroup: 'Tríceps', loadGuidance: 'Peso corporal (mais difícil que a normal)', rpeGuidance: 'RPE 8-9 (até quase a falha muscular)' }
    ]
  },
  {
    id: 'week4-c',
    week: 4,
    type: 'C',
    title: 'Semana 4 - Treino C',
    subtitle: 'Pico - Funcional BJJ',
    dayNumber: 3,
    exercises: [
      { id: 67, name: 'Deadlift 1.5', sets: '4x 5 reps', note: 'Subir, descer meio, subir', muscleGroup: 'Posterior', loadGuidance: '90-100% da sua força máxima', rpeGuidance: 'RPE 9 (muito difícil, técnica impecável)' },
      { id: 68, name: 'Sprawls', sets: '4x 12-15 reps', note: 'Movimento de defesa de queda', muscleGroup: 'Cardio', loadGuidance: 'Peso corporal', rpeGuidance: 'RPE 8-9 (cardio e agilidade)' },
      { id: 69, name: 'Archer Pull-up', sets: '3x 3 cada lado', note: 'Um braço mais que o outro', muscleGroup: 'Costas', loadGuidance: 'Peso corporal', rpeGuidance: 'RPE 8-9 (força e controle)' },
      { id: 70, name: 'Shrimp Squat', sets: '3x 3 cada perna', note: 'Agachamento em uma perna', muscleGroup: 'Pernas', loadGuidance: 'Peso corporal (assistência para iniciantes)', rpeGuidance: 'RPE 8-9 (equilíbrio e força)' },
      { id: 71, name: 'Towel Pull-ups', sets: '3x máx reps', note: 'Pendurar em toalhas', muscleGroup: 'Pegada', loadGuidance: 'Peso corporal', rpeGuidance: 'RPE 8-9 (pegada e força)' },
      { id: 72, name: 'Turkish Get-up', sets: '3x 3 cada lado', note: 'Movimento completo com peso', muscleGroup: 'Core', loadGuidance: 'Halteres de 5-10kg', rpeGuidance: 'RPE 8-9 (coordenação e força)' }
    ]
  }
];

export const getCurrentWeekWorkouts = (currentWeek: number): Workout[] => {
  return workoutProgram.filter(workout => workout.week === currentWeek);
};

export const getWorkoutById = (id: string): Workout | undefined => {
  return workoutProgram.find(workout => workout.id === id);
};

// Nova função para filtrar treinos baseado na frequência semanal escolhida
export const getWorkoutsByFrequency = (week: number, frequency: 2 | 3 | 4): Workout[] => {
  const weekWorkouts = getCurrentWeekWorkouts(week);
  
  switch (frequency) {
    case 2:
      return weekWorkouts.filter(w => w.type === 'A' || w.type === 'B');
    case 3:
      return weekWorkouts;
    case 4:
      // Para 4 dias, duplicamos alguns treinos (A, B, C, A)
      const baseWorkouts = weekWorkouts;
      const extraA = { ...baseWorkouts.find(w => w.type === 'A')!, dayNumber: 4 };
      return [...baseWorkouts, extraA];
    default:
      return weekWorkouts;
  }
};
