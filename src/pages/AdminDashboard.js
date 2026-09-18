import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const STATUS_COLORS = {
  'new': { bg: 'rgba(59,174,232,0.15)', color: '#3BAEE8', label: 'New' },
  'in-progress': { bg: 'rgba(255,167,38,0.15)', color: '#FFA726', label: 'In Progress' },
  'completed': { bg: 'rgba(76,175,80,0.15)', color: '#4CAF50', label: 'Completed' },
  'closed': { bg: 'rgba(120,120,120,0.15)', color: '#888', label: 'Closed' },
};

const GALLERY_CATEGORIES = ['conversion', 'bodywork', 'painting', 'interior', 'upgrade'];

export default function AdminDashboard() {
  const [tab, setTab] = useState('contacts');
  const [contacts, setContacts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showAddGallery, setShowAddGallery] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', description: '', category: 'conversion', car_brand: '', image_url: '' });
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);
  const [statsSaving, setStatsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate('/admin/login'); return; }
      setUser(session.user);
      fetchAll();
    });
  }, [navigate]);

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: c }, { data: g }, { data: s }] = await Promise.all([
      supabase.from('contacts').select('*').order('created_at', { ascending: false }),
      supabase.from('gallery').select('*').order('display_order', { ascending: true }),
      supabase.from('stats').select('*'),
    ]);
    setContacts(c || []);
    setGallery(g || []);
    setStats(s || []);
    setLoading(false);
  };

  const logout = async () => { await supabase.auth.signOut(); navigate('/admin/login'); };

  const updateStatus = async (id, status) => {
    await supabase.from('contacts').update({ status }).eq('id', id);
    setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c));
    if (selected?.id === id) setSelected(s => ({ ...s, status }));
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this contact?')) return;
    await supabase.from('contacts').delete().eq('id', id);
    setContacts(prev => prev.filter(c => c.id !== id));
    setSelected(null);
  };

  const deleteGalleryItem = async (id) => {
    if (!window.confirm('Remove this gallery item?')) return;
    await supabase.from('gallery').delete().eq('id', id);
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const uploadImage = async (file) => {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const filename = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('gallery').upload(filename, file);
    if (error) { alert('Upload failed: ' + error.message); setUploading(false); return null; }
    const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(filename);
    setUploading(false);
    return publicUrl;
  };

  const addGalleryItem = async () => {
    if (!newItem.title || !newItem.image_url) { alert('Title and image are required.'); return; }
    const { data, error } = await supabase.from('gallery').insert([{ ...newItem, display_order: gallery.length }]).select();
    if (!error && data) {
      setGallery(prev => [...prev, data[0]]);
      setNewItem({ title: '', description: '', category: 'conversion', car_brand: '', image_url: '' });
      setShowAddGallery(false);
    }
  };

  const updateStat = (id, value) => {
    setStats(prev => prev.map(s => s.id === id ? { ...s, value: parseInt(value) || 0 } : s));
  };

  const updateStatLabel = (id, label) => {
    setStats(prev => prev.map(s => s.id === id ? { ...s, label } : s));
  };

  const saveStats = async () => {
    setStatsSaving(true);
    await Promise.all(stats.map(s => supabase.from('stats').update({ value: s.value, label: s.label }).eq('id', s.id)));
    setStatsSaving(false);
    alert('Stats saved! They will update on the homepage.');
  };

  const newContacts = contacts.filter(c => c.status === 'new').length;

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#111', minHeight: '100vh', color: '#e8e8e8' }}>
      {/* Top bar */}
      <div style={{ background: '#1a1a1a', borderBottom: '1px solid rgba(59,174,232,0.15)', padding: '0.9rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/images/logo.jpeg" alt="NEOS" style={{ height: '36px', borderRadius: '6px' }} />
          <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Admin Panel</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: '#666' }}>{user?.email}</span>
          <button onClick={logout} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#888', padding: '0.4rem 0.9rem', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit' }}>Logout</button>
        </div>
      </div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Enquiries', value: contacts.length, color: '#3BAEE8' },
            { label: 'New / Unread', value: newContacts, color: '#FFA726' },
            { label: 'Completed Jobs', value: contacts.filter(c => c.status === 'completed').length, color: '#4CAF50' },
            { label: 'Gallery Items', value: gallery.length, color: '#3BAEE8' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#1a1a1a', border: '1px solid rgba(59,174,232,0.12)', borderRadius: '12px', padding: '1.25rem 1.5rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: '0.78rem', color: '#666', marginTop: '0.2rem', fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { key: 'contacts', label: `Enquiries${newContacts > 0 ? ` (${newContacts} new)` : ''}` },
            { key: 'gallery', label: 'Gallery' },
            { key: 'stats', label: 'Homepage Stats' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{ background: tab === t.key ? '#3BAEE8' : 'transparent', color: tab === t.key ? '#fff' : '#888', border: `1px solid ${tab === t.key ? '#3BAEE8' : 'rgba(255,255,255,0.1)'}`, borderRadius: '8px', padding: '0.6rem 1.25rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.875rem', transition: 'all 0.2s' }}>
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#444', padding: '4rem' }}>Loading...</div>
        ) : tab === 'contacts' ? (
          <ContactsPanel contacts={contacts} selected={selected} setSelected={setSelected} updateStatus={updateStatus} deleteContact={deleteContact} />
        ) : tab === 'gallery' ? (
          <GalleryPanel gallery={gallery} showAdd={showAddGallery} setShowAdd={setShowAddGallery} newItem={newItem} setNewItem={setNewItem} addItem={addGalleryItem} deleteItem={deleteGalleryItem} uploadImage={uploadImage} uploading={uploading} />
        ) : (
          <StatsPanel stats={stats} updateStat={updateStat} updateStatLabel={updateStatLabel} saveStats={saveStats} saving={statsSaving} />
        )}
      </div>
    </div>
  );
}

