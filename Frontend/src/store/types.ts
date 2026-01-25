

export interface User {
    username: string;
}


export interface Product {
    products: ProductItem[]
}

interface ProductItem{
    productName: string;
    productPrice: number;
}