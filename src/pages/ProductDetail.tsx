
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/ProductCard';
import { 
  Heart, 
  Share2, 
  Minus, 
  Plus, 
  Check, 
  Truck, 
  Shield, 
  RefreshCw 
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: "1",
    name: "iPhone 15 Pro Max 256GB Natural Titanium",
    price: 850000,
    originalPrice: 950000,
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&h=600&fit=crop"
    ],
    condition: "New",
    brand: "Apple",
    rating: 4.8,
    reviews: 24,
    inStock: true,
    stockCount: 5,
    description: "The iPhone 15 Pro Max features a durable titanium design with the powerful A17 Pro chip. Experience next-level performance with advanced camera capabilities and all-day battery life.",
    specifications: {
      "Display": "6.7-inch Super Retina XDR display",
      "Chip": "A17 Pro chip",
      "Storage": "256GB",
      "Camera": "48MP Main | 12MP Ultra Wide | 12MP Telephoto",
      "Battery": "Up to 29 hours video playback",
      "Operating System": "iOS 17",
      "Colors": "Natural Titanium, Blue Titanium, White Titanium, Black Titanium"
    },
    features: [
      "Titanium design",
      "A17 Pro chip",
      "Advanced camera system",
      "Action Button",
      "USB-C connector",
      "Face ID"
    ]
  };

  const relatedProducts = [
    {
      id: "2",
      name: "iPhone 15 Pro 128GB",
      price: 720000,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
      condition: "New" as const,
      rating: 4.7,
      reviews: 18
    },
    {
      id: "3",
      name: "AirPods Pro (2nd generation)",
      price: 180000,
      image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=300&fit=crop",
      condition: "New" as const,
      rating: 4.9,
      reviews: 32
    },
    {
      id: "4",
      name: "MagSafe Charger",
      price: 35000,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop",
      condition: "New" as const,
      rating: 4.6,
      reviews: 12
    }
  ];

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={product.condition === 'New' ? 'default' : 'secondary'}>
                  {product.condition}
                </Badge>
                <Badge variant="outline">{product.brand}</Badge>
                {product.inStock && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <Check className="w-3 h-3 mr-1" />
                    In Stock
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ₦{product.originalPrice.toLocaleString()}
                    </span>
                    <Badge variant="destructive">
                      Save {discount}%
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      disabled={quantity >= product.stockCount}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.stockCount} available
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1">
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>

              <Button variant="outline" size="lg" className="w-full">
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Free Delivery</p>
                  <p className="text-xs text-gray-500">On orders over ₦100k</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Warranty</p>
                  <p className="text-xs text-gray-500">1 year coverage</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-500">30-day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-4">
                  <div className="text-center py-8 text-gray-500">
                    <p>Reviews feature coming soon...</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
