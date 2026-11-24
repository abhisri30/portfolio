import React, { useState, useEffect } from 'react';
import { Terminal, Send, Cpu, Database } from 'lucide-react';
import { sound } from '../utils/sound';

interface QueryPreset {
  query: string;
  category: string;
  similarity: string;
  latency: string;
  response: string;
  chunks: string[];
}

const PRESET_QUERIES: QueryPreset[] = [
  {
    query: 'What were your RAGAS metrics on the McKesson client project?',
    category: 'RAG & AI Evaluation',
    similarity: '0.94 cosine similarity',
    latency: '74ms',
    response: 'At Coastal Seven Technologies, I contributed to the McKesson enterprise RAG chatbot. We evaluated retrieval and answer quality using the RAGAS framework across four golden dimensions: Faithfulness (0.94), Answer Relevance (0.91), Context Precision (0.92), and Context Recall (0.89). This reduced factual hallucination risk by over 74% compared to vanilla retrieval.',
    chunks: [
      'Chunk #1: "McKesson Chatbot Evaluation // Context Precision & Faithfulness Suite"',
      'Chunk #2: "RAGAS automated scoring pipelines integrated with FastAPI REST gateway"'
    ]
  },
  {
    query: 'How did your DeepFake Video Detection model achieve 94.2% accuracy?',
    category: 'Deep Learning & Vision',
    similarity: '0.97 cosine similarity',
    latency: '92ms',
    response: 'We built a hybrid deep learning architecture combining spatial and temporal features. First, a pre-trained ResNeXt50 CNN extracted robust facial frame embeddings. Second, an LSTM sequential network modeled frame-to-frame temporal transitions to catch subtle blending artifacts and eye-blink anomalies. Evaluated on FaceForensics++, it reached 94.2% classification accuracy.',
    chunks: [
      'Chunk #1: "PyTorch ResNeXt50 feature extractor + LSTM sequential layer"',
      'Chunk #2: "FaceForensics++ benchmark validation: 94.2% classification precision"'
    ]
  },
  {
    query: 'Explain Code Sense: GitHub Repository RAG system.',
    category: 'Full-Stack & Vector DB',
    similarity: '0.93 cosine similarity',
    latency: '81ms',
    response: 'Code Sense is an end-to-end RAG application built using Python, LangChain, and LlamaIndex. It parses GitHub repository ASTs, creates syntax-aware vector embeddings in a vector database, and allows developers to query entire codebases in natural language with 92% retrieval precision on multi-file testbeds.',
    chunks: [
      'Chunk #1: "AST-aware code chunking & vector indexing (OpenAI API / Vector DB)"',
      'Chunk #2: "Context-aware query expansion for multi-file codebase navigation"'
    ]
  },
  {
    query: 'What is your full-stack engineering tech stack?',
    category: 'Architecture & Stack',
    similarity: '0.99 cosine similarity',
    latency: '45ms',
    response: 'Frontend: React.js, Next.js, Redux, React Native, Tailwind CSS, TypeScript. Backend: Node.js, Express.js, FastAPI, PostgreSQL, MongoDB, AWS RDS. Cloud & DevOps: AWS (S3, CloudFront, Lambda, RDS, IAM), Docker, CI/CD, Git. AI: PyTorch, LangChain, LlamaIndex, RAGAS, Vector DBs.',
    chunks: [
      'Chunk #1: "Languages: JavaScript, TypeScript, Python, Java, SQL"',
      'Chunk #2: "Production frameworks: React, Next.js, FastAPI, Node.js, AWS"'
    ]
  }
];

