
-- Limpar exercícios existentes se houver
DELETE FROM public.exercises;

-- Inserir exercícios de força em português
INSERT INTO public.exercises (name, description, muscle_groups, equipment, difficulty_level, instructions) VALUES
('Supino Reto com Barra', 'Exercício fundamental para fortalecimento do peitoral, ombros e tríceps', ARRAY['Peitoral', 'Tríceps', 'Deltoides'], 'Barra livre e banco', 'Intermediário', 'Deite no banco, posicione a barra na altura do peito, empurre para cima mantendo controle total do movimento'),
('Remada Curvada com Barra', 'Exercício para desenvolvimento das costas e bíceps', ARRAY['Latíssimo', 'Romboides', 'Bíceps'], 'Barra livre', 'Intermediário', 'Mantenha a coluna reta, curve o tronco e puxe a barra em direção ao abdômen'),
('Agachamento Livre', 'Exercício fundamental para fortalecimento das pernas e core', ARRAY['Quadríceps', 'Glúteos', 'Core'], 'Barra livre', 'Intermediário', 'Posicione a barra nos ombros, desça mantendo os joelhos alinhados com os pés até a linha dos joelhos'),
('Desenvolvimento Militar com Barra', 'Exercício para fortalecimento dos ombros e core', ARRAY['Deltoides', 'Core', 'Tríceps'], 'Barra livre', 'Intermediário', 'Em pé, empurre a barra verticalmente acima da cabeça mantendo o core contraído'),
('Barra Fixa', 'Exercício para fortalecimento das costas e bíceps', ARRAY['Latíssimo', 'Bíceps', 'Romboides'], 'Barra fixa', 'Intermediário', 'Pendure na barra e puxe o corpo até o queixo passar da barra'),
('Levantamento Terra', 'Exercício completo para todo o corpo', ARRAY['Posterior de coxa', 'Glúteos', 'Costas', 'Core'], 'Barra livre', 'Avançado', 'Mantenha a postura correta, levante a barra do chão até ficar em pé completamente'),
('Supino Inclinado com Halteres', 'Exercício para parte superior do peitoral', ARRAY['Peitoral', 'Deltoides', 'Tríceps'], 'Halteres e banco inclinado', 'Intermediário', 'No banco inclinado, empurre os halteres para cima controlando a descida'),
('Remada Serrote com Haltere', 'Exercício unilateral para as costas', ARRAY['Latíssimo', 'Romboides', 'Bíceps'], 'Haltere e banco', 'Iniciante', 'Apoie um joelho no banco, puxe o haltere em direção ao quadril'),
('Agachamento Frontal com Barra', 'Variação do agachamento com foco no quadríceps', ARRAY['Quadríceps', 'Core', 'Glúteos'], 'Barra livre', 'Avançado', 'Posicione a barra na frente dos ombros, agache mantendo o tronco ereto'),
('Desenvolvimento com Halteres', 'Exercício para ombros com maior amplitude', ARRAY['Deltoides', 'Tríceps'], 'Halteres', 'Iniciante', 'Sentado ou em pé, empurre os halteres verticalmente acima da cabeça'),
('Paralelas', 'Exercício para tríceps e peitoral', ARRAY['Tríceps', 'Peitoral', 'Deltoides'], 'Barras paralelas', 'Intermediário', 'Apoie o corpo nas barras, desça flexionando os braços e empurre para subir'),
('Remada Alta com Barra', 'Exercício para parte superior das costas', ARRAY['Trapézio', 'Deltoides', 'Bíceps'], 'Barra livre', 'Intermediário', 'Puxe a barra verticalmente até a altura do queixo mantendo os cotovelos altos'),
('Avanço com Halteres', 'Exercício unilateral para pernas', ARRAY['Quadríceps', 'Glúteos', 'Core'], 'Halteres', 'Iniciante', 'Dê um passo à frente, desça o joelho traseiro quase até o chão'),
('Elevação Lateral com Halteres', 'Exercício isolado para ombros', ARRAY['Deltoides'], 'Halteres', 'Iniciante', 'Eleve os halteres lateralmente até a altura dos ombros'),
('Rosca Direta com Barra', 'Exercício isolado para bíceps', ARRAY['Bíceps'], 'Barra livre ou EZ', 'Iniciante', 'Flexione os braços elevando a barra em direção ao peito');

