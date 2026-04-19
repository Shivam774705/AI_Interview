"use client"
import { getInterviewDetails } from '@/utils/actions';
import React, { use, useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import QuestionsSection from './_components/QuestionsSection';
// Dynamically import RecordAnswerSection with SSR disabled
// because react-hook-speech-to-text uses browser-only APIs (window)
const RecordAnswerSection = dynamic(
    () => import('./_components/RecordAnswerSection'),
    { ssr: false }
);
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params }) {
    // Next.js 15+: params is a Promise, unwrap with React.use()
    const { interviewId } = use(params);

    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    /**
     * Used to Get Interview Details by MockId/Interview Id
     */
    const GetInterviewDetails = async () => {
        const result = await getInterviewDetails(interviewId);
        if (result) {
            const parsed = JSON.parse(result.jsonMockResp);
            // Groq returns { "questions": [...] }, handle both object and raw array formats
            const questions = Array.isArray(parsed) ? parsed : (parsed.questions || Object.values(parsed)[0]);
            console.log("Questions:", questions);
            setMockInterviewQuestion(questions);
            setInterviewData(result);
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-10'>
                {/* Questions  */}
                <QuestionsSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />

                {/* Video/ Audio Recording  */}
                <RecordAnswerSection
                    key={activeQuestionIndex}
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                    onSavingStateChange={(loading) => setIsSaving(loading)}
                />
            </div>
            
            <div className='flex flex-col sm:flex-row justify-center md:justify-end gap-4 mt-12 pb-20 border-t border-white/5 pt-8'>
                {activeQuestionIndex > 0 &&
                    <Button 
                        disabled={isSaving}
                        variant="outline"
                        className="py-6 px-8 rounded-xl border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                    >
                        ← Previous Question
                    </Button>}
                
                {activeQuestionIndex != mockInterviewQuestion?.length - 1 ? (
                    <Button 
                        disabled={isSaving}
                        className="py-6 px-8 rounded-xl bg-violet-600 hover:bg-violet-700 shadow-lg shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                    >
                        {isSaving ? 'Saving...' : 'Next Question →'}
                    </Button>
                ) : (
                    <Link 
                        href={isSaving ? '#' : '/dashboard/interview/' + interviewData?.mockId + "/feedback"} 
                        className={`w-full md:w-auto ${isSaving ? 'pointer-events-none opacity-50' : ''}`}
                    >
                        <Button 
                            disabled={isSaving}
                            variant="destructive" 
                            className="w-full md:w-auto py-6 px-10 rounded-xl font-bold shadow-xl shadow-red-500/20"
                        >
                            {isSaving ? 'Finalizing...' : '🏁 End Interview'}
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default StartInterview
