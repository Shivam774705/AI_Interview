"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle, AlertCircle, CheckCircle2, Volume2 } from 'lucide-react'
import { toast } from 'sonner'
import { sendMessage } from '@/utils/GeminiAIModal'
import { saveUserAnswer } from '@/utils/actions'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import * as faceapi from 'face-api.js'

// ── Filler Word Config ───────────────────────────────────────────────────────
const FILLER_WORDS = [
    'um', 'uh', 'like', 'you know', 'basically', 'actually',
    'literally', 'right', 'so', 'kind of', 'sort of', 'i mean',
    'well', 'okay so', 'yeah so'
];

function detectFillers(text) {
    const lower = text.toLowerCase();
    const found = {};
    let total = 0;

    FILLER_WORDS.forEach(word => {
        // match whole-word occurrences
        const regex = new RegExp(`\\b${word.replace(/\s+/g, '\\s+')}\\b`, 'gi');
        const matches = lower.match(regex);
        if (matches) {
            found[word] = matches.length;
            total += matches.length;
        }
    });

    return { found, total };
}

function FillerBadge({ total, found }) {
    const wordCount = Object.keys(found).length;
    const isGood = total === 0;
    const isOk = total <= 3;

    return (
        <div className={`mt-4 w-full max-w-md mx-auto rounded-xl border p-4 ${
            isGood
                ? 'border-emerald-500/30 bg-emerald-500/5'
                : isOk
                ? 'border-yellow-500/30 bg-yellow-500/5'
                : 'border-red-500/30 bg-red-500/5'
        }`}>
            <div className="flex items-center gap-3 mb-2">
                {isGood
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    : <AlertCircle className={`w-5 h-5 shrink-0 ${isOk ? 'text-yellow-400' : 'text-red-400'}`} />
                }
                <div>
                    <p className={`text-sm font-semibold ${isGood ? 'text-emerald-400' : isOk ? 'text-yellow-400' : 'text-red-400'}`}>
                        {isGood
                            ? '🎙️ Great speech clarity!'
                            : isOk
                            ? `⚠️ ${total} filler word${total > 1 ? 's' : ''} detected`
                            : `🚨 ${total} filler words — needs improvement`
                        }
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                        {isGood
                            ? 'No filler words detected. Great job!'
                            : 'Interviewers notice filler words. Try to pause instead of filling silence.'
                        }
                    </p>
                </div>
            </div>

            {/* Individual filler breakdown */}
            {!isGood && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {Object.entries(found).map(([word, count]) => (
                        <span key={word} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                            "{word}" <span className="font-bold text-red-400">×{count}</span>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

// ── Speech Quality Score ─────────────────────────────────────────────────────
function speechQualityScore(answer, fillerTotal) {
    const words = answer.trim().split(/\s+/).length;
    const fillerPct = words > 0 ? (fillerTotal / words) * 100 : 0;
    if (fillerPct === 0) return { label: 'Excellent', color: 'text-emerald-400' };
    if (fillerPct <= 5) return { label: 'Good', color: 'text-blue-400' };
    if (fillerPct <= 10) return { label: 'Fair', color: 'text-yellow-400' };
    return { label: 'Needs Work', color: 'text-red-400' };
}

// ── Main Component ────────────────────────────────────────────────────────────
function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData, onSavingStateChange }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [fillerResult, setFillerResult] = useState(null); // shown after recording stops
    const { user } = useUser();
    const isStarting = useRef(false);
    const hasSaved = useRef(false);

    // Notify parent about loading state
    useEffect(() => {
        onSavingStateChange && onSavingStateChange(loading);
    }, [loading]);

    const {
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({ continuous: true, useLegacyResults: false });

    // AI Analytics States
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [faceEmotion, setFaceEmotion] = useState(null); // String showing current emotion
    const webcamRef = useRef(null);
    const emotionsMap = useRef({}); // Accumulate emotions across interval
    const recordingStartTime = useRef(null);
    const analysisInterval = useRef(null);

    // Initialize face-api models
    useEffect(() => {
        const loadModels = async () => {
            try {
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
                ]);
                setModelsLoaded(true);
            } catch (err) {
                console.warn("Face AI models failed to load:", err);
            }
        };
        loadModels();
    }, []);

    // Cleanup on unmount (question change)
    useEffect(() => {
        return () => {
            try { stopSpeechToText(); } catch (e) { /* ignore */ }
            if (analysisInterval.current) clearInterval(analysisInterval.current);
        };
    }, []);

    // Accumulate speech results
    useEffect(() => {
        if (results.length > 0) {
            const combined = results.map(r => r?.transcript).join(' ');
            setUserAnswer(combined);
        }
    }, [results]);

    // Run filler detection + save when recording stops
    useEffect(() => {
        if (!isRecording && userAnswer.length > 4 && !hasSaved.current && !loading) {
            const detection = detectFillers(userAnswer);
            setFillerResult(detection);
            hasSaved.current = true;
            UpdateUserAnswer(detection.total);
        }
    }, [isRecording]);

    const StartStopRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
            if (analysisInterval.current) clearInterval(analysisInterval.current);
            setFaceEmotion(null);
        } else {
            if (isStarting.current) return;
            isStarting.current = true;
            hasSaved.current = false;
            setFillerResult(null);
            setUserAnswer('');
            setResults([]);
            emotionsMap.current = {};
            recordingStartTime.current = Date.now();
            try {
                await startSpeechToText();
                
                // Start Face Analysis if loaded
                if (modelsLoaded && webcamRef.current?.video) {
                    analysisInterval.current = setInterval(async () => {
                        if (!webcamRef.current?.video) return;
                        const detections = await faceapi.detectSingleFace(
                            webcamRef.current.video, 
                            new faceapi.TinyFaceDetectorOptions()
                        ).withFaceExpressions();
                        
                        if (detections) {
                            const expressions = detections.expressions;
                            
                            // Find highest probability emotion with a threshold to prevent erratic jumping
                            let dominant = 'neutral';
                            let maxProb = 0;
                            for (const [emotion, prob] of Object.entries(expressions)) {
                                if (prob > maxProb) {
                                    maxProb = prob;
                                    dominant = emotion;
                                }
                            }
                            
                            // Only update if confidence is somewhat high to avoid noise
                            if (maxProb > 0.4) {
                                setFaceEmotion(dominant);
                                emotionsMap.current[dominant] = (emotionsMap.current[dominant] || 0) + 1;
                            }
                        }
                    }, 3000); // Analyze every 3s to prevent extreme UI lag
                }
                
            } catch (e) {
                console.warn("Speech start error:", e);
            } finally {
                isStarting.current = false;
            }
        }
    }

    const UpdateUserAnswer = async (fillerTotal = 0) => {
        if (!userAnswer || userAnswer.length <= 10) return;

        setLoading(true);
        try {
            const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}
User Answer: ${userAnswer}
Based on the question and user answer, provide a rating out of 10 and feedback for improvement in 3-5 lines.
Return ONLY a JSON object with "rating" (number) and "feedback" (string) fields.`;

            const result = await sendMessage(feedbackPrompt);
            
            // Robust JSON extraction
            const jsonMatch = result.match(/\{[\s\S]*\}/);
            if (!jsonMatch) throw new Error("No JSON found in AI response");
            const JsonFeedbackResp = JSON.parse(jsonMatch[0]);
            
            // Calculate Dominant Emotion
            let overallEmotion = 'Neutral';
            if (Object.keys(emotionsMap.current).length > 0) {
                overallEmotion = Object.keys(emotionsMap.current).reduce((a, b) => emotionsMap.current[a] > emotionsMap.current[b] ? a : b);
            }
            
            // Calculate Speaking Pace (WPM)
            let wpm = 0;
            if (recordingStartTime.current) {
                const durationMinutes = (Date.now() - recordingStartTime.current) / 60000;
                const wordCount = userAnswer.trim().split(/\s+/).length;
                if (durationMinutes > 0) {
                    wpm = Math.round(wordCount / durationMinutes);
                }
            }

            const resp = await saveUserAnswer({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAns: userAnswer,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-yyyy'),
                fillerCount: fillerTotal,
                userEmotion: overallEmotion,
                speakingPace: wpm.toString(),
            });

            if (resp) {
                toast.success('Answer recorded ✅');
            } else {
                toast.error('Failed to save. Please try again.');
                hasSaved.current = false;
            }
        } catch (err) {
            console.error("Error:", err);
            toast.error('Error generating feedback. Please try again.');
            hasSaved.current = false;
        } finally {
            setLoading(false);
        }
    }

    const quality = fillerResult ? speechQualityScore(userAnswer, fillerResult.total) : null;

    return (
        <div className='flex items-center justify-center flex-col'>
            {/* Webcam */}
            <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5 relative overflow-hidden'>
                <Image src={'/webcam.png'} width={200} height={200} alt="Webcam placeholder" className='absolute opacity-50' />
                <Webcam
                    ref={webcamRef}
                    mirrored={true}
                    style={{ height: 300, width: '100%', zIndex: 10, objectFit: 'cover' }}
                />
                
                {/* Visual Facial Tracking indicator */}
                {isRecording && modelsLoaded && (
                    <div className="absolute top-4 right-4 z-20 flex gap-2 items-center bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs text-emerald-400 font-mono font-medium drop-shadow-md tracking-wider uppercase">
                            AI Tracker
                        </span>
                        {faceEmotion && (
                            <span className="text-xs text-white bg-white/20 px-2 py-0.5 rounded-md ml-1 capitalize">
                                {faceEmotion}
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Live transcript */}
            {isRecording && userAnswer && (
                <div className="mt-4 w-full max-w-md mx-auto p-3 rounded-xl border border-blue-500/20 bg-blue-500/5">
                    <div className="flex items-center gap-2 mb-1">
                        <Volume2 className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                        <span className="text-xs text-blue-400 font-medium">Live transcription</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{userAnswer}</p>
                </div>
            )}

            {/* Filler Word Results */}
            {fillerResult && !isRecording && (
                <FillerBadge total={fillerResult.total} found={fillerResult.found} />
            )}

            {/* Speech quality badge */}
            {quality && !isRecording && (
                <div className="mt-2 flex items-center gap-2 text-sm">
                    <span className="text-slate-500">Speech Quality:</span>
                    <span className={`font-bold ${quality.color}`}>{quality.label}</span>
                </div>
            )}

            {/* Record Button */}
            <Button
                disabled={loading}
                variant="outline"
                className="my-10 h-14 min-w-[180px] rounded-xl border-white/10 hover:bg-white/5"
                onClick={StartStopRecording}
            >
                {loading ? (
                    <span className='text-violet-400 flex gap-2 items-center font-semibold'>
                        <div className="w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full animate-spin"></div>
                        Saving Answer...
                    </span>
                ) : isRecording ? (
                    <span className='text-red-600 animate-pulse flex gap-2 items-center'>
                        <StopCircle /> Stop Recording
                    </span>
                ) : (
                    <span className='text-primary flex gap-2 items-center'>
                        <Mic /> Record Answer
                    </span>
                )}
            </Button>
        </div>
    )
}

export default RecordAnswerSection
