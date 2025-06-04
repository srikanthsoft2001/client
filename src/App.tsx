import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import About from './pages/About';
import WishlistPage from './pages/WishlistPage';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import CheckoutLayout from './pages/CheckoutLayout';
import ProductPage from './pages/ProductPage';
import ProductSearch from './components/ProductSearch';
import Category from './pages/Category';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {/* Remove <Search /> icon route */}
            {/* Use ProductSearch for /search route */}
            <Route path="/search" element={<ProductSearch />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route
              path="/category/:categoryName/:subcategoryName"
              element={<Category />}
            />

            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutLayout />} />
            <Route path="/products/:id" element={<ProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
