export type TProducts = {
  article_number: number;
  cost: number;
  created_at: Date;
  description: string;
  discounted_price: number;
  id: string;
  id_id_products_photos: string;
  title: string;
  updated_at: Date;
};
export type TPhotos = {
  alt: string;
  created_at: Date;
  id: string;
  id_id_files: string;
  src: string;
  updated_at: Date;
};
export type TProductsPhotos = {
  created_at: Date;
  id: string;
  photos_id: string;
  photos_id_id_photos: string;
  products_id: string;
  products_id_id_products: string;
  updated_at: Date;
};
export type TFiles = {
  created_at: Date;
  file_name: string;
  file_path: string;
  file_size: number;
  file_url: string;
  id: string;
  original_name: string;
  updated_at: Date;
  upload_date: Date;
};
