import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchProductionOrders = createAsyncThunk('production/fetchOrders', async () => {
    const response = await api.get('/production');
    return response.data;
});

export const produceItem = createAsyncThunk('production/produceItem', async (orderData, { rejectWithValue }) => {
    try {
        const payload = {
            product: { id: Number(orderData.productId) },
            quantity: orderData.quantity
        };
        const response = await api.post('/production', payload);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Erro ao processar produção (404 Not Found)';
        return rejectWithValue(message);
    }
});

const productionSlice = createSlice({
    name: 'production',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        successMsg: null
    },
    reducers: {
        clearMessages: (state) => {
            state.error = null;
            state.successMsg = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductionOrders.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(produceItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.successMsg = `Produção concluída com sucesso! Estoque atualizado.`;
                state.error = null;
            })
            .addCase(produceItem.rejected, (state, action) => {
                state.error = action.payload;
                state.successMsg = null;
            });
    }
});

export const { clearMessages } = productionSlice.actions;
export default productionSlice.reducer;