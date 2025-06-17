
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { AccountStep } from "./registration/AccountStep";
import { BasicInfoStep } from "./registration/BasicInfoStep";
import { GoalsStep } from "./registration/GoalsStep";
import { HealthStep } from "./registration/HealthStep";
import { ProgressIndicator } from "./registration/ProgressIndicator";

interface RegistrationPageProps {
  onComplete: () => void;
}

export const RegistrationPage = ({ onComplete }: RegistrationPageProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // User registration data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  
  // Anamnesis data
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [jiujitsuExperience, setJiujitsuExperience] = useState("");
  const [trainingGoals, setTrainingGoals] = useState<string[]>([]);
  const [availableTime, setAvailableTime] = useState([45]);
  const [preferredDays, setPreferredDays] = useState<string[]>([]);
  const [injuries, setInjuries] = useState("");
  const [limitations, setLimitations] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [supplements, setSupplements] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleGoalChange = (goal: string, checked: boolean) => {
    if (checked) {
      setTrainingGoals([...trainingGoals, goal]);
    } else {
      setTrainingGoals(trainingGoals.filter(g => g !== goal));
    }
  };

  const handleDayChange = (day: string, checked: boolean) => {
    if (checked) {
      setPreferredDays([...preferredDays, day]);
    } else {
      setPreferredDays(preferredDays.filter(d => d !== day));
    }
  };

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);
    
    try {
      console.log("Iniciando criação de conta...");
      
      // Primeiro, criamos a conta
      const { data, error } = await supabase.auth.signUp({
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
        return;
      }

      console.log("Conta criada, usuário:", data.user?.id);

      if (data.user) {
        // Agora fazemos login para ter uma sessão válida
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) {
          console.error('Erro no signin:', signInError);
          toast.error("Erro ao fazer login: " + signInError.message);
          return;
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
          return;
        }

        console.log("Anamnese salva com sucesso");
        toast.success("Conta criada com sucesso!");
        onComplete();
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast.error("Erro inesperado ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!email || !password || !confirmPassword || !fullName) {
        toast.error("Por favor, preencha todos os campos");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("As senhas não coincidem");
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccountStep
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        );
      case 2:
        return (
          <BasicInfoStep
            age={age}
            setAge={setAge}
            weight={weight}
            setWeight={setWeight}
            height={height}
            setHeight={setHeight}
            sex={sex}
            setSex={setSex}
            activityLevel={activityLevel}
            setActivityLevel={setActivityLevel}
            jiujitsuExperience={jiujitsuExperience}
            setJiujitsuExperience={setJiujitsuExperience}
          />
        );
      case 3:
        return (
          <GoalsStep
            trainingGoals={trainingGoals}
            handleGoalChange={handleGoalChange}
            availableTime={availableTime}
            setAvailableTime={setAvailableTime}
            preferredDays={preferredDays}
            handleDayChange={handleDayChange}
          />
        );
      case 4:
        return (
          <HealthStep
            injuries={injuries}
            setInjuries={setInjuries}
            limitations={limitations}
            setLimitations={setLimitations}
            medicalConditions={medicalConditions}
            setMedicalConditions={setMedicalConditions}
            supplements={supplements}
            setSupplements={setSupplements}
            additionalInfo={additionalInfo}
            setAdditionalInfo={setAdditionalInfo}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="p-4 border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">ForçaJJ</h1>
          <div className="text-sm text-muted-foreground">
            Passo {currentStep} de 4
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <ProgressIndicator currentStep={currentStep} totalSteps={4} />

          {renderCurrentStep()}

          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="mr-2" size={16} />
              Voltar
            </Button>

            {currentStep < 4 ? (
              <Button onClick={nextStep}>
                Próximo
              </Button>
            ) : (
              <Button onClick={handleRegistration} disabled={loading}>
                {loading ? "Criando conta..." : "Finalizar Cadastro"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
