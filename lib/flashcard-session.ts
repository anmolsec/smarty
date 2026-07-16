export type Flashcard = {
  id: string;
  number: number;
  category: string;
  question: string;
  answer: string;
};

export function parseFlashcardDeck(markdown: string): Flashcard[] {
  let category = 'Uncategorized';
  const cards: Flashcard[] = [];

  markdown.split(/^---\s*$/m).forEach((block) => {
    const categoryMatch = block.match(/^##\s+(.+)$/m);
    if (categoryMatch) category = categoryMatch[1].trim();
    const questionMatch = block.match(/^Q:\s*(.+)$/m);
    const answerMatch = block.match(/^A:\s*(.+)$/m);
    if (!questionMatch || !answerMatch) return;
    const number = cards.length + 1;
    cards.push({
      id: `${category}-${number}`,
      number,
      category,
      question: questionMatch[1].trim(),
      answer: answerMatch[1].trim(),
    });
  });

  return cards;
}

/** Picks unique random card positions without changing the source deck. */
export function selectRandomCards(cards: Flashcard[], category: string, count = 10): Flashcard[] {
  const candidates = category === 'All categories' ? cards : cards.filter((card) => card.category === category);
  const shuffled = [...candidates];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}
