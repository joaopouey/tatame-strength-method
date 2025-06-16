
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, User, Lock, FileText, Target, Activity, Heart, Calendar, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
        // Save anamnesis data
        const { error: anamnesisError } = await supabase
          .from('anamnesis')
          .insert([
            {
              user_id: data.user.id,
              age: parseInt(age),
              weight: parseFloat(weight),
              height: parseFloat(height),
              activity_level: activityLevel,
              jiujitsu_experience: jiujitsuExperience,
              training_goals: trainingGoals,
              available_time: availableTime[0],
              preferred_days: preferredDays,
              injuries,
              limitations,
              medical_conditions: medicalConditions,
              supplements,
              additional_info: additionalInfo
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

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="text-primary" size={24} />
          Criar sua Conta
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="fullName">Nome Completo</Label>
          <Input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Seu nome completo"
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
        </div>
        <div>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Digite a senha novamente"
          />
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="text-primary" size={24} />
          Informações Básicas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="age">Idade</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Anos"
            />
          </div>
          <div>
            <Label htmlFor="weight">Peso</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="kg"
            />
          </div>
          <div>
            <Label htmlFor="height">Altura</Label>
            <Input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="cm"
            />
          </div>
        </div>

        <div>
          <Label>Nível de Atividade Física</Label>
          <RadioGroup value={activityLevel} onValueChange={setActivityLevel}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sedentario" id="sedentario" />
              <Label htmlFor="sedentario">Sedentário</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="leve" id="leve" />
              <Label htmlFor="leve">Levemente ativo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="moderado" id="moderado" />
              <Label htmlFor="moderado">Moderadamente ativo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="muito" id="muito" />
              <Label htmlFor="muito">Muito ativo</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label>Experiência com Jiu-Jitsu</Label>
          <RadioGroup value={jiujitsuExperience} onValueChange={setJiujitsuExperience}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="iniciante" id="iniciante" />
              <Label htmlFor="iniciante">Iniciante (0-1 ano)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediario" id="intermediario" />
              <Label htmlFor="intermediario">Intermediário (1-3 anos)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="avancado" id="avancado" />
              <Label htmlFor="avancado">Avançado (3+ anos)</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="text-primary" size={24} />
          Objetivos e Disponibilidade
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Objetivos de Treino (selecione todos que se aplicam)</Label>
          <div className="space-y-2 mt-2">
            {["Perda de peso", "Ganho de massa muscular", "Melhora do condicionamento", "Força funcional", "Flexibilidade", "Melhora técnica no JJ"].map((goal) => (
              <div key={goal} className="flex items-center space-x-2">
                <Checkbox 
                  id={goal}
                  checked={trainingGoals.includes(goal)}
                  onCheckedChange={(checked) => handleGoalChange(goal, checked as boolean)}
                />
                <Label htmlFor={goal}>{goal}</Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Tempo disponível para treino (minutos por sessão)</Label>
          <div className="mt-2">
            <Slider
              value={availableTime}
              onValueChange={setAvailableTime}
              max={180}
              min={30}
              step={15}
              className="w-full"
            />
            <div className="text-center mt-2 text-sm text-muted-foreground">
              {availableTime[0]} minutos
            </div>
          </div>
        </div>

        <div>
          <Label>Dias preferidos para treino</Label>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day) => (
              <div key={day} className="flex items-center space-x-2">
                <Checkbox 
                  id={day}
                  checked={preferredDays.includes(day)}
                  onCheckedChange={(checked) => handleDayChange(day, checked as boolean)}
                />
                <Label htmlFor={day} className="text-sm">{day}</Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="text-primary" size={24} />
          Informações de Saúde
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="injuries">Lesões ou problemas físicos atuais</Label>
          <Textarea
            id="injuries"
            value={injuries}
            onChange={(e) => setInjuries(e.target.value)}
            placeholder="Descreva qualquer lesão ou problema físico que possa afetar o treino"
          />
        </div>

        <div>
          <Label htmlFor="limitations">Limitações físicas</Label>
          <Textarea
            id="limitations"
            value={limitations}
            onChange={(e) => setLimitations(e.target.value)}
            placeholder="Exercícios ou movimentos que não pode realizar"
          />
        </div>

        <div>
          <Label htmlFor="medicalConditions">Condições médicas</Label>
          <Textarea
            id="medicalConditions"
            value={medicalConditions}
            onChange={(e) => setMedicalConditions(e.target.value)}
            placeholder="Diabetes, hipertensão, problemas cardíacos, etc."
          />
        </div>

        <div>
          <Label htmlFor="supplements">Suplementos em uso</Label>
          <Textarea
            id="supplements"
            value={supplements}
            onChange={(e) => setSupplements(e.target.value)}
            placeholder="Liste suplementos, medicamentos ou substâncias que utiliza"
          />
        </div>

        <div>
          <Label htmlFor="additionalInfo">Informações adicionais</Label>
          <Textarea
            id="additionalInfo"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Qualquer outra informação que considere importante"
          />
        </div>
      </CardContent>
    </Card>
  );

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
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step <= currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

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
