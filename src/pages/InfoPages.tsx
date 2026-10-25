import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ExpertCTA from '../components/ExpertCTA';
import useTitle from '../useTitle';

const H = ({ children }: { children: ReactNode }) => <h2 className="text-2xl font-black mt-10 mb-3 text-slate-900">{children}</h2>;
const L = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className="text-orange-600 font-bold hover:underline">{children}</Link>;

const PAGES: Record<string, { title: string; desc: string; body: ReactNode }> = {
  about: {
    title: 'About SofaZilla', desc: 'Handcrafted UK sofas, sold direct and ordered by chat.',
    body: (<>
      <p>SofaZilla brings handcrafted UK sofas straight to your living room. By selling direct and taking orders by chat, we cut out the middleman and pass the savings on to you.</p>
      <H>Why order by chat?</H>
      <p>A sofa is a big purchase. Instead of guessing at a checkout page, you talk to a real person who helps you choose the right size, fabric and colour, answers your questions and confirms delivery before you commit.</p>
      <H>What we offer</H>
      <p>U-shape, corner, 3+2, recliner and sofa bed ranges, plus armchairs, in velvet, leather, cord, chenille, bouclé and woven fabrics. Browse the <L to="/shop">full range</L> or <L to="/contact">talk to us</L>.</p>
    </>),
  },
  how: {
    title: 'How to Order', desc: 'Order your sofa in three easy steps by chatting with our experts.',
    body: (<>
      <p>There is no online basket or card payment on this website. Ordering is a simple conversation.</p>
      <H>1. Choose your sofa</H>
      <p>Browse the <L to="/shop">range</L>. Each product page shows its fabrics, colours and sizes.</p>
      <H>2. Message our expert</H>
      <p>Tap <strong>Order Now</strong> to open WhatsApp, or message our Facebook page. Tell us the fabric, colour and size you want.</p>
      <H>3. Confirm and receive</H>
      <p>We confirm the price, availability and delivery date. Payment terms are agreed in chat before dispatch, then we deliver to your door.</p>
    </>),
  },
  delivery: {
    title: 'Delivery Information', desc: 'UK delivery times and what to check before your sofa arrives.',
    body: (<>
      <p>We deliver across the UK. Most orders arrive within 3 to 14 working days, depending on your postcode and chosen fabric. We confirm your delivery window before dispatch.</p>
      <H>Before delivery</H>
      <p>Please measure doorways, hallways, stairs and tight corners. Send us the measurements and we will check your sofa fits before you order.</p>
      <H>On the day</H>
      <p>Our team will contact you to arrange a delivery slot. Please make sure someone is home to receive the sofa and inspect it.</p>
    </>),
  },
  returns: {
    title: 'Returns', desc: 'How to contact us about a return or a problem with your order.',
    body: (<>
      <p>If something is wrong with your sofa, message us straight away on WhatsApp or Messenger with your order details and photos. We will work with you to put it right.</p>
      <H>Your rights</H>
      <p>Your statutory rights under UK consumer law are not affected. Add your own returns window and conditions here before launch.</p>
      <p>Need help now? <L to="/contact">Contact us</L>.</p>
    </>),
  },
  terms: {
    title: 'Terms & Conditions', desc: 'Terms of service for ordering from SofaZilla.',
    body: (<>
      <p>By ordering via WhatsApp or Facebook Messenger you agree to these terms.</p>
      <H>1. Ordering</H>
      <p>Orders are handled manually in chat. No payment details are taken on this website. Prices shown are sale prices and options (fabric, colour, size) are confirmed in chat before you pay.</p>
      <H>2. Delivery</H>
      <p>See our <L to="/delivery">Delivery Information</L>. Dates are estimates until confirmed by us.</p>
      <p><em>Have these terms reviewed to match your business before launch.</em></p>
    </>),
  },
  privacy: {
    title: 'Privacy Policy', desc: 'How SofaZilla uses your information.',
    body: (<>
      <p>We respect your privacy. Information you share on WhatsApp or Messenger is used only to answer your enquiry, process your order and arrange delivery.</p>
      <H>Data usage</H>
      <p>We never sell your phone number or address. We share it only with delivery partners to fulfil your order. This website does not collect payment details.</p>
      <p><em>Have this policy reviewed to match your business before launch.</em></p>
    </>),
  },
};

export default function InfoPages({ page }: { page: keyof typeof PAGES }) {
  const { title, desc, body } = PAGES[page];
  useTitle(`${title} | SofaZilla`, desc);
  return (
    <>
      <main className="py-14 md:py-20 bg-white animate-fade">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 border-b border-slate-200 pb-6 tracking-tight">{title}</h1>
          <div className="text-slate-600 text-lg leading-relaxed space-y-5">{body}</div>
        </div>
      </main>
      {(page === 'about' || page === 'how' || page === 'delivery' || page === 'returns') && <ExpertCTA />}
    </>
  );
}
