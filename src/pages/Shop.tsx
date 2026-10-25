import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ExpertCTA from '../components/ExpertCTA';
import useTitle from '../useTitle';
import { CATEGORIES, MATERIALS, SIZES, categoryLabel, discountPct, filterProducts } from '../data/products';

type Mode = 'sale' | 'new';

const chip = (on: boolean) =>
  `px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all border ${on ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`;

export default function Shop({ mode }: { mode?: Mode }) {
  const { category } = useParams();
  const [sp, setSp] = useSearchParams();
  const valid = !category || CATEGORIES.some((c) => c.id === category);

  const q = sp.get('q') ?? '';
  const material = sp.get('material') ?? '';
  const size = sp.get('size') ?? '';
  const sort = sp.get('sort') ?? (mode === 'sale' ? 'discount' : 'featured');

  const heading = q ? `Results for “${q}”` : mode === 'sale' ? 'Mega Sale' : mode === 'new' ? 'New In' : category ? categoryLabel(category) : 'All Sofas';
  useTitle(`${heading} | SofaZilla`);

  if (!valid) return <Navigate to="/shop" replace />;

  const list = filterProducts({ category, q, material: material || undefined, size: size || undefined, mode });
  if (sort === 'low') list.sort((a, b) => a.price - b.price);
  if (sort === 'high') list.sort((a, b) => b.price - a.price);
  if (sort === 'discount') list.sort((a, b) => discountPct(b) - discountPct(a));

  const setParam = (k: string, v: string) => {
    const n = new URLSearchParams(sp);
    if (v && n.get(k) !== v) n.set(k, v); else n.delete(k);
    setSp(n, { replace: true });
  };
  const base = mode === 'sale' ? '/sale' : mode === 'new' ? '/new' : '/shop';
  const hasFilters = Boolean(q || material || size);

  return (
    <>
      <main className="min-h-screen py-10 md:py-16 bg-slate-50 animate-fade">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight">{heading}</h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              {mode === 'sale' ? 'Biggest savings first. Message us to reserve your sofa.' : 'Browse handcrafted UK sofas. See the fabrics, colours and sizes on each page, then chat with our expert to order.'}
            </p>
          </header>

          {!mode && (
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Link to="/shop" className={chip(!category)}>All</Link>
              {CATEGORIES.map((c) => <Link key={c.id} to={`/shop/${encodeURIComponent(c.id)}`} className={chip(c.id === category)}>{c.label}</Link>)}
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 mb-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400 mr-1"><SlidersHorizontal size={14} /> Material</span>
              {MATERIALS.map((m) => <button key={m} onClick={() => setParam('material', m)} className={chip(material === m)}>{m}</button>)}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-slate-400 mr-1"><SlidersHorizontal size={14} /> Size</span>
              {SIZES.map((s) => <button key={s.id} onClick={() => setParam('size', s.id)} className={chip(size === s.id)} title={s.hint}>{s.label}</button>)}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <p className="text-sm font-semibold text-slate-600">{list.length} product{list.length === 1 ? '' : 's'}</p>
              <div className="flex items-center gap-3">
                {hasFilters && <Link to={base} className="text-sm font-bold text-orange-600 hover:underline">Clear filters</Link>}
                <label className="text-sm text-slate-500 flex items-center gap-2">Sort
                  <select value={sort} onChange={(e) => setParam('sort', e.target.value)} className="border border-slate-200 rounded-lg py-1.5 px-2 text-sm font-semibold text-slate-800 bg-white">
                    <option value="featured">Featured</option>
                    <option value="discount">Biggest discount</option>
                    <option value="low">Price: low to high</option>
                    <option value="high">Price: high to low</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          {list.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {list.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 4} />)}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
              <p className="text-xl font-black mb-2">No sofas match that.</p>
              <p className="text-slate-500 mb-6">Try clearing the filters, or ask our expert. We may be able to source it.</p>
              <Link to={base} className="bg-slate-900 text-white font-bold py-3 px-8 rounded-full">Show all</Link>
            </div>
          )}
        </div>
      </main>
      <ExpertCTA title="Can’t find exactly what you want?" text="Tell us what you’re looking for. We can often arrange other sizes, fabrics and colours." />
    </>
  );
}
