"use client"
import { getUserInterviews } from '@/utils/actions'
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard'
import { History, Loader2 } from 'lucide-react'

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        user && GetInterviewList();
    }, [user])

    const GetInterviewList = async () => {
        setLoading(true);
        const result = await getUserInterviews(user?.primaryEmailAddress?.emailAddress);
        setInterviewList(result);
        setLoading(false);
    }

    return (
        <div>
            <div className='flex items-center gap-2 mb-6'>
                <History className='w-5 h-5 text-slate-400' />
                <h2 className='font-bold text-xl text-white'>Previous Mock Interviews</h2>
                {interviewList.length > 0 && (
                    <span className='px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/20 text-violet-400 text-xs font-medium'>
                        {interviewList.length}
                    </span>
                )}
            </div>

            {loading ? (
                <div className='flex items-center justify-center py-20'>
                    <Loader2 className='w-8 h-8 text-violet-400 animate-spin' />
                </div>
            ) : interviewList.length === 0 ? (
                <div className='flex flex-col items-center justify-center py-16 border border-dashed border-white/10 rounded-2xl text-center'>
                    <div className='w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-4'>
                        <History className='w-7 h-7 text-slate-600' />
                    </div>
                    <p className='text-slate-400 font-medium'>No interviews yet</p>
                    <p className='text-slate-600 text-sm mt-1'>Create your first mock interview above to get started</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {interviewList.map((interview, index) => (
                        <InterviewItemCard interview={interview} key={index} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default InterviewList
