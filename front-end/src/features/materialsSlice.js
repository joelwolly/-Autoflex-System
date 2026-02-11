import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchMaterials = createAsyncThunk('materials/fetchMaterials', async () => {
    const response = await api.get('/materials');
    return response.data;
});

export const addMaterial = createAsyncThunk('materials/addMaterial', async (newMaterial) => {
    const response = await api.post('/materials', newMaterial);
    return response.data;
});

const materialsSlice = createSlice({
    name: 'materials',
    initialState: {
        items: [],       
        status: 'idle',  
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaterials.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; 
            })
            .addCase(addMaterial.fulfilled, (state, action) => {
                state.items.push(action.payload); 
            });
    }
});

export default materialsSlice.reducer;