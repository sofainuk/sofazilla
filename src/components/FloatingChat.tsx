import { MessageCircle, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { MESSENGER_URL } from '../config';
import { whatsappUrl } from './WhatsAppButton';

export default function FloatingChat() {
  const { pathname } = useLocation();
  // On product pages mobile already has a sticky order bar
  const hideOnMobile = pathname.startsWith('/product/');
  return (
    <div className={`fixed right-4 bottom-4 z-30 flex-col gap-3 ${hideOnMobile ? 'hidden md:flex' : 'flex'}`}>
      <a href={MESSENGER_URL} target="_blank" rel="noopener noreferrer" aria-label="Message us on Facebook Messenger"
        className="w-14 h-14 rounded-full bg-[#0084FF] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
        <Send size={24} />
      </a>
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Chat with an expert on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
