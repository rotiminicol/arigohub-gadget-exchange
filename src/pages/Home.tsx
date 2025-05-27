
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Cart, 
  Clock, 
  Check 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Latest iPhone 15 Pro Max",
      subtitle: "Now Available",
      description: "Experience the power of A17 Pro chip with titanium design",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&h=600&fit=crop",
      cta: "Shop Now",
      discount: "Up to 20% off"
    },
    {
      title: "Gaming Laptops",
      subtitle: "Ultimate Performance",
      description: "Power through any game with our premium gaming laptops",
      image: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?w=800&h=600&fit=crop",
      cta: "Explore",
      discount: "Starting ₦450,000"
    },
    {
      title: "Trade Your Old Device",
      subtitle: "Get More Value",
      description: "Swap your gadget for something new. Fast, secure, hassle-free",
      image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=600&fit=crop",
      cta: "Start Swap",
      discount: "Best Prices"
    }
  ];

  const categories = [
    {
      name: "Smartphones",
      icon: "📱",
      count: "500+ items",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=300&h=200&fit=crop"
    },
    {
      name: "Laptops",
      icon: "💻",
      count: "300+ items",
      image: "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?w=300&h=200&fit=crop"
    },
    {
      name: "Gaming Consoles",
      icon: "🎮",
      count: "150+ items",
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop"
    },
    {
      name: "Tablets",
      icon: "📱",
      count: "200+ items",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop"
    },
    {
      name: "Smart Watches",
      icon: "⌚",
      count: "100+ items",
      image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=200&fit=crop"
    },
    {
      name: "Accessories",
      icon: "🎧",
      count: "400+ items",
      image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=300&h=200&fit=crop"
    }
  ];

  const featuredProducts = [
    {
      id: "1",
      name: "iPhone 15 Pro Max 256GB",
      price: 850000,
      originalPrice: 950000,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
      condition: "New" as const,
      rating: 4.8,
      reviews: 24
    },
    {
      id: "2",
      name: "MacBook Pro 14-inch M3",
      price: 1200000,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      condition: "New" as const,
      rating: 4.9,
      reviews: 18
    },
    {
      id: "3",
      name: "PlayStation 5 Console",
      price: 320000,
      originalPrice: 350000,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop",
      condition: "Used" as const,
      rating: 4.7,
      reviews: 31
    },
    {
      id: "4",
      name: "Samsung Galaxy S24 Ultra",
      price: 720000,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
      condition: "Refurbished" as const,
      rating: 4.6,
      reviews: 15
    }
  ];

  const features = [
    {
      icon: <Search className="w-8 h-8 text-primary" />,
      title: "Easy Discovery",
      description: "Find exactly what you need with our smart search and filters"
    },
    {
      icon: <Cart className="w-8 h-8 text-primary" />,
      title: "Simple Checkout",
      description: "No account needed. Buy what you want in just a few clicks"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Real-time Tracking",
      description: "Track your order from purchase to delivery in real-time"
    },
    {
      icon: <Check className="w-8 h-8 text-primary" />,
      title: "Quality Guaranteed",
      description: "All products are verified and come with our quality guarantee"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing platform! Found the perfect laptop at an unbeatable price. The swap feature is genius!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: "Sold my old iPhone in minutes and bought a new one. The process was seamless and secure.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      rating: 5,
      comment: "Best place to find gaming gear. Fast shipping and excellent customer service!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-primary to-blue-600 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroSlides[currentSlide].image}
            alt="Hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              {heroSlides[currentSlide].discount}
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl mb-2 opacity-90">
              {heroSlides[currentSlide].subtitle}
            </p>
            <p className="text-lg mb-8 opacity-80">
              {heroSlides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                {heroSlides[currentSlide].cta}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover amazing deals across all categories. From smartphones to gaming gear, we have everything you need.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name.toLowerCase()}`}
                className="group"
              >
                <Card className="hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-primary/20">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">{category.count}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600">
                Hand-picked products with the best deals
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose ArigoHub */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ArigoHub?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We make buying, selling, and swapping electronics simple, secure, and rewarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust ArigoHub for their electronics needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <span key={i}>★</span>
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
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users buying, selling, and swapping electronics on ArigoHub
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Start Shopping
              </Button>
            </Link>
            <Link to="/sell">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Sell Your Gadget
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
