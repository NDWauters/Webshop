import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from 'axios';

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
    const response = await Axios.get("https://fakestoreapi.com/products");
    return response.data;
});

const productsReducer = createSlice({
    name: 'products',
    initialState: {
        isLoading: false,
        data: [],
        error: null
    },
    reducers: { /* synchroon */ },
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {
            return { ...state, isLoading: true, data: [], error: null };
        },
        [fetchProducts.fulfilled]: (state, action) => {
            return { ...state, isLoading: false, data: action.payload, error: null };
        },
        [fetchProducts.rejected]: (state, action) => {
            return { ...state, isLoading: false, data: [], error: action.payload };
        }
    }
});

export const { reducer, actions } = productsReducer;