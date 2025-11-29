// lib/appwrite-example.js
// Example usage of Appwrite in your Next.js application
// This file demonstrates how to use Appwrite with your products/consoles

import { Query } from 'appwrite';
import { fetchDocuments, createDocument, updateDocument, deleteDocument } from './appwrite-utils';

// Example: Fetch all products from Appwrite
export async function getProductsFromAppwrite() {
  try {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
    
    if (!databaseId || !collectionId) {
      console.warn('Appwrite database/collection IDs not configured');
      return [];
    }

    const products = await fetchDocuments(databaseId, collectionId);
    return products;
  } catch (error) {
    console.error('Error fetching products from Appwrite:', error);
    return [];
  }
}

// Example: Fetch a single product by ID
export async function getProductById(productId) {
  try {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
    
    if (!databaseId || !collectionId) {
      console.warn('Appwrite database/collection IDs not configured');
      return null;
    }

    const { getDocument } = await import('./appwrite-utils');
    const product = await getDocument(databaseId, collectionId, productId);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Example: Add a product to Appwrite
export async function addProductToAppwrite(productData) {
  try {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
    
    if (!databaseId || !collectionId) {
      throw new Error('Appwrite database/collection IDs not configured');
    }

    const newProduct = await createDocument(
      databaseId,
      collectionId,
      'unique()', // Auto-generate document ID
      productData
    );
    
    return newProduct;
  } catch (error) {
    console.error('Error adding product to Appwrite:', error);
    throw error;
  }
}

// Example: Update a product in Appwrite
export async function updateProductInAppwrite(productId, productData) {
  try {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
    
    if (!databaseId || !collectionId) {
      throw new Error('Appwrite database/collection IDs not configured');
    }

    const updatedProduct = await updateDocument(
      databaseId,
      collectionId,
      productId,
      productData
    );
    
    return updatedProduct;
  } catch (error) {
    console.error('Error updating product in Appwrite:', error);
    throw error;
  }
}

// Example: Delete a product from Appwrite
export async function deleteProductFromAppwrite(productId) {
  try {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
    
    if (!databaseId || !collectionId) {
      throw new Error('Appwrite database/collection IDs not configured');
    }

    await deleteDocument(databaseId, collectionId, productId);
    return true;
  } catch (error) {
    console.error('Error deleting product from Appwrite:', error);
    throw error;
  }
}

// Example: Search products with queries
export async function searchProducts(searchTerm) {
  try {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
    
    if (!databaseId || !collectionId) {
      console.warn('Appwrite database/collection IDs not configured');
      return [];
    }

    // Example query: search by name
    const queries = [
      Query.search('name', searchTerm)
    ];

    const products = await fetchDocuments(databaseId, collectionId, queries);
    return products;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

// Example: Filter products by category
export async function getProductsByCategory(category) {
  try {
    const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
    
    if (!databaseId || !collectionId) {
      console.warn('Appwrite database/collection IDs not configured');
      return [];
    }

    const queries = [
      Query.equal('category', category)
    ];

    const products = await fetchDocuments(databaseId, collectionId, queries);
    return products;
  } catch (error) {
    console.error('Error filtering products by category:', error);
    return [];
  }
}

