import { Link, useParams } from 'react-router-dom';
import { CheckCircle, ChevronRight, MessageCircle, Palette, Ruler, Shirt } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import MessengerButton from '../components/MessengerButton';
import ProductCard from '../components/ProductCard';
import ExpertCTA from '../components/ExpertCTA';
import NotFound from './NotFound';
import useTitle from '../useTitle';
import { PRODUCTS, categoryLabel, discountPct, img, imgSet } from '../data/products';
import { onImgError } from '../utils';
import type { Product } from '../types';

function Detail({ p }: { p: Product }) {
  useTitle(`${p.name} | SofaZilla`, p.description);

  const orderMsg = `Hi SofaZilla! I'd like to order the *${p.name}* (£${p.price}).\nPlease confirm the fabric, colour and size options and delivery time.`;
  const askMsg = `Hi SofaZilla! I have a question about the *${p.name}*.`;

  const related = [
    ...PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id),
    ...PRODUCTS.filter((x) => x.category !== p.category && x.id !== p.id),
  ].slice(0, 4);

  return (
    <>
      <main className="bg-white pb-36 md:pb-16 animate-fade">
        <nav aria-label="Breadcrumb" className="bg-slate-50 py-4 border-b border-slate-100 text-xs sm:text-sm font-semibold text-slate-500 px-4">
          <div className="max-w-7xl mx-auto flex items-center overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link to="/" className="hover:text-slate-900 shrink-0">Home</Link>
            <ChevronRight size={14} className="mx-2 shrink-0" />
            <Link to={`/shop/${encodeURIComponent(p.category)}`} className="hover:text-slate-900 shrink-0">{categoryLabel(p.category)}</Link>
            <ChevronRight size={14} className="mx-2 shrink-0" />
            <span className="text-slate-900 truncate">{p.name}</span>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="lg:w-1/2">
            <div className="lg:sticky lg:top-44">
              <div className="aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-100">
                <img src={img(p.photo, 1200)} srcSet={imgSet(p.photo)} sizes="(min-width:1024px) 50vw, 100vw" alt={p.name}
                  width={1200} height={900} fetchPriority="high" decoding="async" onError={onImgError} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-black px-4 py-2 rounded-full shadow-lg">{discountPct(p)}% OFF SALE</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {p.features.map((f) => (
                  <span key={f} className="flex items-center text-xs font-bold bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1.5 rounded-full">
                    <CheckCircle size={12} className="mr-1.5 text-green-500" /> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col">
            <p className="text-xs sm:text-sm font-bold text-orange-500 uppercase tracking-widest mb-2">{p.layout}</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{p.name}</h1>

            <div className="flex items-end gap-4 mb-6 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-100">
              <div>
                <span className="block text-sm font-bold text-slate-500 mb-1">Sale Price</span>
                <span className="text-5xl md:text-6xl font-black text-slate-900">£{p.price}</span>
              </div>
              <div className="mb-1 ml-4">
                <span className="block text-xs font-bold text-slate-400 uppercase">Was</span>
                <span className="text-xl md:text-2xl text-slate-400 line-through font-medium">£{p.oldPrice}</span>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-3 mb-8">
              <WhatsAppButton text="Order Now" message={orderMsg} className="py-4 text-lg" />
              <MessengerButton text="Message Us" className="py-4 text-lg" />
            </div>

            <p className="text-slate-600 leading-relaxed mb-8 text-base md:text-lg">{p.description}</p>

            {/* Display-only options: customers tell us their choice in chat */}
            <div className="border border-slate-200 rounded-2xl divide-y divide-slate-200 mb-8">
              <div className="p-5 md:p-6">
                <h2 className="flex items-center gap-2 font-black text-slate-900 mb-3"><Shirt size={18} className="text-orange-500" /> Available fabrics</h2>
                <ul className="flex flex-wrap gap-2">
                  {p.fabrics.map((f) => <li key={f} className="px-4 py-2 rounded-full bg-slate-100 text-sm font-bold text-slate-700">{f}</li>)}
                </ul>
              </div>
              <div className="p-5 md:p-6">
                <h2 className="flex items-center gap-2 font-black text-slate-900 mb-3"><Palette size={18} className="text-orange-500" /> Available colours</h2>
                <ul className="flex flex-wrap gap-5">
                  {p.colors.map((c) => (
                    <li key={c.name} className="flex flex-col items-center gap-2">
                      <span className="w-14 h-14 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: c.hex }} />
                      <span className="text-xs font-bold text-slate-600">{c.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-5 md:p-6">
                <h2 className="flex items-center gap-2 font-black text-slate-900 mb-3"><Ruler size={18} className="text-orange-500" /> Size <span className="text-xs font-normal text-slate-500">(approximate)</span></h2>
                <dl className="grid grid-cols-3 gap-4 text-center divide-x divide-slate-200">
                  {(['width', 'depth', 'height'] as const).map((k) => (
                    <div key={k} className="px-1">
                      <dt className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mb-1">{k}</dt>
                      <dd className="font-black text-slate-900 text-sm sm:text-base">{p.dimensions[k]}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-sm text-slate-500 mt-4">Need a different size? Ask our expert, we can often arrange it.</p>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-6">
              <h2 className="font-black text-xl mb-1 flex items-center gap-2"><MessageCircle size={20} className="text-[#25D366]" /> Let’s talk about your sofa</h2>
              <p className="text-slate-300 text-sm mb-5">Tell us the fabric, colour and size you like. We’ll confirm the price, availability and delivery date. No payment needed to enquire.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <WhatsAppButton text="Talk to an Expert" message={askMsg} className="py-3 px-6 flex-1" />
                <Link to="/contact" className="flex items-center justify-center font-bold rounded-lg py-3 px-6 bg-white text-slate-900 hover:bg-slate-100 flex-1">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <h2 className="text-3xl font-black mb-8 tracking-tight">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {related.map((r) => <ProductCard key={r.id} product={r} />)}
          </div>
        </section>

        <div className="md:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] z-30">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-sm font-bold text-slate-700 truncate pr-2">{p.name}</span>
            <span className="text-lg font-black text-slate-900">£{p.price}</span>
          </div>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <WhatsAppButton text="Order Now" message={orderMsg} className="py-3.5 text-base" />
            <MessengerButton text="Chat" className="py-3.5 px-5 text-base" />
          </div>
        </div>
      </main>
      <ExpertCTA />
    </>
  );
}

export default function ProductPage() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return <NotFound />;
  return <Detail key={product.id} p={product} />;
}
