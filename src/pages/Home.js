import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HERO_SLIDES = [
  {
    image: '/images/hero1.jpg',
    label: 'Engine Conversion',
    title: 'Where Performance\nMeets Precision',
    subtitle: 'Complete engine swaps and conversions engineered for power, reliability and longevity.',
  },
  {
    image: '/images/hero2.jpg',
    label: 'Before & After',
    title: 'Transformations\nThat Speak for Themselves',
    subtitle: 'From worn and weathered to showroom-perfect — every detail restored with care.',
  },
  {
    image: '/images/hero3.jpg',
    label: 'Engine Upgrades',
    title: 'Under the Hood\nEngineered to Last',
    subtitle: 'Precision electrical and mechanical upgrades for Toyota, Lexus, Benz and Range Rover.',
  },
  {
    image: '/images/hero4.jpg',
    label: 'Professional Workshop',
    title: 'Premium Garage.\nPremium Results.',
    subtitle: 'State-of-the-art facility, experienced hands — your vehicle is always in the right place.',
  },
];

const SERVICES = [
  { icon: '⚙️', title: 'Engine Conversion & Swap', desc: 'Full engine swaps and conversions for Toyota, Lexus, Benz and Range Rover.' },
  { icon: '🚗', title: 'Full Exterior Conversion', desc: 'Complete exterior transformation — panels, body kits and full restorations.' },
  { icon: '🪑', title: 'Full Interior Conversion', desc: 'Custom interior overhauls — upholstery, dashboard, comfort and aesthetics.' },
  { icon: '⚡', title: 'Electrical Repairs', desc: 'Comprehensive diagnostics and repairs for all automotive electrical systems.' },
  { icon: '🎨', title: 'Painting & Buffing', desc: 'Professional automotive painting, clear coat, buffing and polishing.' },
  { icon: '🔧', title: 'Body Work', desc: 'Dent removal, panel straightening, rust treatment and structural repairs.' },
];

const STATS = [
  { value: 100, suffix: '+', label: 'Conversions Done' },
  { value: 4, suffix: '', label: 'Brand Specialists' },
  { value: 100, suffix: '%', label: 'Client Focused' },
];

function useCountUp(target, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);
  return count;
}

