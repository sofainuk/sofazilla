import type { CategoryId, Product, SizeClass } from '../types';

export const CATEGORIES: { id: CategoryId; label: string; blurb: string }[] = [
  { id: 'u-shape', label: 'U-Shape Sofas', blurb: 'Big family & cinema room comfort' },
  { id: 'corner', label: 'Corner Sofas', blurb: 'Space-smart L-shape designs' },
  { id: '3+2', label: '3+2 Sofa Sets', blurb: 'Classic matching sets' },
  { id: 'recliners', label: 'Recliner Sofas', blurb: 'Fully reclining relaxation' },
  { id: 'armchairs', label: 'Armchairs', blurb: 'Accent & snuggler chairs' },
  { id: 'beds', label: 'Sofa Beds', blurb: 'Sit by day, sleep by night' },
];

export const MATERIALS = ['Velvet', 'Leather', 'Cord', 'Chenille', 'Bouclé', 'Woven & Linen'] as const;

export const SIZES: { id: SizeClass; label: string; hint: string }[] = [
  { id: 'compact', label: 'Compact', hint: 'Up to ~2.2m wide' },
  { id: 'family', label: 'Family Size', hint: '2.3m – 2.8m wide' },
  { id: 'large', label: 'Large / Cinema', hint: '2.9m and above' },
];

export const categoryLabel = (id: string) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

export function materialGroup(f: string): string {
  const s = f.toLowerCase();
  if (s.includes('velvet')) return 'Velvet';
  if (s.includes('leather')) return 'Leather';
  if (s.includes('cord')) return 'Cord';
  if (s.includes('chenille')) return 'Chenille';
  if (s.includes('bouc')) return 'Bouclé';
  return 'Woven & Linen';
}

