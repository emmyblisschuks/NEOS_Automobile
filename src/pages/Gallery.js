import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const CATEGORIES = ['all', 'conversion', 'upgrade', 'electrical', 'bodywork', 'painting', 'interior'];

const PLACEHOLDER_ITEMS = [
  { id: 1, title: 'Engine Swap - Nissan Patrol', category: 'conversion', image_url: '/images/hero1.jpg', car_brand: 'Nissan', description: 'Full V10 engine conversion' },
  { id: 2, title: 'Body Restoration', category: 'bodywork', image_url: '/images/hero2.jpg', car_brand: 'Toyota', description: 'Before & after body restoration' },
  { id: 3, title: 'Engine Upgrade', category: 'upgrade', image_url: '/images/hero3.jpg', car_brand: 'Volkswagen', description: 'Clean engine bay upgrade' },
  { id: 4, title: 'Workshop Lift Service', category: 'upgrade', image_url: '/images/hero4.jpg', car_brand: 'Lexus', description: 'Full undercarriage service' },
];

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data, error } = await supabase.from('gallery').select('*').order('display_order', { ascending: true });
      if (error) throw error;
      setItems(data && data.length > 0 ? data : PLACEHOLDER_ITEMS);
    } catch {
      setItems(PLACEHOLDER_ITEMS);
    } finally {
      setLoading(false);
    }
  };

  const filtered = filter === 'all' ? items : items.filter(i => i.category === filter);

  return (
    <main style={{ paddingTop: '5rem' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #0d1a26 0%, var(--bg-primary) 100%)', padding: '5rem 0 4rem' }}>
        <div className="container">
          <span className="section-label">Our Work</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Gallery</h1>
          <p className="section-subtitle">Real work. Real results. Every photo is a job we're proud of.</p>
        </div>
      </section>

      {/* Filter tabs */}
      <section style={{ background: 'var(--bg-secondary)', padding: '1.5rem 0', position: 'sticky', top: '70px', zIndex: 100, borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{
                background: filter === cat ? 'var(--accent-blue)' : 'transparent',
                color: filter === cat ? '#fff' : 'var(--text-secondary)',
                border: `1px solid ${filter === cat ? 'var(--accent-blue)' : 'var(--border)'}`,
                padding: '0.4rem 1rem', borderRadius: '50px',
                fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                textTransform: 'capitalize', transition: 'all 0.25s ease',
                letterSpacing: '0.03em',
              }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="section-padding">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '4rem 0' }}>Loading gallery...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '4rem 0' }}>
              <p>No items in this category yet. Check back soon.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.25rem',
            }}>
              {filtered.map((item, i) => (
                <GalleryCard key={item.id} item={item} onClick={() => setLightbox(i)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)',
            zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1rem', animation: 'fadeIn 0.2s ease',
          }}
        >
          <button onClick={() => setLightbox(l => (l - 1 + filtered.length) % filtered.length)}
            style={{ position: 'absolute', left: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={e => { e.stopPropagation(); setLightbox(l => (l - 1 + filtered.length) % filtered.length); }}>
            ‹
          </button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', width: '100%' }}>
            <img src={filtered[lightbox]?.image_url} alt={filtered[lightbox]?.title}
              style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '12px' }} />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <h3 style={{ color: '#fff', fontWeight: 700 }}>{filtered[lightbox]?.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.4rem' }}>{filtered[lightbox]?.description}</p>
            </div>
          </div>
          <button
            style={{ position: 'absolute', right: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '48px', height: '48px', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onClick={e => { e.stopPropagation(); setLightbox(l => (l + 1) % filtered.length); }}>
            ›
          </button>
          <button
            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}
            onClick={() => setLightbox(null)}>
            ✕
          </button>
        </div>
      )}
    </main>
  );
}

function GalleryCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', position: 'relative', background: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'all 0.3s ease', transform: hovered ? 'translateY(-4px)' : 'translateY(0)', boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.4)' : 'none' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', height: '230px' }}>
        <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: hovered ? 'rgba(0,0,0,0.4)' : 'transparent', transition: 'background 0.3s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {hovered && (
            <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', animation: 'fadeIn 0.2s ease' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
              View
            </div>
          )}
        </div>
        <span style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(20,20,20,0.8)', backdropFilter: 'blur(8px)', color: 'var(--accent-blue)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'capitalize', padding: '0.25rem 0.65rem', borderRadius: '50px', border: '1px solid var(--border)' }}>
          {item.category}
        </span>
      </div>
      <div style={{ padding: '1.1rem 1.25rem' }}>
        <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{item.title}</h3>
        {item.car_brand && <p style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', fontWeight: 600 }}>{item.car_brand}</p>}
        {item.description && <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{item.description}</p>}
      </div>
    </div>
  );
}
