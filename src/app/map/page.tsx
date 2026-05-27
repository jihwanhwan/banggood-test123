"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Map as MapIcon, Search, Navigation, Plus, Minus, Info, ClipboardCheck, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// 공고 단지 목록 상세 데이터 정의
interface Complex {
  id: number;
  name: string;
  location: string;
  lat: number;
  lng: number;
  complexes: string;
  status: '공고중' | '공고예정' | '접수마감';
  price: string;
  provider: 'LH공사' | 'SH공사' | '지자체' | '민간';
  type: '국민임대' | '행복주택' | '장기전세' | '청년안심';
  distance: string;
  tag: string;
  desc: string;
  scaleY: number; 
  scaleX: number; 
}

const initialComplexes: Complex[] = [
  {
    id: 1,
    name: 'LH 강남 브리즈힐 (국민임대)',
    location: '서울 강남구 자곡로 3길 22',
    lat: 37.467438,
    lng: 127.098482,
    complexes: '12개동 402세대',
    status: '공고중',
    price: '보증금 6,200만 / 월 32만',
    provider: 'LH공사',
    type: '국민임대',
    distance: '1.2km',
    tag: 'D-5',
    desc: '수서역 인근 쾌적한 분지형 신축 대단지 국민임대',
    scaleX: 0.65,
    scaleY: 0.70,
  },
  {
    id: 2,
    name: '마포 펜트라우스 (행복주택)',
    location: '서울 마포구 백범로 205',
    lat: 37.545803,
    lng: 126.953123,
    complexes: '3개동 362세대',
    status: '접수마감',
    price: '보증금 14,300만 / 월 48만',
    provider: 'SH공사',
    type: '행복주택',
    distance: '3.5km',
    tag: '마감',
    desc: '공덕역 초역세권 교통 요지 프리미엄 청년 행복주택',
    scaleX: 0.35,
    scaleY: 0.35,
  },
  {
    id: 3,
    name: '위례 포레스트 (국민임대)',
    location: '경기도 하남시 위례대로 100',
    lat: 37.478954,
    lng: 127.151322,
    complexes: '15개동 1,200세대',
    status: '공고예정',
    price: '보증금 8,500만 / 월 22만',
    provider: 'LH공사',
    type: '국민임대',
    distance: '4.1km',
    tag: '예정',
    desc: '위례신도시 중심지 숲세권 힐링 대단지 국민임대',
    scaleX: 0.85,
    scaleY: 0.60,
  },
  {
    id: 4,
    name: '수서 역세권 A1단지 (장기전세)',
    location: '서울 강남구 수서동 730',
    lat: 37.487712,
    lng: 127.101734,
    complexes: '10개동 2,500세대',
    status: '공고중',
    price: '전세 24,000만',
    provider: 'LH공사',
    type: '장기전세',
    distance: '1.8km',
    tag: 'D-2',
    desc: 'SRT 수서역 초근접 신축 역세권 랜드마크 장기전세',
    scaleX: 0.70,
    scaleY: 0.52,
  },
  {
    id: 5,
    name: '동작 보라매역 프리센트 (장기전세)',
    location: '서울 동작구 여의대방로 130',
    lat: 37.498024,
    lng: 126.920531,
    complexes: '5개동 480세대',
    status: '공고중',
    price: '전세 19,500만',
    provider: '지자체',
    type: '장기전세',
    distance: '2.5km',
    tag: 'D-8',
    desc: '여의도 출퇴근 최적지 7호선/신림선 더블역세권 단지',
    scaleX: 0.15,
    scaleY: 0.45,
  }
];

// 수도권 주요 지하철역 좌표 데이터베이스 (역세권 실시간 자동 계산용)
const subwayStations = [
  { name: '오류동역 (1호선)', lat: 37.4947, lng: 126.8453, mockX: 120, mockY: 820 },
  { name: '공덕역 (5호선)', lat: 37.5432, lng: 126.9515, mockX: 330, mockY: 372 },
  { name: '수서역 (SRT/3호선)', lat: 37.4874, lng: 127.1014, mockX: 880, mockY: 715 },
  { name: '보라매역 (7호선)', lat: 37.4998, lng: 126.9204, mockX: 200, mockY: 610 },
  { name: '샛강역 (신림선)', lat: 37.5191, lng: 126.9287, mockX: 250, mockY: 650 }
];

