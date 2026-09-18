import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_PAGES = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
];

const SERVICES_QUICK = [
  'Engine Conversion & Swap',
  'Full Interior Conversion',
  'Full Exterior Conversion',
  'Electrical Repairs',
  'Painting & Buffing',
  'Body Work',
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setPagesOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setPagesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? '0.6rem 0' : '1rem 0',
      background: scrolled ? 'rgba(20,20,20,0.97)' : 'rgba(20,20,20,0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: scrolled ? '1px solid rgba(59,174,232,0.12)' : 'none',
      transition: 'all 0.35s ease',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <img src="/images/logo.jpeg" alt="NEOS Automobile" style={{
            height: '38px', width: 'auto', borderRadius: '6px',
            transition: 'transform 0.3s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">

          {/* Pages mega dropdown */}
          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setPagesOpen(!pagesOpen)}
              style={{
                background: 'none', border: 'none', color: pagesOpen ? 'var(--accent-blue)' : 'var(--text-secondary)',
                font: 'inherit', fontSize: '0.9rem', fontWeight: 500,
                padding: '0.5rem 0.85rem', borderRadius: '8px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.3rem',
                transition: 'color 0.25s ease',
              }}
              onMouseEnter={e => { if (!pagesOpen) e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { if (!pagesOpen) e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              Pages
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                style={{ transition: 'transform 0.25s ease', transform: pagesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Mega Menu Dropdown */}
            {pagesOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 12px)', left: '50%',
                transform: 'translateX(-50%)',
                background: '#232323', border: '1px solid var(--border)',
                borderRadius: '16px', padding: '1.5rem',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                minWidth: '460px', display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '0.25rem', animation: 'fadeIn 0.2s ease',
              }}>
                <div style={{ marginBottom: '0.5rem', gridColumn: '1/-1' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-blue)' }}>Navigation</span>
                </div>
                {NAV_PAGES.map(page => (
                  <Link key={page.path} to={page.path} style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.6rem 0.75rem', borderRadius: '8px', fontSize: '0.9rem',
                    color: location.pathname === page.path ? 'var(--accent-blue)' : 'var(--text-primary)',
                    fontWeight: location.pathname === page.path ? 600 : 400,
                    transition: 'all 0.2s ease',
                    background: location.pathname === page.path ? 'rgba(59,174,232,0.1)' : 'transparent',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(59,174,232,0.08)'; e.currentTarget.style.color = 'var(--accent-blue)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = location.pathname === page.path ? 'rgba(59,174,232,0.1)' : 'transparent'; e.currentTarget.style.color = location.pathname === page.path ? 'var(--accent-blue)' : 'var(--text-primary)'; }}
                  >
                    {page.label}
                  </Link>
                ))}
                <div style={{ gridColumn: '1/-1', borderTop: '1px solid var(--border)', margin: '0.75rem 0 0.25rem', paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-blue)' }}>Our Services</span>
                </div>
                {SERVICES_QUICK.map(s => (
                  <Link key={s} to="/services" style={{
                    padding: '0.45rem 0.75rem', borderRadius: '8px', fontSize: '0.82rem',
                    color: 'var(--text-secondary)', transition: 'all 0.2s ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-blue)'; e.currentTarget.style.background = 'rgba(59,174,232,0.06)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
                  >
                    {s}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {['About', 'Services', 'Gallery'].map(name => (
            <Link key={name} to={`/${name.toLowerCase()}`} style={{
              fontSize: '0.9rem', fontWeight: 500, padding: '0.5rem 0.85rem', borderRadius: '8px',
              color: location.pathname === `/${name.toLowerCase()}` ? 'var(--accent-blue)' : 'var(--text-secondary)',
              transition: 'color 0.25s ease',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.currentTarget.style.color = location.pathname === `/${name.toLowerCase()}` ? 'var(--accent-blue)' : 'var(--text-secondary)'}
            >
              {name}
            </Link>
          ))}

          <Link to="/contact" className="btn-primary" style={{ marginLeft: '0.5rem', padding: '0.6rem 1.4rem', fontSize: '0.85rem' }}>
            Get a Quote
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: '1px solid var(--border)', borderRadius: '8px',
            padding: '0.5rem', cursor: 'pointer', color: 'var(--text-primary)',
            display: 'none',
          }}
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: '#1a1a1a', borderTop: '1px solid var(--border)',
          padding: '1.25rem', animation: 'fadeInUp 0.25s ease',
        }}>
          {NAV_PAGES.map(page => (
            <Link key={page.path} to={page.path} style={{
              display: 'block', padding: '0.85rem 1rem', fontSize: '1rem',
              color: location.pathname === page.path ? 'var(--accent-blue)' : 'var(--text-primary)',
              fontWeight: location.pathname === page.path ? 600 : 400,
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              {page.label}
            </Link>
          ))}
          <Link to="/contact" className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
            Get a Quote
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
