import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../config';

export const whatsappUrl = (message?: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}${message ? `?text=${encodeURIComponent(message)}` : ''}`;

interface Props { text: string; message?: string; className?: string }

export default function WhatsAppButton({ text, message, className = '' }: Props) {
  return (
    <a
      href={whatsappUrl(message ?? 'Hi SofaZilla! I need some help finding the perfect sofa.')}
      target="_blank" rel="noopener noreferrer"
      className={`flex items-center justify-center font-bold rounded-lg shadow-lg bg-[#25D366] hover:bg-[#20b858] text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${className}`}
    >
      <MessageCircle size={22} className="mr-2" aria-hidden="true" /> {text}
    </a>
  );
}
