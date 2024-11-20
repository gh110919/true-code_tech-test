export type TProducts = {
  id: string;
  title: string;
  description: string;
  cost: number;
  discounted_price: number;
  article_number: number;
  id_id_products_photos: string;
};

export type TPhotos = {
  id: string;
  src: string;
  alt: string;
};

export type TProductsPhotos = {
  id: string;
  products_id: string;
  photos_id: string;
  products_id_id_products: string;
  photos_id_id_photos: string;
};