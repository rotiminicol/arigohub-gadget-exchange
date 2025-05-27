
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Save, Plus, Trash2 } from 'lucide-react';

const AdminSettings = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'ArigoHub',
    email: 'contact@arigohub.com',
    phone: '+234 123 456 7890',
    address: 'Lagos, Nigeria',
    description: 'Leading electronics and gadgets marketplace'
  });

  const [categories, setCategories] = useState([
    'Smartphones',
    'Laptops',
    'Gaming Consoles',
    'Tablets',
    'Accessories',
    'Smart Watches'
  ]);

  const [newCategory, setNewCategory] = useState('');

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailSwaps: true,
    emailSells: true,
    smsOrders: false,
    pushNotifications: true
  });

  const handleCompanyInfoChange = (field: string, value: string) => {
    setCompanyInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      setCategories(prev => [...prev, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const removeCategory = (index: number) => {
    setCategories(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    console.log('Saving settings:', { companyInfo, categories, notifications });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="space-y-8">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={companyInfo.name}
                  onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="companyEmail">Email</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={companyInfo.email}
                  onChange={(e) => handleCompanyInfoChange('email', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="companyPhone">Phone</Label>
                <Input
                  id="companyPhone"
                  value={companyInfo.phone}
                  onChange={(e) => handleCompanyInfoChange('phone', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="companyAddress">Address</Label>
                <Input
                  id="companyAddress"
                  value={companyInfo.address}
                  onChange={(e) => handleCompanyInfoChange('address', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="companyDescription">Description</Label>
              <Textarea
                id="companyDescription"
                value={companyInfo.description}
                onChange={(e) => handleCompanyInfoChange('description', e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories Management */}
        <Card>
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Add new category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCategory()}
                />
                <Button onClick={addCategory}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                    <span>{category}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeCategory(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email notifications for new orders</Label>
                  <p className="text-sm text-gray-500">Receive email when new orders are placed</p>
                </div>
                <Switch
                  checked={notifications.emailOrders}
                  onCheckedChange={(checked) => handleNotificationChange('emailOrders', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email notifications for swap requests</Label>
                  <p className="text-sm text-gray-500">Receive email when new swap requests are submitted</p>
                </div>
                <Switch
                  checked={notifications.emailSwaps}
                  onCheckedChange={(checked) => handleNotificationChange('emailSwaps', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email notifications for sell requests</Label>
                  <p className="text-sm text-gray-500">Receive email when new sell requests are submitted</p>
                </div>
                <Switch
                  checked={notifications.emailSells}
                  onCheckedChange={(checked) => handleNotificationChange('emailSells', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>SMS notifications for orders</Label>
                  <p className="text-sm text-gray-500">Receive SMS alerts for urgent order updates</p>
                </div>
                <Switch
                  checked={notifications.smsOrders}
                  onCheckedChange={(checked) => handleNotificationChange('smsOrders', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Push notifications</Label>
                  <p className="text-sm text-gray-500">Enable browser push notifications</p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
