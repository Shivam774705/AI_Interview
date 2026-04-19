"use client"
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Sparkles, LayoutDashboard, BookOpen, Zap, HelpCircle } from 'lucide-react'

const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: '/dashboard/questions', label: 'Questions', icon: <BookOpen className="w-4 h-4" /> },
    { href: '/dashboard/upgrade', label: 'Upgrade', icon: <Zap className="w-4 h-4" /> },
    { href: '/dashboard/how', label: 'How it Works', icon: <HelpCircle className="w-4 h-4" /> },
];

function Header() {
    const path = usePathname();

    return (
        <div className='sticky top-0 z-50 border-b border-white/8 bg-[#050814]/90 backdrop-blur-xl'>
            <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                {/* Logo */}
                <Link href="/dashboard" className='flex items-center gap-2.5'>
                    <div className='w-9 h-9 bg-gradient-to-br from-violet-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30'>
                        <Sparkles className='w-5 h-5 text-white' />
                    </div>
                    <span className='font-bold text-lg text-white hidden md:block'>PrepAI</span>
                </Link>

                {/* Nav */}
                <ul className='hidden md:flex items-center gap-1'>
                    {navLinks.map(link => {
                        const active = path === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                        active
                                            ? 'bg-violet-500/15 text-violet-400 border border-violet-500/20'
                                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* User */}
                <div className='flex items-center gap-3'>
                    <div className='ring-2 ring-white/10 rounded-full'>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
