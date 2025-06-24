
-- Criar tabela para os exercícios (biblioteca de exercícios)
CREATE TABLE public.exercises (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  muscle_groups TEXT[],
  equipment TEXT,
  difficulty_level TEXT,
  video_url TEXT,
  instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para os treinos/workouts
CREATE TABLE public.workouts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  workout_name TEXT NOT NULL,
  workout_type TEXT,
  week_number INTEGER,
  day_number INTEGER,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para registrar a execução dos exercícios
CREATE TABLE public.exercise_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  workout_id UUID REFERENCES public.workouts,
  exercise_id UUID REFERENCES public.exercises,
  exercise_name TEXT NOT NULL, -- para casos onde o exercício não está na biblioteca
  sets_completed INTEGER,
  reps_completed INTEGER,
  weight_used DECIMAL(5,2), -- peso em kg
  rpe_score INTEGER CHECK (rpe_score >= 1 AND rpe_score <= 10), -- escala RPE de 1 a 10
  notes TEXT,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS nas tabelas
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_logs ENABLE ROW LEVEL SECURITY;

-- Políticas para exercises (leitura pública, escrita apenas para admins)
CREATE POLICY "Anyone can view exercises" ON public.exercises FOR SELECT USING (true);
CREATE POLICY "Only authenticated users can insert exercises" ON public.exercises FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Políticas para workouts (usuários podem ver apenas seus próprios workouts)
CREATE POLICY "Users can view their own workouts" ON public.workouts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own workouts" ON public.workouts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own workouts" ON public.workouts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own workouts" ON public.workouts FOR DELETE USING (auth.uid() = user_id);

-- Políticas para exercise_logs (usuários podem ver apenas seus próprios logs)
CREATE POLICY "Users can view their own exercise logs" ON public.exercise_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own exercise logs" ON public.exercise_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own exercise logs" ON public.exercise_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own exercise logs" ON public.exercise_logs FOR DELETE USING (auth.uid() = user_id);

-- Inserir alguns exercícios de exemplo
INSERT INTO public.exercises (name, description, muscle_groups, equipment, difficulty_level) VALUES
('Agachamento Livre', 'Exercício fundamental para fortalecimento das pernas', ARRAY['Quadríceps', 'Glúteos', 'Core'], 'Barra livre', 'Intermediário'),
('Supino Reto', 'Exercício para desenvolvimento do peitoral', ARRAY['Peitoral', 'Tríceps', 'Deltoides'], 'Barra e banco', 'Intermediário'),
('Puxada Alta', 'Exercício para desenvolvimento das costas', ARRAY['Latíssimo', 'Bíceps', 'Romboides'], 'Polia alta', 'Iniciante'),
('Desenvolvimento', 'Exercício para ombros', ARRAY['Deltoides', 'Tríceps'], 'Halteres ou barra', 'Intermediário'),
('Remada Curvada', 'Exercício para costas e bíceps', ARRAY['Latíssimo', 'Romboides', 'Bíceps'], 'Barra livre', 'Intermediário'),
('Leg Press', 'Exercício para pernas com suporte', ARRAY['Quadríceps', 'Glúteos'], 'Leg Press', 'Iniciante'),
('Rosca Direta', 'Exercício isolado para bíceps', ARRAY['Bíceps'], 'Barra ou halteres', 'Iniciante'),
('Tríceps Testa', 'Exercício isolado para tríceps', ARRAY['Tríceps'], 'Barra W ou halteres', 'Iniciante');
