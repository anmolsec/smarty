'use client';

import { useEffect, useId, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const details: Record<string, { title: string; text: string }> = {
  start: { title: 'Start small', text: 'Open only today’s task. A clear first action lowers resistance and moves the brain out of scroll mode.' },
  learn: { title: 'Build the concept', text: 'Use the syllabus sweep for understanding and recall—not passive rereading. This supplies the knowledge needed for practice.' },
  practice: { title: 'Practice actively', text: 'Write answers and solve varied questions. Retrieval makes knowledge usable under exam pressure.' },
  simulate: { title: 'Simulate the paper', text: 'Attempt the selected sample paper with its real duration, question mix, and no answers visible.' },
  review: { title: 'Close the feedback loop', text: 'Categorize every error as concept, calculation, application, or timing. That tells tomorrow’s plan what to fix.' },
  recall: { title: 'Consolidate', text: 'Final recall uses the mistake log, formulas, and legal keywords. No new mountain of content is introduced.' },
  flow: { title: 'Exam-ready flow', text: 'Challenge and confidence rise together: understand → practise → test → correct → recall. That is the complete loop.' },
};

const chart = `flowchart LR
  start([Today's one task]) --> learn[Concept clarity]
  learn --> practice[Active practice]
  practice --> simulate[Timed sample paper]
  simulate --> review[Mistake review]
  review --> practice
  review --> recall[Final recall]
  recall --> flow((Exam-ready flow))
  classDef calm fill:#eef5f0,stroke:#174f3a,color:#173b2c,stroke-width:1.5px;
  classDef warm fill:#fff5df,stroke:#b87718,color:#60420e,stroke-width:1.5px;
  classDef goal fill:#174f3a,stroke:#174f3a,color:#ffffff,stroke-width:2px;
  class start,learn,practice,review,recall calm;
  class simulate warm;
  class flow goal;
  click start call selectNode("start")
  click learn call selectNode("learn")
  click practice call selectNode("practice")
  click simulate call selectNode("simulate")
  click review call selectNode("review")
  click recall call selectNode("recall")
  click flow call selectNode("flow")`;

export default function FocusMap() {
  const rawId = useId();
  const id = `focus-map-${rawId.replace(/:/g, '')}`;
  const [svg, setSvg] = useState('');
  const [selected, setSelected] = useState('flow');
  const [renderError, setRenderError] = useState(false);
  const detailKeys = Object.keys(details);

  useEffect(() => {
    let cancelled = false;
    window.selectNode = (node: string) => setSelected(node);
    const renderDiagram = async () => {
      try {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme: 'base', flowchart: { curve: 'basis', htmlLabels: true } });
        const { svg: rendered } = await mermaid.render(id, chart);
        if (!cancelled) setSvg(rendered);
      } catch {
        if (!cancelled) setRenderError(true);
      }
    };
    void renderDiagram();
    return () => {
      cancelled = true;
      delete window.selectNode;
    };
  }, [id]);

  const moveSelection = (direction: number) => {
    const currentIndex = detailKeys.indexOf(selected);
    const nextIndex = (currentIndex + direction + detailKeys.length) % detailKeys.length;
    setSelected(detailKeys[nextIndex]);
  };

  return (
    <section className="focus-map-wrap">
      <div className="focus-map-copy">
        <p className="eyebrow">Your complete focus system</p>
        <h2>This is all you need to do.</h2>
        <p>Tap any step to see why it exists. The loop deliberately turns effort into confidence instead of adding more material.</p>
      </div>
      <div className="focus-map-grid">
        <div className="mermaid-canvas" aria-label="Interactive learning process diagram">
          {renderError
            ? <p className="map-render-error">The diagram could not render. Use the step controls to explore the complete study loop.</p>
            : <div dangerouslySetInnerHTML={{ __html: svg }} />}
        </div>
        <aside className="map-detail" aria-live="polite">
          <span>{detailKeys.indexOf(selected) + 1} / {detailKeys.length}</span>
          <h3>{details[selected].title}</h3>
          <p>{details[selected].text}</p>
          <div className="map-detail-actions" aria-label="Explore study-loop steps">
            <button onClick={() => moveSelection(-1)} aria-label="Previous study-loop step"><ChevronLeft size={16} /> Previous</button>
            <button onClick={() => moveSelection(1)} aria-label="Next study-loop step">Next <ChevronRight size={16} /></button>
          </div>
        </aside>
      </div>
    </section>
  );
}

declare global {
  interface Window { selectNode?: (node: string) => void; }
}
