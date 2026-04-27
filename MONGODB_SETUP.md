# MongoDB Installation Guide

## Windows पर MongoDB Install करें

### Option 1: MongoDB Community Edition (Recommended)

1. **Download करें:**
   - https://www.mongodb.com/try/download/community पर जाएं
   - Windows के लिए latest version select करें
   - `.msi` file download करें

2. **Install करें:**
   - Downloaded file को double-click करें
   - "Next" बटन दबाते रहें
   - "Install MongoDB Compass" को checked रखें
   - Installation complete होने का wait करें

3. **MongoDB को Start करें:**
   ```bash
   mongod
   ```
   या Windows Services से MongoDB को search करके start करें

4. **Verify करें:**
   ```bash
   mongosh
   ```
   Terminal में यह दिखना चाहिए:
   ```
   > db
   test
   ```

---

### Option 2: MongoDB Atlas (Cloud - Easiest)

**MongoDB Cloud पर free account बनाएं:**

1. https://account.mongodb.com/account/register पर जाएं
2. Account बनाएं (email + password)
3. Login करें
4. "Create a Deployment" पर click करें
5. "Free" option select करें
6. Region select करें (India - ap-south-1 recommended)
7. Cluster name दें: `shop_products`
8. "Create" button दबाएं
9. Database user बनाएं:
   - Username: `shopuser`
   - Password: एक strong password set करें
   - "Add User" button दबाएं

10. **Connection String मिलेगा:**
    ```
    mongodb+srv://shopuser:password@cluster.mongodb.net/shop_products
    ```

11. `.env` file में update करें:
    ```
    MONGODB_URI=mongodb+srv://shopuser:password@cluster.mongodb.net/shop_products
    ```

---

## .env में MongoDB URI Set करें

**Local MongoDB के लिए:**
```
MONGODB_URI=mongodb://localhost:27017/shop_products
PORT=5000
NODE_ENV=development
```

**MongoDB Atlas के लिए:**
```
MONGODB_URI=mongodb+srv://shopuser:YOUR_PASSWORD@cluster.mongodb.net/shop_products
PORT=5000
NODE_ENV=development
```

---

## Server Run करें

```bash
cd "d:\sri bs classes course\prduct mitra"

npm start
```

Success का message:
```
🚀 Server चल रहा है port 5000 पर
📝 API documentation: http://localhost:5000/
```

---

## Browser में Check करें

http://localhost:5000/ पर जाएं

यह JSON दिखना चाहिए:
```json
{
  "message": "🛍️ Shop Product Management API में आपका स्वागत है",
  "version": "1.0.0",
  "endpoints": {
    "getAllProducts": "GET /api/products",
    "addNewProduct": "POST /api/products",
    ...
  }
}
```

---

## Troubleshooting

**MongoDB Connection Error:**
```
error: connect ECONNREFUSED 127.0.0.1:27017
```
👉 `mongod` command से MongoDB start करें

**Port already in use:**
```
Error: listen EADDRINUSE: address already in use :::5000
```
👉 `.env` में PORT को 5001 change करें या existing process को kill करें

**Module not found:**
```
Error: Cannot find module 'express'
```
👉 `npm install` चलाएं

---

अब आप ready हैं! 🚀
