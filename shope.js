// PRODUCTS (Database Simulation)
let products = [
  { id: 1, name: 'Laptop', price: 1000, stock: 5, category: 'electronics' },
  { id: 2, name: 'Phone', price: 500, stock: 10, category: 'electronics' },
  { id: 3, name: 'Headphones', price: 150, stock: 15, category: 'electronics' },
  { id: 4, name: 'car', price: 50000, stock: 34, category: 'electronics' },
  { id: 5, name: 'sweater', price: 50, stock: 34, category: 'cloth' },
  { id: 6, name: 'hat', price: 50, stock: 34, category: 'cloth' },
  { id:7,name:'hat',price:34,category: 'close', stock: 50},
    {id:8,name: 'Laptop', price: 1000, stock: 5, category: 'electronics' },
    {id:9,name: 'Phone', price: 500, stock: 10, category: 'electronics' },
    {id:10,name: 'Headphones', price: 150, stock: 15, category: 'electronics' },
    {id:11,name: 'car', price: 50000, stock: 34, category: 'electronics' },
    {id:12,name: 'sweater', price: 50, stock: 34, category: 'cloth' },
];


let cart = [];



function createProduct(product) {
  const exists = products.some(p => p.id === product.id);
  if (exists) {
    console.log(`Product with ID ${product.id} already exists.`);
    return;
  }
  products.push(product);
  console.log(`Product "${product.name}" added.`);
}


function listProducts() {
  console.log('Product List:');
  products.forEach(p => {
    console.log(`ID: ${p.id} | ${p.name} - $${p.price} | Stock: ${p.stock} | Category: ${p.category}`);
  });
}


function updateProduct(id, updatedFields) {
  const product = products.find(p => p.id === id);
  if (!product) {
    console.log(`Product with ID ${id} not found.`);
    return;
  }
  Object.assign(product, updatedFields);
  console.log(`Product ID ${id} updated.`);
}


function deleteProduct(id) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    console.log(`Product with ID ${id} not found.`);
    return;
  }
  const deleted = products.splice(index, 1)[0];
  console.log(`Product "${deleted.name}" deleted.`);
}
 

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

function viewCart() {
  console.log('Cart Contents:');
  cart.forEach(item => {
    console.log(`${item.product.name} - Qty: ${item.quantity} - Total: $${item.quantity * item.product.price}`);
  });
}

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

  for (const item of cart) {
    item.product.stock -= item.quantity;
  }

  console.log(`Order placed successfully! Total: $${total}`);
  cart = []; // clear cart
}

function showInventory() {
  console.log('Current Inventory:');
  products.forEach(p => {
    console.log(`${p.name} - Stock: ${p.stock}`);
  });
}

// Exporting all
module.exports = {
  // Product CRUD
  createProduct,
  listProducts,
  updateProduct,
  deleteProduct,

  // Cart
  addToCart,
  viewCart,
  checkout,
  showInventory,

  // Useful for testing
  cart,
  products
};
