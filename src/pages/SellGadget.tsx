
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';

const SellGadget = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    condition: '',
    price: '',
    description: '',
    contactInfo: '',
    location: ''
  });
  const [images, setImages] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages(prev => [...prev, ...files].slice(0, 5)); // Max 5 images
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send data to Xano API
    console.log('Sell request submitted:', { formData, images });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Your Gadget</h1>
        <p className="text-gray-600 mb-8">
          List your gadget for sale on ArigoHub. Fill out the details below and we'll review your listing.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="itemName">Product Name</Label>
                <Input
                  id="itemName"
                  placeholder="e.g., iPhone 15 Pro Max 256GB Space Black"
                  value={formData.itemName}
                  onChange={(e) => handleInputChange('itemName', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smartphones">Smartphones</SelectItem>
                    <SelectItem value="laptops">Laptops</SelectItem>
                    <SelectItem value="tablets">Tablets</SelectItem>
                    <SelectItem value="gaming">Gaming Consoles</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="smartwatches">Smart Watches</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="condition">Condition</Label>
                <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Asking Price (₦)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 450000"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item's condition, features, any included accessories, reason for selling, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Upload clear images of your product</p>
                  <p className="text-sm text-gray-500 mb-4">Maximum 5 images, up to 10MB each</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button type="button" variant="outline" asChild>
                    <label htmlFor="image-upload" className="cursor-pointer">
                      Choose Files
                    </label>
                  </Button>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact & Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactInfo">Contact Information</Label>
                <Input
                  id="contactInfo"
                  placeholder="Your email or phone number"
                  value={formData.contactInfo}
                  onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, State (e.g., Lagos, Nigeria)"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full">
            Submit for Review
          </Button>

          <div className="text-sm text-gray-500 text-center">
            <p>Your listing will be reviewed by our team and published within 24 hours if approved.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellGadget;
