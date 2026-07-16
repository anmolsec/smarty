'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Check, Clock3, FileText, Flag, Pause, Play, ShieldCheck } from 'lucide-react';

type Paper = {
  id: string;
  number: string;
  title: string;
  format: string;
  minutes: number;
  questions: number;
  marks: number;
  negative?: string;
  accent: string;
  objective: boolean;
  categories: string[];
};

const papers: Paper[] = [
  { id: 'accounts', number: '01', title: 'Accounting', format: 'Descriptive · working notes', minutes: 180, questions: 6, marks: 100, accent: '#285e46', objective: false, categories: ['True/false with reasons', 'Journal & rectification', 'Final accounts', 'Partnership', 'Company accounts'] },
  { id: 'law', number: '02', title: 'Business Laws', format: 'Descriptive · case analysis', minutes: 180, questions: 6, marks: 100, accent: '#49657a', objective: false, categories: ['Provision recall', 'Case scenarios', 'Contract Act', 'Sale of Goods', 'Partnership & LLP', 'Companies Act'] },
  { id: 'quant', number: '03', title: 'Quantitative Aptitude', format: 'Objective · 100 MCQs', minutes: 120, questions: 100, marks: 100, negative: '−0.25', accent: '#9a6b24', objective: true, categories: ['Business Mathematics · 40', 'Logical Reasoning · 20', 'Statistics · 40'] },
  { id: 'economics', number: '04', title: 'Business Economics', format: 'Objective · 100 MCQs', minutes: 120, questions: 100, marks: 100, negative: '−0.25', accent: '#765f89', objective: true, categories: ['Demand & supply', 'Production & cost', 'Market forms', 'National income', 'Public finance', 'Money, trade & Indian economy'] },
];

const descriptiveQuestions: Record<string, { section: string; question: string }[]> = {
  accounts: [
    { section: 'Compulsory · True/False with reasons', question: 'State, with reasons, whether each statement is true or false: (i) Cash book is only a subsidiary book. (ii) A change in accounting policy never requires disclosure. (iii) An adjustment in not-for-profit accounts is always shown once.' },
    { section: 'Accounting process', question: 'Pass the necessary rectification entries for errors discovered after preparation of the trial balance. Show the effect on Suspense Account and provide clearly labelled working notes.' },
    { section: 'Bank reconciliation & inventory', question: 'From the particulars supplied, prepare the Bank Reconciliation Statement and calculate closing inventory in accordance with the applicable valuation principles.' },
    { section: 'Final accounts', question: 'Prepare the Trading Account, Statement of Profit and Loss, and Balance Sheet of the sole proprietor after incorporating all year-end adjustments.' },
    { section: 'Partnership accounts', question: 'Prepare the Revaluation Account, partners’ capital accounts, and revised balance sheet on admission of a partner. Calculate the sacrificing ratio and goodwill adjustment.' },
    { section: 'Company accounts', question: 'Journalise the issue, forfeiture, and reissue of shares, and prepare the relevant ledger accounts. All calculations must be supported by working notes.' },
  ],
  law: [
    { section: 'Compulsory · Short cases', question: 'Answer the short case scenarios with reference to the relevant legal provision. State the issue, apply the law to the supplied facts, and give a definite conclusion.' },
    { section: 'Indian Contract Act, 1872', question: 'A seller made an offer at a stated price and the buyer replied with a lower price while transferring an advance. Examine whether a binding contract arose and state the parties’ rights.' },
    { section: 'Indian Contract Act, 1872', question: 'Examine the enforceability of an agreement entered into by a minor who misstated their age. Discuss personal liability and any available equitable relief.' },
    { section: 'Sale of Goods Act, 1930', question: 'Goods supplied under a sale by description do not correspond with the contracted material. Determine whether the breach concerns a condition or warranty and advise the buyer.' },
    { section: 'Partnership & LLP', question: 'Apply the governing law to determine the authority and liability of partners where one partner enters a transaction outside the ordinary course of the firm’s business.' },
    { section: 'Companies Act, 2013', question: 'A company formed for charitable objects proposes to distribute profit to members. Examine the validity and consequences under the applicable provisions.' },
  ],
};

