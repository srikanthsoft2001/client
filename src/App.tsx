import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster as Sonner } from '@/components/ui/sonner';

import { store, useAppDispatch, useAppSelector, validateToken } from '@/store';

import ProtectedRoute from './routes/ProtectedRoute';

import Layout from './components/Layout';
import ProductSearch from './components/ProductSearch';
import CategoryProducts from './components/product/CategoryProducts';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import WishlistPage from './pages/WishlistPage';
import Cart from './pages/Cart';
import CheckoutLayout from './Layouts/CheckoutLayout';
import ProductPage from './pages/ProductPage';
import OrderSuccess from './pages/ProductPages/OrderSucess';
import PaymentMethod from './pages/PaymentMethod';
import AccountLayout from './pages/AccountLayout';
import AllProductsPage from './pages/AllProductsPage';
import { OrderListPage } from './pages/OrderListPage';
import DashboardPage from './pages/DashboardPage';
import { DashboardLayout } from './Layouts/DashboardLayout';
import FoodPage from './pages/ProductPages/FoodPage';
import ElectronicsPage from './pages/ProductPages/ElectronicsPage';
import RealEstatePage from './pages/ProductPages/RealEstatePage';
import MedicalPage from './pages/ProductPages/MedicalPage';
import { AuthProvider } from './context/AuthProvider';
import Chatbot from './pages/Chatbot';

const queryClient = new QueryClient();

// Wrapper for dynamic category routes
const CategoryProductsWrapper = () => {
  const { category } = useParams<{
    category: string;
    subcategory?: string;
  }>();
  if (!category) return <div>Category not found</div>;
  return <CategoryProducts category={category} />;
};

const AppContent = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.auth?.loading);

  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Checking login...</div>;
  }

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
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/search" element={<ProductSearch />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/all-products" element={<AllProductsPage />} />
                <Route path="/food" element={<FoodPage />} />
                <Route path="/electronics" element={<ElectronicsPage />} />
                <Route path="/realestate" element={<RealEstatePage />} />
                <Route path="/Medical & Para Medical" element={<MedicalPage />} />
                <Route path="/category/:category" element={<CategoryProductsWrapper />} />
                <Route
                  path="/category/:category/:subcategory"
                  element={<CategoryProductsWrapper />}
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
                    <Route path="order-list" element={<OrderListPage />} />
                  </Route>
                  <Route path="/chat" element={<Chatbot />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const App = () => (
  <ReduxProvider store={store}>
    <AppContent />
  </ReduxProvider>
);

export default App;
