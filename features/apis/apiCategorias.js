import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiCategorias = createApi({
    reducerPath: 'categorias',

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set("Content-Type", "multipart/form-data");
            headers.set('Content-Type', 'application/json');
            headers.set("accept", "text/plain");
            return headers;
        },
    }),
    keepUnusedDataFor: 3600,
    tagTypes: ['Categories'],
    endpoints: (builder) => ({
        allCategorias: builder.query({
            query: () => '/api/categorias',
            providesTags: ['Categories'],
        }),
        createCategoria: builder.mutation({
            query: (nombre, categoria_id) => ({
            url: '/api/categorias',
            method: 'POST',
            body: nombre,categoria_id,
            }),
            invalidatesTags: ['Categories'],
        }),
        deleteCat: builder.mutation({
            query: (id) => ({
                url: `/api/category-delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categories'],
        }),
        putCategoria: builder.mutation({
            query: ({id, nombre,categoria_id}) => ({
                url: `/api/category-put/${id}`,
                method: 'POST',
                body: {nombre,categoria_id}
            }),
            invalidatesTags: ['Categories'],
        })
    })
})

export const {  useAllCategoriasQuery,
                useCreateCategoriaMutation,
                useDeleteCatMutation,
                usePutCategoriaMutation 
            } = apiCategorias;