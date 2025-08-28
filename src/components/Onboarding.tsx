import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { OBJECTIVE_TEMPLATES } from '@/types/rpg';

interface OnboardingProps {
  onComplete: (selectedObjectives: string[]) => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);

  const toggleObjective = (objectiveName: string) => {
    setSelectedObjectives(prev => 
      prev.includes(objectiveName)
        ? prev.filter(name => name !== objectiveName)
        : [...prev, objectiveName]
    );
  };

  const handleComplete = () => {
    if (selectedObjectives.length > 0) {
      onComplete(selectedObjectives);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted to-background">
      <div className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient-primary">
            ¡Bienvenido, Aventurero!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Embárcate en tu viaje épico de productividad. Selecciona los objetivos que quieres dominar 
            y conviértete en el héroe de tu propia historia.
          </p>
        </div>

        {/* Objective Selection */}
        <Card className="objective-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Elige tus Misiones Principales
            </CardTitle>
            <CardDescription className="text-center">
              Selecciona al menos un objetivo para comenzar tu aventura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {OBJECTIVE_TEMPLATES.map((template) => (
                <button
                  key={template.name}
                  onClick={() => toggleObjective(template.name)}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105
                    ${selectedObjectives.includes(template.name)
                      ? 'border-primary bg-gradient-primary text-primary-foreground shadow-glow'
                      : 'border-border bg-card hover:border-primary/50 hover:shadow-mystical'
                    }
                  `}
                >
                  <div className="text-3xl mb-2">{template.icon}</div>
                  <div className="font-semibold text-sm">{template.name}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {template.baseTime} min/día
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Count */}
        {selectedObjectives.length > 0 && (
          <div className="text-center">
            <p className="text-muted-foreground">
              Has seleccionado <span className="text-primary font-bold">{selectedObjectives.length}</span> objetivo{selectedObjectives.length > 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Start Button */}
        <div className="text-center">
        <Button
          onClick={handleComplete}
          disabled={selectedObjectives.length === 0}
          variant="magical"
          size="lg"
          className="text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            ¡Comenzar Mi Aventura!
          </Button>
        </div>

        {/* Tips */}
        <Card className="bg-muted/50 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-primary">💡 Consejos del Maestro</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Comienza con 2-3 objetivos para no abrumarte</p>
                <p>• Puedes agregar más objetivos después</p>
                <p>• Cada nivel aumenta el tiempo diario recomendado</p>
                <p>• ¡La consistencia es clave para subir de nivel!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};