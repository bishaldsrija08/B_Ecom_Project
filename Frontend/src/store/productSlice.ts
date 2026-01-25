

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from './types';

const initialState: Product = {
    products: []
}


const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        setProducts(state: Product, action: PayloadAction<Product>) {
            state.products = [
                {
                    productName: "Sample Product",
                    productPrice: 100
                }
            ];
        }
    }
})
export const { setProducts } = productSlice.actions
export default productSlice.reducer