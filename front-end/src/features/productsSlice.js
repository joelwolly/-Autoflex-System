import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await api.get('/products');
    return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (newProduct) => {
    const response = await api.post('/products', newProduct);
    return response.data;
});

const productsSlice = createSlice({
    
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    }
});

export default productsSlice.reducer;