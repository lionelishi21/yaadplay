'use client';

import React, { useState, useEffect } from 'react';
import { Gamepad2, ShoppingCart, Gift, Search, Menu, X, Plus, Minus, Star, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFlyerModal, setShowFlyerModal] = useState(false);

  // Show flyer modal after 3 seconds if not dismissed before
  useEffect(() => {
    const hasSeenFlyer = localStorage.getItem('yaadplay-flyer-dismissed');
    if (!hasSeenFlyer) {
      const timer = setTimeout(() => {
        setShowFlyerModal(true);
      }, 3000); // Show after 3 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  // Product data
  const products = [
    // Gaming Consoles
    {
      id: 1,
      name: 'PlayStation 5 Console',
      category: 'consoles',
      price: 89999,
      image: '🎮',
      description: 'Next-gen gaming console with 4K gaming and ray tracing',
      rating: 4.8,
      inStock: true,
      featured: true
    },
    {
      id: 2,
      name: 'Xbox Series X',
      category: 'consoles',
      price: 84999,
      image: '🎮',
      description: 'Most powerful Xbox ever with 4K gaming',
      rating: 4.7,
      inStock: true,
      featured: true
    },
    {
      id: 3,
      name: 'Nintendo Switch OLED',
      category: 'consoles',
      price: 49999,
      image: '🎮',
      description: 'Enhanced OLED display for vibrant gaming',
      rating: 4.9,
      inStock: true,
      featured: false
    },
    {
      id: 4,
      name: 'PlayStation 5 Digital Edition',
      category: 'consoles',
      price: 79999,
      image: '🎮',
      description: 'All-digital PS5 without disc drive',
      rating: 4.6,
      inStock: false,
      featured: false
    },
    {
      id: 5,
      name: 'Xbox Series S',
      category: 'consoles',
      price: 44999,
      image: '🎮',
      description: 'Compact next-gen console',
      rating: 4.5,
      inStock: true,
      featured: false
    },
    {
      id: 6,
      name: 'Steam Deck',
      category: 'consoles',
      price: 69999,
      image: '🎮',
      description: 'Portable PC gaming handheld',
      rating: 4.7,
      inStock: true,
      featured: false
    },
    // Gift Cards
    {
      id: 7,
      name: 'PlayStation Store Gift Card - $50 USD',
      category: 'gift-cards',
      price: 7500,
      image: '💳',
      description: 'Redeemable on PlayStation Store',
      rating: 5.0,
      inStock: true,
      featured: true
    },
    {
      id: 8,
      name: 'Xbox Live Gift Card - $50 USD',
      category: 'gift-cards',
      price: 7500,
      image: '💳',
      description: 'Redeemable on Xbox Store',
      rating: 5.0,
      inStock: true,
      featured: true
    },
    {
      id: 9,
      name: 'Nintendo eShop Gift Card - $50 USD',
      category: 'gift-cards',
      price: 7500,
      image: '💳',
      description: 'Redeemable on Nintendo eShop',
      rating: 5.0,
      inStock: true,
      featured: false
    },
    {
      id: 10,
      name: 'Steam Gift Card - $50 USD',
      category: 'gift-cards',
      price: 7500,
      image: '💳',
      description: 'Redeemable on Steam',
      rating: 5.0,
      inStock: true,
      featured: false
    },
    {
      id: 11,
      name: 'PlayStation Store Gift Card - $100 USD',
      category: 'gift-cards',
      price: 15000,
      image: '💳',
      description: 'Redeemable on PlayStation Store',
      rating: 5.0,
      inStock: true,
      featured: false
    },
    {
      id: 12,
      name: 'Xbox Live Gift Card - $100 USD',
      category: 'gift-cards',
      price: 15000,
      image: '💳',
      description: 'Redeemable on Xbox Store',
      rating: 5.0,
      inStock: true,
      featured: false
    },
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🎮' },
    { id: 'consoles', name: 'Gaming Consoles', icon: '🎮' },
    { id: 'gift-cards', name: 'Gift Cards', icon: '💳' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + delta;
        if (newQuantity <= 0) {
          return null;
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-JM', {
      style: 'currency',
      currency: 'JMD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-100 border-b-2 border-gray-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl neumorphism-card flex items-center justify-center">
                <Gamepad2 className="w-8 h-8 text-jamaica-green" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-gray-800">YaadPlay</h1>
                <p className="text-xs text-gray-600">Jamaica's Gaming Destination 🇯🇲</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl neumorphism-inset text-gray-800 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative neumorphism-button px-6 py-3 rounded-2xl flex items-center gap-2 text-gray-800 font-semibold hover:bg-gradient-to-r hover:from-jamaica-green hover:to-jamaica-yellow hover:text-white transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-jamaica-green text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl neumorphism-inset text-gray-800 placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Christmas Sale Flyer Modal */}
      {showFlyerModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => {
            setShowFlyerModal(false);
            localStorage.setItem('yaadplay-flyer-dismissed', 'true');
          }}
        >
          <div 
            className="relative w-full max-w-4xl bg-gray-100 rounded-3xl shadow-2xl overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                setShowFlyerModal(false);
                localStorage.setItem('yaadplay-flyer-dismissed', 'true');
              }}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-all shadow-xl"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="relative">
              {/* Flyer Image */}
              <img 
                src="/ps5-christmas-flyer.jpg" 
                alt="BIG UP DI CHRISTMAS SALE - PS5 Special Price JMD $89,999"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  // Fallback if image doesn't exist - show styled banner instead
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
              
              {/* Fallback Banner if image not found */}
              <div className="hidden relative bg-gradient-to-br from-red-600 via-green-600 to-yellow-500 p-8 md:p-12 text-center">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10">
                  <div className="text-5xl md:text-7xl font-black mb-4">
                    <span className="text-red-600 drop-shadow-lg">BIG UP</span>
                    <br />
                    <span className="text-green-600 drop-shadow-lg">DI CHRISTMAS</span>
                    <br />
                    <span className="text-yellow-400 drop-shadow-lg">SALE!</span>
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-white mb-6 drop-shadow-lg">
                    PS5 NOW AVAILABLE
                  </div>
                  <div className="inline-block bg-red-600 px-8 py-4 rounded-2xl mb-4 shadow-xl">
                    <div className="text-white text-sm font-semibold mb-1">SPECIAL PRICE</div>
                    <div className="text-yellow-400 text-5xl font-black">JMD $89,999</div>
                  </div>
                  <div className="text-xl md:text-2xl font-bold text-white mt-6 drop-shadow-lg">
                    GET YUH HOLIDAY GAMING ON – JAMAICA STYLE 🇯🇲
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCategory('consoles');
                      setShowFlyerModal(false);
                      localStorage.setItem('yaadplay-flyer-dismissed', 'true');
                    }}
                    className="mt-8 px-8 py-4 bg-white text-jamaica-green rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-xl"
                  >
                    Shop Now →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 px-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-jamaica-green/20 to-jamaica-yellow/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-accent-blue/20 to-accent-purple/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-accent-pink/10 to-accent-orange/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg mb-6 border border-gray-200">
                  <Zap className="w-5 h-5 text-jamaica-yellow" />
                  <p className="text-gray-700 font-semibold">New Arrivals Every Week</p>
                </div>
                
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
                  Level Up Your
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-jamaica-green via-jamaica-yellow to-accent-orange">
                    Gaming Experience
                  </span>
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                  From Kingston to Montego Bay - The latest consoles, hottest games, and exclusive deals delivered right to your yard! 🇯🇲
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <button 
                    onClick={() => setSelectedCategory('consoles')}
                    className="group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #00A859 0%, #FCD116 100%)',
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-white">
                      <Gamepad2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                      Shop Consoles
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button 
                    onClick={() => setSelectedCategory('gift-cards')}
                    className="group px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl neumorphism-button hover:bg-gradient-to-r hover:from-accent-purple hover:to-accent-pink hover:text-white"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Gift className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      Gift Cards
                    </span>
                  </button>
                  <Link 
                    href="/survey"
                    className="group px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl neumorphism-button hover:bg-gradient-to-r hover:from-accent-blue hover:to-accent-purple hover:text-white inline-block"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Star className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      Take Survey
                    </span>
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 justify-center md:justify-start">
                  <div className="text-center md:text-left">
                    <div className="text-4xl font-black bg-gradient-to-r from-jamaica-green to-accent-blue bg-clip-text text-transparent">500+</div>
                    <div className="text-sm text-gray-600 font-semibold">Games Available</div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-4xl font-black bg-gradient-to-r from-jamaica-yellow to-accent-orange bg-clip-text text-transparent">5000+</div>
                    <div className="text-sm text-gray-600 font-semibold">Happy Gamers</div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-4xl font-black bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent">24/7</div>
                    <div className="text-sm text-gray-600 font-semibold">Support</div>
                  </div>
                </div>
              </div>

              {/* Right - Gaming Hero Visual */}
              <div className="relative">
                <div className="neumorphism-card rounded-3xl p-8 border border-gray-200">
                  <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-8 shadow-inner">
                    {/* Gaming Controller Illustration */}
                    <div className="relative aspect-square flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-jamaica-green/20 via-jamaica-yellow/20 to-accent-orange/20 rounded-2xl blur-xl animate-pulse"></div>
                      
                      {/* Controller Body */}
                      <svg viewBox="0 0 200 120" className="w-full h-auto relative z-10">
                        {/* Main controller shape */}
                        <path d="M30,40 Q20,40 20,50 L20,70 Q20,80 30,80 L70,80 L70,90 Q70,100 80,100 L120,100 Q130,100 130,90 L130,80 L170,80 Q180,80 180,70 L180,50 Q180,40 170,40 Z" 
                              fill="url(#controllerGradient)" 
                              className="drop-shadow-2xl"/>
                        
                        {/* D-pad */}
                        <g transform="translate(50, 55)">
                          <circle cx="0" cy="-10" r="4" fill="#FCD116" className="drop-shadow-lg"/>
                          <circle cx="0" cy="10" r="4" fill="#FCD116" className="drop-shadow-lg"/>
                          <circle cx="-10" cy="0" r="4" fill="#FCD116" className="drop-shadow-lg"/>
                          <circle cx="10" cy="0" r="4" fill="#FCD116" className="drop-shadow-lg"/>
                        </g>
                        
                        {/* Buttons */}
                        <g transform="translate(150, 55)">
                          <circle cx="0" cy="-10" r="5" fill="#00A859" className="drop-shadow-lg"/>
                          <circle cx="0" cy="10" r="5" fill="#FCD116" className="drop-shadow-lg"/>
                          <circle cx="-10" cy="0" r="5" fill="#3B82F6" className="drop-shadow-lg"/>
                          <circle cx="10" cy="0" r="5" fill="#EC4899" className="drop-shadow-lg"/>
                        </g>
                        
                        {/* Analog sticks */}
                        <circle cx="75" cy="60" r="8" fill="url(#stickGradient)" className="drop-shadow-xl"/>
                        <circle cx="125" cy="75" r="8" fill="url(#stickGradient)" className="drop-shadow-xl"/>
                        
                        {/* Gradients */}
                        <defs>
                          <linearGradient id="controllerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00A859" />
                            <stop offset="50%" stopColor="#FCD116" />
                            <stop offset="100%" stopColor="#F97316" />
                          </linearGradient>
                          <radialGradient id="stickGradient">
                            <stop offset="0%" stopColor="#374151" />
                            <stop offset="100%" stopColor="#1F2937" />
                          </radialGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Floating Icons */}
                    <div className="absolute top-4 right-4 bg-white rounded-xl p-3 shadow-xl animate-bounce">
                      <Zap className="w-6 h-6 text-jamaica-yellow" />
                    </div>
                    <div className="absolute bottom-4 left-4 bg-white rounded-xl p-3 shadow-xl animate-pulse">
                      <Gamepad2 className="w-6 h-6 text-jamaica-green" />
                    </div>
                    <div className="absolute top-1/2 right-4 bg-white rounded-xl p-3 shadow-xl animate-bounce" style={{ animationDelay: '0.5s' }}>
                      <Star className="w-6 h-6 text-accent-orange" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-2xl font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'neumorphism-pressed text-jamaica-green font-bold'
                  : 'neumorphism-button text-gray-700 hover:text-jamaica-green'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-12">
        {/* Featured Products */}
        {selectedCategory === 'all' && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-jamaica-yellow" />
              <h2 className="text-3xl font-black text-gray-800">Featured Products</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(p => p.featured).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Products */}
        <section>
          <h2 className="text-3xl font-black text-gray-800 mb-6">
            {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No products found. Try a different search!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  formatPrice={formatPrice}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)}></div>
          <div className="relative ml-auto w-full max-w-md bg-gray-100 h-full overflow-y-auto">
            <div className="sticky top-0 bg-gray-100 border-b-2 border-gray-300 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-800">Shopping Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="neumorphism-button w-10 h-10 rounded-xl flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="neumorphism-card p-4 rounded-2xl">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-xl neumorphism-inset flex items-center justify-center text-2xl">
                            {item.image}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-800 mb-1">{item.name}</h3>
                            <p className="text-jamaica-green font-semibold mb-2">{formatPrice(item.price)}</p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="neumorphism-button w-8 h-8 rounded-lg flex items-center justify-center"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="neumorphism-button w-8 h-8 rounded-lg flex items-center justify-center"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto text-red-500 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="neumorphism-card p-6 rounded-2xl mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-gray-700">Total:</span>
                      <span className="text-2xl font-black text-jamaica-green">{formatPrice(cartTotal)}</span>
                    </div>
                    <button className="w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl text-white" style={{
                      background: 'linear-gradient(135deg, #00A859 0%, #FCD116 100%)',
                    }}>
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 border-t-2 border-gray-300 py-8 px-4 mt-20">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            © 2024 YaadPlay. All rights reserved. 🇯🇲
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Jamaica's #1 Gaming & Gift Card E-Commerce Store
          </p>
        </div>
      </footer>
    </div>
  );
}

