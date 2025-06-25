
import jsPDF from 'jspdf';
import { workoutsData } from '../data/workouts';

export const generateWorkoutPDF = () => {
  const doc = new jsPDF();
  
  // Título
  doc.setFontSize(20);
  doc.text('ForçaJJ - Programa de Treinos Completo', 20, 20);
  
  // Subtítulo
  doc.setFontSize(12);
  doc.text('Programa de 24 semanas para Jiu-Jitsu', 20, 30);
  
  let yPosition = 50;
  
  // Adicionar informações sobre as fases
  const phases = [
    { name: 'Fase 1 - Adaptação', weeks: '1-4', description: 'Adaptação anatômica e aprendizado técnico' },
    { name: 'Fase 2 - Força Base', weeks: '5-8', description: 'Desenvolvimento da força base' },
    { name: 'Fase 3 - Força Específica', weeks: '9-12', description: 'Força específica para BJJ' },
    { name: 'Fase 4 - Força Máxima', weeks: '13-16', description: 'Desenvolvimento da força máxima' },
    { name: 'Fase 5 - Força Avançada', weeks: '17-20', description: 'Técnicas avançadas de força' },
    { name: 'Fase 6 - Potência', weeks: '21-24', description: 'Desenvolvimento da potência' }
  ];
  
  doc.setFontSize(14);
  doc.text('Fases do Programa:', 20, yPosition);
  yPosition += 10;
  
  phases.forEach((phase) => {
    doc.setFontSize(10);
    doc.text(`${phase.name} (Semanas ${phase.weeks}): ${phase.description}`, 20, yPosition);
    yPosition += 8;
  });
  
  yPosition += 10;
  
  // Informações gerais
  doc.setFontSize(12);
  doc.text('Informações Gerais:', 20, yPosition);
  yPosition += 10;
  
  const generalInfo = [
    '• Programa desenvolvido especificamente para praticantes de Jiu-Jitsu',
    '• 6 treinos por semana (3 força + 3 mobilidade)',
    '• 24 semanas divididas em 6 fases progressivas',
    '• Exercícios focados em movimentos funcionais do BJJ',
    '• RPE (Rate of Perceived Exertion) como guia de intensidade'
  ];
  
  doc.setFontSize(10);
  generalInfo.forEach((info) => {
    doc.text(info, 20, yPosition);
    yPosition += 6;
  });
  
  yPosition += 10;
  
  // Estrutura semanal
  doc.setFontSize(12);
  doc.text('Estrutura Semanal:', 20, yPosition);
  yPosition += 10;
  
  const weekStructure = [
    'Segunda-feira: Treino de Força A + Mobilidade',
    'Terça-feira: Treino de Força B + Mobilidade',
    'Quarta-feira: Treino de Força C + Mobilidade',
    'Quinta-feira: Treino de Força A + Mobilidade',
    'Sexta-feira: Treino de Força B + Mobilidade',
    'Sábado: Treino de Força C + Mobilidade'
  ];
  
  doc.setFontSize(10);
  weekStructure.forEach((structure) => {
    doc.text(structure, 20, yPosition);
    yPosition += 6;
  });
  
  // Adicionar informação sobre download
  yPosition += 20;
  doc.setFontSize(10);
  doc.text('Para treinos detalhados, acesse o aplicativo ForçaJJ', 20, yPosition);
  doc.text('Este PDF contém a estrutura geral do programa', 20, yPosition + 10);
  
  // Salvar o PDF
  doc.save('forcajj-programa-treinos.pdf');
};
