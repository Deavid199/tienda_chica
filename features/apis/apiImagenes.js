import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiImagenes = createApi({
  reducerPath: "imagenes",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);

        headers.set("Content-Type", "application/json");
        headers.set("accept", "text/plain");
        headers.set("Cache-Control", "no-cache");
      }
      return headers;
    },
  }),
  keepUnusedDataFor: 86400,
  tagTypes: ["Imges"],
  endpoints: (builder) => ({
    imgVacias: builder.query({
      query: () => "/api/images-vcs",
      // providesTags: ["Imges"],
    }),
    allImg: builder.query({
      query: () => "/api/all-image",
      providesTags: ["Imges"],
    }),
    borrarImg: builder.mutation({
      query: (id) => ({
        url: `/api/delete-image/${id}`,
        method: "DELETE",
    }),
    invalidatesTags: ["Imges"],
    }),
    subitImgs: builder.mutation({
      query: (formData) => ({
        url: "/api/upload-image",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Imges"],
    }),
  }),
});

export const { useAllImgQuery, useBorrarImgMutation, useSubitImgsMutation, useImgVaciasQuery } =
  apiImagenes;
