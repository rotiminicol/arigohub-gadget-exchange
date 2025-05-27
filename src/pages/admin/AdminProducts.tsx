
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
    // Smartphones
    { id: '1', name: 'iPhone 15 Pro Max 256GB', category: 'Smartphones', price: 450000, condition: 'New', stock: 5, status: 'active', image: '/placeholder.svg' },
    { id: '2', name: 'Samsung Galaxy S24 Ultra', category: 'Smartphones', price: 420000, condition: 'New', stock: 8, status: 'active', image: '/placeholder.svg' },
    { id: '3', name: 'iPhone 14 Pro 128GB', category: 'Smartphones', price: 380000, condition: 'Used', stock: 3, status: 'active', image: '/placeholder.svg' },
    { id: '4', name: 'Google Pixel 8 Pro', category: 'Smartphones', price: 350000, condition: 'New', stock: 6, status: 'active', image: '/placeholder.svg' },
    { id: '5', name: 'OnePlus 12', category: 'Smartphones', price: 280000, condition: 'New', stock: 4, status: 'active', image: '/placeholder.svg' },
    
    // Laptops
    { id: '6', name: 'MacBook Pro 16" M3 Pro', category: 'Laptops', price: 850000, condition: 'New', stock: 3, status: 'active', image: '/placeholder.svg' },
    { id: '7', name: 'MacBook Air M2 13"', category: 'Laptops', price: 750000, condition: 'Used', stock: 2, status: 'active', image: '/placeholder.svg' },
    { id: '8', name: 'Dell XPS 13 Plus', category: 'Laptops', price: 680000, condition: 'New', stock: 4, status: 'active', image: '/placeholder.svg' },
    { id: '9', name: 'HP Spectre x360', category: 'Laptops', price: 620000, condition: 'Used', stock: 2, status: 'active', image: '/placeholder.svg' },
    { id: '10', name: 'Lenovo ThinkPad X1 Carbon', category: 'Laptops', price: 580000, condition: 'New', stock: 3, status: 'active', image: '/placeholder.svg' },
    
    // Gaming
    { id: '11', name: 'PlayStation 5', category: 'Gaming', price: 320000, condition: 'New', stock: 0, status: 'inactive', image: '/placeholder.svg' },
    { id: '12', name: 'Xbox Series X', category: 'Gaming', price: 310000, condition: 'New', stock: 2, status: 'active', image: '/placeholder.svg' },
    { id: '13', name: 'Nintendo Switch OLED', category: 'Gaming', price: 180000, condition: 'New', stock: 5, status: 'active', image: '/placeholder.svg' },
    { id: '14', name: 'PlayStation 5 Digital', category: 'Gaming', price: 280000, condition: 'Used', stock: 1, status: 'active', image: '/placeholder.svg' },
    { id: '15', name: 'Steam Deck 512GB', category: 'Gaming', price: 250000, condition: 'New', stock: 3, status: 'active', image: '/placeholder.svg' },
    
    // Audio & Accessories
    { id: '16', name: 'AirPods Pro 2nd Gen', category: 'Audio', price: 120000, condition: 'New', stock: 10, status: 'active', image: '/placeholder.svg' },
    { id: '17', name: 'Sony WH-1000XM5', category: 'Audio', price: 180000, condition: 'New', stock: 6, status: 'active', image: '/placeholder.svg' },
    { id: '18', name: 'iPad Pro 12.9" M2', category: 'Tablets', price: 650000, condition: 'New', stock: 2, status: 'active', image: '/placeholder.svg' },
    { id: '19', name: 'Apple Watch Series 9', category: 'Accessories', price: 220000, condition: 'New', stock: 7, status: 'active', image: '/placeholder.svg' },
    { id: '20', name: 'MacBook Pro 14" M3', category: 'Laptops', price: 780000, condition: 'New', stock: 1, status: 'active', image: '/placeholder.svg' }
  ];

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'destructive';
    if (stock < 5) return 'secondary';
    return 'default';
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Products</p>
                <p className="text-2xl font-bold">{products.filter(p => p.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold">{products.filter(p => p.stock === 0).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold">₦{products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
          <CardTitle>All Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">ID: {product.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="font-semibold">₦{product.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.condition}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStockColor(product.stock)}>
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProducts;
