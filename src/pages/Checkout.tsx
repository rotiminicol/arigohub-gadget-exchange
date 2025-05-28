
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Banknote, Loader2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { ordersApi } from '@/services/xanoApi';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const { toast } = useToast();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = getTotalPrice();
  const shipping = cartItems.length > 0 ? 5000 : 0;
  const total = subtotal + shipping;

  const bankDetails = {
    bankName: "Kuda Bank",
    accountNumber: "45456464646",
    accountName: "ArigoHub"
  };

  const handleInputChange = (field: string, value: string) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Account details copied to clipboard",
    });
  };

  const createStripeCheckout = async () => {
    try {
      const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer sk_test_51RTYVMDFLhUcauvGO95FHcJePXbWeWLZE7QTpAUOHfsk3Sr7iq95MviYEi18z4Pbj9yIkMBa1txIbK6QEQmFe1cF00Y5CterOm`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          'success_url': `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
          'cancel_url': `${window.location.origin}/checkout/cancel`,
          'mode': 'payment',
          'customer_email': billingInfo.email,
          'line_items[0][price_data][currency]': 'ngn',
          'line_items[0][price_data][product_data][name]': 'ArigoHub Order',
          'line_items[0][price_data][unit_amount]': (total * 100).toString(),
          'line_items[0][quantity]': '1',
        }),
      });

      const session = await response.json();
      
      if (session.url) {
        // Create order in backend
        await createOrder('stripe', session.id);
        window.open(session.url, '_blank');
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Stripe error:', error);
      toast({
        title: "Error",
        description: "Failed to process Stripe payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const createOrder = async (paymentMethod: string, paymentId?: string) => {
    try {
      const orderData = {
        customer_name: `${billingInfo.firstName} ${billingInfo.lastName}`,
        customer_email: billingInfo.email,
        customer_phone: billingInfo.phone,
        shipping_address: `${billingInfo.address}, ${billingInfo.city}, ${billingInfo.state} ${billingInfo.zipCode}`,
        total_amount: total,
        payment_method: paymentMethod,
        payment_id: paymentId || `${paymentMethod}_${Date.now()}`,
        status: paymentMethod === 'card' ? 'paid' : 'pending',
        items: cartItems
      };

      const response = await ordersApi.create(orderData);
      
      if (response.id) {
        clearCart();
        return response;
      }
    } catch (error) {
      console.error('Order creation error:', error);
      toast({
        title: "Error",
        description: "Failed to create order. Please contact support.",
        variant: "destructive",
      });
    }
  };

  const handleBankTransfer = async () => {
    try {
      const order = await createOrder('bank_transfer');
      if (order) {
        toast({
          title: "Order Created!",
          description: "Please complete the bank transfer using the details provided.",
        });
        navigate('/checkout/success', { state: { order, paymentMethod: 'bank_transfer' } });
      }
    } catch (error) {
      console.error('Bank transfer error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!billingInfo.email || !billingInfo.firstName || !billingInfo.lastName) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is empty",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      if (paymentMethod === 'card') {
        await createStripeCheckout();
      } else {
        setShowBankDetails(true);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  if (showBankDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Bank Transfer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-3">Transfer ₦{total.toLocaleString()} to:</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Bank Name:</span>
                    <div className="flex items-center gap-2">
                      <span>{bankDetails.bankName}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(bankDetails.bankName)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{bankDetails.accountNumber}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(bankDetails.accountNumber)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Account Name:</span>
                    <div className="flex items-center gap-2">
                      <span>{bankDetails.accountName}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(bankDetails.accountName)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p className="mb-2">Please include your email ({billingInfo.email}) as the transfer description.</p>
                <p>After making the transfer, your order will be processed within 1-2 business hours.</p>
              </div>
              
              <div className="flex gap-4">
                <Button onClick={handleBankTransfer} className="flex-1">
                  I've Made the Transfer
                </Button>
                <Button variant="outline" onClick={() => setShowBankDetails(false)}>
                  Back to Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={billingInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={billingInfo.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={billingInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={billingInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={billingInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={billingInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={billingInfo.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="w-5 h-5" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">Credit/Debit Card (Stripe)</Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Banknote className="w-5 h-5" />
                  <Label htmlFor="transfer" className="flex-1 cursor-pointer">Bank Transfer</Label>
                </div>
              </RadioGroup>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  {paymentMethod === 'card' ? 
                    'Secure payment processing powered by Stripe. Your payment information is encrypted and secure.' :
                    'Transfer to our Kuda Bank account. Order will be processed after payment confirmation.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₦{shipping.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>
              <Button 
                className="w-full mt-6" 
                onClick={handleSubmit}
                disabled={isProcessing || cartItems.length === 0}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  paymentMethod === 'card' ? 'Pay with Stripe' : 'Continue with Bank Transfer'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
