'use client';

import { useState, useEffect, useRef } from 'react';
import { assignTasksForUser, saveTaskCompletion, getCurrentTimeSlot, getSuggestedSubject, getProtocolDay, getPhase, getPhaseDays, getProtocolDate, generateTasksForProtocolDay, getLocalDateKey, PROTOCOL_DAYS, PROTOCOL_END, PROTOCOL_START } from '@/lib/schedule';
import { DailyPlan, Task, TimeSlot, SUBJECT_LABELS, SUBJECT_COLORS } from '@/types';
import { Clock, CheckCircle, Circle, Calendar, TrendingUp, AlertTriangle, ChevronDown, LockKeyhole } from 'lucide-react';

export default function DailyPlanPage() {
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
  const [dailyPlan, setDailyPlan] = useState<DailyPlan | null>(null);
  const [currentTimeSlot, setCurrentTimeSlot] = useState<string>('');
  const [currentSlotKey, setCurrentSlotKey] = useState<TimeSlot | null>(null);
  const [suggestedSubject, setSuggestedSubject] = useState<string>('');
  const [showSchedule, setShowSchedule] = useState(false);
  const [showPastPlans, setShowPastPlans] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const activeDateRef = useRef<string | null>(null);

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const dateKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
      setCurrentDateTime(now);
      if (activeDateRef.current !== dateKey) {
        activeDateRef.current = dateKey;
        setDailyPlan(assignTasksForUser(now));
        setSelectedDay(Math.max(1, getProtocolDay(now)));
      }
      const slot = getCurrentTimeSlot();
      setCurrentSlotKey(slot);
      if (slot) {
        setCurrentTimeSlot(slot.replace('_', ' ').replace('morning', 'Morning').replace('midday', 'Midday').replace('afternoon', 'Afternoon').replace('evening', 'Evening').replace('practical', 'Practical').replace('descriptive', 'Descriptive').replace('objective', 'Objective').replace('revision', 'Revision'));
        const subject = getSuggestedSubject();
        if (subject) setSuggestedSubject(SUBJECT_LABELS[subject]);
      } else {
        setCurrentTimeSlot('Outside Study Hours — Rest & Recharge');
        setSuggestedSubject('');
      }
    };
    updateStatus();
    const timer = setInterval(updateStatus, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleTaskToggle = (taskId: string, done: boolean) => {
    if (!dailyPlan) return;
    saveTaskCompletion(taskId, done, dailyPlan.date);
    setDailyPlan((previous) => {
      if (!previous) return previous;
      const completedCount = done
        ? Math.min(previous.totalCount, previous.completedCount + 1)
        : Math.max(0, previous.completedCount - 1);
      return {
        ...previous,
        tasks: previous.tasks.map((task: Task) => task.id === taskId ? { ...task, done } : task),
        completedCount,
        progressPercentage: Math.round((completedCount / previous.totalCount) * 100),
      };
    });
  };

  const protocolDay = currentDateTime ? getProtocolDay(currentDateTime) : 1;
  const currentPhase = getPhase(protocolDay);
  const phaseDay = getPhaseDays(protocolDay);

  const timeSlotLabels: Record<string, string> = {
    morning_practical: 'Morning Practical (06:00-09:00)',
    midday_descriptive: 'Midday Descriptive (10:30-13:30)',
    afternoon_objective: 'Afternoon Objective (15:00-17:00)',
    evening_revision: 'Evening Revision (19:00-21:00)',
  };

  const pastPlans = Array.from({ length: Math.max(0, protocolDay - 1) }, (_, index) => protocolDay - index - 1).slice(0, 7);
  const selectUnlockedDay = (day: number) => {
    if (day > protocolDay || protocolDay <= 0) return;
    setSelectedDay(day);
    setDailyPlan(assignTasksForUser(getProtocolDate(day)));
  };
  const completedForDay = (day: number) => {
    if (typeof window === 'undefined') return 0;
    const date = getLocalDateKey(getProtocolDate(day));
    const stored = localStorage.getItem(`daily-plan-${date}`);
    if (!stored) return 0;
    try {
      return (JSON.parse(stored) as Task[]).filter((task) => task.done).length;
    } catch {
      return 0;
    }
  };

  if (!dailyPlan || !currentDateTime || selectedDay === null) {
    return <div className="app-shell-bright min-h-screen p-4 md:p-8"><div className="mx-auto max-w-6xl"><div className="daily-loading" role="status">Preparing today&apos;s study plan…</div></div></div>;
  }

  const completedHours = dailyPlan.tasks
    .filter((task) => task.done)
    .reduce((minutes, task) => minutes + task.duration, 0) / 60;

  return (
    <div className="app-shell-bright min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          {protocolDay > 0 && protocolDay <= 30 ? (
            <div className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">
              {selectedDay === protocolDay ? `Day ${protocolDay} of 30 · ${currentPhase}` : `Reviewing Day ${selectedDay} · ${getPhase(selectedDay)}`}
            </div>
          ) : <div className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">30-day plan opens {PROTOCOL_START.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</div>}
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
            Daily Study Plan
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm md:text-base text-slate-600">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200">
              <Calendar className="w-4 h-4" />
              <span>{currentDateTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200">
              <Clock className="w-4 h-4" />
              <span>{currentDateTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Current Status Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-600 mb-1">Current time slot</h2>
              <p className="text-lg md:text-xl font-bold text-blue-700 leading-snug">{currentTimeSlot}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-600 mb-1">Suggested focus</h2>
              <p className="text-lg md:text-xl font-bold text-emerald-700 leading-snug">{suggestedSubject || '—'}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-600 mb-1">Selected day&apos;s progress</h2>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <p className="text-lg md:text-xl font-bold text-blue-700">{dailyPlan.progressPercentage}%</p>
              </div>
            </div>
          </div>

          <div className="mt-4 w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${dailyPlan.progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-slate-600 mt-2">
            {dailyPlan.completedCount} of {dailyPlan.totalCount} tasks completed
          </p>
        </div>

        {/* Tasks by Time Slot */}
        {protocolDay > 0 ? <div className="grid gap-4">
          {Object.entries(timeSlotLabels).map(([slotKey, slotLabel]) => {
            const tasks = dailyPlan.tasks.filter((t: Task) => t.timeSlot === slotKey);
            if (tasks.length === 0) return null;
            return (
              <div key={slotKey} className={`daily-slot rounded-xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm ${selectedDay === protocolDay && currentSlotKey === slotKey ? 'current' : ''}`}>
                <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  {slotLabel}
                </h3>
                <div className="space-y-2">
                  {tasks.map((task: Task) => (
                    <div
                      key={task.id}
                      className={`flex items-start gap-3 p-3 md:p-4 rounded-lg border transition-all ${
                        task.done
                          ? 'bg-emerald-50 border-emerald-200'
                          : 'bg-slate-50 border-slate-200 hover:bg-white'
                      }`}
                    >
                      <button
                        onClick={() => handleTaskToggle(task.id, !task.done)}
                        className="flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
                        aria-label={task.done ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        {task.done ? (
                          <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                        ) : (
                          <Circle className="w-5 h-5 md:w-6 md:h-6 text-slate-500 hover:text-emerald-700" />
                        )}
                      </button>

                      <div className={`mt-4 flex-shrink-0 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${SUBJECT_COLORS[task.subject]}`} />

                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm md:text-base font-semibold leading-relaxed break-words ${task.done ? 'text-emerald-700 line-through' : 'text-slate-900'}`}>
                          {task.task}
                        </h4>
                        <p className="mt-1 text-sm leading-relaxed text-slate-600">
                          {SUBJECT_LABELS[task.subject]} • {task.duration} min
                        </p>
                      </div>

                      {task.completedAt && (
                        <span className="text-xs text-emerald-700 hidden md:inline">
                          {new Date(task.completedAt).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div> : <div className="protocol-waiting"><Calendar className="w-6 h-6" /><div><strong>Your first study block unlocks on {PROTOCOL_START.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}.</strong><p>Day 30 completes on {PROTOCOL_END.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}. Until then, use Chapters and Flashcards for light orientation.</p></div></div>}

        {pastPlans.length > 0 && <section className="past-plans">
          <button onClick={() => setShowPastPlans((value) => !value)} aria-expanded={showPastPlans}><span><Calendar className="w-5 h-5" /><span><strong>Previous daily plans</strong><small>Review completed work without pulling it into today&apos;s focus.</small></span></span><ChevronDown className={showPastPlans ? 'rotate-180 transition-transform' : 'transition-transform'} /></button>
          {showPastPlans && <div>{pastPlans.map((day) => { const date = getProtocolDate(day); const completed = completedForDay(day); return <button key={day} onClick={() => selectUnlockedDay(day)} className={selectedDay === day ? 'selected' : ''}><span>Day {day}</span><strong>{date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</strong><small>{completed} tasks completed</small></button>; })}</div>}
        </section>}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl md:text-3xl font-bold text-blue-400">{dailyPlan.completedCount}</p>
            <p className="text-sm text-slate-600">Tasks done</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl md:text-3xl font-bold text-purple-400">{dailyPlan.totalCount - dailyPlan.completedCount}</p>
            <p className="text-sm text-slate-600">Remaining</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl md:text-3xl font-bold text-green-400">{dailyPlan.progressPercentage}%</p>
            <p className="text-sm text-slate-600">Completion</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl md:text-3xl font-bold text-pink-500">{Number(completedHours.toFixed(1))}</p>
            <p className="text-sm text-slate-600">Hours studied</p>
          </div>
        </div>

        <section className="protocol-calendar">
          <button className="protocol-calendar-toggle" onClick={() => setShowSchedule((value) => !value)} aria-expanded={showSchedule}>
            <span><Calendar className="w-5 h-5" /><span><strong>30-day study path</strong><small>Today is Day {protocolDay}. Future days unlock on their calendar date.</small></span></span>
            <ChevronDown className={showSchedule ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>
          {showSchedule && <div className="protocol-day-grid">
            {Array.from({ length: PROTOCOL_DAYS }, (_, index) => {
              const day = index + 1;
              const unlocked = day <= protocolDay;
              const date = getProtocolDate(day);
              const tasks = generateTasksForProtocolDay(day);
              return <button key={day} onClick={() => selectUnlockedDay(day)} disabled={!unlocked} className={`protocol-day ${day === selectedDay ? 'today' : ''} ${unlocked ? 'unlocked' : 'locked'}`}>
                <div><span>Day {day}</span><time>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time></div>
                <h3>{getPhase(day).replace(/^Phase \d: /, '')}</h3>
                {unlocked ? <p>{tasks[0]?.task}</p> : <p><LockKeyhole size={13} /> Unlocks {date.toLocaleDateString('en-US', { weekday: 'long' })}</p>}
              </button>;
            })}
          </div>}
        </section>

        {/* Phase Reminder */}
        {protocolDay > 0 && protocolDay <= 30 && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed text-amber-950">
              <span className="font-bold">{currentPhase}</span> — {phaseDay}. Complete the next clear block; if one slips, use the recovery route and continue.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
