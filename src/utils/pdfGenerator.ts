
import jsPDF from 'jspdf';
import { workouts } from '../data/workouts';

export const generateWorkoutPDF = () => {
  const doc = new jsPDF();
  let yPosition = 20;
  const pageHeight = doc.internal.pageSize.height;
  const margin = 20;
  const lineHeight = 6;

  // Função para adicionar nova página se necessário
  const checkPageBreak = (neededSpace: number = 20) => {
    if (yPosition + neededSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = 20;
    }
  };

  // Título principal
  doc.setFontSize(20);
  doc.setFont(undefined, 'bold');
  doc.text('Programa de Treinos BJJ - 24 Semanas', margin, yPosition);
  yPosition += 15;

  // Resumo do programa
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text('6 Fases de 4 semanas cada:', margin, yPosition);
  yPosition += 10;

  const phases = [
    '1. Adaptação Anatômica (Semanas 1-4)',
    '2. Força Base (Semanas 5-8)', 
    '3. Força Específica (Semanas 9-12)',
    '4. Pico de Força (Semanas 13-16)',
    '5. Força Avançada (Semanas 17-20)',
    '6. Potência (Semanas 21-24)'
  ];

  phases.forEach(phase => {
    doc.text(phase, margin + 5, yPosition);
    yPosition += lineHeight;
  });

  yPosition += 10;

  // Organizar treinos por semana
  const weeklyWorkouts = {};
  workouts.forEach(workout => {
    if (!weeklyWorkouts[workout.week]) {
      weeklyWorkouts[workout.week] = [];
    }
    weeklyWorkouts[workout.week].push(workout);
  });

  // Gerar conteúdo por semana
  for (let week = 1; week <= 24; week++) {
    checkPageBreak(40);
    
    // Título da semana
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`SEMANA ${week}`, margin, yPosition);
    yPosition += 10;

    const currentWeekWorkouts = weeklyWorkouts[week] || [];
    const strengthWorkouts = currentWeekWorkouts.filter(w => w.type === 'strength');
    const mobilityWorkouts = currentWeekWorkouts.filter(w => w.type === 'mobility');

    // Treinos de força
    if (strengthWorkouts.length > 0) {
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('TREINOS DE FORÇA:', margin, yPosition);
      yPosition += 8;

      strengthWorkouts.forEach((workout, index) => {
        checkPageBreak(30);
        
        doc.setFont(undefined, 'bold');
        doc.text(`Dia ${workout.dayNumber} - ${workout.subtitle}`, margin + 5, yPosition);
        yPosition += lineHeight;

        workout.exercises.forEach(exercise => {
          checkPageBreak(15);
          
          doc.setFont(undefined, 'normal');
          doc.text(`• ${exercise.name}`, margin + 10, yPosition);
          yPosition += lineHeight;
          
          doc.text(`  ${exercise.sets}`, margin + 15, yPosition);
          yPosition += lineHeight;
          
          doc.text(`  RPE: ${exercise.rpeGuidance}`, margin + 15, yPosition);
          yPosition += lineHeight;
          
          yPosition += 2;
        });
        
        yPosition += 5;
      });
    }

    // Treinos de mobilidade
    if (mobilityWorkouts.length > 0) {
      checkPageBreak(20);
      
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('TREINOS DE MOBILIDADE:', margin, yPosition);
      yPosition += 8;

      mobilityWorkouts.slice(0, 1).forEach((workout, index) => {
        checkPageBreak(25);
        
        doc.setFont(undefined, 'bold');
        doc.text(`Dia ${workout.dayNumber} - ${workout.subtitle}`, margin + 5, yPosition);
        yPosition += lineHeight;

        workout.exercises.forEach(exercise => {
          checkPageBreak(10);
          
          doc.setFont(undefined, 'normal');
          doc.text(`• ${exercise.name}`, margin + 10, yPosition);
          yPosition += lineHeight;
          
          doc.text(`  ${exercise.sets}`, margin + 15, yPosition);
          yPosition += lineHeight;
        });
        
        yPosition += 5;
      });
    }

    yPosition += 10;
  }

  // Salvar o PDF
  doc.save('programa-treinos-bjj-24-semanas.pdf');
};
