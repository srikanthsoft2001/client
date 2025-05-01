import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Hamburger and Logo */}
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl">
              Exclusive
            </Link>
          </div>

          {/* Center - Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-black font-medium hover:text-primary">
              Home
            </Link>
            <Link
              to="/contact"
              className="text-black font-medium hover:text-primary"
            >
              Contact
            </Link>
            <Link
              to="/about"
              className="text-black font-medium hover:text-primary"
            >
              About
            </Link>
            {/* <Link
              to="/signup"
              className="text-black font-medium hover:text-primary"
            >
              Sign Up
            </Link> */}
          </div>

          {/* Right side - Icons */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center relative rounded-md">
              <Input
                placeholder="What are you looking for?"
                className="w-64 pr-10 bg-gray-50"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0 h-full"
              >
                <Search size={20} />
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="sm:inline-flex">
              <Heart size={24} />
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Button>

            <Button variant="ghost" size="icon">
              <User size={24} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white pb-4 space-y-4">
            <div className="flex items-center relative rounded-md px-2">
              <Input
                placeholder="Search..."
                className="w-full pr-10 bg-gray-50"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-0 h-full"
              >
                <Search size={20} />
              </Button>
            </div>

            <div className="flex flex-col space-y-3 px-2">
              <Link
                to="/"
                className="text-black font-medium hover:text-primary py-2 px-4 rounded hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/contact"
                className="text-black font-medium hover:text-primary py-2 px-4 rounded hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                to="/about"
                className="text-black font-medium hover:text-primary py-2 px-4 rounded hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/signup"
                className="text-black font-medium hover:text-primary py-2 px-4 rounded hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
