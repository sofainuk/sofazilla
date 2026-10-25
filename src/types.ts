export type CategoryId = 'u-shape' | 'corner' | '3+2' | 'beds' | 'recliners' | 'armchairs';
export type SizeClass = 'compact' | 'family' | 'large';

export interface Product {
  id: string;
  category: CategoryId;
  name: string;
  layout: string;
  price: number;
  oldPrice: number;
  description: string;
  photo: string;
  size: SizeClass;
  dimensions: { width: string; depth: string; height: string };
  colors: { name: string; hex: string }[];
  fabrics: string[];
  features: string[];
  isHot?: boolean;
  isNew?: boolean;
}
