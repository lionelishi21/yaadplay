# Appwrite Integration Complete ✅

Your YaadPlay application is now fully integrated with Appwrite! Here's what has been set up:

## What's Been Done

### 1. **Appwrite Client Configuration** (`lib/appwrite.js`)
   - ✅ Client initialized with your credentials
   - ✅ Database, Account, and Storage services exported
   - ✅ Uses environment variables from `.env.local`

### 2. **Product Service Layer** (`lib/products-service.js`)
   - ✅ `getAllProducts()` - Fetch all products from Appwrite
   - ✅ `getProductById()` - Get single product by ID
   - ✅ `getProductsByCategory()` - Filter by category
   - ✅ `searchProducts()` - Search products by name
   - ✅ `getFeaturedProducts()` - Get featured products
   - ✅ Automatic fallback to local data if Appwrite is unavailable

### 3. **Updated Pages**
   - ✅ **Home Page** (`app/page.jsx`) - Now fetches products from Appwrite
   - ✅ **Console Detail Page** (`app/consoles/[id]/page.jsx`) - Fetches console data from Appwrite
   - ✅ Loading states added
   - ✅ Error handling with fallback to local data

### 4. **Environment Variables**
   - ✅ `.env.local` created with your Appwrite credentials
   - ✅ Project ID: `692a4a6f0011eb101475`
   - ✅ Endpoint: `https://nyc.cloud.appwrite.io/v1`

## Next Steps: Set Up Your Database

### Step 1: Create Database in Appwrite Console

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Select your project (`yaadplay`)
3. Navigate to **Databases** → **Create Database**
4. Name: `yaadplay` (or any name you prefer)
5. **Copy the Database ID** - you'll need this!

### Step 2: Create Products Collection

1. In your database, click **Create Collection**
2. Collection ID: `products`
3. Name: `Products`

### Step 3: Add Attributes to Products Collection

Add these attributes (Settings → Attributes → Create Attribute):

| Attribute Key | Type | Size | Required | Array | Default |
|--------------|------|------|----------|-------|---------|
| `name` | string | 255 | Yes | No | - |
| `category` | string | 50 | Yes | No | - |
| `price` | integer | - | Yes | No | 0 |
| `image` | string | 500 | No | No | - |
| `description` | string | 1000 | No | No | - |
| `rating` | double | - | No | No | 0.0 |
| `inStock` | boolean | - | Yes | No | true |
| `featured` | boolean | - | Yes | No | false |
| `specifications` | string | - | No | No | - |
| `images` | string | - | No | Yes | - |

**Important Notes:**
- `specifications` should be stored as a JSON string (you'll need to stringify/parse)
- `images` is an array of strings
- `price` is stored as integer (in cents/smallest currency unit, e.g., 89999 = JMD $89,999)

### Step 4: Create Indexes

Create these indexes for better query performance (Settings → Indexes → Create Index):

1. **Category Index**
   - Key: `category`
   - Type: `key`
   - Attributes: `category`

2. **Featured Index**
   - Key: `featured`
   - Type: `key`
   - Attributes: `featured`

3. **Stock Index**
   - Key: `inStock`
   - Type: `key`
   - Attributes: `inStock`

4. **Search Index**
   - Key: `name_search`
   - Type: `fulltext`
   - Attributes: `name`, `description`

### Step 5: Set Permissions

Go to Settings → Permissions:

- **Read**: `any` (public read access)
- **Create**: `users` (only authenticated users can create)
- **Update**: `users` (only authenticated users can update)
- **Delete**: `users` (only authenticated users can delete)

### Step 6: Add Environment Variables

Add these to your `.env.local`:

```env
NEXT_PUBLIC_APPWRITE_DATABASE_ID=[YOUR_DATABASE_ID]
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=products
```

### Step 7: Configure CORS

1. Go to **Settings** → **Platforms**
2. Click **Add Platform** → **Web App**
3. Add hostnames:
   - For development: `localhost` or `localhost:3000`
   - For production: Your production domain (e.g., `yaadplay.com`)

### Step 8: Migrate Products (Optional)

You can use the migration script or manually add products through the Appwrite Console.

## How It Works

### Automatic Fallback
The application automatically falls back to local product data if:
- Appwrite is not configured (missing environment variables)
- Appwrite connection fails
- Database/collection doesn't exist yet

This means your site will continue working even before you set up the database!

### Data Flow
1. Component requests products → `products-service.js`
2. Service tries Appwrite first
3. If Appwrite fails → Falls back to local data
4. Products displayed to user

## Testing

1. **Without Database**: The app should work with fallback data
2. **With Database**: Add products to Appwrite and they'll appear automatically
3. **Check Console**: Look for "Appwrite not configured" or "Error fetching products" messages

## Troubleshooting

### Products not loading from Appwrite?
- Check `.env.local` has correct Database ID and Collection ID
- Verify CORS is configured for `localhost`
- Check Appwrite Console for any errors
- Check browser console for error messages

### Still seeing fallback data?
- Make sure you've added products to Appwrite
- Verify collection permissions allow public read access
- Check that attribute names match exactly (case-sensitive)

## Need Help?

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Discord](https://discord.gg/appwrite)
- Check `APPWRITE_SETUP.md` for more details

