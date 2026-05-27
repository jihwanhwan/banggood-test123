"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Award, DollarSign, MapPin, Home, Star, Send, ChevronRight, Info, Check, Sparkles, BellRing, Settings } from "lucide-react";
import { Link } from 'react-router-dom';

// 더 다양한 실시간 매칭용 임대 단지 데이터베이스 확장
const complexesDatabase = [
  {
    id: 1,
    name: 'LH 강남 브리즈힐 (국민임대)',
    loc: '서울 강남구 자곡로 3길 22',
    price: '보증금 7,200만 / 월 32만',
    type: '아파트',
    contract: '월세',
    grade: '적합도 98%',
    matchReason: '희망 지역(강남구)과 선호 유형(아파트)에 정밀 부합하며 청년 전형 우선공급 가점으로 당첨 우세권입니다.'
  },
  {
    id: 2,
    name: '마포 펜트라우스 (행복주택)',
    loc: '서울 마포구 백범로 205',
    price: '보증금 5,800만 / 월 25.2만',
    type: '아파트',
    contract: '월세',
    grade: '적합도 92%',
    matchReason: '마포구 우선순위 반영. 직주근접성이 뛰어나며 단지 우선 소득 완화 전형의 당첨 유망권에 배치됩니다.'
  },
  {
    id: 3,
    name: '위례 포레스트 (국민임대)',
    loc: '경기도 하남시 위례대로 100',
    price: '보증금 6,500만 / 월 34만',
    type: '아파트',
    contract: '월세',
    grade: '적합도 90%',
    matchReason: '위례신도시 중심지 숲세권 아파트. 합산 소득 및 청장년 우대 점수로 가점 통과율이 높습니다.'
  },
  {
    id: 4,
    name: '수서 역세권 A1단지 (장기전세)',
    loc: '서울 강남구 수서동 730',
    price: '전세 24,000만',
    type: '아파트',
    contract: '전세',
    grade: '적합도 95%',
    matchReason: '자산 및 세전 소득 범위 내에서 장기전세 1순위 자격을 원활히 확보 가능한 SRT 명품 역세권 단지입니다.'
  },
  {
    id: 5,
    name: '성동 청년 안심 주택 (특별공급)',
    loc: '서울 성동구 성수동2가 300',
    price: '보증금 8,500만 / 월 39만',
    type: '빌라/다세대',
    contract: '월세',
    grade: '적합도 89%',
    matchReason: '성동구 역세권 청년 특별전형 맞춤 매칭. 추첨제 100% 규정에 따라 무주택 가점이 낮아도 노릴 만합니다.'
  },
  {
    id: 6,
    name: '동작 상도 상상타운',
    loc: '서울 동작구 상도동 154',
    price: '전세 16,500만',
    type: '빌라/다세대',
    contract: '전세',
    grade: '적합도 88%',
    matchReason: '합산 자격 제한 통과율이 높고, 동작구 내에 조용한 역세권 신축급 다세대 복합 단지입니다.'
  },
  {
    id: 7,
    name: '여의도 샛강역 헤리티지',
    loc: '서울 영등포구 여의도동 88',
    price: '전세 31,000만',
    type: '아파트',
    contract: '전세',
    grade: '적합도 94%',
    matchReason: '여의도 출퇴근이 용이하며 고연봉 1인 가구 특별 소득 완화형 공모에 적격 판정되었습니다.'
  },
  {
    id: 8,
    name: '서초 포레스타 2단지',
    loc: '서울 서초구 신원동 250',
    price: '보증금 11,500만 / 월 41만',
    type: '아파트',
    contract: '월세',
    grade: '적합도 90%',
    matchReason: '서초구 친환경 숲세권 아파트. 신혼부부 및 예비 가구 대상 60㎡ 특공 배정이 유리합니다.'
  },
  {
    id: 9,
    name: '용산 한강뷰 청년임대',
    loc: '서울 용산구 이촌동 402',
    price: '보증금 9,800만 / 월 45만',
    type: '아파트',
    contract: '월세',
    grade: '적합도 86%',
    matchReason: '최고의 직주근접지 중 하나로 전세대 100% 발코니 확장형 명품 임대로 강력 매칭합니다.'
  },
  {
    id: 10,
    name: '송파 장지 파인타운',
    loc: '서울 송파구 장지동 201',
    price: '전세 21,500만',
    type: '아파트',
    contract: '전세',
    grade: '적합도 91%',
    matchReason: '송파 희망 주거 우선권 연동. 신도시급 교통 인프라를 전세 보증금 안전 한도 내에서 계약 가능한 핵심 매물입니다.'
  }
];

