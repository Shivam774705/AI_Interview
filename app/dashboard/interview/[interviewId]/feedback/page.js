"use client"
import { getInterviewFeedback } from '@/utils/actions'
import React, { use, useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    ChevronsUpDown,
    CheckCircle2,
    AlertCircle,
    Star,
    Mic,
    MessageSquare,
    BookOpen,
    Home,
    TrendingUp,
    Smile,
    Activity,
    Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

// ── Filler Word Helper ────────────────────────────────────────────────────────
function FillerChip({ count }) {
    if (count === null || count === undefined) return null;
    const n = Number(count);
    const isGood = n === 0;
    const isOk = n <= 3;

    return (
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
            isGood
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : isOk
                ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
            <Mic className="w-3 h-3" />
            {isGood
                ? '🎙️ No filler words — great!'
                : `⚠️ ${n} filler word${n > 1 ? 's' : ''} detected`}
        </div>
    );
}

// ── Rating Stars ──────────────────────────────────────────────────────────────
function RatingStars({ rating }) {
    const n = Math.min(10, Math.max(0, Number(rating) || 0));
    const filled = Math.round(n / 2); // out of 5 stars

    return (
        <div className="flex items-center gap-1">
            {Array(5).fill(0).map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i < filled ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`}
                />
            ))}
            <span className="ml-1 text-sm font-bold text-white">{rating}/10</span>
        </div>
    );
}

// ── Overall Rating Calc ────────────────────────────────────────────────────────
function calcOverall(list) {
    const valid = list.map(i => Number(i.rating)).filter(n => !isNaN(n) && n > 0);
    if (!valid.length) return '—';
    return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1);
}

// ── Filler Word Calc ────────────────────────────────────────────────────────
function calcTotalFillers(list) {
    return list.reduce((sum, i) => sum + (Number(i.fillerCount) || 0), 0);
}

// ── Keyword Comparison ─────────────────────────────────────────────────────────
const STOP_WORDS = new Set(['the', 'is', 'at', 'which', 'on', 'and', 'a', 'an', 'in', 'to', 'of', 'for', 'with', 'as', 'by', 'this', 'it', 'that', 'be', 'are', 'or', 'from', 'can', 'you', 'if', 'we', 'how', 'what', 'when', 'where', 'why', 'who', 'so', 'then', 'there', 'they', 'their', 'them', 'these', 'those', 'has', 'have', 'had', 'does', 'do', 'did', 'not', 'no', 'but', 'because', 'about', 'more', 'some', 'such', 'into', 'up', 'out', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'all', 'any', 'both', 'each', 'few', 'other', 'same', 'than', 'too', 'very', 's', 't', 'will', 'just', 'should', 'now', 'am', 'was', 'were', 'it\'s', 'don\'t', 'doesn\'t']);

function IdealAnswerComparison({ correctAns, userAns }) {
    if (!correctAns) return null;
    
    // If no user answer, just show the correct answer
    if (!userAns) return <p className="text-sm text-slate-300 leading-relaxed">{correctAns}</p>;

    // Get all words from user answer (lowercase, alphanumeric only)
    const userWords = new Set(userAns.toLowerCase().match(/\b[a-z0-9]+\b/g) || []);
    
    // Split correct answer into tokens (words and non-words)
    const tokens = correctAns.split(/(\b[a-zA-Z0-9]+\b)/);

    let missingCount = 0;

    const renderedText = tokens.map((token, i) => {
        const isWord = /^[a-zA-Z0-9]+$/.test(token);
        if (!isWord) return <span key={i}>{token}</span>;

        const lowerToken = token.toLowerCase();
        
        // Skip common stop words
        if (STOP_WORDS.has(lowerToken)) {
            return <span key={i}>{token}</span>;
        }

        // If user didn't mention this word, highlight it
        if (!userWords.has(lowerToken)) {
            missingCount++;
            return (
                <span 
                    key={i} 
                    className="bg-red-500/15 text-red-300 border-b border-red-500/30 px-0.5 rounded" 
                    title="Keyword missing from your answer"
                >
                    {token}
                </span>
            );
        }

        // Keyword successfully mentioned by user
        return <span key={i} className="text-emerald-400 font-medium">{token}</span>;
    });

    return (
        <div>
            <div className="text-sm text-slate-300 leading-relaxed font-serif tracking-wide">{renderedText}</div>
            {missingCount > 0 && (
                <div className="text-xs text-slate-400 mt-2 flex items-center gap-1.5 p-2 rounded bg-black/20">
                    <span className="w-2 h-2 rounded-full bg-red-500/50 inline-block"></span>
                    <span className="text-red-300/80">Red words</span> were missing from your answer. <span className="text-emerald-400/80 font-medium ml-1">Green words</span> matched successfully.
                </div>
            )}
        </div>
    );
}

// ── Main Component ─────────────────────────────────────────────────────────────
function Feedback({ params }) {
    const { interviewId } = use(params);
    const [feedbackList, setFeedbackList] = useState([]);
    const router = useRouter();

    useEffect(() => { GetFeedback(); }, [])

    const GetFeedback = async () => {
        const result = await getInterviewFeedback(interviewId);
        setFeedbackList(result || []);
    }

    const overall = calcOverall(feedbackList);
    const totalFillers = calcTotalFillers(feedbackList);
    const overallN = parseFloat(overall);
    const ratingColor = overallN >= 7 ? 'text-emerald-400' : overallN >= 4 ? 'text-yellow-400' : 'text-red-400';

    return (
        <div className='max-w-5xl mx-auto relative pb-20 p-6 md:p-10 min-h-screen bg-[#050814] text-white'>
            {/* Ambient Glows */}
            <div className='absolute top-0 right-0 w-1/2 h-96 bg-violet-600/10 blur-[120px] rounded-full pointer-events-none -z-10' />
            <div className='absolute bottom-0 left-0 w-1/2 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10' />

            <div className='relative z-10'>
                {feedbackList?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 border border-white/10 rounded-3xl bg-white/[0.02] backdrop-blur-md">
                        <TrendingUp className="w-16 h-16 text-slate-700 mb-6" />
                        <h2 className='font-bold text-2xl text-slate-300'>No Feedback Found</h2>
                        <p className='text-slate-500 mt-2'>Complete your first interview to see the results!</p>
                        <Button className="mt-8" onClick={() => router.replace('/dashboard')}>Go to Dashboard</Button>
                    </div>
                ) : (
                    <>
                        {/* Hero Header */}
                        <div className='mb-12'>
                            <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-semibold mb-6'>
                                <CheckCircle2 className='w-3.5 h-3.5' />
                                Interview Analysis Complete
                            </div>
                            <h2 className='text-5xl font-black text-white tracking-tight mb-3'>Congratulations! 🎉</h2>
                            <p className='text-lg text-slate-400 font-medium'>Here's a detailed breakdown of your performance.</p>
                        </div>

                        {/* Summary Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            {/* Overall Score */}
                            <div className='p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl'>
                                <div className='absolute -top-10 -right-10 w-32 h-32 bg-violet-600/20 blur-3xl group-hover:bg-violet-600/30 transition-colors pointer-events-none' />
                                <p className='text-xs text-slate-500 font-black uppercase tracking-widest mb-4'>Overall Rating</p>
                                <div className='flex items-baseline gap-2'>
                                    <span className={`text-7xl font-black ${ratingColor}`}>{overall}</span>
                                    <span className='text-2xl text-slate-500 font-medium'>/10</span>
                                </div>
                                <div className='mt-6 w-full h-2 bg-white/5 rounded-full overflow-hidden'>
                                    <div 
                                        className={`h-full bg-gradient-to-r ${overallN >= 7 ? 'from-emerald-600 to-teal-500' : overallN >= 4 ? 'from-yellow-600 to-orange-500' : 'from-red-600 to-pink-500'} rounded-full`}
                                        style={{ width: `${(overallN * 10)}%` }} 
                                    />
                                </div>
                                <div className='mt-4 flex justify-center'>
                                    <RatingStars rating={overallN} />
                                </div>
                            </div>

                            {/* Rapid Feedback Stats */}
                            <div className='grid grid-cols-2 gap-6'>
                                <div className='p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-xl'>
                                    <p className='text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3'>Clarity</p>
                                    <p className={`text-3xl font-black ${totalFillers === 0 ? 'text-emerald-400' : totalFillers <= 5 ? 'text-yellow-400' : 'text-red-400'}`}>{totalFillers}</p>
                                    <p className='text-xs text-slate-500 mt-1'>Filler Words</p>
                                </div>
                                <div className='p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-xl'>
                                    <p className='text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3'>Intensity</p>
                                    <p className='text-3xl font-black text-blue-400'>{feedbackList.length}</p>
                                    <p className='text-xs text-slate-500 mt-1'>Questions</p>
                                </div>
                                <div className='p-6 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-xl col-span-2 flex items-center justify-between'>
                                    <div>
                                        <p className='text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1'>Consistency</p>
                                        <p className='text-lg font-bold text-white uppercase'>Stable Performance</p>
                                    </div>
                                    <TrendingUp className="w-8 h-8 text-emerald-500" />
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center gap-3 mb-8'>
                            <h3 className='text-xl font-bold text-white'>Question-wise Analysis</h3>
                            <div className='h-px flex-1 bg-white/5'></div>
                        </div>

                        {/* Analysis List */}
                        <div className='space-y-4'>
                            {feedbackList.map((item, index) => (
                                <Collapsible key={index} className='mb-4'>
                                    <CollapsibleTrigger className='w-full p-5 bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] rounded-2xl flex justify-between items-center text-left gap-4 transition-all group shadow-lg backdrop-blur-md'>
                                        <div className="flex items-start gap-4 flex-1 min-w-0">
                                            <span className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-bold flex items-center justify-center shrink-0">
                                                {index + 1}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-base font-semibold text-slate-200 truncate">{item.question}</p>
                                                <div className="flex items-center gap-3 mt-2 flex-wrap">
                                                    <RatingStars rating={item.rating} />
                                                    <FillerChip count={item.fillerCount} />
                                                    {item.userEmotion && (
                                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border bg-indigo-500/10 border-indigo-500/30 text-indigo-400 capitalize uppercase tracking-wider">
                                                            <Smile className="w-3 h-3" />
                                                            {item.userEmotion}
                                                        </div>
                                                    )}
                                                    {item.speakingPace && Number(item.speakingPace) > 0 && (
                                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border bg-cyan-500/10 border-cyan-500/30 text-cyan-400 uppercase tracking-wider">
                                                            <Activity className="w-3 h-3" />
                                                            {item.speakingPace} WPM
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <ChevronsUpDown className='h-5 w-5 text-slate-600 shrink-0 group-hover:text-white transition-colors' />
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <div className='flex flex-col gap-4 p-6 border border-t-0 border-white/10 rounded-b-3xl bg-white/[0.01] backdrop-blur-md mt-[-15px] pt-10 px-8'>
                                            {/* AI Summary Block */}
                                            <div className='p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5'>
                                                <p className="text-xs text-blue-400 font-bold mb-2 flex items-center gap-1 uppercase tracking-widest">
                                                    <TrendingUp className="w-3.5 h-3.5" /> AI Performance Feedback
                                                </p>
                                                <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                                    {item.feedback}
                                                </p>
                                            </div>

                                            {/* Response Comparison */}
                                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                                                <div className='p-4 border border-red-500/15 rounded-2xl bg-red-500/5'>
                                                    <p className="text-[10px] text-red-400 font-black mb-2 flex items-center gap-1 uppercase tracking-widest">
                                                        <Mic className="w-3 h-3" /> Your Recorded Answer
                                                    </p>
                                                    <p className="text-sm text-slate-300 leading-relaxed font-serif px-1 italic">"{item.userAns}"</p>
                                                </div>
                                                <div className='p-4 border border-emerald-500/15 rounded-2xl bg-emerald-500/5'>
                                                    <p className="text-[10px] text-emerald-400 font-black mb-2 flex items-center gap-1 uppercase tracking-widest">
                                                        <Award className="w-3.5 h-3.5" /> Ideal Responses vs You
                                                    </p>
                                                    <IdealAnswerComparison correctAns={item.correctAns} userAns={item.userAns} />
                                                </div>
                                            </div>
                                            
                                            {/* Footer Analytics */}
                                            <div className='flex gap-4 flex-wrap'>
                                                <div className='px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2'>
                                                    <span className='text-[10px] text-slate-500 uppercase font-black'>Score</span>
                                                    <span className='text-sm font-bold text-white'>{item.rating}/10</span>
                                                </div>
                                                <div className='px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2'>
                                                    <span className='text-[10px] text-slate-500 uppercase font-black'>Clarity</span>
                                                    <span className='text-sm font-bold text-white'>{item.fillerCount} Fillers</span>
                                                </div>
                                                {item.userEmotion && (
                                                    <div className='px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2'>
                                                        <span className='text-[10px] text-slate-500 uppercase font-black'>Emotion</span>
                                                        <span className='text-sm font-bold text-indigo-400 capitalize'>{item.userEmotion}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            ))}
                        </div>

                        {/* ── Actions ── */}
                        <div className="flex flex-col sm:flex-row gap-5 mt-16 pt-10 border-t border-white/5">
                            <button
                                onClick={() => router.replace('/dashboard')}
                                className="flex-1 px-8 py-5 rounded-3xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-violet-500/30"
                            >
                                🏠 Back to Dashboard
                            </button>
                            <button
                                onClick={() => router.replace('/dashboard')}
                                className="flex-1 px-8 py-5 rounded-3xl border border-white/10 bg-white/[0.02] text-slate-200 font-bold text-xl hover:bg-white/[0.05] transition-all"
                            >
                                🔄 Practice Again
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Feedback
