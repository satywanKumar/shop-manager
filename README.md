# Shop Product Management REST API 🛍️

A complete REST API that allows you to manage your shop's products.

## Features ✨

- ✅ Add new products
- ✅ View product list
- ✅ Update products
- ✅ Delete products
- ✅ Track product sales
- ✅ Manage inventory
- ✅ Add stock

## Installation 📦

### Requirements
- Node.js (v12 or higher)
- MongoDB (local or MongoDB Atlas)

### Setup Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Create .env file and set MongoDB URI:**
```
MONGODB_URI=mongodb://localhost:27017/shop_products
PORT=5000
NODE_ENV=development
```

3. **Start the server:**
```bash
npm start
```

Or in development mode:
```bash
npm run dev
```

## API Endpoints 📡

### 1. View All Products
```
GET /api/products
```

### 2. View a Single Product (by ID)
```
GET /api/products/:id
```

### 3. Add a New Product
```
POST /api/products
Body:
{
  "name": "Laptop",
  "description": "High performance laptop",
  "price": 50000,
  "quantity": 10,
  "category": "Electronics",
  "sku": "LAP001"
}
```

### 4. Update a Product
```
PUT /api/products/:id
Body:
{
  "name": "Updated Name",
  "price": 55000,
  "quantity": 15
}
```

### 5. Sell a Product (Decrease Quantity and Increase Sold)
```
PATCH /api/products/:id/sell
Body:
{
  "quantity": 2
}
```

**Response:**
```json
{
  "success": true,
  "message": "2 products successfully sold",
  "data": {
    "productName": "Laptop",
    "quantitySold": 2,
    "remainingQuantity": 8,
    "totalSold": 2
  }
}
```

### 6. Stock Add करें
```
PATCH /api/products/:id/add-stock
Body:
{
  "quantity": 5
}
```

**Response:**
```json
{
  "success": true,
  "message": "5 units stock में add किए गए",
  "data": {
    "productName": "Laptop",
    "quantityAdded": 5,
    "totalQuantity": 13
  }
}
```

### 7. Product Delete करें
```
DELETE /api/products/:id
```

### 8. Inventory Summary देखें
```
GET /api/products/inventory/summary
```

**Response:**
```json
{
  "success": true,
  "message": "Inventory summary",
  "data": {
    "totalProducts": 3,
    "totalQuantityInStock": 45,
    "totalSold": 10,
    "totalInventoryValue": 500000,
    "products": [
      {
        "name": "Laptop",
        "inStock": 10,
        "sold": 5,
        "price": 50000,
        "value": 500000
      }
    ]
  }
}
```

## MongoDB Schema 📋

```javascript
Product {
  name: String (required),
  description: String,
  price: Number (required, min: 0),
  quantity: Number (default: 0, min: 0),
  sold: Number (default: 0),
  sku: String (unique),
  category: String,
  createdAt: DateTime,
  updatedAt: DateTime
}
```

## Example Usage 💡

### Postman या cURL से test करें:

```bash
# सभी products देखें
curl http://localhost:5000/api/products

# नया product add करें
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mobile Phone",
    "price": 25000,
    "quantity": 20,
    "category": "Electronics"
  }'

# 2 products sell करें
curl -X PATCH http://localhost:5000/api/products/PRODUCT_ID/sell \
  -H "Content-Type: application/json" \
  -d '{"quantity": 2}'
```

## Project Structure 📁

```
project-root/
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   └── Product.js         # Product schema
├── routes/
│   └── products.js        # Product API routes
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Environment variables
└── README.md              # This file
```

## Tips 💡

1. MongoDB को locally चलाने के लिए: `mongod`
2. MongoDB Atlas cloud service का उपयोग भी कर सकते हैं
3. Postman से API को test करें: https://www.postman.com/
4. Production के लिए environment variables को properly set करें

## Common Issues 🔧

**MongoDB connection error:**
- MongoDB server को start करें: `mongod`
- MongoDB URI को .env file में check करें

**Port already in use:**
- .env में PORT बदलें या दूसरी process को बंद करें

## License
ISC
