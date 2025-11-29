# Appwrite Database Schema

## Database: `yaadplay`

### Collection: `products`

This collection stores all products (consoles and gift cards).

#### Attributes:

| Attribute Name | Type | Size | Required | Array | Default |
|---------------|------|------|----------|-------|---------|
| `name` | string | 255 | Yes | No | - |
| `category` | string | 50 | Yes | No | - |
| `price` | integer | - | Yes | No | 0 |
| `image` | string | 500 | Yes | No | - |
| `description` | string | 1000 | No | No | - |
| `rating` | double | - | No | No | 0.0 |
| `inStock` | boolean | - | Yes | No | true |
| `featured` | boolean | - | Yes | No | false |
| `specifications` | string | - | No | No | - |
| `images` | string | - | No | Yes | - |

#### Indexes:

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
   - Key: `name`
   - Type: `fulltext`
   - Attributes: `name`, `description`

#### Permissions:

- **Read**: `any` (public read access)
- **Create**: `users` (only authenticated users can create)
- **Update**: `users` (only authenticated users can update)
- **Delete**: `users` (only authenticated users can delete)

---

## Setup Instructions

### 1. Create Database

1. Go to Appwrite Console → Databases
2. Click "Create Database"
3. Name: `yaadplay`
4. Database ID: `yaadplay` (or auto-generated)

### 2. Create Collection

1. In your database, click "Create Collection"
2. Collection ID: `products`
3. Name: `Products`

### 3. Add Attributes

Add each attribute listed above using the Appwrite Console interface.

**Important Notes:**
- `specifications` should be stored as JSON string (you'll need to stringify/parse)
- `images` is an array of strings
- `price` is stored as integer (in cents/smallest currency unit)

### 4. Create Indexes

Create the indexes listed above for better query performance.

### 5. Set Permissions

Configure permissions as specified above.

---

## Example Document Structure

```json
{
  "$id": "692a4a6f0011eb101475",
  "$createdAt": "2024-01-01T00:00:00.000Z",
  "$updatedAt": "2024-01-01T00:00:00.000Z",
  "$permissions": [],
  "name": "PlayStation 5 Console",
  "category": "consoles",
  "price": 89999,
  "image": "/images/ps5/ps5_image01.png",
  "description": "Next-gen gaming console with 4K gaming and ray tracing",
  "rating": 4.8,
  "inStock": true,
  "featured": true,
  "specifications": "{\"processor\":\"AMD Zen 2-based CPU with 8 cores\",\"graphics\":\"AMD RDNA 2-based GPU with 10.28 TFLOPS\",\"memory\":\"16GB GDDR6\",\"storage\":\"825GB Custom SSD\",\"output\":\"4K UHD, 8K, HDR\",\"features\":[\"Ray Tracing\",\"3D Audio\",\"Backward Compatibility\",\"DualSense Controller\"]}",
  "images": [
    "/images/ps5/ps5_image01.png",
    "/images/ps5/ps5_images02.png"
  ]
}
```

