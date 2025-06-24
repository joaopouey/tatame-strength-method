
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface RegistrationNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  onFinish: () => void;
  loading: boolean;
}

export const RegistrationNavigation = ({
  currentStep,
  totalSteps,
  onPrevStep,
  onNextStep,
  onFinish,
  loading,
}: RegistrationNavigationProps) => {
  return (
    <div className="flex justify-between mt-6">
      <Button
        variant="outline"
        onClick={onPrevStep}
        disabled={currentStep === 1}
      >
        <ArrowLeft className="mr-2" size={16} />
        Voltar
      </Button>

      {currentStep < totalSteps ? (
        <Button onClick={onNextStep}>
          Próximo
        </Button>
      ) : (
        <Button onClick={onFinish} disabled={loading}>
          {loading ? "Criando conta..." : "Finalizar Cadastro"}
        </Button>
      )}
    </div>
  );
};
