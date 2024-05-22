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
    })
  })
})

export const { useGetAllCategoriesQuery, useGetProductStatusQuery } = shopApi
