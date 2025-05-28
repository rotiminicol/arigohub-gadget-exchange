
import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, ArrowRight, Copy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ordersApi } from '@/services/xanoApi';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [orderData, setOrderData] = useState<any>(location.state?.order || null);
  const [isLoading, setIsLoading] = useState(!location.state?.order);
  const { toast } = useToast();
  
  const sessionId = searchParams.get('session_id');
  const paymentMethod = location.state?.paymentMethod;

  useEffect(() => {
    if (sessionId && !orderData) {
      confirmStripePayment();
    }
  }, [sessionId]);

  const confirmStripePayment = async () => {
    try {
      // Find order by Stripe session ID
      const orders = await ordersApi.getAll();
      const order = orders.find((o: any) => o.payment_id === sessionId);
      
      if (order) {
        // Update order status to paid
        await ordersApi.update(order.id, { status: 'paid' });
        setOrderData({ ...order, status: 'paid' });
        
        toast({
          title: "Payment Successful!",
          description: "Your order has been confirmed and is being processed.",
        });
      } else {
        toast({
          title: "Order Processing",
          description: "Your payment was successful. Order details will be updated shortly.",
        });
      }
    } catch (error) {
      console.error('Payment confirmation error:', error);
      toast({
        title: "Payment Confirmation",
        description: "Payment was successful, but we couldn't confirm the order details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyOrderId = () => {
    if (orderData?.id) {
      navigator.clipboard.writeText(orderData.id.toString());
      toast({
        title: "Copied!",
        description: "Order ID copied to clipboard",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Confirming your payment...</p>
        </div>
      </div>
    );
  }

  const isBankTransfer = paymentMethod === 'bank_transfer' || orderData?.payment_method === 'bank_transfer';

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isBankTransfer ? 'Order Created Successfully!' : 'Payment Successful!'}
          </h1>
          <p className="text-gray-600">
            {isBankTransfer 
              ? 'Your order has been created. Complete the bank transfer to process your order.'
              : 'Thank you for your order. We\'ll send you a confirmation email shortly.'
            }
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Order Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orderData ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Order ID:</span>
                  <div className="flex items-center gap-2">
                    <span>{orderData.id}</span>
                    <Button variant="ghost" size="sm" onClick={copyOrderId}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Customer:</span>
                  <span>{orderData.customer_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email:</span>
                  <span>{orderData.customer_email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Payment Method:</span>
                  <span>{orderData.payment_method === 'card' ? 'Credit/Debit Card' : 'Bank Transfer'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Order Status:</span>
                  <span className={`font-medium ${orderData.status === 'paid' ? 'text-green-600' : 'text-orange-600'}`}>
                    {orderData.status === 'paid' ? 'Paid' : 'Pending Payment'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total Amount:</span>
                  <span className="font-bold">₦{orderData.total_amount?.toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600">Order details are being processed...</p>
              </div>
            )}
          </CardContent>
        </Card>

        {isBankTransfer && orderData?.status === 'pending' && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800">Complete Your Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-orange-700">
                <p className="mb-2">To complete your order, please transfer ₦{orderData.total_amount?.toLocaleString()} to:</p>
                <div className="bg-white p-3 rounded border">
                  <p><strong>Bank:</strong> Kuda Bank</p>
                  <p><strong>Account Number:</strong> 45456464646</p>
                  <p><strong>Account Name:</strong> ArigoHub</p>
                </div>
                <p className="mt-2 text-sm">Use Order ID #{orderData.id} as your transfer reference.</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/track">
              Track Your Order
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
