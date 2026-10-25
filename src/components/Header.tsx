import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Facebook, Menu, Phone, Sofa, Truck, X } from 'lucide-react';
import { CATEGORIES, MATERIALS, SIZES } from '../data/products';
import { FB_LINK, PHONE_DISPLAY } from '../config';
import WhatsAppButton, { whatsappUrl } from './WhatsAppButton';
import MessengerButton from './MessengerButton';
import SearchBar from './SearchBar';

const MORE = [
  { to: '/how-to-order', label: 'How to Order' },
  { to: '/about', label: 'About Us' },
  { to: '/faq', label: 'FAQs' },
  { to: '/delivery', label: 'Delivery' },
  { to: '/returns', label: 'Returns' },
  { to: '/contact', label: 'Contact Us' },
];

const navCls = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-3.5 text-sm font-bold uppercase tracking-wider hover:text-orange-400 transition-colors ${isActive ? 'text-orange-400' : 'text-white'}`;

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <div className="bg-slate-900 text-slate-300 py-2 px-4 text-[10px] sm:text-xs font-bold flex justify-between items-center tracking-widest uppercase">
        <span className="flex items-center"><Truck size={12} className="mr-2 text-[#25D366]" aria-hidden="true" /> Fast UK Delivery · Order by chat</span>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <a href={FB_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center"><Facebook size={12} className="mr-1" aria-hidden="true" /> Facebook</a>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:text-white flex items-center"><Phone size={12} className="mr-1" aria-hidden="true" /> {PHONE_DISPLAY}</a>
        </div>
      </div>

      <header className="bg-white sticky top-0 z-40 shadow-sm">
        {/* Row 1: logo, search, CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4 lg:gap-8 h-[72px]">
          <Link to="/" className="flex items-center group shrink-0" aria-label="SofaZilla home">
            <div className="bg-slate-900 p-2.5 rounded-lg mr-3 group-hover:bg-orange-500 transition-colors shadow-md">
              <Sofa size={24} className="text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col items-start leading-none">
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-slate-900">SOFA<span className="text-orange-500">ZILLA</span></span>
              <span className="hidden sm:block text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">Premium UK Comfort</span>
            </div>
          </Link>

          <SearchBar className="hidden md:block flex-1 max-w-xl" />

          <div className="hidden md:flex items-center gap-3 ml-auto shrink-0">
            <Link to="/contact" className="text-sm font-bold text-slate-700 hover:text-orange-500 px-2">Contact Us</Link>
            <WhatsAppButton text="Talk to an Expert" className="py-2.5 px-5 text-sm" />
          </div>

          <button className="md:hidden ml-auto p-2 text-slate-900 bg-slate-50 rounded-lg border border-slate-200"
            onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile search */}
        <div className="md:hidden px-4 pb-3"><SearchBar /></div>

        {/* Row 2: desktop nav with mega menu */}
        <nav className="hidden md:block bg-slate-900" aria-label="Main">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="group">
              <NavLink to="/shop" end className={navCls}>
                <span className="inline-flex items-center gap-1">Shop All <ChevronDown size={14} /></span>
              </NavLink>
              <div className="hidden group-hover:block group-focus-within:block absolute left-0 right-0 top-full bg-white border-t-4 border-orange-500 shadow-2xl z-50">
                <div className="max-w-7xl mx-auto px-8 py-8 grid grid-cols-4 gap-8">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Shop by Type</h4>
                    <ul className="space-y-2.5">
                      {CATEGORIES.map((c) => (
                        <li key={c.id}><Link to={`/shop/${encodeURIComponent(c.id)}`} className="text-slate-700 hover:text-orange-500 font-semibold text-sm">{c.label}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Shop by Material</h4>
                    <ul className="space-y-2.5">
                      {MATERIALS.map((m) => (
                        <li key={m}><Link to={`/shop?material=${encodeURIComponent(m)}`} className="text-slate-700 hover:text-orange-500 font-semibold text-sm">{m}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Shop by Size</h4>
                    <ul className="space-y-2.5">
                      {SIZES.map((s) => (
                        <li key={s.id}>
                          <Link to={`/shop?size=${s.id}`} className="text-slate-700 hover:text-orange-500 font-semibold text-sm">{s.label}</Link>
                          <span className="block text-xs text-slate-400">{s.hint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-slate-900 rounded-2xl p-6 text-white self-start">
                    <h4 className="font-black text-lg mb-2">Need help choosing?</h4>
                    <p className="text-sm text-slate-300 mb-4">Chat with an expert. Free advice, no obligation.</p>
                    <WhatsAppButton text="Talk to an Expert" className="py-2.5 text-sm" />
                  </div>
                </div>
              </div>
            </div>

            {CATEGORIES.slice(0, 4).map((c) => (
              <NavLink key={c.id} to={`/shop/${encodeURIComponent(c.id)}`} className={navCls}>{c.label.replace(' Sofas', '').replace(' Sofa', '')}</NavLink>
            ))}
            <NavLink to="/new" className={navCls}>New In</NavLink>
            <NavLink to="/sale" className={({ isActive }) => `px-4 py-3.5 text-sm font-black uppercase tracking-wider ${isActive ? 'text-white' : 'text-orange-400'} hover:text-orange-300`}>Sale</NavLink>

            <div className="relative group ml-auto">
              <button className="px-4 py-3.5 text-sm font-bold uppercase tracking-wider text-white hover:text-orange-400 inline-flex items-center gap-1">
                More <ChevronDown size={14} />
              </button>
              <ul className="hidden group-hover:block group-focus-within:block absolute right-0 top-full bg-white rounded-b-xl shadow-2xl border-t-4 border-orange-500 w-52 py-2 z-50">
                {MORE.map((m) => (
                  <li key={m.to}><Link to={m.to} className="block px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-orange-500">{m.label}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </nav>

        {open && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-8rem)] overflow-y-auto animate-fade">
            <div className="flex flex-col p-4 gap-1.5">
              <Link to="/shop" className="px-5 py-3.5 font-black bg-slate-50 rounded-xl uppercase">Shop All</Link>
              {CATEGORIES.map((c) => (
                <Link key={c.id} to={`/shop/${encodeURIComponent(c.id)}`} className="px-5 py-3 font-bold text-slate-600 border-b border-slate-100">{c.label}</Link>
              ))}
              <div className="grid grid-cols-2 gap-2 my-2">
                <Link to="/new" className="px-5 py-3.5 font-black bg-emerald-50 text-emerald-700 rounded-xl text-center uppercase">New In</Link>
                <Link to="/sale" className="px-5 py-3.5 font-black bg-orange-50 text-orange-600 rounded-xl text-center uppercase">Sale</Link>
              </div>
              <div className="grid grid-cols-2 gap-x-2">
                {MORE.map((m) => <Link key={m.to} to={m.to} className="py-2.5 px-2 text-sm font-semibold text-slate-600">{m.label}</Link>)}
              </div>
              <div className="mt-3 p-5 bg-slate-900 rounded-2xl text-white">
                <h4 className="font-black text-lg mb-1">Let’s talk</h4>
                <p className="text-sm text-slate-300 mb-4">Chat with our UK sofa experts.</p>
                <div className="flex flex-col gap-2">
                  <WhatsAppButton text="Talk to an Expert" className="py-3" />
                  <MessengerButton text="Message on Facebook" className="py-3" />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
