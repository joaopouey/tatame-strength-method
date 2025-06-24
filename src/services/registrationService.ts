
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RegistrationData {
  email: string;
  password: string;
  fullName: string;
  age: string;
  weight: string;
  height: string;
  sex: string;
  jiujitsuExperience: string;
  trainingGoals: string[];
  availableTime: number[];
  injuries: string;
  limitations: string;
  medicalConditions: string;
  supplements: string;
  additionalInfo: string;
}

export const handleRegistration = async (data: RegistrationData) => {
  const {
    email,
    password,
    fullName,
    age,
    weight,
    height,
    sex,
    jiujitsuExperience,
    trainingGoals,
    availableTime,
    injuries,
    limitations,
    medicalConditions,
    supplements,
    additionalInfo,
  } = data;

  try {
    console.log("Iniciando criação de conta...");
    
    // Primeiro, criamos a conta
    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      console.error('Erro no signup:', error);
      toast.error("Erro ao criar conta: " + error.message);
      return false;
    }

    console.log("Conta criada, usuário:", signUpData.user?.id);

    if (signUpData.user) {
      // Agora fazemos login para ter uma sessão válida
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        console.error('Erro no signin:', signInError);
        toast.error("Erro ao fazer login: " + signInError.message);
        return false;
      }

      console.log("Login realizado, sessão:", signInData.session?.user?.id);

      // Agora salvamos a anamnese com o usuário autenticado
      const anamnesisData = {
        user_id: signInData.session!.user.id,
        age: age ? parseInt(age) : null,
        weight: weight ? parseFloat(weight) : null,
        height: height ? parseFloat(height) : null,
        sex: sex || null,
        bjj_experience: jiujitsuExperience || null,
        training_goals: trainingGoals.length > 0 ? trainingGoals.join(', ') : null,
        training_frequency: availableTime[0] || null,
        current_injuries: injuries || null,
        past_injuries: limitations || null,
        health_conditions: medicalConditions || null,
        medications: supplements || null,
        additional_notes: additionalInfo || null
      };

      console.log("Salvando anamnese:", anamnesisData);

      const { error: anamnesisError } = await supabase
        .from('anamnesis')
        .insert([anamnesisData]);

      if (anamnesisError) {
        console.error('Erro ao salvar anamnese:', anamnesisError);
        toast.error("Erro ao salvar anamnese: " + anamnesisError.message);
        return false;
      }

      console.log("Anamnese salva com sucesso");
      toast.success("Conta criada com sucesso!");
      return true;
    }
  } catch (error) {
    console.error('Erro inesperado:', error);
    toast.error("Erro inesperado ao criar conta");
    return false;
  }

  return false;
};
