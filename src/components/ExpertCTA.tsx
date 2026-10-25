import { Link } from 'react-router-dom';
import WhatsAppButton from './WhatsAppButton';
import MessengerButton from './MessengerButton';

export default function ExpertCTA({ title = 'Not sure which sofa suits your room?', text = "Let's talk. Our UK sofa experts will help you choose the size, fabric and colour. It's free and there's no obligation." }) {
  return (
    <section className="bg-slate-900 py-16 px-4 border-t-4 border-orange-500">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">{title}</h2>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">{text}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <WhatsAppButton text="Talk to an Expert" className="py-4 px-8 text-lg" />
          <MessengerButton text="Message on Facebook" className="py-4 px-8 text-lg" />
          <Link to="/contact" className="flex items-center justify-center font-bold rounded-lg py-4 px-8 text-lg bg-white text-slate-900 hover:bg-slate-100 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
