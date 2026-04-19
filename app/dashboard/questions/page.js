"use client"
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Code, Lightbulb, MessageCircle } from 'lucide-react'

const QUESTIONS_DATA = [
    {
        category: 'Frontend',
        icon: <Code className="w-4 h-4" />,
        questions: [
            {
                id: 1,
                diff: 'Medium',
                q: "What is the difference between Virtual DOM and Real DOM?",
                a: "Virtual DOM is a lightweight copy of the Real DOM. React uses it to improve performance by updating only the parts of the Actual DOM that have changed through a process called 'diffing' and 'reconciliation'."
            },
            {
                id: 2,
                diff: 'Hard',
                q: "Explain how React's UseEffect clean-up function works.",
                a: "The cleanup function runs before the component is unmounted or before the effect runs again (if dependencies change). It's used to clear timers, cancel network requests, or remove event listeners to prevent memory leaks."
            },
            {
                id: 3,
                diff: 'Easy',
                q: "What are the benefits of using CSS variables over preprocessor variables?",
                a: "CSS variables are native to the browser, which means they can be updated at runtime via JavaScript. They also enjoy better cascading behavior and can be changed within media queries."
            }
        ]
    },
    {
        category: 'Backend',
        icon: <Code className="w-4 h-4" />,
        questions: [
            {
                id: 4,
                diff: 'Hard',
                q: "What is horizontal scaling vs vertical scaling?",
                a: "Vertical scaling (Scaling Up) means adding more power (CPU, RAM) to an existing server. Horizontal scaling (Scaling Out) means adding more servers to your pool of resources, typically using a load balancer."
            },
            {
                id: 5,
                diff: 'Medium',
                q: "Explain the difference between SQL and NoSQL databases.",
                a: "SQL databases are relational and have a predefined schema, making them great for complex queries and transactional integrity. NoSQL databases are non-relational, have dynamic schemas, and are often easier to scale horizontally."
            }
        ]
    },
    {
        category: 'Behavioral',
        icon: <MessageCircle className="w-4 h-4" />,
        questions: [
            {
                id: 6,
                diff: 'Medium',
                q: "Describe a time you had a conflict with a team member.",
                a: "Focus on the STAR method (Situation, Task, Action, Result). Emphasize professional communication, seeking common ground, and the positive outcome of resolving the conflict for the project's success."
            },
            {
                id: 7,
                diff: 'Hard',
                q: "What is your biggest weakness?",
                a: "Choose a real but manageable weakness. Explain how you've identified it and what active steps you are taking to overcome it (e.g., 'I used to struggle with public speaking, so I joined a Toastmasters club')."
            }
        ]
    }
]

function QuestionsPage() {
    return (
        <div className="pb-20">
            {/* Header */}
            <div className='mb-12'>
                <h2 className='text-4xl font-black text-white tracking-tight mb-3'>Questions Library</h2>
                <p className='text-lg text-slate-400 font-medium'>Master these core questions frequently asked in top-tier interviews.</p>
            </div>

            {/* Search Bar Placeholder */}
            <div className='relative mb-10'>
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500' />
                <input 
                    type="text" 
                    placeholder="Search for a question..." 
                    className='w-full pl-12 pr-6 py-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md text-white placeholder:text-slate-600 focus:border-violet-500/50 outline-none transition-all'
                />
            </div>

            {/* Questions Grid */}
            <div className='space-y-12'>
                {QUESTIONS_DATA.map((cat, idx) => (
                    <div key={idx}>
                        <div className='flex items-center gap-3 mb-6'>
                            <div className='p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400'>
                                {cat.icon}
                            </div>
                            <h3 className='text-xl font-bold text-white'>{cat.category}</h3>
                            <div className='h-px flex-1 bg-white/5'></div>
                        </div>

                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {cat.questions.map((item) => (
                                <AccordionItem 
                                    key={item.id} 
                                    value={`item-${item.id}`} 
                                    className="border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-2xl px-6 py-2 overflow-hidden hover:bg-white/[0.04] transition-all"
                                >
                                    <AccordionTrigger className="hover:no-underline py-4">
                                        <div className="flex items-center gap-4 text-left">
                                            <Badge variant="outline" className={`shrink-0 ${item.diff === 'Hard' ? 'text-red-400 border-red-400/20 bg-red-400/5' : item.diff === 'Medium' ? 'text-yellow-400 border-yellow-400/20 bg-yellow-400/5' : 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5'}`}>
                                                {item.diff}
                                            </Badge>
                                            <span className="text-slate-200 font-semibold">{item.q}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-400 leading-relaxed pb-6 text-base">
                                        <div className='p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-200/80 mb-2'>
                                            <div className='flex items-center gap-2 mb-2'>
                                                <Lightbulb className='w-4 h-4 text-indigo-400' />
                                                <span className='text-xs font-bold uppercase tracking-wider text-indigo-400'>Ideal Answer</span>
                                            </div>
                                            {item.a}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className='mt-20 p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/10 to-blue-600/10 backdrop-blur-xl flex flex-col items-center text-center'>
                <h3 className='text-2xl font-bold text-white mb-4'>Ready to test your knowledge?</h3>
                <p className='text-slate-400 max-w-lg mb-8'>Start a simulated interview now and get real-time feedback on your verbal and facial expressions.</p>
                <button className='px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-black text-lg hover:scale-105 transition-all shadow-xl shadow-violet-500/20'>
                    🚀 Start Mock Interview
                </button>
            </div>
        </div>
    )
}

export default QuestionsPage
