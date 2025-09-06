"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function RidePage() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [selectedRideType, setSelectedRideType] = useState("goride");
  const [bookingStep, setBookingStep] = useState("booking"); // booking, finding, found, tracking

  const rideTypes = [
    {
      id: "goride",
      name: "GoRide",
      description: "Affordable everyday rides",
      price: "$8.50",
      time: "5 min",
      icon: "🚗",
      color: "bg-green-500"
    },
    {
      id: "gocar",
      name: "GoCar",
      description: "Comfortable air-conditioned rides",
      price: "$12.80",
      time: "3 min",
      icon: "🚙",
      color: "bg-blue-500"
    },
    {
      id: "gobluebird",
      name: "GoBluebird",
      description: "Premium rides with professional drivers",
      price: "$18.50",
      time: "7 min",
      icon: "🚖",
      color: "bg-indigo-500"
    }
  ];

  const handleBookRide = () => {
    if (pickupLocation && dropoffLocation) {
      setBookingStep("finding");
      setTimeout(() => setBookingStep("found"), 3000);
    }
  };

  const handleConfirmRide = () => {
    setBookingStep("tracking");
  };

  if (bookingStep === "finding") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h2 className="text-xl font-semibold mb-2">Finding your driver...</h2>
            <p className="text-gray-600">Please wait while we connect you with a nearby driver</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (bookingStep === "found") {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/dashboard" className="flex items-center">
                <div className="text-2xl font-bold text-green-600">GoClone</div>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-green-600">Driver Found! 🎉</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Driver Info */}
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                <img 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d0e3fb06-cac0-4ba0-a349-a2cab97e533e.png" 
                  alt="Professional driver profile"
                  className="w-15 h-15 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">Ahmad Wijaya</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm text-gray-600">4.9 (256 trips)</span>
                  </div>
                  <p className="text-sm text-gray-600">Honda City • B 1234 XYZ</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800">2 min away</Badge>
                </div>
              </div>

              {/* Trip Details */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Pickup</p>
                    <p className="font-medium">{pickupLocation}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Destination</p>
                    <p className="font-medium">{dropoffLocation}</p>
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total Fare</span>
                  <span className="text-2xl font-bold text-green-600">
                    {rideTypes.find(r => r.id === selectedRideType)?.price}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => setBookingStep("booking")}>
                    Cancel
                  </Button>
                  <Button onClick={handleConfirmRide} className="bg-green-600 hover:bg-green-700">
                    Confirm Ride
                  </Button>
                </div>
              </div>

              {/* Contact Options */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <Button variant="outline" size="sm">
                  📞 Call Driver
                </Button>
                <Button variant="outline" size="sm">
                  💬 Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (bookingStep === "tracking") {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/dashboard" className="flex items-center">
                <div className="text-2xl font-bold text-green-600">GoClone</div>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="p-6">
              {/* Status */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Driver is on the way</span>
                </div>
                <p className="text-gray-600 mt-2">Estimated arrival: 2 minutes</p>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 h-64 rounded-lg mb-6 flex items-center justify-center">
                <img 
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cebd23e8-da19-4cc4-a7c4-80d06b0e7cc5.png" 
                  alt="Live tracking map showing driver location"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Driver Info (Compact) */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/429ea4e4-86b4-4d23-ba40-fd523fc3fb31.png" 
                    alt="Driver Ahmad profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">Ahmad Wijaya</p>
                    <p className="text-sm text-gray-600">Honda City • B 1234 XYZ</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">📞</Button>
                  <Button variant="outline" size="sm">💬</Button>
                </div>
              </div>

              {/* Trip Progress */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Driver assigned</p>
                    <p className="text-sm text-gray-500">Just now</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                  <div>
                    <p className="font-medium">Heading to pickup location</p>
                    <p className="text-sm text-gray-500">ETA: 2 minutes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                  <div>
                    <p className="text-gray-500">Pickup passenger</p>
                    <p className="text-sm text-gray-400">Pending</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                  <div>
                    <p className="text-gray-500">Drop off at destination</p>
                    <p className="text-sm text-gray-400">Pending</p>
                  </div>
                </div>
              </div>

              {/* Emergency & Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="text-red-600 border-red-200">
                  🚨 Emergency
                </Button>
                <Button variant="outline" onClick={() => setBookingStep("booking")}>
                  Cancel Trip
                </Button>
              </div>
            </CardContent>
          </Card>
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
              <Button variant="ghost" size="sm">History</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book a Ride</h1>
          <p className="text-gray-600">Safe, reliable, and affordable transportation</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Where to?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location Inputs */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input
                    id="pickup"
                    placeholder="Enter pickup location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="dropoff">Drop-off Location</Label>
                  <Input
                    id="dropoff"
                    placeholder="Where are you going?"
                    value={dropoffLocation}
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Ride Types */}
              <div>
                <Label className="text-base font-semibold">Choose your ride</Label>
                <div className="grid grid-cols-1 gap-3 mt-3">
                  {rideTypes.map((ride) => (
                    <div
                      key={ride.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedRideType === ride.id 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedRideType(ride.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${ride.color} rounded-lg flex items-center justify-center text-white`}>
                            {ride.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold">{ride.name}</h4>
                            <p className="text-sm text-gray-600">{ride.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{ride.price}</p>
                          <p className="text-sm text-gray-500">{ride.time} away</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <Button 
                onClick={handleBookRide}
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                disabled={!pickupLocation || !dropoffLocation}
              >
                Book {rideTypes.find(r => r.id === selectedRideType)?.name}
              </Button>
            </CardContent>
          </Card>

          {/* Additional Options */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-16 flex-col space-y-1">
                    <span className="text-xl">🏠</span>
                    <span className="text-sm">Home</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col space-y-1">
                    <span className="text-xl">🏢</span>
                    <span className="text-sm">Work</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col space-y-1">
                    <span className="text-xl">📍</span>
                    <span className="text-sm">Saved Places</span>
                  </Button>
                  <Button variant="outline" className="h-16 flex-col space-y-1">
                    <span className="text-xl">🕒</span>
                    <span className="text-sm">Recent</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Ride Options */}
            <Card>
              <CardHeader>
                <CardTitle>Ride Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="now" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="now">Ride Now</TabsTrigger>
                    <TabsTrigger value="later">Schedule Later</TabsTrigger>
                  </TabsList>
                  <TabsContent value="now" className="space-y-4">
                    <p className="text-sm text-gray-600">Get a ride immediately</p>
                  </TabsContent>
                  <TabsContent value="later" className="space-y-4">
                    <div>
                      <Label htmlFor="schedule-date">Date & Time</Label>
                      <Input
                        id="schedule-date"
                        type="datetime-local"
                        className="mt-1"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Safety Features */}
            <Card>
              <CardHeader>
                <CardTitle>Safety First</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🛡️</span>
                    <div>
                      <p className="font-medium">Verified Drivers</p>
                      <p className="text-sm text-gray-600">Background-checked professionals</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="font-medium">Live Tracking</p>
                      <p className="text-sm text-gray-600">Share your trip with loved ones</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🚨</span>
                    <div>
                      <p className="font-medium">Emergency Button</p>
                      <p className="text-sm text-gray-600">Quick access to help</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}