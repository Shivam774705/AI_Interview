import React from 'react'
import { getLeaderboard } from '@/utils/actions'
import { Trophy, Medal, Star, Hash, Crown } from 'lucide-react'

export default async function LeaderboardPage() {
    const leaderboard = await getLeaderboard();

    return (
        <div className='max-w-5xl mx-auto pb-20 relative'>
            {/* Ambient Background Glows */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none'></div>
            <div className='absolute top-40 right-0 w-1/2 h-96 bg-violet-600/10 blur-[100px] rounded-full pointer-events-none'></div>

            <div className='mb-12 text-center relative z-10 pt-8'>
                <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-600/5 mb-6 ring-1 ring-yellow-500/30 shadow-[0_0_40px_rgba(234,179,8,0.2)]'>
                    <Trophy className='w-10 h-10 text-yellow-400 drop-shadow-md' />
                </div>
                <h1 className='text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 tracking-tight'>
                    Global Leaderboard
                </h1>
                <p className='text-slate-400 mt-4 max-w-xl mx-auto text-sm md:text-base leading-relaxed'>
                    The ultimate ranking of top performers. Positions are calculated in real-time based on your highest average AI feedback ratings.
                </p>
            </div>

            <div className='bg-[#0a0f1e]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl shadow-black/50 relative z-10'>
                {/* Table Header */}
                <div className='grid grid-cols-12 gap-4 px-6 md:px-8 py-5 bg-white/[0.02] border-b border-white/5 text-xs font-bold uppercase tracking-widest text-slate-500'>
                    <div className='col-span-2 text-center'>Rank</div>
                    <div className='col-span-6 md:col-span-5'>Student</div>
                    <div className='col-span-2 hidden md:block text-center'>Interviews</div>
                    <div className='col-span-4 md:col-span-3 text-right'>Avg Rating</div>
                </div>
                
                <div className='divide-y divide-white/5 flex flex-col'>
                    {leaderboard.length === 0 ? (
                        <div className='p-16 text-center flex flex-col items-center justify-center'>
                            <div className='w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4'>
                                <Star className='w-8 h-8 text-slate-600' />
                            </div>
                            <h3 className='text-xl font-bold text-white mb-2'>No scores yet</h3>
                            <p className='text-slate-500'>Complete an interview to claim the #1 spot!</p>
                        </div>
                    ) : (
                        leaderboard.map((user, index) => {
                            const isFirst = index === 0;
                            const isSecond = index === 1;
                            const isThird = index === 2;
                            const isTop3 = index < 3;
                            
                            // Visual percentage out of 10
                            const scorePercentage = (user.avgScore / 10) * 100;

                            return (
                                <div 
                                    key={index} 
                                    className={`grid grid-cols-12 gap-4 px-6 md:px-8 py-5 items-center transition-all duration-300 hover:bg-white/[0.04] group relative ${
                                        isFirst ? 'bg-gradient-to-r from-yellow-500/[0.05] via-transparent to-transparent' : 
                                        isSecond ? 'bg-gradient-to-r from-slate-300/[0.03] via-transparent to-transparent' : 
                                        isThird ? 'bg-gradient-to-r from-amber-600/[0.03] via-transparent to-transparent' : ''
                                    }`}
                                >
                                    {/* Active border indicator on hover */}
                                    <div className='absolute left-0 top-0 bottom-0 w-1 bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity'></div>

                                    {/* Rank Column */}
                                    <div className='col-span-2 flex justify-center'>
                                        {isFirst ? (
                                            <div className='relative'>
                                                <div className='absolute -top-3 -right-2 transform rotate-12'>
                                                    <Crown className='w-4 h-4 text-yellow-400' />
                                                </div>
                                                <Medal className='w-9 h-9 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]' />
                                            </div>
                                        ) : isSecond ? (
                                            <Medal className='w-8 h-8 text-slate-300 drop-shadow-[0_0_10px_rgba(203,213,225,0.4)]' />
                                        ) : isThird ? (
                                            <Medal className='w-8 h-8 text-amber-600 drop-shadow-[0_0_10px_rgba(217,119,6,0.4)]' />
                                        ) : (
                                            <span className='w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 font-mono text-sm font-bold border border-white/5'>
                                                {index + 1}
                                            </span>
                                        )}
                                    </div>
                                    
                                    {/* Student Column */}
                                    <div className='col-span-6 md:col-span-5 flex items-center gap-3 md:gap-4'>
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-bold text-lg md:text-xl ring-1 shadow-lg shrink-0
                                            ${isFirst ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-950 ring-yellow-400/50 shadow-yellow-500/20' : 
                                              isSecond ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-slate-900 ring-slate-300/50 shadow-slate-400/20' :
                                              isThird ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-amber-950 ring-amber-500/50 shadow-amber-600/20' :
                                              'bg-[#131b2f] text-slate-300 ring-white/10'}
                                        `}>
                                            {user.username.charAt(1).toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className={`font-bold text-sm md:text-lg tracking-wide truncate ${isTop3 ? 'text-white' : 'text-slate-300'}`}>
                                                {user.username}
                                            </p>
                                            <p className='text-[10px] md:text-xs text-slate-500 mt-0.5 font-medium'>
                                                Top {Math.max(1, Math.ceil(((index + 1) / Math.max(leaderboard.length, 1)) * 100))}%
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Interviews Column */}
                                    <div className='col-span-2 hidden md:flex justify-center'>
                                        <span className='inline-flex items-center justify-center min-w-[3rem] px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-300 font-mono text-sm font-semibold'>
                                            {user.totalInterviews}
                                        </span>
                                    </div>
                                    
                                    {/* Avg Score Column */}
                                    <div className='col-span-4 md:col-span-3 text-right flex flex-col items-end justify-center'>
                                        <div className={`font-black text-xl md:text-2xl tracking-tighter ${
                                            isFirst ? 'text-yellow-400' : 
                                            isSecond ? 'text-slate-300' : 
                                            isThird ? 'text-amber-500' : 'text-emerald-400'
                                        }`}>
                                            {user.avgScore} <span className='text-sm text-slate-500 font-medium tracking-normal'>/ 10</span>
                                        </div>
                                        
                                        {/* Visual Score Bar */}
                                        <div className='w-full max-w-[120px] h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden flex'>
                                            <div 
                                                className={`h-full rounded-full ${
                                                    isFirst ? 'bg-gradient-to-r from-yellow-500 to-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.5)]' :
                                                    isSecond ? 'bg-gradient-to-r from-slate-400 to-slate-200' :
                                                    isThird ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                                                    'bg-gradient-to-r from-emerald-600 to-emerald-400'
                                                }`}
                                                style={{ width: `${scorePercentage}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}
