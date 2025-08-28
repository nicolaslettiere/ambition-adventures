import { useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Onboarding } from '@/components/Onboarding';
import { Dashboard } from '@/components/Dashboard';

const Index = () => {
  const { gameState, initializeGame, completeObjective, resetDailyProgress } = useGameState();

  // Check for daily reset when component mounts
  useEffect(() => {
    if (gameState.isInitialized) {
      resetDailyProgress();
    }
  }, []);

  // Handle onboarding completion
  const handleOnboardingComplete = (selectedObjectives: string[]) => {
    initializeGame(selectedObjectives);
  };

  // Handle objective completion
  const handleCompleteObjective = (objectiveId: string) => {
    completeObjective(objectiveId);
  };

  // Show onboarding if game is not initialized
  if (!gameState.isInitialized) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Show dashboard if game is initialized
  return (
    <Dashboard 
      gameState={gameState}
      onCompleteObjective={handleCompleteObjective}
    />
  );
};

export default Index;