// src/context/AuthContext.ts
import { createContext } from 'react';
import { AuthContextType } from './authTypes'; // Ensure this is used!

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
