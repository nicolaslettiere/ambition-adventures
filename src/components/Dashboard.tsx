import { GameState } from '@/types/rpg';
import { ObjectiveCard } from './ObjectiveCard';
import { ThemeToggle } from './ThemeToggle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Target, Flame, Clock, Plus } from 'lucide-react';

interface DashboardProps {
  gameState: GameState;
  onCompleteObjective: (objectiveId: string) => void;
  onAddObjective?: () => void;
}

export const Dashboard = ({ gameState, onCompleteObjective, onAddObjective }: DashboardProps) => {
  const completedToday = gameState.objectives.filter(obj => obj.completedToday).length;
  const totalObjectives = gameState.objectives.length;
  const completionPercentage = totalObjectives > 0 ? (completedToday / totalObjectives) * 100 : 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  const getMotivationalMessage = () => {
    if (completedToday === totalObjectives && totalObjectives > 0) {
      return '¡Increíble! Has completado todas tus misiones de hoy. ¡Eres imparable!';
    }
    if (completedToday > 0) {
      return `¡Excelente progreso! Has completado ${completedToday} de ${totalObjectives} misiones.`;
    }
    return '¡Es hora de comenzar tu aventura diaria! Completa tus primeras misiones.';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Theme Toggle */}
        <div className="flex justify-end p-4">
          <ThemeToggle />
        </div>

        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-3xl md:text-5xl font-bold text-gradient-primary">
            {getGreeting()}, Aventurero
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {getMotivationalMessage()}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-4 bg-gradient-to-br from-card to-muted/50">
            <CardContent className="pt-2">
              <div className="flex flex-col items-center gap-2">
                <Trophy className="w-8 h-8 text-secondary" />
                <div className="text-2xl font-bold text-gradient-secondary">
                  {gameState.playerStats.totalLevel}
                </div>
                <div className="text-sm text-muted-foreground">Nivel Total</div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-4 bg-gradient-to-br from-card to-muted/50">
            <CardContent className="pt-2">
              <div className="flex flex-col items-center gap-2">
                <Target className="w-8 h-8 text-accent" />
                <div className="text-2xl font-bold text-accent">
                  {completedToday}/{totalObjectives}
                </div>
                <div className="text-sm text-muted-foreground">Hoy</div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-4 bg-gradient-to-br from-card to-muted/50">
            <CardContent className="pt-2">
              <div className="flex flex-col items-center gap-2">
                <Flame className="w-8 h-8 text-orange-500" />
                <div className="text-2xl font-bold text-orange-500">
                  {gameState.playerStats.currentStreak}
                </div>
                <div className="text-sm text-muted-foreground">Mejor Racha</div>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center p-4 bg-gradient-to-br from-card to-muted/50">
            <CardContent className="pt-2">
              <div className="flex flex-col items-center gap-2">
                <Clock className="w-8 h-8 text-primary" />
                <div className="text-2xl font-bold text-primary">
                  {Math.floor(gameState.objectives.reduce((sum, obj) => sum + obj.totalTimeSpent, 0) / 60)}h
                </div>
                <div className="text-sm text-muted-foreground">Tiempo Total</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Progress */}
        <Card className="objective-card">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Target className="w-6 h-6" />
              Progreso del Día
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Misiones Completadas</span>
                <span className="font-semibold">{completedToday} de {totalObjectives}</span>
              </div>
              
              <div className="experience-bar h-4">
                <div 
                  className="experience-fill h-full transition-all duration-1000"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              
              <div className="text-center">
                <span className="text-2xl font-bold text-gradient-primary">
                  {Math.round(completionPercentage)}%
                </span>
                <span className="text-sm text-muted-foreground ml-2">completado</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Objectives Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Tus Objetivos</h2>
            {onAddObjective && (
              <Button 
                onClick={onAddObjective}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Agregar Objetivo
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameState.objectives.map((objective) => (
              <ObjectiveCard
                key={objective.id}
                objective={objective}
                onComplete={() => onCompleteObjective(objective.id)}
              />
            ))}
          </div>
        </div>

        {/* Motivational Footer */}
        {completedToday === totalObjectives && totalObjectives > 0 && (
          <Card className="bg-gradient-primary text-primary-foreground text-center p-8">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="text-4xl">🎉</div>
                <h3 className="text-2xl font-bold">¡Día Épico Completado!</h3>
                <p className="text-lg opacity-90">
                  Has demostrado verdadera dedicación. ¡Mañana será aún mejor!
                </p>
                <div className="flex justify-center">
                  <div className="animate-sparkle text-2xl">⭐</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};