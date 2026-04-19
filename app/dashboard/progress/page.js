import React from 'react'
import { getUserProgress } from '@/utils/actions'
import { currentUser } from '@clerk/nextjs/server'
import ProgressChart from './_components/ProgressChart'
import { Flame, Target, TrendingUp, Award, CalendarClock } from 'lucide-react'

export default async function ProgressPage() {
    const user = await currentUser();
    const progress = await getUserProgress(user?.primaryEmailAddress?.emailAddress);

    return (
        <div className='max-w-5xl mx-auto relative pb-20'>
            {/* Ambient Glows */}
            <div className='absolute top-0 right-0 w-1/2 h-96 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none z-[-1]'></div>
            <div className='absolute bottom-0 left-0 w-1/2 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-[-1]'></div>
            
            <div className='mb-8 relative z-10'>
                <h1 className='text-3xl font-extrabold text-white'>Performance Dashboard</h1>
                <p className='text-slate-400 mt-1'>Track your AI mock interview scores and consistency over time.</p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10 relative z-10'>
                {/* Stats Cards */}
                <div className='bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-5 md:p-6 relative overflow-hidden shadow-xl shadow-black/20'>
                    <div className='absolute -right-4 -top-4 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl'></div>
                    <div className='w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center mb-3 ring-1 ring-violet-500/30'>
                        <TrendingUp className='w-6 h-6 text-violet-400 drop-shadow-md' />
                    </div>
                    <p className='text-slate-400 text-xs font-bold uppercase tracking-widest'>Average Score</p>
                    <h2 className='text-3xl md:text-4xl font-black text-white mt-1'>
                        {progress?.avgScore || 0}<span className='text-lg md:text-xl text-slate-500 font-normal'>/10</span>
                    </h2>
                </div>

                <div className='bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-5 md:p-6 relative overflow-hidden shadow-xl shadow-black/20'>
                    <div className='absolute -right-4 -top-4 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl'></div>
                    <div className='w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-3 ring-1 ring-orange-500/30'>
                        <Flame className='w-6 h-6 text-orange-400 drop-shadow-md' />
                    </div>
                    <p className='text-slate-400 text-xs font-bold uppercase tracking-widest'>Current Streak</p>
                    <h2 className='text-3xl md:text-4xl font-black text-white mt-1'>
                        {progress?.streak || 0}<span className='text-lg md:text-xl text-slate-500 font-normal'> Days</span>
                    </h2>
                </div>

                <div className='bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-3xl p-5 md:p-6 relative overflow-hidden shadow-xl shadow-black/20'>
                    <div className='absolute -right-4 -top-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl'></div>
                    <div className='w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-3 ring-1 ring-blue-500/30'>
                        <Target className='w-6 h-6 text-blue-400 drop-shadow-md' />
                    </div>
                    <p className='text-slate-400 text-xs font-bold uppercase tracking-widest'>Total Interviews</p>
                    <h2 className='text-3xl md:text-4xl font-black text-white mt-1'>
                        {progress?.totalInterviews || 0}
                    </h2>
                </div>
            </div>

            <div className='bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-8 h-[400px] relative z-10 shadow-xl shadow-black/20'>
                <h3 className='text-lg font-bold text-white mb-6 flex items-center gap-2'>
                    <Award className='w-5 h-5 text-violet-400 drop-shadow-md' />
                    Score Trajectory (Last 10 Interviews)
                </h3>
                <div className='h-[280px] w-full'>
                    <ProgressChart history={progress?.history || []} />
                </div>
            </div>
        </div>
    )
}
