"use client"
import React from 'react'
import { Target } from 'lucide-react'

function StartInterviewCard() {
  const handleScroll = () => {
    document.getElementById('practice-packs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div 
        onClick={handleScroll} 
        className='p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex items-center gap-5 hover:bg-white/[0.04] hover:border-violet-500/30 transition-all cursor-pointer group shadow-xl shadow-black/20'
    >
      <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center group-hover:scale-110 transition-transform ring-1 ring-violet-500/30'>
        <Target className='w-6 h-6 text-violet-400 drop-shadow-md' />
      </div>
      <div>
        <p className='text-xs text-slate-500 font-bold uppercase tracking-widest'>Start New</p>
        <p className='text-lg font-black text-white group-hover:text-violet-100 transition-colors'>Mock Interview</p>
      </div>
    </div>
  )
}

export default StartInterviewCard
