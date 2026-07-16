import { Task, Subject, TimeSlot, DailyPlan, UserProgress } from '@/types';

export const PROTOCOL_DAYS = 30;
export const PROTOCOL_START = new Date(2026, 6, 16);
export const PROTOCOL_END = new Date(2026, 7, 14);

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function getLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getProtocolStart(): Date {
  return new Date(PROTOCOL_START);
}

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

export function getProtocolDay(today: Date): number {
  const diff = startOfDay(today).getTime() - getProtocolStart().getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 0) return 0;
  if (days >= PROTOCOL_DAYS) return PROTOCOL_DAYS;
  return days + 1;
}

export function getProtocolDate(day: number): Date {
  const date = getProtocolStart();
  date.setDate(date.getDate() + Math.max(0, Math.min(PROTOCOL_DAYS, day) - 1));
  return date;
}

export function getPhase(day: number): string {
  if (day <= 0) return 'Pre-Protocol: Foundation Phase';
  if (day <= 10) return 'Phase 1: Rapid Syllabus Sweep';
  if (day <= 20) return 'Phase 2: Heavy Application & RTPs';
  if (day <= 27) return 'Phase 3: The Simulation Window';
  return 'Phase 4: Final Recall';
}

export function getPhaseDays(day: number): string {
  if (day <= 0) return 'Days remaining';
  if (day <= 10) return `Day ${day}/10`;
  if (day <= 20) return `Day ${day - 10}/10`;
  if (day <= 27) return `Day ${day - 20}/7`;
  return `Day ${day - 27}/3`;
}

export function getCurrentTimeSlot(): TimeSlot | null {
  const now = new Date();
  const hour = now.getHours() + now.getMinutes() / 60;
  if (hour >= 6 && hour < 9) return 'morning_practical';
  if (hour >= 10.5 && hour < 13.5) return 'midday_descriptive';
  if (hour >= 15 && hour < 17) return 'afternoon_objective';
  if (hour >= 19 && hour < 21) return 'evening_revision';
  return null;
}

export function getSuggestedSubject(): Subject | null {
  const timeSlot = getCurrentTimeSlot();
  if (!timeSlot) return null;
  const subjects = SCHEDULE_CONFIG.timeSlots[timeSlot].subjects;
  const dayIndex = Math.max(0, getProtocolDay(new Date()) - 1);
  return subjects[dayIndex % subjects.length];
}

export function generateDailyTasks(date: Date): Task[] {
  const day = getProtocolDay(date);
  return generateTasksForProtocolDay(day, date);
}

export function generateTasksForProtocolDay(day: number, date = getProtocolDate(day)): Task[] {
  const tasks: Task[] = [];

  Object.entries(SCHEDULE_CONFIG.timeSlots).forEach(([slotKey, slotConfig]) => {
    const timeSlot = slotKey as TimeSlot;
    const subjects = slotConfig.subjects;
    const slotMinutes = Math.round((slotConfig.endHour - slotConfig.startHour) * 60);
    const taskDuration = Math.floor(slotMinutes / subjects.length);
    subjects.forEach((subject, index) => {
      tasks.push({
        id: `${getLocalDateKey(date)}-${timeSlot}-${subject}-${index}`,
        day,
        subject,
        task: getTaskDescription(subject, timeSlot, day),
        duration: taskDuration,
        timeSlot,
        done: false,
      });
    });
  });

  return tasks;
}

