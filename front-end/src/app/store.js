import { configureStore } from '@reduxjs/toolkit';
import materialsReducer from '../features/materialsSlice';
import productsReducer from '../features/productsSlice';
import compositionReducer from '../features/compositionSlice';

export const store = configureStore({
    reducer: {
        materials: materialsReducer,
        products: productsReducer,
        composition: compositionReducer,
    },
});