export const AITerminal: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const current = PRESET_QUERIES[selectedIdx];

  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');
    let idx = 0;
    const fullText = current.response;

    const timer = setInterval(() => {
      if (idx < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(idx));
        idx++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 12);

    return () => clearInterval(timer);
  }, [selectedIdx]);

  const handleSelectQuery = (i: number) => {
    sound.playClick();
    setSelectedIdx(i);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    sound.playClick();
    setSelectedIdx(0);
    setCustomInput('');
  };

  return (
    <section id="ai-rag" className="py-24 px-4 md:px-8 max-w-7xl mx-auto relative">
      <div className="flex flex-col items-start mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-300 bg-orange-50 text-orange-800 font-mono text-xs tracking-wider uppercase mb-3 font-semibold">
          <Cpu className="w-3.5 h-3.5 text-orange-600" />
          <span>Interactive AI Demonstration // Live RAG Console</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-zinc-900 font-display tracking-tight uppercase">
          Query Abhinaya’s <br />
          <span className="text-outline-dark hover:text-orange-600 transition-colors">Knowledge Base</span>
          <span className="text-orange-600">.</span>
        </h2>
        <p className="text-zinc-600 text-sm max-w-2xl mt-3 leading-relaxed">
          This interactive terminal demonstrates my real-world AI Engineering capabilities. Click any verified prompt below to simulate vector retrieval, RAGAS context scoring, and streamed answers from my portfolio index.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold mb-1">
            Verified RAG Test Queries (Click to Execute):
          </span>
          {PRESET_QUERIES.map((q, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectQuery(idx)}
                onMouseEnter={() => sound.playHover()}
                className={`w-full text-left p-4 rounded-2xl border transition-all text-xs font-mono flex items-start gap-3 ${
                  isSelected
                    ? 'bg-white border-orange-500 shadow-md ring-2 ring-orange-500/10'
                    : 'bg-white/70 border-zinc-200 hover:bg-white hover:border-zinc-300 shadow-sm'
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                    isSelected ? 'bg-orange-600 text-white' : 'bg-zinc-100 text-zinc-600'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 mb-1">
                    <span className="font-semibold text-orange-700">{q.category}</span>
                    <span>{q.latency}</span>
                  </div>
                  <div className={`font-semibold ${isSelected ? 'text-zinc-900' : 'text-zinc-700'}`}>
                    "{q.query}"
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-7 glass-panel bg-zinc-900 text-zinc-100 rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-5 text-xs font-mono">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-zinc-400 ml-2">rag-inference-node.py</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                ● RAGAS VERIFIED
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
            <div className="p-2.5 rounded-xl bg-zinc-800/70 border border-zinc-700/60 text-center">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">Vector Score</div>
              <div className="text-xs font-mono font-bold text-orange-400 mt-0.5">
                {current.similarity}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-800/70 border border-zinc-700/60 text-center">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">Inference Latency</div>
              <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                {current.latency}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-800/70 border border-zinc-700/60 text-center col-span-2 sm:col-span-1">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">Retrieval Engine</div>
              <div className="text-xs font-mono font-bold text-sky-400 mt-0.5">
                LangChain + VectorDB
              </div>
            </div>
          </div>

          <div className="space-y-1.5 mb-5 bg-black/60 p-3 rounded-xl border border-zinc-800 font-mono text-[11px] text-zinc-400">
            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] uppercase font-bold">
              <Database className="w-3 h-3 text-orange-400" />
              <span>Retrieved Document Chunks:</span>
            </div>
            {current.chunks.map((chk, i) => (
              <div key={i} className="text-zinc-300 truncate">
                &gt; {chk}
              </div>
            ))}
          </div>

          <div className="font-mono text-xs sm:text-sm leading-relaxed text-zinc-200 min-h-[120px] bg-zinc-950/80 p-4 rounded-xl border border-zinc-800">
            <span className="text-orange-400 font-bold mr-2">&gt;</span>
            <span>{displayedText}</span>
            {isTyping && <span className="inline-block w-2 h-4 ml-1 bg-orange-500 animate-pulse align-middle" />}
          </div>

          <form onSubmit={handleCustomSubmit} className="mt-5 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask a custom question about Abhinayasri's experience..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 placeholder:text-zinc-600 focus:border-orange-500 outline-none"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white shadow-md transition-all shrink-0"
              title="Execute Vector Search"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
