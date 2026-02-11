import { configureStore } from '@reduxjs/toolkit';
import materialsReducer from '../features/materialsSlice';
import productsReducer from '../features/productsSlice';      
import productionReducer from '../features/productionSlice';  
import compositionReducer from '../features/compositionSlice';
import suggestionReducer from '../features/suggestionSlice';

export const store = configureStore({
    reducer: {
        materials: materialsReducer,
        products: productsReducer,
        production: productionReducer, 
        composition: compositionReducer,
        suggestions: suggestionReducer
    },
});