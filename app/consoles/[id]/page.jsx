'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ShoppingCart, 
  Star, 
  ArrowLeft, 
  Check, 
  Calendar,
  Package,
  Shield,
  Clock,
  Gamepad2,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { getProductById } from '@/lib/products-service';

// Fallback console data (used if Appwrite is not configured)
const fallbackConsoles = [
  {
    id: 1,
    name: 'PlayStation 5 Console',
    category: 'consoles',
    price: 89999,
    image: '/images/ps5/ps5_image01.png',
    description: 'Next-gen gaming console with 4K gaming and ray tracing',
    rating: 4.8,
    inStock: true,
    featured: true,
    specifications: {
      processor: 'AMD Zen 2-based CPU with 8 cores',
      graphics: 'AMD RDNA 2-based GPU with 10.28 TFLOPS',
      memory: '16GB GDDR6',
      storage: '825GB Custom SSD',
      output: '4K UHD, 8K, HDR',
      features: ['Ray Tracing', '3D Audio', 'Backward Compatibility', 'DualSense Controller']
    },
    images: [
      '/images/ps5/ps5_image01.png',
      '/images/ps5/ps5_images02.png'
    ]
  },
  {
    id: 2,
    name: 'Xbox Series X',
    category: 'consoles',
    price: 84999,
    image: '/images/xbox_x/Gemini_Generated_Image_o64x9no64x9no64x.png',
    description: 'Most powerful Xbox ever with 4K gaming',
    rating: 4.7,
    inStock: true,
    featured: true,
    specifications: {
      processor: 'AMD Zen 2-based CPU with 8 cores',
      graphics: 'AMD RDNA 2-based GPU with 12.15 TFLOPS',
      memory: '16GB GDDR6',
      storage: '1TB Custom NVMe SSD',
      output: '4K UHD, 8K, HDR',
      features: ['Ray Tracing', 'Quick Resume', 'Backward Compatibility', 'Xbox Game Pass']
    },
    images: [
      '/images/xbox_x/Gemini_Generated_Image_o64x9no64x9no64x.png'
    ]
  },
  {
    id: 3,
    name: 'Nintendo Switch OLED',
    category: 'consoles',
    price: 49999,
    image: '/images/nintendo_switch2/Gemini_Generated_Image_u41n7su41n7su41n.png',
    description: 'Enhanced OLED display for vibrant gaming',
    rating: 4.9,
    inStock: true,
    featured: false,
    specifications: {
      processor: 'NVIDIA Custom Tegra',
      graphics: 'NVIDIA GPU',
      memory: '4GB',
      storage: '64GB Internal Storage',
      output: '720p Handheld, 1080p Docked',
      features: ['OLED Display', 'Handheld & Docked', 'Joy-Con Controllers', 'Nintendo eShop']
    },
    images: [
      '/images/nintendo_switch2/Gemini_Generated_Image_u41n7su41n7su41n.png'
    ]
  },
  {
    id: 4,
    name: 'PlayStation 5 Digital Edition',
    category: 'consoles',
    price: 79999,
    image: '/images/ps5/ps5_images02.png',
    description: 'All-digital PS5 without disc drive',
    rating: 4.6,
    inStock: false,
    featured: false,
    specifications: {
      processor: 'AMD Zen 2-based CPU with 8 cores',
      graphics: 'AMD RDNA 2-based GPU with 10.28 TFLOPS',
      memory: '16GB GDDR6',
      storage: '825GB Custom SSD',
      output: '4K UHD, 8K, HDR',
      features: ['Ray Tracing', '3D Audio', 'Backward Compatibility', 'DualSense Controller', 'Digital Only']
    },
    images: [
      '/images/ps5/ps5_images02.png',
      '/images/ps5/ps5_image01.png'
    ]
  },
  {
    id: 5,
    name: 'Xbox One',
    category: 'consoles',
    price: 44999,
    image: '/images/xbox_one/Gemini_Generated_Image_jsg42ljsg42ljsg4.png',
    description: 'Previous generation Xbox console',
    rating: 4.5,
    inStock: true,
    featured: false,
    specifications: {
      processor: 'AMD Custom CPU',
      graphics: 'AMD GPU',
      memory: '8GB DDR3',
      storage: '500GB/1TB HDD',
      output: '1080p, 4K UHD',
      features: ['Xbox Game Pass', 'Backward Compatibility', 'Xbox Live', 'Media Streaming']
    },
    images: [
      '/images/xbox_one/Gemini_Generated_Image_jsg42ljsg42ljsg4.png'
    ]
  },
  {
    id: 6,
    name: 'PlayStation 5 Controller',
    category: 'consoles',
    price: 9999,
    image: '/images/ps5_controller/Gemini_Generated_Image_wogvpowogvpowogv.png',
    description: 'DualSense wireless controller for PS5',
    rating: 4.7,
    inStock: true,
    featured: false,
    specifications: {
      connectivity: 'Bluetooth, USB-C',
      battery: 'Built-in rechargeable battery',
      features: ['Haptic Feedback', 'Adaptive Triggers', 'Touch Pad', 'Motion Sensors', 'Built-in Microphone'],
      compatibility: 'PS5, PC, Mobile'
    },
    images: [
      '/images/ps5_controller/Gemini_Generated_Image_wogvpowogvpowogv.png'
    ]
  },
];

