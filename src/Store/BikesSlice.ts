import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBike } from '../Types/Bike.ts';
import { bikeProducts } from '../Constants/Product.ts';

export enum ISortCriteria {
    PriceFromLow = 'priceFromLow',
    PriceFromHigh = 'priceFromHigh',
    Popular = 'popular',
    Rating = 'rating',
    Newest = 'newest',
}

interface IPriceRange {
    PriceFrom: number
    PriceTo: number
}

export interface IFilterCriteria {
    BikeTypes: string[]
    Brand: string
    Price: IPriceRange
    FrameSize: string
    InStock: boolean
}

interface BikesState {
    bikes: IBike[];
    sortCriteria: ISortCriteria;
    filterCriteria: IFilterCriteria;
}

const initialState: BikesState = {
    bikes: bikeProducts,
    sortCriteria: ISortCriteria.PriceFromLow,
    filterCriteria: {
        BikeTypes: [], 
        Brand: '', 
        Price: { PriceFrom: 0, PriceTo: Infinity },
        FrameSize: '', 
        InStock: false, 
    },
};

const bikesSlice = createSlice({
    name: 'bikes',
    initialState,
    reducers: {
        sortBikes: (state, action: PayloadAction<ISortCriteria>) => {
            state.sortCriteria = action.payload;
            const sorted = [...state.bikes];

            switch (action.payload) {
                case ISortCriteria.PriceFromLow:
                    sorted.sort((a, b) => a.price - b.price);
                    break;
                case ISortCriteria.PriceFromHigh:
                    sorted.sort((a, b) => b.price - a.price);
                    break;
                case ISortCriteria.Popular:
                    sorted.sort((a, b) => b.reviews - a.reviews);
                    break;
                case ISortCriteria.Rating:
                    sorted.sort((a, b) => b.rating - a.rating);
                    break;
                case ISortCriteria.Newest:
                    sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
                    break;
                default:
                    state.bikes = bikeProducts;
                    return;
            }
            state.bikes = sorted;
        },
        filterBikes: (state, action: PayloadAction<IFilterCriteria>) => {
            state.filterCriteria = action.payload;
            state.bikes = bikeProducts.filter((bike) => {
                // const matchesType =
                //     action.payload.BikeTypes.length === 0 ||
                //     action.payload.BikeTypes.includes(bike.type);
                // const matchesBrand =
                //     !action.payload.Brand || bike.brand === action.payload.Brand;
                // const matchesPrice =
                //     bike.price >= action.payload.Price.PriceFrom &&
                //     bike.price <= action.payload.Price.PriceTo;
                // const matchesSize =
                //     !action.payload.FrameSize || bike.specifications.frameSize.includes(action.payload.FrameSize);
                const matchesInStore =
                    bike.inStock === action.payload.InStock;

                return (
                    // matchesType &&
                    // matchesBrand &&
                    // matchesPrice &&
                    // matchesSize &&
                    matchesInStore
                )});
        },  
    },
});

export const { sortBikes, filterBikes } = bikesSlice.actions;
export default bikesSlice.reducer;