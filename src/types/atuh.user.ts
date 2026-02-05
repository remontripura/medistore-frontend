export type AuthUser = {
  id: string;
  email: string;
  role: "ADMIN" | "SELLER" | "CUSTOMER";
  name?: string;
  image?: string | null;
};

export type AuthSession = {
  user: AuthUser;
};