// Rental plans configuration
const rentalPlans = [
  {
    id: 'weekly',
    name: 'Weekly Rental',
    duration: '7 days',
    price: 15000,
    discount: '15% off purchase',
    features: [
      'Full console access',
      'All accessories included',
      'Free delivery & pickup',
      'Technical support',
      '15% discount if you buy'
    ]
  },
  {
    id: 'monthly',
    name: 'Monthly Rental',
    duration: '30 days',
    price: 45000,
    discount: '25% off purchase',
    features: [
      'Full console access',
      'All accessories included',
      'Free delivery & pickup',
      'Priority technical support',
      '25% discount if you buy',
      'Game recommendations'
    ],
    popular: true
  },
  {
    id: 'extended',
    name: 'Extended Rental',
    duration: '90 days',
    price: 120000,
    discount: '40% off purchase',
    features: [
      'Full console access',
      'All accessories included',
      'Free delivery & pickup',
      'Priority technical support',
      '40% discount if you buy',
      'Game recommendations',
      'Free game trial access'
    ]
  }
];

export default function ConsoleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [cart, setCart] = useState([]);
  const [console, setConsole] = useState(null);
  const [loading, setLoading] = useState(true);

  const consoleId = params.id;

  // Fetch console data from Appwrite
  useEffect(() => {
    async function loadConsole() {
      try {
        setLoading(true);
        // Try to fetch from Appwrite first
        const product = await getProductById(consoleId);
        
        if (product) {
          // If product found, use it
          setConsole(product);
        } else {
          // Fallback to local data
          const fallbackConsole = fallbackConsoles.find(c => 
            c.id === parseInt(consoleId) || c.id.toString() === consoleId
          );
          setConsole(fallbackConsole || null);
        }
      } catch (error) {
        console.error('Error loading console:', error);
        // Fallback to local data
        const fallbackConsole = fallbackConsoles.find(c => 
          c.id === parseInt(consoleId) || c.id.toString() === consoleId
        );
        setConsole(fallbackConsole || null);
      } finally {
        setLoading(false);
      }
    }
    loadConsole();
  }, [consoleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent-red mb-4"></div>
          <p className="text-gray-600 text-lg">Loading console details...</p>
        </div>
      </div>
    );
  }

  if (!console) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-black text-black mb-4">Console Not Found</h1>
          <Link href="/" className="text-accent-red hover:text-accent-dark-red font-semibold">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-JM', {
      style: 'currency',
      currency: 'JMD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const addToCart = (product, type = 'purchase') => {
    const cartItem = {
      ...product,
      type, // 'purchase' or 'rental'
      rentalPlan: type === 'rental' ? selectedPlan : null,
      quantity: 1
    };
    
    // In a real app, this would update global cart state
    alert(`${type === 'rental' ? 'Rental' : 'Product'} added to cart!`);
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
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img
                src="/logo.png"
                alt="YaadPlay Logo"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-accent-red transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden md:inline">Back to Shop</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Product Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="w-full h-96 md:h-[500px] bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
              {(() => {
                const images = console.images || (console.image ? [console.image] : []);
                const currentImage = images[selectedImage] || console.image;
                return currentImage ? (
                  <img
                    src={currentImage}
                    alt={console.name}
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <Gamepad2 className="w-32 h-32 text-gray-300" />
                );
              })()}
            </div>
            {(() => {
              const images = console.images || (console.image ? [console.image] : []);
              return images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg border-2 overflow-hidden flex-shrink-0 ${
                        selectedImage === index
                          ? 'border-accent-red'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${console.name} view ${index + 1}`}
                        className="w-full h-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              );
            })()}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              {console.featured && (
                <span className="inline-block px-3 py-1 bg-accent-red text-white text-xs font-bold rounded mb-3">
                  HOT
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-black text-black mb-4">{console.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(console.rating)
                        ? 'fill-accent-red text-accent-red'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-gray-600 ml-2">({console.rating})</span>
              </div>
              <p className="text-lg text-gray-700 mb-6">{console.description}</p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="text-4xl font-black text-accent-red mb-2">
                {formatPrice(console.price)}
              </div>
              {console.inStock ? (
                <span className="text-green-600 font-semibold flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  In Stock
                </span>
              ) : (
                <span className="text-accent-red font-semibold">Out of Stock</span>
              )}
            </div>

            {/* Purchase Button */}
            <button
              onClick={() => addToCart(console, 'purchase')}
              disabled={!console.inStock}
              className={`w-full py-4 rounded-lg font-bold text-lg mb-6 transition-all ${
                console.inStock
                  ? 'bg-accent-red text-white hover:bg-accent-dark-red'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                {console.inStock ? 'Add to Cart' : 'Out of Stock'}
              </span>
            </button>

            {/* Features */}
            {console.specifications && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-black text-black mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {console.specifications.features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-accent-red flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}
        {console.specifications && (
          <section className="mb-16">
            <h2 className="text-3xl font-black text-black mb-6">Specifications</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(console.specifications).map(([key, value]) => {
                  if (key === 'features') return null;
                  return (
                    <div key={key} className="border-b border-gray-200 pb-3">
                      <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-lg font-semibold text-black">{value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Rental Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-black mb-2">Console Rental Plans</h2>
            <p className="text-gray-600 text-lg">
              Try before you buy! Rent any console and get discounts on purchase
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {rentalPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white border-2 rounded-lg p-6 relative transition-all hover:shadow-lg ${
                  plan.popular
                    ? 'border-accent-red shadow-lg scale-105'
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent-red text-white px-4 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="w-8 h-8 text-accent-red" />
                  </div>
                  <h3 className="text-2xl font-black text-black mb-2">{plan.name}</h3>
                  <div className="text-sm text-gray-500 mb-4">{plan.duration}</div>
                  <div className="text-3xl font-black text-accent-red mb-2">
                    {formatPrice(plan.price)}
                  </div>
                  <div className="text-sm text-gray-600">{plan.discount}</div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-accent-red flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    addToCart(console, 'rental');
                  }}
                  className={`w-full py-3 rounded-lg font-bold transition-all ${
                    plan.popular
                      ? 'bg-accent-red text-white hover:bg-accent-dark-red'
                      : 'bg-gray-100 text-black hover:bg-gray-200'
                  }`}
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>

          {/* Rental Info */}
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-black text-black mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-accent-red" />
              Rental Terms & Conditions
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-start gap-3">
                <Package className="w-5 h-5 text-accent-red flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold mb-1">What's Included</div>
                  <div className="text-sm">Console, all cables, controllers, and original packaging</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent-red flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold mb-1">Delivery</div>
                  <div className="text-sm">Free delivery and pickup within Kingston and St. Andrew</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-accent-red flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold mb-1">Security Deposit</div>
                  <div className="text-sm">A security deposit may be required (refundable upon return)</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-accent-red flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold mb-1">Purchase Discount</div>
                  <div className="text-sm">Rental fees can be applied toward purchase price</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

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