export const img = (photo: string, w = 800) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&q=75&w=${w}`;
export const imgSet = (photo: string, widths = [480, 800, 1200]) =>
  widths.map((w) => `${img(photo, w)} ${w}w`).join(', ');

export const discountPct = (p: Product) => Math.round((1 - p.price / p.oldPrice) * 100);

// Replace these photo ids with your own product photos (put files in /public and edit img()).
const PH = [
  'photo-1555041469-a586c61ea9bc', 'photo-1540574163026-643ea20d25b5', 'photo-1605774337664-7a846e9cdf17',
  'photo-1505693416388-ac5ce068fe85', 'photo-1550254478-ead40cc54513', 'photo-1493663284031-b7e3aefcae8e',
  'photo-1549187774-b4e9b0445b41', 'photo-1519710164239-da123dc03ef4',
];

type Flags = { hot?: boolean; isNew?: boolean };

/** Compact builder: colours "Name:#hex|Name:#hex", lists "a|b|c", dims "W|D|H". */
function mk(
  id: string, category: CategoryId, name: string, layout: string, price: number, oldPrice: number,
  ph: number, size: SizeClass, dims: string, colors: string, fabrics: string, features: string,
  description: string, flags: Flags = {}
): Product {
  const [width, depth, height] = dims.split('|');
  return {
    id, category, name, layout, price, oldPrice, description, size,
    photo: PH[ph % PH.length],
    dimensions: { width, depth, height },
    colors: colors.split('|').map((c) => { const [n, hex] = c.split(':'); return { name: n, hex }; }),
    fabrics: fabrics.split('|'),
    features: features.split('|'),
    isHot: flags.hot, isNew: flags.isNew,
  };
}

export const PRODUCTS: Product[] = [
  // U-Shape
  mk('verona-u', 'u-shape', 'Verona Classic U-Shape', 'U-Shape', 899, 2999, 0, 'large', '330cm x 200cm|90cm|85cm',
    'Silver Grey:#C0C0C0|Mink:#8B7355|Navy:#1C2841', 'Plush Velvet|Woven Fabric', 'Rolled arms|Deep seating|Chrome feet|Scatter cushions included',
    "The UK's favourite U-Shape sofa. Traditional rolled arms, deep seat cushions and premium soft woven upholstery. Perfect for large families and cinema rooms.", { hot: true }),
  mk('ambassador-u', 'u-shape', 'Ambassador Statement', 'U-Shape', 949, 3160, 4, 'large', '340cm x 220cm|105cm|80cm',
    'Silver:#C0C0C0|Charcoal:#36454F', 'Crushed Velvet|Plush Velvet', 'Oversized arms|Glamorous finish|Extra deep cushions',
    'A bold, blocky statement range with thick padded arms and deep seating. The ultimate luxury lounging experience.', { hot: true }),
  mk('regent-u', 'u-shape', 'Regent Cord U-Shape', 'U-Shape', 849, 2830, 1, 'large', '320cm x 190cm|92cm|82cm',
    'Cream:#EDE6D6|Mocha:#6F4E37|Grey:#8A8D91', 'Jumbo Cord|Chenille', 'Soft jumbo cord|Wide seats|Wooden feet',
    'Textured jumbo cord in a generous U layout. Warm, tactile and made for movie nights.', { isNew: true }),

  // Corner
  mk('dylan-corner', 'corner', 'Dylan Comfort Corner', 'Corner Sofa', 499, 1665, 1, 'family', '230cm x 230cm|88cm|80cm',
    'Grey/Black:#4a4a4a|Beige/Brown:#D3B89A', 'Jumbo Cord|Faux Leather Base', 'Scatter back|Family-friendly|Wipe-clean base',
    'Budget-friendly family comfort. Textured jumbo cord with faux leather accents for a cosy yet durable finish.', { hot: true }),
  mk('olympia-corner', 'corner', 'Olympia Luxe L-Shape', 'L-Shape Corner', 699, 2330, 3, 'family', '280cm x 160cm|95cm|75cm',
    'Steel Grey:#71797E|Forest:#228B22', 'Plush Velvet|Premium Bouclé', 'Low profile|High-density foam|Hidden glides',
    'Sleek, low-profile modern look with thick padded seating and plush velvet. Designed for contemporary minimalists.'),
  mk('shannon-corner', 'corner', 'Shannon Swivel Corner', 'Corner Sofa', 549, 1830, 6, 'family', '240cm x 240cm|90cm|85cm',
    'Black/Grey:#2f2f2f', 'Chenille|Faux Leather', 'Swivel cushions|Two-tone design|Chrome accents',
    'Faux leather outer frame with textured fabric swivel-cushion seats for a striking two-tone look.'),
  mk('mayfair-corner', 'corner', 'Mayfair Chaise Corner', 'Chaise Corner', 749, 2495, 5, 'family', '270cm x 170cm|92cm|84cm',
    'Oatmeal:#D8CBB2|Slate:#5C6670|Teal:#1F6F78', 'Woven Fabric|Linen Blend', 'Reversible chaise|Removable covers|Tapered legs',
    'Elegant chaise corner with a reversible layout so it fits either side of your room.', { isNew: true }),
  mk('hampton-corner', 'corner', 'Hampton Compact Corner', 'Compact Corner', 459, 1530, 3, 'compact', '200cm x 150cm|85cm|80cm',
    'Light Grey:#B5B8BC|Navy:#1C2841', 'Woven Fabric|Chenille', 'Space-saving|Easy assembly|Firm back support',
    'Smaller rooms, big comfort. A compact corner that still seats the whole family.'),

  // 3+2
  mk('chesterfield-32', '3+2', 'Chesterfield Timeless', '3 Seater + 2 Seater', 899, 2999, 2, 'family', '220cm / 170cm|92cm|78cm',
    'Oxblood:#4A0404|Black:#191919|Emerald:#046307', 'Aged Leather|Crushed Velvet', 'Hand-tufted|Solid wood legs|Premium foam filling',
    'The timeless British classic with deep button-tufting, rolled arms and nailhead trim. A statement piece for any sophisticated living space.', { hot: true }),
  mk('augusta-32', '3+2', 'Augusta Mid-Century', '3 Seater + 2 Seater', 799, 2665, 5, 'family', '210cm / 160cm|88cm|82cm',
    'Mustard:#E4B037|Teal:#008080', 'Linen Blend|Woven Fabric', 'Tapered legs|Slim arms|Removable cushion covers',
    'Modern mid-century style with clean lines, tapered wooden legs and slim track arms.'),
  mk('kensington-32', '3+2', 'Kensington Pillow-Back', '3 Seater + 2 Seater', 679, 2265, 0, 'family', '205cm / 155cm|90cm|88cm',
    'Grey:#8A8D91|Blue:#2E4A6B|Cream:#EDE6D6', 'Plush Velvet|Chenille', 'Pillow back|Deep seats|Button detail',
    'Soft pillow-back cushions that keep their shape. Easy-care fabrics, ideal for busy homes.', { isNew: true }),
  mk('windsor-32', '3+2', 'Windsor Leather Set', '3 Seater + 2 Seater', 999, 3330, 2, 'family', '215cm / 165cm|92cm|90cm',
    'Brown:#5B3A29|Black:#191919', 'Faux Leather|Aged Leather', 'High back|Stitched detail|Solid frame',
    'Heritage-style leather look set with a supportive high back. Built to last.'),

  // Recliners
  mk('milano-recliner', 'recliners', 'Milano 3+2 Recliner Set', '3 Seater + 2 Seater Recliner', 1099, 3665, 7, 'family', '210cm / 160cm|95cm|100cm',
    'Black:#191919|Grey:#6B6F74|Brown:#5B3A29', 'Faux Leather|Chenille', 'Manual recline|Cup holders|Padded headrest',
    'Fully reclining 3+2 set with cup holders and a padded headrest for ultimate relaxation.', { hot: true }),
  mk('boston-recliner', 'recliners', 'Boston Corner Recliner', 'Corner Recliner', 1199, 3995, 4, 'large', '290cm x 230cm|98cm|102cm',
    'Charcoal:#36454F|Mocha:#6F4E37', 'Plush Velvet|Faux Leather', 'Recliner seats|Storage console|Drink holders',
    'A big corner with recliner seats and a central storage console. Family movie night, upgraded.'),
  mk('oslo-recliner', 'recliners', 'Oslo Compact Recliner 2-Seater', '2 Seater Recliner', 599, 1995, 7, 'compact', '170cm|92cm|98cm',
    'Grey:#6B6F74|Navy:#1C2841', 'Chenille|Woven Fabric', 'Space-saving recline|Soft armrests|Easy clean',
    'A compact two-seat recliner that works in smaller living rooms.', { isNew: true }),

  // Armchairs
  mk('lucia-armchair', 'armchairs', 'Lucia Accent Armchair', 'Armchair', 249, 830, 5, 'compact', '75cm|80cm|85cm',
    'Mustard:#E4B037|Teal:#008080|Blush:#E8B4B8', 'Plush Velvet|Premium Bouclé', 'Gold legs|Curved back|Supportive foam',
    'A sculpted accent chair that adds colour and character to any room.', { isNew: true }),
  mk('cuddle-snuggler', 'armchairs', 'Cosy Snuggler Chair', 'Snuggler Chair', 329, 1095, 1, 'compact', '110cm|95cm|80cm',
    'Cream:#EDE6D6|Grey:#8A8D91', 'Jumbo Cord|Premium Bouclé', 'Wide seat|Deep cushions|Soft finish',
    'Big enough for two, perfect for one. A deep snuggler for reading and relaxing.'),
  mk('wingback-chair', 'armchairs', 'Heritage Wingback Chair', 'Wingback Armchair', 299, 995, 2, 'compact', '82cm|85cm|105cm',
    'Oxblood:#4A0404|Navy:#1C2841|Emerald:#046307', 'Crushed Velvet|Aged Leather', 'High wings|Button back|Wood legs',
    'A classic wingback with button tufting. Pairs beautifully with a Chesterfield set.'),

  // Sofa beds
  mk('majestic-bed', 'beds', 'Majestic Sofa Bed', 'Sofa Bed', 399, 1330, 7, 'compact', '190cm|95cm|85cm',
    'Navy:#000080|Grey:#808080', 'Plush Velvet', 'Pull-out mechanism|Hidden storage|Sleeps 2',
    'A high-end look with deep cushions that folds out into a comfortable bed. Includes hidden storage.'),
  mk('harbour-bed', 'beds', 'Harbour Corner Sofa Bed', 'Corner Sofa Bed', 699, 2330, 3, 'family', '250cm x 160cm|90cm|85cm',
    'Grey:#8A8D91|Beige:#D3B89A', 'Woven Fabric|Chenille', 'Fold-out bed|Storage chaise|Sleeps 2',
    'Corner seating by day, a full-size bed for guests by night, with a large storage chaise.', { hot: true }),
  mk('studio-bed', 'beds', 'Studio Click-Clack Bed', 'Click-Clack Sofa Bed', 329, 1095, 6, 'compact', '175cm|85cm|80cm',
    'Charcoal:#36454F|Mink:#8B7355', 'Linen Blend|Woven Fabric', 'Easy click-clack|Slim arms|Wooden legs',
    'Simple click-clack sofa bed for flats, studios and spare rooms.', { isNew: true }),
];

export interface Filters { category?: string; q?: string; material?: string; size?: string; mode?: 'sale' | 'new' | 'hot' }

export function searchProducts(q: string): Product[] {
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return PRODUCTS;
  return PRODUCTS.filter((p) => {
    const hay = [p.name, p.layout, categoryLabel(p.category), p.description, ...p.fabrics, ...p.colors.map((c) => c.name), ...p.features].join(' ').toLowerCase();
    return tokens.every((t) => hay.includes(t));
  });
}

export function filterProducts(f: Filters): Product[] {
  let list = f.q ? searchProducts(f.q) : [...PRODUCTS];
  if (f.category) list = list.filter((p) => p.category === f.category);
  if (f.material) list = list.filter((p) => p.fabrics.some((x) => materialGroup(x) === f.material));
  if (f.size) list = list.filter((p) => p.size === f.size);
  if (f.mode === 'new') list = list.filter((p) => p.isNew);
  if (f.mode === 'hot') list = list.filter((p) => p.isHot);
  return list;
}

/** Replace with REAL customer reviews before launch (UK law bans fake reviews). */
export const REVIEWS = [
  { n: 'Sarah J.', t: 'Incredible quality & comfort', r: 'The velvet is so soft. Delivered in 5 days and the delivery team were fantastic.' },
  { n: 'David M.', t: 'Brilliant value', r: 'Looks far more expensive than it was. The expert on WhatsApp helped me pick the right size.' },
  { n: 'Emma W.', t: 'Easy to order', r: 'Chatted, confirmed colour and size, and it arrived exactly as agreed. Very smooth.' },
];
