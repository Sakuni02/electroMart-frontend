import { configureStore } from '@reduxjs/toolkit'
import cartReduser from "./features/cartSlice";
import { Api } from "./api"
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        cart: cartReduser,
        [Api.reducerPath]: Api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(Api.middleware),
});
setupListeners(store.dispatch);