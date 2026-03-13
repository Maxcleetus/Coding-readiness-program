import React, { useEffect, useRef, useState } from 'react';
import { Trophy } from 'lucide-react';
import gsap from 'gsap';
import { api } from '../lib/api';

const defaultWinner = {
  name: 'Alex Rivera',
  imageData: '',
};

const WinnerSpotlight = () => {
  const sectionRef = useRef(null);
  const [winner, setWinner] = useState(defaultWinner);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWinner = async () => {
      setIsLoading(true);

      try {
        const data = await api.getCompetitionWinner();
        setWinner(data);
      } catch {
        setWinner(defaultWinner);
      } finally {
        setIsLoading(false);
      }
    };

    loadWinner();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.winner-reveal', {
        opacity: 0,
        y: 28,
        duration: 0.8,
        stagger: 0.12,
        ease: 'expo.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#030303] px-6 py-8 md:py-14 text-white font-sans overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute left-[8%] top-10 h-48 w-48 rounded-full bg-cyan-400/10 blur-[110px] pointer-events-none" />
      <div className="absolute right-[10%] bottom-10 h-56 w-56 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <div className="winner-reveal rounded-[36px] border border-white/10 bg-white/[0.03] p-6 md:p-8 backdrop-blur-sm">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-300">
            <Trophy size={14} />
            Competition Winner
          </div>

          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-sm rounded-[30px] border border-white/10 bg-black/30 p-5">
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[#08111d] aspect-[4/5]">
                {winner.imageData ? (
                  <img
                    src={winner.imageData}
                    alt={`${winner.name} winner portrait`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
                    {isLoading ? 'Loading image...' : 'No image uploaded'}
                  </div>
                )}
              </div>

              <h2 className="mt-5 text-center text-3xl md:text-4xl font-medium tracking-tight">
                {isLoading ? 'Loading winner...' : winner.name}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WinnerSpotlight;
