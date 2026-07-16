export default function ResourcesPage() {
  const resources = [
    {
      category: 'Official ICAI Resources',
      items: [
        { title: 'ICAI Official Website', description: 'Registration, notifications & updates', url: 'https://www.icai.org', type: 'link' },
        { title: 'Study Material', description: 'Official ICAI study modules', url: 'https://www.icai.org/study-material', type: 'link' },
        { title: 'RTPs (Revision Test Papers)', description: 'Latest revision test papers', url: 'https://www.icai.org/rtp', type: 'pdf' },
        { title: 'MTPs (Mock Test Papers)', description: 'Mock tests for exam practice', url: 'https://www.icai.org/mtp', type: 'pdf' },
      ],
    },
    {
      category: 'Previous Year Papers',
      items: [
        { title: 'May 2025 Papers', description: 'All 4 subjects question papers', url: '#', type: 'pdf', size: '2.5 MB' },
        { title: 'November 2024 Papers', description: 'Complete set with solutions', url: '#', type: 'pdf', size: '3.1 MB' },
        { title: 'May 2024 Papers', description: 'Question papers & answer keys', url: '#', type: 'pdf', size: '2.8 MB' },
        { title: 'Last 5 Years Collection', description: 'Comprehensive archive', url: '#', type: 'pdf', size: '15 MB' },
      ],
    },
    {
      category: 'Video Solutions',
      items: [
        { title: 'Accounts Video Series', description: 'Complete chapter-wise solutions', url: 'https://youtube.com', type: 'video' },
        { title: 'Law Important Sections', description: 'Quick revision videos', url: 'https://youtube.com', type: 'video' },
        { title: 'Maths Formula Tricks', description: 'Shortcuts and tips', url: 'https://youtube.com', type: 'video' },
        { title: 'Economics Graphs Explained', description: 'Visual learning content', url: 'https://youtube.com', type: 'video' },
      ],
    },
    {
      category: 'Practice Materials',
      items: [
        { title: 'Formula Sheet - All Subjects', description: 'Quick reference guide', url: '#', type: 'pdf', size: '1.2 MB' },
        { title: 'MCQ Question Bank', description: '5000+ practice questions', url: '#', type: 'pdf', size: '8.5 MB' },
        { title: 'Case Study Compilation', description: 'Law & Economics cases', url: '#', type: 'pdf', size: '4.2 MB' },
        { title: 'Time Management Guide', description: 'Exam strategy document', url: '#', type: 'pdf', size: '0.8 MB' },
      ],
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'video': return '🎥';
      case 'link': return '🔗';
      default: return '📁';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Study Resources
        </h1>
        <p className="text-xl text-purple-200 text-center mb-12">
          Curated materials for CA Foundation success
        </p>

        <div className="space-y-12">
          {resources.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-purple-500 rounded-full" />
                {category.category}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{getTypeIcon(item.type)}</span>
                      {item.size && (
                        <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded">
                          {item.size}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {item.description}
                    </p>
                    
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-white transition-colors"
                    >
                      {item.type === 'link' ? 'Visit' : item.type === 'video' ? 'Watch' : 'Download'}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Tips */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Study Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-lg font-semibold text-white mb-2">Consistent Practice</h3>
              <p className="text-gray-400 text-sm">Solve at least 50 MCQs daily</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⏱️</div>
              <h3 className="text-lg font-semibold text-white mb-2">Time Management</h3>
              <p className="text-gray-400 text-sm">Practice with timer for speed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="text-lg font-semibold text-white mb-2">Regular Revision</h3>
              <p className="text-gray-400 text-sm">Revise formulas every weekend</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
