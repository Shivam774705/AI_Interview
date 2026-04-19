import React from 'react'
import Header from './_components/Header'

function DashboardLayout({ children }) {
  return (
    <div className='min-h-screen bg-[#050814] text-white'>
      {/* Ambient glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-700/8 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-700/8 blur-[140px] rounded-full" />
      </div>
      <Header />
      <div className='max-w-7xl mx-auto px-6 py-10'>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
