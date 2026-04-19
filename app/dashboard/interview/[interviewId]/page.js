"use client"
import { Button } from '@/components/ui/button'
import { getInterviewDetails } from '@/utils/actions'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({ params }) {
    // In Next.js 15+, params is a Promise — unwrap it with React.use()
    const { interviewId } = use(params);

    const [interviewData, setInterviewData] = useState();
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    useEffect(() => {
        GetInterviewDetails();
    }, [])

    /**
     * Used to Get Interview Details by MockId/Interview Id
     */
    const GetInterviewDetails = async () => {
        const result = await getInterviewDetails(interviewId);
        setInterviewData(result);
    }

    return (
        <div className='my-10 relative'>
            <div className='absolute -top-10 -right-10 w-64 h-64 bg-violet-600/10 blur-[100px] rounded-full -z-10' />
            
            <h2 className='font-extrabold text-3xl text-white mb-2'>Step into the Arena</h2>
            <p className='text-slate-400 mb-10'>Review your details and prepare your environment.</p>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                <div className='flex flex-col gap-5'>
                    <div className='flex flex-col p-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md gap-4 shadow-xl'>
                        <div className="space-y-4">
                            <div>
                                <p className='text-xs text-slate-500 font-bold uppercase tracking-widest mb-1'>Job Position</p>
                                <p className='text-lg font-semibold text-white'>{interviewData?.jobPosition} </p>
                            </div>
                            <div className='pt-4 border-t border-white/5'>
                                <p className='text-xs text-slate-500 font-bold uppercase tracking-widest mb-1'>Tech Stack / Description</p>
                                <p className='text-slate-300 leading-relaxed'>{interviewData?.jobDesc} </p>
                            </div>
                            <div className='pt-4 border-t border-white/5'>
                                <p className='text-xs text-slate-500 font-bold uppercase tracking-widest mb-1'>Experience Level</p>
                                <p className='text-slate-300 font-medium'>{interviewData?.jobExperience} Years</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className='p-6 border border-amber-500/20 rounded-2xl bg-amber-500/5 backdrop-blur-md'>
                       <h2 className='flex gap-2 items-center text-amber-400 font-bold mb-3 uppercase tracking-wider text-xs'>
                           <Lightbulb className="w-4 h-4" />
                           Before You Begin
                       </h2>
                       <p className='text-sm text-slate-300 leading-relaxed'>
                           Enable your **Camera** and **Microphone** to start. The AI will present 5 specialized questions. 
                           At the end, you'll receive a detailed performance report. 
                           <span className='block mt-2 text-slate-500 text-xs italic'>* Note: We never record your video or audio locally.</span>
                       </p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center p-6 border border-white/10 rounded-2xl bg-white/[0.02] min-h-[350px]">
                    {webCamEnabled ? (
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <Webcam
                                onUserMedia={() => setWebCamEnabled(true)}
                                onUserMediaError={() => setWebCamEnabled(false)}
                                mirrored={true}
                                className="relative h-[300px] w-full max-w-[400px] rounded-xl object-cover bg-black ring-1 ring-white/10 shadow-2xl"
                            />
                        </div>
                    ) : (
                        <>
                            <div className="w-full h-[250px] flex items-center justify-center rounded-xl bg-white/[0.03] border border-dashed border-white/10 mb-6 group hover:bg-white/[0.05] transition-all">
                                <WebcamIcon className='h-20 w-20 text-slate-700 group-hover:text-slate-500 transition-colors' />
                            </div>
                            <Button 
                                variant="outline" 
                                className="w-full py-6 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold" 
                                onClick={() => setWebCamEnabled(true)}
                            >
                                🎥 Enable Web Cam & Microphone
                            </Button>
                        </>
                    )}
                </div>


            </div>
            
            <div className='flex justify-center md:justify-end items-center mt-12 pt-8 border-t border-white/5'>
                <Link href={'/dashboard/interview/' + interviewId + '/start'} className="w-full md:w-auto">
                    <Button className="w-full md:w-[200px] py-7 text-lg font-black bg-gradient-to-r from-violet-600 to-blue-600 hover:scale-105 transition-all shadow-xl shadow-violet-500/20 rounded-2xl">
                        🚀 Start Interview
                    </Button>
                </Link>
            </div>

        </div>
    )
}

export default Interview
