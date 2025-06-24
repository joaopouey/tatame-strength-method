
interface RegistrationHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export const RegistrationHeader = ({ currentStep, totalSteps }: RegistrationHeaderProps) => {
  return (
    <header className="p-4 border-b border-border">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary">ForçaJJ</h1>
        <div className="text-sm text-muted-foreground">
          Passo {currentStep} de {totalSteps}
        </div>
      </div>
    </header>
  );
};
