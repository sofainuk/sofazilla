import { Send } from 'lucide-react';
import { MESSENGER_URL } from '../config';

export default function MessengerButton({ text, className = '' }: { text: string; className?: string }) {
  return (
    <a
      href={MESSENGER_URL} target="_blank" rel="noopener noreferrer"
      className={`flex items-center justify-center font-bold rounded-lg shadow-lg bg-[#0084FF] hover:bg-[#0073e0] text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${className}`}
    >
      <Send size={20} className="mr-2" aria-hidden="true" /> {text}
    </a>
  );
}
