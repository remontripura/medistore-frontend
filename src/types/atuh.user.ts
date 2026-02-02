export type AuthUser = {
  id: string;
  email: string;
  role: "ADMIN" | "SELLER" | "USER";
  name?: string;
  image?: string | null;
};

export type AuthSession = {
  user: AuthUser;
};
