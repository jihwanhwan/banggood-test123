import React, { useState, useEffect } from 'react';
import { FileText, Search, Download, ExternalLink, Filter } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const categories = ['전체', 'LH공사', 'SH공사', '지자체', '민간임대'];

const announcements = [
  { id: 535, region: '서울 강남', title: '장기전세 힐스테이트 동작 시그니처', type: '장기전세', status: '공고중', date: '2024.05.20', pdf: true, provider: 'SH공사' },
  { id: 534, region: '서울 마포', title: '장기전세 엘리프 미아역', type: '장기전세', status: '공고중', date: '2024.05.18', pdf: true, provider: 'SH공사' },
  { id: 533, region: '서울 동작', title: '장기전세 동작 보라매역 프리센트', type: '장기전세', status: '공고예정', date: '2024.05.15', pdf: false, provider: 'SH공사' },
  { id: 532, region: '서울 구로', title: '2026년 1차 청년안심주택 입주자 모집 (리마크빌 구로 등)', type: '청년안심', status: '접수마감', date: '2024.05.10', pdf: true, provider: '지자체' },
  { id: 531, region: '서울 송파', title: '2025년 하반기 신혼·신생아 매입임대주택 Ⅰ 입주대기자 모집', type: '매입임대', status: '공고중', date: '2024.05.05', pdf: true, provider: 'LH공사' },
  { id: 530, region: '서울 중랑', title: '해링턴플레이스 노원 센트럴', type: '장기전세', status: '접수마감', date: '2024.04.30', pdf: true, provider: 'LH공사' },
  { id: 529, region: '서울 동대문', title: '행복주택 이문3 복합공공청사', type: '행복주택', status: '접수마감', date: '2024.04.28', pdf: true, provider: 'LH공사' },
  { id: 528, region: '경기 파주', title: '파주 운정 민간임대 입주자 모집공고', type: '민간임대', status: '공고중', date: '2024.04.25', pdf: false, provider: '민간임대' },
  { id: 527, region: '인천 연수', title: '송도 힐스테이트 테라스 청년 민간임대', type: '민간임대', status: '공고예정', date: '2024.04.20', pdf: true, provider: '민간임대' },
];

export default function BoardPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const filteredAnnouncements = announcements.filter(post => {
    const matchesCategory = selectedCategory === '전체' || post.provider === selectedCategory;
    const matchesQuery = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage) || 1;
  const paginatedAnnouncements = filteredAnnouncements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div>
          <div className="text-[#0050FF] font-black text-xs uppercase tracking-widest mb-2 font-sans">Official Announcements</div>
          <h1 className="text-4xl font-black tracking-tight mb-4">공공임대 주택 모집공고</h1>
          <p className="text-gray-500 font-medium font-sans">LH, SH 및 전국의 공식 입주자 모집 공고문을 한곳에서 확인하세요.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
             <input 
               type="text" 
               placeholder="단지명 또는 지역 검색"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-12 pr-4 py-4 bg-[#F2F2F7] rounded-2xl border-none shadow-sm focus:ring-4 focus:ring-[#0050FF]/10 outline-none font-bold w-64 md:w-80"
             />
          </div>
          <button className="p-4 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-6 scrollbar-hide mb-8">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setSelectedCategory(cat)}
            className={`px-8 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all border-2 ${
              cat === selectedCategory 
                ? 'bg-[#0050FF] border-[#0050FF] text-white shadow-lg shadow-[#0050FF]/25' 
                : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-2xl shadow-gray-200/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F2F2F7]/50 border-b border-gray-100 italic">
                <th className="px-8 py-6 text-[11px] font-black uppercase text-gray-400 tracking-widest w-20">No</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase text-gray-400 tracking-widest w-32">Region</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase text-gray-400 tracking-widest">Title & Announcement</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase text-gray-400 tracking-widest w-32">Status</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase text-gray-400 tracking-widest w-32">Date</th>
                <th className="px-8 py-6 text-[11px] font-black uppercase text-gray-400 tracking-widest w-24">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedAnnouncements.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-12 text-center text-sm font-bold text-gray-400">
                    검색 결과 또는 해당하는 공고가 없습니다.
                  </td>
                </tr>
              ) : (
                paginatedAnnouncements.map((post) => (
                  <tr 
                    key={post.id} 
                    onClick={() => navigate(`/complex/${post.id}`)}
                    className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                  >
                    <td className="px-8 py-6 text-sm font-bold text-gray-300">{post.id}</td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-black text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {post.region}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="block">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-black text-[#0050FF] uppercase">{post.type}</span>
                          <span className="text-[10px] font-black text-gray-400">({post.provider})</span>
                          {post.pdf && <FileText className="text-red-400" size={14} />}
                        </div>
                        <p className="text-base font-bold text-gray-800 group-hover:text-[#0050FF] transition-colors underline-offset-4 decoration-[#0050FF]/30 group-hover:underline">
                          {post.title}
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-black px-3 py-1.5 rounded-full ${
                        post.status === '공고중' ? 'bg-blue-100 text-blue-600' :
                        post.status === '공고예정' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-gray-400 font-sans">
                      {post.date}
                    </td>
                    <td className="px-8 py-6 text-gray-300 hover:text-[#0050FF] transition-colors">
                       <ExternalLink size={18} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-10 border-t border-gray-50 flex items-center justify-center gap-2">
           {Array.from({ length: totalPages }).map((_, idx) => {
             const p = idx + 1;
             return (
                <button 
                 key={p}
                 onClick={() => setCurrentPage(p)}
                 className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                   p === currentPage 
                     ? 'bg-[#0050FF] text-white shadow-lg shadow-[#0050FF]/25' 
                     : 'text-gray-400 hover:bg-[#F2F2F7]'
                 }`}
                >
                  {p}
                </button>
             );
           })}
        </div>
      </div>
      
      <div className="mt-20 p-12 bg-gray-900 rounded-[48px] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
         <div className="relative z-10">
            <h3 className="text-3xl font-black mb-4">공고문 내용이 너무 어렵나요?</h3>
            <p className="text-gray-400 font-medium">내집다오 AI가 복잡한 PDF 공고문을 3줄로 요약해 드립니다.</p>
         </div>
         <button className="bg-white text-gray-900 px-10 py-5 rounded-3xl font-black text-lg hover:shadow-2xl hover:scale-105 transition-all relative z-10 flex items-center gap-3">
           <Download size={20} />
           공고문 요약봇 실행
         </button>
         <div className="absolute right-0 top-0 w-80 h-80 bg-[#0050FF]/20 rounded-full blur-[100px] -mr-40 -mt-40"></div>
      </div>
    </div>
  );
}
