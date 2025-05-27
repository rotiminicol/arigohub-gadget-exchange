
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  User, 
  ShoppingCart, 
  Home,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [cartCount] = useState(0);
  const navigate = useNavigate();

  const categories = [
    'Smartphones',
    'Laptops',
    'Gaming Consoles',
    'Tablets',
    'Accessories',
    'Smart Watches'
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ArigoHub</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for phones, laptops, consoles..."
                className="w-full pl-10 pr-4 py-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/track')}
              className="hidden sm:flex"
            >
              Track Order
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-red-500">
                  {cartCount}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin')}
              className="hidden sm:flex"
            >
              <User className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 py-3 border-t">
          <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors">
              <span>Categories</span>
              <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              {categories.map((category) => (
                <DropdownMenuItem key={category}>
                  <Link to={`/products?category=${category.toLowerCase()}`} className="w-full">
                    {category}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/swap" className="text-gray-700 hover:text-primary transition-colors">
            Swap Gadgets
          </Link>

          <Link to="/sell" className="text-gray-700 hover:text-primary transition-colors">
            Sell Your Gadget
          </Link>
        </nav>

        {/* Mobile search */}
        <div className="md:hidden py-3 border-t">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
