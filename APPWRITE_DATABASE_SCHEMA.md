# Appwrite Database Schema for YaadPlay

This document describes the database structure needed for the YaadPlay e-commerce platform.

## Database Setup

1. **Create a Database** in Appwrite Console:
   - Name: `yaadplay`
   - Database ID: (will be generated, save this for `.env.local`)

## Collections

### 1. Products Collection

**Collection ID**: `products` (or your custom ID)

**Attributes**:

| Attribute Key | Type | Size | Required | Array | Default |
|--------------|------|------|-----------|-------|---------|
| `name` | string | 255 | Yes | No | - |
| `category` | string | 50 | Yes | No | - |
| `price` | integer | - | Yes | No | 0 |
| `image` | string | 500 | No | No | - |
| `description` | string | 1000 | Yes | No | - |
| `rating` | double | - | No | No | 0 |
| `inStock` | boolean | - | Yes | No | true |
| `featured` | boolean | - | Yes | No | false |
| `specifications` | string | - | No | No | - |
| `images` | string | - | No | Yes | - |

**Indexes**:
- `category` (key: `category`, type: `key`)
- `featured` (key: `featured`, type: `key`)
- `inStock` (key: `inStock`, type: `key`)
- `name_search` (key: `name`, type: `fulltext`)

**Permissions**:
- **Read**: `any` (public read access)
- **Create**: `users` (only authenticated users can create)
- **Update**: `users` (only authenticated users can update)
- **Delete**: `users` (only authenticated users can delete)

### 2. Rental Plans Collection (Optional)

**Collection ID**: `rental_plans`

**Attributes**:

| Attribute Key | Type | Size | Required | Array | Default |
|--------------|------|------|-----------|-------|---------|
| `name` | string | 100 | Yes | No | - |
| `duration` | string | 50 | Yes | No | - |
| `price` | integer | - | Yes | No | 0 |
| `discount` | string | 100 | No | No | - |
| `features` | string | - | No | Yes | - |
| `popular` | boolean | - | Yes | No | false |

**Indexes**:
- `popular` (key: `popular`, type: `key`)

**Permissions**:
- **Read**: `any` (public read access)
- **Create/Update/Delete**: `users` (only authenticated users)

## Environment Variables

Add these to your `.env.local`:

```env
NEXT_PUBLIC_APPWRITE_DATABASE_ID=[YOUR_DATABASE_ID]
NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID=[YOUR_PRODUCTS_COLLECTION_ID]
NEXT_PUBLIC_APPWRITE_RENTAL_PLANS_COLLECTION_ID=[YOUR_RENTAL_PLANS_COLLECTION_ID]
```

## Data Structure Notes

### Products Collection

- `specifications`: Store as JSON string (Appwrite doesn't support nested objects directly)
- `images`: Store as array of strings
- `price`: Store as integer (in cents/smallest currency unit, e.g., 89999 = JMD $89,999)

### Example Product Document

```json
{
  "$id": "unique_document_id",
  "name": "PlayStation 5 Console",
  "category": "consoles",
  "price": 89999,
  "image": "/images/ps5/ps5_image01.png",
  "description": "Next-gen gaming console with 4K gaming and ray tracing",
  "rating": 4.8,
  "inStock": true,
  "featured": true,
  "specifications": "{\"processor\":\"AMD Zen 2-based CPU\",\"graphics\":\"AMD RDNA 2-based GPU\",\"memory\":\"16GB GDDR6\",\"storage\":\"825GB Custom SSD\",\"output\":\"4K UHD, 8K, HDR\",\"features\":[\"Ray Tracing\",\"3D Audio\",\"Backward Compatibility\",\"DualSense Controller\"]}",
  "images": ["/images/ps5/ps5_image01.png", "/images/ps5/ps5_images02.png"]
}
```

## Setup Instructions

1. **Create Database**:
   - Go to Appwrite Console → Databases
   - Click "Create Database"
   - Name it "yaadplay"
   - Copy the Database ID

2. **Create Products Collection**:
   - Click "Create Collection"
   - Name it "products"
   - Add all attributes listed above
   - Set up indexes
   - Configure permissions
   - Copy the Collection ID

3. **Add Environment Variables**:
   - Add Database ID and Collection IDs to `.env.local`

4. **Run Migration Script**:
   - Use the migration script to populate initial data

