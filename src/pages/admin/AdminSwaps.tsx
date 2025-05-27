
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Eye, 
  Check, 
  X,
  MessageCircle
} from 'lucide-react';

const AdminSwaps = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const swapRequests = [
    {
      id: 'SWAP-001',
      user: 'John Doe',
      email: 'john@example.com',
      itemOffered: 'iPhone 14 Pro 128GB',
      itemWanted: 'MacBook Air M2',
      status: 'pending',
      date: '2024-01-10',
      condition: 'Good'
    },
    {
      id: 'SWAP-002',
      user: 'Jane Smith',
      email: 'jane@example.com',
      itemOffered: 'PlayStation 5',
      itemWanted: 'Xbox Series X',
      status: 'approved',
      date: '2024-01-09',
      condition: 'Like New'
    },
    {
      id: 'SWAP-003',
      user: 'Bob Johnson',
      email: 'bob@example.com',
      itemOffered: 'iPad Pro 11"',
      itemWanted: 'Surface Pro 9',
      status: 'rejected',
      date: '2024-01-08',
      condition: 'Fair'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'approved': return 'default';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleApprove = (id: string) => {
    console.log('Approving swap:', id);
  };

  const handleReject = (id: string) => {
    console.log('Rejecting swap:', id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Swap Requests</h1>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search swap requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Swap Requests */}
      <Card>
        <CardHeader>
          <CardTitle>All Swap Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {swapRequests.map((request) => (
              <div key={request.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{request.id}</h3>
                      <Badge variant={getStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{request.user}</p>
                    <p className="text-sm text-gray-500">{request.email}</p>
                    <p className="text-sm text-gray-500">{request.date}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">Offering</h4>
                    <p className="text-sm text-gray-700">{request.itemOffered}</p>
                    <p className="text-xs text-gray-500">Condition: {request.condition}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-1">Looking For</h4>
                    <p className="text-sm text-gray-700">{request.itemWanted}</p>
                  </div>
                </div>

                {request.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleApprove(request.id)}
                      className="flex items-center space-x-1"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve</span>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleReject(request.id)}
                      className="flex items-center space-x-1"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject</span>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSwaps;
