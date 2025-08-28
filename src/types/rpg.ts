export interface Objective {
  id: string;
  name: string;
  icon: string;
  level: number;
  experience: number;
  experienceToNext: number;
  dailyTimeMinutes: number;
  completedToday: boolean;
  streak: number;
  totalTimeSpent: number;
  createdAt: Date;
  lastCompleted?: Date;
}

export interface Mission {
  id: string;
  objectiveId: string;
  title: string;
  description: string;
  timeRequired: number;
  completed: boolean;
  date: string;
}

export interface PlayerStats {
  totalLevel: number;
  totalExperience: number;
  activeObjectives: number;
  completedMissions: number;
  currentStreak: number;
  joinDate: Date;
}

export interface GameState {
  isInitialized: boolean;
  objectives: Objective[];
  missions: Mission[];
  playerStats: PlayerStats;
  lastActiveDate: string;
}

export const OBJECTIVE_TEMPLATES = [
  { name: 'Atletismo', icon: '🏃‍♂️', baseTime: 30 },
  { name: 'WorkOut', icon: '💪', baseTime: 45 },
  { name: 'Estudiar', icon: '📚', baseTime: 60 },
  { name: 'Trabajar', icon: '💻', baseTime: 120 },
  { name: 'Tiempo de calidad', icon: '❤️', baseTime: 30 },
  { name: 'Leer', icon: '📖', baseTime: 45 },
  { name: 'Meditación', icon: '🧘‍♂️', baseTime: 20 },
  { name: 'Idiomas', icon: '🌍', baseTime: 30 },
  { name: 'Creatividad', icon: '🎨', baseTime: 60 },
  { name: 'Cocinar', icon: '👨‍🍳', baseTime: 45 }
];

export const LEVEL_THRESHOLDS = [
  0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700, 3250, 3850, 4500, 5200, 5950
];