"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  Play,
  Brain,
  Target,
  BarChart3,
  Mic,
  Star,
  Check,
  Building2,
  Rocket,
  Users,
  Globe,
  ChevronRight,
  Trophy,
  Clock,
  TrendingUp,
  GraduationCap,
  Flame,
  BookOpen,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-violet-400" />,
      title: "AI-Generated Questions",
      description: "Questions tailored to your exact role, tech stack, and experience — exactly what TCS NQT, Amazon, and Google ask final year students.",
      color: "from-violet-500/10 to-violet-500/5",
      border: "hover:border-violet-500/50",
    },
    {
      icon: <Mic className="w-6 h-6 text-blue-400" />,
      title: "Voice Recording + Transcript",
      description: "Speak your answer naturally. Our AI records, transcribes, and analyzes your response for clarity, depth, and confidence.",
      color: "from-blue-500/10 to-blue-500/5",
      border: "hover:border-blue-500/50",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
      title: "Instant AI Feedback",
      description: "Get a 1-10 rating with specific feedback on what was strong, what was missing, and exactly how to improve for the real interview.",
      color: "from-emerald-500/10 to-emerald-500/5",
      border: "hover:border-emerald-500/50",
    },
    {
      icon: <Target className="w-6 h-6 text-orange-400" />,
      title: "Company-Specific Prep",
      description: "Practice with questions curated for Google, Amazon, TCS, Infosys, Microsoft, and 20+ companies that visit campuses every year.",
      color: "from-orange-500/10 to-orange-500/5",
      border: "hover:border-orange-500/50",
    },
  ];

  const steps = [
    {
      title: "Pick Your Target Company",
      desc: "Choose from 20+ companies visiting your campus — Google, TCS, Infosys, Amazon, Cognizant, and more.",
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      title: "Start AI Mock Interview",
      desc: "Answer 5 AI-generated questions specific to that company's interview style using voice recording.",
      icon: <Mic className="w-6 h-6" />,
    },
    {
      title: "Get Instant Report",
      desc: "See your rating, detailed feedback, ideal answers, and what keywords you missed for every question.",
      icon: <BarChart3 className="w-6 h-6" />,
    },
    {
      title: "Improve & Ace It",
      desc: "Retake until your scores improve. Track your progress over time and walk in fully confident.",
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  const plans = [
    {
      name: "Student Free",
      price: "₹0",
      desc: "Start practising today. No credit card needed.",
      color: "border-slate-700",
      cta: "Start Free",
      ctaStyle: "border border-slate-600 text-white hover:bg-slate-800",
      features: [
        "3 Mock Interviews / month",
        "5 Questions per interview",
        "AI Feedback + Rating",
        "Voice transcript",
        "Basic performance report",
      ],
    },
    {
      name: "Student Pro",
      price: "₹299",
      period: "/month",
      desc: "Serious about placements? Go all in.",
      color: "border-violet-500",
      popular: true,
      cta: "Get Student Pro",
      ctaStyle: "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:opacity-90",
      features: [
        "Unlimited Mock Interviews",
        "All company question packs",
        "Filler word detector",
        "Ideal answer comparison",
        "Progress dashboard",
        "Daily streak & badges",
        "Leaderboard ranking",
        "Priority support",
      ],
    },
    {
      name: "College License",
      price: "Custom",
      desc: "For placement cells, training & development teams.",
      color: "border-slate-700",
      cta: "Contact Us",
      ctaStyle: "border border-slate-600 text-white hover:bg-slate-800",
      features: [
        "Everything in Student Pro",
        "Bulk student accounts",
        "Placement coordinator dashboard",
        "College leaderboard",
        "Custom company packs",
        "Dedicated support",
      ],
    },
  ];

  const testimonials = [
    {
      name: "Rahul Verma",
      role: "Placed @ Google · IIT Bombay CSE '25",
      avatar: "https://i.pravatar.cc/100?u=rahul25",
      content: "Did 30+ mock interviews on this platform before my Google on-campus. The AI feedback told me exactly where I was vague. Got the offer in the very first attempt.",
      rating: 5,
      badge: "🎓 IIT Bombay",
    },
    {
      name: "Priya Deshmukh",
      role: "Placed @ TCS Digital · VIT Vellore CSE '25",
      avatar: "https://i.pravatar.cc/100?u=priya25",
      content: "I was super nervous about the TCS Digital round. The company-specific practice here is exactly what they asked. Cleared all 3 rounds on the first try!",
      rating: 5,
      badge: "🎓 VIT Vellore",
    },
    {
      name: "Aman Singh",
      role: "Placed @ Amazon SDE-1 · NIT Trichy CSE '25",
      avatar: "https://i.pravatar.cc/100?u=aman25",
      content: "The filler word detector was eye-opening. I said 'basically' 14 times in one answer 😅. Fixed it in 3 days of practice. Amazon interviewer actually complimented my clarity.",
      rating: 5,
      badge: "🎓 NIT Trichy",
    },
  ];

  const stats = [
    { value: "15,000+", label: "CS Students Placed", icon: <GraduationCap className="w-5 h-5 text-violet-400" /> },
    { value: "94%", label: "Placement Rate", icon: <TrendingUp className="w-5 h-5 text-emerald-400" /> },
    { value: "50+", label: "Companies Covered", icon: <Building2 className="w-5 h-5 text-blue-400" /> },
    { value: "4.9★", label: "Student Rating", icon: <Star className="w-5 h-5 text-yellow-400" /> },
  ];

  const colleges = [
    "IIT Bombay", "IIT Delhi", "NIT Trichy", "VIT Vellore",
    "BITS Pilani", "SRM Chennai", "Manipal", "IIIT Hyderabad"
  ];

  const companies = [
    { name: "Google", color: "from-blue-500/20 to-blue-600/10", border: "border-blue-500/30", text: "text-blue-400" },
    { name: "Amazon", color: "from-orange-500/20 to-orange-600/10", border: "border-orange-500/30", text: "text-orange-400" },
    { name: "Microsoft", color: "from-cyan-500/20 to-cyan-600/10", border: "border-cyan-500/30", text: "text-cyan-400" },
    { name: "TCS", color: "from-blue-600/20 to-indigo-600/10", border: "border-indigo-500/30", text: "text-indigo-400" },
    { name: "Infosys", color: "from-violet-500/20 to-violet-600/10", border: "border-violet-500/30", text: "text-violet-400" },
    { name: "Wipro", color: "from-purple-500/20 to-purple-600/10", border: "border-purple-500/30", text: "text-purple-400" },
    { name: "Cognizant", color: "from-blue-400/20 to-blue-500/10", border: "border-blue-400/30", text: "text-blue-300" },
    { name: "Razorpay", color: "from-emerald-500/20 to-emerald-600/10", border: "border-emerald-500/30", text: "text-emerald-400" },
  ];

  return (
    <div className="min-h-screen bg-[#050814] text-slate-50" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
      {/* Ambient BG */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-violet-700/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-700/10 blur-[140px] rounded-full" />
      </div>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#050814]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">PrepAI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">How it Works</a>
            <a href="#companies" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Companies</a>
            <a href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors px-4 py-2">
                Sign In
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:opacity-90 transition-opacity shadow-lg shadow-violet-600/30">
                Start Free →
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* ── HERO ── */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div
                className="flex-1 text-center lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-sm font-medium mb-8">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Built for Final Year CS Students · Campus Placements 2025
                </div>

                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-7">
                  Ace Your <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-blue-400 to-violet-400"
                    style={{ backgroundSize: '200%', animation: 'gradient 8s linear infinite' }}>
                    Campus Placements
                  </span>
                  <br /> with AI
                </h1>

                <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  The #1 AI mock interview platform for engineering students. Practice with real company questions, get instant AI feedback, and walk into your dream company fully prepared.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link href="/dashboard">
                    <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-base font-semibold hover:opacity-90 transition-all shadow-2xl shadow-violet-600/30">
                      Start Practising Free <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                  <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white text-base font-semibold hover:bg-white/5 transition-all">
                    <Play className="w-4 h-4 fill-current" /> Watch Demo
                  </button>
                </div>

                <div className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
                  <div className="flex -space-x-2.5">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050814] overflow-hidden">
                        <Image src={`https://i.pravatar.cc/100?u=cs${i}`} alt="Student" width={32} height={32} />
                      </div>
                    ))}
                  </div>
                  <span><strong className="text-slate-300">15,000+</strong> students placed via PrepAI</span>
                </div>

                {/* Trust badges */}
                <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  {["✅ Free to start", "🎓 Student-focused", "🔒 No video stored", "⚡ Instant feedback"].map((b, i) => (
                    <span key={i} className="text-xs text-slate-400 px-3 py-1.5 rounded-full border border-white/8 bg-white/3">
                      {b}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="flex-1 w-full relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-violet-600/20 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm shadow-2xl">
                  <Image
                    src="/hero.png"
                    alt="AI Mock Interview"
                    width={800}
                    height={550}
                    priority
                    className="rounded-xl w-full"
                  />
                  {/* Floating result card */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#050814]/90 border border-white/10 rounded-xl backdrop-blur-md flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">🎉 Rahul just got placed @ Google</p>
                      <p className="text-xs text-slate-400">After 21 mock interviews · Rating improved from 4.2 → 8.9</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── COLLEGE LOGOS ── */}
        <section className="py-10 border-y border-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-slate-500 text-sm mb-8">Students from top engineering colleges trust PrepAI</p>
            <div className="flex flex-wrap justify-center gap-4">
              {colleges.map((c, i) => (
                <div key={i} className="px-5 py-2 rounded-full border border-white/10 bg-white/3 text-slate-400 text-sm font-medium">
                  🎓 {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-center mb-2">{s.icon}</div>
                  <p className="text-3xl font-bold text-white">{s.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMPANIES ── */}
        <section id="companies" className="py-28 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/5 text-orange-400 text-sm font-medium mb-6">
                <Building2 className="w-3.5 h-3.5" /> Company Packs
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Practice for <span className="text-orange-400">Your Dream Company</span></h2>
              <p className="text-slate-400 max-w-xl mx-auto">Question packs built from real interview experiences shared by placed students at each company.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {companies.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className={`p-5 rounded-2xl border ${c.border} bg-gradient-to-b ${c.color} cursor-pointer hover:scale-105 transition-transform text-center group`}
                >
                  <p className={`text-xl font-bold ${c.text} mb-1`}>{c.name}</p>
                  <p className="text-xs text-slate-500">Interview Pack</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs text-slate-400 group-hover:text-white transition-colors">
                    Practise now <ChevronRight className="w-3 h-3" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="py-28 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-sm font-medium mb-6">
                <Zap className="w-3.5 h-3.5" /> Features Designed for Placements
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Everything You Need to <span className="text-blue-400">Get Placed</span></h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-2xl border border-white/8 bg-gradient-to-b ${f.color} ${f.border} transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-5">
                    {f.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="py-28 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-sm font-medium mb-6">
                <Clock className="w-3.5 h-3.5" /> How it Works
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">From Nervous to <span className="text-emerald-400">Confident</span> in Days</h2>
              <p className="text-slate-400 max-w-xl mx-auto">A simple 4-step process used by 15,000+ students to crack placements.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-violet-500/30 via-blue-500/30 to-emerald-500/30" />
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-600/20 to-blue-600/20 border border-white/10 flex items-center justify-center relative z-10">
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-blue-600 text-[10px] font-bold text-white flex items-center justify-center">{i + 1}</span>
                    <div className="text-violet-400">{s.icon}</div>
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-white">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-14 text-center">
              <Link href="/dashboard">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-base font-semibold hover:opacity-90 transition-all shadow-2xl shadow-violet-600/25">
                  Try Your First Mock Interview Free <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-28 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/5 text-yellow-400 text-sm font-medium mb-6">
                <Trophy className="w-3.5 h-3.5" /> Student Success Stories
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Real Students, <span className="text-yellow-400">Real Offers</span></h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl border border-white/8 bg-white/3 hover:border-white/15 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {Array(t.rating).fill(0).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400">{t.badge}</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                      <Image src={t.avatar} alt={t.name} width={40} height={40} />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="py-28 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-400 text-sm font-medium mb-6">
                <Rocket className="w-3.5 h-3.5" /> Pricing for Students
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">Student-First <span className="text-violet-400">Pricing</span></h2>
              <p className="text-slate-400 max-w-xl mx-auto">Start free. Upgrade only if you want unlimited practice + advanced features.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 items-stretch">
              {plans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col p-8 rounded-2xl border ${plan.color} ${plan.popular ? 'bg-gradient-to-b from-violet-600/10 to-blue-600/5' : 'bg-white/2'}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold shadow-lg">
                        🔥 MOST POPULAR
                      </div>
                    </div>
                  )}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{plan.desc}</p>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                      {plan.period && <span className="text-slate-400 mb-1">{plan.period}</span>}
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${plan.ctaStyle}`}>
                    {plan.cta}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-28 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm">
                <Flame className="w-3.5 h-3.5" /> Placement season is NOW. Don't wait.
              </div>
              <h2 className="text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                Your dream company is<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-blue-400">one interview away.</span>
              </h2>
              <p className="text-slate-400 text-xl mb-12">Join 15,000+ students who used PrepAI to prepare smarter and get placed faster.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link href="/dashboard">
                  <button className="inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-lg font-semibold hover:opacity-90 transition-all shadow-2xl shadow-violet-600/30">
                    Start Free Today <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <p className="text-slate-500 text-sm">₹0 to start · No credit card · Cancel anytime</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">PrepAI</span>
          </div>
          <p className="text-slate-500 text-sm">© 2025 PrepAI. Built for students, by students.</p>
          <div className="flex gap-8 text-slate-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
