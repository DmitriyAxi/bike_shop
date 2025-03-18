import {configureStore} from "@reduxjs/toolkit";
import bikesReducer from './BikesSlice';
import themeReducer from './ThemeSlice.ts';
import shoppingCartReducer from './ShoppingCartSlice.ts'

export const store  = configureStore({
    reducer: {
        bikes: bikesReducer,
        theme: themeReducer,
        shoppingCart: shoppingCartReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;