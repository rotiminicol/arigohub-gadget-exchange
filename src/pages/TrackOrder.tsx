
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Package, Truck, CheckCircle, Clock, Loader2 } from 'lucide-react';
import { ordersApi } from '@/services/xanoApi';
import { useToast } from '@/hooks/use-toast';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTrackOrder = async () => {
    if (!orderId.trim()) {
      toast({
        title: "Error",
        description: "Please enter an order ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Search for order by payment_id or id
      const orders = await ordersApi.getAll();
      const order = orders.find((o: any) => 
        o.id.toString() === orderId || 
        o.payment_id === orderId ||
        o.payment_id?.includes(orderId)
      );

      if (order) {
        // Create timeline based on order status
        const timeline = [
          { status: 'received', date: new Date(order.created_at).toLocaleDateString(), completed: true },
          { status: 'processing', date: order.status !== 'pending' ? new Date(order.created_at).toLocaleDateString() : '', completed: order.status !== 'pending' },
          { status: 'shipped', date: order.status === 'shipped' || order.status === 'delivered' ? new Date(order.updated_at || order.created_at).toLocaleDateString() : '', completed: order.status === 'shipped' || order.status === 'delivered' },
          { status: 'delivered', date: order.status === 'delivered' ? new Date(order.updated_at || order.created_at).toLocaleDateString() : '', completed: order.status === 'delivered' }
        ];

        setOrderData({
          ...order,
          timeline,
          estimatedDelivery: order.status === 'delivered' ? 'Delivered' : '3-5 business days'
        });
      } else {
        toast({
          title: "Order not found",
          description: "No order found with that ID. Please check and try again.",
          variant: "destructive",
        });
        setOrderData(null);
      }
    } catch (error) {
      console.error('Track order error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch order details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
      pending: 'secondary',
      paid: 'default',
      processing: 'default',
      shipped: 'default',
      delivered: 'default',
      cancelled: 'destructive'
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
              <Label htmlFor="orderId">Order ID or Payment ID</Label>
              <Input
                id="orderId"
                placeholder="Enter your order ID (e.g., 12345 or cs_test_...)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <Button onClick={handleTrackOrder} className="mt-6" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Search className="w-4 h-4 mr-2" />
              )}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Customer:</span> {orderData.customer_name}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Email:</span> {orderData.customer_email}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Phone:</span> {orderData.customer_phone || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Payment Method:</span> {orderData.payment_method === 'card' ? 'Credit/Debit Card' : 'Bank Transfer'}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Total Amount:</span> ₦{orderData.total_amount?.toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Estimated Delivery:</span> {orderData.estimatedDelivery}
                  </p>
                </div>
              </div>
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
                      <p className="text-sm text-gray-500">{step.date || 'Pending'}</p>
                    </div>
                    {step.completed && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {orderData.items && orderData.items.length > 0 && (
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
                      <span className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {orderData.shipping_address && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{orderData.shipping_address}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
