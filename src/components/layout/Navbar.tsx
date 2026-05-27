import React from "react";
import { Home, Search, ClipboardCheck, Bell, User, Map, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { name: "홈", path: "/", icon: Home },
    { name: "내집 찾기", path: "/search", icon: Search },
    { name: "청약진단", path: "/diagnosis", icon: ClipboardCheck },
    { name: "모집공고", path: "/board", icon: FileText },
    { name: "공고캘린더", path: "/calendar", icon: Bell },
    { name: "지도", path: "/map", icon: Map },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoArea}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoBadge}>
              <span className={styles.logoText}>D</span>
            </div>
            <span className={styles.brandName}>내집다오</span>
          </Link>

          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navLink} ${
                  pathname === item.path ? styles.activeNavLink : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.actionArea}>
          <button className={styles.searchBtn}>
            <Search size={22} />
          </button>
          <div className={styles.divider}></div>
          <Link to="/login" className={styles.loginBtn}>
            <div className={styles.loginIconCircle}>
              <User size={14} />
            </div>
            <span className={styles.loginText}>로그인</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
