// import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link to="#" className="hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link to="#" className="hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link to="#" className="hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
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
