
// Xano API Configuration
const XANO_AUTH_ENDPOINT = 'https://x8ki-letl-twmt.n7.xano.io/api:ogDh5202';
const XANO_ECOMMERCE_ENDPOINT = 'https://x8ki-letl-twmt.n7.xano.io/api:Yjplazxv';

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${XANO_AUTH_ENDPOINT}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  register: async (email: string, password: string, name: string, phone?: string) => {
    const response = await fetch(`${XANO_AUTH_ENDPOINT}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name, phone }),
    });
    return response.json();
  },

  sendOTP: async (phone: string) => {
    const response = await fetch(`${XANO_AUTH_ENDPOINT}/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone }),
    });
    return response.json();
  },

  verifyOTP: async (phone: string, otp: string) => {
    const response = await fetch(`${XANO_AUTH_ENDPOINT}/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, otp }),
    });
    return response.json();
  },
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token') || localStorage.getItem('user_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// Categories API
export const categoriesApi = {
  getAll: async () => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/category`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/category/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  create: async (data: { name: string; description?: string; image_url?: string }) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/category`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: number, data: { name?: string; description?: string; image_url?: string }) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/category/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/category/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// Products API
export const productsApi = {
  getAll: async (params?: { category_id?: number; search?: string; page?: number; per_page?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.category_id) searchParams.append('category_id', params.category_id.toString());
    if (params?.search) searchParams.append('search', params.search);
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());

    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/product?${searchParams}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/product/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  create: async (data: any) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/product`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: number, data: any) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/product/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/product/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// Orders API
export const ordersApi = {
  getAll: async (params?: { status?: string; user_id?: number; page?: number; per_page?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.append('status', params.status);
    if (params?.user_id) searchParams.append('user_id', params.user_id.toString());
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());

    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/order?${searchParams}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/order/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  create: async (data: any) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/order`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: number, data: any) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/order/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/order/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// Swap Requests API
export const swapRequestsApi = {
  getAll: async () => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/swap_request`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/swap_request/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  create: async (data: any) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/swap_request`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: number, data: any) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/swap_request/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/swap_request/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// Sell Requests API
export const sellRequestsApi = {
  getAll: async () => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/sell_request`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/sell_request/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  create: async (data: any) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/sell_request`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id: number, data: any) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/sell_request/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id: number) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/sell_request/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// Stripe Payment API
export const stripeApi = {
  createCheckoutSession: async (data: {
    products: Array<{ id: number; quantity: number }>;
    customer_email?: string;
    success_url: string;
    cancel_url: string;
  }) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/stripe/create-checkout`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },

  confirmPayment: async (session_id: string) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/stripe/confirm-payment`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ session_id }),
    });
    return response.json();
  },
};

// Contact Form API
export const contactApi = {
  submit: async (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const response = await fetch(`${XANO_ECOMMERCE_ENDPOINT}/contact`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return response.json();
  },
};
