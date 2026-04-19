'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Briefcase, Clock, ArrowRight, BarChart2, Play, Calendar } from 'lucide-react'

function InterviewItemCard({ interview }) {
    const router = useRouter();

    const roleColors = [
        'from-violet-500/20 to-violet-500/5 border-violet-500/30',
        'from-blue-500/20 to-blue-500/5 border-blue-500/30',
        'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30',
        'from-orange-500/20 to-orange-500/5 border-orange-500/30',
    ];
    const color = roleColors[interview?.id % roleColors.length] ?? roleColors[0];

    return (
        <div className={`group relative p-6 rounded-3xl border bg-white/[0.02] backdrop-blur-md ${color} hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-xl shadow-black/20`}>
            {/* Top accent dot */}
            <div className='absolute top-6 right-6 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]' />

            {/* Role */}
            <div className='flex items-start gap-4 mb-5'>
                <div className='w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors'>
                    <Briefcase className='w-6 h-6 text-violet-400' />
                </div>
                <div className='min-w-0 flex-1'>
                    <h3 className='font-black text-white text-lg truncate capitalize tracking-tight'>{interview?.jobPosition}</h3>
                    <div className='flex items-center gap-1.5 mt-1'>
                        <Clock className='w-3 h-3 text-slate-500' />
                        <span className='text-xs text-slate-400'>{interview?.jobExperience} yrs exp</span>
                    </div>
                </div>
            </div>

            {/* Tech stack snippet */}
            {interview?.jobDesc && (
                <p className='text-xs text-slate-500 mb-4 line-clamp-1'>
                    🛠️ {interview.jobDesc}
                </p>
            )}

            {/* Date */}
            <div className='flex items-center gap-1.5 mb-5'>
                <Calendar className='w-3 h-3 text-slate-600' />
                <span className='text-xs text-slate-500'>Created {interview?.createdAt}</span>
            </div>

            {/* Action buttons */}
            <div className='flex gap-3'>
                <button
                    onClick={() => router.push('/dashboard/interview/' + interview?.mockId + '/feedback')}
                    className='flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all'
                >
                    <BarChart2 className='w-4 h-4' />
                    Details
                </button>
                <button
                    onClick={() => router.push('/dashboard/interview/' + interview?.mockId)}
                    className='flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-violet-500/20'
                >
                    <Play className='w-4 h-4 fill-white' />
                    Retake
                </button>
            </div>
        </div>
    )
}

export default InterviewItemCard
