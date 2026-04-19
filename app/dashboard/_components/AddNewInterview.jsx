"use client"
import React, { useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { sendMessage } from '@/utils/GeminiAIModal'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { saveMockInterview } from '@/utils/actions'
import { useRouter } from 'next/navigation'
import { COMPANY_DATA } from '@/utils/companies'

function AddNewInterview({ children, initialCompany = "", initialRole = "", initialDesc = "" }) {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobPosition, setJobPosition] = useState(initialRole);
    const [jobDesc, setJobDesc] = useState(initialDesc);
    const [jobExperience, setJobExperience] = useState();
    const [targetCompany, setTargetCompany] = useState(initialCompany);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const router = useRouter();

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        const companyContext = targetCompany ? `Target Company: ${targetCompany}. Structure the questions specifically reflecting exactly how this company conducts their interviews (e.g. if Amazon, include Leadership Principles, if Google, focus on their specific technical depth).` : "";

        const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}. ${companyContext} Depends on Job Position, Job Description & Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview questions along with answers in JSON format. Return a JSON object with a key "questions" that is an array. Each item must have a "question" field and an "answer" field.`

        const result = await sendMessage(InputPrompt);

        if (result) {
            const resp = await saveMockInterview({
                mockId: uuidv4(),
                jsonMockResp: result,
                jobPosition: targetCompany ? `${targetCompany} - ${jobPosition}` : jobPosition,
                jobDesc: jobDesc,
                jobExperience: jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-yyyy')
            });

            console.log("Inserted ID:", resp)
            if (resp) {
                setOpenDialog(false);
                router.push('/dashboard/interview/' + resp[0]?.mockId)
            }
        }
        else {
            console.log("ERROR");
        }
        setLoading(false);
    }
    return (
        <div>
            <div onClick={() => setOpenDialog(true)}>
                {children ? children : (
                    <div className='h-[180px] flex flex-col items-center justify-center gap-3 border-2 border-dashed border-white/15 rounded-2xl bg-white/2 hover:border-violet-500/50 hover:bg-violet-500/5 cursor-pointer transition-all duration-200 group'>
                        <div className='w-12 h-12 rounded-xl bg-violet-500/15 flex items-center justify-center group-hover:scale-110 transition-transform'>
                            <span className='text-2xl text-violet-400 font-light leading-none'>+</span>
                        </div>
                        <div className='text-center'>
                            <p className='text-sm font-semibold text-white'>New Mock Interview</p>
                            <p className='text-xs text-slate-500 mt-0.5'>Click to get started</p>
                        </div>
                    </div>
                )}
            </div>
            <Dialog open={openDialog}>

                <DialogContent className="max-w-2xl bg-[#0a0f1e] border border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-white">Create Mock Interview</DialogTitle>
                        <p className="text-slate-400 text-sm mt-1">Add your job details and let AI generate personalized questions for you</p>
                    </DialogHeader>
                    <form onSubmit={onSubmit} className="mt-4 space-y-5">
                        <div className="relative">
                            <label className="text-sm font-medium text-slate-300 block mb-1.5">Target Company (Optional)</label>
                            <Input
                                placeholder="Ex. Google, TCS, HDFC Bank, Reliance..."
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500/50"
                                value={targetCompany}
                                onChange={(event) => {
                                    setTargetCompany(event.target.value);
                                    setShowSuggestions(true);
                                }}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            />
                            {/* Autocomplete Dropdown */}
                            {showSuggestions && (
                                <div className="absolute top-[100%] left-0 z-50 w-full mt-1 bg-[#0a0f1e] border border-white/10 rounded-xl shadow-2xl shadow-black max-h-56 overflow-y-auto">
                                    {COMPANY_DATA
                                        .filter(c => !targetCompany || c.name.toLowerCase().includes(targetCompany.toLowerCase()))
                                        .map((c, i) => (
                                            <div 
                                                key={i} 
                                                className="px-4 py-2.5 hover:bg-violet-500/15 cursor-pointer flex flex-col gap-0.5 border-b border-white/5 last:border-0"
                                                onMouseDown={(e) => {
                                                    e.preventDefault(); // Prevent input onBlur from firing first
                                                    setTargetCompany(c.name);
                                                    setJobPosition(c.role);
                                                    setJobDesc(c.desc);
                                                    setShowSuggestions(false);
                                                }}
                                            >
                                                <span className="text-sm font-medium text-violet-300">{c.name}</span>
                                                <span className="text-xs text-slate-500 line-clamp-1">{c.role} — {c.desc}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-slate-300 block mb-1.5">Job Role / Position</label>
                                <Input
                                    placeholder="Ex. SDE-1"
                                    required
                                    value={jobPosition || ""}
                                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500/50"
                                    onChange={(event) => setJobPosition(event.target.value)}
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-300 block mb-1.5">Years of Exp</label>
                                <Input
                                    placeholder="Ex. 0"
                                    type="number"
                                    max="50"
                                    required
                                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500/50"
                                    onChange={(event) => setJobExperience(event.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-300 block mb-1.5">Tech Stack / Job Description</label>
                            <Textarea
                                placeholder="Ex. React, Node.js, PostgreSQL, REST APIs..."
                                required
                                value={jobDesc || ""}
                                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-violet-500/50 min-h-[80px]"
                                onChange={(event) => setJobDesc(event.target.value)}
                            />
                        </div>
                        <div className='flex gap-3 justify-end pt-2'>
                            <Button type="button" variant="ghost"
                                className="text-slate-400 hover:text-white hover:bg-white/5"
                                onClick={() => setOpenDialog(false)}
                            >Cancel</Button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/20"
                            >
                                {loading ? (
                                    <><LoaderCircle className='animate-spin w-4 h-4' /> Generating questions…</>
                                ) : (
                                    '🚀 Start Interview'
                                )}
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview
