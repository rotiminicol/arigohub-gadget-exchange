
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
  Search, 
  Plus,
  Eye, 
  Edit,
  Trash2,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Upload,
  X
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
    description: '',
    stock: '',
    condition: 'new',
    brand: '',
    model: '',
    storage: '',
    color: '',
    batteryHealth: '',
    warranty: ''
  });
  const [productImages, setProductImages] = useState<File[]>([]);

  // Mock products data matching client portal structure
  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB Natural Titanium',
      category: 'smartphones',
      brand: 'Apple',
      model: 'iPhone 15 Pro Max',
      price: 450000,
      originalPrice: 500000,
      stock: 15,
      status: 'active',
      condition: 'new',
      description: 'Latest iPhone with titanium build and A17 Pro chip',
      storage: '256GB',
      color: 'Natural Titanium',
      batteryHealth: '100%',
      warranty: '1 Year Apple Warranty',
      images: ['/placeholder.svg'],
      rating: 4.9,
      reviews: 156,
      sold: 45,
      created_at: '2024-01-15',
      updated_at: '2024-01-20'
    },
    {
      id: 2,
      name: 'MacBook Air M2 13" 256GB Space Gray',
      category: 'laptops',
      brand: 'Apple',
      model: 'MacBook Air M2',
      price: 750000,
      originalPrice: 800000,
      stock: 8,
      status: 'active',
      condition: 'like-new',
      description: 'Lightweight laptop with M2 chip and 18-hour battery',
      storage: '256GB SSD',
      color: 'Space Gray',
      batteryHealth: '95%',
      warranty: '6 Months',
      images: ['/placeholder.svg'],
      rating: 4.8,
      reviews: 89,
      sold: 23,
      created_at: '2024-01-10',
      updated_at: '2024-01-18'
    },
    {
      id: 3,
      name: 'PlayStation 5 Digital Edition',
      category: 'gaming',
      brand: 'Sony',
      model: 'PS5 Digital',
      price: 320000,
      originalPrice: 350000,
      stock: 5,
      status: 'low_stock',
      condition: 'good',
      description: 'Next-gen gaming console with 4K gaming',
      storage: '825GB SSD',
      color: 'White',
      warranty: '3 Months',
      images: ['/placeholder.svg'],
      rating: 4.7,
      reviews: 234,
      sold: 67,
      created_at: '2024-01-05',
      updated_at: '2024-01-16'
    }
  ];

  const categories = [
    { value: 'smartphones', label: 'Smartphones' },
    { value: 'laptops', label: 'Laptops' },
    { value: 'tablets', label: 'Tablets' },
    { value: 'gaming', label: 'Gaming Consoles' },
    { value: 'audio', label: 'Audio Devices' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'low_stock': return 'secondary';
      case 'out_of_stock': return 'destructive';
      case 'inactive': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'low_stock': return <AlertTriangle className="w-4 h-4" />;
      case 'out_of_stock': return <X className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setProductImages(prev => [...prev, ...files].slice(0, 6));
  };

  const removeImage = (index: number) => {
    setProductImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would integrate with Xano API
    console.log('Adding product:', { ...newProduct, images: productImages });
    
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added successfully.`,
    });

    setIsAddDialogOpen(false);
    setNewProduct({
      name: '',
      category: '',
      price: '',
      description: '',
      stock: '',
      condition: 'new',
      brand: '',
      model: '',
      storage: '',
      color: '',
      batteryHealth: '',
      warranty: ''
    });
    setProductImages([]);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const lowStockProducts = products.filter(p => p.status === 'low_stock').length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

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
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[600px] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({...prev, name: e.target.value}))}
                    placeholder="e.g., iPhone 15 Pro Max 256GB"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₦) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct(prev => ({...prev, price: e.target.value}))}
                    placeholder="450000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct(prev => ({...prev, category: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct(prev => ({...prev, stock: e.target.value}))}
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct(prev => ({...prev, brand: e.target.value}))}
                    placeholder="Apple, Samsung, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    value={newProduct.model}
                    onChange={(e) => setNewProduct(prev => ({...prev, model: e.target.value}))}
                    placeholder="iPhone 15 Pro Max"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="condition">Condition</Label>
                  <Select value={newProduct.condition} onValueChange={(value) => setNewProduct(prev => ({...prev, condition: value}))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="like-new">Like New</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="storage">Storage</Label>
                  <Input
                    id="storage"
                    value={newProduct.storage}
                    onChange={(e) => setNewProduct(prev => ({...prev, storage: e.target.value}))}
                    placeholder="256GB"
                  />
                </div>
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    value={newProduct.color}
                    onChange={(e) => setNewProduct(prev => ({...prev, color: e.target.value}))}
                    placeholder="Space Gray"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="batteryHealth">Battery Health</Label>
                  <Input
                    id="batteryHealth"
                    value={newProduct.batteryHealth}
                    onChange={(e) => setNewProduct(prev => ({...prev, batteryHealth: e.target.value}))}
                    placeholder="95%"
                  />
                </div>
                <div>
                  <Label htmlFor="warranty">Warranty</Label>
                  <Input
                    id="warranty"
                    value={newProduct.warranty}
                    onChange={(e) => setNewProduct(prev => ({...prev, warranty: e.target.value}))}
                    placeholder="1 Year Apple Warranty"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct(prev => ({...prev, description: e.target.value}))}
                  placeholder="Detailed product description..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Product Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload product images (Max 6)</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="product-images"
                  />
                  <Button type="button" variant="outline" size="sm" asChild>
                    <label htmlFor="product-images" className="cursor-pointer">
                      Choose Images
                    </label>
                  </Button>
                </div>

                {productImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {productImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Product ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button onClick={handleAddProduct} className="w-full">
                Add Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
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
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStockProducts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-purple-600">₦{totalValue.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
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
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="low_stock">Low Stock</SelectItem>
                <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
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
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img 
                        src={product.images[0]} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.brand} {product.model}</p>
                        <p className="text-xs text-gray-400">ID: {product.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {product.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold">₦{product.price.toLocaleString()}</p>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <p className="text-sm text-gray-500 line-through">₦{product.originalPrice.toLocaleString()}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.stock} units</p>
                      <p className="text-sm text-gray-500">{product.sold} sold</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(product.status)} className="flex items-center space-x-1 w-fit">
                      {getStatusIcon(product.status)}
                      <span className="capitalize">{product.status.replace('_', ' ')}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">⭐ {product.rating} ({product.reviews})</p>
                      <p className="text-sm text-gray-500">{product.sold} sales</p>
                    </div>
                  </TableCell>
                  <TableCell>{product.updated_at}</TableCell>
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
