
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Eye, Download, CreditCard, DollarSign, TrendingUp, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminTransactions = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const transactions = [
    {
      id: 'TXN-001',
      order_id: 'ORD-001',
      customer: 'John Doe',
      customer_email: 'john@example.com',
      customer_phone: '+234 801 234 5678',
      amount: 450000,
      payment_method: 'stripe',
      payment_intent_id: 'pi_3OKJ8k2eZvKYlo2C0vp2S1',
      status: 'completed',
      date: '2024-01-20 14:30',
      stripe_session_id: 'cs_test_123456',
      fees: 13500,
      net_amount: 436500,
      currency: 'NGN',
      products: [
        { name: 'iPhone 15 Pro Max 256GB', quantity: 1, price: 450000 }
      ],
      shipping_address: '123 Lagos Street, Victoria Island, Lagos',
      confirmed_at: '2024-01-20 14:35',
      settled_at: '2024-01-21 09:00'
    },
    {
      id: 'TXN-002',
      order_id: 'ORD-002',
      customer: 'Jane Smith',
      customer_email: 'jane@example.com',
      customer_phone: '+234 802 345 6789',
      amount: 750000,
      payment_method: 'bank_transfer',
      reference: 'BT-789012',
      status: 'pending_verification',
      date: '2024-01-19 16:45',
      fees: 0,
      net_amount: 750000,
      currency: 'NGN',
      products: [
        { name: 'MacBook Air M2 13"', quantity: 1, price: 750000 }
      ],
      shipping_address: '456 Abuja Close, Wuse 2, Abuja',
      bank_details: 'Kuda Bank - 45456464646 - ArigoHub',
      proof_of_payment: 'receipt_xyz123.jpg'
    },
    {
      id: 'TXN-003',
      order_id: 'ORD-003',
      customer: 'Bob Johnson',
      customer_email: 'bob@example.com',
      customer_phone: '+234 803 456 7890',
      amount: 320000,
      payment_method: 'stripe',
      payment_intent_id: 'pi_3OKJ8k2eZvKYlo2C0vp2S2',
      status: 'failed',
      date: '2024-01-18 10:15',
      stripe_session_id: 'cs_test_345678',
      fees: 0,
      net_amount: 0,
      currency: 'NGN',
      failure_reason: 'Insufficient funds',
      products: [
        { name: 'PlayStation 5 Digital', quantity: 1, price: 320000 }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending_verification': return 'secondary';
      case 'processing': return 'default';
      case 'failed': return 'destructive';
      case 'refunded': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'pending_verification': return <RefreshCw className="w-4 h-4" />;
      case 'processing': return <RefreshCw className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <RefreshCw className="w-4 h-4" />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'stripe': return <CreditCard className="w-4 h-4" />;
      case 'bank_transfer': return <DollarSign className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const handleUpdateStatus = (transactionId: string, newStatus: string) => {
    console.log(`Updating transaction ${transactionId} to ${newStatus}`);
    toast({
      title: "Transaction Updated",
      description: `Transaction ${transactionId} status updated to ${newStatus}`,
    });
  };

  const handleVerifyPayment = (transactionId: string) => {
    console.log(`Verifying payment for transaction ${transactionId}`);
    toast({
      title: "Payment Verified",
      description: `Payment for transaction ${transactionId} has been verified`,
    });
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.order_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.customer_email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);
  const totalFees = transactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.fees, 0);
  const netRevenue = totalRevenue - totalFees;
  const pendingAmount = transactions.filter(t => t.status === 'pending_verification').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Transaction Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Payments
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">₦{totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Confirmed payments</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processing Fees</p>
                <p className="text-2xl font-bold text-red-600">₦{totalFees.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Stripe + Bank fees</p>
              </div>
              <CreditCard className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Net Revenue</p>
                <p className="text-2xl font-bold text-blue-600">₦{netRevenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">After all fees</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Verification</p>
                <p className="text-2xl font-bold text-yellow-600">₦{pendingAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Awaiting confirmation</p>
              </div>
              <RefreshCw className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed Transactions</p>
                <p className="text-2xl font-bold text-red-600">{transactions.filter(t => t.status === 'failed').length}</p>
                <p className="text-xs text-gray-500">Needs attention</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search transactions, customers, orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending_verification">Pending Verification</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction Details ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{transaction.id}</p>
                      <p className="text-sm text-gray-500">{transaction.order_id}</p>
                      {transaction.stripe_session_id && (
                        <p className="text-xs text-gray-400">{transaction.stripe_session_id}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{transaction.customer}</p>
                      <p className="text-sm text-gray-500">{transaction.customer_email}</p>
                      {transaction.customer_phone && (
                        <p className="text-sm text-gray-500">{transaction.customer_phone}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {transaction.products?.map((product, index) => (
                        <div key={index} className="text-sm">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-gray-500">Qty: {product.quantity} × ₦{product.price.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getPaymentMethodIcon(transaction.payment_method)}
                      <div>
                        <p className="text-sm font-medium capitalize">{transaction.payment_method.replace('_', ' ')}</p>
                        {transaction.payment_intent_id && (
                          <p className="text-xs text-gray-500">{transaction.payment_intent_id}</p>
                        )}
                        {transaction.reference && (
                          <p className="text-xs text-gray-500">Ref: {transaction.reference}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold">₦{transaction.amount.toLocaleString()}</p>
                      {transaction.fees > 0 && (
                        <p className="text-xs text-red-500">Fee: ₦{transaction.fees.toLocaleString()}</p>
                      )}
                      <p className="text-xs text-green-600">Net: ₦{transaction.net_amount.toLocaleString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getStatusColor(transaction.status)} className="flex items-center space-x-1">
                        {getStatusIcon(transaction.status)}
                        <span className="capitalize">{transaction.status.replace('_', ' ')}</span>
                      </Badge>
                    </div>
                    {transaction.failure_reason && (
                      <p className="text-xs text-red-500 mt-1">{transaction.failure_reason}</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{transaction.date}</p>
                      {transaction.confirmed_at && (
                        <p className="text-xs text-green-600">Confirmed: {transaction.confirmed_at}</p>
                      )}
                      {transaction.settled_at && (
                        <p className="text-xs text-blue-600">Settled: {transaction.settled_at}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      
                      {transaction.status === 'pending_verification' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleVerifyPayment(transaction.id)}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      
                      <Select onValueChange={(value) => handleUpdateStatus(transaction.id, value)}>
                        <SelectTrigger className="w-20 h-8">
                          <RefreshCw className="w-3 h-3" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="completed">Complete</SelectItem>
                          <SelectItem value="failed">Mark Failed</SelectItem>
                          <SelectItem value="refunded">Refund</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTransactions;
