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

        getAllBrands: build.query({
            query: () => `/brands`,
        }),

        getAllColors: build.query({
            query: () => `/colors`,
        }),

        getProductsById: build.query({
            query: (id) => `/products/${id}`,
            providesTags: (result, error, id) => [{ type: "Product", id }],
        }),

        // getProductsByCategory: build.query({
        //     query: (slug) => `/products/shop/${slug}`,
        // }),

        getFilteredProductsByCategory: build.query({
            query: ({ slug, colorId, minPrice, maxPrice }) => {
                const params = new URLSearchParams();

                if (colorId) params.append("colorId", colorId);
                if (minPrice) params.append("minPrice", minPrice);
                if (maxPrice) params.append("maxPrice", maxPrice);

                return `/products/shop/${slug}?${params.toString()}`;
            },
        }),

        createProduct: build.mutation({
            query: (product) => ({
                url: "/products",
                method: "POST",
                body: product,
            }),
        }),

        createBrand: build.mutation({
            query: (brand) => ({
                url: "/brands",
                method: "POST",
                body: brand,
            }),
        }),

        createOrder: build.mutation({
            query: (order) => ({
                url: "/orders",
                method: "POST",
                body: order,
            }),
        }),
        createReview: build.mutation({
            query: (review) => ({
                url: "/review",
                method: "POST",
                body: review,
            }),
            invalidatesTags: (result, error, { productId }) => [
                { type: "Product", id: productId }
            ],
        }),
        getCheckoutSessionStatus: build.query({
            query: (sessionId) => `/payments/session-status?session_id=${sessionId}`,
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetAllBrandsQuery,
    useGetAllColorsQuery,
    useGetAllCategoriesQuery,
    useGetProductsByIdQuery,
    useGetFilteredProductsByCategoryQuery,
    // useGetProductsByCategoryQuery,
    useCreateOrderMutation,
    useCreateProductMutation,
    useCreateBrandMutation,
    useCreateReviewMutation,
    useGetCheckoutSessionStatusQuery } = Api;