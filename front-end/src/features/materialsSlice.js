import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Ação para buscar dados no Back-end (Thunk)
export const fetchMaterials = createAsyncThunk('materials/fetchMaterials', async () => {
    const response = await api.get('/materials');
    return response.data;
});

// Ação para salvar um NOVO material
export const addMaterial = createAsyncThunk('materials/addMaterial', async (newMaterial) => {
    const response = await api.post('/materials', newMaterial);
    return response.data;
});

const materialsSlice = createSlice({
    name: 'materials',
    initialState: {
        items: [],       // Lista de materiais
        status: 'idle',  // Status: 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Quando a busca der certo:
            .addCase(fetchMaterials.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; // Guarda os dados do banco aqui
            })
            // Quando adicionar der certo:
            .addCase(addMaterial.fulfilled, (state, action) => {
                state.items.push(action.payload); // Adiciona o novo item na lista local
            });
    }
});

export default materialsSlice.reducer;