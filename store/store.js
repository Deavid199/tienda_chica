import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { apiCategorias } from '@/features/apis/apiCategorias';
import { apiProductos } from '@/features/apis/apiProductos';
import { apiImagenes } from '@/features/apis/apiImagenes';

export const store = configureStore({
    reducer: {
    //   user: userReducer,
  
      [apiCategorias.reducerPath]: apiCategorias.reducer,
      [apiProductos.reducerPath]: apiProductos.reducer,
      [apiImagenes.reducerPath]: apiImagenes.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
      .concat( apiProductos.middleware )
      .concat( apiCategorias.middleware )
      .concat( apiImagenes.middleware )
  });
  
  setupListeners(store.dispatch)