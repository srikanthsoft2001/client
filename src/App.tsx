import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import About from './pages/About';
import WishlistPage from './pages/WishlistPage';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import ProductPage from './pages/ProductPage';
import { OrderListPage } from './pages/OrderListPage';
import { DashboardLayout } from './Layouts/DashboardLayout';
import CheckoutLayout from './Layouts/CheckoutLayout';
import DashboardPage from './pages/DashboardPage';
import AllProductsPage from './pages/AllProductsPage';
import FoodPage from './pages/ProductPages/FoodPage';
import ElectronicsPage from './pages/ProductPages/ElectronicsPage';
import RealEstatePage from './pages/ProductPages/RealEstatePage';
import MedicalPage from './pages/ProductPages/MedicalPage';
import CategoryProducts from './components/product/CategoryProducts';
import ProductSearch from './components/ProductSearch';
import AccountLayout from './pages/AccountLayout';
import { AuthProvider } from './context/AuthContext';
// Redux imports
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';

const queryClient = new QueryClient();

const CategoryProductsWrapper = () => {
  const { category, subcategory } = useParams<{
    category: string;
    subcategory?: string;
  }>();
  if (!category) return <div>Category not found</div>;

  return <CategoryProducts category={category} subcategory={subcategory} />;
};

const App = () => (
  <ReduxProvider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/search" element={<ProductSearch />} />
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckoutLayout />} />
                <Route path="/account" element={<AccountLayout />} />
                <Route path="/products/:id" element={<ProductPage />} />
                <Route path="/order-list" element={<OrderListPage />} />
                <Route path="/all-products" element={<AllProductsPage />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardPage />} />
                </Route>
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
                <Route path="/account" element={<AccountLayout />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ReduxProvider>
);

export default App;
