/*
 * PRODUCT API - EXAMPLE TEST CASES
 * 
 * Use these examples in Postman or Thunder Client
 * Or run them from cURL command line
 */

// ============================================
// 1. Add a New Product
// ============================================

// Request Type: POST
// URL: http://localhost:5000/api/products
// Body (JSON):
{
  "name": "Apple iPhone 15",
  "description": "Latest Apple smartphone with A17 Pro chip",
  "price": 79999,
  "quantity": 50,
  "category": "Mobile Phones",
  "sku": "IPHONE15001"
}

// Expected Response:
{
  "success": true,
  "message": "Product successfully added",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0",
    "name": "Apple iPhone 15",
    "description": "Latest Apple smartphone with A17 Pro chip",
    "price": 79999,
    "quantity": 50,
    "sold": 0,
    "category": "Mobile Phones",
    "sku": "IPHONE15001",
    "createdAt": "2024-04-27T10:30:00.000Z",
    "updatedAt": "2024-04-27T10:30:00.000Z"
  }
}

// ============================================
// 2. View All Products
// ============================================

// Request Type: GET
// URL: http://localhost:5000/api/products

// Expected Response:
{
  "success": true,
  "message": "All products successfully fetched",
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0",
      "name": "Apple iPhone 15",
      "price": 79999,
      "quantity": 50,
      "sold": 0,
      "category": "Mobile Phones"
    }
  ],
  "total": 1
}

// ============================================
// 3. View a Single Product (by ID)
// ============================================

// Request Type: GET
// URL: http://localhost:5000/api/products/65a1b2c3d4e5f6g7h8i9j0

// Expected Response:
{
  "success": true,
  "message": "Product successfully fetched",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0",
    "name": "Apple iPhone 15",
    "description": "Latest Apple smartphone with A17 Pro chip",
    "price": 79999,
    "quantity": 50,
    "sold": 0,
    "category": "Mobile Phones",
    "sku": "IPHONE15001"
  }
}

// ============================================
// 4. Update a Product
// ============================================

// Request Type: PUT
// URL: http://localhost:5000/api/products/65a1b2c3d4e5f6g7h8i9j0
// Body (JSON):
{
  "price": 75999,
  "quantity": 45
}

// Expected Response:
{
  "success": true,
  "message": "Product successfully updated",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0",
    "name": "Apple iPhone 15",
    "price": 75999,
    "quantity": 45,
    "sold": 0
  }
}

// ============================================
// 5. Sell a Product (2 units)
// ============================================

// Request Type: PATCH
// URL: http://localhost:5000/api/products/65a1b2c3d4e5f6g7h8i9j0/sell
// Body (JSON):
{
  "quantity": 2
}

// Expected Response:
{
  "success": true,
  "message": "2 products successfully sold",
  "data": {
    "productName": "Apple iPhone 15",
    "quantitySold": 2,
    "remainingQuantity": 43,
    "totalSold": 2
  }
}

// ============================================
// 6. Add Stock
// ============================================

// Request Type: PATCH
// URL: http://localhost:5000/api/products/65a1b2c3d4e5f6g7h8i9j0/add-stock
// Body (JSON):
{
  "quantity": 10
}

// Expected Response:
{
  "success": true,
  "message": "10 units added to stock",
  "data": {
    "productName": "Apple iPhone 15",
    "quantityAdded": 10,
    "totalQuantity": 53
  }
}

// ============================================
// 7. View Inventory Summary
// ============================================

// Request Type: GET
// URL: http://localhost:5000/api/products/inventory/summary

// Expected Response:
{
  "success": true,
  "message": "Inventory summary",
  "data": {
    "totalProducts": 5,
    "totalQuantityInStock": 250,
    "totalSold": 15,
    "totalInventoryValue": 5000000,
    "products": [
      {
        "name": "Apple iPhone 15",
        "inStock": 53,
        "sold": 2,
        "price": 75999,
        "value": 4026747
      }
    ]
  }
}

// ============================================
// 8. Delete a Product
// ============================================

// Request Type: DELETE
// URL: http://localhost:5000/api/products/65a1b2c3d4e5f6g7h8i9j0

// Expected Response:
{
  "success": true,
  "message": "Product successfully deleted",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0",
    "name": "Apple iPhone 15",
    "price": 75999,
    "quantity": 53,
    "sold": 2
  }
}

// ============================================
// CURL COMMANDS (Terminal से use करें)
// ============================================

/*
// सभी products देखें
curl http://localhost:5000/api/products

// नया product add करें
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Samsung Galaxy S24",
    "price": 89999,
    "quantity": 30,
    "category": "Mobile Phones"
  }'

// Product बेचें
curl -X PATCH http://localhost:5000/api/products/65a1b2c3d4e5f6g7h8i9j0/sell \
  -H "Content-Type: application/json" \
  -d '{"quantity": 3}'

// Stock add करें
curl -X PATCH http://localhost:5000/api/products/65a1b2c3d4e5f6g7h8i9j0/add-stock \
  -H "Content-Type: application/json" \
  -d '{"quantity": 5}'

// Inventory summary
curl http://localhost:5000/api/products/inventory/summary

// Product delete करें
curl -X DELETE http://localhost:5000/api/products/65a1b2c3d4e5f6g7h8i9j0
*/
