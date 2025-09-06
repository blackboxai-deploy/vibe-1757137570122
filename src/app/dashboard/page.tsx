"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function Dashboard() {
  const [activeOrders] = useState([
    {
      id: "1",
      type: "GoFood",
      status: "On the way",
      description: "Pizza from Mario's Kitchen",
      time: "15 mins",
      color: "bg-red-500"
    },
    {
      id: "2",
      type: "GoRide",
      status: "Completed",
      description: "Trip to Shopping Mall",
      time: "2 hours ago",
      color: "bg-green-500"
    }
  ]);

  const services = [
    {
      id: "ride",
      name: "GoRide",
      description: "Book a ride",
      icon: "🚗",
      color: "bg-green-500",
      available: true
    },
    {
      id: "food",
      name: "GoFood", 
      description: "Order food",
      icon: "🍔",
      color: "bg-red-500",
      available: true
    },
    {
      id: "send",
      name: "GoSend",
      description: "Send packages",
      icon: "📦",
      color: "bg-blue-500",
      available: true
    },
    {
      id: "mart",
      name: "GoMart",
      description: "Shop essentials",
      icon: "🏪",
      color: "bg-orange-500",
      available: true
    },
    {
      id: "services",
      name: "GoService",
      description: "Professional services",
      icon: "🔧",
      color: "bg-purple-500",
      available: true
    },
    {
      id: "pay",
      name: "GoPay",
      description: "Digital wallet",
      icon: "💳",
      color: "bg-blue-600",
      available: true
    }
  ];

  const quickActions = [
    { name: "Top Up GoPay", icon: "💰", action: "topup" },
    { name: "Order History", icon: "📋", action: "history" },
    { name: "Favorites", icon: "❤️", action: "favorites" },
    { name: "Promos", icon: "🎁", action: "promos" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-green-600">GoClone</div>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Help
              </Button>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">U</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">What would you like to do today?</p>
        </div>

        {/* Active Orders */}
        {activeOrders.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Orders</h2>
            <div className="space-y-4">
              {activeOrders.map((order) => (
                <Card key={order.id} className="border-l-4 border-l-green-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 ${order.color} rounded-full flex items-center justify-center`}>
                          <span className="text-white text-sm font-semibold">
                            {order.type.slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{order.type}</h3>
                          <p className="text-gray-600 text-sm">{order.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={order.status === "Completed" ? "default" : "secondary"}>
                          {order.status}
                        </Badge>
                        <p className="text-gray-500 text-xs mt-1">{order.time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Card key={action.action} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <p className="text-sm font-medium text-gray-900">{action.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Services */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">All Services</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service) => (
              <Link key={service.id} href={`/${service.id}`}>
                <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center text-2xl mb-3 mx-auto`}>
                      {service.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{service.name}</h3>
                    <p className="text-gray-600 text-xs">{service.description}</p>
                    {!service.available && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        Coming Soon
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Promotions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Special Offers</h2>
          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">New User Special!</h3>
                  <p className="text-green-100 mb-4">Get 50% off on your first 3 rides</p>
                  <Button variant="secondary" size="sm">
                    Claim Now
                  </Button>
                </div>
                <div className="text-6xl opacity-20">🎉</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white">🍔</span>
                    </div>
                    <div>
                      <p className="font-medium">Food order from Pizza Palace</p>
                      <p className="text-gray-500 text-sm">Yesterday, 8:30 PM</p>
                    </div>
                  </div>
                  <p className="font-semibold">$24.50</p>
                </div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white">🚗</span>
                    </div>
                    <div>
                      <p className="font-medium">Ride to Downtown</p>
                      <p className="text-gray-500 text-sm">Dec 15, 2:15 PM</p>
                    </div>
                  </div>
                  <p className="font-semibold">$12.80</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white">📦</span>
                    </div>
                    <div>
                      <p className="font-medium">Package delivery to Office</p>
                      <p className="text-gray-500 text-sm">Dec 14, 11:00 AM</p>
                    </div>
                  </div>
                  <p className="font-semibold">$8.00</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}