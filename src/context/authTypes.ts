// src/context/authTypes.ts

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'seller' | 'buyer';
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  userId: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}
