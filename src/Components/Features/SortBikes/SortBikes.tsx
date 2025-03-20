import {Dropdown} from "react-bulma-components";
import {ISortCriteria, sortBikes} from "../../../Store/BikesSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../Store/Store.ts";

const sortOptions = [
    { value: ISortCriteria.PriceFromLow, label: "Price from low ↑" },
    { value: ISortCriteria.PriceFromHigh, label: "Price from high ↓" },
    { value: ISortCriteria.Popular, label: "Popular" },
    { value: ISortCriteria.Rating, label: "Rating" },
    { value: ISortCriteria.Newest, label: "Newest" }
];

export default function SortBikes() {
    const dispatch = useDispatch();

    const { sortCriteria } = useSelector((state: RootState) => state.bikes);
    const handleSortChange = (value: ISortCriteria) => {
        dispatch(sortBikes(value));
    };
    
    return (
        <Dropdown
            value={sortCriteria}
            label="Sort by"
            closeOnSelect={true}
            onChange={handleSortChange}
        >
            {sortOptions.map((option) => (
                <Dropdown.Item key={option.value} value={option.value}>
                    {option.label}
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}