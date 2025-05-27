
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Filter
} from 'lucide-react';

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
      category: 'Smartphones',
      price: 450000,
      condition: 'New',
      stock: 5,
      status: 'active',
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'MacBook Air M2 13"',
      category: 'Laptops',
      price: 750000,
      condition: 'Used',
      stock: 2,
      status: 'active',
      image: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'PlayStation 5',
      category: 'Gaming',
      price: 320000,
      condition: 'New',
      stock: 0,
      status: 'inactive',
      image: '/placeholder.svg'
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'destructive';
    if (stock < 5) return 'secondary';
    return 'default';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                    <Badge variant="outline">
                      {product.condition}
                    </Badge>
                    <Badge variant={getStockColor(product.stock)}>
                      Stock: {product.stock}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">₦{product.price.toLocaleString()}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProducts;
