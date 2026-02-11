import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchSuggestions = createAsyncThunk('suggestions/fetchSuggestions', async () => {
    const response = await api.get('/suggestions');
    return response.data;
});

const SuggestionSlice = createSlice({
    name: 'suggestions',
    initialState: {
        data: { suggestions: [], grandTotal: 0 },
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuggestions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSuggestions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchSuggestions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default SuggestionSlice.reducer;