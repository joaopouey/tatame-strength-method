
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, X } from "lucide-react";

interface ExerciseVideoModalProps {
  exerciseName: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ExerciseVideoModal = ({ exerciseName, isOpen, onClose }: ExerciseVideoModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulando URLs de vídeo baseadas no nome do exercício
  const getVideoUrl = (name: string) => {
    const videoMap: { [key: string]: string } = {
      "Agachamento Livre": "https://player.vimeo.com/video/123456789",
      "Supino Reto": "https://player.vimeo.com/video/123456790",
      "Puxada Alta": "https://player.vimeo.com/video/123456791",
      "Desenvolvimento": "https://player.vimeo.com/video/123456792",
      "Remada Curvada": "https://player.vimeo.com/video/123456793",
      "Leg Press": "https://player.vimeo.com/video/123456794",
      "Rosca Direta": "https://player.vimeo.com/video/123456795",
      "Tríceps Testa": "https://player.vimeo.com/video/123456796",
    };
    return videoMap[name] || "https://player.vimeo.com/video/123456789";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{exerciseName}</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={16} />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          {!isPlaying ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <Button 
                onClick={() => setIsPlaying(true)}
                className="bg-primary/20 hover:bg-primary/30 text-white border-2 border-primary"
                size="lg"
              >
                <Play size={24} className="mr-2" />
                Assistir Demonstração
              </Button>
            </div>
          ) : (
            <iframe
              src={`${getVideoUrl(exerciseName)}?autoplay=1`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={`Vídeo demonstrativo: ${exerciseName}`}
            />
          )}
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p><strong>Dica:</strong> Assista ao vídeo antes de executar o exercício para garantir a técnica correta.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
