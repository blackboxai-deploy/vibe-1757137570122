"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export default function SendPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    packageType: "",
    packageWeight: "",
    packageValue: "",
    specialInstructions: "",
    deliveryType: "standard"
  });

  const packageTypes = [
    { value: "document", label: "Documents", icon: "📄" },
    { value: "electronics", label: "Electronics", icon: "📱" },
    { value: "clothing", label: "Clothing", icon: "👕" },
    { value: "food", label: "Food Items", icon: "🍎" },
    { value: "fragile", label: "Fragile Items", icon: "⚠️" },
    { value: "other", label: "Other", icon: "📦" }
  ];

  const deliveryOptions = [
    {
      id: "instant",
      name: "GoSend Instant",
      description: "Delivered within 1 hour",
      price: "$8.00",
      time: "30-60 min",
      icon: "⚡"
    },
    {
      id: "standard",
      name: "GoSend Standard",
      description: "Same day delivery",
      price: "$5.00",
      time: "2-6 hours",
      icon: "📦"
    },
    {
      id: "next-day",
      name: "GoSend Next Day",
      description: "Delivered by next day",
      price: "$3.50",
      time: "Next day",
      icon: "🗓️"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.senderName && formData.senderPhone && formData.senderAddress;
      case 2:
        return formData.receiverName && formData.receiverPhone && formData.receiverAddress;
      case 3:
        return formData.packageType && formData.packageWeight;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    // Handle order submission
    console.log("Order submitted:", formData);
    setStep(5); // Go to confirmation step
  };

  if (step === 5) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-lg mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-white">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Package Booked Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your package delivery has been scheduled. Our driver will pick up your package shortly.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2">Order Details</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-mono">GS{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span>{deliveryOptions.find(opt => opt.id === formData.deliveryType)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Pickup:</span>
                  <span>15-30 minutes</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => setStep(1)}>
                Send Another
              </Button>
              <Link href="/dashboard">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center">
              <div className="text-2xl font-bold text-green-600">GoClone</div>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">Track Package</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNumber 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={`w-24 h-1 ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Sender Info</span>
            <span>Receiver Info</span>
            <span>Package Details</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Sender Information"}
              {step === 2 && "Receiver Information"}
              {step === 3 && "Package Details"}
              {step === 4 && "Review & Confirm"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Sender Information */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="senderName">Sender Name *</Label>
                    <Input
                      id="senderName"
                      value={formData.senderName}
                      onChange={(e) => handleInputChange("senderName", e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="senderPhone">Phone Number *</Label>
                    <Input
                      id="senderPhone"
                      type="tel"
                      value={formData.senderPhone}
                      onChange={(e) => handleInputChange("senderPhone", e.target.value)}
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="senderAddress">Pickup Address *</Label>
                  <Textarea
                    id="senderAddress"
                    value={formData.senderAddress}
                    onChange={(e) => handleInputChange("senderAddress", e.target.value)}
                    placeholder="Enter complete pickup address with landmarks"
                    rows={3}
                  />
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">📍 Quick Address Options</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleInputChange("senderAddress", "Home Address")}>
                      🏠 Home
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleInputChange("senderAddress", "Office Address")}>
                      🏢 Office
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Receiver Information */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="receiverName">Receiver Name *</Label>
                    <Input
                      id="receiverName"
                      value={formData.receiverName}
                      onChange={(e) => handleInputChange("receiverName", e.target.value)}
                      placeholder="Receiver's full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="receiverPhone">Phone Number *</Label>
                    <Input
                      id="receiverPhone"
                      type="tel"
                      value={formData.receiverPhone}
                      onChange={(e) => handleInputChange("receiverPhone", e.target.value)}
                      placeholder="+62 812 3456 7890"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="receiverAddress">Delivery Address *</Label>
                  <Textarea
                    id="receiverAddress"
                    value={formData.receiverAddress}
                    onChange={(e) => handleInputChange("receiverAddress", e.target.value)}
                    placeholder="Enter complete delivery address with landmarks"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
                  <Textarea
                    id="specialInstructions"
                    value={formData.specialInstructions}
                    onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                    placeholder="Any special delivery instructions..."
                    rows={2}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Package Details */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-4 block">Package Type *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {packageTypes.map((type) => (
                      <div
                        key={type.value}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.packageType === type.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange("packageType", type.value)}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-2">{type.icon}</div>
                          <p className="text-sm font-medium">{type.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="packageWeight">Package Weight *</Label>
                    <Select onValueChange={(value) => handleInputChange("packageWeight", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select weight range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-1kg">Under 1 kg</SelectItem>
                        <SelectItem value="1-3kg">1 - 3 kg</SelectItem>
                        <SelectItem value="3-5kg">3 - 5 kg</SelectItem>
                        <SelectItem value="5-10kg">5 - 10 kg</SelectItem>
                        <SelectItem value="over-10kg">Over 10 kg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="packageValue">Package Value (Optional)</Label>
                    <Input
                      id="packageValue"
                      type="number"
                      value={formData.packageValue}
                      onChange={(e) => handleInputChange("packageValue", e.target.value)}
                      placeholder="Estimated value in USD"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-4 block">Delivery Speed</Label>
                  <div className="space-y-3">
                    {deliveryOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.deliveryType === option.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange("deliveryType", option.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{option.icon}</div>
                            <div>
                              <h4 className="font-semibold">{option.name}</h4>
                              <p className="text-sm text-gray-600">{option.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg">{option.price}</p>
                            <p className="text-sm text-gray-500">{option.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Confirm */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Order Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-green-600 mb-2">📤 Sender</h4>
                        <p className="font-semibold">{formData.senderName}</p>
                        <p className="text-sm text-gray-600">{formData.senderPhone}</p>
                        <p className="text-sm text-gray-600">{formData.senderAddress}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-600 mb-2">📥 Receiver</h4>
                        <p className="font-semibold">{formData.receiverName}</p>
                        <p className="text-sm text-gray-600">{formData.receiverPhone}</p>
                        <p className="text-sm text-gray-600">{formData.receiverAddress}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">📦 Package Details</h4>
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">
                          {packageTypes.find(t => t.value === formData.packageType)?.icon}
                        </span>
                        <div>
                          <p className="font-medium">
                            {packageTypes.find(t => t.value === formData.packageType)?.label}
                          </p>
                          <p className="text-sm text-gray-600">Weight: {formData.packageWeight}</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">🚚 Delivery Service</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {deliveryOptions.find(opt => opt.id === formData.deliveryType)?.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {deliveryOptions.find(opt => opt.id === formData.deliveryType)?.time}
                          </p>
                        </div>
                        <p className="font-bold text-lg">
                          {deliveryOptions.find(opt => opt.id === formData.deliveryType)?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">📋 Important Notes</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Driver will contact you before pickup</li>
                    <li>• Please ensure someone is available at pickup location</li>
                    <li>• You'll receive real-time tracking updates</li>
                    <li>• Payment can be made cash on delivery or digital</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
              >
                ← Previous
              </Button>
              
              {step < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={!validateStep(step)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Next →
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Confirm Order
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}