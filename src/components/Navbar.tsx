import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout(); // calls AuthContext logout, which handles API + context
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const categories = [
    { name: 'Food', subcategories: ['Fruits', 'Vegetables', 'Grains'] },
    {
      name: 'Electronics',
      subcategories: ['IoT Based', 'Digital', 'Electronic'],
    },
    { name: 'Realestate', subcategories: ['Material', 'Goods and Services'] },
    {
      name: 'Medical & Para Medical',
      subcategories: ['Lab Equipment', 'Instruments'],
    },
  ];

  const slugify = (text: string) =>
    text.toLowerCase().trim().replace(/\s+/g, '-').replace(/&/g, 'and');

  return (
    <>
      <nav className="sticky top-0 z-50 bg-primary text-secondary border-b border-gray-800 shadow-sm">
        <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="font-bold text-xl">
                Bliveus
              </Link>
            </div>

            <div className="hidden md:flex space-x-8">
              <Link to="/" className="font-medium hover:text-gray-300">
                Home
              </Link>
              <Link to="/contact" className="font-medium hover:text-gray-300">
                Contact
              </Link>
              <Link to="/about" className="font-medium hover:text-gray-300">
                About
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center relative rounded-md">
                <Input
                  placeholder="What are you looking for?"
                  className="w-64 pr-10 bg-gray-100 text-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full text-primary"
                  onClick={handleSearch}
                  aria-label="Search"
                >
                  <Search size={20} />
                </Button>
              </div>

              <Link to="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-primary"
                  aria-label="Wishlist"
                >
                  <Heart size={24} />
                </Button>
              </Link>

              <Link to="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-white hover:text-primary"
                  aria-label="Cart"
                >
                  <ShoppingCart size={24} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </Link>

              {user ? (
                <>
                  <div className="text-white font-medium px-2">
                    <Link to="/account">Welcome,{user.name}</Link>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-primary"
                    onClick={handleLogout}
                    title="Logout"
                    aria-label="Logout"
                  >
                    <LogOut size={24} />
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-primary"
                    aria-label="Login"
                  >
                    <User size={24} />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-black pb-4 space-y-4">
              <div className="flex items-center relative rounded-md px-2">
                <Input
                  placeholder="Search..."
                  className="w-full pr-10 bg-gray-100 text-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-0 h-full text-primary"
                  onClick={handleSearch}
                  aria-label="Search"
                >
                  <Search size={20} />
                </Button>
              </div>

              <div className="flex flex-col space-y-3 px-2">
                {['/', '/contact', '/about', '/dashboard', '/login'].map(
                  (path, i) => (
                    <Link
                      key={i}
                      to={path}
                      className="text-white font-medium hover:text-gray-300 py-2 px-4 rounded hover:bg-gray-800"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {path === '/'
                        ? 'Home'
                        : path.replace('/', '').replace('-', ' ')}
                    </Link>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="bg-primary shadow-md text-secondary">
        <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-10">
            <div className="flex items-center mr-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:text-primary"
                onClick={() => navigate('/dashboard')}
                aria-label="Dashboard"
              >
                <Menu size={24} />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:text-primary"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>

            <div
              className="relative flex items-center px-4 py-2 bg-navy-700 hover:bg-navy-800 cursor-pointer"
              onMouseEnter={() => setIsCategoryHovered(true)}
              onMouseLeave={() => setIsCategoryHovered(false)}
            >
              <span className="font-medium">All Categories</span>
              <ChevronDown size={16} className="ml-2" />
              {isCategoryHovered && (
                <div className="absolute top-full left-0 w-64 bg-white text-black shadow-lg z-50">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="group relative border-b border-gray-200"
                    >
                      <div className="px-4 py-3 hover:bg-gray-100 flex justify-between items-center">
                        <span>{category.name}</span>
                        <ChevronDown size={16} className="text-gray-500" />
                      </div>
                      <div className="hidden group-hover:block absolute left-full top-0 w-64 bg-white shadow-lg">
                        {category.subcategories.map((subcat, subIndex) => (
                          <Link
                            key={subIndex}
                            to={`/category/${slugify(category.name)}/${slugify(
                              subcat
                            )}`}
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setIsCategoryHovered(false)}
                          >
                            {subcat}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden md:flex space-x-6 ml-6">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  to={`/category/${slugify(category.name)}`}
                  className="text-secondary transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
