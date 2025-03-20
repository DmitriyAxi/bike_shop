import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBike } from '../Types/Bike.ts';
import { bikeProducts, filters, brands } from '../Constants/Product.ts';

export enum ISortCriteria {
    PriceFromLow = 'priceFromLow',
    PriceFromHigh = 'priceFromHigh',
    Popular = 'popular',
    Rating = 'rating',
    Newest = 'newest',
}

export interface IPriceRange {
    id: number
    name: string
    min: number
    max: number
}

export interface IFilterCriteria {
    bikeTypes: string[]
    brands: string[]
    prices: IPriceRange[]
    frameSizes: string[]
    inStock: boolean
}

export const getDefaultFilterCriteria = (): IFilterCriteria => ({
    bikeTypes: [],
    brands: [],
    frameSizes: [],
    inStock: false,
    prices: [],
});

interface BikesState {
    bikes: IBike[];
    sortCriteria: ISortCriteria;
    filterCriteria: IFilterCriteria;
}

const initialState: BikesState = {
    bikes: bikeProducts,
    sortCriteria: ISortCriteria.PriceFromLow,
    filterCriteria: {
        bikeTypes: filters.types, 
        brands: brands.map((brand) => brand.name), 
        prices: filters.priceRanges,
        frameSizes: filters.frameSizes, 
        inStock: false, 
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
            state.bikes = bikeProducts.filter((bike) => {
                const matchBrand =
                    action.payload.brands.length === 0 || action.payload.brands.includes(bike.brand) 
                const matchTypes =
                    action.payload.bikeTypes.length === 0 || action.payload.bikeTypes.includes(bike.type)
                const matchFrameSize =
                    action.payload.frameSizes.length === 0 || action.payload.frameSizes.includes(bike.type)
                const matchPriceRange =
                    action.payload.prices.length === 0 || action.payload.prices.some((range) => bike.price >= range.min && bike.price <= range.max);
                const matchInStock = !action.payload.inStock || bike.inStock; 
                return (
                    matchBrand &&
                    matchTypes &&
                    matchFrameSize &&
                    matchPriceRange &&
                    matchInStock
                )});
        },  
    },
});

export const { sortBikes, filterBikes } = bikesSlice.actions;
export default bikesSlice.reducer;