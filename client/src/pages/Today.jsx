import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Zap, Target, Cpu, ExternalLink } from 'lucide-react';
import { api } from '../lib/api';

const Today = () => {
  const [challenge, setChallenge] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadChallenge = async () => {
      setIsLoading(true);
      setError('');

      try {
        const data = await api.getTodayChallenge();
        setChallenge(data);
      } catch (err) {
        setError(err.message || 'Failed to load today challenge');
      } finally {
        setIsLoading(false);
      }
    };

    loadChallenge();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#000000] text-white pt-28 px-6 font-sans">
        <div className="container mx-auto max-w-4xl text-gray-400">Loading challenge...</div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="min-h-screen bg-[#000000] text-white pt-28 px-6 font-sans">
        <div className="container mx-auto max-w-4xl">
          <p className="text-red-400 mb-4">{error || 'Challenge not found.'}</p>
          <button
            className="px-4 py-2 bg-white text-black rounded-lg text-sm"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const titleWords = challenge.title.split(' ');
  const titleFirstWord = titleWords[0] || '';
  const titleRest = titleWords.slice(1).join(' ');

  return (
    <div className="min-h-screen bg-[#000000] text-white pt-20 pb-20 px-6 font-sans">
      <div className="container mx-auto max-w-4xl">
        
        {/* Subtle Section Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] flex-1 bg-white/10"></div>
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em]">Daily_Core</span>
          <div className="h-[1px] w-12 bg-white/10"></div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          {/* Text Content */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-500/10 rounded">
                  <Zap size={14} className="text-blue-400 fill-blue-400" />
                </div>
                <span className="text-xs font-mono text-blue-400">Active Challenge</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-medium tracking-tighter leading-[0.85]">
                {titleFirstWord} <br />
                <span className="text-gray-500 italic font-light">
                  {titleRest}
                </span>
              </h1>
            </div>

            <p className="text-gray-400 text-xl leading-relaxed max-w-xl">
              {challenge.description}
            </p>

            {/* Meta Tags */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-gray-600" />
                <span className="text-xs font-mono uppercase text-gray-500">{challenge.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-gray-600" />
                <span className="text-xs font-mono uppercase text-gray-500">{challenge.category}</span>
              </div>
              {/* LeetCode Reference Tag */}
              <a 
                href={challenge.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 group/link"
              >
                <ExternalLink size={16} className="text-gray-600 group-hover/link:text-orange-500 transition-colors" />
                <span className="text-xs font-mono uppercase text-gray-500 group-hover/link:text-white transition-colors underline decoration-white/10 underline-offset-4">LeetCode.src</span>
              </a>
            </div>
          </div>

          {/* Minimal Action Card */}
          <div className="w-full md:w-72 shrink-0">
            <div className="p-8 border border-white/10 rounded-3xl bg-white/[0.02] hover:border-white/20 transition-all group cursor-pointer">
              <div className="flex justify-between items-start mb-12">
                <div className="text-[40px] font-light text-white/20 group-hover:text-blue-500/50 transition-colors tracking-tighter">
                  {(challenge.challengeId || 'CH-000').split('-')[1]}
                </div>
                <ArrowUpRight className="text-gray-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-widest text-gray-500">Task Status</div>
                <div className="text-sm font-medium italic">{challenge.status}</div>
              </div>
              
              <div className="space-y-3 mt-8">
                <button
                  className="w-full py-4 bg-white text-black rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
                  onClick={() => window.open(challenge.link, '_blank', 'noopener,noreferrer')}
                >
                  Start Module
                </button>
                
                {/* Secondary link for quick access */}
                <a 
                  href={challenge.link}
                  target="_blank"
                  className="block w-full py-3 border border-white/5 hover:border-white/20 rounded-2xl text-center text-[10px] uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all"
                >
                  View on LeetCode
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Line */}
        <div className="mt-24 h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
    </div>
  );
};

export default Today;
