import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchCompositions = createAsyncThunk('composition/fetchCompositions', async () => {
    const response = await api.get('/compositions');
    return response.data;
});


export const addComposition = createAsyncThunk('composition/addComposition', async (newComposition) => {
   
    const payload = {
        productId: newComposition.productId,
        materialId: newComposition.materialId,
        quantity: newComposition.quantity
    };
    
    const response = await api.post('/compositions', payload);
    return response.data;
});

const compositionSlice = createSlice({
    name: 'composition',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompositions.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'succeeded';
            })
            .addCase(addComposition.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    }
});

export default compositionSlice.reducer;