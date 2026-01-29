import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Users, User, Medal, ArrowUpRight, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

const LeaderBoard = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  // Mock Data
  const studentData = [
    { rank: 1, name: "Alex Rivera", points: 2850, solves: 142, level: "Platinum" },
    { rank: 2, name: "Sarah Chen", points: 2720, solves: 138, level: "Platinum" },
    { rank: 3, name: "Jordan Smit", points: 2600, solves: 120, level: "Gold" },
    { rank: 4, name: "Priya Das", points: 2450, solves: 115, level: "Gold" },
    { rank: 5, name: "Marcus Lee", points: 2300, solves: 110, level: "Silver" },
    { rank: 6, name: "Elena Rodriguez", points: 2100, solves: 98, level: "Silver" },
    { rank: 7, name: "Sam Wilson", points: 1950, solves: 85, level: "Bronze" },
  ];

  const groupData = [
    { rank: 1, name: "Neural Knights", points: 12400, members: 5, growth: "+12%" },
    { rank: 2, name: "Binary Beasts", points: 11200, members: 4, growth: "+8%" },
    { rank: 3, name: "Logic Lords", points: 9800, members: 6, growth: "+5%" },
    { rank: 4, name: "Code Crusaders", points: 8900, members: 4, growth: "+10%" },
    { rank: 5, name: "Dev Dynamos", points: 7600, members: 5, growth: "+3%" },
    { rank: 6, name: "Stack Stars", points: 5400, members: 3, growth: "+1%" },
  ];

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
          {visibleData.map((item) => (
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
                    {activeTab === 'students' ? `${item.level} Division` : `${item.members} Active Members`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                {activeTab === 'students' ? (
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-500 uppercase">Solves</p>
                    <p className="font-medium text-gray-300">{item.solves}</p>
                  </div>
                ) : (
                  <div className="hidden md:block text-right">
                    <span className="text-emerald-500 text-xs font-medium flex items-center justify-end gap-1">
                      <ArrowUpRight size={12} /> {item.growth}
                    </span>
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

        <div className="mt-16 text-center text-gray-600 text-[10px] uppercase tracking-[0.3em] font-medium opacity-50">
          Ranks are updated every 24 hours
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;