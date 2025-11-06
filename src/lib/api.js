import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
    reducerPath: "Api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
        prepareHeaders: async (headers) => {
            return new Promise((resolve) => {
                async function checkToken() {
                    const clerk = window.Clerk;
                    if (clerk) {
                        const token = await clerk.session?.getToken();
                        headers.set("Authorization", `Bearer ${token}`);
                        resolve(headers);
                    } else {
                        setTimeout(checkToken, 500);
                    }
                }
                checkToken();
            });
        },
    }),
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: () => `/products`,
        }),
        getAllCategories: build.query({
            query: () => `/categories`,
        }),
        createProduct: build.mutation({
            query: (product) => ({
                url: "/products",
                method: "POST",
                body: product,
            }),
        }),
        createOrder: build.mutation({
            query: (order) => ({
                url: "/orders",
                method: "POST",
                body: order,
            }),
        }),
    }),
});

export const { useGetAllProductsQuery, useCreateOrderMutation, useCreateProductMutation, useGetAllCategoriesQuery } = Api;