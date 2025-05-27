
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, ShoppingBag, Users, Package } from 'lucide-react';

const AdminReports = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '₦2,450,000',
      change: '+12%',
      period: 'This Month'
    },
    {
      title: 'Orders Completed',
      value: '156',
      change: '+8%',
      period: 'This Month'
    },
    {
      title: 'New Customers',
      value: '89',
      change: '+15%',
      period: 'This Month'
    },
    {
      title: 'Products Sold',
      value: '234',
      change: '+5%',
      period: 'This Month'
    }
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro Max', sales: 45, revenue: 20250000 },
    { name: 'MacBook Air M2', sales: 32, revenue: 24000000 },
    { name: 'PlayStation 5', sales: 28, revenue: 8960000 },
    { name: 'iPad Pro 11"', sales: 23, revenue: 11500000 }
  ];

  const recentActivity = [
    { type: 'order', description: 'New order #ORD-156', time: '2 minutes ago' },
    { type: 'user', description: 'New user registration', time: '5 minutes ago' },
    { type: 'product', description: 'Product added to inventory', time: '10 minutes ago' },
    { type: 'swap', description: 'New swap request received', time: '15 minutes ago' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingBag className="w-4 h-4 text-blue-500" />;
      case 'user': return <Users className="w-4 h-4 text-green-500" />;
      case 'product': return <Package className="w-4 h-4 text-purple-500" />;
      default: return <TrendingUp className="w-4 h-4 text-orange-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-4">
          <Select defaultValue="30days">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} from last month</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} units sold</p>
                    </div>
                  </div>
                  <p className="font-semibold">₦{product.revenue.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
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

export default AdminReports;
