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
    const { id, name, image, description, oldPrice, price } = props.bike;
    
    const bikeInShoppingCart = sellBikeIds.includes(id)
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
                        {name}
                    </Card.Header.Title>
                </Card.Header>
                <Card.Image size="4by3" src={image}/>
                <Card.Content>
                    <p>{description}</p>
                </Card.Content>
                <Card.Footer px={4} py={4} justifyContent="space-between">
                    <div>
                        {oldPrice && <span className="oldPriceTitle">{oldPrice} ₽</span>}
                        <span>{price} ₽</span>
                    </div>
                    {bikeInShoppingCart && <Button color="danger" onClick={() => handeRemoveFromShoppingCart(props.bike.id)}>Remove from cart</Button>}
                    {!bikeInShoppingCart && <Button color="primary" onClick={() => handeAddToShoppingCart(props.bike.id)}>In cart</Button> }
                </Card.Footer>
            </Card>
        </>
    );
}