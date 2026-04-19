"use client"
import React from 'react'
import { Check, Zap, Crown, Building2 } from 'lucide-react'

const PLANS = [
    {
        name: 'Free',
        price: '0',
        desc: 'Perfect for getting started and exploring the platform.',
        icon: <Zap className="w-6 h-6 text-slate-400" />,
        features: [
            '5 AI Mock Interviews / mo',
            'Basic Emotion Tracking',
            'Standard Feedback Report',
            'Community Support'
        ],
        cta: 'Current Plan',
        current: true
    },
    {
        name: 'Pro',
        price: '9',
        desc: 'Advanced features for serious job seekers and students.',
        icon: <Crown className="w-6 h-6 text-yellow-500" />,
        features: [
            'Unlimited AI Mock Interviews',
            'Detailed Emotion & Face Analysis',
            'Advanced WPM & Tone Tracking',
            'Custom Company-specific packs',
            'Priority Support',
            'Interview History History'
        ],
        cta: 'Upgrade to Pro',
        premium: true
    },
    {
        name: 'Academy',
        price: '49',
        desc: 'Built for universities and placement cells.',
        icon: <Building2 className="w-6 h-6 text-blue-400" />,
        features: [
            'Everything in Pro',
            'Admin Dashboard & Analytics',
            'Bulk User Management',
            'Custom Interview Templates',
            'API Access',
            'Dedicated Account Manager'
        ],
        cta: 'Contact Sales'
    }
]

function UpgradePage() {
    return (
        <div className="pb-20">
            {/* Header */}
            <div className='text-center mb-20'>
                <h2 className='text-5xl font-extrabold text-white tracking-tight mb-4'>Level up your career 🚀</h2>
                <p className='text-xl text-slate-400 font-medium max-w-2xl mx-auto italic font-serif'>
                    "The best way to predict the future is to create it." - Unlock premium tools to ace your next big interview.
                </p>
            </div>

            {/* Pricing Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {PLANS.map((plan, idx) => (
                    <div 
                        key={idx} 
                        className={`relative p-8 rounded-[2rem] border backdrop-blur-xl transition-all duration-500 overflow-hidden shadow-2xl ${
                            plan.premium 
                            ? 'bg-gradient-to-br from-violet-600/10 to-blue-600/10 border-violet-500/40 scale-105 z-10' 
                            : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'
                        }`}
                    >
                        {/* Premium Glow */}
                        {plan.premium && (
                            <div className='absolute -top-24 -right-24 w-48 h-48 bg-violet-600/20 blur-[60px] rounded-full pointer-events-none' />
                        )}
                        
                        {/* Current Plan Badge */}
                        {plan.current && (
                            <div className='absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-400'>
                                Current
                            </div>
                        )}

                        <div className='mb-8'>
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg ${plan.premium ? 'bg-violet-600 text-white' : 'bg-white/5 border border-white/10'}`}>
                                {plan.icon}
                            </div>
                            <h3 className='text-2xl font-black text-white mb-2'>{plan.name}</h3>
                            <p className='text-sm text-slate-500 font-medium h-10 line-clamp-2'>{plan.desc}</p>
                        </div>

                        <div className='flex items-baseline gap-1 mb-8'>
                            <span className='text-4xl font-black text-white'>${plan.price}</span>
                            <span className='text-slate-500 font-bold'>/ month</span>
                        </div>

                        <ul className='space-y-4 mb-10'>
                            {plan.features.map((feature, fIdx) => (
                                <li key={fIdx} className='flex items-start gap-3'>
                                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.premium ? 'bg-violet-500/20 text-violet-400' : 'bg-white/5 text-slate-500'}`}>
                                        <Check className='w-3 h-3' />
                                    </div>
                                    <span className='text-sm text-slate-300 font-medium leading-tight'>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button className={`w-full py-4 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 ${
                            plan.premium 
                            ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:shadow-violet-500/30' 
                            : plan.current 
                            ? 'bg-white/5 text-slate-500 cursor-not-allowed'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}>
                            {plan.cta}
                        </button>
                    </div>
                ))}
            </div>

            {/* Comparison Table Link Placeholder */}
            <div className='mt-20 text-center'>
                <p className='text-slate-500 text-sm font-bold uppercase tracking-widest'>Trust by 10,000+ candidates worldwide</p>
                <div className='flex flex-wrap justify-center items-center gap-12 mt-8 opacity-20 filter grayscale'>
                    {/* Just placeholders for logos */}
                    <span className='text-2xl font-black italic'>GOOGLE</span>
                    <span className='text-2xl font-black italic'>META</span>
                    <span className='text-2xl font-black italic'>AMAZON</span>
                    <span className='text-2xl font-black italic'>TESLA</span>
                </div>
            </div>
        </div>
    )
}

export default UpgradePage
