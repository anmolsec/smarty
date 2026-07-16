interface ResourceItem {
  title: string;
  description: string;
  url: string;
  type: string;
}

export default function ResourcesPage() {
  const resources: { category: string; items: ResourceItem[] }[] = [
    {
      category: 'Official ICAI Resources',
      items: [
        { title: 'ICAI Official Website', description: 'Registration, notifications & updates', url: 'https://www.icai.org', type: 'link' },
        { title: 'New-Scheme Study Material', description: 'Current official Foundation modules, paper by paper', url: 'https://www.icai.org/post/study-material-nset', type: 'link' },
        { title: 'September 2026 Applicability', description: 'Official BoS guidance on the editions applicable to this attempt', url: 'https://boslive.icai.org/assets/BOS_Study_Material_applicable_for_Foundation_and_Inter_Sep2026Exam.pdf', type: 'pdf' },
        { title: 'BoS Knowledge Portal', description: 'Lectures, announcements, test papers and academic updates', url: 'https://boslive.icai.org/', type: 'link' },
      ],
    },
    {
      category: 'Practice & Actual Exam Papers',
      items: [
        { title: 'Official Model Test Papers', description: 'Ten model papers per subject with official answers', url: 'https://resource.cdn.icai.org/84774bos68243.pdf', type: 'pdf' },
        { title: 'May 2026 RTPs', description: 'Revision Test Papers for all four Foundation papers', url: 'https://www.icai.org/post/rtp-foundation-course-may2026', type: 'pdf' },
        { title: 'Actual Foundation Papers', description: 'ICAI archive for Accounting and Business Laws through May 2026', url: 'https://www.icai.org/post/question-papers-foundation-course', type: 'pdf' },
        { title: 'January 2026 MCQs & Keys', description: 'Actual Quantitative Aptitude and Business Economics master sets', url: 'https://www.icai.org/post/exam-mcq-ques-and-key-jan2026-int-fnd', type: 'pdf' },
      ],
    },
    {
      category: 'Official Learning Channels',
      items: [
        { title: 'ICAI BoS YouTube', description: 'Official Board of Studies sessions and revision classes', url: 'https://www.youtube.com/theicaibos', type: 'video' },
        { title: 'ICAI CA Tube', description: 'Official ICAI video lectures and student programmes', url: 'https://www.youtube.com/c/IcaiOrgtube/', type: 'video' },
        { title: 'BoS Live Classes', description: 'Live and recorded Foundation learning sessions', url: 'https://boslive.icai.org/', type: 'video' },
        { title: 'Board of Studies Services', description: 'Official overview of study, RTP, MTP and learning support', url: 'https://www.icai.org/post/6636', type: 'link' },
      ],
    },
    {
      category: 'Protocol Tools & Templates',
      items: [
        { title: 'Mistake Log Template', description: 'Categorize errors: Calculation, Conceptual, Application, Time', url: '#', type: 'pdf' },
        { title: 'Formula Sheet — All Subjects', description: 'A condensed quick-reference sheet for final recall', url: '#', type: 'pdf' },
        { title: 'Law Keyword Notebook', description: 'Essential section numbers and legal terms', url: '#', type: 'pdf' },
        { title: '4-Step Answer Structure', description: 'Provision → Facts → Analysis → Conclusion template', url: '#', type: 'pdf' },
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
    <div className="app-shell-bright min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 mb-4">
            Focused study library
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Study Resources
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-slate-600">
            Verified materials for focused 30-day preparation
          </p>
        </div>

        <div className="space-y-12">
          {resources.map((category, catIndex) => (
            <div key={catIndex}>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-2 h-8 bg-emerald-700 rounded-full" />
                {category.category}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all group hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md"
                  >
                    <div className="flex items-start mb-4">
                      <span className="text-2xl">{getTypeIcon(item.type)}</span>
                    </div>

                    <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-600 mb-4">
                      {item.description}
                    </p>

                    {item.url === '#' ? <span className="inline-flex min-h-11 items-center text-sm font-semibold text-slate-500" aria-disabled="true">Coming soon</span> : <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
                      >
                        {item.type === 'link' ? 'Visit' : item.type === 'video' ? 'Watch' : 'Download'}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Protocol Tips */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">30-day protocol tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Mistake log</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Categorize every error—your most valuable asset in the final ten days.</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-3">⏱️</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">72-second rule</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Master calculator memory functions for fast, checked annuity solutions.</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Active recall</h3>
              <p className="text-slate-600 text-sm leading-relaxed">In the final three days, focus on formulas, legal keywords, and your mistake log.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
