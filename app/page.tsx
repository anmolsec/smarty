import Link from 'next/link';
import { Calendar, BookOpen, Target, FileText, Clock, TrendingUp, AlertTriangle, Zap, Shield, Sparkles } from 'lucide-react';

export default function Home() {

  const quickAccess = [
    { title: 'Daily Plan', icon: Calendar, href: '/daily-plan', description: "Today's scheduled tasks" },
    { title: 'Mock Tests', icon: FileText, href: '/mock-tests', description: 'Practice with timed tests' },
    { title: 'Chapters', icon: Target, href: '/chapters', description: 'Subject blocks & recovery guidance' },
    { title: 'Flashcards', icon: Sparkles, href: '/flashcards', description: 'Short active-recall loops' },
  ];

  const timeSlots = [
    { time: '06:00-09:00', label: 'Practical Subjects', subjects: 'Accounts & Math', rule: 'Put the phone out of reach and use your freshest block for calculations.' },
    { time: '10:30-13:30', label: 'Descriptive Subjects', subjects: 'Law (Full answers)', rule: 'Write at least one full 10-mark answer with 4-Step method.' },
    { time: '15:00-17:00', label: 'Objective Subjects', subjects: 'Eco & Math MCQs', rule: 'Use timed MCQ practice and record why each eliminated option is wrong.' },
    { time: '19:00-21:00', label: 'Active Testing & Correction', subjects: 'Review & Mistake Log', rule: 'Solve chapter-wise test or review Mistake Log entries.' },
  ];

  const differentiators = [
    { icon: FileText, title: 'Mandatory Working Notes', desc: 'Label clearly (WN1, WN2). ICAI awards step-marks even if final answer is wrong.', color: 'text-blue-400' },
    { icon: Zap, title: 'Legal Keyword Underlining', desc: 'Make the reasoning easy to follow. Underline terms such as “Void Ab Initio”, “Consensus Ad Idem”, and “Free Consent”.', color: 'text-purple-400' },
    { icon: TrendingUp, title: 'Calculator Efficiency', desc: 'Master M+, M-, and GT keys, then build speed without skipping a calculation check.', color: 'text-green-400' },
    { icon: Shield, title: 'Selective Accuracy', desc: 'Never guess blindly with -0.25 penalty. Only mark if you can eliminate 2 options.', color: 'text-orange-400' },
  ];

  return (
    <div className="app-shell-bright min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          <div className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 mb-4">
            30-day focused study protocol
          </div>
          <h1 className="hero-title text-4xl md:text-6xl font-bold text-slate-900 tracking-tight">
            CA Foundation <span className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AIR 1</span>
          </h1>
          <p className="hero-subtitle text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A structured 30-day plan for calm, consistent exam preparation.
          </p>
          <p className="text-slate-500 text-sm md:text-base">
            One clear block at a time—learn, practise, review, and recall.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="stat-number text-4xl font-bold text-slate-900">30</p>
              <p className="text-slate-600">Day-by-day plan</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="stat-number text-4xl font-bold text-slate-900">4</p>
              <p className="text-slate-600">Subjects</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <Target className="w-8 h-8 text-pink-400 mx-auto mb-3" />
              <p className="stat-number text-4xl font-bold text-slate-900">97+</p>
              <p className="text-slate-600">Target aggregate</p>
            </div>
          </div>
        </div>

        {/* Core Philosophy */}
        <div className="mb-16 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm animate-fade-in animate-fade-in-delay-1">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">Core Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-4xl font-bold text-blue-400 mb-2">97+</div>
              <p className="text-slate-600">Target aggregate marks</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl font-bold text-purple-400 mb-2">8-10</div>
              <p className="text-slate-600">Hours of focused work daily</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl font-bold text-green-400 mb-2">1</div>
              <p className="text-slate-600">Clear next step after a missed block</p>
            </div>
          </div>
          <p className="text-center text-slate-500 mt-4 text-sm md:text-base">
            Steady practice turns effort into confidence. If a block slips, restart with the next clear task.
          </p>
        </div>

        {/* Quick Access Grid */}
        <div className="mb-16 animate-fade-in animate-fade-in-delay-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">Study Workspace</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickAccess.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all group hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
                  <item.icon className="w-10 h-10 text-purple-300 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Daily Ranker Routine */}
        <div className="mb-16 animate-fade-in animate-fade-in-delay-2">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-3">
            <Clock className="w-7 h-7 md:w-8 md:h-8 text-blue-400" />
            Daily Focus Routine
          </h2>
          <p className="text-center text-slate-600 mb-6 text-sm md:text-base">
            Place calculation-heavy work in your freshest block, then use later sessions for recall and correction.
          </p>

          {/* Mobile: cards view, Desktop: table */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-emerald-50">
                  <th className="p-4 text-slate-900 font-semibold">Time slot</th>
                  <th className="p-4 text-slate-900 font-semibold">Activity</th>
                  <th className="p-4 text-slate-900 font-semibold">Focus cue</th>
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, i) => (
                  <tr key={i} className="border-t border-slate-200 hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-emerald-700 font-bold whitespace-nowrap">{slot.time}</td>
                    <td className="p-4 text-slate-900">{slot.label}</td>
                    <td className="p-4 text-slate-600 text-sm leading-relaxed">{slot.rule}</td>
                  </tr>
                ))}
                <tr className="border-t border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-emerald-700 font-bold whitespace-nowrap">21:00-22:00</td>
                  <td className="p-4 text-slate-900">Pre-sleep consolidation</td>
                  <td className="p-4 text-slate-600 text-sm leading-relaxed">Review formulas and keywords. Put screens away 30 minutes before sleep.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {timeSlots.map((slot, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-base font-bold text-emerald-700">{slot.time}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1">{slot.label}</h3>
                <p className="text-sm text-emerald-700 mb-1">{slot.subjects}</p>
                <p className="text-sm leading-relaxed text-slate-600">{slot.rule}</p>
              </div>
            ))}
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-base font-bold text-emerald-700">21:00-22:00</span>
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">Pre-sleep consolidation</h3>
              <p className="text-sm leading-relaxed text-slate-600">Review formulas and keywords. Put screens away 30 minutes before sleep.</p>
            </div>
          </div>
        </div>

        {/* AIR 1 Differentiators */}
        <div className="mb-16 animate-fade-in animate-fade-in-delay-3">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
            Exam-ready habits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {differentiators.map((item, i) => (
              <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Focus agreements */}
        <div className="animate-fade-in animate-fade-in-delay-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center flex items-center justify-center gap-3">
            <AlertTriangle className="w-7 h-7 md:w-8 md:h-8 text-amber-600" />
            Focus agreements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                HELPFUL
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm leading-relaxed text-emerald-900">
                  <span className="text-green-400 mt-0.5">✓</span>
                  Track daily progress with the checklist. Each completed block gives the next task a clear starting point.
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-emerald-900">
                  <span className="text-green-400 mt-0.5">✓</span>
                  If you score &lt;60% on an MTP, classify every lost mark before the next attempt and schedule one targeted recovery block.
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h3 className="text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                AVOID
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm leading-relaxed text-amber-950">
                  <span className="text-amber-600 mt-0.5">!</span>
                  Do not spend &gt;30 min/day on low-yield complex topics if Statistics and Contract Act are weak. Secure 60 easy marks first.
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-amber-950">
                  <span className="text-amber-600 mt-0.5">!</span>
                  Avoid comparing progress during focus blocks. Return to your own next task and use teachers or peers for specific doubts.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-8 py-3 font-semibold text-white transition-colors hover:bg-emerald-800"
            >
              View Full Protocol Roadmap
              <Target className="w-5 h-5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
