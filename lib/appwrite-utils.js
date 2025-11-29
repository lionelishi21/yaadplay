// lib/appwrite-utils.js
// Example utility functions for using Appwrite in your Next.js application

import { databases, account, storage } from './appwrite';

/**
 * Example: Fetch documents from a collection
 * @param {string} databaseId - Your Appwrite Database ID
 * @param {string} collectionId - Your Appwrite Collection ID
 * @param {Array} queries - Optional query filters
 * @returns {Promise} List of documents
 */
export async function fetchDocuments(databaseId, collectionId, queries = []) {
  try {
    const response = await databases.listDocuments(databaseId, collectionId, queries);
    return response.documents;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
}

/**
 * Example: Get a single document by ID
 * @param {string} databaseId - Your Appwrite Database ID
 * @param {string} collectionId - Your Appwrite Collection ID
 * @param {string} documentId - Document ID to fetch
 * @returns {Promise} Document data
 */
export async function getDocument(databaseId, collectionId, documentId) {
  try {
    const response = await databases.getDocument(databaseId, collectionId, documentId);
    return response;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
}

/**
 * Example: Create a new document
 * @param {string} databaseId - Your Appwrite Database ID
 * @param {string} collectionId - Your Appwrite Collection ID
 * @param {string} documentId - Optional document ID (auto-generated if not provided)
 * @param {Object} data - Document data
 * @param {Array} permissions - Optional permissions array
 * @returns {Promise} Created document
 */
export async function createDocument(databaseId, collectionId, documentId, data, permissions = null) {
  try {
    const response = await databases.createDocument(
      databaseId,
      collectionId,
      documentId || 'unique()',
      data,
      permissions
    );
    return response;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
}

/**
 * Example: Update a document
 * @param {string} databaseId - Your Appwrite Database ID
 * @param {string} collectionId - Your Appwrite Collection ID
 * @param {string} documentId - Document ID to update
 * @param {Object} data - Updated data
 * @returns {Promise} Updated document
 */
export async function updateDocument(databaseId, collectionId, documentId, data) {
  try {
    const response = await databases.updateDocument(databaseId, collectionId, documentId, data);
    return response;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

/**
 * Example: Delete a document
 * @param {string} databaseId - Your Appwrite Database ID
 * @param {string} collectionId - Your Appwrite Collection ID
 * @param {string} documentId - Document ID to delete
 * @returns {Promise} Empty response
 */
export async function deleteDocument(databaseId, collectionId, documentId) {
  try {
    const response = await databases.deleteDocument(databaseId, collectionId, documentId);
    return response;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

/**
 * Example: Get current user account
 * @returns {Promise} User account data
 */
export async function getCurrentUser() {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Example: Create user session (login)
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Session data
 */
export async function createSession(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}

/**
 * Example: Delete current session (logout)
 * @returns {Promise} Empty response
 */
export async function deleteSession() {
  try {
    const response = await account.deleteSession('current');
    return response;
  } catch (error) {
    console.error('Error deleting session:', error);
    throw error;
  }
}

/**
 * Example: Get file from storage
 * @param {string} bucketId - Storage bucket ID
 * @param {string} fileId - File ID
 * @returns {string} File URL
 */
export function getFilePreview(bucketId, fileId) {
  try {
    return storage.getFilePreview(bucketId, fileId);
  } catch (error) {
    console.error('Error getting file preview:', error);
    throw error;
  }
}

/**
 * Example: Upload file to storage
 * @param {string} bucketId - Storage bucket ID
 * @param {string} fileId - File ID (use 'unique()' for auto-generated)
 * @param {File} file - File object to upload
 * @returns {Promise} Uploaded file data
 */
export async function uploadFile(bucketId, fileId, file) {
  try {
    const response = await storage.createFile(bucketId, fileId || 'unique()', file);
    return response;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

