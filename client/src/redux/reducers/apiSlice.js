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
      query: ({ id, filters }) => ({
        url: `categories/${id}/filter`,
        params: filters
      }),
    }),
  })
})

export const {
  useGetAllCategoriesQuery,
  useGetProductStatusQuery,
  useGetSingleProductQuery,
  useGetCategoryQuery,
} = shopApi
