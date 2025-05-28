
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, Smartphone, Battery, HardDrive, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SwapGadget = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Your Item Details
    itemName: '',
    category: '',
    condition: '',
    batteryHealth: '',
    storageCapacity: '',
    screenCondition: '',
    cameraCondition: '',
    originalPrice: '',
    purchaseDate: '',
    accessories: '',
    description: '',
    
    // Desired Item
    desiredItem: '',
    desiredCategory: '',
    desiredCondition: '',
    
    // Contact
    contactInfo: '',
    location: ''
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages(prev => [...prev, ...files].slice(0, 8));
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const calculateSwapValue = () => {
    const basePrice = parseFloat(formData.originalPrice) || 0;
    const batteryMultiplier = {
      'excellent': 1.0,
      'good': 0.9,
      'fair': 0.7,
      'poor': 0.5
    }[formData.batteryHealth] || 0.8;
    
    const conditionMultiplier = {
      'new': 0.95,
      'like-new': 0.85,
      'good': 0.7,
      'fair': 0.55,
      'poor': 0.3
    }[formData.condition] || 0.6;

    const ageMultiplier = new Date().getFullYear() - new Date(formData.purchaseDate).getFullYear();
    const ageFactor = Math.max(0.5, 1 - (ageMultiplier * 0.15));

    const estimatedValue = basePrice * batteryMultiplier * conditionMultiplier * ageFactor;
    
    return {
      estimatedValue: Math.round(estimatedValue),
      batteryScore: Math.round(batteryMultiplier * 100),
      conditionScore: Math.round(conditionMultiplier * 100),
      ageScore: Math.round(ageFactor * 100)
    };
  };

  const handleEvaluate = () => {
    if (!formData.itemName || !formData.originalPrice || !formData.condition) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields for evaluation.",
        variant: "destructive"
      });
      return;
    }

    const evaluation = calculateSwapValue();
    setEvaluationResult(evaluation);
    
    toast({
      title: "Evaluation Complete",
      description: `Your device is estimated at ₦${evaluation.estimatedValue.toLocaleString()}`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!evaluationResult) {
      toast({
        title: "Evaluation Required",
        description: "Please evaluate your device first before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Submit to backend
    console.log('Swap request submitted:', { 
      formData, 
      images, 
      evaluation: evaluationResult 
    });
    
    toast({
      title: "Swap Request Submitted",
      description: "We'll review your request and contact you within 24 hours.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Swap Your Gadget</h1>
        <p className="text-gray-600 mb-8">
          Get an instant evaluation of your device and find the perfect swap match.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your Item Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Your Device Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="itemName">Device Name *</Label>
                  <Input
                    id="itemName"
                    placeholder="e.g., iPhone 14 Pro Max 256GB"
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

              <div className="grid md:grid-cols-2 gap-4">
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
                  <Label htmlFor="purchaseDate">Purchase Date</Label>
                  <Input
                    id="purchaseDate"
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => handleInputChange('purchaseDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="condition">Overall Condition *</Label>
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
                <div>
                  <Label htmlFor="storageCapacity">Storage</Label>
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
              </div>

              <div>
                <Label htmlFor="description">Additional Details</Label>
                <Textarea
                  id="description"
                  placeholder="Describe any scratches, damages, repairs, or special features..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <Button type="button" onClick={handleEvaluate} className="w-full">
                <Battery className="w-4 h-4 mr-2" />
                Evaluate My Device
              </Button>

              {evaluationResult && (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-green-800 mb-2">Evaluation Result</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Estimated Value</p>
                        <p className="font-bold text-green-700">₦{evaluationResult.estimatedValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Battery Score</p>
                        <p className="font-semibold">{evaluationResult.batteryScore}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Condition Score</p>
                        <p className="font-semibold">{evaluationResult.conditionScore}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Age Factor</p>
                        <p className="font-semibold">{evaluationResult.ageScore}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Device Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Device Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Upload clear photos of your device</p>
                  <p className="text-sm text-gray-500 mb-4">Front, back, sides, screen (Maximum 8 images)</p>
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
                      Choose Photos
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

          {/* What You Want */}
          <Card>
            <CardHeader>
              <CardTitle>What Would You Like in Return?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="desiredItem">Desired Device</Label>
                  <Input
                    id="desiredItem"
                    placeholder="e.g., MacBook Air M2, PS5, iPhone 15 Pro"
                    value={formData.desiredItem}
                    onChange={(e) => handleInputChange('desiredItem', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="desiredCondition">Preferred Condition</Label>
                  <Select value={formData.desiredCondition} onValueChange={(value) => handleInputChange('desiredCondition', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Condition</SelectItem>
                      <SelectItem value="new">New Only</SelectItem>
                      <SelectItem value="like-new">Like New or Better</SelectItem>
                      <SelectItem value="good">Good or Better</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactInfo">Contact Information</Label>
                  <Input
                    id="contactInfo"
                    placeholder="Email or phone number"
                    value={formData.contactInfo}
                    onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={!evaluationResult}>
            Submit Swap Request
          </Button>

          {!evaluationResult && (
            <p className="text-sm text-gray-500 text-center">
              Please evaluate your device before submitting the swap request.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SwapGadget;
