'use client';
import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Save, LogOut, LayoutDashboard, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

interface Property {
  id: string;
  name: string;
  location: string;
  size: string;
  price: string;
  description: string;
  image: string;
}

export default function AdminPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [saved, setSaved] = useState(false);
  const adminRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/properties')
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (auth && adminRef.current) {
      gsap.fromTo(adminRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power3.out' });
      gsap.fromTo('.admin-item', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out', delay: 0.2 });
    }
  }, [auth]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(properties),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Error saving changes');
    }
    setSaving(false);
  };

  const handleUpdate = (index: number, field: keyof Property, value: string) => {
    const newProps = [...properties];
    newProps[index] = { ...newProps[index], [field]: value };
    setProperties(newProps);
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="mb-12 text-center">
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold tracking-[-0.03em] mb-4">Aurelia Backoffice</h1>
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-[#AAAAAA]">Secure Gateway</p>
          </div>
          <div className="space-y-8">
            <div className="border-b border-[#E8E8E8] focus-within:border-[#0C0C0C] transition-colors">
              <input
                type="password"
                placeholder="Access Key (demo: 123)"
                className="w-full bg-transparent py-5 text-center text-lg outline-none font-medium tracking-tight"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (password === '123' ? setAuth(true) : alert('Invalid Access Key'))}
              />
            </div>
            <button
              onClick={() => { if (password === '123') setAuth(true); else alert('Invalid Access Key'); }}
              className="w-full bg-[#0C0C0C] text-white py-5 text-[13px] font-bold uppercase tracking-widest hover:bg-[#333] transition-all flex items-center justify-center gap-3"
            >
              Initialize Session
            </button>
            <Link href="/" className="block text-center text-[10px] uppercase tracking-[0.2em] text-[#AAAAAA] hover:text-[#0C0C0C] transition-colors">Exit to Site</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={adminRef} className="bg-[#FAFAFA] min-h-screen pb-24">
      {/* Editorial Header Bar */}
      <header className="bg-white border-b border-[#E8E8E8] sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="hover:opacity-50 transition-all"><ArrowLeft size={18} /></Link>
            <div className="h-6 w-[1px] bg-[#E8E8E8]" />
            <div className="flex items-center gap-3">
              <LayoutDashboard size={14} className="text-[#0C0C0C]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Inventory Management</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${saved ? 'bg-green-50 text-green-600' : 'bg-[#FAFAFA] text-[#888]'}`}>
              {saved ? '✓ Verified Save' : 'Draft Session'}
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#0C0C0C] text-white text-[11px] font-bold uppercase tracking-widest px-8 py-3.5 hover:bg-[#333] transition-all disabled:opacity-50"
            >
              {saving ? 'Syncing…' : 'Commit Changes'}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-8 lg:px-12 py-16">
        <div className="mb-16 admin-item">
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.03em] mb-4">Portfolio Control</h1>
          <p className="text-[#888] text-lg font-light">Modify live property inventory across all regions. Ensure high-resolution assets are used for primary imagery.</p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {properties.map((prop, index) => (
            <div key={prop.id} className="admin-item bg-white border border-[#E8E8E8] p-10 lg:p-14 transition-all hover:border-[#0C0C0C] group">
              <div className="flex flex-col lg:flex-row gap-12">
                
                {/* Visual Preview */}
                <div className="lg:w-1/3">
                  <div className="aspect-[3/2] bg-[#F5F5F5] overflow-hidden relative mb-6">
                    <div 
                      className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" 
                      style={{ backgroundImage: `url(${prop.image})` }} 
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-[#AAAAAA] uppercase tracking-widest">Registry ID</p>
                    <p className="text-xs font-mono font-medium">{prop.id}</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="border-b border-[#F5F5F5] focus-within:border-[#0C0C0C] transition-colors">
                    <label className="block text-[10px] text-[#AAAAAA] uppercase tracking-widest mb-1">Asset Name</label>
                    <input
                      value={prop.name}
                      onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                      className="w-full bg-transparent py-3 text-lg font-bold outline-none"
                    />
                  </div>
                  <div className="border-b border-[#F5F5F5] focus-within:border-[#0C0C0C] transition-colors">
                    <label className="block text-[10px] text-[#AAAAAA] uppercase tracking-widest mb-1">Valuation</label>
                    <input
                      value={prop.price}
                      onChange={(e) => handleUpdate(index, 'price', e.target.value)}
                      className="w-full bg-transparent py-3 text-lg font-bold outline-none"
                    />
                  </div>
                  <div className="border-b border-[#F5F5F5] focus-within:border-[#0C0C0C] transition-colors">
                    <label className="block text-[10px] text-[#AAAAAA] uppercase tracking-widest mb-1">Geographic Location</label>
                    <input
                      value={prop.location}
                      onChange={(e) => handleUpdate(index, 'location', e.target.value)}
                      className="w-full bg-transparent py-3 text-base font-medium outline-none"
                    />
                  </div>
                  <div className="border-b border-[#F5F5F5] focus-within:border-[#0C0C0C] transition-colors">
                    <label className="block text-[10px] text-[#AAAAAA] uppercase tracking-widest mb-1">Dimensional Size</label>
                    <input
                      value={prop.size}
                      onChange={(e) => handleUpdate(index, 'size', e.target.value)}
                      className="w-full bg-transparent py-3 text-base font-medium outline-none"
                    />
                  </div>
                  <div className="md:col-span-2 border-b border-[#F5F5F5] focus-within:border-[#0C0C0C] transition-colors">
                    <label className="block text-[10px] text-[#AAAAAA] uppercase tracking-widest mb-1">Editorial Description</label>
                    <textarea
                      value={prop.description}
                      onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full bg-transparent py-3 text-sm font-light leading-relaxed outline-none resize-none"
                    />
                  </div>
                  <div className="md:col-span-2 border-b border-[#F5F5F5] focus-within:border-[#0C0C0C] transition-colors">
                    <label className="block text-[10px] text-[#AAAAAA] uppercase tracking-widest mb-1">Primary Asset Source (URL)</label>
                    <input
                      value={prop.image}
                      onChange={(e) => handleUpdate(index, 'image', e.target.value)}
                      className="w-full bg-transparent py-3 text-[13px] font-mono outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="admin-item mt-12 w-full border-2 border-dashed border-[#E8E8E8] py-12 flex flex-col items-center justify-center gap-4 text-[#AAAAAA] hover:text-[#0C0C0C] hover:border-[#0C0C0C] transition-all">
          <Plus size={24} />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em]">Add New Asset to Portfolio</span>
        </button>
      </main>

      <footer className="max-w-[1400px] mx-auto px-8 lg:px-12 py-12 border-t border-[#E8E8E8] flex justify-between items-center text-[#AAAAAA]">
        <span className="text-[10px] uppercase tracking-widest">© 2024 Aurelia Backoffice</span>
        <button onClick={() => setAuth(false)} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-[#0C0C0C] transition-colors">
          <LogOut size={12} /> Terminate Session
        </button>
      </footer>
    </div>
  );
}
