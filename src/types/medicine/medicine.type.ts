export interface Medicine {
  name: string | undefined;
  price: string | undefined;
  stock: number | undefined;
  images?: File | undefined;
  categoryId: string | undefined;
  discount: string | undefined;
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
  avg_review: number;
  total_review: number;
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
  count?: number;
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
