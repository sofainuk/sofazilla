import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { discountPct, img, imgSet, materialGroup } from '../data/products';
import { onImgError } from '../utils';

function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const materials = [...new Set(product.fabrics.map(materialGroup))].join(' · ');
  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-slate-100 group flex flex-col h-full relative"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={img(product.photo, 800)} srcSet={imgSet(product.photo, [480, 800])}
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 90vw"
          alt={product.name} width={800} height={600}
          loading={priority ? 'eager' : 'lazy'} decoding="async" onError={onImgError}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isHot && <span className="bg-slate-900/90 text-white text-[10px] font-black px-2.5 py-1 uppercase tracking-widest rounded">Hot Selling</span>}
          {product.isNew && <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-1 uppercase tracking-widest rounded">New</span>}
        </div>
        <span className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
          -{discountPct(product)}%
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{product.layout}</p>
        <h3 className="font-bold text-lg text-slate-900 mb-2 leading-tight group-hover:text-orange-500 transition-colors">{product.name}</h3>
        <p className="text-xs text-slate-500 mb-3">{materials}</p>
        <div className="flex items-center gap-1.5 mb-4" aria-label={`Colours: ${product.colors.map((c) => c.name).join(', ')}`}>
          {product.colors.map((c) => (
            <span key={c.name} title={c.name} className="w-5 h-5 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: c.hex }} />
          ))}
          <span className="text-xs text-slate-400 ml-1">{product.colors.length} colour{product.colors.length > 1 ? 's' : ''}</span>
        </div>
        <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-baseline flex-wrap gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">£{product.price}</span>
            <span className="text-sm text-slate-400 line-through font-medium">£{product.oldPrice}</span>
          </div>
          <div className="w-full py-3 rounded-xl bg-slate-50 text-slate-900 font-bold text-sm uppercase tracking-wider text-center group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductCard);