const previewQuestions = [
  {
    section: 'Business Mathematics',
    question: 'If the present value of an annuity of ₹5,000 for 10 years at 8% is required, which expression correctly begins the calculation?',
    options: ['₹5,000 × [(1 − 1.08⁻¹⁰) ÷ 0.08]', '₹5,000 × (1.08)¹⁰', '₹5,000 ÷ (1 − 0.08)¹⁰', '₹5,000 × [(1 + 1.08¹⁰) ÷ 0.08]'],
  },
  {
    section: 'Logical Reasoning',
    question: 'Choose the next term in the series: 3, 8, 15, 24, 35, __',
    options: ['42', '46', '48', '50'],
  },
  {
    section: 'Statistics',
    question: 'If mean is 45 and mode is 33, the median using the empirical relationship is:',
    options: ['39', '41', '43', '45'],
  },
  {
    section: 'Statistics',
    question: 'Which measure is least affected by extreme observations?',
    options: ['Arithmetic mean', 'Median', 'Standard deviation', 'Coefficient of variation'],
  },
];

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function MockTestsPage() {
  const [selected, setSelected] = useState<Paper>(papers[2]);
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(selected.minutes * 60);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | string>>({});
  const [flagged, setFlagged] = useState<number[]>([]);

  useEffect(() => {
    if (!started || paused || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [started, paused, seconds]);

  const progress = useMemo(() => Math.round((Object.keys(answers).length / previewQuestions.length) * 100), [answers]);

  const choosePaper = (paper: Paper) => {
    setSelected(paper);
    setSeconds(paper.minutes * 60);
  };

  if (started) {
    const q = selected.objective ? previewQuestions[current % previewQuestions.length] : descriptiveQuestions[selected.id][current];
    const options = 'options' in q && Array.isArray(q.options) ? q.options as string[] : [];
    return (
      <div className="exam-shell">
        <header className="exam-bar">
          <div>
            <p className="eyebrow">Sample paper · {selected.number}</p>
            <h1>{selected.title}</h1>
          </div>
          <div className={`timer ${seconds < 600 ? 'timer-warning' : ''}`} aria-live="polite">
            <Clock3 size={18} />
            <div><span>Time remaining</span><strong>{formatTime(seconds)}</strong></div>
          </div>
          <button className="quiet-button" onClick={() => setPaused(!paused)}>
            {paused ? <Play size={17} /> : <Pause size={17} />} {paused ? 'Resume' : 'Pause'}
          </button>
        </header>

        <main className="exam-layout">
          <aside className="question-map">
            <button className="back-link" onClick={() => setStarted(false)}><ArrowLeft size={16} /> Exit paper</button>
            <div className="progress-copy"><span>Attempted</span><strong>{Object.keys(answers).length} / {selected.questions}</strong></div>
            <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
            <p className="map-label">Question navigator</p>
            <div className="number-grid">
              {Array.from({ length: Math.min(selected.questions, 20) }, (_, index) => (
                <button key={index} onClick={() => setCurrent(index)} className={`${current === index ? 'active' : ''} ${answers[index] !== undefined ? 'answered' : ''}`}>
                  {index + 1}
                </button>
              ))}
            </div>
            {selected.questions > 20 && <p className="muted-note">Showing the first 20 questions in this sample build.</p>}
          </aside>

          <section className="question-stage">
            {paused && <div className="pause-screen"><Pause size={28} /><h2>Paper paused</h2><p>Your place is saved. Resume when your desk is ready.</p></div>}
            <div className="question-meta"><span>{q.section}</span><span>Question {current + 1} of {selected.questions}</span></div>
            <h2>{q.question}</h2>
            {selected.objective ? <div className="answers">
              {options.map((option, index) => (
                <button key={option} onClick={() => setAnswers({ ...answers, [current]: index })} className={answers[current] === index ? 'selected' : ''}>
                  <span>{String.fromCharCode(65 + index)}</span><p>{option}</p>{answers[current] === index && <Check size={19} />}
                </button>
              ))}
            </div> : <div className="written-answer">
              <label htmlFor="answer">Write your structured answer</label>
              <textarea id="answer" value={typeof answers[current] === 'string' ? answers[current] : ''} onChange={(event) => setAnswers({ ...answers, [current]: event.target.value })} placeholder={selected.id === 'law' ? 'Provision\n\nFacts and issue\n\nApplication\n\nConclusion' : 'Begin your answer here. Include clear formats and labelled working notes…'} />
              <p>Your response is saved in this attempt. Suggested answers stay hidden until submission.</p>
            </div>}
            <div className="question-actions">
              <button className="flag-button" onClick={() => setFlagged(flagged.includes(current) ? flagged.filter((n) => n !== current) : [...flagged, current])}>
                <Flag size={17} fill={flagged.includes(current) ? 'currentColor' : 'none'} /> {flagged.includes(current) ? 'Flagged' : 'Review later'}
              </button>
              <div>
                <button className="quiet-button" disabled={current === 0} onClick={() => setCurrent(current - 1)}><ArrowLeft size={17} /> Previous</button>
                <button className="primary-button" onClick={() => setCurrent(Math.min(selected.questions - 1, current + 1))}>Save & next <ArrowRight size={17} /></button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="study-page">
      <main className="page-wrap">
        <div className="page-heading">
          <p className="eyebrow">Focused exam practice</p>
          <h1>Choose one paper.<br /><em>Enter study mode.</em></h1>
          <p>The paper stays hidden until you begin. Once started, the countdown follows that paper&apos;s actual exam duration.</p>
        </div>

        <section className="paper-picker" aria-label="Select a paper">
          {papers.map((paper) => (
            <button key={paper.id} onClick={() => choosePaper(paper)} className={`paper-card ${selected.id === paper.id ? 'selected' : ''}`} style={{ '--paper-accent': paper.accent } as React.CSSProperties}>
              <span className="paper-number">{paper.number}</span>
              <div><p>Paper {paper.number}</p><h2>{paper.title}</h2><span>{paper.format}</span></div>
              {selected.id === paper.id && <Check className="paper-check" size={18} />}
            </button>
          ))}
        </section>

        <section className="paper-brief">
          <div className="brief-main">
            <p className="eyebrow">Selected sample paper</p>
            <h2>Paper {selected.number} · {selected.title}</h2>
            <p>A calm, distraction-free simulation. Answers and explanations remain hidden throughout the attempt.</p>
            <div className="metric-row">
              <div><Clock3 size={19} /><span>Duration<strong>{selected.minutes / 60} hours</strong></span></div>
              <div><FileText size={19} /><span>Questions<strong>{selected.questions}</strong></span></div>
              <div><BookOpen size={19} /><span>Marks<strong>{selected.marks}</strong></span></div>
              <div><ShieldCheck size={19} /><span>Negative<strong>{selected.negative ?? 'None'}</strong></span></div>
            </div>
            <div className="category-list">
              {selected.categories.map((category) => <span key={category}>{category}</span>)}
            </div>
          </div>
          <div className="start-panel">
            <span>Before you begin</span>
            <ul><li>Keep your calculator and rough sheet ready.</li><li>Use one uninterrupted sitting.</li><li>The timer starts after you press begin.</li></ul>
            <button className="primary-button begin" onClick={() => { setSeconds(selected.minutes * 60); setStarted(true); }}>Begin paper <ArrowRight size={18} /></button>
          </div>
        </section>
      </main>
    </div>
  );
}
