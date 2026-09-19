import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const HERO_SLIDES = [
  { image: '/images/hero6.jpg', label: 'Premium Vehicles', title: 'Where Luxury\nMeets Transformation', subtitle: 'We turn heads before you even step out. Aesthetic upgrades for the most premium vehicles on the road.' },
  { image: '/images/hero1.jpg', label: 'Exterior Conversion', title: 'From Standard\nto Stunning', subtitle: 'Full exterior conversions that redefine what your vehicle looks like — inside out.' },
  { image: '/images/hero3.jpg', label: 'Body Restoration', title: 'Every Dent Tells\na Story. We End It.', subtitle: 'Accident damage, wear and tear — we restore your vehicle to better than showroom condition.' },
  { image: '/images/hero7.jpg', label: 'Mercedes Specialists', title: 'Benz. Lexus.\nToyota. Range Rover.', subtitle: 'Specialist-level knowledge of the brands that matter. Your vehicle is in the right hands.' },
  { image: '/images/hero5.jpg', label: 'Before & After', title: 'Results That\nSpeak for Themselves', subtitle: 'See the difference NEOS makes. Every transformation is a job we stand behind.' },
];

const SERVICES = [
  { icon: '/images/home-exterior.png', title: 'Full Exterior Conversion', desc: 'Complete exterior transformation — body kits, bumpers, panels and full restorations that change how your vehicle commands the road.' },
  { icon: '/images/home-interior.png', title: 'Full Interior Conversion', desc: 'Custom interior overhauls from dashboard to boot — premium upholstery, trim, lighting and infotainment upgrades.' },
  { icon: '/images/home-painting.png', title: 'Painting & Buffing', desc: 'Professional automotive painting, clear coat application, buffing and polishing that restores your finish to showroom-plus condition.' },
  { icon: '/images/home-bodywork.png', title: 'Body Work', desc: 'Dent removal, panel straightening, rust treatment and accident damage restoration — structural and cosmetic integrity guaranteed.' },
  { icon: '/images/home-electrical.png', title: 'Electrical Repairs', desc: 'Full electrical diagnostics and repairs — sensors, wiring, ECU faults and everything in between.' },
  { icon: '/images/home-upgrade.png', title: 'Upgrade & Styling', desc: 'Custom styling upgrades — chrome deletion, body kit fitting, spoilers, skirts and aesthetic enhancements tailored to your taste.' },
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
      <div style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>
        {count}<span style={{ color: 'var(--accent-blue)' }}>{suffix}</span>
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem', fontWeight: 500, letterSpacing: '0.05em' }}>{label}</div>
    </div>
  );
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [statsActive, setStatsActive] = useState(false);
  const [stats, setStats] = useState([
    { value: 0, suffix: '+', label: 'Conversions Done' },
    { value: 1, suffix: '', label: 'Years Experience' },
    { value: 100, suffix: '%', label: 'Client Focused' },
  ]);
  const statsRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await supabase.from('stats').select('*');
      if (data && data.length > 0) {
        const mapped = data.map(s => ({
          value: s.value,
          suffix: s.key === 'client_satisfaction' ? '%' : s.key === 'conversions_done' ? '+' : '',
          label: s.label,
        }));
        setStats(mapped);
      }
    } catch (e) {}
  };

  const startAuto = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5500);
  };

  useEffect(() => { startAuto(); return () => clearInterval(intervalRef.current); }, []);

  const goTo = (i) => { setSlide(i); startAuto(); };
  const prev = () => { setSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length); startAuto(); };
  const next = () => { setSlide(s => (s + 1) % HERO_SLIDES.length); startAuto(); };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setStatsActive(true); }, { threshold: 0.5 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const current = HERO_SLIDES[slide];

  return (
    <main>
      {/* HERO SLIDER */}
      <section style={{ position: 'relative', height: '100vh', minHeight: '600px', overflow: 'hidden' }}>
        {HERO_SLIDES.map((s, i) => (
          <div key={i} style={{ position: 'absolute', inset: 0, backgroundImage: `url(${s.image})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: i === slide ? 1 : 0, transition: 'opacity 0.9s ease', zIndex: i === slide ? 1 : 0 }} />
        ))}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(20,20,20,0.88) 0%, rgba(20,20,20,0.45) 100%)', zIndex: 2 }} />
        <div className="container" style={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '5rem' }}>
          <div key={slide} style={{ animation: 'fadeInUp 0.7s ease forwards' }}>
            <span style={{ display: 'inline-block', background: 'rgba(59,174,232,0.15)', border: '1px solid var(--accent-blue)', color: 'var(--accent-blue)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.35rem 0.9rem', borderRadius: '50px', marginBottom: '1.25rem' }}>
              {current.label}
            </span>
            <h1 style={{ fontSize: 'clamp(2.4rem,6vw,5rem)', fontWeight: 900, lineHeight: 1.05, color: 'var(--white)', marginBottom: '1.25rem', maxWidth: '700px', whiteSpace: 'pre-line' }}>
              {current.title}
            </h1>
            <p style={{ fontSize: 'clamp(0.95rem,1.5vw,1.15rem)', color: 'rgba(232,232,232,0.8)', maxWidth: '500px', lineHeight: 1.7, marginBottom: '2.25rem' }}>
              {current.subtitle}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
              <Link to="/gallery" className="btn-outline" style={{ color: 'var(--white)', borderColor: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}>
                View Our Work
              </Link>
            </div>
          </div>
          <div ref={statsRef} style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {stats.map(stat => <StatItem key={stat.label} {...stat} active={statsActive} />)}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '2.5rem', right: '2rem', zIndex: 4, display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button onClick={prev} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,174,232,0.4)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: i === slide ? '24px' : '8px', height: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', background: i === slide ? 'var(--accent-blue)' : 'rgba(255,255,255,0.35)', transition: 'all 0.35s ease', padding: 0 }} />
          ))}
          <button onClick={next} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(59,174,232,0.4)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label">What We Do</span>
            <h2 className="section-title" style={{ margin: '0 auto 1rem' }}>Aesthetic. Precision. Results.</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              We specialise in making your vehicle look and feel exactly how you imagined it — or better.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {SERVICES.map((service, i) => <ServiceCard key={service.title} service={service} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" className="btn-outline">See All Services</Link>
          </div>
        </div>
      </section>

      {/* WHY NEOS */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span className="section-label">Why Choose NEOS</span>
              <h2 className="section-title">Your Vision.\nOur Craft.</h2>
              <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
                NEOS Automobile was built for one reason — premium vehicles deserve premium transformations. We focus exclusively on aesthetics and quality so every result is something you're proud to drive.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Exterior & interior conversion specialists', 'Toyota, Lexus, Benz, Range Rover & G-Wagon', 'Professional painting, buffing & bodywork', 'Full restoration & custom styling'].map(item => (
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
              <img src="/images/hero1.jpg" alt="Exterior conversion" style={{ borderRadius: '12px', height: '200px', width: '100%', objectFit: 'cover' }} />
              <img src="/images/hero6.jpg" alt="G-Wagon" style={{ borderRadius: '12px', height: '200px', width: '100%', objectFit: 'cover', marginTop: '1.5rem' }} />
              <img src="/images/hero5.jpg" alt="Before and after" style={{ borderRadius: '12px', height: '200px', width: '100%', objectFit: 'cover' }} />
              <img src="/images/hero7.jpg" alt="Mercedes" style={{ borderRadius: '12px', height: '200px', width: '100%', objectFit: 'cover', marginTop: '1.5rem' }} />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, #0d1f2d 0%, var(--bg-primary) 100%)', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, color: 'var(--white)', marginBottom: '1rem' }}>Ready to Transform Your Vehicle?</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto 2.25rem', lineHeight: 1.7 }}>
            Tell us your car and your vision — we'll make it a reality.
          </p>
          <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
        </div>
      </section>
    </main>
  );
}

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ background: hovered ? 'var(--bg-card)' : '#242424', border: `1px solid ${hovered ? 'var(--accent-blue)' : 'var(--border)'}`, borderRadius: '14px', padding: '1.75rem', transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)', transform: hovered ? 'translateY(-4px)' : 'translateY(0)', boxShadow: hovered ? '0 12px 40px rgba(59,174,232,0.12)' : 'none', cursor: 'default' }}>
      <img
        src={service.icon}
        alt=""
        aria-hidden="true"
        width="64"
        height="64"
        style={{ display: 'block', width: '64px', height: '64px', objectFit: 'contain', marginBottom: '1rem' }}
      />
      <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{service.title}</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{service.desc}</p>
    </div>
  );
}
