import { Link } from 'react-router-dom';
import { Facebook, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { EMAIL_ADDRESS, FB_LINK, MESSENGER_URL, PHONE_DISPLAY } from '../config';
import { whatsappUrl } from './WhatsAppButton';

const linkCls = 'hover:text-orange-500 transition-colors';
const H = ({ children }: { children: string }) => <h4 className="text-white font-black mb-6 uppercase text-sm tracking-widest">{children}</h4>;

export default function Footer() {
  return (
    <footer className="bg-[#0b1220] text-slate-400 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
        <div className="lg:col-span-1">
          <span className="block text-3xl font-black tracking-tighter text-white mb-5">SOFA<span className="text-orange-500">ZILLA</span></span>
          <p className="text-sm font-medium mb-6 leading-relaxed">Premium handcrafted UK sofas delivered to your door. Order by chat with a real expert.</p>
          <div className="flex gap-3">
            <a href={FB_LINK} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0084FF] hover:text-white transition-colors"><Facebook size={18} /></a>
            <a href={MESSENGER_URL} target="_blank" rel="noopener noreferrer" aria-label="Messenger" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0084FF] hover:text-white transition-colors"><Send size={18} /></a>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"><MessageCircle size={18} /></a>
          </div>
        </div>

        <div>
          <H>Shop</H>
          <ul className="space-y-3 text-sm font-medium">
            {CATEGORIES.map((c) => <li key={c.id}><Link to={`/shop/${encodeURIComponent(c.id)}`} className={linkCls}>{c.label}</Link></li>)}
            <li><Link to="/new" className={linkCls}>New In</Link></li>
            <li><Link to="/sale" className={linkCls}>Sale</Link></li>
          </ul>
        </div>

        <div>
          <H>Help</H>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/how-to-order" className={linkCls}>How to Order</Link></li>
            <li><Link to="/faq" className={linkCls}>FAQs</Link></li>
            <li><Link to="/delivery" className={linkCls}>Delivery Information</Link></li>
            <li><Link to="/returns" className={linkCls}>Returns</Link></li>
            <li><Link to="/contact" className={linkCls}>Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <H>Company</H>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/about" className={linkCls}>About Us</Link></li>
            <li><Link to="/terms" className={linkCls}>Terms &amp; Conditions</Link></li>
            <li><Link to="/privacy" className={linkCls}>Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <H>Let’s Talk</H>
          <ul className="space-y-4 text-sm font-medium">
            <li className="flex items-start"><div className="bg-slate-800 p-2 rounded mr-3 shrink-0"><Phone size={14} className="text-orange-500" /></div><span className="mt-1">{PHONE_DISPLAY}<br /><span className="text-xs text-slate-500">Mon-Sun: 9am - 8pm</span></span></li>
            <li className="flex items-center"><div className="bg-slate-800 p-2 rounded mr-3 shrink-0"><Mail size={14} className="text-orange-500" /></div><a href={`mailto:${EMAIL_ADDRESS}`} className={`${linkCls} break-all`}>{EMAIL_ADDRESS}</a></li>
            <li className="flex items-center"><div className="bg-slate-800 p-2 rounded mr-3 shrink-0"><MapPin size={14} className="text-orange-500" /></div><span>London, UK (Nationwide Delivery)</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">&copy; {new Date().getFullYear()} SofaZilla UK. All rights reserved.</span>
        <span className="text-xs font-bold text-slate-500">Orders handled by chat · No online payments on this site</span>
      </div>
    </footer>
  );
}
