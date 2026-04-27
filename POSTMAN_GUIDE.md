# Postman Collection - Shop Product API

## Postman में Import करने के लिए:

1. Postman खोलें
2. "Collections" में जाएं  
3. "Import" button दबाएं
4. इस पूरी file को copy करके paste करें
5. Import complete!

---

## या Manual तरीके से:

### 1. Add Product

**Type:** POST  
**URL:** `http://localhost:5000/api/products`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Apple iPhone 15 Pro",
  "description": "Latest model with A17 Pro chip and improved camera",
  "price": 119999,
  "quantity": 100,
  "category": "Smartphones",
  "sku": "IPHONE15P001"
}
```

**Test करें - यह सभी 5 requests के लिए एक sample है:**

---

### 2. Get All Products

**Type:** GET  
**URL:** `http://localhost:5000/api/products`

**Expected Response:**
```json
{
  "success": true,
  "message": "सभी products successfully fetch किए गए",
  "data": [
    {
      "_id": "63f8a1b2c3d4e5f6g7h8i9",
      "name": "Apple iPhone 15 Pro",
      "price": 119999,
      "quantity": 100,
      "sold": 0
    }
  ],
  "total": 1
}
```

---

### 3. Get Single Product (by ID)

**Type:** GET  
**URL:** `http://localhost:5000/api/products/{{PRODUCT_ID}}`

**Note:** `{{PRODUCT_ID}}` को actual product ID से replace करें

---

### 4. Update Product

**Type:** PUT  
**URL:** `http://localhost:5000/api/products/{{PRODUCT_ID}}`

**Body (JSON):**
```json
{
  "price": 99999,
  "quantity": 120,
  "description": "Updated description"
}
```

---

### 5. Sell Product

**Type:** PATCH  
**URL:** `http://localhost:5000/api/products/{{PRODUCT_ID}}/sell`

**Body (JSON):**
```json
{
  "quantity": 5
}
```

**Response:**
```json
{
  "success": true,
  "message": "5 products successfully sell हुए",
  "data": {
    "productName": "Apple iPhone 15 Pro",
    "quantitySold": 5,
    "remainingQuantity": 95,
    "totalSold": 5
  }
}
```

---

### 6. Add Stock

**Type:** PATCH  
**URL:** `http://localhost:5000/api/products/{{PRODUCT_ID}}/add-stock`

**Body (JSON):**
```json
{
  "quantity": 20
}
```

---

### 7. Delete Product

**Type:** DELETE  
**URL:** `http://localhost:5000/api/products/{{PRODUCT_ID}}`

---

### 8. Get Inventory Summary

**Type:** GET  
**URL:** `http://localhost:5000/api/products/inventory/summary`

**Response:**
```json
{
  "success": true,
  "message": "Inventory summary",
  "data": {
    "totalProducts": 5,
    "totalQuantityInStock": 350,
    "totalSold": 25,
    "totalInventoryValue": 8500000,
    "products": [
      {
        "name": "Apple iPhone 15 Pro",
        "inStock": 115,
        "sold": 5,
        "price": 119999,
        "value": 13799885
      }
    ]
  }
}
```

---

## Postman Environment Variables

यह optional है, लेकिन आसानी से testing के लिए:

**New Environment बनाएं:**

| Variable | Initial Value | Current Value |
|----------|---------------|---------------|
| base_url | http://localhost:5000 | http://localhost:5000 |
| product_id | (empty) | (fill after creating product) |

फिर URLs में `{{base_url}}/api/products` use करें।

---

## Complete Testing Workflow

```
1️⃣ POST /api/products
   ↓ (Response में _id copy करें)
   ↓
2️⃣ GET /api/products
   ↓ (सभी products देखें)
   ↓
3️⃣ PATCH /api/products/{id}/sell
   ↓ (5 units बेचें)
   ↓
4️⃣ PATCH /api/products/{id}/add-stock
   ↓ (10 units add करें)
   ↓
5️⃣ GET /api/products/inventory/summary
   ↓ (पूरा summary देखें)
   ↓
6️⃣ DELETE /api/products/{id}
   (Optional - अगर delete करना है)
```

---

## cURL Commands (Terminal के लिए)

```bash
# सभी products देखें
curl -X GET http://localhost:5000/api/products

# नया product add करें
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Samsung Galaxy S24",
    "price": 89999,
    "quantity": 50,
    "category": "Smartphones"
  }'

# Product बेचें (5 units)
curl -X PATCH http://localhost:5000/api/products/PRODUCT_ID/sell \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'

# Stock add करें
curl -X PATCH http://localhost:5000/api/products/PRODUCT_ID/add-stock \
  -H "Content-Type: application/json" \
  -d '{"quantity": 10}'

# Inventory summary
curl -X GET http://localhost:5000/api/products/inventory/summary

# Product delete करें
curl -X DELETE http://localhost:5000/api/products/PRODUCT_ID
```

---

## Thunder Client (VS Code)

यदि Postman install नहीं है, तो:
1. VS Code में Thunder Client extension install करें
2. उपर के URLs और methods का use करें
3. Same response मिलेगा

---

**Ready to test? Start with "Add Product"! 🚀**
