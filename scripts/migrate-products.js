// scripts/migrate-products.js
// Migration script to populate Appwrite with existing product data
// Run with: node scripts/migrate-products.js

require('dotenv').config({ path: '.env.local' });
const { Client, Databases, ID } = require('appwrite');

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

// Product data from your application
const products = [
  // Gaming Consoles
  {
    name: 'PlayStation 5 Console',
    category: 'consoles',
    price: 89999,
    image: '/images/ps5/ps5_image01.png',
    description: 'Next-gen gaming console with 4K gaming and ray tracing',
    rating: 4.8,
    inStock: true,
    featured: true,
    specifications: JSON.stringify({
      processor: 'AMD Zen 2-based CPU with 8 cores',
      graphics: 'AMD RDNA 2-based GPU with 10.28 TFLOPS',
      memory: '16GB GDDR6',
      storage: '825GB Custom SSD',
      output: '4K UHD, 8K, HDR',
      features: ['Ray Tracing', '3D Audio', 'Backward Compatibility', 'DualSense Controller']
    }),
    images: ['/images/ps5/ps5_image01.png', '/images/ps5/ps5_images02.png']
  },
  {
    name: 'Xbox Series X',
    category: 'consoles',
    price: 84999,
    image: '/images/xbox_x/Gemini_Generated_Image_o64x9no64x9no64x.png',
    description: 'Most powerful Xbox ever with 4K gaming',
    rating: 4.7,
    inStock: true,
    featured: true,
    specifications: JSON.stringify({
      processor: 'AMD Zen 2-based CPU with 8 cores',
      graphics: 'AMD RDNA 2-based GPU with 12.15 TFLOPS',
      memory: '16GB GDDR6',
      storage: '1TB Custom NVMe SSD',
      output: '4K UHD, 8K, HDR',
      features: ['Ray Tracing', 'Quick Resume', 'Backward Compatibility', 'Xbox Game Pass']
    }),
    images: ['/images/xbox_x/Gemini_Generated_Image_o64x9no64x9no64x.png']
  },
  {
    name: 'Nintendo Switch OLED',
    category: 'consoles',
    price: 49999,
    image: '/images/nintendo_switch2/Gemini_Generated_Image_u41n7su41n7su41n.png',
    description: 'Enhanced OLED display for vibrant gaming',
    rating: 4.9,
    inStock: true,
    featured: false,
    specifications: JSON.stringify({
      processor: 'NVIDIA Custom Tegra',
      graphics: 'NVIDIA GPU',
      memory: '4GB',
      storage: '64GB Internal Storage',
      output: '720p Handheld, 1080p Docked',
      features: ['OLED Display', 'Handheld & Docked', 'Joy-Con Controllers', 'Nintendo eShop']
    }),
    images: ['/images/nintendo_switch2/Gemini_Generated_Image_u41n7su41n7su41n.png']
  },
  {
    name: 'PlayStation 5 Digital Edition',
    category: 'consoles',
    price: 79999,
    image: '/images/ps5/ps5_images02.png',
    description: 'All-digital PS5 without disc drive',
    rating: 4.6,
    inStock: false,
    featured: false,
    specifications: JSON.stringify({
      processor: 'AMD Zen 2-based CPU with 8 cores',
      graphics: 'AMD RDNA 2-based GPU with 10.28 TFLOPS',
      memory: '16GB GDDR6',
      storage: '825GB Custom SSD',
      output: '4K UHD, 8K, HDR',
      features: ['Ray Tracing', '3D Audio', 'Backward Compatibility', 'DualSense Controller', 'Digital Only']
    }),
    images: ['/images/ps5/ps5_images02.png', '/images/ps5/ps5_image01.png']
  },
  {
    name: 'Xbox One',
    category: 'consoles',
    price: 44999,
    image: '/images/xbox_one/Gemini_Generated_Image_jsg42ljsg42ljsg4.png',
    description: 'Previous generation Xbox console',
    rating: 4.5,
    inStock: true,
    featured: false,
    specifications: JSON.stringify({
      processor: 'AMD Custom CPU',
      graphics: 'AMD GPU',
      memory: '8GB DDR3',
      storage: '500GB/1TB HDD',
      output: '1080p, 4K UHD',
      features: ['Xbox Game Pass', 'Backward Compatibility', 'Xbox Live', 'Media Streaming']
    }),
    images: ['/images/xbox_one/Gemini_Generated_Image_jsg42ljsg42ljsg4.png']
  },
  {
    name: 'PlayStation 5 Controller',
    category: 'consoles',
    price: 9999,
    image: '/images/ps5_controller/Gemini_Generated_Image_wogvpowogvpowogv.png',
    description: 'DualSense wireless controller for PS5',
    rating: 4.7,
    inStock: true,
    featured: false,
    specifications: JSON.stringify({
      connectivity: 'Bluetooth, USB-C',
      battery: 'Built-in rechargeable battery',
      features: ['Haptic Feedback', 'Adaptive Triggers', 'Touch Pad', 'Motion Sensors', 'Built-in Microphone'],
      compatibility: 'PS5, PC, Mobile'
    }),
    images: ['/images/ps5_controller/Gemini_Generated_Image_wogvpowogvpowogv.png']
  },
  // Gift Cards
  {
    name: 'PlayStation Store Gift Card - $50 USD',
    category: 'gift-cards',
    price: 7500,
    image: '/images/ps5_giftcard/Gemini_Generated_Image_29m6ra29m6ra29m6.png',
    description: 'Redeemable on PlayStation Store',
    rating: 5.0,
    inStock: true,
    featured: true,
    specifications: null,
    images: []
  },
  {
    name: 'Xbox Live Gift Card - $50 USD',
    category: 'gift-cards',
    price: 7500,
    image: '/images/ps5_giftcard/Gemini_Generated_Image_29m6ra29m6ra29m6.png',
    description: 'Redeemable on Xbox Store',
    rating: 5.0,
    inStock: true,
    featured: true,
    specifications: null,
    images: []
  },
  {
    name: 'Nintendo eShop Gift Card - $50 USD',
    category: 'gift-cards',
    price: 7500,
    image: '/images/ps5_giftcard/Gemini_Generated_Image_29m6ra29m6ra29m6.png',
    description: 'Redeemable on Nintendo eShop',
    rating: 5.0,
    inStock: true,
    featured: false,
    specifications: null,
    images: []
  },
  {
    name: 'Steam Gift Card - $50 USD',
    category: 'gift-cards',
    price: 7500,
    image: '/images/ps5_giftcard/Gemini_Generated_Image_29m6ra29m6ra29m6.png',
    description: 'Redeemable on Steam',
    rating: 5.0,
    inStock: true,
    featured: false,
    specifications: null,
    images: []
  },
  {
    name: 'PlayStation Store Gift Card - $100 USD',
    category: 'gift-cards',
    price: 15000,
    image: '/images/ps5_giftcard/Gemini_Generated_Image_29m6ra29m6ra29m6.png',
    description: 'Redeemable on PlayStation Store',
    rating: 5.0,
    inStock: true,
    featured: false,
    specifications: null,
    images: []
  },
  {
    name: 'Xbox Live Gift Card - $100 USD',
    category: 'gift-cards',
    price: 15000,
    image: '/images/ps5_giftcard/Gemini_Generated_Image_29m6ra29m6ra29m6.png',
    description: 'Redeemable on Xbox Store',
    rating: 5.0,
    inStock: true,
    featured: false,
    specifications: null,
    images: []
  },
];

async function migrateProducts() {
  const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID;

  if (!databaseId || !collectionId) {
    console.error('❌ Error: Database ID or Collection ID not found in environment variables');
    console.log('Please add these to your .env.local file:');
    console.log('NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id');
    console.log('NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID=your_collection_id');
    process.exit(1);
  }

  console.log('🚀 Starting product migration...');
  console.log(`📦 Database ID: ${databaseId}`);
  console.log(`📋 Collection ID: ${collectionId}`);
  console.log(`📊 Products to migrate: ${products.length}\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const product of products) {
    try {
      const document = await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        {
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          description: product.description,
          rating: product.rating,
          inStock: product.inStock,
          featured: product.featured,
          specifications: product.specifications || '',
          images: product.images || []
        }
      );
      console.log(`✅ Created: ${product.name}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error creating ${product.name}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n📊 Migration Summary:');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📦 Total: ${products.length}`);
}

migrateProducts().catch(console.error);
