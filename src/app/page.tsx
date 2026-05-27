import React from 'react';
import { Search as SearchIcon, MapPin, TrendingUp, ChevronRight, ClipboardCheck, Bell, Youtube, Map, Play, ArrowUpRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { motion } from "motion/react";
import appStyles from '../styles/App.module.css';

export default function Home() {
  return (
    <div className="flex flex-col w-full text-zinc-900">
      {/* 1. Banner (Hero) */}
      <section id="hero" className="relative h-[650px] w-full bg-[#0050FF] overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80" 
            alt="Hero Background"
            className="absolute inset-0 object-cover w-full h-full"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0050FF] via-[#0050FF]/80 to-transparent"></div>
        
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 w-full relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-widest mb-8">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
              전국 공공임대 실시간 매칭
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 border-l-8 border-white pl-8 leading-[1.05] tracking-tighter">
              내 청약 자격,<br />
              <span className="text-blue-200 italic">5초 만에</span><br />
              확인해보세요.
            </h1>
            <p className="text-xl text-white/70 mb-12 font-medium leading-relaxed max-w-lg">
              LH, SH, 전국의 모든 임대주택 공고를 실시간으로 수집하고,<br />
              종찬님께 딱 맞는 공고만 AI가 추천해 드립니다.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/diagnosis" className="bg-white text-[#0050FF] px-10 py-5 rounded-[24px] font-black text-lg hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2">
                내 자격 진단하기 <ArrowUpRight size={20} />
              </Link>
              <div className="flex items-center gap-4 px-6 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0050FF] bg-gray-200 overflow-hidden relative">
                        <img src={`https://picsum.photos/seed/${i}/100/100`} alt="User" className="absolute inset-0 object-cover w-full h-full" referrerPolicy="no-referrer" />
                     </div>
                   ))}
                </div>
                <span className="text-white/80 text-xs font-bold font-sans">지금 12,432명이 이용 중</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. 최근 주택 정보 (Recent Announcements) */}
      <section id="recent-announcements" className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <div className="text-[#0050FF] font-black text-xs uppercase tracking-widest mb-2 font-sans">Announcement</div>
              <h2 className="text-4xl font-black tracking-tight text-gray-900">최근 등록된 주택 공고</h2>
            </div>
            <Link to="/search" className="text-sm font-bold text-gray-400 hover:text-[#0050FF] flex items-center gap-1 transition-all">
              전체 공고 보러가기 <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 1, type: '국민임대', badge: '신규', title: 'LH 강남 브리즈힐', price: '7,200만/32만', loc: '강남구 자곡동' },
              { id: 2, type: '행복주택', badge: '마감임박', title: '마포 펜트라우스', price: '5,800만/25.2만', loc: '마포구 공덕동' },
              { id: 3, type: '국민임대', badge: '신규', title: '위례 포레스트', price: '6,500만/34만', loc: '하남시 위례동' },
              { id: 4, type: '장기전세', badge: '예비', title: '수서 역세권 A1단지', price: '전세 2.4억', loc: '강남구 수서동' },
            ].map((item) => (
              <Link 
                key={item.id}
                to={`/complex/${item.id}`}
                className="block"
              >
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-[#F2F2F7] rounded-[32px] p-2 border border-transparent hover:border-[#0050FF]/20 hover:bg-white hover:shadow-2xl transition-all cursor-pointer group h-full"
                >
                <div className="aspect-[4/5] bg-gray-100 rounded-[24px] relative overflow-hidden mb-6">
                   <div className="absolute top-4 left-4 z-10 flex gap-2">
                     <span className="bg-white text-gray-900 text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm">{item.type}</span>
                     {item.badge === '신규' ? (
                       <span className="bg-[#0050FF] text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm">NEW</span>
                     ) : (
                       <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm">마감임박</span>
                     )}
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                   <img 
                    src={`https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=400&h=500&sig=${item.id}`} 
                    alt={item.title}
                    className="absolute inset-0 object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="px-4 pb-4">
                  <p className="text-xs text-gray-400 font-bold mb-1 italic">{item.loc}</p>
                  <h4 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h4>
                  <div className="flex items-center justify-between">
                     <p className="text-lg font-black text-[#0050FF] font-sans">{item.price}</p>
                     <div className="w-8 h-8 rounded-full bg-[#F2F2F7] group-hover:bg-[#0050FF] group-hover:text-white flex items-center justify-center transition-all">
                        <ChevronRight size={18} />
                     </div>
                  </div>
                </div>
              </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 신청 자격 조건 유도 (CTA Diagnosis) */}
      <section id="diagnosis-cta" className="py-24 bg-[#F2F2F7]">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="bg-[#1C1C1E] rounded-[48px] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                  더 이상 공고문 붙잡고<br />
                  <span className="text-[#0050FF] italic">헤매지 마세요.</span>
                </h2>
                <p className="text-gray-400 text-lg font-medium leading-relaxed mb-12">
                  본인의 소득, 자산, 거주 조건을 입력하시면<br />
                  복잡한 공고문 대신 '나에게 맞는' 집들만 딱 골라서 드립니다.
                </p>
                <div className="space-y-6 mb-12">
                   {[
                     '전국 모든 임대 공고 기반 자격 판독',
                     '거주지 기반 당첨 가능성 & 가점제 계산',
                     '맞춤 공고 등록 시 카카오톡 즉시 알림'
                   ].map((text, i) => (
                     <div key={i} className="flex items-center gap-4">
                        <div className="w-6 h-6 bg-[#0050FF] rounded-full flex items-center justify-center text-white">
                           <Play size={10} fill="white" className="ml-0.5" />
                        </div>
                        <span className="font-bold text-sm text-white/80">{text}</span>
                     </div>
                   ))}
                </div>
                <Link to="/diagnosis" className="inline-flex items-center gap-3 bg-[#0050FF] text-white px-10 py-5 rounded-[24px] font-black text-xl hover:bg-blue-600 transition-all shadow-xl shadow-[#0050FF]/25">
                   자격 체크 시작하기 <ChevronRight size={24} />
                </Link>
              </div>
              
              <div className="relative group">
                 <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 backdrop-blur-md">
                   <div className="flex items-center gap-4 mb-10">
                     <div className="w-12 h-12 bg-[#0050FF] rounded-2xl flex items-center justify-center font-black">AI</div>
                     <div>
                       <p className="font-bold">당첨 분석 솔루션</p>
                       <p className="text-xs text-white/40">Real-time diagnosis</p>
                     </div>
                   </div>
                   <div className="space-y-6">
                      <div className="p-5 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-xs text-white/40 mb-2 font-bold uppercase tracking-wider">신청 가능 공고</p>
                        <p className="text-2xl font-black text-[#0050FF]">24건</p>
                      </div>
                      <div className="p-5 bg-[#0050FF]/20 rounded-2xl border border-[#0050FF]/30">
                        <p className="text-xs text-[#0050FF] font-black mb-2 uppercase tracking-wider">최대 당첨 확률</p>
                        <p className="text-2xl font-black text-white">82% <span className="text-xs font-medium text-white/60 ml-2">LH 강남 브리즈힐 기준</span></p>
                      </div>
                   </div>
                 </div>
                 {/* Decorative floatings */}
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0050FF]/20 rounded-full blur-3xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 지도 (Map Section) */}
      <section id="home-map" className="py-24 bg-white overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
             <div className="lg:col-span-2 order-2 lg:order-1">
                <div className="text-[#0050FF] font-black text-xs uppercase tracking-widest mb-2 font-sans">MAP View</div>
                <h2 className="text-4xl font-black mb-6 tracking-tight text-gray-900">공고를 지도로,<br />한눈에 펼쳐보세요</h2>
                <p className="text-gray-500 font-medium leading-relaxed mb-10">
                  내가 일하는 직장, 내가 공부하는 대학 근처에 어떤 임대주택이 있는지 
                  실제 출퇴근 시간을 지도 위에서 바로 확인할 수 있습니다.
                </p>
                <div className="flex flex-col gap-4 mb-12">
                   <div className="p-6 bg-[#F2F2F7] rounded-2xl border border-gray-100 flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#0050FF]">
                         <MapPin size={24} />
                      </div>
                      <p className="font-bold text-gray-700">실제 대중교통 이용 시간 계산</p>
                   </div>
                   <div className="p-6 bg-[#F2F2F7] rounded-2xl border border-gray-100 flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#0050FF]">
                         <Map size={24} />
                      </div>
                      <p className="font-bold text-gray-700">전매제한 및 의무거주 기간 표시</p>
                   </div>
                </div>
                <Link to="/search" className="inline-flex items-center gap-2 font-black text-[#0050FF] hover:gap-4 transition-all border-b-2 border-[#0050FF] pb-1">
                   공고 지도 열기 <ChevronRight size={20} />
                </Link>
             </div>

             <div className="lg:col-span-3 order-1 lg:order-2">
                <div className="relative aspect-[16/10] bg-[#F2F2F7] rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden group">
                   <img 
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80" 
                    alt="Map Background"
                    className="absolute inset-0 object-cover w-full h-full grayscale opacity-10"
                    referrerPolicy="no-referrer"
                   />
                   {/* Marker Simulators */}
                   <motion.div 
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute top-1/3 left-1/4 bg-[#0050FF] text-white p-4 rounded-[20px] shadow-xl font-black text-sm z-10"
                   >
                     LH 브리즈힐 <br /> <span className="text-[10px] text-white/60 font-bold tracking-widest">D-5</span>
                   </motion.div>
                   <motion.div 
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                    className="absolute top-1/2 left-2/3 bg-white text-gray-900 p-4 rounded-[20px] shadow-xl font-black text-sm z-10"
                   >
                     마포 펜트라우스 <br /> <span className="text-[10px] text-[#0050FF] font-bold tracking-widest">NEW</span>
                   </motion.div>

                   <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-white/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-center font-bold text-gray-400">데이터를 기반으로 실시간 갱신되는 반응형 지도</p>
                   </div>
                </div>
             </div>
           </div>
         </div>
      </section>

      {/* 5. SNS & YouTube */}
      <section id="social-media" className="py-24 bg-[#F2F2F7]">
         <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
               <div className="inline-flex items-center gap-2 mb-4">
                  <Youtube className="text-red-600" size={24} />
                  <span className="font-black tracking-widest uppercase text-xs">Internal Contents</span>
               </div>
               <h2 className="text-4xl font-black tracking-tight mb-4 text-gray-900">내집다오 프리미엄 영상</h2>
               <p className="text-gray-500 font-medium font-sans">유튜브 채널에서 단지 내부 VR 룸투어와 <br /> 전문가의 청약 꿀팁을 구독하세요.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[1, 2, 3].map(i => (
                 <div key={i} className="space-y-6 group cursor-pointer">
                    <div className="aspect-video bg-gray-200 rounded-[32px] relative overflow-hidden shadow-lg border border-white/20">
                       <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center z-10">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                             <Play size={24} fill="white" className="text-white ml-1" />
                          </div>
                       </div>
                       <img 
                        src={`https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600&h=337&sig=${i+10}`} 
                        alt="Video Thumbnail"
                        className="absolute inset-0 object-cover w-full h-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="px-2">
                       <h4 className="text-xl font-bold mb-2 group-hover:text-[#0050FF] transition-colors leading-tight text-gray-900">
                        {i === 1 ? '[VR 투어] 강남 브리즈힐 45A 확장형 내부 공개' : 
                         i === 2 ? '신혼부부 전형 당첨확률 40% 올리는 법' : 
                         '2026년 공공임대주택 캘린더 완전정복'}
                       </h4>
                       <p className="text-sm text-gray-500 font-medium">내집다오 공식 유튜브 · 조회수 {i * 1.2}만회</p>
                    </div>
                 </div>
               ))}
            </div>

            {/* SNS Banners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
               <div className="p-10 bg-indigo-600 rounded-[40px] text-white flex items-center justify-between group cursor-pointer shadow-xl shadow-indigo-200">
                  <div>
                    <p className="text-indigo-200 text-xs font-black uppercase tracking-widest mb-2">Instagram</p>
                    <h3 className="text-2xl font-black mb-2 tracking-tight">공고 요약 카드뉴스</h3>
                    <p className="text-indigo-100/60 text-sm font-medium">보기 쉽게 정리된 핵심 청약 정보</p>
                  </div>
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform">
                     <ChevronRight size={32} />
                  </div>
               </div>
               <div className="p-10 bg-black rounded-[40px] text-white flex items-center justify-between group cursor-pointer shadow-xl shadow-gray-200">
                  <div>
                    <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">Blog / Community</p>
                    <h3 className="text-2xl font-black mb-2 tracking-tight">실제 입주민 생생후기</h3>
                    <p className="text-gray-400 text-sm font-medium">관리비부터 층간소음 리얼 리뷰</p>
                  </div>
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center group-hover:-rotate-12 transition-transform">
                     <ChevronRight size={32} />
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
