const { checkout, viewCart, addToCart, deleteProduct, updateProduct, cart,products, showInventory } = require('./shope');

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



 
});
