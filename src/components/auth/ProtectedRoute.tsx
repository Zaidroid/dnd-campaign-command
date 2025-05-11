import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('dnd-authenticated');
    
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [navigate]);
  
  return <>{children}</>;
};

export default ProtectedRoute;
