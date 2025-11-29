'use client';

import React, { useState, useEffect } from 'react';
import { Gamepad2, ShoppingCart, Gift, Search, Menu, X, Plus, Minus, Star, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getAllProducts, getProductsByCategory, searchProducts as searchProductsService, getFeaturedProducts } from '../lib/products-service';

export default function Home() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFlyerModal, setShowFlyerModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  // Fetch products from Appwrite on component mount
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

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

  const categories = [
    { id: 'all', name: 'All Products', icon: '🎮' },
    { id: 'consoles', name: 'Gaming Consoles', icon: '🎮' },
    { id: 'gift-cards', name: 'Gift Cards', icon: '💳' },
  ];

  // Filter products based on category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get featured products for display
  const featuredProducts = products.filter(p => p.featured);

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
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-black text-white text-xs py-2 px-4 text-center">
        <span>Free Shipping on Orders Over $50,000 JMD</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
                {/* Logo Image - Place your logo file in /public/logo.png */}
                <img
                  src="/logo.png"
                  alt="YaadPlay Logo"
                  className="h-12 w-auto object-contain"
                  onError={(e) => {
                    // Hide image if it doesn't exist
                    e.target.style.display = 'none';
                  }}
                />
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <button 
                  onClick={() => setSelectedCategory('consoles')}
                  className="text-sm font-semibold text-gray-700 hover:text-accent-red transition-colors"
                >
                  Gaming Consoles
                </button>
                <button 
                  onClick={() => setSelectedCategory('gift-cards')}
                  className="text-sm font-semibold text-gray-700 hover:text-accent-red transition-colors"
                >
                  Gift Cards
                </button>
                <Link 
                  href="/survey"
                  className="text-sm font-semibold text-gray-700 hover:text-accent-red transition-colors"
                >
                  Survey
                </Link>
              </nav>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center">
                <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-accent-red transition-colors" />
              </div>
              
              {/* User Icon Placeholder */}
              <div className="hidden md:block w-6 h-6 rounded-full bg-gray-200"></div>
              
              {/* Cart Button */}
              <button
                onClick={() => setShowCart(!showCart)}
                className="relative flex items-center gap-2"
              >
                <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-accent-red transition-colors" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent-red text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
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
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-accent-red"
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
      <section className="bg-white py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="text-sm text-gray-500 mb-2">YaadPlay</div>
              <h2 className="text-5xl md:text-6xl font-black text-black mb-6 leading-tight">
                YaadPlay Gaming
                <span className="block text-accent-red">Experience</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Discover the latest gaming consoles, accessories, and exclusive deals. From Kingston to Montego Bay - premium gaming delivered to your yard! 🇯🇲
              </p>
              <button 
                onClick={() => setSelectedCategory('consoles')}
                className="px-8 py-4 bg-accent-red text-white font-bold text-lg hover:bg-accent-dark-red transition-colors shadow-lg"
              >
                Shop Now
              </button>
            </div>

            {/* Right - Gaming Controller Visual */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Gaming Controller SVG */}
                <svg viewBox="0 0 400 250" className="w-full h-auto">
                  {/* Controller Body */}
                  <rect x="50" y="80" width="300" height="120" rx="20" fill="#1F2937" className="drop-shadow-2xl"/>
                  <rect x="60" y="90" width="280" height="100" rx="15" fill="#374151"/>
                  
                  {/* D-pad */}
                  <g transform="translate(120, 140)">
                    <rect x="-15" y="-5" width="30" height="10" rx="5" fill="#EF4444"/>
                    <rect x="-5" y="-15" width="10" height="30" rx="5" fill="#EF4444"/>
                  </g>
                  
                  {/* Action Buttons */}
                  <g transform="translate(280, 140)">
                    <circle cx="0" cy="-15" r="8" fill="#EF4444"/>
                    <circle cx="0" cy="15" r="8" fill="#EF4444"/>
                    <circle cx="-15" cy="0" r="8" fill="#EF4444"/>
                    <circle cx="15" cy="0" r="8" fill="#EF4444"/>
                  </g>
                  
                  {/* Analog Sticks */}
                  <circle cx="150" cy="150" r="12" fill="#111827"/>
                  <circle cx="250" cy="160" r="12" fill="#111827"/>
                  
                  {/* Decorative Red Lines */}
                  <line x1="80" y1="60" x2="120" y2="60" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5"/>
                  <line x1="280" y1="60" x2="320" y2="60" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5"/>
                  <circle cx="100" cy="60" r="3" fill="#EF4444"/>
                  <circle cx="300" cy="60" r="3" fill="#EF4444"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex gap-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 font-semibold whitespace-nowrap transition-all border-b-2 ${
                  selectedCategory === category.id
                    ? 'text-accent-red border-accent-red'
                    : 'text-gray-600 border-transparent hover:text-accent-red hover:border-accent-red/50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent-red mb-4"></div>
            <p className="text-gray-600 text-lg">Loading products...</p>
          </div>
        ) : (
          <>
            {/* Featured Products */}
            {selectedCategory === 'all' && (
              <section className="mb-12">
                <h2 className="text-3xl font-black text-black mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {featuredProducts.map((product) => (
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
              <h2 className="text-3xl font-black text-black mb-8">
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
          </>
        )}
      </main>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowCart(false)}></div>
          <div className="relative ml-auto w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
              <h2 className="text-2xl font-black text-black">Shopping Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            {item.image.startsWith('/') ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain p-1"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextElementSibling.style.display = 'flex';
                                }}
                              />
                            ) : null}
                            <div className="hidden w-full h-full items-center justify-center text-2xl">
                              {item.image}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-black mb-1 text-sm">{item.name}</h3>
                            <p className="text-accent-red font-semibold mb-2">{formatPrice(item.price)}</p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-semibold text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto text-accent-red hover:text-accent-dark-red text-sm font-semibold"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold text-black">Total:</span>
                      <span className="text-2xl font-black text-accent-red">{formatPrice(cartTotal)}</span>
                    </div>
                    <button className="w-full py-4 rounded-lg font-bold text-lg bg-accent-red text-white hover:bg-accent-dark-red transition-colors">
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
      <footer className="bg-black text-white py-8 px-4 mt-20">
        <div className="container mx-auto text-center">
          <p className="text-gray-300">
            © 2024 YaadPlay. All rights reserved. 🇯🇲
          </p>
          <p className="text-sm text-gray-400 mt-2">
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
  const isConsole = product.category === 'consoles';

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:border-accent-red ${
        !product.inStock ? 'opacity-60' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link 
        href={isConsole ? `/consoles/${product.id}` : '#'}
        className="block w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
      >
        {product.image.startsWith('/') ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-2"
            onError={(e) => {
              // Fallback to emoji if image doesn't load
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="hidden w-full h-full items-center justify-center text-6xl">
          {product.image}
        </div>
      </Link>

      {/* Product Info */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <Link 
            href={isConsole ? `/consoles/${product.id}` : '#'}
            className="font-bold text-black text-base flex-1 line-clamp-2 hover:text-accent-red transition-colors cursor-pointer"
          >
            {product.name}
          </Link>
          {product.featured && (
            <span className="ml-2 px-2 py-1 bg-accent-red text-white text-xs font-bold rounded">
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
                  ? 'fill-accent-red text-accent-red'
                  : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-black text-black">{formatPrice(product.price)}</span>
          {!product.inStock && (
            <span className="text-sm text-accent-red font-semibold">Out of Stock</span>
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => product.inStock && addToCart(product)}
        disabled={!product.inStock}
        className={`w-full py-3 rounded-lg font-bold transition-all ${
          product.inStock
            ? 'bg-accent-red text-white hover:bg-accent-dark-red'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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
