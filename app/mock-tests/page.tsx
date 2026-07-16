import { AlertTriangle, Target, Brain, Clock } from 'lucide-react';

export default function MockTestsPage() {
  const subjects = [
    {
      name: 'Paper 1: Accounting',
      code: 'accounts',
      questions: 40,
      duration: '2 hours',
      color: 'bg-blue-500',
      description: 'MCQs covering all accounting topics',
    },
    {
      name: 'Paper 2: Business Law',
      code: 'law',
      questions: 40,
      duration: '2 hours',
      color: 'bg-purple-500',
      description: 'Legal provisions and case studies',
    },
    {
      name: 'Paper 3: Quantitative Aptitude',
      code: 'math',
      questions: 40,
      duration: '2 hours',
      color: 'bg-green-500',
      description: 'Maths, Statistics & Logical Reasoning',
    },
    {
      name: 'Paper 4: Business Economics',
      code: 'economics',
      questions: 40,
      duration: '2 hours',
      color: 'bg-orange-500',
      description: 'Economics concepts & commercial awareness',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Mock Tests
        </h1>
        <p className="text-xl text-purple-200 text-center mb-12">
          Phase 3: The Simulation Window — build exam stamina under pressure
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">40</div>
            <p className="text-purple-200">Questions per Test</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">2 hrs</div>
            <p className="text-purple-200">Duration</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">-0.25</div>
            <p className="text-purple-200">Negative Marking</p>
          </div>
        </div>

        {/* Subject Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {subjects.map((subject) => (
            <div
              key={subject.code}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 hover:bg-white/20 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-full ${subject.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{subject.code[0].toUpperCase()}</span>
                </div>
                <span className="text-sm text-gray-400 bg-white/10 px-3 py-1 rounded-full">
                  {subject.duration}
                </span>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {subject.name}
              </h3>
              <p className="text-gray-400 mb-4">{subject.description}</p>

              <div className="flex items-center justify-between">
                <div className="text-sm text-purple-300">
                  {subject.questions} Questions
                </div>
                <button className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-full transition-colors font-medium text-sm">
                  Start Test
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Phase 3: Simulation Protocol */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold text-green-300 mb-6 flex items-center gap-3">
            <Brain className="w-6 h-6" />
            Simulation Window Protocol (Days 21-27)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">5-7 Full-Length MTPs</p>
                  <p className="text-sm text-gray-400">Under exact exam conditions. No phone, no breaks, no music.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Match Exam Timing</p>
                  <p className="text-sm text-gray-400">e.g., Paper 3 from 2:00 PM - 4:00 PM to build biological rhythm.</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">The Mistake Log</p>
                  <p className="text-sm text-gray-400">Categorize every lost point: Calculation, Conceptual, Application, Time Management.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Brain className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">1.5-Day Pre-Exam Drill</p>
                  <p className="text-sm text-gray-400">Simulate the full 31.5-hour pre-exam window using only summary notes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Test Instructions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-sm">1</div>
                <p className="text-gray-300 text-sm">Each question carries 1 mark</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-sm">2</div>
                <p className="text-gray-300 text-sm">Negative marking of 0.25 for wrong answers</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 text-white text-sm">3</div>
                <p className="text-gray-300 text-sm">Never guess blindly — only mark if you can eliminate 2 options</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 text-white text-sm">4</div>
                <p className="text-gray-300 text-sm">Leaving a question blank is better than a blind guess</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 text-white text-sm">5</div>
                <p className="text-gray-300 text-sm">Auto-submit when timer expires</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 text-white text-sm">6</div>
                <p className="text-gray-300 text-sm">If score &lt;60%, spend double time analyzing why — Mistake Log is key</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
