import React from 'react';
import { Link } from 'react-router-dom';

const BRANDS = ['Toyota', 'Lexus', 'Mercedes-Benz', 'Range Rover'];
const VALUES = [
  { icon: '🎯', title: 'Precision First', desc: 'Every conversion is engineered with exact tolerances. We don\'t cut corners — we eliminate them.' },
  { icon: '🛡️', title: 'Quality Guaranteed', desc: 'We stand behind every job we do. From electrical to bodywork, our standards don\'t move.' },
  { icon: '🔬', title: 'Specialist Focus', desc: 'We focus on four premium brands so we can know them deeply, not broadly.' },
  { icon: '⚡', title: 'Modern Methods', desc: 'We combine experienced hands with modern diagnostics and equipment for the best outcome.' },
];

export default function About() {
  return (
    <main style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0d1a26 0%, var(--bg-primary) 100%)',
        padding: '5rem 0 4rem',
      }}>
        <div className="container">
          <div style={{ maxWidth: '700px' }}>
            <span className="section-label">About NEOS</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              Who We Are
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: '580px' }}>
              NEOS Automobile is a specialist conversion and upgrade workshop built for drivers who refuse to settle. We were founded with a singular focus: take premium vehicles and make them better — mechanically, aesthetically, and electrically.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            <div>
              <span className="section-label">Our Story</span>
              <h2 className="section-title">Built from a Passion\nfor the Machine</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                NEOS Automobile started from a simple observation: too many quality vehicles were being underserved. Owners of Toyota Land Cruisers, Lexus SUVs, Range Rovers and Mercedes-Benz flagships deserved more than generic mechanics — they deserved specialists.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                So we built a workshop that does exactly that. Every technician at NEOS is trained specifically on the platforms we serve. Every conversion follows a strict quality process. Every vehicle leaves better than it arrived.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                We're a startup — but we're a startup built by people who've spent years in the industry. We bring that experience to every job, no matter the size.
              </p>
            </div>
            <div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <img src="/images/hero1.jpg" alt="Engine conversion" style={{ borderRadius: '14px', width: '100%', height: '260px', objectFit: 'cover' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <img src="/images/hero3.jpg" alt="Engine" style={{ borderRadius: '14px', height: '160px', objectFit: 'cover', width: '100%' }} />
                  <img src="/images/hero4.jpg" alt="Workshop" style={{ borderRadius: '14px', height: '160px', objectFit: 'cover', width: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">What We Stand For</span>
            <h2 className="section-title">Our Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {VALUES.map(v => (
              <div key={v.title} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: '14px', padding: '2rem',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-blue)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{v.icon}</div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.6rem', color: 'var(--text-primary)' }}>{v.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand specialists */}
      <section className="section-padding">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Our Focus</span>
          <h2 className="section-title">Brands We Specialise In</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 3rem' }}>
            We chose depth over breadth. Mastery over generality.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {BRANDS.map(brand => (
              <div key={brand} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: '12px', padding: '1.5rem 2.5rem',
                fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-blue)'; e.currentTarget.style.color = 'var(--accent-blue)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {brand}
              </div>
            ))}
          </div>
          <div style={{ marginTop: '3.5rem' }}>
            <Link to="/contact" className="btn-primary">Book a Consultation</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