function StatsPanel({ stats, updateStat, updateStatLabel, saveStats, saving }) {
  return (
    <div style={{ background: '#1a1a1a', border: '1px solid rgba(59,174,232,0.12)', borderRadius: '14px', padding: '2rem' }}>
      <h3 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>Homepage Stats Editor</h3>
      <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '2rem' }}>These numbers appear on the hero section of the homepage. Update them as your business grows.</p>
      <div style={{ display: 'grid', gap: '1.25rem', maxWidth: '600px' }}>
        {stats.map(s => (
          <div key={s.id} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'end' }}>
            <div>
              <label style={{ fontSize: '0.72rem', color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>Label</label>
              <input value={s.label} onChange={e => updateStatLabel(s.id, e.target.value)}
                style={{ width: '100%', background: '#222', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.65rem 0.85rem', color: '#e8e8e8', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.72rem', color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.4rem' }}>Value (number only)</label>
              <input type="number" value={s.value} onChange={e => updateStat(s.id, e.target.value)} min="0"
                style={{ width: '100%', background: '#222', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.65rem 0.85rem', color: '#3BAEE8', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'inherit', outline: 'none' }} />
            </div>
          </div>
        ))}
      </div>
      <button onClick={saveStats} disabled={saving} style={{ marginTop: '1.5rem', background: '#3BAEE8', color: '#fff', border: 'none', borderRadius: '10px', padding: '0.8rem 2rem', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.9rem', opacity: saving ? 0.7 : 1 }}>
        {saving ? 'Saving...' : 'Save & Update Homepage →'}
      </button>
    </div>
  );
}

function ContactsPanel({ contacts, selected, setSelected, updateStatus, deleteContact }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: '1rem' }}>
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(59,174,232,0.12)', borderRadius: '14px', overflow: 'hidden' }}>
        {contacts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#444' }}>No enquiries yet. They'll appear here when clients submit the contact form.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Name', 'Car', 'Service', 'Contact', 'Status', 'Date', ''].map(h => (
                    <th key={h} style={{ padding: '0.85rem 1rem', textAlign: 'left', color: '#555', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map(c => {
                  const sc = STATUS_COLORS[c.status] || STATUS_COLORS['new'];
                  return (
                    <tr key={c.id} onClick={() => setSelected(selected?.id === c.id ? null : c)} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', background: selected?.id === c.id ? 'rgba(59,174,232,0.05)' : 'transparent', transition: 'background 0.2s' }}
                      onMouseEnter={e => { if (selected?.id !== c.id) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                      onMouseLeave={e => { if (selected?.id !== c.id) e.currentTarget.style.background = 'transparent'; }}>
                      <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#e8e8e8' }}>{c.name}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#999' }}>{c.car_brand} {c.car_model}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#999', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.service_type}</td>
                      <td style={{ padding: '0.85rem 1rem', color: '#999' }}>{c.preferred_contact}</td>
                      <td style={{ padding: '0.85rem 1rem' }}><span style={{ background: sc.bg, color: sc.color, fontSize: '0.72rem', fontWeight: 700, padding: '0.25rem 0.65rem', borderRadius: '50px' }}>{sc.label}</span></td>
                      <td style={{ padding: '0.85rem 1rem', color: '#555', whiteSpace: 'nowrap', fontSize: '0.78rem' }}>{new Date(c.created_at).toLocaleDateString()}</td>
                      <td style={{ padding: '0.85rem 1rem' }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(59,174,232,0.15)', borderRadius: '14px', padding: '1.5rem', height: 'fit-content', position: 'sticky', top: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.2rem' }}>{selected.name}</h3>
              <p style={{ color: '#666', fontSize: '0.8rem' }}>{new Date(selected.created_at).toLocaleString()}</p>
            </div>
            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { label: 'Phone', value: selected.phone, href: `tel:${selected.phone}` },
              { label: 'Email', value: selected.email, href: `mailto:${selected.email}` },
              { label: 'Car', value: `${selected.car_brand} ${selected.car_model}` },
              { label: 'Service', value: selected.service_type },
              { label: 'Preferred Contact', value: selected.preferred_contact },
            ].map(f => (
              <div key={f.label}>
                <p style={{ fontSize: '0.7rem', color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>{f.label}</p>
                {f.href ? <a href={f.href} style={{ color: '#3BAEE8', fontWeight: 500, fontSize: '0.875rem' }}>{f.value}</a> : <p style={{ color: '#e8e8e8', fontSize: '0.875rem', fontWeight: 500 }}>{f.value}</p>}
              </div>
            ))}
            {selected.message && (
              <div>
                <p style={{ fontSize: '0.7rem', color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>Message</p>
                <p style={{ color: '#aaa', fontSize: '0.875rem', lineHeight: 1.6, background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>{selected.message}</p>
              </div>
            )}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.7rem', color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Update Status</p>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {Object.entries(STATUS_COLORS).map(([key, sc]) => (
                <button key={key} onClick={() => updateStatus(selected.id, key)} style={{ background: selected.status === key ? sc.bg : 'transparent', color: selected.status === key ? sc.color : '#555', border: `1px solid ${selected.status === key ? sc.color : 'rgba(255,255,255,0.08)'}`, borderRadius: '6px', padding: '0.3rem 0.7rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.2s' }}>{sc.label}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${selected.phone?.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: '#25D366', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.6rem', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.8rem', textAlign: 'center', display: 'block' }}>WhatsApp</a>
            <a href={`tel:${selected.phone}`} style={{ flex: 1, background: '#3BAEE8', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.6rem', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.8rem', textAlign: 'center', display: 'block' }}>Call</a>
            <button onClick={() => deleteContact(selected.id)} style={{ background: 'rgba(232,90,90,0.1)', color: '#e85a5a', border: '1px solid rgba(232,90,90,0.2)', borderRadius: '8px', padding: '0.6rem 0.9rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.8rem' }}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryPanel({ gallery, showAdd, setShowAdd, newItem, setNewItem, addItem, deleteItem, uploadImage, uploading }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <p style={{ color: '#666', fontSize: '0.875rem' }}>{gallery.length} items in gallery</p>
        <button onClick={() => setShowAdd(!showAdd)} style={{ background: '#3BAEE8', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.65rem 1.25rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.875rem' }}>
          {showAdd ? 'Cancel' : '+ Add Photo'}
        </button>
      </div>

      {showAdd && (
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(59,174,232,0.2)', borderRadius: '14px', padding: '1.5rem', marginBottom: '1.5rem', animation: 'fadeInUp 0.3s ease' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '1rem' }}>Add Gallery Item</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {[{ key: 'title', label: 'Title *', placeholder: 'e.g. Range Rover Full Conversion' }, { key: 'car_brand', label: 'Car Brand', placeholder: 'e.g. Range Rover' }, { key: 'description', label: 'Description', placeholder: 'Short description' }].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: '0.75rem', color: '#666', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>{f.label}</label>
                <input value={newItem[f.key]} onChange={e => setNewItem(n => ({ ...n, [f.key]: e.target.value }))} placeholder={f.placeholder}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.7rem 0.9rem', color: '#e8e8e8', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none' }} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: '0.75rem', color: '#666', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Category</label>
              <select value={newItem.category} onChange={e => setNewItem(n => ({ ...n, category: e.target.value }))}
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '0.7rem 0.9rem', color: '#e8e8e8', fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}>
                {GALLERY_CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#1a1a1a' }}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label style={{ fontSize: '0.75rem', color: '#666', display: 'block', marginBottom: '0.4rem', fontWeight: 600 }}>Upload Image *</label>
            <input type="file" accept="image/*" onChange={async (e) => { const file = e.target.files[0]; if (file) { const url = await uploadImage(file); if (url) setNewItem(n => ({ ...n, image_url: url })); } }} style={{ color: '#e8e8e8', fontSize: '0.875rem' }} />
            {uploading && <p style={{ color: '#3BAEE8', fontSize: '0.8rem', marginTop: '0.4rem' }}>Uploading...</p>}
            {newItem.image_url && !uploading && <p style={{ color: '#4CAF50', fontSize: '0.8rem', marginTop: '0.4rem' }}>✓ Image uploaded</p>}
          </div>
          <button onClick={addItem} disabled={uploading || !newItem.title || !newItem.image_url}
            style={{ marginTop: '1.25rem', background: '#3BAEE8', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.7rem 1.5rem', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: '0.875rem', opacity: uploading ? 0.5 : 1 }}>
            Add to Gallery
          </button>
        </div>
      )}

      {gallery.length === 0 ? (
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(59,174,232,0.12)', borderRadius: '14px', padding: '4rem', textAlign: 'center', color: '#444' }}>
          No gallery items yet. Click "Add Photo" to upload your first work showcase.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {gallery.map(item => (
            <div key={item.id} style={{ background: '#1a1a1a', border: '1px solid rgba(59,174,232,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '180px' }}>
                <img src={item.image_url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: 'rgba(20,20,20,0.85)', color: '#3BAEE8', fontSize: '0.7rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '50px', textTransform: 'capitalize' }}>{item.category}</span>
              </div>
              <div style={{ padding: '1rem' }}>
                <h4 style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>{item.title}</h4>
                {item.car_brand && <p style={{ color: '#3BAEE8', fontSize: '0.78rem', fontWeight: 600 }}>{item.car_brand}</p>}
                {item.description && <p style={{ color: '#666', fontSize: '0.78rem', marginTop: '0.3rem' }}>{item.description}</p>}
                <button onClick={() => deleteItem(item.id)} style={{ marginTop: '0.75rem', background: 'rgba(232,90,90,0.08)', color: '#e85a5a', border: '1px solid rgba(232,90,90,0.15)', borderRadius: '6px', padding: '0.35rem 0.75rem', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.75rem', fontWeight: 600 }}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
