import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Heart, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/useAuth';

const Navbar = () => {
  const itemCount = useSelector((state: RootState) =>
    state.cart.reduce((total, item) => total + item.quantity, 0),
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      logout();
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
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
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-primary text-secondary shadow-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-white">
              Bliveus
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6">
              <Link to="/" className="hover:text-gray-300">
                Home
              </Link>
              <Link to="/contact" className="hover:text-gray-300">
                Contact
              </Link>
              <Link to="/about" className="hover:text-gray-300">
                About
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden sm:flex relative">
                <Input
                  className="w-64 pr-10 bg-gray-100 text-black"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full text-primary"
                  onClick={handleSearch}
                >
                  <Search size={20} />
                </Button>
              </div>

              {/* Wishlist */}
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="text-white">
                  <Heart size={24} />
                </Button>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon" className="text-white">
                  <ShoppingCart size={24} />
                </Button>
                {user && itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center z-10">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Auth Buttons */}
              {user ? (
                <>
                  <Link to="/account" className="text-white font-medium">
                    Welcome, {user.name}
                  </Link>
                  <Button variant="ghost" size="icon" className="text-white" onClick={handleLogout}>
                    <LogOut size={24} />
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" size="icon" className="text-white">
                    <User size={24} />
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Items */}
        {isMenuOpen && (
          <div className="md:hidden bg-black py-4 space-y-2 px-4">
            {['/', '/contact', '/about'].map((path, i) => (
              <Link
                key={i}
                to={path}
                className="text-white block hover:bg-gray-800 p-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                {path === '/' ? 'Home' : path.replace('/', '').toUpperCase()}
              </Link>
            ))}
            {!user && (
              <Link
                to="/login"
                className="text-white block hover:bg-gray-800 p-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                LOGIN
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Bottom Navigation Bar with Horizontal Categories Only */}
      <div className="bg-primary text-secondary shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-10">
          {/* Dashboard Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => navigate('/dashboard')}
          >
            <Menu size={24} />
          </Button>

          {/* Horizontal Categories */}
          <div className="hidden md:flex ml-6 gap-6">
            {categories.map((cat, idx) => (
              <Link key={idx} to={`/category/${slugify(cat.name)}`} className="hover:text-gray-300">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
