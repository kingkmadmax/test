const { checkout, viewCart, addToCart, cart, showInventory } = require('./shope');

test('checkout if there is no value', () => {
  checkout();
  expect(cart.length).toBe(0);
});

test('shows that it doesn’t show wrong values', () => {
  addToCart(1, 2);
  checkout();
  expect(cart[0].quantity).toBe(2); 
});

test('to show the viewCart is working', () => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); 

  // Add something before viewing
  viewCart();

  expect(console.log).toHaveBeenCalledWith('Cart Contents:');


  console.log.mockRestore();
});
