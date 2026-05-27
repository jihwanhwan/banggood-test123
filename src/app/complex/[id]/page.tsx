"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Info, ChevronRight, HelpCircle, FileText, ArrowLeft, Heart, Share2, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// 공고 단지 상세 데이터베이스 세팅 (각 ID별 정교한 입체 매핑)
const complexDetailsDatabase: Record<string, {
  title: string;
  address: string;
  subwayText: string;
  pdfName: string;
  lat: number;
  lng: number;
  provider: string;
  imageUrl?: string;
  subwayStationName?: string;
  subwayDistanceMeter?: number;
  subwayMinutes?: number;
  subwayLines?: string[];
  detailedOverview?: string;
  detailedPoints?: string[];
  roomTypes: Record<string, {
    recruitCount: string;
    publicArea: string;
    privateArea: string;
    heating: string;
    maxPeriod: string;
    roomSize: string;
    targets: string;
    pricing: Array<{
      category: string;
      maxDeposit: string;
      maxRent: string;
      baseDeposit: string;
      baseDepositContract: string;
      baseRent: string;
      minDeposit: string;
      minRent: string;
    }>;
  }>;
}> = {
  '1': {
    title: 'LH 강남 브리즈힐 (국민임대)',
    address: '서울특별시 강남구 자곡로 3길 22',
    subwayText: '수서역 3호선, 920m (도보 13분)',
    pdfName: '#강남브리즈힐국민임대예비입주자모집2026.05.15.pdf',
    lat: 37.467438,
    lng: 127.098482,
    provider: 'LH공사',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    subwayStationName: '수서역',
    subwayDistanceMeter: 920,
    subwayMinutes: 13,
    subwayLines: ['3', '수인분당', 'SRT'],
    detailedOverview: 'LH 강남 브리즈힐은 강남의 풍부한 녹지 환경과 수서역세권 개발 호재를 동시에 누릴 수 있는 고품격 공공임대 대단지입니다. 자곡동 특유의 명문 학군지 인접성과 쾌적한 에코 힐링 거주환경으로 신혼부부 및 가점 우수 청년층에게 최고 인기를 모으고 있습니다.',
    detailedPoints: [
      '쾌적한 대모산 자락 자연 친화적 숲세권 입지',
      '수서역 GTX-A 및 복합환승센터 개발 직접 수혜지',
      '세곡중, 풍문고 등 우수한 강남 학군 배정 가능'
    ],
    roomTypes: {
      '39형 대학생, 청년계층': {
        recruitCount: '45호',
        publicArea: '22.3412㎡',
        privateArea: '39.8400㎡',
        heating: '지역난방/기타',
        maxPeriod: '10년',
        roomSize: '39형',
        targets: '대학생, 청년계층',
        pricing: [
          {
            category: '대학생',
            maxDeposit: '112,000,000원',
            maxRent: '124,000원',
            baseDeposit: '72,000,000원',
            baseDepositContract: '7,200,000원',
            baseRent: '320,000원',
            minDeposit: '15,000,000원',
            minRent: '485,000원'
          },
          {
            category: '청년',
            maxDeposit: '118,500,000원',
            maxRent: '135,000원',
            baseDeposit: '76,500,000원',
            baseDepositContract: '7,650,000원',
            baseRent: '344,000원',
            minDeposit: '16,200,000원',
            minRent: '512,000원'
          }
        ]
      },
      '46형 청년, 신혼부부': {
        recruitCount: '30호',
        publicArea: '28.1154㎡',
        privateArea: '46.5400㎡',
        heating: '지역난방/기타',
        maxPeriod: '10년 (자녀 있을 시 14년)',
        roomSize: '46형',
        targets: '청년계층, 신혼부부',
        pricing: [
          {
            category: '청년',
            maxDeposit: '136,000,000원',
            maxRent: '155,000원',
            baseDeposit: '88,000,000원',
            baseDepositContract: '8,800,000원',
            baseRent: '395,000원',
            minDeposit: '18,500,000원',
            minRent: '570,000원'
          },
          {
            category: '신혼부부',
            maxDeposit: '148,000,000원',
            maxRent: '168,000원',
            baseDeposit: '96,000,000원',
            baseDepositContract: '9,600,000원',
            baseRent: '430,000원',
            minDeposit: '20,000,000원',
            minRent: '620,000원'
          }
        ]
      }
    }
  },
  '2': {
    title: '마포 펜트라우스 (행복주택)',
    address: '서울특별시 마포구 백범로 205',
    subwayText: '공덕역 5/6호선·경의중앙·공항철도, 110m (도보 2분)',
    pdfName: '#마포펜트라우스공덕역세권예비입주자모집2026.05.15.pdf',
    lat: 37.545803,
    lng: 126.953123,
    provider: 'SH공사',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    subwayStationName: '공덕역',
    subwayDistanceMeter: 110,
    subwayMinutes: 2,
    subwayLines: ['5', '6', '경의중앙', '공항철도'],
    detailedOverview: '공덕역 초역세권 거대 인프라의 마포 펜트라우스는 마포, 여의도, 광화문 등 서울 3대 도심 비즈니스권과의 압도적인 직주근접성을 보장합니다. 뛰어난 쇼핑 복합상가 인프라와 세련된 도시 주거 환경을 함께 가질 수 있는 최상의 입지입니다.',
    detailedPoints: [
      '4개 지하철 노선 초인접 (도보 2분 쿼드러플 역세권)',
      '여의도 및 광화문 중심업무지구 10분대 출퇴근 보장',
      '이마트, 신촌·신촌현백 테마 상업시설 풍부'
    ],
    roomTypes: {
      '16형 대학생, 청년계층': {
        recruitCount: '85호',
        publicArea: '16.9532㎡',
        privateArea: '16.8900㎡',
        heating: '도시가스/개별난방',
        maxPeriod: '6년',
        roomSize: '16형',
        targets: '대학생, 청년계층',
        pricing: [
          {
            category: '대학생',
            maxDeposit: '82,400,000원',
            maxRent: '94,000원',
            baseDeposit: '54,000,000원',
            baseDepositContract: '5,400,000원',
            baseRent: '235,000원',
            minDeposit: '9,800,000원',
            minRent: '360,000원'
          },
          {
            category: '청년',
            maxDeposit: '87,200,000원',
            maxRent: '102,000원',
            baseDeposit: '58,000,000원',
            baseDepositContract: '5,800,000원',
            baseRent: '252,000원',
            minDeposit: '10,400,000원',
            minRent: '382,000원'
          }
        ]
      },
      '29형 청년, 주거급여수급자': {
        recruitCount: '45호',
        publicArea: '28.1500㎡',
        privateArea: '29.4300㎡',
        heating: '도시가스/개별난방',
        maxPeriod: '10년',
        roomSize: '29형',
        targets: '청년, 주거급여수급자',
        pricing: [
          {
            category: '청년',
            maxDeposit: '154,000,000원',
            maxRent: '180,000원',
            baseDeposit: '102,000,000원',
            baseDepositContract: '10,200,000원',
            baseRent: '445,000원',
            minDeposit: '22,000,000원',
            minRent: '685,000원'
          },
          {
            category: '주거급여수급자',
            maxDeposit: '132,000,000원',
            maxRent: '154,000원',
            baseDeposit: '87,000,000원',
            baseDepositContract: '8,700,000원',
            baseRent: '380,000원',
            minDeposit: '18,500,000원',
            minRent: '580,000원'
          }
        ]
      }
    }
  },
  '3': {
    title: '위례 포레스트 (국민임대)',
    address: '경기도 하남시 위례대로 100',
    subwayText: '복정역 8호선, 1.4km (도보 20분 / 집앞 버스 바로 연결)',
    pdfName: '#위례포레스트국민임대입주자모집공고2026.05.15.pdf',
    lat: 37.478954,
    lng: 127.151322,
    provider: 'LH공사',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    subwayStationName: '복정역',
    subwayDistanceMeter: 1400,
    subwayMinutes: 20,
    subwayLines: ['8', '수인분당'],
    detailedOverview: '위례신도시 중심 축에 빛나는 위례 포레스트는 쾌적한 숲세권 설계와 최신 평면 특허 디자인이 도입된 단지입니다. 복정역 및 송파IC 고속망 접근이 용이하고 신도시 특유의 정돈된 인프라를 만끽할 수 있는 실거주 최선호 단지입니다.',
    detailedPoints: [
      '위례 트램 신설 개발 호재 및 스타필드시티 인접',
      '송파 명품 그린 라이프 (장지천 수변공원 인근)',
      '국민임대 장기 전세 전환의 탁월한 주거안정성 보장'
    ],
    roomTypes: {
      '46형 일반무주택, 신혼부부': {
        recruitCount: '120호',
        publicArea: '31.2210㎡',
        privateArea: '46.1200㎡',
        heating: '지역난방/열병합',
        maxPeriod: '30년 (영구 수준 장기 연장)',
        roomSize: '46형',
        targets: '일반 무주택세대, 신혼부부',
        pricing: [
          {
            category: '일반무주택',
            maxDeposit: '115,000,000원',
            maxRent: '120,000원',
            baseDeposit: '65,000,000원',
            baseDepositContract: '6,500,000원',
            baseRent: '340,000원',
            minDeposit: '15,000,000원',
            minRent: '510,000원'
          },
          {
            category: '신혼부부',
            maxDeposit: '128,000,000원',
            maxRent: '135,000원',
            baseDeposit: '72,000,000원',
            baseDepositContract: '7,200,000원',
            baseRent: '375,000원',
            minDeposit: '17,000,000원',
            minRent: '560,000원'
          }
        ]
      }
    }
  },
  '4': {
    title: '수서 역세권 A1단지 (장기전세)',
    address: '서울특별시 강남구 수서동 730',
    subwayText: '수서역 SRT·3호선·수인분당·GTX-A, 190m (도보 3분)',
    pdfName: '#수서역세권A1장기전세입주자예비모집2026.05.15.pdf',
    lat: 37.487712,
    lng: 127.101734,
    provider: 'LH공사',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    subwayStationName: '수서역',
    subwayDistanceMeter: 190,
    subwayMinutes: 3,
    subwayLines: ['3', '수인분당', 'SRT', 'GTX-A'],
    detailedOverview: '수서역 복합 고밀 환승 개발 지구 정중앙에 최고 랜드마크로 설계되는 시그니처 단지입니다. 압도적 교통 인프라뿐 아니라 입주 시 공급가 대비 전세 보장 비율이 탁월하여, 장기 거주의 명품 주거 평면에 응모할 수 있는 최상의 기회입니다.',
    detailedPoints: [
      '수서역 복합 환승 인프라 초밀착 랜드마크 혜택',
      '강남 신축 입지 대비 보증금 거품 최소화 (SH 장기전세)',
      '쾌적한 탄천 및 자곡 근린공원 연결 녹지 레이아웃'
    ],
    roomTypes: {
      '59형 신혼부부, 일반무주택': {
        recruitCount: '210호',
        publicArea: '38.4500㎡',
        privateArea: '59.8800㎡',
        heating: '지역난방/기타',
        maxPeriod: '20년 (장기 무주택 안심 특공)',
        roomSize: '59형',
        targets: '신혼부부, 고령자, 일반',
        pricing: [
          {
            category: '신혼특공',
            maxDeposit: '280,000,000원',
            maxRent: '0원 (올 전세 한정)',
            baseDeposit: '240,000,000원',
            baseDepositContract: '24,000,000원',
            baseRent: '0원 (전환 무관)',
            minDeposit: '80,000,000원',
            minRent: '580,000원 (상호조율 전환시)'
          },
          {
            category: '일반무주택',
            maxDeposit: '298,000,000원',
            maxRent: '0원',
            baseDeposit: '255,000,000원',
            baseDepositContract: '25,500,000원',
            baseRent: '0원',
            minDeposit: '90,000,000원',
            minRent: '610,000원'
          }
        ]
      }
    }
  },
  // 공고판 게시판 단지 연동 매핑
  '535': {
    title: '장기전세 힐스테이트 동작 시그니처',
    address: '서울특별시 동작구 사당로 90',
    subwayText: '사당역 2/4호선, 350m (도보 5분)',
    pdfName: '#장기전세힐스테이트동작시그니처입주자모집공고.pdf',
    lat: 37.4764,
    lng: 126.9816,
    provider: 'SH공사',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    subwayStationName: '사당역',
    subwayDistanceMeter: 350,
    subwayMinutes: 5,
    subwayLines: ['2', '4'],
    detailedOverview: '힐스테이트 동작 시그니처는 남성역과 사당역 더블 역세권에 위치하여 강남권과 여의도로의 연계성이 대단히 뛰어납니다. 1,500세대급 고품격 신축 아파트 커뮤니티 시설을 장기전세 임대가로 누리실 수 있어 동작구 최고의 로또 전세 공고로 각광받고 있습니다.',
    detailedPoints: [
      '사당역(2·4호선) 더블 초역세권 도보 5분',
      '신축 대단지 브랜드 자존심에 걸맞은 명품 조경 및 지하 주차장',
      '사당동 주변 우수 명문 학군지 및 풍부한 생활 인프라 연접'
    ],
    roomTypes: {
      '59형 신혼특공, 일반': {
        recruitCount: '48호',
        publicArea: '39.2200㎡',
        privateArea: '59.9500㎡',
        heating: '개별난방/도시가스',
        maxPeriod: '20년 (안심 장기 임대 보증)',
        roomSize: '59형',
        targets: '신혼부부, 일반 무주택자',
        pricing: [
          {
            category: '일반공급',
            maxDeposit: '320,000,000원',
            maxRent: '0원 (올 전세 계약)',
            baseDeposit: '280,000,000원',
            baseDepositContract: '28,000,000원',
            baseRent: '0원',
            minDeposit: '100,000,000원',
            minRent: '640,000원'
          }
        ]
      }
    }
  },
  '534': {
    title: '장기전세 엘리프 미아역',
    address: '서울특별시 강북구 도봉로 115',
    subwayText: '미아역 4호선, 150m (도보 2분)',
    pdfName: '#장기전세엘리프미아역입주자모집공고.pdf',
    lat: 37.6258,
    lng: 127.0256,
    provider: 'SH공사',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    subwayStationName: '미아역',
    subwayDistanceMeter: 150,
    subwayMinutes: 2,
    subwayLines: ['4'],
    detailedOverview: '엘리프 미아역은 지하철 4호선 미아역 초역세권에 지어지는 신축 랜드마크 아파트입니다. 뛰어난 평면 설계와 탁 트인 조망감을 가지고 있으며, 서울 서북권을 종단하는 철도망 혜택으로 동대문과 시청, 혜화역 등 도심으로 매우 빠른 진입이 가능합니다.',
    detailedPoints: [
      '미아역 초역세권 도보 2분의 압도적 해방감',
      '전 타입 발코니 확장형 명품 스마트 레이아웃 구축',
      '대형마트 및 롯데백화점 미아점 등 대형 거점 상권 완전 흡수'
    ],
    roomTypes: {
      '49형 청년, 신혼 가구': {
        recruitCount: '25호',
        publicArea: '32.1240㎡',
        privateArea: '49.8800㎡',
        heating: '개별난방',
        maxPeriod: '10년',
        roomSize: '49형',
        targets: '청년층, 신혼부부',
        pricing: [
          {
            category: '청년우선',
            maxDeposit: '185,000,000원',
            maxRent: '120,000원',
            baseDeposit: '112,000,000원',
            baseDepositContract: '11,200,000원',
            baseRent: '360,000원',
            minDeposit: '28,000,000원',
            minRent: '540,000원'
          }
        ]
      }
    }
  },
  '533': {
    title: '장기전세 동작 보라매역 프리센트',
    address: '서울특별시 동작구 신대방동 355',
    subwayText: '보라매역 7호선/신림선, 200m (도보 3분)',
    pdfName: '#장기전세동작보라매역프리센트입주자모집.pdf',
    lat: 37.4998,
    lng: 126.9205,
    provider: 'SH공사',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    subwayStationName: '보라매역',
    subwayDistanceMeter: 200,
    subwayMinutes: 3,
    subwayLines: ['7', '신림'],
    detailedOverview: '7호선과 신림선 더블 역세권에 빛나는 동작 보라매역 프리센트 장기전세 주택입니다. 여의도 금융가와 가산 디지털단지 양대 일자리를 10분 내로 이어주는 최적의 요충지이며 대규모 보라매공원을 정원마냥 누릴 수 있는 뛰어난 친자연적 조건입니다.',
    detailedPoints: [
      '여의도 신림선 통근 7분 및 강남 7호선 직결 교통지',
      '서울 대표 여가 명소 보라매공원 도보 5분 쾌적권',
      '풍부한 보라매병원 대학병원급 의료 밀착 인프라 확보'
    ],
    roomTypes: {
      '59형 신혼부부, 일반': {
        recruitCount: '32호',
        publicArea: '38.9900㎡',
        privateArea: '59.9800㎡',
        heating: '지역난방',
        maxPeriod: '20년',
        roomSize: '59형',
        targets: '신혼 가구, 무주택세대주',
        pricing: [
          {
            category: '신혼부부',
            maxDeposit: '260,000,000원',
            maxRent: '0원',
            baseDeposit: '220,000,000원',
            baseDepositContract: '22,000,000원',
            baseRent: '0원',
            minDeposit: '70,000,000원',
            minRent: '520,000원'
          }
        ]
      }
    }
  },
  '532': {
    title: '리마크빌 구로 (청년안심주택)',
    address: '서울특별시 구로구 디지털로32길 97',
    subwayText: '구로디지털단지역 2호선, 400m (도보 6분)',
    pdfName: '#2026년1차청년안심주택구로리마크빌공고.pdf',
    lat: 37.4852,
    lng: 126.8986,
    provider: '지자체',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    subwayStationName: '구로디지털단지역',
    subwayDistanceMeter: 400,
    subwayMinutes: 6,
    subwayLines: ['2'],
    detailedOverview: '리마크빌 구로는 가산 및 구로디지털밸리 중심의 풍부한 청년 일자리를 타겟으로 마련된 기업형 우수 안심주택입니다. 내부 풀옵션 빌트인 시스템과 최고급 조식 서비스, 무인 택배, 북카페 등 호텔급 어메니티를 전액 지원 가격으로 누릴 수 있습니다.',
    detailedPoints: [
      'G밸리 IT 융합산업단지 바로 도보 통근 최적 입지',
      '몸만 들어오는 풀빌트인 풀옵션(빌트인 냉장고, 드럼세탁기 등)',
      '안심 보안 시스템 완비로 안전한 청년 안심 라이프 스타일'
    ],
    roomTypes: {
      '19형 청년 특화 원룸': {
        recruitCount: '115호',
        publicArea: '18.9900㎡',
        privateArea: '19.4500㎡',
        heating: '개별난방',
        maxPeriod: '8년(임대 보증 연장형)',
        roomSize: '19형',
        targets: '청년층 단독 가구',
        pricing: [
          {
            category: '청년안심',
            maxDeposit: '68,000,000원',
            maxRent: '120,000원',
            baseDeposit: '48,000,000원',
            baseDepositContract: '4,800,000원',
            baseRent: '210,000원',
            minDeposit: '10,000,000원',
            minRent: '370,000원'
          }
        ]
      }
    }
  },
  '531': {
    title: '서울 송파 매입임대주택 Ⅰ (신혼·신생아)',
    address: '서울특별시 송파구 송파동 120',
    subwayText: '송파역 8호선, 510m (도보 7분)',
    pdfName: '#신혼신생아매입임대주택송파동입주대기모집.pdf',
    lat: 37.5028,
    lng: 127.1122,
    provider: 'LH공사',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    subwayStationName: '송파역',
    subwayDistanceMeter: 510,
    subwayMinutes: 7,
    subwayLines: ['8'],
    detailedOverview: '송파 신혼 실생활 거점 매입 주택은 송파초와 중·고교가 완벽히 포위한 자금 중심 명당에 소재한 신혼부부·신생아 특공 정밀 주택지입니다. 올 가구 신축급 보수가 완결되었으며, 헬리오시티 거대 대규모 단지 인프라를 모두 근접 수혜하는 최상 주거지입니다.',
    detailedPoints: [
      '송파초 도보 3분의 안심 어린이 초품아급 케어 환경',
      '신생아 가구 소득 맞춤 추가 자격 우대 특례 적용 단지',
      '제2롯데월드 타워 및 석촌호수 공원 연결 여가 편익 확보'
    ],
    roomTypes: {
      '55형 쓰리룸 가족형': {
        recruitCount: '15호',
        publicArea: '41.2000㎡',
        privateArea: '55.9900㎡',
        heating: '도시가스',
        maxPeriod: '20년 (아이 한 명 출산당 4년 연장)',
        roomSize: '55형',
        targets: '신혼부부, 예비 신혼, 신생아 가구',
        pricing: [
          {
            category: '신혼/신생아',
            maxDeposit: '198,000,000원',
            maxRent: '180,000원',
            baseDeposit: '135,000,000원',
            baseDepositContract: '13,500,000원',
            baseRent: '410,000원',
            minDeposit: '35,000,000원',
            minRent: '820,000원'
          }
        ]
      }
    }
  },
  '530': {
    title: '해링턴플레이스 노원 센트럴 (장기전세)',
    address: '서울특별시 노원구 상계동 110',
    subwayText: '노원역 4/7호선, 600m (도보 9분)',
    pdfName: '#해링턴플레이스노원센트럴모집공고.pdf',
    lat: 37.6548,
    lng: 127.0608,
    provider: 'LH공사',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    subwayStationName: '노원역',
    subwayDistanceMeter: 600,
    subwayMinutes: 9,
    subwayLines: ['4', '7'],
    detailedOverview: '노원 중심 학군과 사통팔달 교통을 평정한 해링턴플레이스 노원 센트럴입니다. GTX-C 창동역 연계의 어마어마한 전방 호재를 안고 있으며 노원역 상권 중심의 풍요로운 생활 문화 혜택과 중계동 학원가 교육지 혜택을 온전히 가질 수 있습니다.',
    detailedPoints: [
      '노원역 대표 4·7호선 더블 이동 허브 도보권',
      '창동역 GTX 복합 개발 지구 배후 시너지 수혜 직접 타겟칭',
      '상계·중계동 최고의 중고교 명품 학원가 및 교육 시설 밀착'
    ],
    roomTypes: {
      '59형 명품 아파트 전세': {
        recruitCount: '12호',
        publicArea: '39.4400㎡',
        privateArea: '59.8800㎡',
        heating: '열병합/지역난방',
        maxPeriod: '20년(안심거주 보증)',
        roomSize: '59형',
        targets: '무주택 신혼부부, 고령자 가구 등',
        pricing: [
          {
            category: '일반 장전',
            maxDeposit: '240,000,000원',
            maxRent: '0원 (초저가 전세 분양)',
            baseDeposit: '198,000,000원',
            baseDepositContract: '19,800,000원',
            baseRent: '0원',
            minDeposit: '60,000,000원',
            minRent: '450,000원'
          }
        ]
      }
    }
  },
  '529': {
    title: '행복주택 이문3 복합공공청사',
    address: '서울특별시 동대문구 이문로 136',
    subwayText: '외대앞역 1호선, 280m (도보 4분)',
    pdfName: '#이문3복합공공청사행복주택입주모집공고.pdf',
    lat: 37.5954,
    lng: 127.0628,
    provider: 'LH공사',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    subwayStationName: '외대앞역',
    subwayDistanceMeter: 280,
    subwayMinutes: 4,
    subwayLines: ['1'],
    detailedOverview: '외대앞역 행복주택 이문3구역 복합 청사입니다. 외대역 상업지구와 대학가의 활발한 영 타운 시너지를 배경으로 설계되어 청년 계층과 대학생을 위한 최선의 쉐어 인프라를 지니고 있습니다. 공공 청사가 단지 하층부에 인입되어 보안 및 공적 연계 민원이 매끄럽습니다.',
    detailedPoints: [
      '외대앞역 초인접 도보 4분의 캠퍼스타운 배후 교통지',
      '경희대, 한국외대, 한예종 등 서울 주요 메이저 캠퍼스권 직접 근접',
      '공유 부엌, 스터디 플레이스 등 유스 맞춤 최신 커뮤니티'
    ],
    roomTypes: {
      '26형 청년, 대학생': {
        recruitCount: '65호',
        publicArea: '21.4150㎡',
        privateArea: '26.8500㎡',
        heating: '도시가스',
        maxPeriod: '6년 (취업 시 연장 가치 확장)',
        roomSize: '26형',
        targets: '청년, 대학생 층 가구',
        pricing: [
          {
            category: '캠퍼스우선',
            maxDeposit: '88,000,000원',
            maxRent: '85,000원',
            baseDeposit: '55,000,000원',
            baseDepositContract: '5,500,000원',
            baseRent: '230,000원',
            minDeposit: '12,000,000원',
            minRent: '390,000원'
          }
        ]
      }
    }
  },
  '528': {
    title: '파주 운정 민간임대',
    address: '경기도 파주시 경의로 1200',
    subwayText: '야당역 경의중앙선, 850m (도보 12분)',
    pdfName: '#파주운정임대주택입주자추가모집.pdf',
    lat: 37.7554,
    lng: 126.7628,
    provider: '민간임대',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    subwayStationName: '야당역',
    subwayDistanceMeter: 850,
    subwayMinutes: 12,
    subwayLines: ['경의중앙선'],
    detailedOverview: '파주 야당동의 정돈된 인프라와 신도시 호재를 누릴 수 있는 고밀 민간 임대주택입니다. 거주의 가치와 인프라 분산 배분이 조화롭게 마크된 미래지향 파주 라이프를 시작하는 최선의 타협 조건입니다. GTX-A 노선 운정역 연결 셔틀망이 완비되어 가치가 크게 폭등하는 중입니다.',
    detailedPoints: [
      '경의선 야당역 연접 및 복합 역세권 상가 밀집 혜택',
      'GTX-A 2026년 완전 개통 수혜 (강남 삼성역 20분대 도달 예정)',
      '청약가점 무관 입주 우대 가이드 라인 완화 적용'
    ],
    roomTypes: {
      '59형 일반 신혼 가구': {
        recruitCount: '80호',
        publicArea: '39.8400㎡',
        privateArea: '59.9000㎡',
        heating: '지역난방',
        maxPeriod: '10년 (임대의무 거주분 보증)',
        roomSize: '59형',
        targets: '소득 무관 누구나 응모 가능',
        pricing: [
          {
            category: '일반모집',
            maxDeposit: '180,000,000원',
            maxRent: '150,000원',
            baseDeposit: '120,000,000원',
            baseDepositContract: '12,000,000원',
            baseRent: '340,000원',
            minDeposit: '30,000,000원',
            minRent: '610,000원'
          }
        ]
      }
    }
  },
  '527': {
    title: '송도 힐스테이트 테라스 (청년 민간임대)',
    address: '인천광역시 연수구 송도동 220',
    subwayText: '송도달빛축제공원역 인천1호선, 450m (도보 6분)',
    pdfName: '#송도힐스테이트테라스매입안심주택공고.pdf',
    lat: 37.3994,
    lng: 126.6228,
    provider: '민간임대',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
    subwayStationName: '송도달빛축제공원역',
    subwayDistanceMeter: 450,
    subwayMinutes: 6,
    subwayLines: ['인천1호선'],
    detailedOverview: '인천 송도국제도시 최고의 힐링 조망을 자랑하는 시그니처 테라스 임대주택입니다. 달빛축제공원역 역세권 장점에 바다 및 호수 수변 레이아웃 라이프를 소유할 수 있는 멋진 에코 테라스 대단지입니다. 청년 창업, 자영업, 1인 직장인 가구에 선호도 최상입니다.',
    detailedPoints: [
      '송도달빛축제공원 및 서해 수변 공원 도란도란 영글어가는 공세권',
      '인천1호선 연장으로 부평 및 부천, 시흥, 경기 핵심부 최속 연계',
      '외부 명품 대단지 조경과 테라스 제공으로 자유로운 1.5룸 생활 영위'
    ],
    roomTypes: {
      '39형 테라스형 1.5룸': {
        recruitCount: '45호',
        publicArea: '26.8500㎡',
        privateArea: '39.9800㎡',
        heating: '개별난방',
        maxPeriod: '10년 분양 전환 우대 보증',
        roomSize: '39형',
        targets: '안정 거주 선호 청년 직장인',
        pricing: [
          {
            category: '청년우대',
            maxDeposit: '145,000,000원',
            maxRent: '110,000원',
            baseDeposit: '95,000,000원',
            baseDepositContract: '9,500,000원',
            baseRent: '290,000원',
            minDeposit: '22,000,000원',
            minRent: '510,000원'
          }
        ]
      }
    }
  }
};

