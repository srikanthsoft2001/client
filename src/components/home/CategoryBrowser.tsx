import { Button } from '@/components/ui/button';
import { Coffee, Monitor, Home, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategoryBrowser = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: 'Food', path: '/food', icon: <Coffee size={24} /> },
    { id: 2, name: 'Electronics', path: '/electronics', icon: <Monitor size={24} /> },
    { id: 3, name: 'Realestate', path: '/realestate', icon: <Home size={24} /> },
    {
      id: 4,
      name: 'Medical & Para Medical',
      path: '/Medical & Para Medical',
      icon: <HeartPulse size={24} />,
    },
  ];

  const handleCategoryClick = (path: string) => {
    navigate(path);
  };

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-4 h-8 bg-red-500 mr-2"></div>
          <h2 className="text-xl font-bold">Browse By Category</h2>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => handleCategoryClick(category.path)}
            variant="outline"
            className="flex flex-col items-center justify-center h-32 hover:border-red-500 hover:text-red-500 transition-colors"
          >
            {category.icon}
            <span className="mt-2">{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Mobile Full View */}
      <div className="sm:hidden grid grid-cols-4 gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => handleCategoryClick(category.path)}
            variant="outline"
            className="flex flex-col items-center justify-center h-32 w-full hover:border-red-500 hover:text-red-500 transition-colors"
          >
            {category.icon}
            <span className="mt-2 text-center">{category.name}</span>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default CategoryBrowser;
