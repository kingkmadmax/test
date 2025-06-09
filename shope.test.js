const { checkout,viewCart, addToCart,cart, showInventory } = require('./shope');

test('checkout if thre no vulue',()=>{
  
  checkout();
  expect(cart.length).toBe(0);

});
test('shows that it dosent show wronge vules',()=>{
  addToCart(1,2);
  addToCart(1,2);
  checkout();
  expect(cart.quantity).toBe(2);

})


