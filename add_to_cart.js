import {Product} from "./data"


deleteProduct: (id) => {
        products = products.filter(product => product.id !== id);
    }


deleteProduct(2);