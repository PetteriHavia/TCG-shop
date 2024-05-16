import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shopApi = createApi({
  reducerPath: "shopApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003/api/" }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "categories",
    })
  })
})

export const { useGetAllCategoriesQuery } = shopApi
