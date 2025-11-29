// lib/products-service.js
// Service layer for fetching products from Appwrite with fallback to local data

import { fetchDocuments, getDocument } from './appwrite-utils';
import { Query } from 'appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

// Fallback product data (used if Appwrite is not configured or fails)
const fallbackProducts = [
  {
    id: 1,
    name: 'PlayStation 5 Console',
    category: 'consoles',
    price: 89999,
    image: '/images/ps5/ps5_image01.png',
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
    image: '/images/xbox_x/Gemini_Generated_Image_o64x9no64x9no64x.png',
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
    image: '/images/nintendo_switch2/Gemini_Generated_Image_u41n7su41n7su41n.png',
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
    image: '/images/ps5/ps5_images02.png',
    description: 'All-digital PS5 without disc drive',
    rating: 4.6,
    inStock: false,
    featured: false
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
    featured: false
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
    featured: false
  },
  {
    id: 7,
    name: 'PlayStation Store Gift Card - $50 USD',
    category: 'gift-cards',
    price: 7500,
    image: '/images/ps5_giftcard/Gemini_Generated_Image_29m6ra29m6ra29m6.png',
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
    image: '/images/ps5_giftcard/Gemini_Generated_Image_29m6ra29m6ra29m6.png',
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
    image: '/images/ps5_giftcard/Gemini_Generated_Image_29m6ra29m6ra29m6.png',
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
    image: '/images/ps5_giftcard/Gemini_Generated_Image_29m6ra29m6ra29m6.png',
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
    image: '/images/ps5_giftcard/Gemini_Generated_Image_29m6ra29m6ra29m6.png',
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
    image: '/images/ps5_giftcard/Gemini_Generated_Image_29m6ra29m6ra29m6.png',
    description: 'Redeemable on Xbox Store',
    rating: 5.0,
    inStock: true,
    featured: false
  }
];

/**
 * Transform Appwrite document to match our product structure
 * @param {Object} doc - Appwrite document
 * @returns {Object} Transformed product object
 */
function transformDocument(doc) {
  return {
    id: doc.$id || doc.id,
    name: doc.name,
    category: doc.category,
    price: doc.price,
    image: doc.image,
    description: doc.description,
    rating: doc.rating || 0,
    inStock: doc.inStock !== undefined ? doc.inStock : true,
    featured: doc.featured || false,
    specifications: doc.specifications ? (typeof doc.specifications === 'string' ? JSON.parse(doc.specifications) : doc.specifications) : null,
    images: doc.images || (doc.image ? [doc.image] : [])
  };
}

/**
 * Fetch all products from Appwrite or return fallback data
 * @returns {Promise<Array>} Array of products
 */
export async function getAllProducts() {
  // If Appwrite is not configured, return fallback data
  if (!DATABASE_ID || !COLLECTION_ID) {
    console.log('Appwrite not configured, using fallback data');
    return fallbackProducts;
  }

  try {
    const documents = await fetchDocuments(DATABASE_ID, COLLECTION_ID);
    return documents.map(transformDocument);
  } catch (error) {
    console.error('Error fetching products from Appwrite:', error);
    console.log('Falling back to local data');
    return fallbackProducts;
  }
}

/**
 * Fetch a single product by ID
 * @param {string} productId - Product ID
 * @returns {Promise<Object|null>} Product object or null if not found
 */
export async function getProductById(productId) {
  // If Appwrite is not configured, return from fallback data
  if (!DATABASE_ID || !COLLECTION_ID) {
    return fallbackProducts.find(p => p.id === productId || p.id.toString() === productId) || null;
  }

  try {
    const document = await getDocument(DATABASE_ID, COLLECTION_ID, productId);
    return transformDocument(document);
  } catch (error) {
    console.error('Error fetching product from Appwrite:', error);
    // Fallback to local data
    return fallbackProducts.find(p => p.id === productId || p.id.toString() === productId) || null;
  }
}

/**
 * Fetch products by category
 * @param {string} category - Category to filter by
 * @returns {Promise<Array>} Array of products in the category
 */
export async function getProductsByCategory(category) {
  // If Appwrite is not configured, return from fallback data
  if (!DATABASE_ID || !COLLECTION_ID) {
    return fallbackProducts.filter(p => p.category === category);
  }

  try {
    const queries = [Query.equal('category', category)];
    const documents = await fetchDocuments(DATABASE_ID, COLLECTION_ID, queries);
    return documents.map(transformDocument);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return fallbackProducts.filter(p => p.category === category);
  }
}

/**
 * Search products by name
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Array of matching products
 */
export async function searchProducts(searchTerm) {
  // If Appwrite is not configured, return from fallback data
  if (!DATABASE_ID || !COLLECTION_ID) {
    const term = searchTerm.toLowerCase();
    return fallbackProducts.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.description.toLowerCase().includes(term)
    );
  }

  try {
    const queries = [Query.search('name', searchTerm)];
    const documents = await fetchDocuments(DATABASE_ID, COLLECTION_ID, queries);
    return documents.map(transformDocument);
  } catch (error) {
    console.error('Error searching products:', error);
    const term = searchTerm.toLowerCase();
    return fallbackProducts.filter(p => 
      p.name.toLowerCase().includes(term) || 
      p.description.toLowerCase().includes(term)
    );
  }
}

/**
 * Get featured products
 * @returns {Promise<Array>} Array of featured products
 */
export async function getFeaturedProducts() {
  // If Appwrite is not configured, return from fallback data
  if (!DATABASE_ID || !COLLECTION_ID) {
    return fallbackProducts.filter(p => p.featured);
  }

  try {
    const queries = [Query.equal('featured', true)];
    const documents = await fetchDocuments(DATABASE_ID, COLLECTION_ID, queries);
    return documents.map(transformDocument);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return fallbackProducts.filter(p => p.featured);
  }
}
