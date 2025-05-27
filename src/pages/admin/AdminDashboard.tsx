
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  Users, 
  Package, 
  TrendingUp,
  Eye,
  Edit
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Orders',
      value: '156',
      change: '+12%',
      icon: ShoppingBag,
      color: 'text-blue-600'
    },
    {
      title: 'Revenue',
      value: '₦2,450,000',
      change: '+8%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Active Products',
      value: '89',
      change: '+5%',
      icon: Package,
      color: 'text-purple-600'
    },
    {
      title: 'Users',
      value: '1,234',
      change: '+15%',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', amount: 450000, status: 'pending' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: 750000, status: 'shipped' },
    { id: 'ORD-003', customer: 'Bob Johnson', amount: 320000, status: 'delivered' },
    { id: 'ORD-004', customer: 'Alice Brown', amount: 180000, status: 'processing' }
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₦{order.amount.toLocaleString()}</p>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
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
              <TrendingUp className="w-4 h-4 mr-2" />
              View Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
