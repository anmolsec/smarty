// TypeScript interfaces for CA Foundation AIR 1 Portal

export interface Task {
  id: string;
  day: number;
  subject: Subject;
  task: string;
  duration: number; // in minutes
  timeSlot: TimeSlot;
  done: boolean;
  completedAt?: string;
}

export type Subject = 'accounts' | 'law' | 'math' | 'economics';

export type TimeSlot = 
  | 'morning_practical'    // 06:00-09:00
  | 'midday_descriptive'   // 10:30-13:30
  | 'afternoon_objective'  // 15:00-17:00
  | 'evening_revision';    // 19:00-21:00

export interface ScheduleConfig {
  timeSlots: {
    [key in TimeSlot]: {
      startHour: number;
      endHour: number;
      label: string;
      subjects: Subject[];
    };
  };
}

export interface UserProgress {
  totalTasksCompleted: number;
  subjectProgress: {
    [key in Subject]: {
      completed: number;
      total: number;
      percentage: number;
    };
  };
  streak: number;
  lastStudyDate?: string;
  mockTestsCompleted: number;
  averageScore?: number;
}

export interface DailyPlan {
  date: string;
  tasks: Task[];
  completedCount: number;
  totalCount: number;
  progressPercentage: number;
}

export const SUBJECT_LABELS: Record<Subject, string> = {
  accounts: 'Paper 1: Accounting',
  law: 'Paper 2: Business Law',
  math: 'Paper 3: Quantitative Aptitude',
  economics: 'Paper 4: Business Economics',
};

export const SUBJECT_COLORS: Record<Subject, string> = {
  accounts: 'bg-blue-500',
  law: 'bg-purple-500',
  math: 'bg-green-500',
  economics: 'bg-orange-500',
};
