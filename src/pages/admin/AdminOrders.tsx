
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Eye, 
  Edit,
  Package,
  Truck,
  CheckCircle
} from 'lucide-react';

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const orders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: 450000,
      status: 'pending',
      date: '2024-01-10',
      items: 2
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      amount: 750000,
      status: 'shipped',
      date: '2024-01-09',
      items: 1
    },
    {
      id: 'ORD-003',
      customer: 'Bob Johnson',
      email: 'bob@example.com',
      amount: 320000,
      status: 'delivered',
      date: '2024-01-08',
      items: 1
    },
    {
      id: 'ORD-004',
      customer: 'Alice Brown',
      email: 'alice@example.com',
      amount: 180000,
      status: 'processing',
      date: '2024-01-07',
      items: 3
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'processing': return 'default';
      case 'shipped': return 'default';
      case 'delivered': return 'default';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Package className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Orders Management</h1>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{order.id}</h3>
                    <Badge variant={getStatusColor(order.status)} className="flex items-center space-x-1">
                      {getStatusIcon(order.status)}
                      <span>{order.status}</span>
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-sm text-gray-500">{order.email}</p>
                  <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">₦{order.amount.toLocaleString()}</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4" />
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

export default AdminOrders;
