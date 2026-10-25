import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingChat from './components/FloatingChat';
import Home from './pages/Home';

// Everything except the home page is code-split so the first load stays small.
const Shop = lazy(() => import('./pages/Shop'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const InfoPages = lazy(() => import('./pages/InfoPages'));
const Faq = lazy(() => import('./pages/Faq'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Loading = () => <div className="min-h-[60vh]" aria-busy="true" />;

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white overflow-x-hidden selection:bg-orange-500 selection:text-white">
      <ScrollToTop />
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/sale" element={<Shop mode="sale" />} />
          <Route path="/new" element={<Shop mode="new" />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<InfoPages page="about" />} />
          <Route path="/how-to-order" element={<InfoPages page="how" />} />
          <Route path="/delivery" element={<InfoPages page="delivery" />} />
          <Route path="/returns" element={<InfoPages page="returns" />} />
          <Route path="/terms" element={<InfoPages page="terms" />} />
          <Route path="/privacy" element={<InfoPages page="privacy" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <FloatingChat />
    </div>
  );
}