function getTaskDescription(subject: Subject, timeSlot: TimeSlot, day: number): string {
  const phase = getPhase(day);

  const taskTemplates: Record<Subject, Record<TimeSlot, string[]>> = {
    accounts: {
      morning_practical: [
        'Solve ICAI Module Illustrations',
        'Final Accounts of Companies',
        'Issue of Shares/Debentures',
        'Rectification of Errors Practice',
        'Past Year Paper Problems',
        'RTP Problem Dissection',
      ],
      midday_descriptive: [
        'Theory Concepts Revision',
        'Accounting Standards Review',
        'Case Studies Analysis',
      ],
      afternoon_objective: [
        'MCQ Speed Drills',
        'Time-bound Problem Sets',
        'Working Notes Practice',
      ],
      evening_revision: [
        'Mistake Log Entry',
        'Weak Area Deep Work',
        'Formula Sheet Update',
      ],
    },
    law: {
      morning_practical: [
        'Contract Act Section Memorization',
        'Companies Act Keyword Drill',
        'Section Number Recall',
      ],
      midday_descriptive: [
        '4-Step Answer Writing',
        'Provision → Facts → Analysis → Conclusion',
        'Full 10-15 Mark Answer Practice',
        'Legal Keyword Underlining Drill',
      ],
      afternoon_objective: [
        'Section-wise MCQ Blitz',
        'Case Law Application MCQs',
        'Option Elimination Practice',
      ],
      evening_revision: [
        'Keyword Notebook Review',
        'Important Sections Recap',
        'Pre-Sleep Passive Review',
      ],
    },
    math: {
      morning_practical: [
        'Calculator M+/M-/GT Mastery',
        'Time Value of Money Problems',
        'Annuity Speed Drills',
      ],
      midday_descriptive: [
        'Statistics Theory Recap',
        'Formula Derivation Practice',
      ],
      afternoon_objective: [
        '50-100 MCQ Blitz Session',
        '72-Second-Per-Question Drill',
        'Option Elimination Tactics',
      ],
      evening_revision: [
        'Formula Sheet Consolidation',
        'Mistake Log Analysis',
        'Grand Total Function Practice',
      ],
    },
    economics: {
      morning_practical: [
        'Hand-drawn Graph Practice',
        'Demand & Supply Curves',
        'Cost Curves Mastery',
      ],
      midday_descriptive: [
        'Theory of Demand & Supply',
        'Price Determination Analysis',
        'Market Structures Deep Dive',
      ],
      afternoon_objective: [
        'Eco MCQ Speed Run',
        'Term Definition Quick Recall',
        'Graph-based MCQs',
      ],
      evening_revision: [
        'Key Concepts Summary',
        'Graph Memory Recall',
        'Formula & Keyword Review',
      ],
    },
  };

  const templates = taskTemplates[subject][timeSlot];
  const phaseLabel = phase.match(/^Phase \d+/)?.[0] ?? phase;
  const templateIndex = Math.max(0, day - 1) % templates.length;
  return `${phaseLabel} · ${templates[templateIndex]}`;
}

export function assignTasksForUser(userDateTime: Date): DailyPlan {
  const dateStr = getLocalDateKey(userDateTime);
  const legacyDateStr = userDateTime.toISOString().split('T')[0];
  const tasks = generateDailyTasks(userDateTime);

  let completedCount = 0;
  if (typeof window !== 'undefined') {
    const currentKey = `daily-plan-${dateStr}`;
    const legacyKey = `daily-plan-${legacyDateStr}`;
    const stored = localStorage.getItem(currentKey) ?? (legacyKey !== currentKey ? localStorage.getItem(legacyKey) : null);
    if (stored) {
      try {
        const storedTasks = JSON.parse(stored) as Task[];
        storedTasks.forEach(storedTask => {
          const normalizedId = legacyDateStr !== dateStr && storedTask.id.startsWith(`${legacyDateStr}-`)
            ? `${dateStr}-${storedTask.id.slice(legacyDateStr.length + 1)}`
            : storedTask.id;
          const index = tasks.findIndex(task => task.id === normalizedId);
          if (index >= 0) {
            tasks[index].done = storedTask.done;
            tasks[index].completedAt = storedTask.completedAt;
            if (storedTask.done) completedCount++;
          }
        });
        if (!localStorage.getItem(currentKey) && legacyKey !== currentKey) {
          localStorage.setItem(currentKey, JSON.stringify(tasks.filter((task) => task.done)));
        }
      } catch {
        localStorage.removeItem(currentKey);
      }
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

export function saveTaskCompletion(taskId: string, done: boolean, dateStr = getLocalDateKey(new Date())): void {
  if (typeof window === 'undefined') return;
  const key = `daily-plan-${dateStr}`;
  const stored = localStorage.getItem(key);
  let tasks: Task[] = [];
  if (stored) {
    try {
      tasks = JSON.parse(stored) as Task[];
    } catch {
      localStorage.removeItem(key);
    }
  }
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex >= 0) {
    tasks[taskIndex].done = done;
    tasks[taskIndex].completedAt = done ? new Date().toISOString() : undefined;
  } else {
    tasks.push({ id: taskId, day: 0, subject: 'accounts', task: '', duration: 90, timeSlot: 'morning_practical', done, completedAt: done ? new Date().toISOString() : undefined });
  }
  localStorage.setItem(key, JSON.stringify(tasks));
}

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

export function updateUserProgress(progress: Partial<UserProgress>): void {
  if (typeof window === 'undefined') return;
  const current = getUserProgress();
  const updated = { ...current, ...progress };
  localStorage.setItem('user-progress', JSON.stringify(updated));
}
