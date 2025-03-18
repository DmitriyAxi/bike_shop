import {Button, Card} from 'react-bulma-components';
import { IBike } from "../../../Types/Bike.ts";
import './BikeCard.css'
import {useDispatch} from "react-redux";
import {addToShoppingCart, removeFromShoppingCart} from "../../../Store/ShoppingCartSlice.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../Store/Store.ts";

interface IBikeProps {
    bike: IBike
}

export default function BikeCard(props: IBikeProps) {
    const dispatch = useDispatch()
    const sellBikeIds =  useSelector((state: RootState) => state.shoppingCart.BikesForSale.map((bike) => bike.id));

    const handeAddToShoppingCart = (id: string) => {
        dispatch(addToShoppingCart(id))
    }

    const handeRemoveFromShoppingCart = (id: string) => {
        dispatch(removeFromShoppingCart(id))
    }
    
    return (
        <>
            <Card mb="4" className="bikeCard">
                <Card.Header>
                    <Card.Header.Title>
                        {props.bike.name}
                    </Card.Header.Title>
                </Card.Header>
                <Card.Image size="4by3" src={props.bike.image}/>
                <Card.Content>
                    <p>{props.bike.description}</p>
                </Card.Content>
                <Card.Footer px={4} py={4} justifyContent="space-between">
                    <div>
                        {props.bike.oldPrice && <span className="oldPriceTitle">{props.bike.oldPrice} ₽</span>}
                        <span>{props.bike.price} ₽</span>
                    </div>
                    {sellBikeIds.includes(props.bike.id) 
                        ? <Button color="danger" onClick={() => handeRemoveFromShoppingCart(props.bike.id)}>Remove from cart</Button> 
                        : <Button color="primary" onClick={() => handeAddToShoppingCart(props.bike.id)}>In cart</Button> }
                </Card.Footer>
            </Card>
        </>
    );
}