// 기본 오류동/금천 행복주택 (폴백용이자 이미지 속 극대화 명품 데이터)
const fallbackDetailData = {
  title: '서울오류 · 서울금천 행복주택',
  address: '서울특별시 구로구 경인로20가길 68',
  subwayText: '오류동역 1호선, 262m, 4분',
  pdfName: '#서울금천행복주택산업단지형예비입주자모집2026.05.15.pdf',
  lat: 37.4947,
  lng: 126.8453,
  provider: 'SH공사',
  imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  subwayStationName: '오류동역',
  subwayDistanceMeter: 262,
  subwayMinutes: 4,
  subwayLines: ['1'],
  detailedOverview: '서울오류 · 서울금천 행복주택은 젊은 계층의 주거비 경감을 위해 대중교통 이용이 매우 정밀하게 최적화된 철근콘크리트 구조의 특화 행복주택입니다. 남녀노소 누구나 편리하게 이동 가능한 1호선 역세권 장점을 선점하고 있으며 보증금 전환 이율 대비 실질 임대 조건이 극도로 우수합니다.',
  detailedPoints: [
    '오류동역 도보 4분의 초고속 지하철 출근 노선',
    '에코 정원, 북카페 등 쾌적한 청년 맞춤 커뮤니티 공간 완비',
    '주변 학업 및 비즈니스 특화 복합 편의 시설 인접'
  ],
  roomTypes: {
    '16형 대학생, 청년계층': {
      recruitCount: '50호',
      publicArea: '16.9313㎡',
      privateArea: '16.8400㎡',
      heating: '철근콘크리트/개별난방',
      maxPeriod: '10년',
      roomSize: '16형',
      targets: '대학생, 청년계층',
      pricing: [
        {
          category: '대학생',
          maxDeposit: '71,600,000원',
          maxRent: '82,300원',
          baseDeposit: '47,600,000원',
          baseDepositContract: '4,760,000원',
          baseRent: '202,300원',
          minDeposit: '8,600,000원',
          minRent: '316,050원'
        },
        {
          category: '청년',
          maxDeposit: '75,400,000원',
          maxRent: '89,200원',
          baseDeposit: '50,400,000원',
          baseDepositContract: '5,040,000원',
          baseRent: '214,200원',
          minDeposit: '8,400,000원',
          minRent: '336,700원'
        }
      ]
    },
    '26형 청년, 주거급여수급자': {
      recruitCount: '35호',
      publicArea: '25.6415㎡',
      privateArea: '26.1200㎡',
      heating: '철근콘크리트/개별난방',
      maxPeriod: '10년 (수급자 최대 20년)',
      roomSize: '26형',
      targets: '청년, 주거급여수급자',
      pricing: [
        {
          category: '청년계층',
          maxDeposit: '115,000,000원',
          maxRent: '124,000원',
          baseDeposit: '78,000,000원',
          baseDepositContract: '7,800,000원',
          baseRent: '310,000원',
          minDeposit: '14,000,000원',
          minRent: '480,000원'
        },
        {
          category: '수급자',
          maxDeposit: '98,000,000원',
          maxRent: '95,000원',
          baseDeposit: '65,000,000원',
          baseDepositContract: '6,500,000원',
          baseRent: '250,000원',
          minDeposit: '11,000,000원',
          minRent: '390,000원'
        }
      ]
    },
    '36형 신혼부부, 고령자계층': {
      recruitCount: '42호',
      publicArea: '35.4412㎡',
      privateArea: '36.8800㎡',
      heating: '철근콘크리트/개별난방',
      maxPeriod: '10년 (자녀있을 시 14년)',
      roomSize: '36형',
      targets: '신혼부부, 한부모가족, 고령자',
      pricing: [
        {
          category: '신혼부부',
          maxDeposit: '168,000,000원',
          maxRent: '178,000원',
          baseDeposit: '112,000,000원',
          baseDepositContract: '11,200,000원',
          baseRent: '450,000원',
          minDeposit: '18,000,000원',
          minRent: '680,000원'
        },
        {
          category: '고령자',
          maxDeposit: '152,000,000원',
          maxRent: '158,000원',
          baseDeposit: '102,000,000원',
          baseDepositContract: '10,200,000원',
          baseRent: '410,000원',
          minDeposit: '16,500,000원',
          minRent: '620,000원'
        }
      ]
    }
  }
};

