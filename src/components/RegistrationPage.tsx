
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
  const [activityLevel, setActivityLevel] = useState("");
  const [jiujitsuExperience, setJiujitsuExperience] = useState("");
  const [trainingGoals, setTrainingGoals] = useState<string[]>([]);
  const [availableTime, setAvailableTime] = useState([60]);
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
        toast.error("Erro ao criar conta: " + error.message);
        return;
      }

      if (data.user) {
        // Save anamnesis data with correct field mapping
        const { error: anamnesisError } = await supabase
          .from('anamnesis')
          .insert([
            {
              user_id: data.user.id,
              age: parseInt(age) || null,
              weight: parseFloat(weight) || null,
              height: parseFloat(height) || null,
              bjj_experience: jiujitsuExperience,
              training_goals: trainingGoals.join(', '), // Convert array to string
              training_frequency: availableTime[0],
              current_injuries: injuries,
              past_injuries: limitations,
              health_conditions: medicalConditions,
              medications: supplements,
              additional_notes: additionalInfo
            }
          ]);

        if (anamnesisError) {
          console.error('Error saving anamnesis:', anamnesisError);
          toast.error("Erro ao salvar anamnese");
          return;
        }

        toast.success("Conta criada com sucesso!");
        onComplete();
      }
    } catch (error) {
      console.error('Registration error:', error);
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
