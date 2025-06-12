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

test('to show the viewCart is working if thre not any items in the cart', () => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); 

  // Add something before viewing
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
  addToCart(1, 2);
  showInventory();
  expect(console.log).toHaveBeenCalledWith('Laptop - Qty: 2 - Total: $2000')

})