export default function DiagnosisPage() {
  // 상태 변수 정의
  const [householdType, setHouseholdType] = useState('청년 (19~39세)');
  const [age, setAge] = useState<number | ''>(28);
  const [incomeSelf, setIncomeSelf] = useState<number>(310); // 본인 월평균 소득 (만원)
  const [incomeFamily, setIncomeFamily] = useState<number>(550); // 가구 합계 소득 (만원)
  const [totalAsset, setTotalAsset] = useState<number>(24000); // 자산 규모 (만원)
  const [workAddress, setWorkAddress] = useState('서울 강남구 테헤란로 123');
  const [selectedAreas, setSelectedAreas] = useState<string[]>(['강남구', '마포구', '동작구']);
  const [houseType, setHouseType] = useState<'아파트' | '빌라/다세대'>('아파트');
  const [contractType, setContractType] = useState<'전세' | '월세'>('전세');

  // 실시간 가점 계산용 상태
  const [noHouseYears, setNoHouseYears] = useState(4); // 무주택 기간 (0~15년)
  const [familyMembers, setFamilyMembers] = useState(1); // 부양가족 수 (0~6명)
  const [bankSubPeriod, setBankSubPeriod] = useState(6); // 주택청약 가입 기간 (0~15년)

  // 카카오 알림톡 신청 폼 상태
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [notifSubmitted, setNotifSubmitted] = useState(false);

  // 거주 희망 구역 토글
  const toggleArea = (area: string) => {
    setSelectedAreas(prev => 
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  // 실시간 무주택 청약 가점 계산 (최대 84점 만점 기준 공식)
  const calcNoHouseScore = (years: number) => {
    if (years === 0) return 2;
    return Math.min(32, 2 * years + 2);
  };
  const calcFamilyScore = (members: number) => {
    return Math.min(35, 5 * members + 5);
  };
  const calcBankScore = (years: number) => {
    if (years === 0) return 1;
    return Math.min(17, years + 2);
  };

  const noHouseScore = calcNoHouseScore(noHouseYears);
  const familyScore = calcFamilyScore(familyMembers);
  const bankScore = calcBankScore(bankSubPeriod);
  const totalScore = noHouseScore + familyScore + bankScore;

  // 실시간 진단 등급 알고리즘 평가 모델
  const getDiagnosisGrade = () => {
    let isIncomeSafe = true;
    // 청년전형 소득제한 가상의 기준 (약 400만원 초과 시 조건 보정)
    if (householdType.includes('청년') && incomeSelf > 420) {
      isIncomeSafe = false;
    }
    if (incomeFamily > 780) {
      isIncomeSafe = false;
    }

    let isAssetSafe = true;
    if (totalAsset > 34500) { // 임대주택 표준 자산 한도 기준 3억 4,500만원
      isAssetSafe = false;
    }

    if (!isAssetSafe) {
      return {
        grade: 'C',
        badge: '자산 정밀 보류',
        color: 'text-rose-500 bg-rose-50 border-rose-200',
        desc: '현재 입력한 총 자산이 서울주택공사(SH) 및 LH 행복주택 자산 한도인 3억 4,500만원을 상회합니다. 자산 요건 예외 단지인 일반 분양형 청약이나 특별 무상 가구 조율을 검토하십시오.'
      };
    }

    if (!isIncomeSafe) {
      return {
        grade: 'B',
        badge: '경쟁 주의 (소득 초과 유의)',
        color: 'text-amber-600 bg-amber-50 border-amber-200',
        desc: '도시근로자 합산 월평균 소득 기준 비율이 다소 높아 일반 우선순위 경쟁에서 컷오프 주의가 필요합니다. 추첨형 청년안심계열이나 민간참여형 특별완화 단지를 최우선 기재하는 방향을 관철해 보십시오.'
      };
    }

    if (totalScore >= 50) {
      return {
        grade: 'S',
        badge: '당첨 사실상 유력',
        color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
        desc: '가점 총점이 50점을 넘고 자산/소득 커트라인이 모두 골든패스 규정을 통과 중입니다! 우선 순위 및 특별 우대공급에서 압도적으로 최선두 당첨 행보를 견지할 수 있습니다.'
      };
    }

    return {
      grade: 'A',
      badge: '당첨 우세 국면',
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      desc: '자격 요건 충족 및 탄탄한 평균 이상 가점을 보유 중입니다. 강남/마포 등 메이저 행정 거주구의 행복주택 일반공급 경쟁과 더불어 즉시 신청이 가능한 임대유형을 전략 배분하여 시너지 효과를 내는 방향이 탁월합니다.'
    };
  };

  const diagnosis = getDiagnosisGrade();

  // 사용자의 실시간 설정값(희망거주구, 주택형태, 계약유형)을 필터에 결합하여 추천 단지 실시간 출력
  const getRecommendedComplexes = () => {
    return complexesDatabase.filter(item => {
      // 1. 희망 거주 구가 포함되어 있는지 매칭
      const areaMatch = selectedAreas.length === 0 || selectedAreas.some(area => item.loc.includes(area));
      // 2. 원하는 주택 형태 매칭
      const typeMatch = item.type === houseType;
      // 3. 원하는 계약 계약 매칭 (선택 사항 - 더 많은 검색 다양성을 위해)
      const contractMatch = item.contract === contractType;
      
      return areaMatch && typeMatch && contractMatch;
    });
  };

  const matchedComplexes = getRecommendedComplexes();

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-10 text-gray-900 font-sans">
      
      {/* 1. 최상단 히어로 배너 */}
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-10">
        <div>
          <span className="inline-flex items-center gap-1 text-[11px] bg-primary/10 text-primary font-black px-3 py-1.5 rounded-full uppercase tracking-widest mb-3">
            <Sparkles size={12} className="animate-spin text-primary" />
            내집다오 프리미엄 원스톱 분석 엔진
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-gray-950 tracking-tight">
            원스톱 청약 자격 & 가점 실시간 진단
          </h1>
          <p className="text-gray-500 mt-2 text-sm max-w-2xl leading-relaxed">
            여러 페이지 이동 없이 **단 한 화면**에서 내 소득, 자산, 거주 희망 요건을 실시간으로 조율하며 
            당첨 등급 시뮬레이션 및 LH/SH 공사 매칭 임대 단지 조회를 즉석에서 체감할 수 있습니다.
          </p>
        </div>
        
        {/* 리세팅 배너 */}
        <div className="bg-surface/60 border border-gray-100 p-4 rounded-2xl flex items-center gap-3 shrink-0 self-start md:self-center">
          <div className="w-10 h-10 bg-white shadow-sm flex items-center justify-center rounded-xl text-primary font-black">
            <Settings size={20} className="animate-spin-slow duration-1000" />
          </div>
          <div className="text-left text-xs">
            <p className="font-extrabold text-gray-950">실시간 동기화 상태</p>
            <p className="text-[10px] text-gray-400 font-medium">설정 변경 시 우측 레포트 자동 갱신</p>
          </div>
        </div>
      </div>

      {/* 2. 대시보드 2단 레이아웃 (좌: 대화식 제어 패널 / 우: 실시간 계기판 보고서) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* 왼쪽: 입력 제어부 (Dashboard Controls) - 5컬럼 영역 */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-xl shadow-gray-100/40 space-y-8">
            <h2 className="text-lg font-black text-gray-950 tracking-tight flex items-center gap-2 border-b border-gray-50 pb-4">
              <span className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center text-xs font-black">1</span>
              청약 희망 기본 정보 & 소득 자격
            </h2>

            {/* A. 특별공급 대상 분류 선택 */}
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-500 flex items-center gap-1.5">
                <Star className="text-primary" size={14} />
                어떤 청약 특별/일반공급 대상에 속하시나요?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  '청년 (19~39세)', '신혼부부/예비신혼', '대학생/취업준비생',
                  '한부모가족', '고령자 (만65세 이상)', '일반공급/기타'
                ].map((type) => {
                  const isSelected = householdType === type;
                  return (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setHouseholdType(type)}
                      className={`p-3.5 rounded-xl border text-left font-black text-[11px] transition-all text-center ${
                        isSelected 
                          ? 'border-primary bg-primary/[0.04] text-primary shadow-sm font-extrabold' 
                          : 'border-gray-100 bg-white text-zinc-600 hover:border-gray-300'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* B. 세전 소득 및 자산 슬라이더 (실시간 반응 핵심부) */}
            <div className="space-y-6 pt-2">
              {/* 나이 */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-500">신청 대상자 생년월일 기준 나이</label>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    value={age} 
                    onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full max-w-[100px] p-2.5 bg-surface text-center text-xs font-black rounded-lg border-none outline-none focus:ring-2 focus:ring-primary/20 text-zinc-900"
                  />
                  <span className="text-xs text-gray-500 font-bold">세 (만 나이 해당)</span>
                </div>
              </div>

              {/* 본인 세전 월 소득 */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-black text-gray-500">본인 월 평균 소득</label>
                  <span className="text-xs font-black text-primary bg-primary/5 px-2 py-0.5 rounded font-sans">{incomeSelf} 만원</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="800"
                  step="10"
                  value={incomeSelf}
                  onChange={(e) => setIncomeSelf(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[9px] text-gray-400 font-bold">
                  <span>100만</span>
                  <span>단가평균 335만</span>
                  <span>800만</span>
                </div>
              </div>

              {/* 가구 합산 월 소득 */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-black text-gray-500">가구원 전원 합산 월 소득</label>
                  <span className="text-xs font-black text-primary bg-primary/5 px-2 py-0.5 rounded font-sans">{incomeFamily} 만원</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="1200"
                  step="10"
                  value={incomeFamily}
                  onChange={(e) => setIncomeFamily(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-[9px] text-gray-400 font-bold">
                  <span>100만</span>
                  <span>가구평균 671만</span>
                  <span>1200만</span>
                </div>
              </div>

              {/* 총 자산규모 */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-black text-gray-500 flex items-center gap-1">
                    총 자산 (보유 부동산 및 자동차 가액)
                  </label>
                  <span className="text-xs font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded font-sans">
                    {Math.floor(totalAsset / 10000) > 0 ? `${Math.floor(totalAsset / 10000)}억 ` : ''}
                    {(totalAsset % 10000).toLocaleString()}만원
                  </span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="60000"
                  step="500"
                  value={totalAsset}
                  onChange={(e) => setTotalAsset(Number(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[9px] text-gray-400 font-bold">
                  <span>500만</span>
                  <span className="text-rose-500 font-extrabold text-[10px]">행복주택 커트라인: 3.45억 이하</span>
                  <span>6억+</span>
                </div>
              </div>
            </div>
          </div>

          {/* 거주 / 교통 / 가점 타겟 및 취향 셋업 */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-xl shadow-gray-100/40 space-y-6">
            <h2 className="text-lg font-black text-gray-950 tracking-tight flex items-center gap-2 border-b border-gray-50 pb-4">
              <span className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center text-xs font-black">2</span>
              직장주소 및 거주 희망 구역
            </h2>

            {/* C. 직소 및 자치구 다중 등록 */}
            <div className="space-y-3">
              <label className="text-xs font-black text-gray-500 flex items-center gap-1">
                <MapPin size={14} className="text-primary" />
                직장 도로명 주소 (우선 순위 연동)
              </label>
              <input 
                type="text" 
                value={workAddress}
                onChange={(e) => setWorkAddress(e.target.value)}
                placeholder="예) 마포구 백범로 35" 
                className="w-full p-3 bg-surface text-xs font-black rounded-xl border border-gray-50 outline-none focus:ring-2 focus:ring-primary/20 text-zinc-900"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black text-gray-500">주거 희망 우선 행정구 (중복 다각화 선택)</label>
                <span className="text-[10px] text-gray-400 font-black">클릭 시 즉시 추천 반영</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['강남구', '마포구', '서초구', '성동구', '영등포구', '동작구', '용산구', '송파구'].map((area) => {
                  const isSelected = selectedAreas.includes(area);
                  return (
                    <button
                      type="button"
                      key={area}
                      onClick={() => toggleArea(area)}
                      className={`px-3 py-1.5 text-[11px] font-black rounded-lg border transition-all ${
                        isSelected 
                          ? 'bg-primary border-primary text-white shadow-sm font-extrabold' 
                          : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                      }`}
                    >
                      {area} {isSelected ? '✓' : '+'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* D. 주택 취향 설정 */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase">원하는 주택 타입</label>
                <div className="flex gap-1 bg-gray-50 p-1 rounded-xl">
                  {(['아파트', '빌라/다세대'] as const).map(type => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setHouseType(type)}
                      className={`flex-grow py-2 text-[11px] font-black rounded-lg transition-all ${
                        houseType === type 
                          ? 'bg-white text-primary shadow-sm font-black' 
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase">원하는 계약 유형</label>
                <div className="flex gap-1 bg-gray-50 p-1 rounded-xl">
                  {(['전세', '월세'] as const).map(type => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setContractType(type)}
                      className={`flex-grow py-2 text-[11px] font-black rounded-lg transition-all ${
                        contractType === type 
                          ? 'bg-white text-primary shadow-sm font-black' 
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 오른쪽: 결과 분석 및 가점 계산기 (Live Reports) - 7컬럼 최적 배치 */}
        <main className="lg:col-span-7 space-y-6">
          
          {/* A. 3색 분석 레포트 bento 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 자격 종합 판정 등급 판 */}
            <div className="bg-white border border-gray-100 p-6 rounded-[28px] shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] bg-primary text-white font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                  실시간 자격 정밀 분석 결과
                </span>
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-7xl font-sans font-black text-primary tracking-tighter">
                    {diagnosis.grade}
                  </span>
                  <span className="text-sm font-black text-gray-400 uppercase">등급</span>
                </div>
                <div className="mt-2 text-left">
                  <span className={`inline-block px-3 py-1 text-[11px] font-black rounded-full border ${diagnosis.color}`}>
                    {diagnosis.badge}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-4 leading-relaxed font-semibold">
                  {diagnosis.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-50 mt-4 space-y-1.5 text-xs text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold">소득 분류 검토:</span>
                  <span className="font-extrabold text-gray-800">{householdType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-bold">자산 부합 여부:</span>
                  <span className="font-extrabold text-emerald-600">
                    {totalAsset <= 34500 ? '조건 합격 수렴' : '초격 분진 검토'}
                  </span>
                </div>
              </div>
            </div>

            {/* 청약 가점 세부 시뮬레이터 */}
            <div className="bg-white border border-gray-100 p-6 rounded-[28px] shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-black text-gray-500 flex items-center gap-1">
                    <Award size={15} className="text-orange-500" />
                    무주택 청약 가점 시뮬레이터
                  </h3>
                  <span className="font-sans font-black text-[9px] text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                    84점 만점
                  </span>
                </div>

                <div className="flex items-baseline gap-1 mt-2 mb-4">
                  <span className="text-4xl font-sans font-black text-gray-950 tracking-tight">{totalScore}</span>
                  <span className="text-xs text-gray-400 font-bold">/ 84점 만점</span>
                </div>

                <div className="space-y-3">
                  {/* 무주택 기간 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-gray-500 font-black">① 무주택 기간 : ({noHouseYears}년)</span>
                      <span className="text-primary font-black font-sans">{noHouseScore}점</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="15" 
                      value={noHouseYears}
                      onChange={(e) => setNoHouseYears(Number(e.target.value))}
                      className="w-full h-1 bg-gray-100 appearance-none rounded cursor-pointer accent-primary"
                    />
                  </div>

                  {/* 부양가족 수 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-gray-500 font-black">② 등본 부양가족 : ({familyMembers}명)</span>
                      <span className="text-primary font-black font-sans">{familyScore}점</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="6" 
                      value={familyMembers}
                      onChange={(e) => setFamilyMembers(Number(e.target.value))}
                      className="w-full h-1 bg-gray-100 appearance-none rounded cursor-pointer accent-primary"
                    />
                  </div>

                  {/* 통장 기간 */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-gray-500 font-black">③ 청약통장 가입기간 : ({bankSubPeriod}년)</span>
                      <span className="text-primary font-black font-sans">{bankScore}점</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="15" 
                      value={bankSubPeriod}
                      onChange={(e) => setBankSubPeriod(Number(e.target.value))}
                      className="w-full h-1 bg-gray-100 appearance-none rounded cursor-pointer accent-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-surface rounded-xl text-[10px] text-gray-500 leading-normal border border-gray-50">
                <span className="font-extrabold text-[#111] block mb-0.5">💡 가점 극대화 비책</span>
                {totalScore < 30 ? (
                  '비교적 가점이 낮은 상태이므로 청약통장 가점 경쟁이 드문 "추첨 안심주택"을 최우선 추진하십시오.'
                ) : (
                  '수준급의 가점입니다. 메이저 SH 가곡/수서 역세권 국민공급 시 1순위 합격을 견지해볼 수 있습니다.'
                )}
              </div>
            </div>
          </div>

          {/* B. 실시간 매칭 추천 단지 (소리없이 다이내믹하게 필터링 적용) */}
          <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-50 pb-3">
              <div>
                <h3 className="text-base font-black text-gray-950 flex items-center gap-1.5 uppercase">
                  🎯 맞춤형 실시간 추천 단지 매칭
                </h3>
                <p className="text-[11px] text-gray-400 mt-0.5">내 주택형태({houseType}) & 거주구({selectedAreas.join('/')}) 맞춤 연동 결과</p>
              </div>
              <span className="text-xs bg-primary/10 text-primary font-black px-3 py-1 rounded-full uppercase">
                실시간 {matchedComplexes.length}곳 매칭
              </span>
            </div>

            {matchedComplexes.length === 0 ? (
              <div className="py-12 text-center bg-surface/50 rounded-2xl border border-dashed border-gray-100 space-y-2">
                <p className="text-xs text-gray-400 font-black">지정한 조건에 들어맞는 실시간 단지가 제한적입니다.</p>
                <p className="text-[10px] text-gray-400 font-medium font-sans">자치구 선택 범위를 넓히거나, 주택 형태(아파트/빌라) 계약 조건(전세/월세)을 조절해보세요!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {matchedComplexes.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={item.id}
                      className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm hover:border-primary/20 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-sans font-black text-primary bg-blue-50 px-2 py-0.5 rounded uppercase">
                            {item.grade}
                          </span>
                          <span className="text-[9px] text-gray-400 font-extrabold font-sans">
                            {item.type} • {item.contract}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-[#111113] text-sm leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 font-bold font-sans">{item.price}</p>
                        <p className="text-[10px] text-gray-400 leading-normal">{item.matchReason}</p>
                      </div>

                      <div className="pt-3 mt-3 border-t border-dashed border-gray-50 flex items-center justify-between gap-1 flex-wrap">
                        <Link to={`/complex/${item.id}`} className="text-[9px] text-[#1E60FF] hover:underline font-black flex items-center gap-0.5 transition-colors">
                          🔍 상세 스펙 & 가점 보고서 <ChevronRight size={10} />
                        </Link>
                        <Link to="/map" className="text-[9px] text-gray-400 hover:text-[#0050FF] font-black flex items-center gap-0.5 transition-colors">
                          🗺️ 지도 <ChevronRight size={10} />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* C. 원클릭 카카오톡 24h 라이브 스마트 알림 신청 퀵 보드 */}
          <div className="bg-slate-950 text-white p-6 rounded-[28px] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-sm">
                <div className="inline-flex items-center gap-1.5">
                  <div className="w-5 h-5 bg-amber-400 text-zinc-950 rounded-full flex items-center justify-center font-black text-[9px]">
                    Talk
                  </div>
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    24H 초경보 스마트 카카오 알림톡 서비스
                  </span>
                </div>
                <h4 className="text-base font-black tracking-tight leading-snug">적합 단지 신규 배포 시 즉시 무료 알림톡 수신</h4>
                <p className="text-[10px] text-slate-400 leading-normal">
                  설정한 자격 소득 등급과 희망 행정 자치구(<span className="text-primary font-black">{selectedAreas.join(', ')}</span>)에 걸맞는 긴급 공고가 뜨면 즉시 기재하신 번호로 카카오 경보를 드립니다.
                </p>
              </div>

              {/* 신청 폼 영역 */}
              <div className="shrink-0 w-full md:w-60">
                {!notifSubmitted ? (
                  <div className="space-y-2 text-left">
                    <input 
                      type="text" 
                      placeholder="성함 입력" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 bg-slate-900 border border-slate-800 text-xs text-white rounded-lg outline-none focus:ring-1 focus:ring-primary placeholder:text-slate-500 font-extrabold"
                    />
                    <input 
                      type="text" 
                      placeholder="휴대폰 번호 (예: 01012345678)" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 bg-slate-900 border border-slate-800 text-xs text-white rounded-lg outline-none focus:ring-1 focus:ring-primary placeholder:text-slate-500 font-extrabold"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (name.trim() && phone.trim()) {
                          setNotifSubmitted(true);
                        } else {
                          alert('성함과 휴대폰 번호를 올바르게 입력해주세요!');
                        }
                      }}
                      className="w-full py-2.5 bg-primary hover:bg-blue-600 font-black text-xs text-white rounded-lg flex items-center justify-center gap-1 transition-colors shadow-lg shadow-primary/20"
                    >
                      <Send size={11} /> 24h 라이브 무료 스마트 알림 신청
                    </button>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-900 p-4 rounded-xl text-center space-y-1.5 border border-slate-800"
                  >
                    <CheckCircle2 className="text-emerald-400 mx-auto" size={18} />
                    <p className="text-xs font-black text-white">{name}님 무료 알림 등록 성공!</p>
                    <p className="text-[10px] text-slate-400 leading-normal font-sans">
                      {selectedAreas.join(', ')} 등의 행정 구역에 완벽 추천 공구 발표 즉시 {phone} 번호로 카카오 실시간 연동 알림톡을 전송하겠습니다.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* D. 청약 핵심 수칙 미니 보드 */}
          <div className="bg-gray-50 border border-gray-100 p-5 rounded-[24px] flex items-start gap-3">
            <Info className="text-primary shrink-0 mt-0.5" size={16} />
            <div className="space-y-1">
              <h4 className="text-xs font-black text-[#111] uppercase tracking-wide">
                임대주택 자산 관리 가이드
              </h4>
              <p className="text-[10px] text-gray-500 leading-normal">
                공공 행복주택이나 국민임대의 경우 만 30세 무주택 요건 유지가 필수적입니다. 자산이 수시 변경되어 조건 합격 라인에 넘나들 때는 
                맞춤 추천 리스트의 개별 단지를 클리핑하여 실시간 공급 세대 기준에 따른 세전 납입 회차를 먼저 사전 체크해 두시면 합격률이 극대화됩니다.
              </p>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
