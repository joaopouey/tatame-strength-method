
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FileText } from "lucide-react";

interface BasicInfoStepProps {
  age: string;
  setAge: (value: string) => void;
  weight: string;
  setWeight: (value: string) => void;
  height: string;
  setHeight: (value: string) => void;
  activityLevel: string;
  setActivityLevel: (value: string) => void;
  jiujitsuExperience: string;
  setJiujitsuExperience: (value: string) => void;
}

export const BasicInfoStep = ({
  age,
  setAge,
  weight,
  setWeight,
  height,
  setHeight,
  activityLevel,
  setActivityLevel,
  jiujitsuExperience,
  setJiujitsuExperience,
}: BasicInfoStepProps) => {
  return (
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
};
