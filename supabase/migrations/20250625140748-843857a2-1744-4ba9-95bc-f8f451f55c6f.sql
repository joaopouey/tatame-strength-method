
-- Criar tabela de administradores
CREATE TABLE public.admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id),
  UNIQUE(email)
);

-- Habilitar RLS na tabela admins
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Política para admins verem apenas seus próprios dados
CREATE POLICY "Admins can view their own data" 
  ON public.admins 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Política para admins atualizarem apenas seus próprios dados
CREATE POLICY "Admins can update their own data" 
  ON public.admins 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Política para criação de novos admins (qualquer usuário autenticado pode se registrar como admin)
CREATE POLICY "Users can create admin accounts" 
  ON public.admins 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
