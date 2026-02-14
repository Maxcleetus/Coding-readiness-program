import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Terminal, Search, X, ChevronRight, Hash, ExternalLink } from 'lucide-react';
import { api } from '../lib/api';

const Questions = () => {
  const containerRef = useRef(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const filteredQuestions = questions.filter(
    (q) =>
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      setError('');

      try {
        const data = await api.getQuestions();
        setQuestions(
          [...data].reverse().map((item) => ({
            id: item.questionId,
            title: item.title,
            difficulty: item.difficulty,
            category: item.category,
            description: item.description,
            snippet: item.snippet,
            link: item.link,
          }))
        );
      } catch (err) {
        setError(err.message || 'Failed to load questions');
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".q-header", { y: 40, opacity: 1, duration: 1 })
        .from(".q-list-item", { x: -20, opacity: 1, stagger: 0.05, duration: 0.6 }, "-=0.4");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030303] text-white pt-32 pb-20 px-6 relative overflow-hidden font-sans">
      
      {/* Background Grid Removed - Kept only the subtle glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative ">
        
        {/* Header Section */}
        <div className="q-header mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-blue-400 text-[10px] font-mono tracking-widest uppercase mb-6">
            // Practice_Log.sys
          </div>
          <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-8">
            PRACTICED <span className="italic font-light text-gray-400">MODULES.</span>
          </h2>
          
          {/* Search Input */}
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by keyword (e.g. Pointers, Malloc)..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-6 outline-none focus:border-blue-500/50 transition-all text-sm font-mono"
            />
          </div>
        </div>

        {/* Question List */}
        <div className="space-y-3">
          {isLoading && <div className="text-gray-500 font-mono text-sm">Loading modules...</div>}

          {!isLoading && error && (
            <div className="py-20 text-center border border-dashed border-red-500/30 rounded-2xl text-red-300 font-mono text-sm">
              {error}
            </div>
          )}

          {!isLoading && !error && filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => (
              <div 
                key={q.id}
                onClick={() => setSelectedQuestion(q)}
                className="q-list-item group flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl cursor-pointer hover:bg-white/[0.05] hover:border-white/10 transition-all"
              >
                <div className="flex items-center gap-6">
                  <span className="text-gray-600 font-mono text-xs">{q.id}</span>
                  <div>
                    <h4 className="font-medium group-hover:text-blue-400 transition-colors">{q.title}</h4>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">{q.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${q.difficulty === 'Hard' ? 'border-red-500/30 text-red-400' : 'border-blue-500/30 text-blue-400'}`}>
                    {q.difficulty}
                  </span>
                  <ChevronRight size={16} className="text-gray-700 group-hover:text-white transition-all group-hover:translate-x-1" />
                </div>
              </div>
            ))
          ) : null}

          {!isLoading && !error && filteredQuestions.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl text-gray-500 font-mono text-sm">
              No modules found matching "{searchTerm}"
            </div>
          ) : null}
        </div>
      </div>

      {/* POPUP MODAL */}
      {selectedQuestion && (
        <div 
          className="fixed inset-0 z-[300] flex items-center justify-center p-6 backdrop-blur-xl bg-black/60"
          onClick={() => setSelectedQuestion(null)}
        >
          <div 
            className="bg-[#0a0a0b] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <Terminal size={20} />
                </div>
                <h3 className="font-medium text-xl">Question Detail</h3>
              </div>
              <button 
                onClick={() => setSelectedQuestion(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-4">
                <Hash size={12} /> {selectedQuestion.id} • {selectedQuestion.category}
              </div>
              <h2 className="text-3xl font-medium tracking-tight mb-4">{selectedQuestion.title}</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                {selectedQuestion.description}
              </p>

              <div className="bg-black p-6 rounded-2xl border border-white/5 font-mono text-sm relative">
                <div className="absolute top-3 right-4 text-[10px] text-gray-600 uppercase">header.h</div>
                <code className="text-blue-400">{selectedQuestion.snippet}</code>
              </div>

              {selectedQuestion.link && (
                <a
                  href={selectedQuestion.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors"
                >
                  <ExternalLink size={14} />
                  Open on LeetCode
                </a>
              )}

              <button 
                className="w-full mt-8 py-4 bg-white text-black rounded-xl font-medium hover:bg-blue-500 hover:text-white transition-all active:scale-[0.98]"
                onClick={() => setSelectedQuestion(null)}
              >
                Return to Modules
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
