import React from 'react';
import { Link } from 'react-router-dom';

const SOCIAL_LINKS = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/fcrotate',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@fcrotate',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/2348162465247',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: 'Akó',
    href: 'https://ako-taupe.vercel.app/profile/meckury',
    icon: <img src="/images/ako-logo.png" alt="Akó" style={{ width: '18px', height: '18px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#151515', borderTop: '1px solid var(--border)', paddingTop: '4rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', paddingBottom: '3rem' }}>

          {/* Brand */}
          <div>
            <img src="/images/logo.jpeg" alt="NEOS Automobile" style={{ height: '48px', borderRadius: '6px', marginBottom: '1rem' }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '260px' }}>
              Premium automobile conversions and upgrades. Specialists in Toyota, Lexus, Benz, Range Rover & G-Wagon.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              {SOCIAL_LINKS.map(s => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" title={s.name}
                  style={{ width: '38px', height: '38px', borderRadius: '10px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', transition: 'all 0.25s ease', background: 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-blue)'; e.currentTarget.style.color = 'var(--accent-blue)'; e.currentTarget.style.background = 'rgba(59,174,232,0.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '1.25rem', fontSize: '0.95rem' }}>Services</h4>
            {['Full Exterior Conversion', 'Full Interior Conversion', 'Painting & Buffing', 'Body Work', 'Electrical Repairs', 'Upgrade & Styling'].map(s => (
              <Link key={s} to="/services" style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.6rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                {s}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '1.25rem', fontSize: '0.95rem' }}>Company</h4>
            {[{ label: 'About Us', path: '/about' }, { label: 'Our Work', path: '/gallery' }, { label: 'Contact', path: '/contact' }].map(l => (
              <Link key={l.path} to={l.path} style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.6rem', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-blue)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Specialists */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '1.25rem', fontSize: '0.95rem' }}>Specialists In</h4>
            {['Toyota', 'Lexus', 'Mercedes-Benz', 'Range Rover', 'G-Wagon'].map(brand => (
              <div key={brand} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.6rem' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--accent-blue)', flexShrink: 0 }} />
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid var(--border)', padding: '1.5rem 0', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>© {year} NEOS Automobile. All rights reserved.</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Built for precision. Engineered for excellence.</p>
        </div>
      </div>
    </footer>
  );
}
