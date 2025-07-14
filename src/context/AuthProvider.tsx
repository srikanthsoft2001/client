// src/context/AuthProvider.tsx
import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, RootState, loginSuccess, logout } from '@/store/store';
import { AuthContext } from './AuthContext';
import { User } from './authTypes';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth || {});

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
