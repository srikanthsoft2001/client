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

const queryClient = new QueryClient();

// Wrapper component to extract params and pass to CategoryProducts
const CategoryProductsWrapper = () => {
  const { category, subcategory } = useParams<{
    category: string;
    subcategory?: string;
  }>();
  if (!category) return <div>Category not found</div>;

  return <CategoryProducts category={category} subcategory={subcategory} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
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
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/order-list" element={<OrderListPage />} />
            <Route path="/all-products" element={<AllProductsPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
            </Route>

            {/* Your existing category routes can stay or be removed if replaced */}
            <Route path="/food" element={<FoodPage />} />
            <Route path="/electronics" element={<ElectronicsPage />} />
            <Route path="/realestate" element={<RealEstatePage />} />
            <Route path="/Medical & Para Medical" element={<MedicalPage />} />

            {/* New dynamic category/subcategory route */}
            <Route
              path="/category/:category"
              element={<CategoryProductsWrapper />}
            />
            <Route
              path="/category/:category/:subcategory"
              element={<CategoryProductsWrapper />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
