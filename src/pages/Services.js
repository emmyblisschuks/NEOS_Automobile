import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    icon: '/images/icon-engine.png',
    title: 'Engine Conversion & Swap',
    category: 'Mechanical',
    desc: 'Complete engine swaps engineered to factory tolerances. We source, install, and tune replacement or performance engines for Toyota, Lexus, Benz, and Range Rover platforms.',
    details: ['Engine sourcing & vetting', 'Full engine swap & mounting', 'ECU reprogramming & tuning', 'Cooling & fuel system adaptation', 'Post-swap diagnostics & road test'],
  },
  {
    icon: '/images/icon-exterior.png',
    title: 'Full Exterior Conversion',
    category: 'Bodywork',
    desc: 'Complete exterior transformation — body kits, panel replacement, bumper swaps, and full restorations that change how your vehicle looks and how it presents on the road.',
    details: ['Body kit fitting & alignment', 'Panel replacement & repair', 'Bumper & grille conversion', 'Fender & door work', 'Chrome deletion & vinyl wrap prep'],
  },
  {
    icon: '/images/icon-interior.png',
    title: 'Full Interior Conversion',
    category: 'Interior',
    desc: 'Custom interior overhauls from dashboard to boot. We transform cabins with premium materials, updated electronics, and custom upholstery that matches your taste.',
    details: ['Custom seat upholstery', 'Dashboard & trim conversion', 'Infotainment system upgrade', 'Ambient lighting installation', 'Headliner & carpet replacement'],
  },
  {
    icon: '/images/icon-electrical.png',
    title: 'Electrical Repairs',
    category: 'Electrical',
    desc: 'From faulty sensors to full wiring harness issues — we diagnose and repair automotive electrical faults using modern scan tools and years of hands-on experience.',
    details: ['Full electrical diagnostics', 'Wiring harness repair/replace', 'ECU faults & programming', 'Sensor replacements', 'Battery & alternator service'],
  },
  {
    icon: '/images/icon-painting.png',
    title: 'Painting & Buffing',
    category: 'Finishing',
    desc: 'Professional automotive painting from single panels to full resprays. Our buffing and polishing service restores faded or scratched paint to factory-plus condition.',
    details: ['Full vehicle respray', 'Single panel spot painting', 'Colour-matched touch-ups', 'Machine polishing & buffing', 'Paint protection finishing'],
  },
  {
    icon: '/images/icon-bodywork.png',
    title: 'Body Work',
    category: 'Bodywork',
    desc: 'Dents, rust, accident damage, panel misalignment — we straighten, treat, and restore vehicle bodies to structural and cosmetic integrity.',
    details: ['Dent removal & panel beating', 'Rust treatment & prevention', 'Accident damage restoration', 'Frame & structure alignment', 'Seam sealing & underbody treatment'],
  },
];

export default function Services() {
  const [active, setActive] = useState(null);

  return (
    <main style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0d1a26 0%, var(--bg-primary) 100%)', padding: '5rem 0 4rem' }}>
        <div className="container">
          <span className="section-label">What We Offer</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', maxWidth: '600px' }}>
            Our Services
          </h1>
          <p className="section-subtitle">
            Every service we offer is purpose-built for one goal: making your vehicle better than the day it left the factory.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '2rem' }}>
            {['Toyota', 'Lexus', 'Mercedes-Benz', 'Range Rover'].map(brand => (
              <span key={brand} style={{
                background: 'rgba(59,174,232,0.1)', border: '1px solid var(--border)',
                color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: 600,
                padding: '0.35rem 0.9rem', borderRadius: '50px',
              }}>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {SERVICES.map((service, i) => (
              <div key={service.title}
                onClick={() => setActive(active === i ? null : i)}
                style={{
                  background: active === i ? 'var(--bg-card)' : '#242424',
                  border: `1px solid ${active === i ? 'var(--accent-blue)' : 'var(--border)'}`,
                  borderRadius: '16px', padding: '2rem',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                  transform: active === i ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: active === i ? '0 16px 45px rgba(59,174,232,0.12)' : 'none',
                }}
                onMouseEnter={e => { if (active !== i) { e.currentTarget.style.borderColor = 'rgba(59,174,232,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)'; } }}
                onMouseLeave={e => { if (active !== i) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; } }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <img
                    src={service.icon}
                    alt=""
                    aria-hidden="true"
                    width="72"
                    height="72"
                    style={{ display: 'block', width: '72px', height: '72px', objectFit: 'contain' }}
                  />
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--accent-blue)',
                    background: 'rgba(59,174,232,0.1)', padding: '0.25rem 0.65rem', borderRadius: '50px',
                  }}>{service.category}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{service.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>{service.desc}</p>

                {/* Expandable details */}
                {active === i && (
                  <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem', animation: 'fadeInUp 0.3s ease' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-blue)', marginBottom: '0.75rem' }}>Includes</p>
                    {service.details.map(d => (
                      <div key={d} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                        <span style={{ fontSize: '0.855rem', color: 'var(--text-secondary)' }}>{d}</span>
                      </div>
                    ))}
                    <Link to="/contact" className="btn-primary" style={{ marginTop: '1.25rem', fontSize: '0.82rem', padding: '0.6rem 1.25rem' }}
                      onClick={e => e.stopPropagation()}>
                      Get a Quote for This
                    </Link>
                  </div>
                )}

                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-blue)', fontSize: '0.8rem', fontWeight: 600 }}>
                  <span>{active === i ? 'Less detail' : 'See details'}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ transition: 'transform 0.3s', transform: active === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--bg-secondary)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, marginBottom: '1rem' }}>Not Sure What You Need?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '440px', margin: '0 auto 2rem' }}>
            Tell us your car and your problem — we'll figure out the best solution together.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary">Talk to Us</Link>
            <a href="https://wa.me/2348162465247" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ borderColor: '#25D366', color: '#25D366' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#25D366'; }}>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
