# JavaScript Test Documentation

## Test Libraries

The test uses **Jest**, a testing framework for JavaScript. Jest allows you to write and run unit tests efficiently.

## Is Jest using JavaScript?

Yes, **Jest** is written in and used with **JavaScript**. It is widely used to test JavaScript applications, including Node.js and frontend frameworks like React.

---

## Test Folder Structure
product.js 
to helpe as a database
shope.test.js
were our test
 file is stored

---

## 📌 Purpose of the Test

This test project is focused on building and verifying **CRUD functionality** in a shopping cart system. The goal is to simulate an e-commerce system and ensure all operations work as expected.

---

## 🛒 Core Functions and Descriptions

### 1. `add(product)`
- **Purpose**: Adds a new product to the inventory or database.
- **Parameters**:  
  `product` - an object with properties like `id`, `name`, `price`, `stock`, `category`.
- **Behavior**: Pushes the product into the product list or updates an existing entry.

---

### 2. `update(productId, updatedFields)`
- **Purpose**: Updates the data of an existing product.
- **Parameters**:  
  `productId` - ID of the product to update  
  `updatedFields` - an object with updated values (e.g., `{ stock: 8 }`)
- **Behavior**: Finds the product by ID and updates its properties like stock, name, price, or category.

---

### 3. `delete(productId)`
- **Purpose**: Deletes a product from the inventory.
- **Parameters**:  
  `productId` - the ID of the product to remove.
- **Behavior**: Removes the product from the array, simulating deletion.

---

### 4. `modify(productId, changes)`
- **Purpose**: Modifies one or more fields of a product with additional business rules.
- **Parameters**:  
  `productId` - the ID of the product  
  `changes` - an object with properties to modify
- **Behavior**: May include conditions or validations (e.g., prevent setting stock below 0).

---

### 5. `toCart(productId, quantity)`
- **Purpose**: Adds a product to the user's cart.
- **Parameters**:  
  `productId` - the ID of the product  
  `quantity` - number of units to add
- **Behavior**:  
  - Checks if product exists  
  - Validates sufficient stock  
  - Adds product to cart with selected quantity  
  - Updates stock level

---

## ✅ Why Write Tests?

- **Catch Bugs Early**: Identify and fix defects before they reach the user.
- **Verify Logic**: Ensure all shopping cart features work as expected.
- **Refactor Safely**: Make future changes without breaking existing functionality.
- **Document Behavior**: Tests act as documentation for how your functions are supposed to work.

---

## 🛠 Example Test Scenarios

You can write tests for:

- Adding valid/invalid products  
- Adding to cart when stock is available/unavailable  
- Updating product fields  
- Removing items from the cart  
- Ensuring totals and inventory update correctly



