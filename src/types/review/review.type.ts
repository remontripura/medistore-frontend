export interface ReviewsType {
  title: string;
  description: string;
  ratings: number;
}

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  image: string | null;
};

export type Review = {
  id: string;
  title: string;
  description: string;
  medicineId: string;
  ratings: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};
