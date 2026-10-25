import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, MessageCircle, Palette, Shield, Sofa, Tag, Truck } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import WhatsAppButton from '../components/WhatsAppButton';
import MessengerButton from '../components/MessengerButton';
import ExpertCTA from '../components/ExpertCTA';
import useTitle from '../useTitle';
import { CATEGORIES, MATERIALS, PRODUCTS, REVIEWS, img } from '../data/products';
import { FAQ } from '../data/faq';
import { onImgError } from '../utils';

const SLIDES = [
  { photo: 'photo-1555041469-a586c61ea9bc', title: 'Premium UK Sofas', sub: 'Handcrafted comfort delivered to your living room. Order by chat with our experts.' },
  { photo: 'photo-1605774337664-7a846e9cdf17', title: 'Timeless Elegance', sub: 'Discover our Chesterfield and classic 3+2 collections.' },
];

function Hero() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);
  const slide = SLIDES[current];

  return (
    <section className="relative h-[75vh] sm:h-[80vh] w-full overflow-hidden bg-slate-900">
      {SLIDES.map((s, i) => (
        <img key={s.photo} src={img(s.photo, 1600)} srcSet={`${img(s.photo, 800)} 800w, ${img(s.photo, 1600)} 1600w`} sizes="100vw"
          alt="" width={1600} height={900} loading={i === 0 ? 'eager' : 'lazy'} fetchPriority={i === 0 ? 'high' : 'auto'} decoding="async" onError={onImgError}
          className={`absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-1000 ${i === current ? '!opacity-60' : ''}`} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div key={current} className="max-w-3xl mx-auto animate-fade">
          <span className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black px-4 py-1.5 mb-6 text-xs sm:text-sm tracking-widest uppercase rounded-full shadow-lg">Mega Sale Now On</span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">{slide.title}</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-10 font-light">{slide.sub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/shop" className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 font-black py-4 px-10 rounded-full transition-all flex items-center justify-center text-lg hover:scale-105">
              Shop The Sale <ArrowRight size={20} className="ml-2" />
            </Link>
            <WhatsAppButton text="Talk to an Expert" className="w-full sm:w-auto py-4 px-8 rounded-full text-lg" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 left-0 right-0 z-10 flex justify-center gap-2">
        {SLIDES.map((s, i) => (
          <button key={s.photo} onClick={() => setCurrent(i)} aria-label={`Show slide ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} />
        ))}
      </div>
    </section>
  );
}

const TRUST = [
  { icon: Award, label: 'UK Built' }, { icon: Shield, label: '5 Yr Frame' },
  { icon: Truck, label: 'Fast Delivery' }, { icon: Sofa, label: 'Plush Fabrics' },
];

function TrustStrip() {
  return (
    <div className="bg-slate-50 border-b border-slate-200 py-7">
      <div className="max-w-7xl mx-auto px-4 flex justify-center flex-wrap gap-6 sm:gap-12 md:gap-20 text-slate-800 font-black text-base sm:text-xl">
        {TRUST.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-2"><Icon size={24} className="text-orange-500" aria-hidden="true" /> {label}</span>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ title, sub, to, cta = 'View All' }: { title: string; sub?: string; to?: string; cta?: string }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
      <div className="text-center sm:text-left">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">{title}</h2>
        {sub && <p className="text-slate-500 font-medium mt-1">{sub}</p>}
      </div>
      {to && <Link to={to} className="bg-white border border-slate-200 text-slate-900 font-bold py-2.5 px-6 rounded-full hover:border-slate-400 hover:shadow-md transition-all flex items-center">{cta} <ArrowRight size={16} className="ml-2" /></Link>}
    </div>
  );
}

function CategoryTiles() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Shop by Category" sub="Find the right sofa for your space." to="/shop" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {CATEGORIES.map((c) => {
            const p = PRODUCTS.find((x) => x.category === c.id)!;
            const count = PRODUCTS.filter((x) => x.category === c.id).length;
            return (
              <Link key={c.id} to={`/shop/${encodeURIComponent(c.id)}`} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200">
                <img src={img(p.photo, 700)} alt="" loading="lazy" decoding="async" width={700} height={525} onError={onImgError} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-0 p-4 md:p-6 text-white">
                  <h3 className="font-black text-lg md:text-2xl leading-tight">{c.label}</h3>
                  <p className="text-xs md:text-sm text-slate-200 hidden sm:block">{c.blurb} · {count} styles</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Sofa, t: 'Choose your sofa', d: 'Browse our range and see every fabric, colour and size on each product page.' },
    { icon: MessageCircle, t: 'Chat with an expert', d: 'Message us on WhatsApp or Facebook. Tell us your fabric, colour and size and we confirm everything.' },
    { icon: Truck, t: 'We deliver to you', d: 'Pay as agreed in chat, then we deliver to your door across the UK.' },
  ];
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionTitle title="How Ordering Works" sub="No checkout, no card forms. Just a friendly chat." to="/how-to-order" cta="Learn More" />
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ icon: Icon, t, d }, i) => (
            <div key={t} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-11 h-11 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center"><Icon size={22} /></span>
                <span className="text-sm font-black text-slate-400">Step {i + 1}</span>
              </div>
              <h3 className="font-black text-xl mb-2">{t}</h3>
              <p className="text-slate-600 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <WhatsAppButton text="Order Now on WhatsApp" className="py-4 px-8" />
          <MessengerButton text="Message on Facebook" className="py-4 px-8" />
        </div>
      </div>
    </section>
  );
}

function Grid({ items, priority = 0 }: { items: typeof PRODUCTS; priority?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {items.map((p, i) => <ProductCard key={p.id} product={p} priority={i < priority} />)}
    </div>
  );
}

function HotSelling() {
  const hot = PRODUCTS.filter((p) => p.isHot);
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-orange-100 p-2 rounded-full"><Tag className="text-orange-600" size={24} /></div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Hot Selling Right Now</h2>
        </div>
        <div className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 pt-4 -mt-4 px-2 -mx-2">
          {hot.map((p) => <div key={p.id} className="w-[85vw] sm:w-[300px] snap-center shrink-0"><ProductCard product={p} /></div>)}
        </div>
      </div>
    </section>
  );
}

function SaleBanner() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16 px-4 text-center border-y-4 border-orange-500">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 mb-4 tracking-tighter uppercase">Mega Sale On Now</h2>
        <p className="text-slate-300 text-lg md:text-xl mb-8 font-medium">Handcrafted UK sofas at sale prices. Ask our expert to reserve yours. No payment needed to enquire.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/sale" className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black py-4 px-10 rounded-full hover:scale-105 transition-all uppercase tracking-widest">Shop The Sale</Link>
          <WhatsAppButton text="Order Now" className="py-4 px-10 rounded-full" />
        </div>
      </div>
    </section>
  );
}

function Materials() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Shop by Material" sub="Velvet, leather, cord, chenille and more." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {MATERIALS.map((m) => (
            <Link key={m} to={`/shop?material=${encodeURIComponent(m)}`} className="flex flex-col items-center gap-2 bg-slate-50 hover:bg-slate-900 hover:text-white border border-slate-200 rounded-2xl py-6 font-bold transition-colors">
              <Palette size={22} className="text-orange-500" /> {m}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="What Customers Say" />
        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <figure key={r.n} className="bg-white p-7 rounded-2xl border border-slate-100 shadow-sm">
              <figcaption className="font-bold text-slate-900 text-lg mb-2">{r.t}</figcaption>
              <blockquote className="text-slate-600 italic leading-relaxed mb-5">“{r.r}”</blockquote>
              <span className="text-sm font-bold text-slate-700">{r.n}</span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionTitle title="Quick Answers" to="/faq" cta="All FAQs" />
        <div className="space-y-3">
          {FAQ.slice(0, 4).map((f) => (
            <details key={f.q} className="group bg-slate-50 rounded-xl border border-slate-200 p-5">
              <summary className="font-bold cursor-pointer list-none flex justify-between items-center">{f.q}<span className="text-orange-500 group-open:rotate-45 transition-transform text-2xl leading-none">+</span></summary>
              <p className="text-slate-600 mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useTitle('SofaZilla | Premium UK Sofas, Corner & U-Shape Sofa Sale', 'Handcrafted UK sofas delivered to your door. Shop U-shape, corner, 3+2 sets, recliners and sofa beds. Order by chat with our experts.');
  return (
    <main>
      <Hero />
      <TrustStrip />
      <CategoryTiles />
      <HotSelling />
      <SaleBanner />
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="Trending Collection" sub={`${PRODUCTS.length} sofas and chairs to choose from.`} to="/shop" />
          <Grid items={PRODUCTS.slice(0, 8)} />
        </div>
      </section>
      <HowItWorks />
      <Materials />
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle title="New Arrivals" to="/new" cta="See New In" />
          <Grid items={PRODUCTS.filter((p) => p.isNew).slice(0, 4)} />
        </div>
      </section>
      <Reviews />
      <FaqPreview />
      <ExpertCTA />
    </main>
  );
}
