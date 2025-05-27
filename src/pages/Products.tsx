
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { Filter, Search, X } from 'lucide-react';

const Products = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const products = [
    {
      id: "1",
      name: "iPhone 15 Pro Max 256GB Natural Titanium",
      price: 850000,
      originalPrice: 950000,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
      condition: "New" as const,
      rating: 4.8,
      reviews: 24
    },
    {
      id: "2",
      name: "MacBook Pro 14-inch M3 Chip",
      price: 1200000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      condition: "New" as const,
      rating: 4.9,
      reviews: 18
    },
    {
      id: "3",
      name: "PlayStation 5 Console with Controller",
      price: 320000,
      originalPrice: 350000,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
      condition: "Used" as const,
      rating: 4.7,
      reviews: 31
    },
    {
      id: "4",
      name: "Samsung Galaxy S24 Ultra 512GB",
      price: 720000,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
      condition: "Refurbished" as const,
      rating: 4.6,
      reviews: 15
    },
    {
      id: "5",
      name: "iPad Air 5th Generation 256GB",
      price: 480000,
      originalPrice: 520000,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
      condition: "New" as const,
      rating: 4.7,
      reviews: 22
    },
    {
      id: "6",
      name: "Apple Watch Series 9 GPS 45mm",
      price: 285000,
      image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=300&fit=crop",
      condition: "New" as const,
      rating: 4.8,
      reviews: 19
    }
  ];

  const categories = [
    'Smartphones',
    'Laptops',
    'Tablets',
    'Gaming Consoles',
    'Smart Watches',
    'Accessories'
  ];

  const brands = [
    'Apple',
    'Samsung',
    'Sony',
    'Microsoft',
    'Google',
    'OnePlus'
  ];

  const conditions = ['New', 'Used', 'Refurbished'];

  const priceRanges = [
    { label: 'Under ₦100,000', min: 0, max: 100000 },
    { label: '₦100,000 - ₦300,000', min: 100000, max: 300000 },
    { label: '₦300,000 - ₦500,000', min: 300000, max: 500000 },
    { label: '₦500,000 - ₦1,000,000', min: 500000, max: 1000000 },
    { label: 'Above ₦1,000,000', min: 1000000, max: 9999999 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">All Products</h1>
              <p className="text-gray-600">Showing {products.length} products</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-80 pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>

              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
            <Card className="p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Categories */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Categories</Label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} />
                        <label htmlFor={category} className="text-sm cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Price Range</Label>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <div key={range.label} className="flex items-center space-x-2">
                        <Checkbox id={range.label} />
                        <label htmlFor={range.label} className="text-sm cursor-pointer">
                          {range.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Condition */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Condition</Label>
                  <div className="space-y-2">
                    {conditions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox id={condition} />
                        <label htmlFor={condition} className="text-sm cursor-pointer">
                          {condition}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Brands</Label>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={brand} />
                        <label htmlFor={brand} className="text-sm cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button variant="outline" className="w-full">
                  Clear All Filters
                </Button>
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
