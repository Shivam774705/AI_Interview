import { Lightbulb, Volume2, Building2, User, Mic } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [companyName, setCompanyName] = useState("");

    useEffect(() => {
        if (interviewData?.jobPosition) {
            const parts = interviewData.jobPosition.split(' - ');
            if (parts.length > 1) {
                setCompanyName(parts[0]);
            }
        }
    }, [interviewData]);

    const textToSpeech = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop current speaking
            const speech = new SpeechSynthesisUtterance(text);
            
            // Try to set a more professional/natural voice if available
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Premium'));
            if (preferredVoice) speech.voice = preferredVoice;

            speech.onstart = () => setIsSpeaking(true);
            speech.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(speech);
        } else {
            alert('Sorry, Your browser does not support text to speech');
        }
    }

    if (!mockInterviewQuestion) return null;

    return (
        <div className='p-6 border border-white/10 rounded-2xl bg-white/[0.02] mt-10 text-white relative overflow-hidden'>
            {/* Persona Header */}
            <div className='flex items-center gap-3 mb-6 pb-6 border-b border-white/10'>
                <div className='w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 p-0.5 flex items-center justify-center relative shadow-lg shadow-violet-500/20'>
                    <div className='w-full h-full bg-[#050814] rounded-full flex items-center justify-center overflow-hidden'>
                        <User className='w-6 h-6 text-violet-400' />
                    </div>
                    {/* Active recording indicator */}
                    {isSpeaking && (
                        <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#050814] flex items-center justify-center animate-pulse'>
                            <Mic className='w-2 h-2 text-white' />
                        </div>
                    )}
                </div>
                <div>
                    <h3 className='font-bold text-lg text-white'>
                        {companyName ? `${companyName} AI Interviewer` : 'AI Interviewer'}
                    </h3>
                    <p className='text-xs text-slate-400 flex items-center gap-1.5'>
                        {companyName ? <Building2 className='w-3 h-3' /> : <User className='w-3 h-3' />}
                        {companyName ? 'Roleplay Mode' : 'General Practice'}
                    </p>
                </div>
            </div>

            {/* Question Nav */}
            <div className='grid grid-cols-5 md:grid-cols-5 gap-3 mb-8'>
                {mockInterviewQuestion.map((question, index) => (
                    <div 
                        key={index} 
                        className={`py-2 rounded-xl text-center text-sm font-semibold transition-all ${
                            activeQuestionIndex === index 
                            ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' 
                            : 'bg-white/5 text-slate-500 border border-transparent'
                        }`}
                    >
                        Q{index + 1}
                    </div>
                ))}
            </div>

            {/* Question Text */}
            <div className='mb-8'>
                <h2 className='text-xl md:text-2xl font-medium leading-relaxed font-serif text-slate-200'>
                    {mockInterviewQuestion[activeQuestionIndex]?.question}
                </h2>
                
                <button 
                    onClick={() => textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
                    className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isSpeaking 
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                >
                    <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
                    {isSpeaking ? 'Speaking...' : 'Listen to Question'}
                </button>
            </div>
            
            {/* Note */}
            <div className='p-4 border border-blue-500/20 rounded-xl bg-blue-500/5 mt-8'>
                <h2 className='flex gap-2 items-center text-blue-400 font-semibold mb-2 text-sm'>
                    <Lightbulb className='w-4 h-4' />
                    Pro Tip
                </h2>
                <p className='text-xs text-slate-400 leading-relaxed'>
                    Click on Record Answer when you want to answer the question. At the end of the interview we will give you detailed feedback along with the ideal corporate answer and a comparison of your vocabulary.
                </p>
            </div>
        </div>
    )
}

export default QuestionsSection
