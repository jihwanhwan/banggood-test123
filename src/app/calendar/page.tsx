import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Bell } from 'lucide-react';

export default function CalendarPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div>
          <div className="text-[#0050FF] font-black text-xs uppercase tracking-widest mb-2 font-sans">Announcement Schedule</div>
          <h1 className="text-4xl font-black tracking-tight mb-4">공고 캘린더</h1>
          <p className="text-gray-500 font-medium font-sans">이번 달에 예정된 모든 공공임대 공고 일정을 한눈에 확인하세요.</p>
        </div>
        <div className="flex items-center gap-4 bg-[#F2F2F7] p-2 rounded-2xl">
           <button className="p-3 hover:bg-white rounded-xl transition-all"><ChevronLeft size={20} /></button>
           <span className="font-black text-xl px-4">2024. 05</span>
           <button className="p-3 hover:bg-white rounded-xl transition-all"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-2xl shadow-gray-200/50 p-8">
        <div className="grid grid-cols-7 gap-4">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <div key={day} className="text-center py-4 text-[10px] font-black text-gray-400 tracking-widest">{day}</div>
          ))}
          {Array.from({ length: 31 }).map((_, i) => (
            <div key={i} className="aspect-square border border-gray-50 rounded-2xl p-4 hover:bg-[#F2F2F7] transition-colors cursor-pointer group">
              <span className="font-bold text-gray-400 group-hover:text-[#0050FF]">{i + 1}</span>
              {i === 11 && (
                <div className="mt-2 p-2 bg-[#0050FF] text-white text-[10px] font-black rounded-lg shadow-lg shadow-[#0050FF]/25">
                  LH 강남 브리즈힐
                </div>
              )}
              {i === 17 && (
                <div className="mt-2 p-2 bg-orange-500 text-white text-[10px] font-black rounded-lg">
                  SH 장기전세 1차
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 p-8 bg-[#F2F2F7] rounded-[32px] flex items-center justify-between">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#0050FF] shadow-sm">
               <Bell size={24} />
            </div>
            <div>
               <p className="font-bold">원하는 공고 일정을 놓치고 싶지 않다면?</p>
               <p className="text-xs text-gray-500">관심 지역 공고 알림 신청을 해보세요.</p>
            </div>
         </div>
         <button className="bg-[#0050FF] text-white px-8 py-3 rounded-xl font-black text-sm">알림 설정하기</button>
      </div>
    </div>
  );
}
