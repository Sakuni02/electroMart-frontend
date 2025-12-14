import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../api";

// Load cart from MongoDB
export const loadUserCart = createAsyncThunk(
    "cart/loadUserCart",
    async (_, { dispatch }) => {
        const result = await dispatch(Api.endpoints.getCart.initiate());
        return result.data;
    }
);

// Add item to MongoDB cart
export const addItemToDB = createAsyncThunk(
    "cart/addItemToDB",
    async (productId, { dispatch }) => {
        const result = await dispatch(Api.endpoints.addToCart.initiate(productId));
        return result.data;
    }
);

// Update quantity in MongoDB
export const updateQuantityInDB = createAsyncThunk(
    "cart/updateQuantityInDB",
    async ({ productId, quantity }, { dispatch }) => {
        const result = await dispatch(
            Api.endpoints.updateCartQuantity.initiate({ productId, quantity })
        );
        return result.data;
    }
);

// Remove item from MongoDB
export const removeItemFromDB = createAsyncThunk(
    "cart/removeItemFromDB",
    async (productId, { dispatch }) => {
        const result = await dispatch(
            Api.endpoints.removeCartItem.initiate(productId)
        );
        return result.data;
    }
);


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        loading: false,
    },

    reducers: {
        clearCartLocal(state) {
            state.cartItems = [];
        }
    },

    extraReducers: (builder) => {
        builder

            // Load cart
            .addCase(loadUserCart.fulfilled, (state, action) => {
                if (action.payload?.items) {
                    state.cartItems = action.payload.items;
                }
            })

            // Add item
            .addCase(addItemToDB.fulfilled, (state, action) => {
                if (action.payload?.items) {
                    state.cartItems = action.payload.items;
                }
            })

            // Update quantity
            .addCase(updateQuantityInDB.fulfilled, (state, action) => {
                state.cartItems = action.payload.items;
            })

            // Remove item
            .addCase(removeItemFromDB.fulfilled, (state, action) => {
                state.cartItems = action.payload.items;
            });
    },
});

// Export action
export const { clearCartLocal } = cartSlice.actions;

export default cartSlice.reducer;