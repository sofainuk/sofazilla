import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { img, searchProducts } from '../data/products';
import { onImgError } from '../utils';

export default function SearchBar({ className = '' }: { className?: string }) {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const results = useMemo(() => (q.trim().length > 1 ? searchProducts(q.trim()).slice(0, 5) : []), [q]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
  };

  return (
    <form onSubmit={submit} role="search" className={`relative ${className}`}>
      <label htmlFor="site-search" className="sr-only">Search sofas</label>
      <input
        id="site-search" type="search" value={q} autoComplete="off"
        onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder="Search sofas, corner, velvet, recliner…"
        className="w-full bg-slate-100 border border-transparent focus:border-orange-500 focus:bg-white rounded-full py-3 pl-5 pr-14 text-sm outline-none transition-colors"
      />
      <button type="submit" aria-label="Search" className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-slate-900 hover:bg-orange-500 text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors">
        <Search size={16} />
      </button>

      {open && q.trim().length > 1 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50">
          {results.length ? (
            <>
              {results.map((p) => (
                <Link key={p.id} to={`/product/${p.id}`} onMouseDown={(e) => e.preventDefault()} onClick={() => { setOpen(false); setQ(''); }}
                  className="flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors">
                  <img src={img(p.photo, 160)} alt="" width={56} height={42} onError={onImgError} className="w-14 h-11 object-cover rounded-md bg-slate-100" />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-bold text-slate-900 truncate">{p.name}</span>
                    <span className="block text-xs text-slate-500">{p.layout}</span>
                  </span>
                  <span className="text-sm font-black text-slate-900">£{p.price}</span>
                </Link>
              ))}
              <Link to={`/shop?q=${encodeURIComponent(q.trim())}`} onMouseDown={(e) => e.preventDefault()} onClick={() => setOpen(false)}
                className="block text-center text-sm font-bold text-orange-600 py-3 border-t border-slate-100 hover:bg-slate-50">
                See all results
              </Link>
            </>
          ) : (
            <p className="p-4 text-sm text-slate-500">No match. Try “corner” or “velvet”, or <Link to="/contact" className="text-orange-600 font-bold">ask our expert</Link>.</p>
          )}
        </div>
      )}
    </form>
  );
}
