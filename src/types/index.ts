export interface Dish {
  id: string;
  name: string;
  category: MenuCategoryId;
  price: string;
  numericPrice: number;
  description: string;
  image: string;
  tag?: string;
  isSolid?: boolean;
}

export type MenuCategoryId =
  | 'all'
  | 'grills-corner'
  | 'rice-dishes'
  | 'solid-dishes'
  | 'yam-dishes'
  | 'naija-delicacies'
  | 'fish-and-side-dishes'
  | 'small-chops-and-platters'
  | 'snacks-and-extras'
  | 'bakery'
  | 'drinks'
  | 'breakfast-appetisers'
  | 'soup-dishes'
  | 'carting-event';

export interface CategoryInfo {
  id: MenuCategoryId;
  name: string;
  num?: string;
}

export interface SolidCustomization {
  dishName: string;
  dishImage: string;
  basePrice: number;
  soup: string;
  protein: string;
  extra: 'none' | 'Extra Meat' | 'Extra Fish';
  extraCost: number;
  totalPrice: number;
}

export interface CartItem {
  cartId: string;
  id: string;
  name: string;
  price: number;
  quantity: number;
  customization?: string;
  image?: string;
}

export interface BakeryProduct {
  id: string;
  kicker: string;
  name: string;
  description: string;
  image: string;
  tag: string;
  pricePending?: boolean;
  price?: string;
}

export type PageView = 'home' | 'story' | 'menu' | 'bakery' | 'specials' | 'contact';
