export interface Exercise {
  id: number;
  name: string;
  sets: string;
  note?: string;
  rpeGuidance: string;
  bjjBenefit?: string;
}

export interface Workout {
  id: string;
  title: string;
  subtitle: string;
  week: number;
  dayNumber: number;
  type: string;
  exercises: Exercise[];
}

export const workouts = [
  {
    id: "week1-day1",
    title: "Dia 1 - Base de Força",
    subtitle: "Semana 1 • Força",
    week: 1,
    dayNumber: 1,
    type: "força",
    exercises: [
      {
        id: 1,
        name: "Agachamento Livre",
        sets: "4 séries de 8-10 repetições",
        rpeGuidance: "Comece com 70% da carga máxima, ajuste para RPE 7-8",
        bjjBenefit: "Fortalece pernas e core, essencial para base defensiva, takedowns e movimentos de guarda."
      },
      {
        id: 2,
        name: "Supino Reto",
        sets: "4 séries de 8-10 repetições",
        rpeGuidance: "Use 70-75% da carga máxima, mantenha RPE 7-8",
        bjjBenefit: "Desenvolve força de empurrada, importante para escapar de montadas e controlar oponentes."
      },
      {
        id: 3,
        name: "Puxada Alta",
        sets: "3 séries de 10-12 repetições",
        rpeGuidance: "Ajuste para RPE 7, foque na técnica",
        bjjBenefit: "Fortalece músculos das costas, crucial para grips, puxadas e controle de posição."
      },
      {
        id: 4,
        name: "Desenvolvimento",
        sets: "3 séries de 10-12 repetições",
        rpeGuidance: "Use carga moderada, RPE 6-7",
        bjjBenefit: "Fortalece ombros para frames, underhooks e movimentos de braço em geral."
      }
    ]
  },
  {
    id: "week1-day2",
    title: "Dia 2 - Resistência",
    subtitle: "Semana 1 • Resistência",
    week: 1,
    dayNumber: 2,
    type: "resistência",
    exercises: [
      {
        id: 5,
        name: "Leg Press",
        sets: "3 séries de 15-20 repetições",
        rpeGuidance: "Carga moderada, RPE 6-7, foque na resistência",
        bjjBenefit: "Desenvolve resistência das pernas para guardas longas e movimentos repetitivos."
      },
      {
        id: 6,
        name: "Remada Curvada",
        sets: "3 séries de 12-15 repetições",
        rpeGuidance: "RPE 6-7, mantenha boa postura",
        bjjBenefit: "Fortalece posteriores e melhora postura, essencial para controle de grips e puxadas."
      },
      {
        id: 7,
        name: "Rosca Direta",
        sets: "3 séries de 12-15 repetições",
        rpeGuidance: "Carga leve a moderada, RPE 6",
        bjjBenefit: "Fortalece bíceps para grips mais duradouros e movimentos de puxada."
      },
      {
        id: 8,
        name: "Tríceps Testa",
        sets: "3 séries de 12-15 repetições",
        rpeGuidance: "Foque na técnica, RPE 6-7",
        bjjBenefit: "Desenvolve tríceps para frames, empurrões e extensão de braços."
      }
    ]
  },
  {
    id: "week2-day1",
    title: "Dia 1 - Força Avançada",
    subtitle: "Semana 2 • Força",
    week: 2,
    dayNumber: 1,
    type: "força",
    exercises: [
      {
        id: 9,
        name: "Agachamento Frontal",
        sets: "4 séries de 6-8 repetições",
        rpeGuidance: "Use 75-80% da carga máxima, RPE 8",
        bjjBenefit: "Aumenta a força do core e das pernas, melhorando a estabilidade em posições de luta."
      },
      {
        id: 10,
        name: "Supino Inclinado",
        sets: "4 séries de 6-8 repetições",
        rpeGuidance: "75-80% da carga máxima, RPE 8",
        bjjBenefit: "Focaliza a parte superior do peitoral, útil para empurrar e criar espaço em lutas de solo."
      },
      {
        id: 11,
        name: "Barra Fixa",
        sets: "3 séries até a falha",
        rpeGuidance: "Tente o máximo de repetições possíveis, RPE 9",
        bjjBenefit: "Fortalece costas e bíceps, essencial para puxar o oponente e manter o controle."
      },
      {
        id: 12,
        name: "Desenvolvimento Militar",
        sets: "3 séries de 8-10 repetições",
        rpeGuidance: "Use carga desafiadora, RPE 7-8",
        bjjBenefit: "Aumenta a força dos ombros para controlar a postura do oponente e defender quedas."
      }
    ]
  },
  {
    id: "week2-day2",
    title: "Dia 2 - Resistência Muscular",
    subtitle: "Semana 2 • Resistência",
    week: 2,
    dayNumber: 2,
    type: "resistência",
    exercises: [
      {
        id: 13,
        name: "Afundo",
        sets: "3 séries de 15-20 repetições por perna",
        rpeGuidance: "Mantenha o equilíbrio, RPE 6-7",
        bjjBenefit: "Melhora a estabilidade e resistência das pernas, importante para movimentação e base."
      },
      {
        id: 14,
        name: "Remada Serrote",
        sets: "3 séries de 15-20 repetições por braço",
        rpeGuidance: "Concentre-se na forma, RPE 6-7",
        bjjBenefit: "Fortalece os músculos das costas individualmente, melhorando o equilíbrio e a força de puxada."
      },
      {
        id: 15,
        name: "Rosca Alternada",
        sets: "3 séries de 15-20 repetições por braço",
        rpeGuidance: "Use carga leve, RPE 5-6",
        bjjBenefit: "Aumenta a resistência dos bíceps para manter os grips por mais tempo."
      },
      {
        id: 16,
        name: "Tríceps Francês",
        sets: "3 séries de 15-20 repetições",
        rpeGuidance: "Controle o movimento, RPE 6-7",
        bjjBenefit: "Fortalece os tríceps para empurrar e criar espaço, útil para escapar de posições desfavoráveis."
      }
    ]
  },
  {
    id: "week3-day1",
    title: "Dia 1 - Potência",
    subtitle: "Semana 3 • Potência",
    week: 3,
    dayNumber: 1,
    type: "potência",
    exercises: [
      {
        id: 17,
        name: "Salto na Caixa",
        sets: "3 séries de 5-8 repetições",
        rpeGuidance: "Foco na explosão, RPE 8",
        bjjBenefit: "Desenvolve a potência das pernas para takedowns rápidos e escapes explosivos."
      },
      {
        id: 18,
        name: "Arremesso de Medicine Ball",
        sets: "3 séries de 8-10 repetições",
        rpeGuidance: "Use força máxima, RPE 8",
        bjjBenefit: "Melhora a potência do core e a capacidade de gerar força em movimentos de arremesso."
      },
      {
        id: 19,
        name: "Remada Explosiva",
        sets: "3 séries de 8-10 repetições",
        rpeGuidance: "Puxe com força, RPE 7-8",
        bjjBenefit: "Aumenta a potência dos músculos das costas para puxar o oponente e controlar a luta."
      },
      {
        id: 20,
        name: "Desenvolvimento com Salto",
        sets: "3 séries de 5-8 repetições",
        rpeGuidance: "Coordene o movimento, RPE 7-8",
        bjjBenefit: "Desenvolve a potência dos ombros e a coordenação para defender quedas e controlar a postura."
      }
    ]
  },
  {
    id: "week3-day2",
    title: "Dia 2 - Mobilidade e Flexibilidade",
    subtitle: "Semana 3 • Recuperação Ativa",
    week: 3,
    dayNumber: 2,
    type: "recuperação",
    exercises: [
      {
        id: 21,
        name: "Alongamento de Isquiotibiais",
        sets: "3 séries de 30 segundos por perna",
        rpeGuidance: "Alongue até sentir, RPE 3",
        bjjBenefit: "Aumenta a flexibilidade dos isquiotibiais, melhorando a capacidade de movimentação e evitando lesões."
      },
      {
        id: 22,
        name: "Rotação de Tronco",
        sets: "3 séries de 10 repetições para cada lado",
        rpeGuidance: "Gire suavemente, RPE 2-3",
        bjjBenefit: "Melhora a mobilidade do tronco, facilitando a rotação e a defesa em posições de luta."
      },
      {
        id: 23,
        name: "Alongamento de Ombros",
        sets: "3 séries de 30 segundos por braço",
        rpeGuidance: "Alongue até sentir, RPE 3",
        bjjBenefit: "Aumenta a flexibilidade dos ombros, melhorando a capacidade de defender quedas e controlar a postura."
      },
      {
        id: 24,
        name: "Mobilidade de Quadril",
        sets: "3 séries de 10 repetições para cada lado",
        rpeGuidance: "Mova-se suavemente, RPE 2-3",
        bjjBenefit: "Melhora a mobilidade do quadril, facilitando a movimentação e a defesa em posições de guarda."
      }
    ]
  }
];

export const getWorkoutById = (id: string) => {
  return workouts.find((workout) => workout.id === id);
};
