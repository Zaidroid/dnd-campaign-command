import { ReactNode } from 'react';
import AppSidebar from './AppSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProtectedRoute from '../auth/ProtectedRoute';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <AppSidebar />
        <ScrollArea className="flex-1">
          <div className="p-6 max-w-[1500px] mx-auto">
            {children}
          </div>
        </ScrollArea>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
