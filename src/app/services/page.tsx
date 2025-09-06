"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [bookingStep, setBookingStep] = useState("browse"); // browse, details, booking, confirmation
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [bookingForm, setBookingForm] = useState({
    date: "",
    time: "",
    address: "",
    phone: "",
    description: "",
    urgency: "normal"
  });

  const serviceCategories = [
    { id: "all", name: "All Services", icon: "🔧" },
    { id: "cleaning", name: "Cleaning", icon: "🧽" },
    { id: "repairs", name: "Repairs", icon: "🔨" },
    { id: "beauty", name: "Beauty & Wellness", icon: "💄" },
    { id: "tutoring", name: "Tutoring", icon: "📚" },
    { id: "tech", name: "Tech Support", icon: "💻" }
  ];

  const services = [
    {
      id: 1,
      name: "House Cleaning",
      category: "cleaning",
      description: "Professional home cleaning service",
      price: "$25/hour",
      rating: 4.9,
      reviews: 324,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9a29d178-da8e-4f0d-95c6-8073ed05e11e.png",
      provider: "CleanPro Services",
      availability: "Same day",
      services: ["Deep cleaning", "Regular maintenance", "Move-in/out cleaning"],
      about: "Professional house cleaning with eco-friendly products. Our trained staff ensures your home is spotless.",
      experience: "5+ years"
    },
    {
      id: 2,
      name: "Plumbing Repair",
      category: "repairs",
      description: "Expert plumbing solutions",
      price: "$40/hour",
      rating: 4.8,
      reviews: 198,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/44ef1dad-9a74-4cde-b4f3-7dc52f83cbff.png",
      provider: "FixIt Plumbing",
      availability: "24/7",
      services: ["Leak repairs", "Pipe installation", "Drain cleaning", "Emergency repairs"],
      about: "Licensed plumber with 10+ years experience. Available for emergencies and scheduled maintenance.",
      experience: "10+ years"
    },
    {
      id: 3,
      name: "Hair Styling",
      category: "beauty",
      description: "Professional hair care at home",
      price: "$30/session",
      rating: 4.9,
      reviews: 156,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8e323c81-fbd4-4553-a8d9-0c3ff117537c.png",
      provider: "Bella Hair Studio",
      availability: "By appointment",
      services: ["Haircut", "Hair coloring", "Styling", "Hair treatment"],
      about: "Certified hair stylist bringing salon-quality service to your home. Specializing in modern cuts and colors.",
      experience: "7+ years"
    },
    {
      id: 4,
      name: "Math Tutoring",
      category: "tutoring",
      description: "One-on-one math lessons",
      price: "$20/hour",
      rating: 4.7,
      reviews: 89,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b8e29152-6f85-4b43-b8bd-9414c705d70e.png",
      provider: "EduHelp Tutors",
      availability: "Flexible",
      services: ["Elementary math", "High school algebra", "Calculus", "Test preparation"],
      about: "Experienced math teacher with passion for helping students succeed. Personalized learning approach.",
      experience: "8+ years"
    },
    {
      id: 5,
      name: "AC Repair",
      category: "repairs",
      description: "Air conditioning maintenance",
      price: "$45/hour",
      rating: 4.8,
      reviews: 267,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/eafd579b-7731-4526-b795-ce2a95650d75.png",
      provider: "CoolAir Technicians",
      availability: "Same day",
      services: ["AC repair", "Installation", "Maintenance", "Gas refill"],
      about: "Certified HVAC technicians providing reliable air conditioning solutions for homes and offices.",
      experience: "12+ years"
    },
    {
      id: 6,
      name: "Computer Repair",
      category: "tech",
      description: "Tech support and repairs",
      price: "$35/hour",
      rating: 4.6,
      reviews: 143,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e7665cdd-e438-4141-988d-67f02abe5a8e.png",
      provider: "TechFix Solutions",
      availability: "Next day",
      services: ["Hardware repair", "Software installation", "Virus removal", "Data recovery"],
      about: "IT professionals specializing in computer repair and technical support for all devices.",
      experience: "6+ years"
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookingChange = (field: string, value: string) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBookService = () => {
    setBookingStep("confirmation");
  };

  if (bookingStep === "confirmation") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-white">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Booked Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your {selectedService?.name} service has been confirmed. The service provider will contact you shortly.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold mb-4">Booking Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Provider:</span>
                  <span className="font-medium">{selectedService?.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time:</span>
                  <span className="font-medium">{bookingForm.date} at {bookingForm.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rate:</span>
                  <span className="font-medium">{selectedService?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-mono text-green-600">GS{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setBookingStep("browse");
                  setSelectedService(null);
                }}
              >
                Book Another Service
              </Button>
              <Link href="/dashboard">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedService && bookingStep === "details") {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedService(null)}
                className="flex items-center"
              >
                ← Back to Services
              </Button>
              <div className="text-xl font-bold text-gray-900">{selectedService.name}</div>
              <div></div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Service Details */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-6">
                    <img 
                      src={selectedService.image}
                      alt={selectedService.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold mb-2">{selectedService.name}</h1>
                      <p className="text-gray-600 mb-4">{selectedService.description}</p>
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="font-semibold">{selectedService.rating}</span>
                          <span className="text-gray-500">({selectedService.reviews} reviews)</span>
                        </div>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">{selectedService.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold text-purple-600">{selectedService.price}</span>
                        <Badge className="bg-green-100 text-green-800">
                          Available: {selectedService.availability}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About Provider */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>About {selectedService.provider}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{selectedService.about}</p>
                  <div>
                    <h4 className="font-semibold mb-2">Services Offered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.services.map((service: string, index: number) => (
                        <Badge key={index} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold">Sarah Johnson</span>
                        <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Excellent service! Very professional and thorough. Would definitely book again.
                      </p>
                      <p className="text-gray-500 text-xs mt-1">2 days ago</p>
                    </div>
                    <div className="border-b pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold">Mike Chen</span>
                        <div className="text-yellow-500">⭐⭐⭐⭐⭐</div>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Great work and fair pricing. Arrived on time and completed the job efficiently.
                      </p>
                      <p className="text-gray-500 text-xs mt-1">1 week ago</p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold">Lisa Rodriguez</span>
                        <div className="text-yellow-500">⭐⭐⭐⭐</div>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Good service overall. Minor delay but quality work. Recommended!
                      </p>
                      <p className="text-gray-500 text-xs mt-1">2 weeks ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Book This Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="service-date">Preferred Date</Label>
                    <Input
                      id="service-date"
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => handleBookingChange("date", e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <Label htmlFor="service-time">Preferred Time</Label>
                    <Select onValueChange={(value) => handleBookingChange("time", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="address">Service Address</Label>
                    <Textarea
                      id="address"
                      value={bookingForm.address}
                      onChange={(e) => handleBookingChange("address", e.target.value)}
                      placeholder="Enter complete address where service is needed"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Contact Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(e) => handleBookingChange("phone", e.target.value)}
                      placeholder="+62 812 3456 7890"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Service Description</Label>
                    <Textarea
                      id="description"
                      value={bookingForm.description}
                      onChange={(e) => handleBookingChange("description", e.target.value)}
                      placeholder="Describe what you need help with..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select onValueChange={(value) => handleBookingChange("urgency", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Normal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="urgent">Urgent (+$10)</SelectItem>
                        <SelectItem value="emergency">Emergency (+$25)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Service Rate</span>
                      <span>{selectedService.price}</span>
                    </div>
                    {bookingForm.urgency !== "normal" && (
                      <div className="flex justify-between items-center mb-2">
                        <span>Urgency Fee</span>
                        <span>
                          {bookingForm.urgency === "urgent" ? "+$10" : "+$25"}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center font-semibold text-lg">
                      <span>Estimated Total</span>
                      <span className="text-purple-600">
                        {selectedService.price}
                        {bookingForm.urgency === "urgent" && " + $10"}
                        {bookingForm.urgency === "emergency" && " + $25"}
                      </span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleBookService}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={!bookingForm.date || !bookingForm.time || !bookingForm.address || !bookingForm.phone}
                  >
                    Book Service
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Final pricing will be confirmed by the service provider
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
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
              <Button variant="ghost" size="sm">My Bookings</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title & Search */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Professional Services</h1>
          <p className="text-gray-600 mb-6">Book trusted professionals for all your home and personal needs</p>
          <div className="max-w-md mx-auto">
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {serviceCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card 
              key={service.id} 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => {
                setSelectedService(service);
                setBookingStep("details");
              }}
            >
              <div className="relative">
                <img 
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white text-gray-900">
                    {service.availability}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                <p className="text-gray-700 text-sm mb-3 font-medium">{service.provider}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold text-sm">{service.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 text-sm">{service.reviews} reviews</span>
                  </div>
                  <span className="text-purple-600 font-bold">{service.price}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter</p>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Why Choose GoService?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified Professionals</h3>
              <p className="text-gray-600">All service providers are background-checked and verified</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Insurance Protected</h3>
              <p className="text-gray-600">All services are covered by comprehensive insurance</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💯</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Satisfaction Guarantee</h3>
              <p className="text-gray-600">100% satisfaction guarantee or your money back</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}