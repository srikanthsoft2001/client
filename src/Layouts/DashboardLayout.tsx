// src/layouts/DashboardLayout.tsx
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};
