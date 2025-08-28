import { useState, useEffect } from 'react';
import { GameState, Objective, Mission, PlayerStats, LEVEL_THRESHOLDS } from '@/types/rpg';
import { useToast } from '@/hooks/use-toast';

const STORAGE_KEY = 'rpg-productivity-game';

const createInitialGameState = (): GameState => ({
  isInitialized: false,
  objectives: [],
  missions: [],
  playerStats: {
    totalLevel: 0,
    totalExperience: 0,
    activeObjectives: 0,
    completedMissions: 0,
    currentStreak: 0,
    joinDate: new Date()
  },
  lastActiveDate: new Date().toISOString().split('T')[0]
});

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState);
  const { toast } = useToast();

  // Load game state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        parsed.playerStats.joinDate = new Date(parsed.playerStats.joinDate);
        parsed.objectives = parsed.objectives.map((obj: any) => ({
          ...obj,
          createdAt: new Date(obj.createdAt),
          lastCompleted: obj.lastCompleted ? new Date(obj.lastCompleted) : undefined
        }));
        setGameState(parsed);
      } catch (error) {
        console.error('Error loading game state:', error);
      }
    }
  }, []);

  // Save game state to localStorage
  const saveGameState = (newState: GameState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    setGameState(newState);
  };

  // Calculate experience needed for next level
  const getExperienceToNext = (level: number): number => {
    if (level >= LEVEL_THRESHOLDS.length - 1) return 1000;
    return LEVEL_THRESHOLDS[level + 1] - LEVEL_THRESHOLDS[level];
  };

  // Calculate level from total experience
  const getLevelFromExperience = (totalExp: number): number => {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (totalExp >= LEVEL_THRESHOLDS[i]) {
        return i;
      }
    }
    return 0;
  };

  // Initialize game with selected objectives
  const initializeGame = (selectedObjectives: string[]) => {
    const objectives: Objective[] = selectedObjectives.map((name, index) => ({
      id: `obj-${Date.now()}-${index}`,
      name,
      icon: getObjectiveIcon(name),
      level: 1,
      experience: 0,
      experienceToNext: getExperienceToNext(1),
      dailyTimeMinutes: getBaseTimeForObjective(name),
      completedToday: false,
      streak: 0,
      totalTimeSpent: 0,
      createdAt: new Date()
    }));

    const newState: GameState = {
      isInitialized: true,
      objectives,
      missions: [],
      playerStats: {
        totalLevel: selectedObjectives.length,
        totalExperience: 0,
        activeObjectives: selectedObjectives.length,
        completedMissions: 0,
        currentStreak: 0,
        joinDate: new Date()
      },
      lastActiveDate: new Date().toISOString().split('T')[0]
    };

    saveGameState(newState);
  };

  // Complete an objective for the day
  const completeObjective = (objectiveId: string) => {
    const objective = gameState.objectives.find(obj => obj.id === objectiveId);
    if (!objective || objective.completedToday) return;

    const experienceGained = Math.floor(objective.dailyTimeMinutes / 10) + objective.level * 5;
    const newExperience = objective.experience + experienceGained;
    const newLevel = getLevelFromExperience(newExperience);
    const leveledUp = newLevel > objective.level;

    const updatedObjective: Objective = {
      ...objective,
      experience: newExperience,
      level: newLevel,
      experienceToNext: getExperienceToNext(newLevel),
      completedToday: true,
      streak: objective.streak + 1,
      totalTimeSpent: objective.totalTimeSpent + objective.dailyTimeMinutes,
      lastCompleted: new Date(),
      dailyTimeMinutes: leveledUp ? 
        Math.min(objective.dailyTimeMinutes + 5, 180) : 
        objective.dailyTimeMinutes
    };

    const updatedObjectives = gameState.objectives.map(obj =>
      obj.id === objectiveId ? updatedObjective : obj
    );

    const newPlayerStats: PlayerStats = {
      ...gameState.playerStats,
      totalLevel: updatedObjectives.reduce((sum, obj) => sum + obj.level, 0),
      totalExperience: updatedObjectives.reduce((sum, obj) => sum + obj.experience, 0),
      completedMissions: gameState.playerStats.completedMissions + 1,
      currentStreak: Math.max(...updatedObjectives.map(obj => obj.streak))
    };

    const newState: GameState = {
      ...gameState,
      objectives: updatedObjectives,
      playerStats: newPlayerStats
    };

    saveGameState(newState);

    // Show toast notifications
    toast({
      title: "¡Misión Completada!",
      description: `Has ganado ${experienceGained} XP en ${objective.name}`,
    });

    if (leveledUp) {
      toast({
        title: "¡NIVEL SUBIDO!",
        description: `${objective.name} ahora está en nivel ${newLevel}!`,
      });
    }
  };

  // Reset daily progress (should be called when day changes)
  const resetDailyProgress = () => {
    const today = new Date().toISOString().split('T')[0];
    
    if (gameState.lastActiveDate !== today) {
      const updatedObjectives = gameState.objectives.map(obj => ({
        ...obj,
        completedToday: false
      }));

      const newState: GameState = {
        ...gameState,
        objectives: updatedObjectives,
        lastActiveDate: today
      };

      saveGameState(newState);
    }
  };

  // Helper functions
  const getObjectiveIcon = (name: string): string => {
    const iconMap: { [key: string]: string } = {
      'Atletismo': '🏃‍♂️',
      'WorkOut': '💪',
      'Estudiar': '📚',
      'Trabajar': '💻',
      'Tiempo de calidad': '❤️',
      'Leer': '📖',
      'Meditación': '🧘‍♂️',
      'Idiomas': '🌍',
      'Creatividad': '🎨',
      'Cocinar': '👨‍🍳'
    };
    return iconMap[name] || '⭐';
  };

  const getBaseTimeForObjective = (name: string): number => {
    const timeMap: { [key: string]: number } = {
      'Atletismo': 30,
      'WorkOut': 45,
      'Estudiar': 60,
      'Trabajar': 120,
      'Tiempo de calidad': 30,
      'Leer': 45,
      'Meditación': 20,
      'Idiomas': 30,
      'Creatividad': 60,
      'Cocinar': 45
    };
    return timeMap[name] || 30;
  };

  return {
    gameState,
    initializeGame,
    completeObjective,
    resetDailyProgress
  };
};