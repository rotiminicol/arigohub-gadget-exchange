
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Filter,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Upload
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminProducts = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    condition: '',
    description: '',
    features: '',
    specifications: '',
    stock: '',
    brand: '',
    model: '',
    color: '',
    storage: '',
    warranty: ''
  });

  // Enhanced product data with more comprehensive information
  const products = [
    // Smartphones
    { 
      id: '1', 
      name: 'iPhone 15 Pro Max 256GB Natural Titanium', 
      category: 'Smartphones', 
      price: 450000, 
      originalPrice: 500000,
      condition: 'New', 
      stock: 5, 
      status: 'active', 
      image: '/placeholder.svg',
      brand: 'Apple',
      model: 'iPhone 15 Pro Max',
      color: 'Natural Titanium',
      storage: '256GB',
      warranty: '12 months',
      sales_count: 12,
      views: 234,
      date_added: '2024-01-15'
    },
    { 
      id: '2', 
      name: 'Samsung Galaxy S24 Ultra 512GB Titanium Black', 
      category: 'Smartphones', 
      price: 420000, 
      originalPrice: 480000,
      condition: 'New', 
      stock: 8, 
      status: 'active', 
      image: '/placeholder.svg',
      brand: 'Samsung',
      model: 'Galaxy S24 Ultra',
      color: 'Titanium Black',
      storage: '512GB',
      warranty: '12 months',
      sales_count: 8,
      views: 156,
      date_added: '2024-01-10'
    },
    // Laptops
    { 
      id: '6', 
      name: 'MacBook Pro 16" M3 Pro 18GB RAM 512GB SSD', 
      category: 'Laptops', 
      price: 850000, 
      originalPrice: 950000,
      condition: 'New', 
      stock: 3, 
      status: 'active', 
      image: '/placeholder.svg',
      brand: 'Apple',
      model: 'MacBook Pro 16"',
      color: 'Space Black',
      storage: '512GB SSD',
      warranty: '12 months',
      sales_count: 5,
      views: 189,
      date_added: '2024-01-08'
    },
    // Gaming
    { 
      id: '11', 
      name: 'PlayStation 5 Console + DualSense Controller', 
      category: 'Gaming', 
      price: 320000, 
      originalPrice: 350000,
      condition: 'New', 
      stock: 0, 
      status: 'out_of_stock', 
      image: '/placeholder.svg',
      brand: 'Sony',
      model: 'PlayStation 5',
      color: 'White',
      storage: '825GB SSD',
      warranty: '12 months',
      sales_count: 15,
      views: 456,
      date_added: '2024-01-05'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'out_of_stock': return 'destructive';
      case 'discontinued': return 'secondary';
      case 'draft': return 'outline';
      default: return 'secondary';
    }
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'destructive';
    if (stock < 5) return 'secondary';
    return 'default';
  };

  const handleAddProduct = () => {
    console.log('Adding product:', newProduct);
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added to inventory.`,
    });
    setIsAddDialogOpen(false);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      originalPrice: '',
      condition: '',
      description: '',
      features: '',
      specifications: '',
      stock: '',
      brand: '',
      model: '',
      color: '',
      storage: '',
      warranty: ''
    });
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    console.log(`Updating stock for product ${productId} to ${newStock}`);
    toast({
      title: "Stock Updated",
      description: `Product stock updated to ${newStock} units.`,
    });
  };

  const handleUpdateStatus = (productId: string, newStatus: string) => {
    console.log(`Updating status for product ${productId} to ${newStatus}`);
    toast({
      title: "Status Updated",
      description: `Product status updated to ${newStatus}.`,
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category.toLowerCase() === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const totalSales = products.reduce((sum, p) => sum + (p.sales_count || 0), 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="e.g., iPhone 15 Pro Max 256GB"
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Brand *</Label>
                  <Input
                    id="brand"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                    placeholder="e.g., Apple, Samsung"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Smartphones">Smartphones</SelectItem>
                      <SelectItem value="Laptops">Laptops</SelectItem>
                      <SelectItem value="Gaming">Gaming</SelectItem>
                      <SelectItem value="Audio">Audio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="condition">Condition *</Label>
                  <Select value={newProduct.condition} onValueChange={(value) => setNewProduct({...newProduct, condition: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Like New">Like New</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Selling Price (₦) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="450000"
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Original Price (₦)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={(e) => setNewProduct({...newProduct, originalPrice: e.target.value})}
                    placeholder="500000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={newProduct.color}
                    onChange={(e) => setNewProduct({...newProduct, color: e.target.value})}
                    placeholder="e.g., Space Black"
                  />
                </div>
                <div>
                  <Label htmlFor="storage">Storage</Label>
                  <Input
                    id="storage"
                    value={newProduct.storage}
                    onChange={(e) => setNewProduct({...newProduct, storage: e.target.value})}
                    placeholder="e.g., 256GB"
                  />
                </div>
                <div>
                  <Label htmlFor="warranty">Warranty</Label>
                  <Input
                    id="warranty"
                    value={newProduct.warranty}
                    onChange={(e) => setNewProduct({...newProduct, warranty: e.target.value})}
                    placeholder="e.g., 12 months"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Product description..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="features">Key Features (comma separated)</Label>
                <Textarea
                  id="features"
                  value={newProduct.features}
                  onChange={(e) => setNewProduct({...newProduct, features: e.target.value})}
                  placeholder="Feature 1, Feature 2, Feature 3..."
                  rows={2}
                />
              </div>

              <Button onClick={handleAddProduct} className="w-full">
                Add Product to Inventory
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
                <p className="text-xs text-gray-500">In catalog</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Products</p>
                <p className="text-2xl font-bold text-green-600">{activeProducts}</p>
                <p className="text-xs text-gray-500">Available for sale</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStock}</p>
                <p className="text-xs text-gray-500">Need restocking</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Inventory Value</p>
                <p className="text-2xl font-bold">₦{totalValue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Current stock value</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-orange-600">{totalSales}</p>
                <p className="text-xs text-gray-500">Units sold</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products, brands, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="smartphones">Smartphones</SelectItem>
                <SelectItem value="laptops">Laptops</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                <SelectItem value="discontinued">Discontinued</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Pricing</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Performance</TableHead>
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
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.brand} • {product.color}</p>
                        <p className="text-xs text-gray-400">ID: {product.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold">₦{product.price.toLocaleString()}</p>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <p className="text-sm text-gray-500 line-through">₦{product.originalPrice.toLocaleString()}</p>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {product.condition}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Badge variant={getStockColor(product.stock)}>
                        {product.stock} units
                      </Badge>
                      <div className="mt-1">
                        <Input
                          type="number"
                          value={product.stock}
                          onChange={(e) => handleUpdateStock(product.id, parseInt(e.target.value))}
                          className="w-20 h-6 text-xs"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>Sales: <span className="font-medium">{product.sales_count || 0}</span></p>
                      <p>Views: <span className="font-medium">{product.views || 0}</span></p>
                      <p className="text-xs text-gray-500">Added: {product.date_added}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Select onValueChange={(value) => handleUpdateStatus(product.id, value)}>
                      <SelectTrigger className="w-32">
                        <Badge variant={getStatusColor(product.status)}>
                          {product.status.replace('_', ' ')}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                        <SelectItem value="discontinued">Discontinued</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
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
