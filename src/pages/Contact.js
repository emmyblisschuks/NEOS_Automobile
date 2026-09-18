import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const SERVICES = ['Full Exterior Conversion', 'Full Interior Conversion', 'Painting & Buffing', 'Body Work', 'Electrical Repairs', 'Upgrade & Styling', 'Not sure – need advice'];
const BRANDS = ['Toyota', 'Lexus', 'Mercedes-Benz', 'Range Rover', 'G-Wagon', 'Other'];
const CONTACT_METHODS = ['WhatsApp', 'Phone Call', 'Email'];

const inputStyle = { width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.85rem 1rem', color: 'var(--text-primary)', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.25s ease' };

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', car_brand: '', car_model: '', service_type: '', preferred_contact: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleFocus = (e) => { e.target.style.borderColor = 'var(--accent-blue)'; };
  const handleBlur = (e) => { e.target.style.borderColor = 'var(--border)'; };

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabase.from('contacts').insert([form]);
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', phone: '', car_brand: '', car_model: '', service_type: '', preferred_contact: '', message: '' });
    } catch { setStatus('error'); }
  };

  return (
    <main style={{ paddingTop: '5rem' }}>
      <section style={{ background: 'linear-gradient(135deg, #0d1a26 0%, var(--bg-primary) 100%)', padding: '5rem 0 4rem' }}>
        <div className="container">
          <span className="section-label">Get In Touch</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)' }}>Let's Talk About Your Vehicle</h1>
          <p className="section-subtitle">Tell us what you're driving and what you want done — we'll come back with a clear plan and honest quote.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

            {/* Contact Info */}
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Reach Us Directly</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <ContactItem icon="📞" label="Call Us" value="+234 816 287 3089" href="tel:+2348162873089" />
                <ContactItem icon="💬" label="WhatsApp" value="+234 816 246 5247" href="https://wa.me/2348162465247" />
              </div>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.75rem' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1rem' }}>We Specialise In</h3>
                {['Toyota', 'Lexus', 'Mercedes-Benz', 'Range Rover', 'G-Wagon'].map(b => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-blue)' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{b}</span>
                  </div>
                ))}
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  We respond to all enquiries within 24 hours. For urgent jobs, WhatsApp is fastest.
                </p>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>Send a Quote Request</h2>
              {status === 'success' ? (
                <div style={{ background: 'rgba(59,174,232,0.08)', border: '1px solid var(--accent-blue)', borderRadius: '16px', padding: '3rem', textAlign: 'center', animation: 'fadeInUp 0.4s ease' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Message Received!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>We've received your enquiry and will get back to you within 24 hours. For faster response, WhatsApp us directly.</p>
                  <a href="https://wa.me/2348162465247" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>Continue on WhatsApp</a>
                </div>
              ) : (
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Full Name *</label>
                      <input name="name" value={form.name} onChange={handle} onFocus={handleFocus} onBlur={handleBlur} required placeholder="Your name" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Phone Number *</label>
                      <input name="phone" value={form.phone} onChange={handle} onFocus={handleFocus} onBlur={handleBlur} required placeholder="+234..." style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handle} onFocus={handleFocus} onBlur={handleBlur} required placeholder="your@email.com" style={inputStyle} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Car Brand *</label>
                      <select name="car_brand" value={form.car_brand} onChange={handle} onFocus={handleFocus} onBlur={handleBlur} required style={{ ...inputStyle, cursor: 'pointer' }}>
                        <option value="">Select brand</option>
                        {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Car Model *</label>
                      <input name="car_model" value={form.car_model} onChange={handle} onFocus={handleFocus} onBlur={handleBlur} required placeholder="e.g. GLE 350" style={inputStyle} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Service Required *</label>
                    <select name="service_type" value={form.service_type} onChange={handle} onFocus={handleFocus} onBlur={handleBlur} required style={{ ...inputStyle, cursor: 'pointer' }}>
                      <option value="">Select a service</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.6rem', letterSpacing: '0.05em' }}>Preferred Contact Method *</label>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {CONTACT_METHODS.map(m => (
                        <label key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', color: form.preferred_contact === m ? 'var(--accent-blue)' : 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: form.preferred_contact === m ? 600 : 400 }}>
                          <input type="radio" name="preferred_contact" value={m} checked={form.preferred_contact === m} onChange={handle} style={{ accentColor: 'var(--accent-blue)' }} required />{m}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>Additional Details</label>
                    <textarea name="message" value={form.message} onChange={handle} onFocus={handleFocus} onBlur={handleBlur} rows={4} placeholder="Describe the work you need, current condition of the vehicle, or anything else we should know..." style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }} />
                  </div>
                  {status === 'error' && <p style={{ color: '#e85a5a', fontSize: '0.85rem', background: 'rgba(232,90,90,0.08)', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(232,90,90,0.2)' }}>Something went wrong. Please try again or WhatsApp us directly.</p>}
                  <button type="submit" className="btn-primary" disabled={status === 'loading'} style={{ marginTop: '0.5rem', opacity: status === 'loading' ? 0.7 : 1, justifyContent: 'center' }}>
                    {status === 'loading' ? 'Sending...' : 'Send Quote Request →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactItem({ icon, label, value, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', transition: 'all 0.25s ease', color: 'inherit' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-blue)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; }}>
      <span style={{ fontSize: '1.4rem' }}>{icon}</span>
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</p>
        <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.1rem' }}>{value}</p>
      </div>
    </a>
  );
}
