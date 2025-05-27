
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const CheckoutCancel = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600">Your payment was cancelled. No charges were made to your account.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What happened?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Your payment was cancelled before completion. This could happen if:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              <li>You clicked the back button during payment</li>
              <li>You closed the payment window</li>
              <li>There was a connection issue</li>
              <li>You chose to cancel the payment</li>
            </ul>
            <p className="text-gray-600">
              Don't worry - no charges were made to your payment method. Your items are still in your cart if you'd like to try again.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/cart">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Return to Cart
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel;
