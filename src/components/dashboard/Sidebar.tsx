// src/components/Sidebar.tsx
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';


export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-64 p-4 border-r">
      <h1 className="text-xl font-bold mb-8">LOGO</h1>
      
      <div className="mb-8">
        <h2 className="font-semibold mb-2">DASHBOARD</h2>
        <ul className="space-y-1">
          <li>
            <Button
              variant="ghost" 
              className="w-full justify-start hover:text-primary"
              onClick={() => navigate('/all-products')}
            >
              ALL PRODUCTS
            </Button>
          </li>
          <li>
            <Button 
              variant="ghost" 
              className="w-full justify-start hover:text-primary font-bold"
              onClick={() => navigate('/order-list')}
            >
              ORDER LIST
            </Button>
          </li>
        </ul>
      </div>
      
      <div>
        <h2 className="font-semibold mb-2">Categories</h2>
      </div>
    </div>
  );
};