// Product Card Component
function ProductCard({ product, addToCart, formatPrice }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`neumorphism-card rounded-3xl p-6 transition-all duration-300 ${
        isHovered ? 'scale-105' : ''
      } ${!product.inStock ? 'opacity-60' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="w-full h-48 rounded-2xl neumorphism-inset mb-4 flex items-center justify-center text-6xl">
        {product.image}
      </div>

      {/* Product Info */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-800 text-lg flex-1">{product.name}</h3>
          {product.featured && (
            <span className="ml-2 px-2 py-1 bg-jamaica-yellow text-gray-800 text-xs font-bold rounded-lg">
              HOT
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'fill-jamaica-yellow text-jamaica-yellow'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-black text-jamaica-green">{formatPrice(product.price)}</span>
          {!product.inStock && (
            <span className="text-sm text-red-500 font-semibold">Out of Stock</span>
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => product.inStock && addToCart(product)}
        disabled={!product.inStock}
        className={`w-full py-3 rounded-2xl font-bold transition-all ${
          product.inStock
            ? 'neumorphism-button text-gray-800 hover:bg-gradient-to-r hover:from-jamaica-green hover:to-jamaica-yellow hover:text-white hover:shadow-xl'
            : 'neumorphism-inset text-gray-400 cursor-not-allowed'
        }`}
      >
        {product.inStock ? (
          <span className="flex items-center justify-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </span>
        ) : (
          'Out of Stock'
        )}
      </button>
    </div>
  );
}
