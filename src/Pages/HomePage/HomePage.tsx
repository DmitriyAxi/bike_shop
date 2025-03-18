import BikeList from "../../Components/Features/BikeList/BikeList.tsx";
import { Level} from "react-bulma-components";
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/Store.ts';
import SortBikes from "../../Components/Features/SortBikes/SortBikes.tsx";
import FilterBikes from "../../Components/Features/FilterBikes/FilterBikes.tsx";

export default function HomePage() {
    const { bikes } = useSelector((state: RootState) => state.bikes);
    
    return (
        <>
            <Level>
                <Level.Side align="left">
                    <Level.Item>
                        <SortBikes/>
                    </Level.Item>
                </Level.Side>
                <Level.Side align="right">
                    <Level.Item>
                        <FilterBikes/>
                    </Level.Item>
                </Level.Side>
            </Level>
            <BikeList bikeProducts={bikes}></BikeList>
        </>
    );
}