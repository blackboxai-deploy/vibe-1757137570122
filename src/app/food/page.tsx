"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FoodPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<any[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  const categories = [
    { id: "all", name: "All", icon: "🍽️" },
    { id: "pizza", name: "Pizza", icon: "🍕" },
    { id: "burger", name: "Burgers", icon: "🍔" },
    { id: "asian", name: "Asian", icon: "🍜" },
    { id: "dessert", name: "Desserts", icon: "🍰" },
    { id: "healthy", name: "Healthy", icon: "🥗" }
  ];

  const restaurants = [
    {
      id: 1,
      name: "Mario's Pizza Palace",
      category: "pizza",
      rating: 4.8,
      deliveryTime: "25-35 min",
      deliveryFee: "$2.50",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7f6d336b-64bb-4e6f-843b-70058caeb055.png",
      cuisine: "Italian",
      promo: "Free delivery on orders $25+",
      menu: [
        { id: 1, name: "Margherita Pizza", price: 16.99, description: "Fresh mozzarella, basil, tomato sauce", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4a5322f9-dda0-4d70-bf08-f177661e8d3e.png" },
        { id: 2, name: "Pepperoni Pizza", price: 18.99, description: "Pepperoni, mozzarella, tomato sauce", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7c73d9ee-1656-499d-b6de-b386464d4bdd.png" },
        { id: 3, name: "Caesar Salad", price: 12.99, description: "Romaine lettuce, croutons, parmesan", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0f12d15c-4411-4ea5-b187-0aa562a1b1e6.png" }
      ]
    },
    {
      id: 2,
      name: "Burger Junction",
      category: "burger",
      rating: 4.6,
      deliveryTime: "15-25 min",
      deliveryFee: "$1.99",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2d93958e-210f-4179-86b8-0b28f7e8895c.png",
      cuisine: "American",
      promo: "Buy 2 get 1 free fries",
      menu: [
        { id: 4, name: "Classic Cheeseburger", price: 14.99, description: "Beef patty, cheese, lettuce, tomato", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1cc8341d-2818-4f13-82fd-a33b1e078eb8.png" },
        { id: 5, name: "BBQ Bacon Burger", price: 17.99, description: "Beef patty, bacon, BBQ sauce, onion rings", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/87652f9a-4709-4090-ad93-b7c34d4bf063.png" },
        { id: 6, name: "Crispy Chicken Wings", price: 13.99, description: "6 pieces with choice of sauce", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/94dd94f5-6e31-4d5e-8420-c52667a6dad6.png" }
      ]
    },
    {
      id: 3,
      name: "Tokyo Ramen House",
      category: "asian",
      rating: 4.9,
      deliveryTime: "30-40 min",
      deliveryFee: "$3.00",
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/125c8587-7b11-4065-8747-4ebec26664f9.png",
      cuisine: "Japanese",
      promo: "20% off first order",
      menu: [
        { id: 7, name: "Tonkotsu Ramen", price: 19.99, description: "Rich pork broth, chashu, egg, noodles", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/43790875-9e3f-4ba5-be8f-8dd8f0392ea8.png" },
        { id: 8, name: "Chicken Teriyaki", price: 16.99, description: "Grilled chicken with teriyaki sauce & rice", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4d3b5f30-9a9c-4a2b-8fd0-656b319eb9ab.png" },
        { id: 9, name: "Gyoza (6 pcs)", price: 8.99, description: "Pan-fried pork dumplings", image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/88304199-3055-44e4-ab08-cab5727a8c94.png" }
      ]
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesCategory = selectedCategory === "all" || restaurant.category === selectedCategory;
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(prev => prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (selectedRestaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedRestaurant(null)}
                className="flex items-center"
              >
                ← Back to Restaurants
              </Button>
              <div className="text-xl font-bold text-gray-900">{selectedRestaurant.name}</div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  🛒 Cart ({cart.length})
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Restaurant Header */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-6">
                <img 
                  src={selectedRestaurant.image}
                  alt={selectedRestaurant.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold mb-2">{selectedRestaurant.name}</h1>
                  <p className="text-gray-600 mb-4">{selectedRestaurant.cuisine} Cuisine</p>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold">{selectedRestaurant.rating}</span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{selectedRestaurant.deliveryTime}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">Delivery {selectedRestaurant.deliveryFee}</span>
                  </div>
                  {selectedRestaurant.promo && (
                    <Badge className="bg-red-100 text-red-800">
                      🎁 {selectedRestaurant.promo}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Menu Items */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Menu</h2>
              <div className="space-y-4">
                {selectedRestaurant.menu.map((item: any) => (
                  <Card key={item.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                          <p className="font-bold text-xl text-green-600">${item.price}</p>
                        </div>
                        <Button 
                          onClick={() => addToCart(item)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Cart Sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-2">
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">${item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span>Subtotal</span>
                          <span>${getCartTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span>Delivery Fee</span>
                          <span>{selectedRestaurant.deliveryFee}</span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                          <span>Total</span>
                          <span>${(getCartTotal() + parseFloat(selectedRestaurant.deliveryFee.replace('$', ''))).toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full bg-red-500 hover:bg-red-600 mt-4">
                        Proceed to Checkout
                      </Button>
                    </div>
                  )}
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
              <Button variant="ghost" size="sm">Orders</Button>
              <Button variant="ghost" size="sm">🛒 Cart ({cart.length})</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title & Search */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Food Delivery</h1>
          <div className="max-w-md mx-auto">
            <Input
              placeholder="Search restaurants or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "bg-red-500 hover:bg-red-600" : ""}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Promotional Banner */}
        <Card className="mb-8 bg-gradient-to-r from-red-500 to-pink-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Free Delivery Weekend! 🍔</h2>
                <p className="text-red-100">Order from your favorite restaurants with zero delivery fees</p>
              </div>
              <div className="text-6xl opacity-20">🚚</div>
            </div>
          </CardContent>
        </Card>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Card 
              key={restaurant.id} 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => setSelectedRestaurant(restaurant)}
            >
              <div className="relative">
                <img 
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                />
                {restaurant.promo && (
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-red-500 text-white">
                      {restaurant.promo}
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{restaurant.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{restaurant.cuisine}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold text-sm">{restaurant.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 text-sm">{restaurant.deliveryTime}</span>
                  </div>
                  <span className="text-green-600 font-semibold text-sm">{restaurant.deliveryFee}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
    </div>
  );
}