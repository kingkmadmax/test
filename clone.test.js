const cloneArray = require('./cloneArra')


test('should give arry clone', () => {
   const array =[1,2,3];

    expect(cloneArray(array)).toEqual(array)
  
})
