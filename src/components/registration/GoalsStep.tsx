
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Target } from "lucide-react";

interface GoalsStepProps {
  trainingGoals: string[];
  handleGoalChange: (goal: string, checked: boolean) => void;
  availableTime: number[];
  setAvailableTime: (value: number[]) => void;
  preferredDays: string[];
  handleDayChange: (day: string, checked: boolean) => void;
}

export const GoalsStep = ({
  trainingGoals,
  handleGoalChange,
  availableTime,
  setAvailableTime,
  preferredDays,
  handleDayChange,
}: GoalsStepProps) => {
  return (
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
};
