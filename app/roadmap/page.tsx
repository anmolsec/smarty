export default function RoadmapPage() {
  const phases = [
    {
      title: 'Phase 1: Foundation Building',
      days: 'Days 1-10',
      color: 'bg-blue-500',
      goals: [
        'Complete basic concepts of all subjects',
        'Understand exam pattern and syllabus',
        'Build strong fundamentals',
        'Start formula sheets',
      ],
    },
    {
      title: 'Phase 2: Intensive Practice',
      days: 'Days 11-20',
      color: 'bg-purple-500',
      goals: [
        'Solve RTP questions',
        'Practice past year papers',
        'Focus on weak areas',
        'Time-bound practice sessions',
      ],
    },
    {
      title: 'Phase 3: Mock Tests & Analysis',
      days: 'Days 21-27',
      color: 'bg-green-500',
      goals: [
        'Take full-length mock tests',
        'Analyze performance',
        'Improve speed and accuracy',
        'Revise important topics',
      ],
    },
    {
      title: 'Phase 4: Final Revision',
      days: 'Days 28-30',
      color: 'bg-orange-500',
      goals: [
        'Quick revision of all subjects',
        'Review formula sheets',
        'Light practice only',
        'Rest and mental preparation',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          90-Day Preparation Roadmap
        </h1>
        <p className="text-xl text-purple-200 text-center mb-12">
          Structured path to AIR 1 success
        </p>

        <div className="space-y-8">
          {phases.map((phase, index) => (
            <div key={index} className="relative">
              {/* Timeline connector */}
              {index < phases.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-transparent" />
              )}
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 ml-12">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full ${phase.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-1">{phase.title}</h2>
                    <p className="text-purple-300 mb-4">{phase.days}</p>
                    
                    <ul className="space-y-2">
                      {phase.goals.map((goal, goalIndex) => (
                        <li key={goalIndex} className="flex items-start gap-2 text-gray-300">
                          <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Key Milestones */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Key Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">Day 10</div>
              <p className="text-purple-200">Foundation Complete</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">Day 20</div>
              <p className="text-purple-200">Practice Phase Done</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">Day 30</div>
              <p className="text-purple-200">Exam Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
