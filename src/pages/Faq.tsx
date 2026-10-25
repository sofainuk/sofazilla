import ExpertCTA from '../components/ExpertCTA';
import useTitle from '../useTitle';
import { FAQ } from '../data/faq';

export default function Faq() {
  useTitle('FAQs | SofaZilla', 'Answers about ordering, fabrics, delivery and returns.');
  return (
    <>
      <main className="py-14 md:py-20 bg-white animate-fade">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">Frequently asked questions</h1>
          <p className="text-slate-500 text-lg mb-10">Can’t see your question? Our experts reply fast on WhatsApp and Messenger.</p>
          <div className="space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group bg-slate-50 rounded-xl border border-slate-200 p-5">
                <summary className="font-bold cursor-pointer list-none flex justify-between items-center gap-4">{f.q}<span className="text-orange-500 group-open:rotate-45 transition-transform text-2xl leading-none shrink-0">+</span></summary>
                <p className="text-slate-600 mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </main>
      <ExpertCTA />
    </>
  );
}
