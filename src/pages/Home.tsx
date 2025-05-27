
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Truck, 
  Shield, 
  Headphones, 
  ArrowRight,
  Smartphone,
  Laptop,
  Gamepad2,
  ShoppingCart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';

const Home = () => {
  const featuredProducts = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
      price: 450000,
      originalPrice: 500000,
      image: '/placeholder.svg',
      condition: 'New' as const,
      rating: 4.8,
      reviews: 24
    },
    {
      id: '2',
      name: 'MacBook Air M2 13"',
      price: 750000,
      image: '/placeholder.svg',
      condition: 'Used' as const,
      rating: 4.5,
      reviews: 18
    },
    {
      id: '3',
      name: 'PlayStation 5 Console',
      price: 320000,
      originalPrice: 380000,
      image: '/placeholder.svg',
      condition: 'New' as const,
      rating: 4.9,
      reviews: 45
    },
    {
      id: '4',
      name: 'Samsung Galaxy S24 Ultra',
      price: 420000,
      image: '/placeholder.svg',
      condition: 'Refurbished' as const,
      rating: 4.6,
      reviews: 32
    }
  ];

  const categories = [
    {
      name: 'Smartphones',
      icon: Smartphone,
      count: '150+ Products',
      image: '/placeholder.svg'
    },
    {
      name: 'Laptops',
      icon: Laptop,
      count: '80+ Products',
      image: '/placeholder.svg'
    },
    {
      name: 'Gaming',
      icon: Gamepad2,
      count: '60+ Products',
      image: '/placeholder.svg'
    },
    {
      name: 'Accessories',
      icon: ShoppingCart,
      count: '200+ Products',
      image: '/placeholder.svg'
    }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and secure delivery across Nigeria'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: 'Your transactions are protected and secure'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer service support'
    },
    {
      icon: Star,
      title: 'Quality Assured',
      description: 'All products are tested and verified'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing service! Got my iPhone delivered within 2 days. Highly recommended!',
      avatar: '/placeholder.svg'
    },
    {
      name: 'Michael Chen',
      rating: 5,
      comment: 'Best place to buy gadgets in Nigeria. Great prices and excellent customer service.',
      avatar: '/placeholder.svg'
    },
    {
      name: 'Adebayo Okon',
      rating: 4,
      comment: 'Swapped my old laptop for a newer model. Process was smooth and hassle-free.',
      avatar: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-white to-primary/5 py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4" variant="secondary">
            🎉 New Arrivals Every Week
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Your Premier
            <span className="text-primary"> Electronics </span>
            Marketplace
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Buy, sell, and swap the latest gadgets. From smartphones to laptops, 
            gaming consoles to accessories - find everything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/products">
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/swap">
                Swap Your Gadget
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.name}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <category.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600">
              Discover our handpicked selection of premium gadgets
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/products">
                View All Products
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose ArigoHub?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <div className="flex">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Next Gadget?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of satisfied customers who trust ArigoHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <Link to="/products">Start Shopping</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
              <Link to="/sell">Sell Your Gadget</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
