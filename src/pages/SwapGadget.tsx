
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';

const SwapGadget = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    condition: '',
    description: '',
    desiredItem: '',
    contactInfo: ''
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
    console.log('Swap request submitted:', { formData, images });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Swap Your Gadget</h1>
        <p className="text-gray-600 mb-8">
          Want to exchange your gadget for something else? Fill out the form below and we'll help you find a suitable swap partner.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Item Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  placeholder="e.g., iPhone 14 Pro 128GB"
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item's condition, any accessories included, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Upload images of your item</p>
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
              <CardTitle>What Are You Looking For?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="desiredItem">Desired Item</Label>
                <Input
                  id="desiredItem"
                  placeholder="e.g., MacBook Air M2, PS5, etc."
                  value={formData.desiredItem}
                  onChange={(e) => handleInputChange('desiredItem', e.target.value)}
                  required
                />
              </div>

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
            </CardContent>
          </Card>

          <Button type="submit" className="w-full">
            Submit Swap Request
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SwapGadget;