-- Inserir exercícios de mobilidade em português
INSERT INTO public.exercises (name, description, muscle_groups, equipment, difficulty_level, instructions) VALUES
('Alongamento de Peito na Porta', 'Alongamento para abertura do peitoral', ARRAY['Peitoral', 'Deltoides'], 'Porta', 'Iniciante', 'Apoie o braço na parede/porta e gire o corpo para o lado oposto'),
('Alongamento de Costas com Rotação', 'Mobilidade da coluna vertebral', ARRAY['Coluna', 'Oblíquos'], 'Sem equipamento', 'Iniciante', 'Sentado, gire o tronco para um lado mantendo os quadris fixos'),
('Alongamento de Quadril com Rotação', 'Mobilidade do quadril', ARRAY['Quadril', 'Glúteos'], 'Sem equipamento', 'Iniciante', 'Deitado, puxe o joelho em direção ao peito oposto'),
('Alongamento de Isquiotibiais Sentado', 'Flexibilidade posterior das pernas', ARRAY['Isquiotibiais'], 'Sem equipamento', 'Iniciante', 'Sentado, estenda uma perna e incline o tronco à frente'),
('Alongamento de Panturrilha em Pé', 'Flexibilidade da panturrilha', ARRAY['Panturrilha'], 'Parede', 'Iniciante', 'Apoie as mãos na parede, estenda uma perna para trás mantendo o calcanhar no chão'),
('Rotação de Ombros com Bastão', 'Mobilidade dos ombros', ARRAY['Ombros', 'Manguito rotador'], 'Bastão ou cabo de vassoura', 'Iniciante', 'Segure o bastão com as duas mãos e faça círculos amplos'),
('Rotação de Tronco Sentado', 'Mobilidade da coluna', ARRAY['Coluna', 'Oblíquos'], 'Sem equipamento', 'Iniciante', 'Sentado, gire o tronco alternadamente para cada lado'),
('Rotação de Quadril em Pé', 'Mobilidade do quadril', ARRAY['Quadril'], 'Sem equipamento', 'Iniciante', 'Em pé, faça círculos com o quadril em ambas as direções'),
('Flexão Lateral do Tronco em Pé', 'Flexibilidade lateral', ARRAY['Oblíquos', 'Quadrado lombar'], 'Sem equipamento', 'Iniciante', 'Em pé, incline o tronco lateralmente elevando o braço oposto'),
('Círculos com o Tornozelo', 'Mobilidade do tornozelo', ARRAY['Tornozelo'], 'Sem equipamento', 'Iniciante', 'Sentado ou deitado, faça círculos com o pé em ambas as direções'),
('Mobilização de Punho', 'Mobilidade dos punhos', ARRAY['Punhos', 'Antebraços'], 'Sem equipamento', 'Iniciante', 'Realize movimentos de flexão, extensão e rotação dos punhos'),
('Alongamento Dinâmico de Perna', 'Aquecimento dinâmico', ARRAY['Pernas'], 'Sem equipamento', 'Iniciante', 'Realize balanços controlados com as pernas em várias direções'),
('Gato-Camelo', 'Mobilidade da coluna vertebral', ARRAY['Coluna'], 'Sem equipamento', 'Iniciante', 'Em quatro apoios, alterne entre flexão e extensão da coluna'),
('Mobilidade de Tornozelo com Joelho na Parede', 'Mobilidade específica do tornozelo', ARRAY['Tornozelo', 'Panturrilha'], 'Parede', 'Iniciante', 'Aproxime o joelho da parede sem levantar o calcanhar'),
('Liberação Miofascial com Rolo (Panturrilha)', 'Liberação muscular', ARRAY['Panturrilha'], 'Rolo de liberação miofascial', 'Iniciante', 'Role o rolo sobre a panturrilha aplicando pressão moderada');
