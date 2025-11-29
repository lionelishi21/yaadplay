# Appwrite Setup Guide

This project is configured to use Appwrite as the backend service. Follow these steps to complete the setup:

## 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Your Appwrite Endpoint (e.g., https://cloud.appwrite.io/v1 or your self-hosted instance)
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://[YOUR_APPWRITE_ENDPOINT]

# Your Appwrite Project ID (found in your Appwrite console)
NEXT_PUBLIC_APPWRITE_PROJECT_ID=[YOUR_PROJECT_ID]

# Optional: Database and Collection IDs (if you're using them)
# NEXT_PUBLIC_APPWRITE_DATABASE_ID=[YOUR_DATABASE_ID]
# NEXT_PUBLIC_APPWRITE_COLLECTION_ID=[YOUR_COLLECTION_ID]
```

## 2. Get Your Appwrite Credentials

1. Go to your [Appwrite Console](https://cloud.appwrite.io) or your self-hosted instance
2. Create a new project or select an existing one
3. Go to **Settings** → **API** to find:
   - **Project ID**: Copy this to `NEXT_PUBLIC_APPWRITE_PROJECT_ID`
   - **API Endpoint**: Copy this to `NEXT_PUBLIC_APPWRITE_ENDPOINT`

## 3. Configure CORS

In your Appwrite console:
1. Select your project
2. Go to **Settings** → **Platforms**
3. Click **Add Platform** → **Web App**
4. Add your hostname:
   - For development: `localhost` or `localhost:3000`
   - For production: Your production domain (e.g., `yaadplay.com`)

## 4. Usage Examples

### Fetch Documents from a Collection

```javascript
import { fetchDocuments } from '@/lib/appwrite-utils';

// In a Server Component or API Route
async function getProducts() {
  const products = await fetchDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID
  );
  return products;
}
```

### In a Client Component

```javascript
'use client';
import { useEffect, useState } from 'react';
import { fetchDocuments } from '@/lib/appwrite-utils';

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID
        );
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    }
    loadProducts();
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.$id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Create a Document

```javascript
import { createDocument } from '@/lib/appwrite-utils';

async function addProduct(productData) {
  try {
    const newProduct = await createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      'unique()', // Auto-generate ID
      productData
    );
    return newProduct;
  } catch (error) {
    console.error('Failed to create product:', error);
  }
}
```

## 5. Available Utilities

The following utility functions are available in `lib/appwrite-utils.js`:

- `fetchDocuments()` - List documents from a collection
- `getDocument()` - Get a single document by ID
- `createDocument()` - Create a new document
- `updateDocument()` - Update an existing document
- `deleteDocument()` - Delete a document
- `getCurrentUser()` - Get current authenticated user
- `createSession()` - Login user
- `deleteSession()` - Logout user
- `getFilePreview()` - Get file URL from storage
- `uploadFile()` - Upload file to storage

## 6. Appwrite Services

The following Appwrite services are exported from `lib/appwrite.js`:

- `client` - Appwrite client instance
- `databases` - Database service
- `account` - Authentication service
- `storage` - File storage service

## Next Steps

1. Set up your database and collections in Appwrite console
2. Configure collection permissions
3. Set up authentication if needed
4. Create storage buckets for file uploads
5. Start using the utility functions in your components!

For more information, visit the [Appwrite Documentation](https://appwrite.io/docs).

