"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function MartPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<any[]>([]);

  const categories = [
    { id: "all", name: "All", icon: "🛒" },
    { id: "groceries", name: "Groceries", icon: "🥬" },
    { id: "beverages", name: "Beverages", icon: "🥤" },
    { id: "snacks", name: "Snacks", icon: "🍿" },
    { id: "dairy", name: "Dairy", icon: "🥛" },
    { id: "household", name: "Household", icon: "🧽" }
  ];

  const products = [
    {
      id: 1,
      name: "Fresh Bananas (1kg)",
      category: "groceries",
      price: 3.99,
      originalPrice: 4.99,
      discount: 20,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/53b3ee62-7d7b-4be3-b14d-b4b81574f525.png",
      inStock: true,
      rating: 4.8,
      description: "Fresh organic bananas, perfect for breakfast"
    },
    {
      id: 2,
      name: "Whole Milk (1L)",
      category: "dairy",
      price: 2.49,
      originalPrice: null,
      discount: null,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/60b130f0-75b3-4dcf-88b2-cd933d599e07.png",
      inStock: true,
      rating: 4.9,
      description: "Fresh whole milk from local farms"
    },
    {
      id: 3,
      name: "Coca Cola (2L)",
      category: "beverages",
      price: 2.99,
      originalPrice: 3.49,
      discount: 15,
      image: "https://placehold.co/250x200?text=Coca+Cola+2L+bottle+refreshing+soda+drink",
      inStock: true,
      rating: 4.7,
      description: "Refreshing cola drink, perfect for any occasion"
    },
    {
      id: 4,
      name: "Potato Chips (150g)",
      category: "snacks",
      price: 1.99,
      originalPrice: null,
      discount: null,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4ed86e1c-ffd5-412b-9770-d36e93a7905b.png",
      inStock: true,
      rating: 4.5,
      description: "Crispy and delicious potato chips"
    },
    {
      id: 5,
      name: "Bread Loaf",
      category: "groceries",
      price: 2.79,
      originalPrice: null,
      discount: null,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/af42619b-86ee-4cc0-b4fc-24366c421541.png",
      inStock: true,
      rating: 4.6,
      description: "Fresh baked whole wheat bread"
    },
    {
      id: 6,
      name: "Dish Soap (500ml)",
      category: "household",
      price: 4.49,
      originalPrice: 5.99,
      discount: 25,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/423dec4f-1730-4f74-b676-0be1d66bd6a1.png",
      inStock: true,
      rating: 4.8,
      description: "Powerful dish cleaning soap"
    },
    {
      id: 7,
      name: "Orange Juice (1L)",
      category: "beverages",
      price: 3.79,
      originalPrice: null,
      discount: null,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2c1f651e-a553-49a1-a492-feadc273200f.png",
      inStock: false,
      rating: 4.9,
      description: "100% pure orange juice with no added sugar"
    },
    {
      id: 8,
      name: "Mixed Nuts (200g)",
      category: "snacks",
      price: 6.99,
      originalPrice: 7.99,
      discount: 12,
      image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3490fe68-ddf2-4deb-b2ce-abdb5636e28d.png",
      inStock: true,
      rating: 4.7,
      description: "Premium mix of almonds, cashews, and walnuts"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev => prev.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center">
              <div className="text-2xl font-bold text-green-600">GoClone</div>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">Orders</Button>
              <Button variant="ghost" size="sm" className="relative">
                🛒 Cart ({getCartItemCount()})
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title & Search */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">GoMart - Grocery Delivery</h1>
          <div className="max-w-md mx-auto">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* Categories */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={selectedCategory === category.id ? "bg-orange-500 hover:bg-orange-600" : ""}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Promotional Banner */}
            <Card className="mb-8 bg-gradient-to-r from-orange-500 to-red-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Fresh Deals Today! 🥬</h2>
                    <p className="text-orange-100">Up to 30% off on fresh groceries and daily essentials</p>
                  </div>
                  <div className="text-6xl opacity-20">🛒</div>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-all duration-200 group">
                  <div className="relative">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                    />
                    {product.discount && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-red-500 text-white">
                          -{product.discount}%
                        </Badge>
                      </div>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center rounded-t-lg">
                        <Badge variant="secondary" className="bg-gray-700 text-white">
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xl text-orange-600">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">⭐</span>
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>

                    <Button 
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`w-full ${
                        product.inStock 
                          ? "bg-orange-500 hover:bg-orange-600" 
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or category filter</p>
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Cart</span>
                  <Badge variant="secondary">{getCartItemCount()} items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🛒</div>
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-2">Add some products to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="max-h-64 overflow-y-auto space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 border-b pb-3">
                          <img 
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{item.name}</p>
                            <p className="text-orange-600 font-semibold">${item.price}</p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="w-7 h-7 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="w-7 h-7 p-0"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>${getCartTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery Fee</span>
                        <span className="text-green-600">Free</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span className="text-orange-600">${getCartTotal().toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        Proceed to Checkout
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full text-xs"
                        onClick={() => setCart([])}
                      >
                        Clear Cart
                      </Button>
                    </div>

                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-800 text-sm font-medium">🚚 Free Delivery</p>
                      <p className="text-green-600 text-xs">
                        Your order qualifies for free delivery!
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Add Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Quick Add</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    🥛 Milk
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    🍞 Bread
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    🥚 Eggs
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    🧄 Bananas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}