import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003/api/" }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "categories",
    }),
    getProductStatus: builder.query({
      query: (status) => `products/status?status=${status}?`
    }),
    getSingleProduct: builder.query({
      query: ({ category, identifier }) => `categories/${category}/${identifier}`,
    }),
    getCategory: builder.query({
      query: ({ category, filters, setName }) => {
        const params = new URLSearchParams(filters)

        const queryUrl = setName
          ? `categories/Single-card/${setName}?`
          : `categories/${category}/filter?`

        return {
          url: `${queryUrl}${params.toString()}`,
        }
      }
    }),
  }),
})

export const {
  useGetAllCategoriesQuery,
  useGetProductStatusQuery,
  useGetSingleProductQuery,
  useGetCategoryQuery,
  useGetSingleCardSetQuery,
} = shopApi
