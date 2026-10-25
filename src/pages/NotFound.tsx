import useTitle from '../useTitle';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useTitle('Page not found | SofaZilla');
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-24">
      <h1 className="text-5xl font-black text-slate-900 mb-4">Page not found</h1>
      <p className="text-slate-500 mb-8">That page doesn’t exist or the product has been removed.</p>
      <Link to="/shop" className="bg-slate-900 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-500 transition-colors">
        Browse all sofas
      </Link>
    </main>
  );
}
