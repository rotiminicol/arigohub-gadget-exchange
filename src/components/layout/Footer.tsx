
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold">ArigoHub</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted marketplace for buying, selling, and swapping electronics and gadgets.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
              <li><Link to="/swap" className="text-gray-400 hover:text-white transition-colors">Swap Gadgets</Link></li>
              <li><Link to="/sell" className="text-gray-400 hover:text-white transition-colors">Sell Your Gadget</Link></li>
              <li><Link to="/track" className="text-gray-400 hover:text-white transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products?category=smartphones" className="text-gray-400 hover:text-white transition-colors">Smartphones</Link></li>
              <li><Link to="/products?category=laptops" className="text-gray-400 hover:text-white transition-colors">Laptops</Link></li>
              <li><Link to="/products?category=consoles" className="text-gray-400 hover:text-white transition-colors">Gaming Consoles</Link></li>
              <li><Link to="/products?category=accessories" className="text-gray-400 hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 ArigoHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
