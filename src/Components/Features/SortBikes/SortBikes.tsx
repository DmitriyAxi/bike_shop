import {Dropdown} from "react-bulma-components";
import {ISortCriteria, sortBikes} from "../../../Store/BikesSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../Store/Store.ts";

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
            <Dropdown.Item value={ISortCriteria.PriceFromLow}>
                Price from low ↑
            </Dropdown.Item>
            <Dropdown.Item value={ISortCriteria.PriceFromHigh}>
                Price from high ↓
            </Dropdown.Item>
            <Dropdown.Item value={ISortCriteria.Popular}>
                Popular
            </Dropdown.Item>
            <Dropdown.Item value={ISortCriteria.Rating}>
                Rating
            </Dropdown.Item>
            <Dropdown.Item value={ISortCriteria.Newest}>
                Newest
            </Dropdown.Item>
        </Dropdown>
    )
}