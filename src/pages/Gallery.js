import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const CATEGORIES = ['all', 'conversion', 'bodywork', 'painting', 'interior', 'upgrade'];

const PLACEHOLDER_ITEMS = [
  { id: 1, title: 'Audi A6 — Exterior Conversion', category: 'conversion', image_url: '/images/hero1.jpg', car_brand: 'Audi', description: 'Front fascia and body kit conversion to RS6 spec' },
  { id: 2, title: 'Toyota Corolla — Body Restoration', category: 'bodywork', image_url: '/images/hero2.jpg', car_brand: 'Toyota', description: 'Rear-end collision repair and full body restoration' },
  { id: 3, title: 'Porsche Cayenne — Body Work', category: 'bodywork', image_url: '/images/hero3.jpg', car_brand: 'Porsche', description: 'Rear quarter panel repair and refinish' },
  { id: 4, title: 'Audi A3 — Collision Repair', category: 'bodywork', image_url: '/images/hero4.jpg', car_brand: 'Audi', description: 'Front fender and headlight assembly restoration' },
  { id: 5, title: 'Toyota Camry — Full Restoration', category: 'bodywork', image_url: '/images/hero5.jpg', car_brand: 'Toyota', description: 'Front bumper and hood repair after accident' },
  { id: 6, title: 'Mercedes G-Wagon — Showcase', category: 'upgrade', image_url: '/images/hero6.jpg', car_brand: 'Mercedes-Benz', description: 'Premium G63 AMG full detail and presentation' },
  { id: 7, title: 'Mercedes S-Class — Detail', category: 'upgrade', image_url: '/images/hero7.jpg', car_brand: 'Mercedes-Benz', description: 'S-Class exterior detail and finish enhancement' },
];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => { fetchGallery(); }, []);

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase.from('gallery').select('*').order('display_order', { ascending: true });
      if (error) throw error;
      setItems(data && data.length > 0 ? data : PLACEHOLDER_ITEMS);
    } catch { setItems(PLACEHOLDER_ITEMS); }
    finally { setLoading(false); }
  };

  const filtered = filter === 'all' ? items : items.filter(i => i.category === filter);

  return (
    <main style={{ paddingTop: 0 }}>
      {/* HEADER WITH FULL-WIDTH VIDEO BACKGROUND */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0d1a26 0%, var(--bg-primary) 100%)',
          padding: 'clamp(7rem, 16vw, 10rem) 0 clamp(3rem, 8vw, 4rem)',
          minHeight: 'clamp(340px, 60vh, 560px)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 0,
          }}
        >
          <source src="/images/gallery-hero.mp4" type="video/mp4" />
        </video>

        {/* Dark blue overlay so the text stays readable */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(135deg, rgba(13,26,38,0.85) 0%, rgba(20,20,20,0.55) 100%)',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <span className="section-label">Our Work</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}>Gallery</h1>
          <p className="section-subtitle" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}>Real transformations. Every photo tells a story of what NEOS can do.</p>
        </div>
      </section>

      <section style={{ background: 'var(--bg-secondary)', padding: '1.5rem 0', position: 'sticky', top: '70px', zIndex: 100, borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{ background: filter === cat ? 'var(--accent-blue)' : 'transparent', color: filter === cat ? '#fff' : 'var(--text-secondary)', border: `1px solid ${filter === cat ? 'var(--accent-blue)' : 'var(--border)'}`, padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.25s ease' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '4rem 0' }}>Loading gallery...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '4rem 0' }}>No items in this category yet. Check back soon.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
              {filtered.map((item, i) => <GalleryCard key={item.id} item={item} onClick={() => setLightbox(i)} />)}
            </div>
          )}
        </div>
      </section>

      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', animation: 'fadeIn 0.2s ease' }}>
          <button style={{ position: 'absolute', left: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', color: '#fff', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={e => { e.stopPropagation(); setLightbox(l => (l - 1 + filtered.length) % filtered.length); }}>‹</button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', width: '100%' }}>
            <img src={filtered[lightbox]?.image_url} alt={filtered[lightbox]?.title} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '12px' }} />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <h3 style={{ color: '#fff', fontWeight: 700 }}>{filtered[lightbox]?.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.4rem' }}>{filtered[lightbox]?.description}</p>
            </div>
          </div>
          <button style={{ position: 'absolute', right: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', color: '#fff', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={e => { e.stopPropagation(); setLightbox(l => (l + 1) % filtered.length); }}>›</button>
          <button style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: '#fff', cursor: 'pointer', fontSize: '1.1rem' }}
            onClick={() => setLightbox(null)}>✕</button>
        </div>
      )}
    </main>
  );
}

function GalleryCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', position: 'relative', background: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'all 0.3s ease', transform: hovered ? 'translateY(-4px)' : 'translateY(0)', boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.4)' : 'none' }}>
      <div style={{ position: 'relative', overflow: 'hidden', height: '230px' }}>
        <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: hovered ? 'rgba(0,0,0,0.35)' : 'transparent', transition: 'background 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {hovered && <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600, animation: 'fadeIn 0.2s ease' }}>View ↗</div>}
        </div>
        <span style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(20,20,20,0.82)', backdropFilter: 'blur(8px)', color: 'var(--accent-blue)', fontSize: '0.7rem', fontWeight: 700, textTransform: 'capitalize', padding: '0.25rem 0.65rem', borderRadius: '50px', border: '1px solid var(--border)' }}>{item.category}</span>
      </div>
      <div style={{ padding: '1.1rem 1.25rem' }}>
        <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{item.title}</h3>
        {item.car_brand && <p style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', fontWeight: 600 }}>{item.car_brand}</p>}
        {item.description && <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{item.description}</p>}
      </div>
    </div>
  );
}
