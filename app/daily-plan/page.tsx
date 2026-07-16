'use client';

import { useState, useEffect } from 'react';
import { assignTasksForUser, saveTaskCompletion, getCurrentTimeSlot, getSuggestedSubject, getProtocolDay, getPhase, getPhaseDays, getProtocolDate, generateTasksForProtocolDay, PROTOCOL_DAYS } from '@/lib/schedule';
import { DailyPlan, Task, SUBJECT_LABELS, SUBJECT_COLORS } from '@/types';
import { Clock, CheckCircle, Circle, Calendar, TrendingUp, AlertTriangle, ChevronDown, LockKeyhole } from 'lucide-react';

export default function DailyPlanPage() {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const [dailyPlan, setDailyPlan] = useState<DailyPlan>(() => assignTasksForUser(new Date()));
  const [currentTimeSlot, setCurrentTimeSlot] = useState<string>('');
  const [suggestedSubject, setSuggestedSubject] = useState<string>('');
  const [showSchedule, setShowSchedule] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now);
      const slot = getCurrentTimeSlot();
      if (slot) {
        setCurrentTimeSlot(slot.replace('_', ' ').replace('morning', 'Morning').replace('midday', 'Midday').replace('afternoon', 'Afternoon').replace('evening', 'Evening').replace('practical', 'Practical').replace('descriptive', 'Descriptive').replace('objective', 'Objective').replace('revision', 'Revision'));
        const subject = getSuggestedSubject();
        if (subject) setSuggestedSubject(SUBJECT_LABELS[subject]);
      } else {
        setCurrentTimeSlot('Outside Study Hours — Rest & Recharge');
        setSuggestedSubject('');
      }
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleTaskToggle = (taskId: string, done: boolean) => {
    saveTaskCompletion(taskId, done);
    setDailyPlan((prev: DailyPlan) => ({
      ...prev,
      tasks: prev.tasks.map((task: Task) =>
        task.id === taskId ? { ...task, done } : task
      ),
      completedCount: done
        ? prev.completedCount + 1
        : Math.max(0, prev.completedCount - 1),
      progressPercentage: Math.round(
        ((done ? prev.completedCount + 1 : prev.completedCount - 1) / prev.totalCount) * 100
      ),
    }));
  };

  const protocolDay = getProtocolDay(new Date());
  const currentPhase = getPhase(protocolDay);
  const phaseDay = getPhaseDays(protocolDay);

  const timeSlotLabels: Record<string, string> = {
    morning_practical: 'Morning Practical (06:00-09:00)',
    midday_descriptive: 'Midday Descriptive (10:30-13:30)',
    afternoon_objective: 'Afternoon Objective (15:00-17:00)',
    evening_revision: 'Evening Revision (19:00-21:00)',
  };

  return (
    <div className="app-shell-bright min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-3">
          {protocolDay > 0 && protocolDay <= 30 && (
            <div className="inline-block bg-red-500/20 border border-red-500/40 rounded-full px-3 py-1 text-red-300 text-xs md:text-sm font-medium">
              🚨 {currentPhase} — {phaseDay}
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Daily Study Plan
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-sm md:text-base text-purple-200">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4" />
              <span>{currentDateTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span>{currentDateTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Current Status Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h2 className="text-sm font-semibold text-purple-200 mb-1">Current Time Slot</h2>
              <p className="text-lg md:text-xl font-bold text-blue-300">{currentTimeSlot}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-purple-200 mb-1">Suggested Focus</h2>
              <p className="text-lg md:text-xl font-bold text-green-300">{suggestedSubject || '—'}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-purple-200 mb-1">Today&apos;s Progress</h2>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <p className="text-lg md:text-xl font-bold text-blue-300">{dailyPlan.progressPercentage}%</p>
              </div>
            </div>
          </div>

          <div className="mt-4 w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${dailyPlan.progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-300 mt-2">
            {dailyPlan.completedCount} of {dailyPlan.totalCount} tasks completed
          </p>
        </div>

        {/* Tasks by Time Slot */}
        <div className="grid gap-4">
          {Object.entries(timeSlotLabels).map(([slotKey, slotLabel]) => {
            const tasks = dailyPlan.tasks.filter((t: Task) => t.timeSlot === slotKey);
            if (tasks.length === 0) return null;
            return (
              <div key={slotKey} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10">
                <h3 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  {slotLabel}
                </h3>
                <div className="space-y-2">
                  {tasks.map((task: Task) => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-3 p-3 md:p-4 rounded-lg transition-all ${
                        task.done
                          ? 'bg-green-900/30 border border-green-500/30'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
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
                          <Circle className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-white" />
                        )}
                      </button>

                      <div className={`flex-shrink-0 w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${SUBJECT_COLORS[task.subject]}`} />

                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm md:text-base font-medium truncate ${task.done ? 'text-green-300 line-through' : 'text-white'}`}>
                          {task.task}
                        </h4>
                        <p className="text-xs md:text-sm text-gray-400">
                          {SUBJECT_LABELS[task.subject]} • {task.duration} min
                        </p>
                      </div>

                      {task.completedAt && (
                        <span className="text-xs text-green-400 hidden md:inline">
                          {new Date(task.completedAt).toLocaleTimeString()}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <p className="text-2xl md:text-3xl font-bold text-blue-400">{dailyPlan.completedCount}</p>
            <p className="text-xs md:text-sm text-gray-300">Tasks Done</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <p className="text-2xl md:text-3xl font-bold text-purple-400">{dailyPlan.totalCount - dailyPlan.completedCount}</p>
            <p className="text-xs md:text-sm text-gray-300">Remaining</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <p className="text-2xl md:text-3xl font-bold text-green-400">{dailyPlan.progressPercentage}%</p>
            <p className="text-xs md:text-sm text-gray-300">Completion</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <p className="text-2xl md:text-3xl font-bold text-pink-400">{Math.round(dailyPlan.completedCount * 1.5)}</p>
            <p className="text-xs md:text-sm text-gray-300">Hours Studied</p>
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
              return <article key={day} className={`protocol-day ${day === protocolDay ? 'today' : ''} ${unlocked ? 'unlocked' : 'locked'}`}>
                <div><span>Day {day}</span><time>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</time></div>
                <h3>{getPhase(day).replace(/^Phase \d: /, '')}</h3>
                {unlocked ? <p>{tasks[0]?.task}</p> : <p><LockKeyhole size={13} /> Unlocks {date.toLocaleDateString('en-US', { weekday: 'long' })}</p>}
              </article>;
            })}
          </div>}
        </section>

        {/* Phase Reminder */}
        {protocolDay > 0 && protocolDay <= 30 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">
              <span className="font-bold">{currentPhase}</span> — {phaseDay}. Consistency beats intelligence. No gap days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
