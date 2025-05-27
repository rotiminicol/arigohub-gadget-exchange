
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  condition: 'New' | 'Used' | 'Refurbished';
  rating?: number;
  reviews?: number;
  category?: string;
  brand?: string;
  inStock?: boolean;
  stockCount?: number;
  description?: string;
  specifications?: Record<string, string>;
  features?: string[];
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  condition, 
  rating = 4.5, 
  reviews = 0,
  category,
  brand,
  inStock = true,
  stockCount = 0,
  description,
  specifications,
  features
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    const product = {
      id,
      name,
      price,
      image,
      condition,
      category,
      brand,
      inStock,
      stockCount,
      description,
      specifications,
      features
    };
    
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-gray-200 hover:border-primary/20">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <Badge 
              variant={condition === 'New' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {condition}
            </Badge>
            {discount > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{discount}%
              </Badge>
            )}
          </div>
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
              asChild
            >
              <Link to={`/product/${id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="p-4">
          <Link to={`/product/${id}`}>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
              {name}
            </h3>
          </Link>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xs ${
                    i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500">({reviews} reviews)</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                ₦{price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₦{originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <Button 
            className="w-full" 
            size="sm" 
            onClick={handleAddToCart}
            disabled={!inStock || stockCount === 0}
          >
            {inStock && stockCount > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
