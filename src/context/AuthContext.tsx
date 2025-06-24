import React, { createContext, useContext, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState, loginSuccess, logout } from '@/Store/store';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  userId: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);

  const login = (token: string, user: User) => {
    dispatch(loginSuccess({ user, token }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        userId: user?._id ?? null,
        login,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
