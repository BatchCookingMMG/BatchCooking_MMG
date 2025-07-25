import { convertKeysToCamel } from "../../../utils/caseConverter";
import { User, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/features/users/types/userTypes';

const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
  }

  const rawData: LoginResponse = await response.json();
  const data: LoginResponse = convertKeysToCamel<LoginResponse>(rawData);
  
  return data;
};

export const registerUser = async (userData: RegisterRequest): Promise<RegisterResponse> => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Erreur HTTP ${response.status} : ${response.statusText}`);
  }

  const rawData: RegisterResponse = await response.json();
  const data: RegisterResponse = convertKeysToCamel<RegisterResponse>(rawData);
  
  return data;
};

export const getCurrentUser = async (token: string): Promise<User> => {
  const response = await fetch(`${API_URL}/api/users/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status} : ${response.statusText}`);
  }

  const rawData: User = await response.json();
  const data: User = convertKeysToCamel<User>(rawData);
  
  return data;
};