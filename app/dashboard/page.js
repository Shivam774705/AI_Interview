import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import { COMPANY_DATA } from '@/utils/companies'
import InterviewList from './_components/InterviewList'
import { GraduationCap, TrendingUp, Target, Building2, Flame } from 'lucide-react'
import { getUserProgress } from '@/utils/actions'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import StartInterviewCard from './_components/StartInterviewCard'

export default async function Dashboard() {
  const user = await currentUser();
  const progress = await getUserProgress(user?.primaryEmailAddress?.emailAddress);

  return (
    <div className="relative pb-20">
      {/* Ambient Glows */}
      <div className='absolute top-0 right-0 w-1/2 h-96 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none'></div>
      <div className='absolute bottom-0 left-0 w-1/2 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none'></div>

      {/* Page Header */}
      <div className='mb-10'>
        <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-medium mb-4'>
          <GraduationCap className='w-3.5 h-3.5' />
          Campus Placement Prep
        </div>
        <h1 className='font-extrabold text-3xl text-white mb-1'>Dashboard</h1>
        <p className='text-slate-400'>Create a mock interview, practise, and track your improvement</p>
      </div>

      {/* Quick Stats */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12 relative z-10'>
        <StartInterviewCard />
        <Link href="/dashboard/progress" className="w-full">
          <div className='p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex items-center gap-5 hover:bg-white/[0.04] hover:border-orange-500/30 transition-all cursor-pointer group shadow-xl shadow-black/20'>
            <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform ring-1 ring-orange-500/30'>
              <Flame className='w-6 h-6 text-orange-400 drop-shadow-md' />
            </div>
            <div>
              <p className='text-xs text-slate-500 font-bold uppercase tracking-widest'>Current Streak</p>
              <p className='text-lg font-black text-white group-hover:text-orange-100 transition-colors'>{progress?.streak || 0} Days 🔥</p>
            </div>
          </div>
        </Link>
        <Link href="/dashboard/leaderboard" className="w-full">
          <div className='p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md flex items-center gap-5 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all cursor-pointer group shadow-xl shadow-black/20'>
            <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform ring-1 ring-blue-500/30'>
              <TrendingUp className='w-6 h-6 text-blue-400 drop-shadow-md' />
            </div>
            <div>
              <p className='text-xs text-slate-500 font-bold uppercase tracking-widest'>Total Completed</p>
              <p className='text-lg font-black text-white group-hover:text-blue-100 transition-colors'>{progress?.totalInterviews || 0} Interviews</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Company Packs */}
      <div className='mt-8 relative z-10'>
        <h2 id="practice-packs" className='text-xl text-white font-bold mb-5 flex items-center gap-2'>
          <Building2 className="w-5 h-5 text-slate-400" />
          Practice Company Packs
        </h2>
        <div className='grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-h-[450px] overflow-y-auto pr-2 pb-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-700/50 [&::-webkit-scrollbar-track]:bg-transparent'>
          {COMPANY_DATA.map((company, index) => (
            <AddNewInterview 
              key={index} 
              initialCompany={company.name} 
              initialRole={company.role} 
              initialDesc={company.desc}
            >
              <div className='p-3 h-full rounded-xl border border-violet-500/10 bg-white/[0.02] hover:bg-violet-500/10 hover:border-violet-500/30 cursor-pointer transition-all text-center flex flex-col justify-center items-center gap-1 group'>
                <div className='w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform'>
                  <Building2 className='w-4 h-4 text-slate-400 group-hover:text-violet-400 transition-colors' />
                </div>
                <h3 className='font-bold text-slate-200 text-sm group-hover:text-white line-clamp-1'>{company.name}</h3>
                <p className='text-[10px] text-slate-500 line-clamp-1'>{company.role}</p>
              </div>
            </AddNewInterview>
          ))}
        </div>
      </div>

      {/* Add New Interview */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-10'>
        <AddNewInterview />
      </div>

      {/* Previous Interviews */}
      <InterviewList />
    </div>
  )
}
