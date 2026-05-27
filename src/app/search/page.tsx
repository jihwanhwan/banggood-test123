"use client";
import React from 'react';
import { Filter, Search as SearchIcon, Map as MapIcon, SlidersHorizontal } from "lucide-react";
import { Link } from 'react-router-dom';

export default function SearchPage() {
  const mockResults = [
    { id: 1, name: 'LH 강남 브리즈힐 (국민임대)', location: '서울 강남구 자곡로 3길 22', complexes: '12개동 402세대', status: '공고중', distance: '1.2km' },
    { id: 2, name: '마포 펜트라우스 (행복주택)', location: '서울 마포구 백범로 205', complexes: '3개동 362세대', status: '접수마감', distance: '3.5km' },
    { id: 3, name: '위례 포레스트 (국민임대)', location: '경기도 하남시 위례대로 100', complexes: '15개동 1,200세대', status: '공고예정', distance: '4.1km' },
    { id: 4, name: '수서 역세권 A1단지 (장기전세)', location: '서울 강남구 수서동 730', complexes: '10개동 2,500세대', status: '공고중', distance: '1.8km' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-72px)] overflow-hidden">
      <header className="border-b border-gray-100 bg-white z-10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6 flex-1 max-w-4xl">
           <div className="relative flex-1">
             <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
               type="text" 
               defaultValue="강남구"
               className="w-full pl-11 pr-4 py-3 bg-surface rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
             />
           </div>
           
           <div className="flex items-center gap-2">
             <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">
               <SlidersHorizontal size={16} />
               임대 유형
             </button>
             <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">
               면적
             </button>
             <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">
               모집 상태
             </button>
           </div>
        </div>
        
        <Link to="/map" className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all">
          <MapIcon size={16} />
          지도로 보기
        </Link>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-full max-w-md border-r border-gray-100 bg-white overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-lg">결과 128건</h2>
            <select className="text-xs text-gray-500 bg-transparent outline-none">
              <option>추천순</option>
              <option>거리순</option>
              <option>공고일순</option>
            </select>
          </div>

          <div className="space-y-4">
            {mockResults.map(item => (
              <Link key={item.id} to={`/complex/${item.id}`} className="block">
                <div className="p-4 border border-gray-100 rounded-2xl hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === '공고중' ? 'bg-blue-100 text-blue-600' : 
                      item.status === '접수마감' ? 'bg-gray-100 text-gray-500' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">현재지에서 {item.distance}</span>
                  </div>
                  <h3 className="font-bold text-[#1C1C1E] group-hover:text-primary transition-colors">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-3 line-clamp-1">{item.location}</p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-600 font-medium">
                    <span>{item.complexes}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>6,231명 관심</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </aside>

        <main className="flex-1 bg-surface relative overflow-hidden">
           <div className="absolute inset-0 opacity-10" style={{ 
             backgroundImage: 'radial-gradient(#1C1C1E 0.5px, transparent 0.5px)', 
             backgroundSize: '24px 24px' 
           }}></div>
           
           <div className="absolute top-1/4 left-1/3">
             <div className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg relative after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-primary">
               Breeze Hill
             </div>
           </div>
           
           <div className="absolute top-1/2 left-2/3">
             <div className="bg-white text-gray-700 text-[10px] font-bold px-2 py-1 rounded shadow-lg relative after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-white">
               2,500
             </div>
           </div>

           <div className="absolute right-6 bottom-6 flex flex-col gap-2">
             <button className="w-10 h-10 bg-white border border-gray-100 rounded-xl shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-50">
               +
             </button>
             <button className="w-10 h-10 bg-white border border-gray-100 rounded-xl shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-50">
               -
             </button>
           </div>
        </main>
      </div>
    </div>
  );
}
