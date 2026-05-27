"use client";
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 'email') setStep('code');
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-gray-200/50"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-[22px] flex items-center justify-center text-white font-black text-2xl mx-auto mb-6 shadow-xl shadow-primary/20">
            D
          </div>
          <h1 className="text-2xl font-black tracking-tight mb-2">내집다오 시작하기</h1>
          <p className="text-gray-500 text-sm font-medium">가장 빠른 임대주택 정보, 지금 바로 가입하세요.</p>
        </div>

        <div className="space-y-3 mb-10">
          <button className="w-full flex items-center justify-center gap-3 py-4 bg-[#FEE500] text-[#3c1e1e] font-bold rounded-2xl hover:bg-[#FADC00] transition-all relative">
            카카오로 시작하기
          </button>
          <button className="w-full flex items-center justify-center gap-3 py-4 bg-[#FFFFFF] text-gray-700 font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all relative">
            구글로 시작하기
          </button>
        </div>

        <div className="flex items-center gap-4 mb-10">
           <div className="flex-1 h-[1px] bg-gray-100"></div>
           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">or email</span>
           <div className="flex-1 h-[1px] bg-gray-100"></div>
        </div>

        <form onSubmit={handleNext} className="space-y-6">
          {step === 'email' ? (
            <div className="space-y-4">
              <label className="block text-xs font-black text-gray-400 uppercase tracking-wider px-1">E-mail Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-14 pr-6 py-4 bg-surface rounded-2xl border-none focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-gray-900 text-white flex items-center justify-center gap-2 py-4 rounded-2xl font-black hover:bg-black transition-all"
              >
                인증번호 받기
                <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-wider">Verification Code</label>
                <button type="button" onClick={() => setStep('email')} className="text-[10px] text-primary font-bold hover:underline">이메일 수정</button>
              </div>
              <div className="relative">
                <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-primary" size={20} />
                <input 
                  type="text" 
                  maxLength={6}
                  placeholder="0 0 0 0 0 0"
                  className="w-full pl-14 pr-6 py-4 bg-surface rounded-2xl border-none focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold text-center tracking-[0.5em]"
                />
              </div>
              <button 
                type="button"
                className="w-full bg-primary text-white flex items-center justify-center gap-2 py-4 rounded-2xl font-black shadow-xl shadow-primary/30 hover:bg-blue-600 transition-all"
              >
                로그인 완료
              </button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
