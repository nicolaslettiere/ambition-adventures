import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Objective } from '@/types/rpg';
import { CheckCircle, Clock, Flame, Star } from 'lucide-react';

interface ObjectiveCardProps {
  objective: Objective;
  onComplete: () => void;
}

export const ObjectiveCard = ({ objective, onComplete }: ObjectiveCardProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const experiencePercentage = (objective.experience / (objective.experience + objective.experienceToNext)) * 100;
  
  const handleComplete = () => {
    if (!objective.completedToday) {
      setIsAnimating(true);
      setTimeout(() => {
        onComplete();
        setIsAnimating(false);
      }, 600);
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 10) return 'text-level-platinum';
    if (level >= 7) return 'text-level-gold';
    if (level >= 4) return 'text-level-silver';
    return 'text-level-bronze';
  };

  const getLevelBadgeStyle = (level: number) => {
    if (level >= 10) return 'bg-gradient-to-r from-purple-400 to-pink-400';
    if (level >= 7) return 'bg-gradient-secondary';
    if (level >= 4) return 'bg-gradient-to-r from-gray-300 to-gray-400';
    return 'bg-gradient-to-r from-orange-300 to-orange-400';
  };

  return (
    <Card className={`objective-card ${isAnimating ? 'animate-task-completed' : ''} ${objective.completedToday ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{objective.icon}</div>
            <div>
              <h3 className="text-lg font-bold">{objective.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{objective.dailyTimeMinutes} min/día</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {objective.streak > 0 && (
              <div className="flex items-center gap-1 text-orange-500">
                <Flame className="w-4 h-4" />
                <span className="text-sm font-bold">{objective.streak}</span>
              </div>
            )}
            
            <div className={`level-badge ${getLevelBadgeStyle(objective.level)}`}>
              {objective.level}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Experience Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Experiencia</span>
            <span className="font-semibold">
              {objective.experience} / {objective.experience + objective.experienceToNext} XP
            </span>
          </div>
          
          <div className="experience-bar">
            <div 
              className="experience-fill animate-experience-flow"
              style={{ width: `${experiencePercentage}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <div className="text-muted-foreground">Tiempo Total</div>
            <div className="font-semibold">
              {Math.floor(objective.totalTimeSpent / 60)}h {objective.totalTimeSpent % 60}m
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-muted-foreground">Mejor Racha</div>
            <div className="font-semibold flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              {objective.streak} días
            </div>
          </div>
        </div>

        {/* Mission for Today */}
        <div className="p-3 rounded-lg bg-muted/50 border border-primary/20">
          <div className="text-sm font-semibold text-primary mb-1">
            Misión de Hoy
          </div>
          <div className="text-sm text-muted-foreground">
            Dedica {objective.dailyTimeMinutes} minutos a {objective.name.toLowerCase()}
          </div>
        </div>

        {/* Complete Button */}
        <Button
          onClick={handleComplete}
          disabled={objective.completedToday}
          variant={objective.completedToday ? "secondary" : "magical"}
          className={`w-full ${
            objective.completedToday 
              ? 'bg-green-500 hover:bg-green-500 text-white' 
              : ''
          }`}
        >
          {objective.completedToday ? (
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              ¡Completado Hoy!
            </div>
          ) : (
            '¡Completar Misión!'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};