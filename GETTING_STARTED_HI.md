# Shop Product Management API - शुरुआत गाइड 🛍️

## आपका REST API तैयार है!

यह एक पूरी REST API है जिससे आप अपनी shop के products को आसानी से manage कर सकते हैं।

---

## 🚀 शुरुआत करें

### Step 1: MongoDB चलाएं

**अगर आपके पास MongoDB locally install है:**
```bash
mongod
```

**या MongoDB Atlas (Cloud) का उपयोग करें:**
- mongodb.com/cloud/atlas पर account बनाएं
- Connection string copy करें
- `.env` file में `MONGODB_URI` को update करें

### Step 2: Server शुरू करें

```bash
npm start
```

**या development mode में (auto restart):**
```bash
npm run dev
```

आपको यह message दिखना चाहिए:
```
🚀 Server चल रहा है port 5000 पर
📝 API documentation: http://localhost:5000/
```

---

## 📋 मुख्य Features

### 1️⃣ Products Add करें
```javascript
POST /api/products
{
  "name": "Laptop",
  "price": 50000,
  "quantity": 10,
  "category": "Electronics"
}
```

### 2️⃣ Products की List देखें
```javascript
GET /api/products
```

### 3️⃣ Products Sell करें (Inventory से घटाएं)
```javascript
PATCH /api/products/{productId}/sell
{ "quantity": 2 }
```

### 4️⃣ Stock Add करें
```javascript
PATCH /api/products/{productId}/add-stock
{ "quantity": 5 }
```

### 5️⃣ Inventory का Summary देखें
```javascript
GET /api/products/inventory/summary
```

---

## 🧪 API को Test करें

### विकल्प 1: Postman (सबसे आसान)

1. Postman download करें: https://www.postman.com/
2. नया request बनाएं
3. Method चुनें (GET, POST, etc.)
4. URL enter करें: `http://localhost:5000/api/products`
5. Body में JSON data डालें (POST के लिए)
6. Send button दबाएं

### विकल्प 2: Thunder Client (VS Code में)
1. VS Code extension: Thunder Client install करें
2. Same जैसे Postman

### विकल्प 3: cURL (Terminal से)

```bash
# सभी products देखें
curl http://localhost:5000/api/products

# नया product add करें
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Mobile","price":25000,"quantity":20}'

# Product बेचें
curl -X PATCH http://localhost:5000/api/products/{ID}/sell \
  -H "Content-Type: application/json" \
  -d '{"quantity":2}'
```

---

## 📊 Practical Example

### Scenario: आपकी एक electronics shop है

```javascript
// Step 1: 2 products add करें
POST /api/products
{ "name": "iPhone 15", "price": 80000, "quantity": 50 }

POST /api/products
{ "name": "Samsung S24", "price": 90000, "quantity": 30 }

// Step 2: Inventory देखें
GET /api/products/inventory/summary
// Response:
{
  "totalProducts": 2,
  "totalQuantityInStock": 80,
  "totalSold": 0,
  "totalInventoryValue": 4700000
}

// Step 3: 5 iPhone बेचें
PATCH /api/products/{iPhoneId}/sell
{ "quantity": 5 }
// Response: remainingQuantity: 45, totalSold: 5

// Step 4: 10 iPhone का नया stock आए
PATCH /api/products/{iPhoneId}/add-stock
{ "quantity": 10 }
// Response: totalQuantity: 55

// Step 5: Updated summary देखें
GET /api/products/inventory/summary
// अब total sold 5 है और quantity 55 है
```

---

## 📁 Project Structure

```
project/
├── config/
│   └── db.js              👈 MongoDB connection
├── models/
│   └── Product.js         👈 Product ka schema
├── routes/
│   └── products.js        👈 सभी API endpoints
├── server.js              👈 Main server
├── package.json           👈 Dependencies list
├── .env                   👈 Database settings
├── README.md              👈 Full documentation
└── EXAMPLES.js            👈 API examples
```

---

## 🔧 .env File Settings

```
# MongoDB connection
MONGODB_URI=mongodb://localhost:27017/shop_products

# Server port
PORT=5000

# Environment
NODE_ENV=development
```

### MongoDB Atlas से connect करने के लिए:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shop_products
```

---

## ✅ Response Format

सभी responses इसी format में आते हैं:

```javascript
{
  "success": true/false,
  "message": "क्या हुआ (हिंदी में)",
  "data": { /* actual data */ }
}
```

---

## ❌ Common Errors और Solution

| Error | Reason | Solution |
|-------|--------|----------|
| `MongooseServerSelectionError` | MongoDB नहीं चल रहा | `mongod` command चलाएं |
| `EADDRINUSE` | Port 5000 पहले से use हो रहा है | `.env` में PORT बदलें |
| `Cannot find module` | Dependencies नहीं install हैं | `npm install` चलाएं |
| `Name और Price दोनों required` | Data complete नहीं है | सभी required fields भेजें |

---

## 💡 Pro Tips

1. **Production के लिए:**
   - `.env.example` बनाएं credentials के बिना
   - Environment variables को properly set करें
   - `NODE_ENV=production` करें

2. **Database Backup:**
   - MongoDB data को backup रखें
   - Important transactions को log करें

3. **Security:**
   - Authentication add करें (JWT tokens)
   - Password को hash करें (bcrypt)
   - Input validation लगाएं

4. **Performance:**
   - Indexes create करें
   - Pagination add करें
   - Caching लगाएं (Redis)

---

## 📞 API Endpoints Quick Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/products` | सभी products |
| GET | `/api/products/:id` | एक product |
| POST | `/api/products` | नया product |
| PUT | `/api/products/:id` | product update |
| PATCH | `/api/products/:id/sell` | product sell करें |
| PATCH | `/api/products/:id/add-stock` | stock add करें |
| DELETE | `/api/products/:id` | product delete करें |
| GET | `/api/products/inventory/summary` | पूरा summary |

---

## 🎯 Next Steps

1. ✅ MongoDB setup करें
2. ✅ `npm start` से server चलाएं
3. ✅ Postman/cURL से API test करें
4. ✅ अपना data add करें
5. ✅ Features को customize करें

---

**Happy Coding! 🚀**

किसी भी doubts के लिए README.md को पढ़ें या EXAMPLES.js में देखें।
