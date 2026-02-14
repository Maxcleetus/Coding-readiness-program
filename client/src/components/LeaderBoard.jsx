import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Users, User, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { api } from '../lib/api';

const LeaderBoard = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [isExpanded, setIsExpanded] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const loadBoard = async () => {
      setIsLoading(true);
      setError('');

      try {
        const [students, groups] = await Promise.all([
          api.getLeaderboard('students'),
          api.getLeaderboard('groups'),
        ]);
        setStudentData(students);
        setGroupData(groups);
      } catch (err) {
        setError(err.message || 'Failed to load leaderboard');
      } finally {
        setIsLoading(false);
      }
    };

    loadBoard();
  }, []);

  // Animation logic
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".board-item", {
        y: 15,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out",
        clearProps: "all" // Clears GSAP styles after animation to prevent layout issues
      });
    }, containerRef);
    return () => ctx.revert();
  }, [activeTab, isExpanded]);

  const currentData = activeTab === 'students' ? studentData : groupData;
  // This ensures we always show at least 5 if they exist
  const visibleData = isExpanded ? currentData : currentData.slice(0, 5);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030303] text-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tighter mb-4 uppercase">
            The <span className="text-blue-500 italic">Rankings</span>
          </h2>
          <p className="text-gray-500 font-medium tracking-wide uppercase text-[10px] letter-spacing-widest">
            Tracking excellence across the program
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/5 p-1 rounded-2xl border border-white/10 flex gap-2">
            <button
              onClick={() => { setActiveTab('students'); setIsExpanded(false); }}
              className={`flex items-center gap-2 z-50 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === 'students' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              <User size={16} /> Individual
            </button>
            <button
              onClick={() => { setActiveTab('groups'); setIsExpanded(false); }}
              className={`flex items-center z-50 gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === 'groups' ? 'bg-white text-black' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users size={16} /> Groups
            </button>
          </div>
        </div>

        {/* Board Table */}
        <div className="space-y-3">
          {isLoading && <div className="text-gray-500 text-sm">Loading rankings...</div>}
          {!isLoading && error && <div className="text-red-400 text-sm">{error}</div>}

          {!isLoading &&
            !error &&
            visibleData.map((item) => (
            <div 
              key={`${activeTab}-${item.rank}`}
              className="board-item group flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <span className={`text-lg font-medium w-6 text-center ${
                  item.rank === 1 ? 'text-yellow-400' : 
                  item.rank === 2 ? 'text-gray-400' : 
                  item.rank === 3 ? 'text-orange-400' : 'text-gray-600'
                }`}>
                  {item.rank === 1 ? <Trophy size={20} className="mx-auto" /> : item.rank}
                </span>
                <div>
                  <h3 className="font-medium text-gray-200">{item.name}</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                    {activeTab === 'students' ? `${item.solves} Solves` : `${item.members} Active Members`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                {activeTab === 'students' && (
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-500 uppercase">Solves</p>
                    <p className="font-medium text-gray-300">{item.solves}</p>
                  </div>
                )}
                <div className="text-right min-w-[80px]">
                  <p className="text-xs text-blue-500 font-bold tracking-tighter uppercase">
                    {activeTab === 'students' ? 'Points' : 'Total XP'}
                  </p>
                  <p className="text-xl font-medium">{item.points.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {!isExpanded && currentData.length > 5 && (
          <div className="mt-10 flex justify-center">
            <button 
              onClick={() => setIsExpanded(true)}
              className="group flex items-center z-50 gap-2 px-10 py-3 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium"
            >
              View All {activeTab === 'students' ? 'Students' : 'Groups'}
              <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}

        <div className="mt-16 text-center text-blue-200 text-[10px] uppercase tracking-[0.3em] font-semibold opacity-100">
          Ranks update automatically when scores change
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
