export type TProducts = {
  article_number: number;
  cost: number;
  created_at: Date;
  description: string;
  discounted_price: number;
  id: string;
  title: string;
  updated_at: Date;
};
export type TPhotos = {
  alt: string;
  created_at: Date;
  id: string;
  src: string;
  updated_at: Date;
};
export type TFiles = {
  buffer: string;
  destination: string;
  encoding: string;
  fieldname: string;
  filename: string;
  id: string;
  mimetype: string;
  originalname: string;
  path: string;
  size: number;
  stream: string;
  upload_date: Date;
  url: string;
};
export type TProductsPhotosFiles = {
  created_at: Date;
  files_id: string;
  files_id_id_files: string;
  id: string;
  photos_id: string;
  photos_id_id_photos: string;
  products_id: string;
  products_id_id_products: string;
  updated_at: Date;
};
export type TypeMap = {
  TProducts: TProducts;
  TPhotos: TPhotos;
  TFiles: TFiles;
  TProductsPhotosFiles: TProductsPhotosFiles;
};
export type TypeNames =
  | "TProducts"
  | "TPhotos"
  | "TFiles"
  | "TProductsPhotosFiles";
