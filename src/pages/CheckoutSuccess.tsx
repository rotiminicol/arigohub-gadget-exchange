
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { confirmStripePayment } from '@/services/stripePayment';
import { useToast } from '@/hooks/use-toast';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      confirmPayment();
    }
  }, [sessionId]);

  const confirmPayment = async () => {
    try {
      const response = await confirmStripePayment(sessionId!);
      setOrderData(response);
      
      toast({
        title: "Payment Successful!",
        description: "Your order has been confirmed and is being processed.",
      });
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

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Thank you for your order. We'll send you a confirmation email shortly.</p>
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
                <div className="flex justify-between">
                  <span className="font-medium">Order ID:</span>
                  <span>{orderData.order_id || 'Processing...'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Payment Status:</span>
                  <span className="text-green-600 font-medium">Paid</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total Amount:</span>
                  <span className="font-bold">₦{orderData.amount?.toLocaleString() || 'Processing...'}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600">Order details are being processed...</p>
              </div>
            )}
          </CardContent>
        </Card>

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
