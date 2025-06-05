let products;
let cart;
let addToCart;

beforeEach(() => {
  // Reset products and cart before each test
  products = [
    { id: 1, name: 'Laptop', price: 1000, stock: 5, catagory: 'electronics' },
    { id: 2, name: 'Phone', price: 500, stock: 10, catagory: 'electronics' },
  ];
  cart = [];

  // Define the same function logic
  addToCart = (productId, quantity) => {
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
  };
});

