import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/admin');
    });
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Invalid credentials. Please check your email and password.');
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(59,174,232,0.2)', borderRadius: '10px',
    padding: '0.9rem 1rem', color: '#e8e8e8', fontSize: '0.9rem',
    fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.25s',
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#111', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '1rem',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <img src="/images/logo.jpeg" alt="NEOS Automobile" style={{ height: '50px', borderRadius: '8px', margin: '0 auto 1.25rem' }} />
          <h1 style={{ color: '#e8e8e8', fontSize: '1.4rem', fontWeight: 700 }}>Admin Panel</h1>
          <p style={{ color: '#666', fontSize: '0.875rem', marginTop: '0.4rem' }}>NEOS Automobile Management</p>
        </div>

        <div style={{ background: '#1a1a1a', border: '1px solid rgba(59,174,232,0.15)', borderRadius: '16px', padding: '2rem' }}>
          <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#888', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>EMAIL</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="admin@neosauto.com" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#3BAEE8'}
                onBlur={e => e.target.style.borderColor = 'rgba(59,174,232,0.2)'} />
            </div>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#888', display: 'block', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>PASSWORD</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••" style={inputStyle}
                onFocus={e => e.target.style.borderColor = '#3BAEE8'}
                onBlur={e => e.target.style.borderColor = 'rgba(59,174,232,0.2)'} />
            </div>
            {error && (
              <p style={{ color: '#e85a5a', fontSize: '0.82rem', background: 'rgba(232,90,90,0.08)', padding: '0.7rem 0.9rem', borderRadius: '8px', border: '1px solid rgba(232,90,90,0.2)' }}>
                {error}
              </p>
            )}
            <button type="submit" disabled={loading} style={{
              background: '#3BAEE8', color: '#fff', border: 'none', borderRadius: '10px',
              padding: '0.9rem', fontWeight: 700, fontSize: '0.9rem', cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', opacity: loading ? 0.7 : 1, marginTop: '0.5rem',
              transition: 'all 0.25s',
            }}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>
          <p style={{ textAlign: 'center', color: '#444', fontSize: '0.75rem', marginTop: '1.5rem' }}>
            Create your admin account in Supabase → Authentication → Users
          </p>
        </div>
      </div>
    </div>
  );
}
