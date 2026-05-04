# API Testing Commands

Quick reference for testing the optimized API endpoints using curl or Postman.

## Base URL

```
http://localhost:3000/api
```

---

## 📦 Products Endpoints

### Get Products (Basic)

```bash
curl "http://localhost:3000/api/products"
```

### Get Products with Pagination

```bash
curl "http://localhost:3000/api/products?page=1&limit=12"
```

### Get Products by Category

```bash
curl "http://localhost:3000/api/products?category=Men&page=1&limit=12"
```

### Get Products with Price Filter

```bash
curl "http://localhost:3000/api/products?minPrice=50&maxPrice=200&page=1"
```

### Get Products with Sort Options

```bash
# Sort by price ascending
curl "http://localhost:3000/api/products?sortBy=priceAsc&page=1"

# Sort by price descending
curl "http://localhost:3000/api/products?sortBy=priceDesc&page=1"

# Sort by popularity (rating)
curl "http://localhost:3000/api/products?sortBy=popularity&page=1"

# Sort by newest
curl "http://localhost:3000/api/products?sortBy=newest&page=1"
```

### Search Products

```bash
curl "http://localhost:3000/api/products?search=shirt&page=1"
```

### Complex Query (Multiple Filters)

```bash
curl "http://localhost:3000/api/products?category=Men&gender=Men&brand=Nike,Adidas&minPrice=50&maxPrice=200&sortBy=priceAsc&page=1&limit=12"
```

### Get Single Product

```bash
curl "http://localhost:3000/api/products/[PRODUCT_ID]"

# Example with real ID
curl "http://localhost:3000/api/products/507f1f77bcf86cd799439011"
```

### Get Similar Products

```bash
curl "http://localhost:3000/api/products/similar/[PRODUCT_ID]"
```

### Get Best Sellers

```bash
curl "http://localhost:3000/api/products/best-seller"
```

### Get New Arrivals (Cached)

```bash
curl "http://localhost:3000/api/products/new-arrivals"
```

---

## 🔍 Query Parameter Combinations

### All Men's Shoes under $100

```bash
curl "http://localhost:3000/api/products?category=Shoes&gender=Men&maxPrice=100&page=1&limit=20"
```

### Women's Summer Collection, Sorted by Newest

```bash
curl "http://localhost:3000/api/products?category=Women&collections=Summer&sortBy=newest&page=1&limit=12"
```

### Specific Brands with Price Range

```bash
curl "http://localhost:3000/api/products?brand=Nike,Adidas,Puma&minPrice=25&maxPrice=150&page=1"
```

### Multiple Colors Filter

```bash
curl "http://localhost:3000/api/products?color=Red,Blue,Black&page=1"
```

### Multiple Sizes Filter

```bash
curl "http://localhost:3000/api/products?size=M,L,XL&page=1"
```

### Material Filter

```bash
curl "http://localhost:3000/api/products?material=Cotton&page=1"
```

---

## 📊 Response Examples

### List Response (page=1, limit=2)

```bash
curl -s "http://localhost:3000/api/products?page=1&limit=2" | jq
```

Response:

```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Product 1",
      "price": 99.99,
      "discountPrice": 79.99,
      "category": "Men",
      "images": [
        {
          "url": "https://res.cloudinary.com/...",
          "altText": "Product image"
        }
      ],
      "rating": 4.5,
      "numReviews": 45,
      "isFeatured": true
    }
  ],
  "pagination": {
    "total": 250,
    "page": 1,
    "limit": 2,
    "pages": 125
  }
}
```

### Single Product Response

```bash
curl -s "http://localhost:3000/api/products/507f1f77bcf86cd799439011" | jq
```

---

## 🎯 Performance Testing

### Test Response Time

```bash
# Linux/Mac
time curl -s "http://localhost:3000/api/products?page=1&limit=12" > /dev/null

# Windows PowerShell
Measure-Command { curl -s "http://localhost:3000/api/products?page=1&limit=12" > $null }
```

### Check Response Size

```bash
# Get size in bytes
curl -s -w '%{size_download}\n' "http://localhost:3000/api/products?page=1&limit=12" -o /dev/null

# Should be around 100-200 KB
```

### Test with Headers

```bash
curl -i "http://localhost:3000/api/products?page=1&limit=12"
# Look for Content-Length header to see response size
```

---

## 🖼️ Image URL Optimization Examples

### Original URL (from response)

```
https://res.cloudinary.com/dtvueqy4l/image/upload/v1234567890/product.jpg
```

### Optimized for Thumbnail (150px)

