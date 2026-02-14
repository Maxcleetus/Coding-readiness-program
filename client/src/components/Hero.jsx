import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Zap, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useEffect(() => {
    // Context ensures animations are cleaned up properly
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { ease: "expo.out" } 
      });

      // Ensure elements are ready before animating
      gsap.set(".reveal-content", { visibility: "visible" });

      tl.from(".reveal-text", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        skewY: 7
      })
      .from(".sub-reveal", {
        opacity: 0,
        y: 20,
        duration: 0.8
      }, "-=0.8")
      .from(".btn-reveal", {
        scale: 0.9,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5");

      // Smooth background drift
      gsap.to(".bg-glow", {
        duration: 10,
        x: 'random(-30, 30)',
        y: 'random(-30, 30)',
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={heroRef} 
      className="relative min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center overflow-hidden font-sans pt-28 md:pt-0"
    >
      {/* pt-28 ensures the content clears a fixed navbar on mobile. 
         md:pt-0 allows flexbox centering to take over on desktop.
      */}

      {/* Background Glows - Z-0 ensures they stay behind everything */}
      <div className="bg-glow absolute top-1/4 left-1/4 w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="bg-glow absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] md:w-[30vw] md:h-[30vw] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative  reveal-content">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* Badge */}
          <div className="sub-reveal inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
            <ShieldCheck size={14} className="text-blue-400" />
            <span className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase text-gray-400">
              The Blueprint for Technical Excellence
            </span>
          </div>

          {/* Headline */}
          <div className="overflow-hidden mb-2">
            <h1 className="reveal-text text-5xl sm:text-7xl md:text-9xl font-medium tracking-tighter leading-none">
              CODE <span className="text-blue-500 italic font-light">BEYOND</span>
            </h1>
          </div>
          <div className="overflow-hidden mb-10 md:mb-12">
            <h1 className="reveal-text text-5xl sm:text-7xl md:text-9xl font-medium tracking-tighter leading-none">
              THE SYNTAX.
            </h1>
          </div>

          {/* Subtext */}
          <p className="sub-reveal text-base md:text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed mb-12">
            Master the mental models behind complex systems. Our curriculum 
            distills years of engineering into <span className="text-white">pattern-based learning.</span>
          </p>

          {/* Action Buttons - Fixed Visibility and Z-Index */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 relative z-50 w-full sm:w-auto">
            <button 
              onClick={() => navigate('/questions')}
              className="btn-reveal w-full sm:w-auto group relative px-10 py-5 bg-white text-black rounded-2xl font-medium text-lg transition-all hover:bg-blue-500 hover:text-white active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                Start Practice 
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button 
              onClick={() => navigate('/today')}
              className="btn-reveal w-full sm:w-auto px-10 py-5 border border-white/20 hover:border-white hover:bg-white/[0.05] rounded-2xl font-medium text-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap size={18} className="text-yellow-500" />
              View Roadmap
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