export default function ComplexDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  // 데이터 불러오기 (ID 매칭 또는 오류동 행복주택 Fallback)
  const detailData = complexDetailsDatabase[id || ""] || fallbackDetailData;

  // 드롭다운 선택된 RoomType
  const roomTypeKeys = Object.keys(detailData.roomTypes);
  const [selectedRoomTypeKey, setSelectedRoomTypeKey] = useState(roomTypeKeys[0]);

  // 방 타입이 변경될 때 상태 갱신
  useEffect(() => {
    if (!roomTypeKeys.includes(selectedRoomTypeKey)) {
      setSelectedRoomTypeKey(roomTypeKeys[0]);
    }
  }, [id]);

  const currentRoomInfo = detailData.roomTypes[selectedRoomTypeKey] || detailData.roomTypes[roomTypeKeys[0]];

  // 카카오 맵 SDK 스크립트 로드 및 지도 렌더링
  const [kakaoLoaded, setKakaoLoaded] = useState(false);
  const [kakaoError, setKakaoError] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    if (!appKey) {
      setKakaoError(true);
      return;
    }

    if (window.hasOwnProperty('kakao') && (window as any).kakao.maps) {
      setKakaoLoaded(true);
      return;
    }

    const scriptId = 'kakao-maps-sdk-detail';
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

  // 지도 인스턴스 그리기
  useEffect(() => {
    if (!kakaoLoaded || !mapContainerRef.current) return;

    try {
      const container = mapContainerRef.current;
      const options = {
        center: new (window as any).kakao.maps.LatLng(detailData.lat, detailData.lng),
        level: 3,
      };

      const map = new (window as any).kakao.maps.Map(container, options);

      // 마커 생성
      const markerPosition = new (window as any).kakao.maps.LatLng(detailData.lat, detailData.lng);
      const marker = new (window as any).kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      // 인포윈도우 커스텀 말풍선 생성
      const iwContent = `
        <div style="padding:10px 14px; font-family: Pretendard,sans-serif; text-align:center; min-width:180px;">
          <p style="font-weight:900; font-size:12px; margin:0; color:#1e60ff;">${detailData.title}</p>
          <p style="font-weight:700; font-size:10px; margin:4px 0 0; color:#888;">${currentRoomInfo.roomSize} 청약공정 단지</p>
        </div>
      `;
      const infowindow = new (window as any).kakao.maps.InfoWindow({
        position: markerPosition,
        content: iwContent,
      });
      infowindow.open(map, marker);

    } catch (e) {
      console.error("카카오 지도 상세 렌더 오류:", e);
      setKakaoError(true);
    }
  }, [kakaoLoaded, selectedRoomTypeKey, id]);

  const [hasLiked, setHasLiked] = useState(false);

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 text-gray-900 font-sans antialiased">
      {/* 0. 상단 네비게이션 액션 바 */}
      <div className="flex items-center justify-between mb-8">
        <Link 
          to="/map" 
          className="inline-flex items-center gap-1.5 text-xs font-black text-gray-400 hover:text-[#0050FF] transition-colors py-2 px-4 bg-[#F2F2F7] rounded-xl border border-gray-50"
        >
          <ArrowLeft size={14} /> 단지 입체지도로 복귀
        </Link>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setHasLiked(!hasLiked)}
            className={`w-9 h-9 border rounded-xl flex items-center justify-center transition-all ${
              hasLiked ? 'bg-rose-50 border-rose-200 text-rose-500 shadow-sm' : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'
            }`}
          >
            <Heart size={16} fill={hasLiked ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("공고 주소가 클립보드에 깔끔하게 복사되었습니다!");
            }}
            className="w-9 h-9 bg-white border border-gray-100 text-gray-400 hover:bg-gray-50 rounded-xl flex items-center justify-center transition-colors"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-10">
        
        {/* PREMIUM BANNER POSTER: 단지 대표 전경 및 모집구분 타이틀 아티클 */}
        <div className="relative h-[280px] md:h-[400px] rounded-[32px] overflow-hidden shadow-sm group">
          <img 
            src={detailData.imageUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'} 
            alt={detailData.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Dark luxury gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 flex flex-col justify-end p-6 md:p-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] md:text-xs font-black bg-[#1E60FF] text-white px-3 py-1.5 rounded-full tracking-wider uppercase">
                {detailData.provider} 분석단지
              </span>
              <span className="text-[10px] md:text-xs font-black bg-emerald-500 text-white px-3 py-1.5 rounded-full tracking-wider uppercase">
                모집공고 활성
              </span>
            </div>
            <h2 className="text-xl md:text-3.5xl font-black text-white tracking-tight drop-shadow-md mb-2">
              {detailData.title}
            </h2>
            <p className="text-gray-300 font-bold text-xs md:text-sm flex items-center gap-1.5 pl-0.5">
              <MapPin size={14} className="text-sky-400 shrink-0" /> {detailData.address}
            </p>
          </div>
        </div>

        {/* IMAGE 1: 단지 타이틀 밴더 & 상단 메타데이터 */}
        <div className="bg-white rounded-[32px] p-6 md:p-8 border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h1 className="text-xl md:text-2xl font-black text-gray-950 tracking-tight leading-tight">
              📂 단지 종합 제원 및 수치 분석
            </h1>
            <div className="text-gray-400 hover:text-[#1E60FF] transition-colors cursor-pointer" title="지도뷰로 보기">
              <svg 
                className="w-7 h-7" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 4L9 7"></path>
              </svg>
            </div>
          </div>

          {/* 청약 모집 형태 드롭다운 (Image 1 양식 준수) */}
          <div className="max-w-[280px]">
            <div className="relative">
              <select
                id="room-selector"
                value={selectedRoomTypeKey}
                onChange={(e) => setSelectedRoomTypeKey(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-[#1E60FF] text-[#1E60FF] font-black text-xs md:text-sm rounded-lg shadow-sm focus:outline-none cursor-pointer appearance-none pr-10"
              >
                {roomTypeKeys.map((key) => (
                  <option key={key} value={key} className="text-gray-800 font-bold">
                    {key}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#1E60FF]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          {/* 메타 스펙 한눈에 보기 그리드 (Image 1 하단 디자인과 완전 매치) */}
          <div className="space-y-2.5 pt-2">
            <div className="flex flex-col md:flex-row md:items-center text-sm md:text-md text-zinc-900 leading-relaxed font-bold">
              <div className="w-[120px] shrink-0 text-gray-500 font-medium">주소 :</div>
              <div>{detailData.address}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-2.5 gap-x-6 text-sm md:text-md text-zinc-900 leading-relaxed font-bold">
              <div className="md:col-span-4 flex items-center">
                <span className="w-[120px] shrink-0 text-gray-500 font-medium">예비자모집호수 :</span>
                <span>{currentRoomInfo.recruitCount}</span>
              </div>
              <div className="md:col-span-4 flex items-center">
                <span className="w-[120px] shrink-0 text-gray-500 font-medium font-sans">공용면적 :</span>
                <span className="font-sans">{currentRoomInfo.publicArea}</span>
              </div>
              <div className="md:col-span-4 flex items-center">
                <span className="w-[120px] shrink-0 text-gray-500 font-medium font-sans">전용면적 :</span>
                <span className="font-sans">{currentRoomInfo.privateArea}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-2.5 gap-x-6 text-sm md:text-md text-zinc-900 leading-relaxed font-bold">
              <div className="md:col-span-4 flex items-center">
                <span className="w-[120px] shrink-0 text-gray-500 font-medium">난방 :</span>
                <span>{currentRoomInfo.heating}</span>
              </div>
              <div className="md:col-span-4 flex items-center">
                <span className="w-[120px] shrink-0 text-gray-500 font-medium">최대거주기간 :</span>
                <span>{currentRoomInfo.maxPeriod}</span>
              </div>
              <div className="md:col-span-4 flex items-center">
                <span className="w-[120px] shrink-0 text-gray-500 font-medium">공급형 :</span>
                <span>{currentRoomInfo.roomSize}</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center text-sm md:text-md text-zinc-900 leading-relaxed font-bold">
              <div className="w-[120px] shrink-0 text-gray-500 font-medium">지하철역 :</div>
              <div className="text-[#1E60FF] font-black">{detailData.subwayText}</div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center text-sm md:text-md text-zinc-900 leading-relaxed font-bold">
              <div className="w-[120px] shrink-0 text-gray-500 font-medium">공급대상 :</div>
              <div>{currentRoomInfo.targets}</div>
            </div>
          </div>
        </div>

        {/* SUBWAY TIMELINE: 역세권 도보 통계 분석 */}
        <div className="bg-gradient-to-r from-blue-50/60 to-indigo-50/40 rounded-[32px] p-6 border border-blue-100/70 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1 md:max-w-md">
            <span className="text-[10px] font-black text-[#1E60FF] uppercase tracking-wider block">Station Walkability Report</span>
            <h3 className="text-lg font-black text-gray-950 flex items-center gap-2">
              🚲 역세권 지하철역 정밀 교통 진단
            </h3>
            <p className="text-xs text-gray-600 font-semibold font-sans">
              단지 중심점부터 가장 가까운 지하철역까지의 실측 도보 거리와 실시간 보행 분석 모델 피드백입니다.
            </p>
          </div>
          
          <div className="flex-1 max-w-lg bg-white p-4 rounded-2xl border border-blue-50/80 shadow-sm">
            <div className="flex items-center justify-between text-[11px] font-extrabold text-gray-400 mb-2 font-sans">
              <span>단지 출입구</span>
              <span className="text-zinc-500">{detailData.subwayStationName || '오류동역'} 진입점</span>
            </div>
            {/* Walkability Graphic Trail */}
            <div className="relative py-4 flex items-center justify-between">
              <div className="absolute left-0 right-0 h-1 bg-dashed bg-gray-200 border-t border-gray-300 z-0"></div>
              <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-md relative z-10"></div>
              {/* Walking Icon animated along the line */}
              <motion.div 
                animate={{ x: [0, 160, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 text-primary bg-blue-50/90 px-2 py-1 rounded-lg border border-blue-100 flex items-center gap-1 text-[10px] font-black"
              >
                🏃 {detailData.subwayMinutes || '4'}분
              </motion.div>
              <div className="w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-md relative z-10"></div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-[11px] text-gray-500 font-bold font-sans">
                📍 {detailData.title.split(' ')[0]}
              </div>
              <div className="flex items-center gap-1.5">
                {detailData.subwayLines?.map(line => (
                  <span key={line} className="text-[9px] font-black text-white bg-[#1E60FF] px-2 py-0.5 rounded-full font-sans">
                    {line}
                  </span>
                )) || <span className="text-[9px] font-black text-white bg-[#1E60FF] px-2 py-0.5 rounded-full font-sans">1호선</span>}
                <span className="text-xs font-black text-gray-900 font-mono">
                  {detailData.subwayDistanceMeter || '262'}m (실측 도보 {detailData.subwayMinutes || '4'}분)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGE 2: 보증금 / 임대료 구분 테이블 */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-50 text-xs md:text-sm font-black text-gray-600">
                  <th className="px-6 py-4 w-1/4 border-r border-gray-200 text-center">구분</th>
                  <th className="px-6 py-4 w-2/5 border-r border-gray-200 text-center">보증금</th>
                  <th className="px-6 py-4 w-1/3 text-center">임대료</th>
                </tr>
              </thead>
              <tbody>
                {currentRoomInfo.pricing.map((priceRow, idx) => (
                  <React.Fragment key={idx}>
                    {/* 최대 보증금 행 */}
                    <tr className="border-t-2 border-gray-200 text-xs md:text-sm font-bold text-gray-950">
                      <td rowSpan={4} className="px-6 py-5 bg-gray-50/75 border-r border-gray-200 font-black text-center align-middle">
                        {priceRow.category}
                      </td>
                      <td className="px-8 py-3 border-r border-gray-200 flex justify-between items-center bg-white">
                        <span className="text-gray-400 font-medium">최대</span>
                        <span className="font-sans font-extrabold">{priceRow.maxDeposit}</span>
                      </td>
                      <td className="px-8 py-3 text-right bg-white">
                        <span className="font-sans font-extrabold">{priceRow.maxRent}</span>
                      </td>
                    </tr>

                    {/* 기본 보증금 행 (계약금 10% 강조) */}
                    <tr className="border-t border-gray-100 text-xs md:text-sm font-bold text-gray-950">
                      <td className="px-8 py-3 border-r border-gray-100">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-medium">기본</span>
                          <span className="font-sans font-extrabold">{priceRow.baseDeposit}</span>
                        </div>
                        <div className="text-left mt-1">
                          <span className="text-[10px] bg-blue-50 text-[#1E60FF] font-black px-2 py-0.5 rounded border border-blue-100 inline-block">
                            계약금 10%
                          </span>
                          <span className="text-[#1E60FF] text-[11px] font-black font-sans ml-2">
                            {priceRow.baseDepositContract}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-3 text-right">
                        <span className="font-sans font-extrabold">{priceRow.baseRent}</span>
                      </td>
                    </tr>

                    {/* 최소 보증금 행 */}
                    <tr className="border-t border-gray-100 text-xs md:text-sm font-bold text-gray-950">
                      <td className="px-8 py-3 border-r border-gray-200 flex justify-between items-center pb-5">
                        <span className="text-gray-400 font-medium">최소</span>
                        <span className="font-sans font-extrabold">{priceRow.minDeposit}</span>
                      </td>
                      <td className="px-8 py-3 text-right pb-5">
                        <span className="font-sans font-extrabold">{priceRow.minRent}</span>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* EDITORIAL SECTION: 공고 심층 분석리뷰글 */}
        <div className="bg-white rounded-[32px] p-6 md:p-10 border border-gray-100 shadow-sm space-y-8">
          <div>
            <div className="text-[#1E60FF] font-black text-xs uppercase tracking-widest mb-1 font-sans">Premium Insight Report</div>
            <h3 className="text-xl md:text-2xl font-black text-gray-950 tracking-tight flex items-center gap-2">
              📰 내집다오 공고 분석리포트 & 실거주 가이드
            </h3>
            <p className="text-sm text-gray-500 font-semibold font-sans">전문 분석위원회가 실측 진단한 입지 조건, 청약 성향 및 경쟁률 전격 처방입니다.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            {/* Left block - text report */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-4">
                <h4 className="text-base font-black text-gray-950 flex items-center gap-1.5">
                  <span className="w-1.5 h-4 bg-[#1E60FF] rounded-full"></span>
                  ① 단지 주요 입지 및 호재 분석 (Location Advantage)
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed font-semibold font-sans whitespace-pre-wrap">
                  {detailData.detailedOverview || `${detailData.title}은 최적의 철도망 연계 중심부에 위치하여 매우 뛰어난 직주근접 이점을 선점하고 있습니다. 주변 인프라가 이미 고도로 완성되어 생활 편의성이 최상에 달하며, 향후 수도권 광역 급행망 연계로 인한 시세 상승 혜택을 온전히 수혜받을 수 있는 핵심 배후 주택지입니다.`}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-base font-black text-gray-950 flex items-center gap-1.5">
                  <span className="w-1.5 h-4 bg-[#1E60FF] rounded-full"></span>
                  ② 청약 지원 자격 및 가이드 요약 (Application Eligibility)
                </h4>
                <div className="p-5 bg-slate-50/80 rounded-2xl border border-gray-100 space-y-2 text-sm">
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-200/50 font-semibold">
                    <span className="text-gray-500">소득 기준 한도</span>
                    <span className="font-extrabold text-gray-800 font-sans text-xs md:text-sm">전년도 도시근로자 가구당 월평균 소득 120% 이하 (유형별 차등)</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-200/50 font-semibold">
                    <span className="text-gray-500">자산 총합 제한</span>
                    <span className="font-extrabold text-gray-800 font-sans text-xs md:text-sm">총자산 가액 3억 4,500만 원 이하 / 자동차 가액 3,708만 원 이하</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-gray-200/50 font-semibold">
                    <span className="text-gray-500">나이 학위 자격</span>
                    <span className="font-extrabold text-gray-800 font-sans text-xs md:text-sm">대학생·청년 (만 19~39세) 또는 신혼 가구 (예비 및 혼인 7년 이내)</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 font-semibold">
                    <span className="text-gray-500">우선공급 배정비율</span>
                    <span className="font-extrabold text-[#1E60FF] font-sans text-xs md:text-sm">해당 지역 계속 거주자 80% / 수도권 주소자 20% 긴급 특별배정</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right block - Quick summary & Experts panel */}
            <div className="lg:col-span-4 bg-gradient-to-br from-gray-900 to-slate-950 text-white rounded-3xl p-6 flex flex-col justify-between shadow-lg">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest block">D-DAO EXPERT FEEDBACK</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#1E60FF] font-sans">8.9</span>
                  <span className="text-xs text-gray-400 font-bold">/ 10 전문가 추천 청약지수</span>
                </div>
                
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-black text-gray-300">💡 핵심 프리미엄 분석 체크포인트 :</div>
                  <ul className="space-y-2.5">
                    {detailData.detailedPoints?.map((pt, idx) => (
                      <li key={idx} className="text-xs text-gray-300 leading-relaxed font-bold flex items-start gap-1.5">
                        <span className="text-emerald-400 shrink-0 mt-0.5">✓</span> {pt}
                      </li>
                    )) || [
                      "인근 주요 거점 지하철역까지 매우 우수한 도보 완충 거리 확보",
                      "SH/LH 공적 임대로 민간 전세대비 평균 40% 이상 저렴한 시세",
                      "우수 인프라 통합으로 자녀 보육 및 학업 여건 매우 쾌적"
                    ].map((pt, idx) => (
                      <li key={idx} className="text-xs text-gray-300 leading-relaxed font-bold flex items-start gap-1.5">
                        <span className="text-emerald-400 shrink-0 mt-0.5">✓</span> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-4 mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary text-[#1E60FF] flex items-center justify-center font-black text-xs">
                    D
                  </div>
                  <div>
                    <p className="text-xs font-black">내집다오 입지분석 연구원</p>
                    <p className="text-[10px] text-gray-400 font-bold">"실거주 안정성과 경제성 측면 배점 만점권 단지"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGE 3 (상단): 주의사항 안내문 */}
        <div className="bg-[#EBF7F7] border border-[#CDEBEB] rounded-2xl p-4 flex items-center gap-3.5">
          <div className="w-8 h-8 rounded-full bg-[#008080]/10 flex items-center justify-center shrink-0 text-[#008080]">
            <Info size={18} />
          </div>
          <p className="text-xs md:text-sm text-[#008080] font-bold leading-normal">
            본 자료는 참고용이며, 정확한 내용과 최종 조건은 해당 시행사의 공식 공고문을 필히 확인하시기 바랍니다.
          </p>
        </div>

        {/* IMAGE 3 (중단 및 하단): 카카오 및 폴백 전용 대형 맵 + 로드뷰 + 하단 PDF 앵커 리스트 */}
        <div id="image3-map-container" className="space-y-4">
          <div className="relative h-[480px] bg-slate-100 rounded-[32px] overflow-hidden border border-gray-100 shadow-sm group">
            
            {/* 실제 카카오 지도 컨테이너 */}
            <div 
              ref={mapContainerRef} 
              style={{ display: (!kakaoError && kakaoLoaded) ? 'block' : 'none' }}
              className="w-full h-full absolute inset-0 z-0 bg-surface"
            ></div>

            {/* 폴백: 디자이너 시뮬레이터 Mock 지도 */}
            {(kakaoError || !kakaoLoaded) && (
              <div className="w-full h-full absolute inset-0 z-0 bg-[#E6E6EB] flex flex-col justify-between p-6">
                <div className="absolute inset-0 opacity-[0.25]" style={{ 
                  backgroundImage: 'radial-gradient(#111 1px, transparent 1px)', 
                  backgroundSize: '24px 24px' 
                }}></div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                  <div className="relative bg-[#1C1C1E] text-white px-5 py-3 rounded-2xl font-black text-xs md:text-sm shadow-2xl flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-primary rounded-full animate-ping"></span>
                    {detailData.title}
                  </div>
                  <div className="w-4 h-4 bg-[#1C1C1E] rotate-45 -mt-2 shadow-xl"></div>
                </div>

                {/* 가상 랜드마크 드로잉 */}
                <div className="mt-20 z-10 self-start bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-gray-500 border border-gray-100">
                  📍 {detailData.address} 주변지구 분석 활성화
                </div>
              </div>
            )}

            {/* 로드뷰 보기 플로팅 버튼 (Image 3 구현) */}
            <div className="absolute top-6 left-6 z-10">
              <button 
                onClick={() => {
                  const queryAdd = encodeURIComponent(detailData.address);
                  window.open(`https://map.kakao.com/?q=${queryAdd}`, '_blank');
                }}
                className="bg-white hover:bg-gray-50 text-gray-900 font-extrabold text-xs px-5 py-3 rounded-xl border border-gray-100 shadow-xl flex items-center gap-1.5 transition-all"
              >
                🗺️ 카카오 로드뷰 / 빠른길찾기 연동
              </button>
            </div>

            {/* 하단 우측 PDF 첨부파일 파일태그 오버레이 (Image 3 우측하단 구현) */}
            <div className="absolute bottom-6 right-6 z-10">
              <a 
                href={`/#`}
                onClick={(e) => {
                  e.preventDefault();
                  alert(`[공고] ${detailData.pdfName.substring(1)} 다운로드가 가상 시작되었습니다!`);
                }}
                className="bg-gray-900/90 text-white backdrop-blur px-5 py-3.5 rounded-xl text-[11px] font-bold tracking-tight shadow-2xl border border-white/10 hover:bg-primary transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <FileText size={14} className="text-sky-400" />
                <span className="underline">{detailData.pdfName}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4. 부가 행동 패널 - 접수 신청 & 직접 청약 전화 */}
        <div className="bg-gray-50 rounded-[32px] p-6 md:p-8 border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-base font-black text-gray-950">
              청약 접정 일자 SMS 긴급 경보 예약
            </h3>
            <p className="text-xs text-gray-600">
               모집 접수기간 내에 깜빡하고 유실하지 않도록 24시간 전에 카카오 알림 및 문자를 무료 발송해 드립니다.
            </p>
          </div>
          <button 
            onClick={() => alert(`[완료] 해당 단지의 모집 접수(2026.05) 카카오 모닝콜 경보가 예약되었습니다.`)}
            className="px-8 py-3.5 bg-primary hover:bg-blue-600 font-black text-xs text-white rounded-xl transition-colors shrink-0 shadow-lg shadow-primary/20"
          >
            접수 무료 모닝콜 예약하기
          </button>
        </div>

      </div>
    </div>
  );
}
