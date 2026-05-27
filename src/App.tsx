import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './app/page';
import BoardPage from './app/board/page';
import CalendarPage from './app/calendar/page';
import ComplexPage from './app/complex/[id]/page';
import DiagnosisPage from './app/diagnosis/page';
import LoginPage from './app/login/page';
import MapPage from './app/map/page';
import SearchPage from './app/search/page';
import appStyles from './styles/App.module.css';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className={appStyles.mainLayout}>
        <Navbar />
        <div className={appStyles.contentWrapper}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/complex/:id" element={<ComplexPage />} />
            <Route path="/diagnosis" element={<DiagnosisPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
