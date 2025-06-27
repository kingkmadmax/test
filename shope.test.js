const { checkout, viewCart, addToCart,listProducts, createProduct,deleteProduct, updateProduct, cart,products, showInventory } = require('./shope');

describe('Cart Operations', () => {
  beforeEach(() => {
  cart.length = 0;


  products.forEach(p => {
    if (p.id === 1) p.stock = 5;
    if (p.id === 2) p.stock = 10;
    if (p.id === 3) p.stock = 15;
  });
});

test('showsit adds', () => {
  addToCart(1, 2);
  expect(cart.length).toBe(1); 
});

test('checkout if there is no value', () => {
  checkout();
  expect(cart.length).toBe(0);
});

test('shows that it doesn’t show wrong values', () => {
  addToCart(1, 2);
  checkout();
  expect(cart[0].quantity).toBe(2); 
});
  test('should complete checkout and deduct stock', () => {
    addToCart(2, 2);
    checkout();
    expect(products.find(p => p.id === 2).stock).toBe(8);
    expect(cart.length).toBe(0);
  });

test('to show the viewCart is working if thre not any items in the cart', () => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); 

 
  viewCart();

  expect(console.log).toHaveBeenCalledWith('Cart Contents:');
 

  console.log.mockRestore();
});
test('to show viewCart is working if there intams in the cart',()=>{
  jest.spyOn(console,'log').mockImplementation(()=>{});
  addToCart(1, 2);
  viewCart();
  expect(console.log).toHaveBeenCalledWith('Laptop - Qty: 2 - Total: $2000')

});
test('to show Inventory  is empty',()=>{
  jest.spyOn(console,'log').mockImplementation(()=>{});
 
  showInventory ();
  expect(console.log).toHaveBeenCalledWith('Cart Contents:')


});
test('to showInventory is working if there intams in the cart',()=>{
  jest.spyOn(console,'log').mockImplementation(()=>{});
  addToCart(5, 2);
  showInventory();
  expect(console.log).toHaveBeenCalledWith('Laptop - Qty: 2 - Total: $2000')

})


  test('should not add to cart if product not found', () => {
    console.log = jest.fn();
    addToCart(999, 1);
    expect(console.log).toHaveBeenCalledWith('Product not found.');
    expect(cart.length).toBe(0);
  });
  test('updates an existing product', () => {
    updateProduct(1, { price: 1200, name: 'Gaming Laptop' });
    expect(products.find(p => p.id === 1)).toEqual({
  id: 1,
  name: 'Gaming Laptop',
  price: 1200,
  stock: 5,
  category: 'electronics',
});
  });

  test('does not update a non-existing product', () => {
    updateProduct(99, { price: 999 });
    expect(products.length).toBe(12);
  });

  test('deletes an existing product', () => {
    deleteProduct(2);
    expect(products.find(p => p.id === 2)).toBeUndefined();
    expect(products.length).toBe(11);
  });

  test('does not delete a non-existing product', () => {
    deleteProduct(99);
    expect(products.length).toBe(11);
  });

  test('should not add to cart if stock is insufficient', () => {
    console.log = jest.fn();
    addToCart(1, 99);
    expect(console.log).toHaveBeenCalledWith('Not enough stock available.');
    expect(cart.length).toBe(0);
  });
   test('prints all products in the list', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    listProducts();

    expect(logSpy).toHaveBeenCalledWith('Product List:');

    products.forEach(p => {
      expect(logSpy).toHaveBeenCalledWith(
        `ID: ${p.id} | ${p.name} - $${p.price} | Stock: ${p.stock} | Category: ${p.category}`
      );
    });

    logSpy.mockRestore();
  });
  test('adds a valid product', () => {
    const newProduct = {
      id: 99,
      name: 'Tablet',
      price: 300,
      stock: 10,
      category: 'electronics'
    };

    createProduct(newProduct);

    const addedProduct = products.find(p => p.id === 99);
    expect(addedProduct).toEqual(newProduct);
    expect(products.length).toBe(originalLength + 1);
  });

  test('does not add a product with duplicate ID', () => {
    console.log = jest.fn();

    const duplicate = {
      id: 1, // already exists in products
      name: 'Duplicate Laptop',
      price: 500,
      stock: 5,
      category: 'electronics'
    };

    createProduct(duplicate);

    expect(console.log).toHaveBeenCalledWith('Product with ID 1 already exists.');
    expect(products.length).toBe(originalLength);
  });



 
});
