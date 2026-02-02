export type UserType = {
  id: string;
  name: string;
  email: string;
  image: string;
  status: "ACTIVE" | "DEACTIVE";
  phone: string | null;
  createdAt: string;
  updatedAt: string;
};
