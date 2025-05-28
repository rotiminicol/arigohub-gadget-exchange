
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, DollarSign, TrendingUp, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SellGadget = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    condition: '',
    batteryHealth: '',
    storageCapacity: '',
    originalPrice: '',
    askingPrice: '',
    purchaseDate: '',
    description: '',
    contactInfo: '',
    location: '',
    negotiable: false
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [priceAnalysis, setPriceAnalysis] = useState<any>(null);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages(prev => [...prev, ...files].slice(0, 8));
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const analyzePricing = () => {
    if (!formData.originalPrice || !formData.condition) {
      toast({
        title: "Missing Information",
        description: "Please provide original price and condition for analysis.",
        variant: "destructive"
      });
      return;
    }

    const basePrice = parseFloat(formData.originalPrice) || 0;
    const batteryMultiplier = {
      'excellent': 1.0,
      'good': 0.9,
      'fair': 0.75,
      'poor': 0.6
    }[formData.batteryHealth] || 0.85;
    
    const conditionMultiplier = {
      'new': 0.9,
      'like-new': 0.8,
      'good': 0.65,
      'fair': 0.5,
      'poor': 0.3
    }[formData.condition] || 0.6;

    const ageInYears = formData.purchaseDate ? 
      new Date().getFullYear() - new Date(formData.purchaseDate).getFullYear() : 1;
    const ageFactor = Math.max(0.4, 1 - (ageInYears * 0.12));

    const marketValue = basePrice * batteryMultiplier * conditionMultiplier * ageFactor;
    const quickSalePrice = marketValue * 0.85;
    const optimalPrice = marketValue * 1.1;

    const analysis = {
      marketValue: Math.round(marketValue),
      quickSalePrice: Math.round(quickSalePrice),
      optimalPrice: Math.round(optimalPrice),
      depreciationRate: Math.round((1 - (marketValue / basePrice)) * 100),
      conditionImpact: Math.round(conditionMultiplier * 100),
      batteryImpact: Math.round(batteryMultiplier * 100)
    };

    setPriceAnalysis(analysis);
    
    // Auto-suggest optimal price
    if (!formData.askingPrice) {
      handleInputChange('askingPrice', analysis.optimalPrice.toString());
    }

    toast({
      title: "Price Analysis Complete",
      description: `Suggested selling price: ₦${analysis.optimalPrice.toLocaleString()}`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!priceAnalysis) {
      toast({
        title: "Price Analysis Required",
        description: "Please analyze pricing before submitting your listing.",
        variant: "destructive"
      });
      return;
    }

    console.log('Sell request submitted:', { 
      formData, 
      images, 
      priceAnalysis 
    });
    
    toast({
      title: "Listing Submitted",
      description: "Your device listing has been submitted for review. We'll approve it within 24 hours.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Your Gadget</h1>
        <p className="text-gray-600 mb-8">
          Get the best price for your device with our smart pricing analysis.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Device Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="itemName">Device Name *</Label>
                  <Input
                    id="itemName"
                    placeholder="e.g., iPhone 15 Pro Max 256GB Space Black"
                    value={formData.itemName}
                    onChange={(e) => handleInputChange('itemName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Original Purchase Price (₦) *</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    placeholder="e.g., 450000"
                    value={formData.originalPrice}
                    onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
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
                      <SelectItem value="audio">Audio Devices</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="condition">Condition *</Label>
                  <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New (10/10)</SelectItem>
                      <SelectItem value="like-new">Like New (9/10)</SelectItem>
                      <SelectItem value="good">Good (7-8/10)</SelectItem>
                      <SelectItem value="fair">Fair (5-6/10)</SelectItem>
                      <SelectItem value="poor">Poor (3-4/10)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="batteryHealth">Battery Health</Label>
                  <Select value={formData.batteryHealth} onValueChange={(value) => handleInputChange('batteryHealth', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Battery condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent (90-100%)</SelectItem>
                      <SelectItem value="good">Good (80-89%)</SelectItem>
                      <SelectItem value="fair">Fair (70-79%)</SelectItem>
                      <SelectItem value="poor">Poor (Below 70%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storageCapacity">Storage Capacity</Label>
                  <Select value={formData.storageCapacity} onValueChange={(value) => handleInputChange('storageCapacity', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Storage size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="64gb">64GB</SelectItem>
                      <SelectItem value="128gb">128GB</SelectItem>
                      <SelectItem value="256gb">256GB</SelectItem>
                      <SelectItem value="512gb">512GB</SelectItem>
                      <SelectItem value="1tb">1TB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your device condition, included accessories, any repairs, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <Button type="button" onClick={analyzePricing} className="w-full">
                <Calculator className="w-4 h-4 mr-2" />
                Analyze Pricing
              </Button>

              {priceAnalysis && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-blue-800 mb-3">Smart Pricing Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <p className="text-sm text-gray-600">Quick Sale</p>
                        <p className="text-lg font-bold text-red-600">₦{priceAnalysis.quickSalePrice.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Sell fast</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border-2 border-green-300">
                        <p className="text-sm text-gray-600">Market Value</p>
                        <p className="text-lg font-bold text-green-600">₦{priceAnalysis.marketValue.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Fair price</p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <p className="text-sm text-gray-600">Optimal Price</p>
                        <p className="text-lg font-bold text-blue-600">₦{priceAnalysis.optimalPrice.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Best value</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Depreciation</p>
                        <p className="font-semibold">{priceAnalysis.depreciationRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Condition Impact</p>
                        <p className="font-semibold">{priceAnalysis.conditionImpact}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Battery Impact</p>
                        <p className="font-semibold">{priceAnalysis.batteryImpact}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Set Your Price
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="askingPrice">Asking Price (₦) *</Label>
                  <Input
                    id="askingPrice"
                    type="number"
                    placeholder="Your selling price"
                    value={formData.askingPrice}
                    onChange={(e) => handleInputChange('askingPrice', e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="negotiable"
                    checked={formData.negotiable}
                    onChange={(e) => handleInputChange('negotiable', e.target.checked)}
                    className="rounded"
                  />
                  <Label htmlFor="negotiable">Price is negotiable</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Images */}
          <Card>
            <CardHeader>
              <CardTitle>Device Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Upload high-quality images</p>
                  <p className="text-sm text-gray-500 mb-4">Clear photos increase sale chances by 70%</p>
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
                      Add Photos
                    </label>
                  </Button>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Device ${index + 1}`}
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

          {/* Contact & Location */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactInfo">Contact Information *</Label>
                  <Input
                    id="contactInfo"
                    placeholder="Email or phone number"
                    value={formData.contactInfo}
                    onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="City, State (e.g., Lagos, Nigeria)"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={!priceAnalysis}>
            Submit for Review & Listing
          </Button>

          {!priceAnalysis && (
            <p className="text-sm text-gray-500 text-center">
              Please analyze pricing before submitting your listing.
            </p>
          )}

          <div className="text-sm text-gray-500 text-center space-y-1">
            <p>✓ Your listing will be reviewed within 24 hours</p>
            <p>✓ We'll optimize your listing for maximum visibility</p>
            <p>✓ You'll receive notifications for all inquiries</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellGadget;
