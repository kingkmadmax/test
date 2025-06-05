// PRODUCTS (Database Simulation)
const products = [
  { id: 1, name: 'Laptop', price: 1000, stock: 5,catagory:'electronics' },
  { id: 2, name: 'Phone', price: 500, stock: 10,catagory:'electronics' },
  { id: 3, name: 'Headphones', price: 150, stock: 15,catagory:'electronics' },
  { id: 4, name:'car', price:50000, stock:34,catagory:'electronics' },
  { id: 5, name:'sweeter', price:50, stock:34,catagory:'cloth' },
  { id: 6, name:'hat', price:50, stock:34,catagory:'cloth' }
];

// CART
let cart = [];

// Add product to cart
function addToCart(productId, quantity) {
  const product = products.find(p => p.id === productId);
  if (!product) {
    console.log('Product not found.');
    return;
  }

  if (product.stock < quantity) {
    console.log('Not enough stock available.');
    return;
  }

  const existing = cart.find(item => item.product.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  console.log(`${quantity} x ${product.name} added to cart.`);
}

// View cart
function viewCart() {
  console.log('Cart Contents:');
  cart.forEach(item => {
    console.log(`${item.product.name} - Qty: ${item.quantity} - Total: $${item.quantity * item.product.price}`);
  });
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    console.log('Cart is empty.');
    return;
  }

  let total = 0;
  for (const item of cart) {
    if (item.product.stock < item.quantity) {
      console.log(`Not enough stock for ${item.product.name}`);
      return;
    }
    total += item.quantity * item.product.price;
  }

  // Deduct stock
  for (const item of cart) {
    item.product.stock -= item.quantity;
  }

  console.log(`Order placed successfully! Total: $${total}`);
  cart = []; // clear cart
}

// Inventory after order
function showInventory() {
  console.log('Current Inventory:');
  products.forEach(p => {
    console.log(`${p.name} - Stock: ${p.stock}`);
  });
}
