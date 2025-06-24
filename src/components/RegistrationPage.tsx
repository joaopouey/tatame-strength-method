
import { useState } from "react";
import { toast } from "sonner";
import { AccountStep } from "./registration/AccountStep";
import { BasicInfoStep } from "./registration/BasicInfoStep";
import { GoalsStep } from "./registration/GoalsStep";
import { HealthStep } from "./registration/HealthStep";
import { ProgressIndicator } from "./registration/ProgressIndicator";
import { RegistrationHeader } from "./registration/RegistrationHeader";
import { RegistrationNavigation } from "./registration/RegistrationNavigation";
import { useRegistrationData } from "@/hooks/useRegistrationData";
import { handleRegistration } from "@/services/registrationService";

interface RegistrationPageProps {
  onComplete: () => void;
}

export const RegistrationPage = ({ onComplete }: RegistrationPageProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const registrationData = useRegistrationData();

  const handleFinishRegistration = async () => {
    if (registrationData.password !== registrationData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (registrationData.password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);
    
    const success = await handleRegistration({
      email: registrationData.email,
      password: registrationData.password,
      fullName: registrationData.fullName,
      age: registrationData.age,
      weight: registrationData.weight,
      height: registrationData.height,
      sex: registrationData.sex,
      jiujitsuExperience: registrationData.jiujitsuExperience,
      trainingGoals: registrationData.trainingGoals,
      availableTime: registrationData.availableTime,
      injuries: registrationData.injuries,
      limitations: registrationData.limitations,
      medicalConditions: registrationData.medicalConditions,
      supplements: registrationData.supplements,
      additionalInfo: registrationData.additionalInfo,
    });

    setLoading(false);
    
    if (success) {
      onComplete();
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!registrationData.email || !registrationData.password || !registrationData.confirmPassword || !registrationData.fullName) {
        toast.error("Por favor, preencha todos os campos");
        return;
      }
      if (registrationData.password !== registrationData.confirmPassword) {
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
            fullName={registrationData.fullName}
            setFullName={registrationData.setFullName}
            email={registrationData.email}
            setEmail={registrationData.setEmail}
            password={registrationData.password}
            setPassword={registrationData.setPassword}
            confirmPassword={registrationData.confirmPassword}
            setConfirmPassword={registrationData.setConfirmPassword}
          />
        );
      case 2:
        return (
          <BasicInfoStep
            age={registrationData.age}
            setAge={registrationData.setAge}
            weight={registrationData.weight}
            setWeight={registrationData.setWeight}
            height={registrationData.height}
            setHeight={registrationData.setHeight}
            sex={registrationData.sex}
            setSex={registrationData.setSex}
            activityLevel={registrationData.activityLevel}
            setActivityLevel={registrationData.setActivityLevel}
            jiujitsuExperience={registrationData.jiujitsuExperience}
            setJiujitsuExperience={registrationData.setJiujitsuExperience}
          />
        );
      case 3:
        return (
          <GoalsStep
            trainingGoals={registrationData.trainingGoals}
            handleGoalChange={registrationData.handleGoalChange}
            availableTime={registrationData.availableTime}
            setAvailableTime={registrationData.setAvailableTime}
            preferredDays={registrationData.preferredDays}
            handleDayChange={registrationData.handleDayChange}
          />
        );
      case 4:
        return (
          <HealthStep
            injuries={registrationData.injuries}
            setInjuries={registrationData.setInjuries}
            limitations={registrationData.limitations}
            setLimitations={registrationData.setLimitations}
            medicalConditions={registrationData.medicalConditions}
            setMedicalConditions={registrationData.setMedicalConditions}
            supplements={registrationData.supplements}
            setSupplements={registrationData.setSupplements}
            additionalInfo={registrationData.additionalInfo}
            setAdditionalInfo={registrationData.setAdditionalInfo}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <RegistrationHeader currentStep={currentStep} totalSteps={4} />

      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <ProgressIndicator currentStep={currentStep} totalSteps={4} />
          {renderCurrentStep()}
          <RegistrationNavigation
            currentStep={currentStep}
            totalSteps={4}
            onPrevStep={prevStep}
            onNextStep={nextStep}
            onFinish={handleFinishRegistration}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};