export default function MapPage() {
  const [selectedComplex, setSelectedComplex] = useState<Complex>(initialComplexes[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'전체' | 'LH공사' | 'SH공사' | '지자체'>('전체');
  
  // 카카오 지도 API 관련 상태
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const [kakaoLoaded, setKakaoLoaded] = useState(false);
  const [kakaoError, setKakaoError] = useState(false);
  const [activeMarkers, setActiveMarkers] = useState<any[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // 사용자가 임의로 지정한 마커 및 역세권 정보 상태
  const [customPlacedPoint, setCustomPlacedPoint] = useState<{
    x: number;
    y: number;
    lat: number;
    lng: number;
  } | null>(null);

  const [nearestStation, setNearestStation] = useState<{
    name: string;
    distance: number;
    timeWalking: number;
  } | null>(null);

  // Kakao맵 위에서 그려진 임의 마커 & 점선 기록 폴더
  const customMarkerRef = useRef<any>(null);
  const customPolylineRef = useRef<any>(null);

  // Mock 지도 드래그 및 줌 상태 (카카오 API 키 없을 때 완벽한 사용자 만족을 위한 가상 뷰포트형 엔진)
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: -150, y: -100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mouseDownCoordsRef = useRef({ x: 0, y: 0 });

  // 공고 필터링
  const filteredComplexes = initialComplexes.filter(item => {
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === '전체' || item.provider === activeFilter;
    return matchesQuery && matchesFilter;
  });

  // 필터나 검색어가 변경되어 현재 선택된 단지가 필터 목록에서 사라지면, 첫 번째 단지를 자동으로 자동 선택 처리
  useEffect(() => {
    if (filteredComplexes.length > 0) {
      const isStillInList = filteredComplexes.some(item => item.id === selectedComplex.id);
      if (!isStillInList) {
        setSelectedComplex(filteredComplexes[0]);
      }
    }
  }, [activeFilter, searchQuery, filteredComplexes, selectedComplex.id]);

  // 카카오 맵 SDK 스크립트 로드
  useEffect(() => {
    const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    
    if (!appKey) {
      console.log("카카오 맵 API 앱 키가 없으므로 인터랙티브 시뮬레이터 디자인으로 대체 구동합니다.");
      setKakaoError(true);
      return;
    }

    if (window.hasOwnProperty('kakao') && (window as any).kakao.maps) {
      setKakaoLoaded(true);
      return;
    }

    const scriptId = 'kakao-maps-sdk';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
      script.async = true;
      document.head.appendChild(script);
    }

    const handleScriptLoad = () => {
      if ((window as any).kakao && (window as any).kakao.maps) {
        (window as any).kakao.maps.load(() => {
          setKakaoLoaded(true);
        });
      } else {
        setKakaoError(true);
      }
    };

    script.addEventListener('load', handleScriptLoad);
    script.addEventListener('error', () => setKakaoError(true));

    return () => {
      script.removeEventListener('load', handleScriptLoad);
    };
  }, []);

  // 실제 카카오 지도 초기화
  useEffect(() => {
    if (!kakaoLoaded || !mapContainerRef.current) return;

    try {
      const container = mapContainerRef.current;
      const options = {
        center: new (window as any).kakao.maps.LatLng(selectedComplex.lat, selectedComplex.lng),
        level: 4, 
      };

      const map = new (window as any).kakao.maps.Map(container, options);
      setKakaoMap(map);

      // 클전 마커 전체 삭제
      activeMarkers.forEach(markerObj => markerObj.setMap(null));
      const markers: any[] = [];

      // 단지별 마커 및 커스텀 오버레이 표시
      filteredComplexes.forEach(item => {
        const markerPosition = new (window as any).kakao.maps.LatLng(item.lat, item.lng);
        const isSelected = item.id === selectedComplex.id;
        const color = item.status === '공고중' ? '#0050FF' : item.status === '접수마감' ? '#8E8E93' : '#FF9500';

        const content = `
          <div style="cursor: pointer; position: relative; filter: drop-shadow(0px 4px 8px rgba(0,0,0,0.15));" class="group">
            <div style="
              background: ${isSelected ? '#1C1C1E' : '#FFFFFF'};
              color: ${isSelected ? '#FFFFFF' : '#1C1C1E'};
              border: 2px solid ${color};
              font-family: Pretendard, sans-serif;
              font-weight: 800;
              font-size: 11px;
              padding: 6px 12px;
              border-radius: 12px;
              white-space: nowrap;
              display: flex;
              align-items: center;
              gap: 4px;
              transition: all 0.2s ease-in-out;
            ">
              <span style="color: ${color}; font-size: 10px; font-weight: 900;">●</span>
              ${item.name.replace(' (국민임대)', '').replace(' (행복주택)', '').replace(' (장기전세)', '')}
            </div>
            <div style="
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 6px solid ${isSelected ? '#1C1C1E' : '#FFFFFF'};
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              top: 100%;
            "></div>
          </div>
        `;

        const customOverlay = new (window as any).kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          yAnchor: 1.3
        });

        customOverlay.setMap(map);
        markers.push(customOverlay);

        const invisibleMarker = new (window as any).kakao.maps.Marker({
          position: markerPosition,
          opacity: 0, 
        });
        invisibleMarker.setMap(map);

        (window as any).kakao.maps.event.addListener(invisibleMarker, 'click', () => {
          setSelectedComplex(item);
        });
        markers.push(invisibleMarker);
      });

      // 지도를 클릭했을 때 이벤트 리스너 추가하여 임의 후보지 마커 생성 및 지하철역 도보 연산
      (window as any).kakao.maps.event.addListener(map, 'click', (mouseEvent: any) => {
        const latlng = mouseEvent.latLng;
        const clickLat = latlng.getLat();
        const clickLng = latlng.getLng();

        // 가장 가까운 지하철역 찾기
        let nearest = subwayStations[0];
        let minDistance = Infinity;

        subwayStations.forEach(station => {
          // 위경도 기준 보정 거리 상수 (경도 가중치 부여)
          const dLat = (station.lat - clickLat) * 111000;
          const dLng = (station.lng - clickLng) * 88000;
          const dist = Math.sqrt(dLat * dLat + dLng * dLng);
          if (dist < minDistance) {
            minDistance = dist;
            nearest = station;
          }
        });

        const distInMeters = Math.round(minDistance);
        const timeByFoot = Math.max(1, Math.ceil(distInMeters / 70));

        setCustomPlacedPoint({
          x: 0,
          y: 0,
          lat: clickLat,
          lng: clickLng
        });

        setNearestStation({
          name: nearest.name,
          distance: distInMeters,
          timeWalking: timeByFoot
        });
      });

      setActiveMarkers(markers);
    } catch (e) {
      console.error("카카오 지도 생성 중 오류:", e);
      setKakaoError(true);
    }
  }, [kakaoLoaded, filteredComplexes]);

  // Kakao Map 상에 동적으로 찍은 임의 후보지 핑과 점선 그리기
  useEffect(() => {
    if (!kakaoMap || !kakaoLoaded || !customPlacedPoint || customPlacedPoint.lat === 0) return;

    try {
      if (customMarkerRef.current) customMarkerRef.current.setMap(null);
      if (customPolylineRef.current) customPolylineRef.current.setMap(null);

      // 가장 가까운 국철/지하철역 파악
      let targetStation = subwayStations[0];
      let minDistance = Infinity;
      subwayStations.forEach(station => {
        const dLat = (station.lat - customPlacedPoint.lat) * 111000;
        const dLng = (station.lng - customPlacedPoint.lng) * 88000;
        const dist = Math.sqrt(dLat * dLat + dLng * dLng);
        if (dist < minDistance) {
          minDistance = dist;
          targetStation = station;
        }
      });

      const clickPosition = new (window as any).kakao.maps.LatLng(customPlacedPoint.lat, customPlacedPoint.lng);
      
      const content = `
        <div style="filter: drop-shadow(0px 4px 10px rgba(225,0,126,0.35)); position: relative;">
          <div style="
            background: #E1007E;
            color: white;
            font-family: Pretendard, sans-serif;
            font-weight: 900;
            font-size: 11px;
            padding: 7px 14px;
            border-radius: 12px;
            white-space: nowrap;
            border: 2px solid white;
          ">
            ⏰ 내가 찍은 위치 후보지
          </div>
          <div style="
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid #E1007E;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 100%;
          "></div>
        </div>
      `;

      const markerOverlay = new (window as any).kakao.maps.CustomOverlay({
        position: clickPosition,
        content: content,
        yAnchor: 1.3
      });

      markerOverlay.setMap(kakaoMap);
      customMarkerRef.current = markerOverlay;

      // 선 그리기
      const linePath = [
        clickPosition,
        new (window as any).kakao.maps.LatLng(targetStation.lat, targetStation.lng)
      ];

      const polyline = new (window as any).kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 4,
        strokeColor: '#E1007E',
        strokeOpacity: 0.8,
        strokeStyle: 'dashed'
      });

      polyline.setMap(kakaoMap);
      customPolylineRef.current = polyline;

    } catch (e) {
      console.error("클릭 이벤트 마커 표출 오류:", e);
    }
  }, [customPlacedPoint, kakaoMap, kakaoLoaded]);

  // 외부에서 단지 선택 시 지도 중심 이동
  useEffect(() => {
    if (kakaoMap && kakaoLoaded) {
      const moveLatLon = new (window as any).kakao.maps.LatLng(selectedComplex.lat, selectedComplex.lng);
      kakaoMap.panTo(moveLatLon);
    } else {
      const containerWidth = 800; 
      const containerHeight = 600;
      const targetX = -(selectedComplex.scaleX * 800 - containerWidth / 2);
      const targetY = -(selectedComplex.scaleY * 600 - containerHeight / 2);
      
      setPan({ x: targetX, y: targetY });
    }
  }, [selectedComplex, kakaoMap, kakaoLoaded]);

  // Mock 지도 드래그 및 마우스 제어
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    mouseDownCoordsRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDragging(false);

    // 드래그 거리가 짧으면 (클릭으로 판단)
    const dragDistance = Math.sqrt(
      Math.pow(e.clientX - mouseDownCoordsRef.current.x, 2) + 
      Math.pow(e.clientY - mouseDownCoordsRef.current.y, 2)
    );

    if (dragDistance < 5) {
      const rect = e.currentTarget.getBoundingClientRect();
      // 줌, 드래그 위치 역산하여 가상 1800x1200 마우스 좌표 계산
      const mapClickX = (e.clientX - rect.left - pan.x) / zoom;
      const mapClickY = (e.clientY - rect.top - pan.y) / zoom;

      // 가장 가까운 지하철역 계산
      let nearest = subwayStations[0];
      let minDistance = Infinity;

      subwayStations.forEach(station => {
        const dist = Math.sqrt(
          Math.pow(station.mockX - mapClickX, 2) + 
          Math.pow(station.mockY - mapClickY, 2)
        );
        if (dist < minDistance) {
          minDistance = dist;
          nearest = station;
        }
      });

      // 1 픽셀 = 약 1.45 미터로 환산
      const distInMeters = Math.round(minDistance * 1.45);
      const timeByFoot = Math.max(1, Math.ceil(distInMeters / 70));

      setCustomPlacedPoint({
        x: mapClickX,
        y: mapClickY,
        lat: nearest.lat,
        lng: nearest.lng
      });

      setNearestStation({
        name: nearest.name,
        distance: distInMeters,
        timeWalking: timeByFoot
      });
    }
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + 0.25, 2));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const resetLocation = () => {
    if (kakaoMap && kakaoLoaded) {
      const defaultLoc = new (window as any).kakao.maps.LatLng(selectedComplex.lat, selectedComplex.lng);
      kakaoMap.setLevel(4);
      kakaoMap.panTo(defaultLoc);
    } else {
      setZoom(1);
      const containerWidth = 800;
      const containerHeight = 600;
      const targetX = -(selectedComplex.scaleX * 800 - containerWidth / 2);
      const targetY = -(selectedComplex.scaleY * 600 - containerHeight / 2);
      setPan({ x: targetX, y: targetY });
    }
  };

  // 구한 최적 지하철역 정보 가져오기
  const activeStationCoords = nearestStation 
    ? (subwayStations.find(s => s.name.startsWith(nearestStation.name.substring(0, 3))) || subwayStations[0])
    : null;

  return (
    <div className="flex h-[calc(100vh-72px)] overflow-hidden bg-white font-sans text-gray-900">
      
      {/* 1. 사이드바 (공고 인덱스 리스트) */}
      <div className="w-full max-w-sm md:max-w-md border-r border-gray-100 bg-white flex flex-col z-10 shadow-2xl shadow-gray-200/40 relative">
        <div className="p-6 border-b border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black tracking-tight flex items-center gap-2">
              <MapIcon size={20} className="text-primary" />
              내집다오 입체지도
            </h1>
            <span className="text-[10px] bg-blue-50 text-primary font-black px-2 py-1 rounded-full uppercase">
              실시간 동기화
            </span>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="예) 강남구, 브리즈힐, 마포" 
              className="w-full pl-11 pr-4 py-3 bg-surface rounded-2xl text-sm font-bold placeholder:text-gray-400 border-none outline-none focus:ring-2 focus:ring-primary/20 transition-all text-zinc-900"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {(['전체', 'LH공사', 'SH공사', '지자체'] as const).map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all border shrink-0 ${
                  activeFilter === filter 
                    ? 'bg-primary border-primary text-white shadow-md shadow-primary/10' 
                    : 'bg-surface border-transparent text-gray-500 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* 단지 목록 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[calc(100vh-270px)] bg-gray-50/20">
          {filteredComplexes.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Info className="mx-auto mb-3" size={32} />
              <p className="font-bold">검색 조건에 일치하는 단지가 없습니다.</p>
              <p className="text-xs text-gray-400 mt-1">지역명 또는 단지명을 다시 확인해 주세요.</p>
            </div>
          ) : (
            filteredComplexes.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedComplex(item)}
                className={`p-5 rounded-[24px] border-2 transition-all cursor-pointer relative overflow-hidden ${
                  selectedComplex.id === item.id 
                    ? 'border-primary bg-primary/[0.02] shadow-xl shadow-primary/5 font-extrabold' 
                    : 'border-transparent bg-white hover:border-gray-200 shadow-sm'
                }`}
              >
                <div className="flex justify-between items-start mb-2.5">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                    item.status === '공고중' ? 'bg-blue-50 text-primary' : 
                    item.status === '공고예정' ? 'bg-orange-50 text-orange-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {item.provider} · {item.type}
                  </span>
                  <span className="text-[10px] font-black font-sans text-red-500 uppercase">
                    {item.tag}
                  </span>
                </div>
                
                <h4 className="font-bold text-[#1C1C1E] text-base group-hover:text-primary transition-colors line-clamp-1">
                  {item.name}
                </h4>
                <p className="text-xs text-gray-400 mt-1 font-sans">{item.location}</p>
                <p className="text-[#8E8E93] text-xs mt-1">{item.complexes}</p>

                <div className="mt-4 pt-3 border-t border-dashed border-gray-100 flex items-center justify-between">
                  <p className="text-sm font-black text-primary font-sans">{item.price}</p>
                  <Link to={`/complex/${item.id}`} className="text-[10px] font-black text-gray-400 hover:text-[#0050FF] hover:underline flex items-center gap-0.5">
                    상세보기 <ExternalLink size={10} />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {/* AI 연동 띠안내 */}
        <div className="absolute bottom-4 inset-x-4 bg-gray-900 text-white rounded-[24px] p-4 flex items-center justify-between gap-4">
          <div className="space-y-0.5">
             <p className="text-xs font-black">자격 진단하고 확률 더 높이기</p>
             <p className="text-[10px] text-gray-400">내 스펙에 맞는 당첨 단지를 정밀 진단합니다.</p>
          </div>
          <Link to="/diagnosis" className="px-3.5 py-2 bg-[#0050FF] hover:bg-blue-600 text-white font-black text-xs rounded-xl flex items-center gap-1 shrink-0 transition-colors">
            <ClipboardCheck size={12} /> 진단 Go
          </Link>
        </div>
      </div>

      {/* 2. 지도 영역 (카카오맵 디바이스 및 Mock 맵 하이브리드) */}
      <div className="flex-1 relative bg-surface overflow-hidden">
        
        {/* SDK 로딩 또는 폴백 안내 헤더 오버레이 */}
        <div className="absolute top-6 left-6 z-20 flex flex-col md:flex-row md:items-center gap-3">
          <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3 max-w-md">
            <div className={`w-3 h-3 rounded-full ${(!kakaoError && kakaoLoaded) ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`}></div>
            <div className="space-y-0.5 text-xs">
              <p className="font-black text-gray-800">
                {(!kakaoError && kakaoLoaded) ? '카카오맵(Kakao Maps) 로딩 완료' : '카카오맵 API 미설정 상태 안내'}
              </p>
              <p className="text-[10px] text-gray-400">
                {(!kakaoError && kakaoLoaded) 
                  ? '제공 키 기반 실제 지도가 출력 중입니다.' 
                  : '가상 지도입니다. 아무 위치를 누르시면 가장 가까운 지하철역을 즉시 계산합니다!'}
              </p>
            </div>
            {kakaoError && (
              <div className="text-[9px] bg-amber-50 text-amber-600 font-bold p-1 rounded">Interactive Simulator</div>
            )}
          </div>
          
          <div className="bg-[#EC4899]/10 text-[#EC4899] border border-[#EC4899]/20 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl text-xs font-black flex items-center gap-1.5 animate-pulse">
            <span>📍</span>
            <span>지도 위를 클릭하시면 ‘내가 선택한 후보지’ 기준 지하철역 도보 거리가 자동 연산됩니다!</span>
          </div>
        </div>

        {/* 실시간 보행시간 연산 정보 카드 (사용자가 클릭 시 오버레이 표출) */}
        {nearestStation && customPlacedPoint && (
          <div className="absolute top-28 md:top-24 right-6 z-30 bg-white border border-[#E1007E]/10 p-5 rounded-2xl shadow-2xl max-w-sm flex flex-col gap-3">
            <div className="flex justify-between items-start border-b border-gray-50 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E1007E] animate-pulse"></span>
                <span className="text-[11px] font-black tracking-wide text-[#E1007E] uppercase">
                  후보지 역세권 실시간 거리 연산
                </span>
              </div>
              <button 
                onClick={() => {
                  setCustomPlacedPoint(null);
                  setNearestStation(null);
                  if (customMarkerRef.current) customMarkerRef.current.setMap(null);
                  if (customPolylineRef.current) customPolylineRef.current.setMap(null);
                }}
                className="text-[10px] bg-gray-50 text-gray-400 hover:text-gray-600 px-2 py-0.5 rounded font-black cursor-pointer transition-colors"
              >
                핀 초기화 ✕
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-gray-900 leading-none">
                도보 약 <span className="text-[#E1007E] font-black">{nearestStation.timeWalking}</span>분 소요
              </h3>
              <p className="text-xs text-gray-500 font-bold leading-normal">
                선택 장소에서 가장 가까운역 : <span className="text-gray-800 font-black">{nearestStation.name}</span>
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl space-y-1 text-[11px] text-gray-500 leading-relaxed font-bold border border-gray-100">
              <div className="flex justify-between items-center text-gray-400">
                <span>직선 보행 거리:</span>
                <span className="text-gray-700 font-black">{nearestStation.distance.toLocaleString()}m</span>
              </div>
              <div className="flex justify-between items-center text-gray-400">
                <span>자전거 이용시 한도:</span>
                <span className="text-[#E1007E] font-black">약 {Math.max(1, Math.round(nearestStation.timeWalking / 4))}분</span>
              </div>
            </div>

            <p className="text-[9px] text-gray-400 font-medium">
              ※ 임의 보도 한계 통과율을 기반으로 한 도보(70m/분) 환산이며, 도로 사정에 의해 다소 다를 수 있습니다.
            </p>
          </div>
        )}

        {/* 줌 컨트롤 / 내위치 리셋 */}
        <div className="absolute bottom-10 right-6 z-20 flex flex-col gap-2">
          <button 
            onClick={zoomIn}
            className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-50 active:scale-95 transition-all border border-gray-100"
          >
            <Plus size={20} />
          </button>
          <button 
            onClick={zoomOut}
            className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-50 active:scale-95 transition-all border border-gray-100"
          >
            <Minus size={20} />
          </button>
          <button 
            onClick={resetLocation}
            className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-600 hover:text-primary hover:bg-gray-50 active:scale-95 transition-all border border-gray-100"
          >
            <Navigation size={20} />
          </button>
        </div>

        {/* 실제 카카오 지도 영역 */}
        <div 
          ref={mapContainerRef} 
          style={{ display: (!kakaoError && kakaoLoaded) ? 'block' : 'none' }}
          className="w-full h-full absolute inset-0 z-0 bg-surface"
        ></div>

        {/* 폴백: 디자이너 시뮬레이터 Mock 지도 자율 뷰포트 그리기 */}
        {(kakaoError || !kakaoLoaded) && (
          <div 
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsDragging(false)}
            className="w-full h-full absolute inset-0 z-0 select-none cursor-grab active:cursor-grabbing overflow-hidden bg-[#ECECEF]"
          >
            <div 
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.1, 0.8, 0.2, 1)'
              }}
              className="absolute w-[1800px] h-[1200px] bg-[#E4E4E8] border border-gray-200"
            >
              <div className="absolute inset-0 opacity-[0.25]" style={{ 
                backgroundImage: 'radial-gradient(#1C1C1E 1px, transparent 1px)', 
                backgroundSize: '36px 36px' 
              }}></div>
              
              {/* 한강 및 지하철 노선 드로잉 */}
              <svg className="absolute inset-0 pointer-events-none w-full h-full">
                <path 
                  d="M100,500 C400,520 700,580 900,550 C1100,520 1300,480 1700,420" 
                  fill="none" 
                  stroke="#A5C7F7" 
                  strokeWidth="60" 
                  strokeLinecap="round" 
                  opacity="0.85"
                />
                
                <path d="M400,200 L400,1000" stroke="#DDDDDF" strokeWidth="2" strokeDasharray="6,6" />
                <path d="M1100,200 L1100,1000" stroke="#DDDDDF" strokeWidth="2" strokeDasharray="6,6" />
                
                <text x="750" y="320" fill="#999AA2" fontSize="14" fontWeight="800">서울 중구</text>
                <text x="350" y="320" fill="#999AA2" fontSize="14" fontWeight="800">마포구</text>
                <text x="950" y="750" fill="#999AA2" fontSize="14" fontWeight="800">강남구</text>
                <text x="1350" y="720" fill="#999AA2" fontSize="14" fontWeight="800">송파구 / 위례신도시</text>
                <text x="250" y="650" fill="#999AA2" fontSize="14" fontWeight="800">동작구 / 여의도</text>

                <path 
                  d="M250,380 L520,380 L750,420 L1020,450" 
                  fill="none" 
                  stroke="#5FBA5A" 
                  strokeWidth="4" 
                  strokeDasharray="4,4"
                  opacity="0.6"
                />

                {/* 임의 선택한 후보지와 지하철역 사이 가상 연결 점선 드로잉 */}
                {customPlacedPoint && activeStationCoords && (
                  <line 
                    x1={customPlacedPoint.x} 
                    y1={customPlacedPoint.y} 
                    x2={activeStationCoords.mockX} 
                    y2={activeStationCoords.mockY} 
                    stroke="#E1007E" 
                    strokeWidth="4" 
                    strokeDasharray="8,6" 
                  />
                )}
              </svg>

              {/* 지하철역 핀 가상 표시 */}
              <div className="absolute left-[330px] top-[372px] bg-white text-gray-500 font-black text-[9px] px-2 py-1 rounded shadow-md border border-gray-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5FBA5A]"></span>공덕역 (5호선)
              </div>
              <div className="absolute left-[880px] top-[715px] bg-white text-gray-500 font-black text-[9px] px-2 py-1 rounded shadow-md border border-gray-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]"></span>수서역 (SRT)
              </div>
              <div className="absolute left-[200px] top-[610px] bg-white text-gray-500 font-black text-[9px] px-2 py-1 rounded shadow-md border border-gray-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3F51B5]"></span>보라매역 (7호선)
              </div>
              <div className="absolute left-[120px] top-[820px] bg-white text-gray-500 font-black text-[9px] px-2 py-1 rounded shadow-md border border-gray-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E60FF]"></span>오류동역 (1호선)
              </div>

              {/* 필터링된 단지 마커 표시 */}
              {filteredComplexes.map((item) => {
                const isSelected = item.id === selectedComplex.id;
                const color = item.status === '공고중' ? '#0050FF' : item.status === '공고예정' ? '#FF9500' : '#8E8E93';
                const mockX = item.scaleX * 1300 + 100;
                const mockY = item.scaleY * 800 + 100;

                return (
                  <div 
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedComplex(item);
                    }}
                    style={{
                      left: `${mockX}px`,
                      top: `${mockY}px`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-[120%] cursor-pointer select-none transition-all duration-300"
                  >
                    <div className="relative filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] group">
                      <div 
                        style={{
                          borderColor: color,
                          background: isSelected ? '#1C1C1E' : '#FFFFFF',
                          color: isSelected ? '#FFFFFF' : '#1C1C1E',
                        }}
                        className={`font-black text-[11px] px-4 py-2.5 rounded-2xl whitespace-nowrap flex items-center gap-2 border-2 transition-all duration-300 scale-100 hover:scale-105 active:scale-95`}
                      >
                        <span style={{ color }} className="text-xs animate-ping absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-current opacity-75"></span>
                        <span style={{ backgroundColor: color }} className="w-2 h-2 rounded-full inline-block shrink-0"></span>
                        <div className="text-left leading-normal">
                          <p className="text-[10px] font-black opacity-8 w-fit">{item.type}</p>
                          <p className="text-[12px] font-black">{item.name.split(' (')[0]}</p>
                          <p className="text-[10px] font-bold mt-0.5" style={{ color: isSelected ? '#FFFFFF' : color }}>{item.price.split(' ')[0]} {item.price.split(' ')[1]}</p>
                        </div>
                      </div>
                      <div 
                        style={{
                          borderTopColor: isSelected ? '#1C1C1E' : '#FFFFFF'
                        }}
                        className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] absolute left-1/2 -translate-x-1/2 top-full"
                      ></div>
                    </div>
                  </div>
                );
              })}

              {/* 사용자가 임의클릭해 찍은 핑 마커 렌더링 (Mock 모드 전용) */}
              {customPlacedPoint && (
                <div 
                  style={{
                    left: `${customPlacedPoint.x}px`,
                    top: `${customPlacedPoint.y}px`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-[120%] cursor-pointer select-none filter drop-shadow-[0_4px_12px_rgba(225,0,126,0.25)] z-20"
                >
                  <div className="bg-[#E1007E] text-white font-black text-[11px] px-4 py-2.5 rounded-2xl whitespace-nowrap flex items-center gap-2 border-2 border-white scale-100 hover:scale-105 transition-all">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    ⏰ 내가 찍은 위치
                  </div>
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#E1007E] absolute left-1/2 -translate-x-1/2 top-full"></div>
                </div>
              )}

            </div>

            {/* Mock 지도 오버레이 드래그 안내 */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl border border-white/20 text-xs font-bold text-gray-500 whitespace-nowrap z-10 flex items-center gap-2">
              <span className="text-xs bg-gray-100 p-1.5 rounded-xl text-gray-600 block shrink-0">도움말</span>
              마우스를 클릭한 채 드래그하여 지도를 이동할 수 있고, 빈 곳을 클릭하면 임의 후보지 핑이 생겨 지하철역까지 도보시간이 계산됩니다.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