function StatItem({ value, suffix, label, active }) {
  const count = useCountUp(value, active);
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>
        {count}<span style={{ color: 'var(--accent-blue)' }}>{suffix}</span>
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem', fontWeight: 500, letterSpacing: '0.05em' }}>{label}</div>
    </div>
  );
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef(null);
  const intervalRef = useRef(null);

  const startAuto = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (i) => { setSlide(i); startAuto(); };
  const prev = () => { setSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length); startAuto(); };
  const next = () => { setSlide(s => (s + 1) % HERO_SLIDES.length); startAuto(); };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setStatsActive(true);
    }, { threshold: 0.5 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const current = HERO_SLIDES[slide];

  return (
    <main>
      {/* ── HERO SLIDER ── */}
      <section style={{ position: 'relative', height: '100vh', minHeight: '600px', overflow: 'hidden' }}>
        {HERO_SLIDES.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${s.image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: i === slide ? 1 : 0,
            transition: 'opacity 0.9s ease',
            zIndex: i === slide ? 1 : 0,
          }} />
        ))}

        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(20,20,20,0.85) 0%, rgba(20,20,20,0.5) 100%)', zIndex: 2 }} />

        {/* Content */}
        <div className="container" style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '5rem' }}>
          <div key={slide} style={{ animation: 'fadeInUp 0.7s ease forwards' }}>
            <span style={{
              display: 'inline-block', background: 'rgba(59,174,232,0.15)', border: '1px solid var(--accent-blue)',
              color: 'var(--accent-blue)', fontSize: '0.72rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.35rem 0.9rem',
              borderRadius: '50px', marginBottom: '1.25rem',
            }}>
              {current.label}
            </span>
            <h1 style={{
              fontSize: 'clamp(2.4rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.05,
              color: 'var(--white)', marginBottom: '1.25rem', maxWidth: '700px',
              whiteSpace: 'pre-line',
            }}>
              {current.title}
            </h1>
            <p style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)', color: 'rgba(232,232,232,0.8)', maxWidth: '500px', lineHeight: 1.7, marginBottom: '2.25rem' }}>
              {current.subtitle}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
              <Link to="/gallery" className="btn-outline" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
              >View Our Work</Link>
            </div>
          </div>

          {/* Stats inline with hero */}
          <div ref={statsRef} style={{
            display: 'flex', gap: '2.5rem', flexWrap: 'wrap',
            marginTop: '4rem', paddingTop: '2rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            {STATS.map(stat => <StatItem key={stat.label} {...stat} active={statsActive} />)}
          </div>
        </div>

        {/* Slider controls */}
        <div style={{ position: 'absolute', bottom: '2.5rem', right: '2rem', zIndex: 4, display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button onClick={prev} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,174,232,0.4)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === slide ? '24px' : '8px', height: '8px',
              borderRadius: '4px', border: 'none', cursor: 'pointer',
              background: i === slide ? 'var(--accent-blue)' : 'rgba(255,255,255,0.35)',
              transition: 'all 0.35s ease', padding: 0,
            }} />
          ))}
          <button onClick={next} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,174,232,0.4)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">What We Do</span>
            <h2 className="section-title" style={{ margin: '0 auto 1rem' }}>Our Services</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              From full engine swaps to precision bodywork — we handle every aspect of your vehicle's transformation.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} delay={i * 80} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" className="btn-outline">See All Services</Link>
          </div>
        </div>
      </section>

      {/* ── WHY NEOS ── */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="section-label">Why Choose NEOS</span>
              <h2 className="section-title">Built for the\nDemanding Driver</h2>
              <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
                NEOS Automobile was founded on one principle: every vehicle deserves to perform at its absolute best. We specialise exclusively in premium brands because excellence demands focus.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'Toyota, Lexus, Benz & Range Rover specialists',
                  'Full conversion capability — interior & exterior',
                  'Advanced electrical diagnostics & repair',
                  'Professional painting, buffing & bodywork',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(59,174,232,0.15)', border: '1px solid var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>Learn About Us</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <img src="/images/hero1.jpg" alt="Engine conversion" style={{ borderRadius: '12px', height: '200px', width: '100%', objectFit: 'cover' }} />
              <img src="/images/hero4.jpg" alt="Workshop" style={{ borderRadius: '12px', height: '200px', width: '100%', objectFit: 'cover', marginTop: '1.5rem' }} />
              <img src="/images/hero3.jpg" alt="Engine" style={{ borderRadius: '12px', height: '200px', width: '100%', objectFit: 'cover' }} />
              <img src="/images/hero2.jpg" alt="Before and after" style={{ borderRadius: '12px', height: '200px', width: '100%', objectFit: 'cover', marginTop: '1.5rem' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #0d1f2d 0%, var(--bg-primary) 100%)', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, color: 'var(--white)', marginBottom: '1rem' }}>
            Ready to Transform Your Vehicle?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2.25rem', maxWidth: '480px', margin: '0 auto 2.25rem' }}>
            Tell us your car, your vision — we'll make it happen. Get a free consultation today.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
            <a href="https://wa.me/2348162465247" target="_blank" rel="noopener noreferrer" className="btn-outline"
              style={{ borderColor: '#25D366', color: '#25D366' }}
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

function ServiceCard({ service, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--bg-card)' : '#242424',
        border: `1px solid ${hovered ? 'var(--accent-blue)' : 'var(--border)'}`,
        borderRadius: '14px', padding: '1.75rem',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 40px rgba(59,174,232,0.12)' : 'none',
        cursor: 'default',
      }}
    >
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{service.icon}</div>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{service.title}</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{service.desc}</p>
    </div>
  );
}
