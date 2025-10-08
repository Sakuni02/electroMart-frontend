import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
    reducerPath: "Api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
    endpoints: (build) => ({
        getAllProducts: build.query({
            query: () => `/products`,
        }),
    }),
});

export const { useGetAllProductsQuery } = Api;