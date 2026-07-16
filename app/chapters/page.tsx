'use client';

import { useState } from 'react';
import { ArrowRight, BookOpenCheck, Clock3, Compass, RotateCcw, Target } from 'lucide-react';
import Link from 'next/link';

type SubjectPlan = { id: string; paper: string; title: string; color: string; allocation: string; target: string; chapters: { name: string; work: string; time: string }[]; stuck: string; returnTo: string };

const subjectPlans: SubjectPlan[] = [
  { id: 'accounts', paper: 'Paper 01', title: 'Accounting', color: '#285e46', allocation: '2 hr 30 min / day', target: 'Finish 2 practical formats and 10–12 questions daily.', chapters: [{ name: 'Accounting process & BRS', work: '8 journal / rectification questions + 1 BRS', time: '70 min' }, { name: 'Final accounts', work: '1 complete format with working notes', time: '55 min' }, { name: 'Partnership / companies', work: '1 long application problem', time: '55 min' }], stuck: 'Return to the relevant format first. Rebuild one solved example line by line, then attempt a shorter variation.', returnTo: 'Do not spend more than 25 minutes stuck on one adjustment.' },
  { id: 'law', paper: 'Paper 02', title: 'Business Laws', color: '#49657a', allocation: '1 hr 45 min / day', target: 'Complete 3 case answers and 20 minutes of section recall.', chapters: [{ name: 'Indian Contract Act', work: '1 provision sheet + 2 case applications', time: '55 min' }, { name: 'Sale of Goods / Partnership', work: '1 structured case answer', time: '30 min' }, { name: 'Companies Act', work: 'Keyword recall + 1 mini-case', time: '20 min' }], stuck: 'Use the four-line frame: provision, facts, application, conclusion. Fill that frame before looking at a solution.', returnTo: 'If a section number escapes you, write the rule correctly and revisit the section in evening recall.' },
  { id: 'quant', paper: 'Paper 03', title: 'Quantitative Aptitude', color: '#9a6b24', allocation: '2 hr / day', target: 'Solve 60 timed MCQs: 24 Maths, 12 Reasoning, 24 Statistics.', chapters: [{ name: 'Business Mathematics', work: '24 questions with calculator notes', time: '50 min' }, { name: 'Logical Reasoning', work: '12 questions; mark recurring patterns', time: '20 min' }, { name: 'Statistics', work: '24 questions + formula recall', time: '50 min' }], stuck: 'Circle the question, write the blocker in one line, and move on after 90 seconds. Return only in the review block.', returnTo: 'The target is accuracy under time, not solving every question in one sitting.' },
  { id: 'economics', paper: 'Paper 04', title: 'Business Economics', color: '#765f89', allocation: '1 hr 45 min / day', target: 'Finish 2 concept blocks and 40 retrieval MCQs daily.', chapters: [{ name: 'Demand, supply & market forms', work: '1 graph set + 20 MCQs', time: '45 min' }, { name: 'Production, cost & national income', work: 'Concept recap + 10 MCQs', time: '25 min' }, { name: 'Public finance, money & trade', work: '10 MCQs + key-term recall', time: '20 min' }], stuck: 'Draw the graph or write the definition from memory. Then use one worked explanation and immediately retry an adjacent question.', returnTo: 'If a unit stays below 60%, swap tomorrow’s optional revision block for that unit.' },
];

export default function ChaptersPage() {
  const [selectedId, setSelectedId] = useState('accounts');
  const selected = subjectPlans.find((subject) => subject.id === selectedId) ?? subjectPlans[0];

  return <div className="study-page chapters-page"><main className="page-wrap">
    <div className="page-heading"><p className="eyebrow">Subject guidance</p><h1>Know the next<br /><em>piece of work.</em></h1><p>Choose a paper to see the daily allocation, the finish line, and the recovery route when a chapter becomes difficult.</p></div>
    <div className="chapter-tabs" role="tablist" aria-label="Subjects">
      {subjectPlans.map((subject) => <button key={subject.id} onClick={() => setSelectedId(subject.id)} role="tab" aria-selected={selected.id === subject.id} className={selected.id === subject.id ? 'active' : ''} style={{ '--subject-color': subject.color } as React.CSSProperties}><span>{subject.paper}</span>{subject.title}</button>)}
    </div>
    <section className="chapter-workspace" style={{ '--subject-color': selected.color } as React.CSSProperties}>
      <header><div><p>{selected.paper} · guided block</p><h2>{selected.title}</h2></div><span className="chapter-time"><Clock3 size={18} /> {selected.allocation}</span></header>
      <div className="chapter-target"><Target size={20} /><div><span>Daily finish line</span><strong>{selected.target}</strong></div></div>
      <div className="chapter-list">{selected.chapters.map((chapter, index) => <article key={chapter.name}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{chapter.name}</h3><p>{chapter.work}</p></div><time>{chapter.time}</time></article>)}</div>
      <div className="chapter-recovery"><div><Compass size={20} /><span>When you feel stuck</span><p>{selected.stuck}</p></div><div><RotateCcw size={20} /><span>Then come back</span><p>{selected.returnTo}</p></div></div>
      <footer><span><BookOpenCheck size={17} /> Complete the blocks in order; record one error before ending.</span><Link href="/daily-plan">Open today&apos;s tasks <ArrowRight size={16} /></Link></footer>
    </section>
  </main></div>;
}
