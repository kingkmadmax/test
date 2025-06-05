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

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
});

afterEach(() => {
  jest.restoreAllMocks(); // Restore console.log after each test
});

test('adds product to cart with correct message', () => {
  addToCart(1, 2);
  expect(cart.length).toBe(1);
  expect(cart[0].product.name).toBe('Laptop');
  expect(cart[0].quantity).toBe(2);
  expect(console.log).toHaveBeenCalledWith('2 x Laptop added to cart.');
});

test('adds same product again to update quantity', () => {
  addToCart(1, 2);
  addToCart(1, 1);
  expect(cart.length).toBe(1);
  expect(cart[0].quantity).toBe(3);
  expect(console.log).toHaveBeenLastCalledWith('1 x Laptop added to cart.');
});

test('fails to add product due to low stock', () => {
  addToCart(1, 10);
  expect(cart.length).toBe(0);
  expect(console.log).toHaveBeenCalledWith('Not enough stock available.');
});

test('fails to add non-existent product', () => {
  addToCart(999, 1);
  expect(cart.length).toBe(0);
  expect(console.log).toHaveBeenCalledWith('Product not found.');
});
