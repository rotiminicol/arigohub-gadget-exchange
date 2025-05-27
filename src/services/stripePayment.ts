
import { stripeApi } from './xanoApi';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface CheckoutData {
  items: CartItem[];
  customerEmail?: string;
  customerName?: string;
  shippingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export const createStripeCheckout = async (data: CheckoutData) => {
  try {
    const products = data.items.map(item => ({
      id: item.id,
      quantity: item.quantity
    }));

    const checkoutData = {
      products,
      customer_email: data.customerEmail,
      success_url: `${window.location.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${window.location.origin}/checkout/cancel`,
    };

    const response = await stripeApi.createCheckoutSession(checkoutData);
    
    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  } catch (error) {
    console.error('Stripe checkout error:', error);
    throw error;
  }
};

export const confirmStripePayment = async (sessionId: string) => {
  try {
    const response = await stripeApi.confirmPayment(sessionId);
    return response;
  } catch (error) {
    console.error('Payment confirmation error:', error);
    throw error;
  }
};

export const redirectToStripe = (checkoutUrl: string) => {
  // Open Stripe checkout in a new tab
  window.open(checkoutUrl, '_blank');
};
