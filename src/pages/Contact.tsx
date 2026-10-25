import { useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import useTitle from '../useTitle';
import WhatsAppButton, { whatsappUrl } from '../components/WhatsAppButton';
import MessengerButton from '../components/MessengerButton';
import { EMAIL_ADDRESS, PHONE_DISPLAY } from '../config';

export default function Contact() {
  useTitle('Contact Us | SofaZilla', 'Talk to a SofaZilla sofa expert on WhatsApp, Facebook Messenger or email.');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi SofaZilla! My name is ${name || 'a customer'}.\n${msg}`;
    window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer');
  };

  const card = 'bg-white rounded-2xl border border-slate-200 p-6 flex items-start gap-4';
  return (
    <main className="py-14 md:py-20 bg-slate-50 animate-fade">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight text-center">Contact us. Let’s talk.</h1>
        <p className="text-slate-500 text-lg mb-12 text-center max-w-2xl mx-auto">The fastest way to reach us is chat. Message an expert and we’ll help you choose and order.</p>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-slate-900 text-white rounded-2xl p-7">
              <h2 className="font-black text-2xl mb-2">Chat with an expert</h2>
              <p className="text-slate-300 mb-5">Open 9am to 8pm, 7 days a week.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <WhatsAppButton text="WhatsApp" className="py-3.5 px-6 flex-1" />
                <MessengerButton text="Messenger" className="py-3.5 px-6 flex-1" />
              </div>
            </div>
            <div className={card}><Phone className="text-orange-500 shrink-0" /><div><h3 className="font-black">Phone / WhatsApp</h3><p className="text-slate-600">{PHONE_DISPLAY}</p></div></div>
            <div className={card}><Mail className="text-orange-500 shrink-0" /><div><h3 className="font-black">Email</h3><a href={`mailto:${EMAIL_ADDRESS}`} className="text-slate-600 hover:text-orange-500 break-all">{EMAIL_ADDRESS}</a></div></div>
            <div className={card}><MapPin className="text-orange-500 shrink-0" /><div><h3 className="font-black">Based in</h3><p className="text-slate-600">London, UK. Nationwide delivery.</p></div></div>
          </div>

          <form onSubmit={send} className="bg-white rounded-2xl border border-slate-200 p-7 space-y-5 self-start">
            <h2 className="font-black text-2xl flex items-center gap-2"><MessageCircle className="text-[#25D366]" /> Send us a message</h2>
            <p className="text-slate-500 text-sm">This opens WhatsApp with your message ready to send.</p>
            <div>
              <label htmlFor="c-name" className="block text-sm font-bold mb-1.5">Your name</label>
              <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500" />
            </div>
            <div>
              <label htmlFor="c-msg" className="block text-sm font-bold mb-1.5">What are you looking for?</label>
              <textarea id="c-msg" required rows={5} value={msg} onChange={(e) => setMsg(e.target.value)}
                placeholder="e.g. A grey velvet corner sofa for a room that’s 3m wide"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:border-orange-500" />
            </div>
            <button type="submit" className="w-full flex items-center justify-center font-bold rounded-lg py-4 bg-[#25D366] hover:bg-[#20b858] text-white">
              <Send size={18} className="mr-2" /> Send on WhatsApp
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
