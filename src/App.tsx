import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { AuthProvider } from '@/context/AuthContext';

import { useAppDispatch, useAppSelector, validateToken } from './Store/store';
import ProtectedRoute from './routes/ProtectedRoute';

import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import SignUp from '@/pages/SignUp';
import Login from '@/pages/Login';
import About from '@/pages/About';
import WishlistPage from '@/pages/WishlistPage';
import Contact from '@/pages/Contact';
import Cart from '@/pages/Cart';
import ProductPage from '@/pages/ProductPage';
import AllProductsPage from '@/pages/AllProductsPage';
import FoodPage from '@/pages/ProductPages/FoodPage';
import ElectronicsPage from '@/pages/ProductPages/ElectronicsPage';
import RealEstatePage from '@/pages/ProductPages/RealEstatePage';
import MedicalPage from '@/pages/ProductPages/MedicalPage';
import DashboardPage from '@/pages/DashboardPage';
import CheckoutLayout from '@/Layouts/CheckoutLayout';
import AccountLayout from '@/pages/AccountLayout';
import PaymentMethod from '@/pages/PaymentMethod';
import OrderSuccess from '@/pages/ProductPages/OrderSucess';

import CategoryProducts from '@/components/product/CategoryProducts';
import ProductSearch from '@/components/ProductSearch';
import { DashboardLayout } from './Layouts/DashboardLayout';
import OrderListPage from './components/dashboard/OrderList';

const queryClient = new QueryClient();

// Wrapper for dynamic params in /category/:category
const CategoryProductsWrapper = () => {
  const { category, subcategory } = useParams<{
    category: string;
    subcategory?: string;
  }>();
  if (!category) return <div>Category not found</div>;
  return <CategoryProducts category={category} subcategory={subcategory} />;
};

const App = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth.loading);

  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);

  if (loading)
    return <div className="text-center mt-20 text-xl">Checking login...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/search" element={<ProductSearch />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/all-products" element={<AllProductsPage />} />
                <Route path="/food" element={<FoodPage />} />
                <Route path="/electronics" element={<ElectronicsPage />} />
                <Route path="/realestate" element={<RealEstatePage />} />
                <Route
                  path="/Medical & Para Medical"
                  element={<MedicalPage />}
                />
                <Route
                  path="/category/:category"
                  element={<CategoryProductsWrapper />}
                />
                <Route
                  path="/category/:category/:subcategory"
                  element={<CategoryProductsWrapper />}
                />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route
                  path="/dashboard/order-list"
                  element={<OrderListPage />}
                />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<CheckoutLayout />} />
                  <Route path="/paymentmethod" element={<PaymentMethod />} />
                  <Route path="/account" element={<AccountLayout />} />
                  <Route path="/order-list" element={<OrderListPage />} />
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardPage />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
