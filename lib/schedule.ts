import { Task, Subject, TimeSlot, DailyPlan, UserProgress } from '@/types';

// Schedule configuration based on time slots
export const SCHEDULE_CONFIG = {
  timeSlots: {
    morning_practical: {
      startHour: 6,
      endHour: 9,
      label: 'Morning Practical (06:00-09:00)',
      subjects: ['accounts', 'math'] as Subject[],
    },
    midday_descriptive: {
      startHour: 10.5,
      endHour: 13.5,
      label: 'Midday Descriptive (10:30-13:30)',
      subjects: ['law', 'economics'] as Subject[],
    },
    afternoon_objective: {
      startHour: 15,
      endHour: 17,
      label: 'Afternoon Objective (15:00-17:00)',
      subjects: ['accounts', 'law', 'math', 'economics'] as Subject[],
    },
    evening_revision: {
      startHour: 19,
      endHour: 21,
      label: 'Evening Revision (19:00-21:00)',
      subjects: ['accounts', 'law', 'math', 'economics'] as Subject[],
    },
  },
};

// Get current time slot based on user's local time
export function getCurrentTimeSlot(): TimeSlot | null {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;

  if (hour >= 6 && hour < 9) return 'morning_practical';
  if (hour >= 10.5 && hour < 13.5) return 'midday_descriptive';
  if (hour >= 15 && hour < 17) return 'afternoon_objective';
  if (hour >= 19 && hour < 21) return 'evening_revision';
  
  return null; // Outside study hours
}

// Get appropriate subject based on current time
export function getSuggestedSubject(): Subject | null {
  const timeSlot = getCurrentTimeSlot();
  if (!timeSlot) return null;
  
  const subjects = SCHEDULE_CONFIG.timeSlots[timeSlot].subjects;
  // Randomly select from available subjects for this time slot
  return subjects[Math.floor(Math.random() * subjects.length)];
}

// Generate tasks for a specific date based on the schedule
export function generateDailyTasks(date: Date): Task[] {
  const dayOfYear = getDayOfYear(date);
  const tasks: Task[] = [];
  
  // Create tasks for each time slot
  Object.entries(SCHEDULE_CONFIG.timeSlots).forEach(([slotKey, slotConfig]) => {
    const timeSlot = slotKey as TimeSlot;
    const subjects = slotConfig.subjects;
    
    subjects.forEach((subject, index) => {
      tasks.push({
        id: `${date.toISOString().split('T')[0]}-${timeSlot}-${subject}-${index}`,
        day: dayOfYear,
        subject,
        task: getTaskDescription(subject, timeSlot, dayOfYear),
        duration: 90, // 90 minutes per task
        timeSlot,
        done: false,
      });
    });
  });
  
  return tasks;
}

// Get task description based on subject and time slot
function getTaskDescription(subject: Subject, timeSlot: TimeSlot, day: number): string {
  const phase = getPhase(day);
  
  const taskTemplates: Record<Subject, Record<TimeSlot, string[]>> = {
    accounts: {
      morning_practical: [
        'Chapter Theory Study',
        'Practical Problems',
        'Past Year Questions',
        'RTP Problems',
      ],
      midday_descriptive: [
        'Theory Concepts',
        'Accounting Standards',
        'Case Studies',
      ],
      afternoon_objective: [
        'MCQ Practice',
        'Quick Revision',
        'Formula Application',
      ],
      evening_revision: [
        'Day Summary',
        'Weak Area Focus',
        'Mock Test Review',
      ],
    },
    law: {
      morning_practical: [
        'Section Memorization',
        'Case Law Study',
      ],
      midday_descriptive: [
        'Chapter Theory',
        'Legal Provisions',
        'Application Questions',
      ],
      afternoon_objective: [
        'MCQ Practice',
        'Section Recall',
      ],
      evening_revision: [
        'Key Sections Review',
        'Important Cases',
      ],
    },
    math: {
      morning_practical: [
        'Formula Practice',
        'Problem Solving',
        'Calculation Speed',
      ],
      midday_descriptive: [
        'Theory Concepts',
        'Step-by-step Solutions',
      ],
      afternoon_objective: [
        'MCQ Drills',
        'Time-bound Practice',
      ],
      evening_revision: [
        'Formula Revision',
        'Mistake Analysis',
      ],
    },
    economics: {
      morning_practical: [
        'Concept Maps',
        'Diagram Practice',
      ],
      midday_descriptive: [
        'Chapter Study',
        'Economic Theories',
        'Graph Analysis',
      ],
      afternoon_objective: [
        'MCQ Practice',
        'Term Definitions',
      ],
      evening_revision: [
        'Key Concepts',
        'Current Affairs Link',
      ],
    },
  };
  
  const templates = taskTemplates[subject][timeSlot];
  return `${phase} - ${templates[day % templates.length]}`;
}

// Get current phase based on day number
function getPhase(day: number): string {
  if (day <= 10) return 'Phase 1: Foundation Building';
  if (day <= 20) return 'Phase 2: Intensive Practice';
  if (day <= 27) return 'Phase 3: Mock Tests & Analysis';
  return 'Phase 4: Final Revision';
}

// Get day of year (1-365)
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Assign tasks based on user's current datetime
export function assignTasksForUser(userDateTime: Date): DailyPlan {
  const dateStr = userDateTime.toISOString().split('T')[0];
  const tasks = generateDailyTasks(userDateTime);
  
  // Load completed tasks from localStorage (client-side only)
  let completedCount = 0;
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(`daily-plan-${dateStr}`);
    if (stored) {
      const storedTasks = JSON.parse(stored) as Task[];
      completedCount = storedTasks.filter(t => t.done).length;
    }
  }
  
  return {
    date: dateStr,
    tasks,
    completedCount,
    totalCount: tasks.length,
    progressPercentage: Math.round((completedCount / tasks.length) * 100),
  };
}

// Save task completion
export function saveTaskCompletion(taskId: string, done: boolean): void {
  if (typeof window === 'undefined') return;
  
  const dateStr = new Date().toISOString().split('T')[0];
  const key = `daily-plan-${dateStr}`;
  const stored = localStorage.getItem(key);
  
  let tasks: Task[] = stored ? JSON.parse(stored) : [];
  
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex >= 0) {
    tasks[taskIndex].done = done;
    tasks[taskIndex].completedAt = done ? new Date().toISOString() : undefined;
  } else {
    // Task not found, might be from generated list
    // In real app, you'd fetch the full task list first
  }
  
  localStorage.setItem(key, JSON.stringify(tasks));
}

// Get user progress
export function getUserProgress(): UserProgress {
  const defaultProgress: UserProgress = {
    totalTasksCompleted: 0,
    subjectProgress: {
      accounts: { completed: 0, total: 0, percentage: 0 },
      law: { completed: 0, total: 0, percentage: 0 },
      math: { completed: 0, total: 0, percentage: 0 },
      economics: { completed: 0, total: 0, percentage: 0 },
    },
    streak: 0,
    mockTestsCompleted: 0,
  };
  
  if (typeof window === 'undefined') return defaultProgress;
  
  const stored = localStorage.getItem('user-progress');
  return stored ? JSON.parse(stored) : defaultProgress;
}

// Update user progress
export function updateUserProgress(progress: Partial<UserProgress>): void {
  if (typeof window === 'undefined') return;
  
  const current = getUserProgress();
  const updated = { ...current, ...progress };
  localStorage.setItem('user-progress', JSON.stringify(updated));
}
