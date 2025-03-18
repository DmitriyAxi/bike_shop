import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {bikeProducts} from "../Constants/Product.ts";

export interface IBikeForSale {
    id: string
    price: number
    name: string
    image: string
    count: number
}

interface ShoppingCartState {
    BikesForSale: IBikeForSale[];
    TotalPrice: number
}

const bikeForSaleFromLS : IBikeForSale[] = localStorage.getItem('orderedBikes')
    ? JSON.parse(localStorage.getItem('orderedBikes') as string)
    : [];

const calculateTotalPrice = (bikes: IBikeForSale[]): number => {
    return bikes.reduce((total, bike) => total + bike.price * bike.count, 0);
};

const initialState: ShoppingCartState = {
    BikesForSale: bikeForSaleFromLS,
    TotalPrice: calculateTotalPrice(bikeForSaleFromLS),
};

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        addToShoppingCart: (state, action: PayloadAction<string>) => {
            const currentBike = bikeProducts.find((bike) => bike.id === action.payload)
            if (currentBike) {
                const existingBike = state.BikesForSale.find((bike) => bike.id === action.payload);
                if (existingBike) {
                    existingBike.count += 1;
                } else {
                    const bikeForSale: IBikeForSale = {
                        id: currentBike.id,
                        price: currentBike.price,
                        name: currentBike.name,
                        image: currentBike.image,
                        count: 1,
                    };
                    state.BikesForSale.push(bikeForSale);
                }
                state.TotalPrice = calculateTotalPrice(state.BikesForSale);
                localStorage.setItem('orderedBikes', JSON.stringify(state.BikesForSale));
            }
        },
        removeFromShoppingCart: (state, action: PayloadAction<string>) => {
            state.BikesForSale = state.BikesForSale.filter((bike) => bike.id !== action.payload)
            state.TotalPrice = calculateTotalPrice(state.BikesForSale);
            localStorage.setItem('orderedBikes', JSON.stringify(state.BikesForSale))
        },
        addCountBikes: (state, action: PayloadAction<string>) => {
            const currentBikeFromState = state.BikesForSale.find((bike) => bike.id === action.payload)
            if (currentBikeFromState) {
                currentBikeFromState.count += 1
                state.TotalPrice = calculateTotalPrice(state.BikesForSale);
                localStorage.setItem('orderedBikes', JSON.stringify(state.BikesForSale))
            }
        },
        removeCountBikes: (state, action: PayloadAction<string>) => {
            const currentBikeFromState = state.BikesForSale.find((bike) => bike.id === action.payload)
            if (currentBikeFromState) {
                currentBikeFromState.count -= 1
                if (currentBikeFromState.count < 1) {
                    state.BikesForSale = state.BikesForSale.filter((bike) => bike.id !== action.payload);
                }
                state.TotalPrice = calculateTotalPrice(state.BikesForSale); 
                localStorage.setItem('orderedBikes', JSON.stringify(state.BikesForSale))
            }
        },
    },
});

export const { addToShoppingCart,removeFromShoppingCart, addCountBikes, removeCountBikes } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;