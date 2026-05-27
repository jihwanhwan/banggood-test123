import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, MessageCircle } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.columnLogo}>
            <Link to="/" className={styles.logoLink}>
              <div className={styles.logoBadge}>
                <span className={styles.logoText}>D</span>
              </div>
              <span className={styles.brandName}>내집다오</span>
            </Link>
            <p className={styles.tagline}>
              신혼부부, 대학생, 청년 그리고 임대주택이 필요한 모든 사람을 위한 국내 최초 임대주택 전문 플랫폼입니다.
            </p>
            <div className={styles.socials}>
              <button className={styles.socialBtn}>
                <Youtube size={18} />
              </button>
              <button className={styles.socialBtn}>
                <Instagram size={18} />
              </button>
              <button className={styles.socialBtn}>
                <MessageCircle size={18} />
              </button>
            </div>
          </div>

          <div>
            <h4 className={styles.sectionHeader}>Service</h4>
            <ul className={styles.linkList}>
              <li><Link to="/search" className={styles.footerLink}>내집 찾기 (지도)</Link></li>
              <li><Link to="/diagnosis" className={styles.footerLink}>청약 자격 진단</Link></li>
              <li><Link to="/calendar" className={styles.footerLink}>공고 캘린더</Link></li>
              <li><Link to="/board" className={styles.footerLink}>커뮤니티</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.sectionHeader}>Company</h4>
            <ul className={styles.linkList}>
              <li><Link to="/about" className={styles.footerLink}>회사 소개</Link></li>
              <li><Link to="/notice" className={styles.footerLink}>공지사항</Link></li>
              <li><Link to="/terms" className={styles.footerLink}>이용약관</Link></li>
              <li><Link to="/privacy" className={styles.footerLink}>개인정보처리방침</Link></li>
            </ul>
          </div>

          <div>
            <h4 className={styles.sectionHeader}>Contact</h4>
            <div className={styles.contactInfo}>
              <p>서울특별시 강남구 테헤란로 123<br />AI 타워 45층</p>
              <p>Tel: 1600-3456</p>
              <p>Email: help@myzipdao.com</p>
            </div>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p className={styles.copyright}>
            &copy; 2026 내집다오 (MyZipDao). All Rights Reserved.
          </p>
          <div className={styles.creditArea}>
             <span className={styles.creditText}>Design & Tech by DeepMind AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
