'use client';

import { useState, useEffect } from 'react';
import { assignTasksForUser, saveTaskCompletion, getCurrentTimeSlot, getSuggestedSubject } from '@/lib/schedule';
import { Task, SUBJECT_LABELS, SUBJECT_COLORS } from '@/types';
import { Clock, CheckCircle, Circle, Calendar, TrendingUp } from 'lucide-react';

export default function DailyPlanPage() {
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const [dailyPlan, setDailyPlan] = useState<any>(null);
  const [currentTimeSlot, setCurrentTimeSlot] = useState<string>('');
  const [suggestedSubject, setSuggestedSubject] = useState<string>('');

  useEffect(() => {
    // Update datetime every minute
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentDateTime(now);
      
      // Get current time slot
      const slot = getCurrentTimeSlot();
      if (slot) {
        setCurrentTimeSlot(slot.replace('_', ' ').toUpperCase());
        const subject = getSuggestedSubject();
        if (subject) {
          setSuggestedSubject(SUBJECT_LABELS[subject]);
        }
      } else {
        setCurrentTimeSlot('Outside Study Hours');
        setSuggestedSubject('Rest & Recharge');
      }
    }, 60000);

    // Load daily plan
    const plan = assignTasksForUser(new Date());
    setDailyPlan(plan);

    return () => clearInterval(timer);
  }, []);

  const handleTaskToggle = (taskId: string, done: boolean) => {
    saveTaskCompletion(taskId, done);
    
    // Update local state
    setDailyPlan((prev: any) => ({
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

  if (!dailyPlan) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header with Live DateTime */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Daily Study Plan
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-lg text-purple-200">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Calendar className="w-5 h-5" />
              <span>{currentDateTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
              <Clock className="w-5 h-5" />
              <span>{currentDateTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        {/* Current Time Slot Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Current Time Slot</h2>
              <p className="text-2xl font-bold text-purple-300">{currentTimeSlot}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold text-white mb-2">Suggested Focus</h2>
              <p className="text-2xl font-bold text-green-300">{suggestedSubject}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-semibold text-white mb-2">Progress</h2>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                <p className="text-2xl font-bold text-blue-300">{dailyPlan.progressPercentage}%</p>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${dailyPlan.progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-300 mt-2">
            {dailyPlan.completedCount} of {dailyPlan.totalCount} tasks completed
          </p>
        </div>

        {/* Tasks by Time Slot */}
        <div className="grid gap-6">
          {Object.entries({
            'Morning Practical (06:00-09:00)': dailyPlan.tasks.filter((t: Task) => t.timeSlot === 'morning_practical'),
            'Midday Descriptive (10:30-13:30)': dailyPlan.tasks.filter((t: Task) => t.timeSlot === 'midday_descriptive'),
            'Afternoon Objective (15:00-17:00)': dailyPlan.tasks.filter((t: Task) => t.timeSlot === 'afternoon_objective'),
            'Evening Revision (19:00-21:00)': dailyPlan.tasks.filter((t: Task) => t.timeSlot === 'evening_revision'),
          }).map(([slotName, tasks]) => (
            <div key={slotName} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">{slotName}</h3>
              <div className="space-y-3">
                {tasks.map((task: Task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                      task.done 
                        ? 'bg-green-900/30 border border-green-500/30' 
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <button
                      onClick={() => handleTaskToggle(task.id, !task.done)}
                      className="flex-shrink-0"
                    >
                      {task.done ? (
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400 hover:text-white" />
                      )}
                    </button>
                    
                    <div className={`flex-shrink-0 w-3 h-3 rounded-full ${SUBJECT_COLORS[task.subject]}`} />
                    
                    <div className="flex-1">
                      <h4 className={`font-medium ${task.done ? 'text-green-300 line-through' : 'text-white'}`}>
                        {task.task}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {SUBJECT_LABELS[task.subject]} • {task.duration} min
                      </p>
                    </div>
                    
                    {task.completedAt && (
                      <span className="text-xs text-green-400">
                        Completed at {new Date(task.completedAt).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <p className="text-3xl font-bold text-blue-400">{dailyPlan.completedCount}</p>
            <p className="text-sm text-gray-300">Tasks Done</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <p className="text-3xl font-bold text-purple-400">{dailyPlan.totalCount - dailyPlan.completedCount}</p>
            <p className="text-sm text-gray-300">Tasks Remaining</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <p className="text-3xl font-bold text-green-400">{dailyPlan.progressPercentage}%</p>
            <p className="text-sm text-gray-300">Completion</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <p className="text-3xl font-bold text-pink-400">{Math.round(dailyPlan.completedCount * 1.5)}</p>
            <p className="text-sm text-gray-300">Hours Studied</p>
          </div>
        </div>

      </div>
    </div>
  );
}
