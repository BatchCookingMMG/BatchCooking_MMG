// src/layouts/MainLayout.tsx
import Header from './Header';

import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      
    </div>
  );
}
