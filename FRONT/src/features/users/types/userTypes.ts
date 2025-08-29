export type User = {
  id: number;
  email: string;
  createdAt?: string;
  updatedAt?: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type RegisterResponse = {
  message: string;
  user: LoginResponse;
  status: number;
};