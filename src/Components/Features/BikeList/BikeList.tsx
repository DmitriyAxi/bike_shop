import BikeCard from "../BikeCard/BikeCard.tsx";
import {IBike} from "../../../Types/Bike.ts";
import './BikeList.css'
import {Container} from "react-bulma-components";

interface BikeListProps {
    bikeProducts: IBike[];
}

export default function BikeList(props: BikeListProps) {
    return (
        <Container className='card-container'>
            {props.bikeProducts?.map((bike: IBike) => <BikeCard key={bike.id} bike={bike}/>)}
        </Container>
    );
}