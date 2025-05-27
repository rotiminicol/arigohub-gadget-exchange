
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Truck, CheckCircle, Clock } from 'lucide-react';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState<any>(null);

  const handleTrackOrder = async () => {
    // Mock order data - this would come from Xano API
    setOrderData({
      id: orderId,
      status: 'shipped',
      estimatedDelivery: '2024-01-15',
      items: [
        { name: 'iPhone 15 Pro Max 256GB', quantity: 1, price: 450000 }
      ],
      timeline: [
        { status: 'received', date: '2024-01-10', completed: true },
        { status: 'processing', date: '2024-01-11', completed: true },
        { status: 'shipped', date: '2024-01-12', completed: true },
        { status: 'delivered', date: '2024-01-15', completed: false }
      ]
    });
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    const iconClass = completed ? 'text-green-500' : 'text-gray-400';
    
    switch (status) {
      case 'received':
        return <CheckCircle className={`w-6 h-6 ${iconClass}`} />;
      case 'processing':
        return <Clock className={`w-6 h-6 ${iconClass}`} />;
      case 'shipped':
        return <Truck className={`w-6 h-6 ${iconClass}`} />;
      case 'delivered':
        return <Package className={`w-6 h-6 ${iconClass}`} />;
      default:
        return <Clock className={`w-6 h-6 ${iconClass}`} />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      received: 'secondary',
      processing: 'default',
      shipped: 'default',
      delivered: 'default'
    };
    
    return (
      <Badge variant={variants[status] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Your Order</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Enter Order ID</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="orderId">Order ID</Label>
              <Input
                id="orderId"
                placeholder="Enter your order ID (e.g., ORD-12345)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <Button onClick={handleTrackOrder} className="mt-6">
              <Search className="w-4 h-4 mr-2" />
              Track Order
            </Button>
          </div>
        </CardContent>
      </Card>

      {orderData && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Order #{orderData.id}
                {getStatusBadge(orderData.status)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Estimated Delivery: <span className="font-semibold">{orderData.estimatedDelivery}</span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {orderData.timeline.map((step: any, index: number) => (
                  <div key={step.status} className="flex items-center space-x-4">
                    {getStatusIcon(step.status, step.completed)}
                    <div className="flex-1">
                      <p className={`font-medium ${step.completed ? 'text-green-700' : 'text-gray-400'}`}>
                        {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                      </p>
                      <p className="text-sm text-gray-500">{step.date}</p>
                    </div>
                    {step.completed && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <span className="font-semibold">₦{item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
