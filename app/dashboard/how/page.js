"use client"
import React from 'react'
import { 
    Settings2, 
    Video, 
    Mic, 
    BrainCircuit, 
    FileBarChart,
    ChevronRight,
    Sparkles
} from 'lucide-react'

const STEPS = [
    {
        title: 'Configure Your Arena',
        desc: 'Select your target company, role, and years of experience. Our AI will curate technical and behavioral questions specifically for your background.',
        icon: <Settings2 className="w-6 h-6 text-violet-400" />,
        color: 'bg-violet-500/10 border-violet-500/20 shadow-violet-500/10'
    },
    {
        title: 'Enable AI Tracking',
        desc: 'Allow webcam and microphone access. Our real-time face-tracking engine detects your micro-expressions and confidence levels as you speak.',
        icon: <Video className="w-6 h-6 text-blue-400" />,
        color: 'bg-blue-500/10 border-blue-500/20 shadow-blue-500/10'
    },
    {
        title: 'Interview Simulation',
        desc: 'Answer each question naturally. The system tracks your Speaking Pace (WPM), filler words (ums, likes), and emotional consistency.',
        icon: <Mic className="w-6 h-6 text-emerald-400" />,
        color: 'bg-emerald-500/10 border-emerald-500/20 shadow-emerald-500/10'
    },
    {
        title: 'AI Analysis',
        desc: 'Our Gemini-powered engine compares your responses with "Ideal Answers" and identifies missing keywords, grammar issues, and depth of knowledge.',
        icon: <BrainCircuit className="w-6 h-6 text-pink-400" />,
        color: 'bg-pink-500/10 border-pink-500/20 shadow-pink-500/10'
    },
    {
        title: 'Personalized Feedback',
        desc: 'Get an instant, detailed performance report with a 1-10 rating, body language insights, and a personalized improvement roadmap.',
        icon: <FileBarChart className="w-6 h-6 text-orange-400" />,
        color: 'bg-orange-500/10 border-orange-500/20 shadow-orange-500/10'
    }
]

function HowItWorks() {
    return (
        <div className="pb-24">
            {/* Hero */}
            <div className='flex flex-col items-center text-center mb-24'>
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-black uppercase tracking-[0.2em] mb-8'>
                    <Sparkles className='w-4 h-4' />
                    The Methodology
                </div>
                <h2 className='text-6xl font-black text-white tracking-tighter mb-6'>
                    Master the art of <span className='text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500'>Interviewing</span>
                </h2>
                <p className='text-xl text-slate-400 font-medium max-w-2xl'>
                    PrepAI combines generative AI with computer vision to simulate high-pressure interviews and provide actionable data on your performance.
                </p>
            </div>

            {/* Steps Section */}
            <div className='max-w-4xl mx-auto relative'>
                {/* Connecting Line */}
                <div className='absolute left-10 top-10 bottom-10 w-0.5 bg-gradient-to-b from-violet-500 via-blue-500 to-orange-500 opacity-10 hidden md:block' />

                <div className='space-y-16'>
                    {STEPS.map((step, idx) => (
                        <div key={idx} className='group relative flex flex-col md:flex-row gap-8 md:gap-16 items-start'>
                            {/* Step Number & Icon */}
                            <div className={`relative z-10 w-20 h-20 rounded-3xl border flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-2xl ${step.color}`}>
                                {step.icon}
                                <div className='absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#050814] border border-white/10 flex items-center justify-center text-[10px] font-black text-slate-500'>
                                    0{idx + 1}
                                </div>
                            </div>

                            {/* Content */}
                            <div className='flex-1 pt-2'>
                                <h3 className='text-2xl font-black text-white mb-4 flex items-center gap-3'>
                                    {step.title}
                                    <ChevronRight className='w-5 h-5 text-slate-700 group-hover:text-white transition-colors' />
                                </h3>
                                <p className='text-lg text-slate-400 leading-relaxed font-medium'>
                                    {step.desc}
                                </p>

                                {/* Feature Highlight Overlay (on hover) */}
                                <div className='mt-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                    <div className='flex gap-4'>
                                        <div className='h-1 w-12 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 mt-2 hover:w-20 transition-all' />
                                        <span className='text-xs text-slate-500 font-bold uppercase tracking-widest'>Core System Component</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className='mt-32 p-12 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl overflow-hidden relative text-center flex flex-col items-center'>
                <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent' />
                <h3 className='text-3xl font-black text-white mb-6'>No more guesswork. Just confidence.</h3>
                <p className='text-slate-400 max-w-lg mb-10 text-lg'>
                    Start your journey with PrepAI today and join thousands of candidates who secured their dream roles.
                </p>
                <button className='px-12 py-5 rounded-[1.25rem] bg-gradient-to-r from-violet-600 to-blue-600 text-white font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-violet-500/30'>
                    Ready? Let's Practice
                </button>
            </div>
        </div>
    )
}

export default HowItWorks
