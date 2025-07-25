export type User = {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type RegisterRequest = {
  email: string;
  password: string;
  confirmPassword?: string;
};