'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, Eye, EyeOff, RotateCcw, Shuffle, Sparkles } from 'lucide-react';
import { Flashcard, parseFlashcardDeck, selectRandomCards } from '@/lib/flashcard-session';

export default function FlashcardsPage() {
  const [deck, setDeck] = useState<Flashcard[]>([]);
  const [category, setCategory] = useState('All categories');
  const [session, setSession] = useState<Flashcard[]>([]);
  const [revealed, setRevealed] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/flashcards.md')
      .then((response) => response.ok ? response.text() : Promise.reject(new Error('Deck could not be loaded.')))
      .then((markdown) => {
        const cards = parseFlashcardDeck(markdown);
        setDeck(cards);
        setSession(selectRandomCards(cards, 'All categories'));
      })
      .catch((reason: Error) => setError(reason.message));
  }, []);

  const categories = useMemo(() => ['All categories', ...Array.from(new Set(deck.map((card) => card.category)))], [deck]);
  const availableCount = category === 'All categories' ? deck.length : deck.filter((card) => card.category === category).length;
  const generateSession = (nextCategory = category) => {
    setSession(selectRandomCards(deck, nextCategory, 10));
    setRevealed([]);
  };

  return <div className="study-page flashcards-page"><main className="page-wrap">
    <div className="page-heading"><p className="eyebrow">Random 10 active-recall session</p><h1>Ask ten.<br /><em>Recall ten.</em></h1><p>Choose a category, then generate ten unique random questions from the editable Markdown deck. Each answer stays hidden until you reveal it.</p></div>
    <div className="flashcard-controls"><label>Ask from<select value={category} onChange={(event) => { setCategory(event.target.value); generateSession(event.target.value); }}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><span><Sparkles size={17} /> {availableCount} available · 10 selected per session</span><button className="next-card" onClick={() => generateSession()}><Shuffle size={16} /> New random 10</button></div>
    {error ? <p className="flashcard-message">{error}</p> : deck.length === 0 ? <p className="flashcard-message">Loading your deck…</p> : <section className="flashcard-session" aria-label="Ten flashcard questions">
      <header><div><h2>Session questions</h2><p>Source positions: {session.map((card) => card.number).join(', ')}</p></div><button onClick={() => setRevealed([])}><RotateCcw size={16} /> Hide all answers</button></header>
      <ol>{session.map((card, index) => {
        const isRevealed = revealed.includes(card.id);
        return <li key={card.id} className={isRevealed ? 'revealed' : ''}><div className="flashcard-question"><span>{String(index + 1).padStart(2, '0')}</span><div><small>{card.category} · deck #{card.number}</small><h3>{card.question}</h3></div></div>{isRevealed ? <div className="flashcard-answer"><Check size={17} /><p><strong>Answer:</strong> {card.answer}</p><button onClick={() => setRevealed((cards) => cards.filter((id) => id !== card.id))}><EyeOff size={15} /> Hide</button></div> : <button className="reveal-answer" onClick={() => setRevealed((cards) => [...cards, card.id])}><Eye size={16} /> Reveal answer</button>}</li>;
      })}</ol>
    </section>}
    <aside className="flashcard-source"><h2>Editable deck format</h2><p>Questions are read from <code>public/flashcards.md</code>. Add as many categories and cards as needed; the random-session logic safely selects ten unique cards from the chosen category.</p><pre>{`## Accounting\nQ: Your question\nA: Your answer\n---`}</pre></aside>
  </main></div>;
}
