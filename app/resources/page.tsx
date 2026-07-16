interface ResourceItem {
  title: string;
  description: string;
  url: string;
  type: string;
  size?: string;
}

export default function ResourcesPage() {
  const resources: { category: string; items: ResourceItem[] }[] = [
    {
      category: 'Official ICAI Resources',
      items: [
        { title: 'ICAI Official Website', description: 'Registration, notifications & updates', url: 'https://www.icai.org', type: 'link' },
        { title: 'Study Material', description: 'Official ICAI study modules', url: 'https://www.icai.org/study-material', type: 'link' },
        { title: 'RTPs (Revision Test Papers)', description: 'Solve last 3 attempts — dissect suggested answers', url: 'https://www.icai.org/rtp', type: 'pdf' },
        { title: 'MTPs (Mock Test Papers)', description: '5-7 full-length MTPs for simulation window', url: 'https://www.icai.org/mtp', type: 'pdf' },
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
        { title: 'Maths Formula Tricks', description: 'Calculator M+/M-/GT mastery tips', url: 'https://youtube.com', type: 'video' },
        { title: 'Economics Graphs Explained', description: 'Visual learning content', url: 'https://youtube.com', type: 'video' },
      ],
    },
    {
      category: 'Protocol Tools & Templates',
      items: [
        { title: 'Mistake Log Template', description: 'Categorize errors: Calculation, Conceptual, Application, Time', url: '#', type: 'pdf', size: '0.2 MB' },
        { title: 'Formula Sheet — All Subjects', description: '10-page condensed quick reference', url: '#', type: 'pdf', size: '1.2 MB' },
        { title: 'Law Keyword Notebook', description: 'Essential section numbers and legal terms', url: '#', type: 'pdf', size: '0.8 MB' },
        { title: '4-Step Answer Structure', description: 'Provision → Facts → Analysis → Conclusion template', url: '#', type: 'pdf', size: '0.3 MB' },
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
        <div className="text-center mb-12">
          <div className="inline-block bg-red-500/20 border border-red-500/40 rounded-full px-4 py-1 text-red-300 text-sm font-medium mb-4">
            🚨 AIR 1 PROTOCOL RESOURCES
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Study Resources
          </h1>
          <p className="text-xl text-purple-200">
            Curated materials for 30-day intensive execution
          </p>
        </div>

        <div className="space-y-12">
          {resources.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-purple-500 rounded-full" />
                {category.category}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-2xl">{getTypeIcon(item.type)}</span>
                      {item.size && (
                        <span className="text-xs text-gray-400 bg-white/10 px-2 py-1 rounded">
                          {item.size}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base md:text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
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

        {/* Protocol Tips */}
        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">30-Day Protocol Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold text-white mb-2">Mistake Log</h3>
              <p className="text-gray-400 text-sm">Categorize every error — your most valuable asset in final 10 days</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-3">⏱️</div>
              <h3 className="text-lg font-semibold text-white mb-2">72-Second Rule</h3>
              <p className="text-gray-400 text-sm">Master GT and memory functions for sub-72-second annuity solutions</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-lg font-semibold text-white mb-2">Active Recall</h3>
              <p className="text-gray-400 text-sm">Final 3 days: Formula Sheet + Keyword Notebook + Mistake Log only</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
