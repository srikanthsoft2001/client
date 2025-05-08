import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FiArrowRight } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-6">
      <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {/* Exclusive section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Exclusive</h2>
            <div className="space-y-2">
              <p className="mb-4">Subscribe</p>
              <p className="mb-4">Get 10% off your first order</p>
              <div className="flex">
                <Input
                  placeholder="Enter your email"
                  className="bg-transparent border-white rounded-r-none"
                />
                <Button
                  variant="ghost"
                  className="border border-l-0 border-white rounded-l-none"
                >
                  <FiArrowRight size={24} />
                </Button>
              </div>
            </div>
          </div>

          {/* Support section */}
          <div>
            <h2 className="font-bold text-xl mb-6">Support</h2>
            <div className="space-y-3">
              <p>111 Bijoy sarani, Dhaka,</p>
              <p>DH 1515, Bangladesh.</p>
              <p>exclusive@gmail.com</p>
              <p>+88015-88888-9999</p>
            </div>
          </div>

          {/* Account section */}
          <div>
            <h2 className="font-bold text-xl mb-6">Account</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/account" className="hover:underline">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:underline">
                  Login / Register
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:underline">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:underline">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:underline">
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Link section */}
          <div>
            <h2 className="font-bold text-xl mb-6">Quick Link</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline">
                  Terms Of Use
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Download section */}
          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="font-bold text-xl mb-6">Download App</h2>
            <p className="text-sm text-gray-300 mb-4">
              Save $3 with App New User Only
            </p>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <img
                  src="/lovable-uploads/08288069-1fc8-4270-be79-02217c21e1e0.png"
                  alt="QR Code"
                  className="w-24 h-24"
                />
              </div>
              <div className="flex flex-col gap-2">
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Google Play"
                  className="h-10"
                />
                <img
                  src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
                  alt="App Store"
                  className="h-10"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-6">
              <Link to="#" className="hover:text-gray-300">
                <FaFacebook size={24} />
              </Link>
              <Link to="#" className="hover:text-gray-300">
                <FaTwitter size={24} />
              </Link>
              <Link to="#" className="hover:text-gray-300">
                <FaInstagram size={24} />
              </Link>
              <Link to="#" className="hover:text-gray-300">
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center">
          <p>© Copyright Rimel 2022. All right reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
