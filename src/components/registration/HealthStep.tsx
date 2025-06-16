
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";

interface HealthStepProps {
  injuries: string;
  setInjuries: (value: string) => void;
  limitations: string;
  setLimitations: (value: string) => void;
  medicalConditions: string;
  setMedicalConditions: (value: string) => void;
  supplements: string;
  setSupplements: (value: string) => void;
  additionalInfo: string;
  setAdditionalInfo: (value: string) => void;
}

export const HealthStep = ({
  injuries,
  setInjuries,
  limitations,
  setLimitations,
  medicalConditions,
  setMedicalConditions,
  supplements,
  setSupplements,
  additionalInfo,
  setAdditionalInfo,
}: HealthStepProps) => {
  return (
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
};
