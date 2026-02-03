export interface Medicine {
  name: string;
  price: string;
  stock: number;
  images: string;
  categoryId: string;
  discount: string;
}

export interface Product {
  id: string;
  images: string;
  name: string;
  price: string;
  discount: string;
  stock: number;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  avg_ratings: number;
  total_reviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface MedicineDetails {
  id: string;
  images: string;
  name: string;
  price: string;
  discount: string;
  stock: number;
  avg_review: number;
  total_review: number;
  createdAt: string;
  updatedAt: string;
}

export interface updateMedicine {
  name: string | undefined;
  price: string | undefined;
  discount: string | undefined;
  stock: string | number;
  images: string | undefined;
}
