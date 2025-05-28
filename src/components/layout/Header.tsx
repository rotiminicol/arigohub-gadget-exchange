
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ShoppingCart, 
  Menu, 
  X,
  Search,
  Smartphone,
  Laptop,
  Gamepad2,
  Headphones,
  Shield,
  Heart
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems, wishlistItems } = useCart();
  const navigate = useNavigate();
  const cartItemsCount = getTotalItems();

  const categories = [
    { name: 'Phones', icon: Smartphone, href: '/category/phones' },
    { name: 'Laptops', icon: Laptop, href: '/category/laptops' },
    { name: 'Gaming', icon: Gamepad2, href: '/category/gaming' },
    { name: 'Audio', icon: Headphones, href: '/category/audio' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AH</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ArigoHub</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none border-r-0"
              />
              <Button type="submit" variant="outline" className="rounded-l-none">
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/swap" className="text-gray-700 hover:text-primary transition-colors">
              Swap
            </Link>
            <Link to="/sell" className="text-gray-700 hover:text-primary transition-colors">
              Sell
            </Link>
            <Link to="/track" className="text-gray-700 hover:text-primary transition-colors">
              Track Order
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button - Mobile */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="w-4 h-4" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                  {wishlistItems.length}
                </Badge>
              )}
            </Button>

            {/* Admin Portal Button */}
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin" className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:block">Admin</span>
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link to="/cart">
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Categories Bar - Desktop */}
        <div className="hidden md:flex items-center space-x-6 py-3 border-t">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary transition-colors"
            >
              <category.icon className="w-4 h-4" />
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none border-r-0"
              />
              <Button type="submit" variant="outline" className="rounded-l-none">
                <Search className="w-4 h-4" />
              </Button>
            </form>
            
            <Link to="/" className="block text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="block text-gray-700 hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/swap" className="block text-gray-700 hover:text-primary transition-colors">
              Swap
            </Link>
            <Link to="/sell" className="block text-gray-700 hover:text-primary transition-colors">
              Sell
            </Link>
            <Link to="/track" className="block text-gray-700 hover:text-primary transition-colors">
              Track Order
            </Link>
            
            {/* Mobile Categories */}
            <div className="pt-4 border-t">
              <p className="text-sm font-medium text-gray-900 mb-2">Categories</p>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="flex items-center space-x-2 py-2 text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
