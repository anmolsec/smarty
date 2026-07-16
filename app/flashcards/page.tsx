'use client';

import { useState } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';

const cards = [
  { id: 'accounting', label: 'Accounting', front: 'Why are working notes worth writing?', back: 'They show the examiner your method and protect step marks, even when the final figure is wrong.', accent: '#285e46' },
  { id: 'law', label: 'Business Laws', front: 'What is the four-step answer frame?', back: 'Provision → facts → application → conclusion. Use it before you reach for a model answer.', accent: '#49657a' },
  { id: 'quant', label: 'Quantitative Aptitude', front: 'When should you skip an MCQ?', back: 'After roughly 90 seconds without a clear path. Mark it, protect time, and return during review.', accent: '#9a6b24' },
  { id: 'economics', label: 'Economics', front: 'What should you do when a concept feels vague?', back: 'Draw the graph or write the definition from memory, check one explanation, then retry an adjacent MCQ.', accent: '#765f89' },
  { id: 'review', label: 'Review loop', front: 'What turns a mock into progress?', back: 'Categorize the miss: concept, calculation, application, or time. Then assign one focused block tomorrow.', accent: '#b6506e' },
  { id: 'focus', label: 'Focus', front: 'What is today’s only job?', back: 'Complete the current block. Tomorrow stays hidden until today’s work has a clear finish.', accent: '#386c9d' },
];

export default function FlashcardsPage() {
  const [flipped, setFlipped] = useState<string[]>([]);
  const toggle = (id: string) => setFlipped((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const reset = () => setFlipped([]);

  return <div className="study-page flashcards-page"><main className="page-wrap">
    <div className="page-heading"><p className="eyebrow">Active recall</p><h1>Turn over the<br /><em>important things.</em></h1><p>Tap a card to reveal the answer. A tiny recall loop is more useful than another passive reread.</p></div>
    <div className="flashcard-toolbar"><span><Sparkles size={17} /> {flipped.length} of {cards.length} revealed</span><button onClick={reset}><RotateCcw size={16} /> Reset cards</button></div>
    <section className="flashcard-grid" aria-label="Study flashcards">
      {cards.map((card) => <button key={card.id} onClick={() => toggle(card.id)} className={`flip-card ${flipped.includes(card.id) ? 'is-flipped' : ''}`} style={{ '--card-accent': card.accent } as React.CSSProperties} aria-pressed={flipped.includes(card.id)}>
        <span className="flip-card-inner"><span className="flip-card-front"><small>{card.label}</small><strong>{card.front}</strong><em>Tap to reveal</em></span><span className="flip-card-back"><small>{card.label} · answer</small><strong>{card.back}</strong><em>Tap to turn back</em></span></span>
      </button>)}
    </section>
  </main></div>;
}
