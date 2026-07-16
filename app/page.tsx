import Link from 'next/link';
import { Calendar, BookOpen, Target, FileText, Clock, TrendingUp, AlertTriangle, Zap, Shield } from 'lucide-react';

export default function Home() {

  const quickAccess = [
    { title: 'Daily Plan', icon: Calendar, href: '/daily-plan', description: "Today's scheduled tasks" },
    { title: 'Mock Tests', icon: FileText, href: '/mock-tests', description: 'Practice with timed tests' },
    { title: 'Roadmap', icon: Target, href: '/roadmap', description: '30-day protocol phases' },
    { title: 'Resources', icon: BookOpen, href: '/resources', description: 'Study materials & links' },
  ];

  const timeSlots = [
    { time: '06:00-09:00', label: 'Practical Subjects', subjects: 'Accounts & Math', rule: 'No phone allowed. Brain freshest for complex calculations.' },
    { time: '10:30-13:30', label: 'Descriptive Subjects', subjects: 'Law (Full answers)', rule: 'Write at least one full 10-mark answer with 4-Step method.' },
    { time: '15:00-17:00', label: 'Objective Subjects', subjects: 'Eco & Math MCQs', rule: 'High-speed MCQ practice. Use elimination tactics.' },
    { time: '19:00-21:00', label: 'Active Testing & Correction', subjects: 'Review & Mistake Log', rule: 'Solve chapter-wise test or review Mistake Log entries.' },
  ];

  const differentiators = [
    { icon: FileText, title: 'Mandatory Working Notes', desc: 'Label clearly (WN1, WN2). ICAI awards step-marks even if final answer is wrong.', color: 'text-blue-400' },
    { icon: Zap, title: 'Legal Keyword Underlining', desc: 'Evaluators scan in <90s. Underline "Void Ab Initio", "Consensus Ad Idem", "Free Consent".', color: 'text-purple-400' },
    { icon: TrendingUp, title: 'Calculator Efficiency', desc: 'Master M+, M-, GT keys. Annuity problem in <72 seconds, not 3 min.', color: 'text-green-400' },
    { icon: Shield, title: 'Selective Accuracy', desc: 'Never guess blindly with -0.25 penalty. Only mark if you can eliminate 2 options.', color: 'text-orange-400' },
  ];

  return (
    <div className="app-shell-bright min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          <div className="inline-block bg-red-500/20 border border-red-500/40 rounded-full px-4 py-1 text-red-300 text-sm font-medium mb-4">
            🚨 30-DAY AIR 1 STRICT DRILL PROTOCOL
          </div>
          <h1 className="hero-title text-4xl md:text-6xl font-bold text-white tracking-tight">
            CA Foundation <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AIR 1</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto">
            Military-grade execution plan. 30 days. 97+ aggregate. Zero deviation.
          </p>
          <p className="text-gray-400 text-sm">
            This is no longer a study guide. This is a rank-winning protocol.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="stat-number text-4xl font-bold text-white">30</p>
              <p className="text-purple-200">Day-by-day plan</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <BookOpen className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="stat-number text-4xl font-bold text-white">4</p>
              <p className="text-purple-200">Subjects</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <Target className="w-8 h-8 text-pink-400 mx-auto mb-3" />
              <p className="stat-number text-4xl font-bold text-white">97+</p>
              <p className="text-purple-200">Target Aggregate</p>
            </div>
          </div>
        </div>

        {/* Core Philosophy */}
        <div className="mb-16 bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 animate-fade-in animate-fade-in-delay-1">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">Core Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-4xl font-bold text-blue-400 mb-2">97+</div>
              <p className="text-purple-200">Target Aggregate Marks</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl font-bold text-purple-400 mb-2">8-10</div>
              <p className="text-purple-200">Hours Deep Work Daily</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl font-bold text-green-400 mb-2">0</div>
              <p className="text-purple-200">Gap Days Allowed</p>
            </div>
          </div>
          <p className="text-center text-gray-400 mt-4 text-sm">
            Consistency beats intelligence. You will not miss a single revision cycle.
          </p>
        </div>

        {/* Quick Access Grid */}
        <div className="mb-16 animate-fade-in animate-fade-in-delay-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">Command Center</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickAccess.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all cursor-pointer group h-full">
                  <item.icon className="w-10 h-10 text-purple-300 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-purple-200 text-sm">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Daily Ranker Routine */}
        <div className="mb-16 animate-fade-in animate-fade-in-delay-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
            <Clock className="w-7 h-7 md:w-8 md:h-8 text-blue-400" />
            Daily Ranker Routine
          </h2>
          <p className="text-center text-gray-400 mb-6 text-sm">
            Top performers align subject difficulty with their natural biological energy peaks.
          </p>

          {/* Mobile: cards view, Desktop: table */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/10">
                  <th className="p-4 text-white font-semibold">Time Slot</th>
                  <th className="p-4 text-white font-semibold">Activity</th>
                  <th className="p-4 text-white font-semibold">Strict Rule</th>
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, i) => (
                  <tr key={i} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-blue-300 font-bold whitespace-nowrap">{slot.time}</td>
                    <td className="p-4 text-white">{slot.label}</td>
                    <td className="p-4 text-gray-400 text-sm">{slot.rule}</td>
                  </tr>
                ))}
                <tr className="border-t border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-blue-300 font-bold whitespace-nowrap">21:00-22:00</td>
                  <td className="p-4 text-white">Pre-Sleep Consolidation</td>
                  <td className="p-4 text-gray-400 text-sm">Passive review of Formula & Keyword Notebook. No screens 30 min before bed.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {timeSlots.map((slot, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-base font-bold text-blue-300">{slot.time}</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-1">{slot.label}</h3>
                <p className="text-sm text-purple-200 mb-1">{slot.subjects}</p>
                <p className="text-xs text-gray-400">{slot.rule}</p>
              </div>
            ))}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-base font-bold text-blue-300">21:00-22:00</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Pre-Sleep Consolidation</h3>
              <p className="text-xs text-gray-400">Passive review of Formula & Keyword Notebook. No screens 30 min before bed.</p>
            </div>
          </div>
        </div>

        {/* AIR 1 Differentiators */}
        <div className="mb-16 animate-fade-in animate-fade-in-delay-3">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            AIR 1 Differentiators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {differentiators.map((item, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Non-Negotiable Rules */}
        <div className="animate-fade-in animate-fade-in-delay-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
            <AlertTriangle className="w-7 h-7 md:w-8 md:h-8 text-red-400" />
            Non-Negotiable Rules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-green-300 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                DO THIS
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-green-200">
                  <span className="text-green-400 mt-0.5">✓</span>
                  Track daily progress on a physical checklist. Psychological momentum of ticking off tasks is critical.
                </li>
                <li className="flex items-start gap-3 text-sm text-green-200">
                  <span className="text-green-400 mt-0.5">✓</span>
                  If you score &lt;60% on an MTP, spend double the test time analyzing <em>why</em>. Mistake Log is your most valuable asset.
                </li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-red-300 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full" />
                DO NOT DO THIS
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-red-200">
                  <span className="text-red-400 mt-0.5">✗</span>
                  Do not spend &gt;30 min/day on low-yield complex topics if Statistics and Contract Act are weak. Secure 60 easy marks first.
                </li>
                <li className="flex items-start gap-3 text-sm text-red-200">
                  <span className="text-red-400 mt-0.5">✗</span>
                  Do not discuss the exam, syllabus, or difficulty with peers. Isolate yourself and trust the protocol.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-colors"
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
