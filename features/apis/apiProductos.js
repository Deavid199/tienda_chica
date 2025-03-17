import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiProductos = createApi({
  reducerPath: "productos",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  keepUnusedDataFor: 3600,
  tagTypes: ["Productos"],
  endpoints: (builder) => ({
    porSlug: builder.query({
      query: (id) => `/api/catalogo/${id}`,
    }),
    lastProductos: builder.query({
      query: () => "/api/last-productos",
      invalidatesTags: ["Productos"],
    }),
    getOne: builder.query({
      query: (id) => `/api/getOne/${id}`,
      invalidatesTags: ["Productos"],
    }),
    getByCategory: builder.query({
      query: (id) => `/api/por-categoria/${id}`,
      providesTags: ["Productos"],
    }),
    getOfertas: builder.query({
      query: () => "/api/ofertas",
    }),
    deleteProducto: builder.mutation({
      query: (id) => ({
        url: `/api/producto/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Productos"],
    }),
    uploadProducto: builder.mutation({
      query: (formData) => ({
        url: "/api/productos",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Productos"],
    }),
    updateProducto: builder.mutation({
      query: ({
        id,
        disponible,
        nombre,
        precio,
        fake,
        stock,
        descripcion,
      }) => ({
        url: `/api/updateProduct/${id}`,
        method: "PUT",
        body: {
          disponible: disponible,
          nombre: nombre,
          precio: precio,
          fake: fake,
          stock: stock,
          descripcion: descripcion,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Productos"],
    }),
  }),
});

export const {
  usePorSlugQuery,
  useLastProductosQuery,
  useGetOneQuery,
  useGetByCategoryQuery,
  useGetOfertasQuery,
  useDeleteProductoMutation,
  useUploadProductoMutation,
  useUpdateProductoMutation,
} = apiProductos;
