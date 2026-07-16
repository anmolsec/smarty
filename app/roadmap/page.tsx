import { Target, BookOpen, FileText, Brain, AlertTriangle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import FocusMap from '@/app/components/FocusMap';

interface PhaseWithSubjects {
  title: string; days: string; color: string; icon: LucideIcon; goal: string;
  subjects: { name: string; target: string; detail: string }[];
  points?: never;
}
interface PhaseWithPoints {
  title: string; days: string; color: string; icon: LucideIcon; goal: string;
  points: string[];
  subjects?: never;
}
type Phase = PhaseWithSubjects | PhaseWithPoints;

export default function RoadmapPage() {
  const phases: Phase[] = [
    {
      title: 'Phase 1: Rapid Syllabus Sweep',
      days: 'Days 1-10',
      color: 'bg-blue-500',
      icon: BookOpen,
      goal: '100% conceptual reinforcement of A-Category (high-weightage) chapters',
      subjects: [
        {
          name: 'Accounts',
          target: 'Final Accounts of Companies, Issue of Shares/Debentures, Rectification of Errors',
          detail: 'Solve all ICAI Module illustrations for these chapters',
        },
        {
          name: 'Law',
          target: 'Indian Contract Act (Sections 1-75) and Companies Act',
          detail: 'Memorize section numbers and keywords',
        },
        {
          name: 'Math/Stats',
          target: 'Statistics (40-mark backbone) and Time Value of Money (Annuities)',
          detail: 'Master calculator M+, M-, GT functions',
        },
        {
          name: 'Economics',
          target: 'Theory of Demand & Supply, Price Determination, Cost Curves',
          detail: 'Draw every graph by hand 3 times',
        },
      ],
    },
    {
      title: 'Phase 2: Heavy Application & RTPs',
      days: 'Days 11-20',
      color: 'bg-purple-500',
      icon: FileText,
      goal: 'Bridge the gap between reading and writing. Build physical and mental stamina.',
      points: [
        'Write one 10-15 mark Law answer and one full Accounts problem daily using the strict 4-Step Method',
        'Solve 50-100 MCQs daily for Math and Eco. Practice Option Elimination for -0.25 penalty',
        'Solve last 3 attempts of ICAI RTPs. Dissect ICAI Suggested Answers to mimic their exact language',
      ],
    },
    {
      title: 'Phase 3: The Simulation Window',
      days: 'Days 21-27',
      color: 'bg-green-500',
      icon: Brain,
      goal: 'Build exam stamina and flawless mental pacing under pressure',
      points: [
        'Attempt 5-7 full-length MTPs under exact exam conditions (e.g., Paper 3 from 2:00-4:00 PM)',
        'No phone, no breaks, no music during mock drills',
        'Maintain Mistake Log: categorize every point lost as Calculation, Conceptual, Application, or Time Management',
        'Perform one full simulation of the 31.5-hour pre-exam window using only summary notes',
      ],
    },
    {
      title: 'Phase 4: Final Recall',
      days: 'Days 28-30',
      color: 'bg-orange-500',
      icon: Target,
      goal: 'Maximum retention, zero cognitive overload, stress management',
      points: [
        'ZERO NEW TOPICS. Under no circumstances open a new chapter',
        'Active Recall: Focus exclusively on 10-page condensed Formula Sheet, Law Keyword Notebook, and Mistake Log',
        'One final timed run of 20 Finance Math questions using only GT and memory functions on calculator',
      ],
    },
  ];

  const getPhaseIcon = (icon: LucideIcon) => {
    const Icon = icon;
    return Icon;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-red-500/20 border border-red-500/40 rounded-full px-4 py-1 text-red-300 text-sm font-medium mb-4">
            🚨 STRICT DRILL PROTOCOL
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            30-Day AIR 1 Roadmap
          </h1>
          <p className="text-xl text-purple-200">
            Military-grade execution plan. Follow strictly. Deviation is the enemy of AIR 1.
          </p>
        </div>

        {/* Phase Timeline */}
        <div className="space-y-8">
          {phases.map((phase, index) => {
            const Icon = getPhaseIcon(phase.icon);
            return (
              <div key={index} className="relative animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                {index < phases.length - 1 && (
                  <div className="hidden md:block absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent" />
                )}

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 md:ml-16">
                  <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                    {/* Phase Number Badge */}
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${phase.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-1">
                        <h2 className="text-xl md:text-2xl font-bold text-white">{phase.title}</h2>
                        <span className={`${phase.color} text-white text-sm font-medium px-3 py-1 rounded-full inline-block w-fit`}>
                          {phase.days}
                        </span>
                      </div>
                      <p className="text-purple-200 mb-4 text-sm md:text-base">{phase.goal}</p>

                      {/* Phase-specific content */}
                      {phase.subjects ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {phase.subjects.map((subj: { name: string; target: string; detail: string }, si: number) => (
                            <div key={si} className="bg-white/5 rounded-xl p-4 border border-white/10">
                              <h3 className="text-sm font-bold text-white mb-1">{subj.name}</h3>
                              <p className="text-xs text-purple-200 mb-1">{subj.target}</p>
                              <p className="text-xs text-gray-400">{subj.detail}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-2">
                          {phase.points!.map((point, pi) => (
                            <li key={pi} className="flex items-start gap-2 text-sm md:text-base text-gray-300">
                              <span className={`w-5 h-5 rounded-full ${phase.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                <span className="text-white text-xs font-bold">{pi + 1}</span>
                              </span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Milestones */}
        <FocusMap />

        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Key Milestones</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-1">Day 10</div>
              <p className="text-purple-200 text-sm">Syllabus Sweep Complete</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-1">Day 20</div>
              <p className="text-purple-200 text-sm">RTPs Mastered</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-1">Day 27</div>
              <p className="text-purple-200 text-sm">Simulations Done</p>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-3xl md:text-4xl font-bold text-orange-400 mb-1">Day 30</div>
              <p className="text-purple-200 text-sm">Exam Ready — AIR 1</p>
            </div>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-8 bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-red-300 mb-2">Final Warning</h3>
              <p className="text-sm text-red-200">
                AIR 1 is not won by the smartest student. It is won by the most disciplined student who executes this exact plan without a single gap day.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/daily-plan"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-colors"
          >
            Start Today&apos;s Plan
            <Target className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
