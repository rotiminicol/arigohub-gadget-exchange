
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  Users, 
  Package, 
  TrendingUp,
  Eye,
  Edit,
  Repeat,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Orders',
      value: '156',
      change: '+12%',
      icon: ShoppingBag,
      color: 'text-blue-600',
      description: 'This month'
    },
    {
      title: 'Revenue',
      value: '₦2,450,000',
      change: '+8%',
      icon: TrendingUp,
      color: 'text-green-600',
      description: 'Total earnings'
    },
    {
      title: 'Active Products',
      value: '89',
      change: '+5%',
      icon: Package,
      color: 'text-purple-600',
      description: 'In inventory'
    },
    {
      title: 'Users',
      value: '1,234',
      change: '+15%',
      icon: Users,
      color: 'text-orange-600',
      description: 'Registered users'
    },
    {
      title: 'Swap Requests',
      value: '23',
      change: '+3%',
      icon: Repeat,
      color: 'text-cyan-600',
      description: 'Pending swaps'
    },
    {
      title: 'Sell Requests',
      value: '45',
      change: '+7%',
      icon: DollarSign,
      color: 'text-indigo-600',
      description: 'Pending sells'
    }
  ];

  const recentOrders = [
    { 
      id: 'ORD-001', 
      customer: 'John Doe', 
      amount: 450000, 
      status: 'pending',
      product: 'iPhone 15 Pro Max',
      date: '2024-01-20'
    },
    { 
      id: 'ORD-002', 
      customer: 'Jane Smith', 
      amount: 750000, 
      status: 'shipped',
      product: 'MacBook Air M2',
      date: '2024-01-19'
    },
    { 
      id: 'ORD-003', 
      customer: 'Bob Johnson', 
      amount: 320000, 
      status: 'delivered',
      product: 'PlayStation 5',
      date: '2024-01-18'
    },
    { 
      id: 'ORD-004', 
      customer: 'Alice Brown', 
      amount: 180000, 
      status: 'processing',
      product: 'Nintendo Switch OLED',
      date: '2024-01-17'
    }
  ];

  const recentSwaps = [
    {
      id: 'SWAP-001',
      user: 'John Doe',
      offering: 'iPhone 14 Pro',
      wanting: 'MacBook Air M2',
      status: 'pending',
      date: '2024-01-20'
    },
    {
      id: 'SWAP-002',
      user: 'Jane Smith',
      offering: 'PlayStation 5',
      wanting: 'Xbox Series X',
      status: 'approved',
      date: '2024-01-19'
    }
  ];

  const recentSells = [
    {
      id: 'SELL-001',
      user: 'Bob Johnson',
      item: 'iPhone 15 Pro Max',
      price: 450000,
      status: 'pending',
      date: '2024-01-20'
    },
    {
      id: 'SELL-002',
      user: 'Alice Brown',
      item: 'MacBook Air M2',
      price: 750000,
      status: 'approved',
      date: '2024-01-19'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'processing': return 'default';
      case 'shipped': return 'default';
      case 'delivered': return 'default';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'shipped': return <CheckCircle className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your ArigoHub marketplace</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Export Report</Button>
          <Button>Add Product</Button>
        </div>
      </div>
      
      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-green-600">{stat.change}</p>
                    <p className="text-sm text-gray-500">{stat.description}</p>
                  </div>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium">{order.id}</p>
                      <Badge variant={getStatusColor(order.status)} className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.product}</p>
                    <p className="text-xs text-gray-400">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₦{order.amount.toLocaleString()}</p>
                    <div className="flex space-x-1 mt-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start">
              <Package className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ShoppingBag className="w-4 h-4 mr-2" />
              View All Orders
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Repeat className="w-4 h-4 mr-2" />
              Review Swap Requests
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="w-4 h-4 mr-2" />
              Review Sell Requests
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Swap Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Swap Requests</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSwaps.map((swap) => (
                <div key={swap.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{swap.id}</p>
                    <Badge variant={getStatusColor(swap.status)}>
                      {swap.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{swap.user}</p>
                  <div className="text-sm text-gray-500 mt-1">
                    <p>Offering: {swap.offering}</p>
                    <p>Wanting: {swap.wanting}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">{swap.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Sell Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Sell Requests</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSells.map((sell) => (
                <div key={sell.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{sell.id}</p>
                    <Badge variant={getStatusColor(sell.status)}>
                      {sell.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{sell.user}</p>
                  <p className="text-sm text-gray-500">{sell.item}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="font-semibold text-primary">₦{sell.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">{sell.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
