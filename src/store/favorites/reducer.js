import { createSlice } from '@reduxjs/toolkit';

const favoritesReducer = createSlice({
    name: 'favorites',
    initialState: {
        value: []
    },
    reducers: { 
        add(state,action){
            state.value.push(action.payload);
        },
        remove(state,action){
            for (let i = 0; i < state.value.length; i++) {
                const element = state.value[i];

                if (element.id === action.payload) {
                    state.value.splice(i,1);
                }
            }
        },
        clear(state, action){
            state.value = [];
        }
     }
});

export const { reducer, actions } = favoritesReducer;
export const { add, remove, clear } = actions;