```
https://res.cloudinary.com/dtvueqy4l/image/upload/w_150,q_auto,f_auto/v1234567890/product.jpg
```

### Optimized for Small Device (300px)

```
https://res.cloudinary.com/dtvueqy4l/image/upload/w_300,q_auto,f_auto/v1234567890/product.jpg
```

### Optimized for Medium (600px)

```
https://res.cloudinary.com/dtvueqy4l/image/upload/w_600,q_auto,f_auto/v1234567890/product.jpg
```

### Optimized for Large (900px)

```
https://res.cloudinary.com/dtvueqy4l/image/upload/w_900,q_auto,f_auto/v1234567890/product.jpg
```

### WebP Format (better compression)

```
https://res.cloudinary.com/dtvueqy4l/image/upload/w_600,q_auto,f_webp/v1234567890/product.jpg
```

---

## 🧪 Full Test Scenarios

### Scenario 1: Browse Products by Category

```bash
# Get first page of Men's products
curl "http://localhost:3000/api/products?category=Men&page=1&limit=12"

# Click page 2
curl "http://localhost:3000/api/products?category=Men&page=2&limit=12"

# View a specific product
curl "http://localhost:3000/api/products/[PRODUCT_ID_FROM_RESPONSE]"

# See similar products
curl "http://localhost:3000/api/products/similar/[PRODUCT_ID_FROM_RESPONSE]"
```

### Scenario 2: Apply Price Filter

```bash
# Show $50-$200 products
curl "http://localhost:3000/api/products?minPrice=50&maxPrice=200&page=1&limit=12"

# Sort by price ascending
curl "http://localhost:3000/api/products?minPrice=50&maxPrice=200&sortBy=priceAsc&page=1&limit=12"
```

### Scenario 3: Search & Filter

```bash
# Search for "shirt" in Men's category
curl "http://localhost:3000/api/products?search=shirt&category=Men&page=1&limit=12"

# Add price filter to search results
curl "http://localhost:3000/api/products?search=shirt&category=Men&minPrice=20&maxPrice=80&page=1&limit=12"
```

### Scenario 4: Home Page Content

```bash
# Get featured/best sellers
curl "http://localhost:3000/api/products/best-seller"

# Get new arrivals (cached endpoint)
curl "http://localhost:3000/api/products/new-arrivals"

# Get featured products (filtered in response)
curl "http://localhost:3000/api/products?isFeatured=true&limit=12"
```

---

## 📈 Monitoring Commands

### Check Database Performance

```bash
# In MongoDB shell
db.products.find().explain("executionStats")

# Check indexes
db.products.getIndexes()
```

### Monitor API Health

```bash
# Setup periodic monitoring (every 5 seconds)
watch -n 5 'curl -s "http://localhost:3000/api/products?page=1&limit=5" | jq ".pagination"'
```

### Load Test (requires Apache Bench)

```bash
# Simple load test: 100 requests, 10 concurrent
ab -n 100 -c 10 "http://localhost:3000/api/products?page=1&limit=12"
```

---

## ✅ Verification Checklist

After implementing optimizations, verify:

- [ ] `curl "http://localhost:3000/api/products?page=1&limit=12"` returns pagination object
- [ ] Response time is < 500ms: `time curl ... > /dev/null`
- [ ] Payload size is < 200KB: `curl -w '%{size_download}' ... -o /dev/null`
- [ ] Images include optimization URLs: `curl ... | grep "?w="`
- [ ] Best sellers returns array: `curl "http://localhost:3000/api/products/best-seller"`
- [ ] New arrivals returns cached: `curl "http://localhost:3000/api/products/new-arrivals"`
- [ ] Similar products works: `curl "http://localhost:3000/api/products/similar/[ID]"`

---

## 🐛 Debugging

### Check Request Headers

```bash
curl -i "http://localhost:3000/api/products?page=1&limit=12"
```

### Pretty Print JSON Response

```bash
curl -s "http://localhost:3000/api/products?page=1&limit=12" | jq
```

### Save Response to File

```bash
curl -s "http://localhost:3000/api/products?page=1&limit=12" > response.json
```

### Check Specific Field

```bash
curl -s "http://localhost:3000/api/products?page=1&limit=1" | jq ".products[0].images"
```

### Count Total Products

```bash
curl -s "http://localhost:3000/api/products?page=1&limit=1" | jq ".pagination.total"
```

---

## 🚀 Ready to Test!

Start your backend:

```bash
cd Backend
npm install
npm run dev
```

Then run any of the curl commands above in another terminal.
