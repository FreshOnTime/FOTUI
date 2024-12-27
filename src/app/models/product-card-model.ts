export interface ProductCard {
  id: string;
  name: string;
  price: number;
  rating: number | undefined;
  totalReviews: number;
  discount?: number;
  image: string;
  badges: ('fast-delivery' | 'best-price' | 'trending')[];
}
