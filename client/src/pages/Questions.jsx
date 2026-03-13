import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Search, X, ChevronRight, Hash, ExternalLink } from 'lucide-react';
import { api } from '../lib/api';

const buildYoutubeSolutionUrl = (question) => {
  if (question.videoLink?.trim()) {
    return question.videoLink;
  }

  const query = [question.title, question.category, 'solution']
    .filter(Boolean)
    .join(' ');

  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
};

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
            videoLink: item.videoLink,
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

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030303] text-white pt-32 md:pt-36 pb-20 px-4 sm:px-6 relative overflow-hidden font-sans">
      
      {/* Background Grid Removed - Kept only the subtle glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative">
        
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
                className="q-list-item group flex flex-col items-start justify-between gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-2xl cursor-pointer hover:bg-white/[0.05] hover:border-white/10 transition-all sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 items-start gap-4 sm:gap-6">
                  <span className="shrink-0 text-gray-600 font-mono text-xs">{q.id}</span>
                  <div className="min-w-0">
                    <h4 className="font-medium break-words group-hover:text-blue-400 transition-colors">{q.title}</h4>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">{q.category}</span>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
                  <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded border ${q.difficulty === 'Hard' ? 'border-red-500/30 text-red-400' : 'border-blue-500/30 text-blue-400'}`}>
                    {q.difficulty}
                  </span>
                  <ChevronRight size={16} className="shrink-0 text-gray-700 group-hover:text-white transition-all group-hover:translate-x-1" />
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
          className="fixed inset-0 z-[300] flex items-start justify-center overflow-y-auto bg-black/70 p-3 sm:p-6 md:items-center backdrop-blur-xl"
          onClick={() => setSelectedQuestion(null)}
        >
          <div 
            className="relative my-4 flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0b] shadow-2xl sm:my-6 sm:max-h-[calc(100vh-3rem)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/5 bg-[#111214]/95 p-4 backdrop-blur sm:p-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <Terminal size={20} />
                </div>
                <h3 className="truncate font-medium text-lg sm:text-xl">Question Detail</h3>
              </div>
              <button 
                onClick={() => setSelectedQuestion(null)}
                className="shrink-0 rounded-full p-2 transition-colors hover:bg-white/10"
                aria-label="Close question detail"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="no-scrollbar overflow-y-auto p-5 sm:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-mono text-gray-500">
                <Hash size={12} /> {selectedQuestion.id} • {selectedQuestion.category}
              </div>
              <h2 className="mb-4 break-words text-2xl font-medium tracking-tight sm:text-3xl">{selectedQuestion.title}</h2>
              <p className="mb-8 break-words text-gray-400 leading-relaxed">
                {selectedQuestion.description}
              </p>

              <div className="relative overflow-x-auto rounded-2xl border border-white/5 bg-black p-5 font-mono text-sm sm:p-6">
                <div className="absolute right-4 top-3 text-[10px] uppercase text-gray-600">header.h</div>
                <code className="block whitespace-pre-wrap break-words pr-14 text-blue-400">{selectedQuestion.snippet}</code>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {selectedQuestion.link && (
                  <a
                    href={selectedQuestion.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-500/30 px-4 py-3 text-sm text-orange-400 transition-colors hover:border-orange-400/50 hover:text-orange-300 sm:w-auto"
                  >
                    <ExternalLink size={14} />
                    Open on LeetCode
                  </a>
                )}

                <a
                  href={buildYoutubeSolutionUrl(selectedQuestion)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 px-4 py-3 text-sm text-red-400 transition-colors hover:border-red-400/50 hover:text-red-300 sm:w-auto"
                >
                  <ExternalLink size={14} />
                  Watch YouTube Solution
                </a>
              </div>

              <button 
                className="mt-8 w-full rounded-xl bg-white py-4 font-medium text-black transition-all hover:bg-blue-500 hover:text-white active:scale-[0.98]"
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
