const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: 'All products successfully fetched',
      data: products,
      total: products.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message,
    });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Product successfully fetched',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message,
    });
  }
});

// Add new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, quantity, sku, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name and Price are both required',
      });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      quantity: quantity || 0,
      sku,
      category,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      message: 'Product successfully added',
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding product',
      error: error.message,
    });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, quantity, sku, category } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Update fields if provided
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (quantity !== undefined) product.quantity = quantity;
    if (sku) product.sku = sku;
    if (category) product.category = category;

    const updatedProduct = await product.save();
    res.status(200).json({
      success: true,
      message: 'Product successfully updated',
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: error.message,
    });
  }
});

// Sell product (decrease quantity, increase sold)
router.patch('/:id/sell', async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0',
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.quantity} products available`,
      });
    }

    product.quantity -= quantity;
    product.sold += quantity;

    const updatedProduct = await product.save();
    res.status(200).json({
      success: true,
      message: `${quantity} products successfully sold`,
      data: {
        productName: updatedProduct.name,
        quantitySold: quantity,
        remainingQuantity: updatedProduct.quantity,
        totalSold: updatedProduct.sold,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error selling product',
      error: error.message,
    });
  }
});

// Add stock (increase quantity)
router.patch('/:id/add-stock', async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be greater than 0',
      });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    product.quantity += quantity;
    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: `${quantity} units added to stock`,
      data: {
        productName: updatedProduct.name,
        quantityAdded: quantity,
        totalQuantity: updatedProduct.quantity,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding stock',
      error: error.message,
    });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product successfully deleted',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: error.message,
    });
  }
});

// Get inventory summary
router.get('/inventory/summary', async (req, res) => {
  try {
    const products = await Product.find();
    
    let totalProducts = 0;
    let totalQuantityInStock = 0;
    let totalSold = 0;
    let totalValue = 0;

    products.forEach(product => {
      totalProducts++;
      totalQuantityInStock += product.quantity;
      totalSold += product.sold;
      totalValue += product.price * product.quantity;
    });

    res.status(200).json({
      success: true,
      message: 'Inventory summary',
      data: {
        totalProducts,
        totalQuantityInStock,
        totalSold,
        totalInventoryValue: totalValue,
        products: products.map(p => ({
          name: p.name,
          inStock: p.quantity,
          sold: p.sold,
          price: p.price,
          value: p.price * p.quantity,
        })),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching inventory summary',
      error: error.message,
    });
  }
});

module.exports = router;
