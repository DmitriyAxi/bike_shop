import {Button, Card} from 'react-bulma-components';
import {useDispatch, useSelector} from "react-redux";
import {IBikeForSale, removeFromShoppingCart, addCountBikes, removeCountBikes} from "../../../Store/ShoppingCartSlice.ts";
import {RootState} from "../../../Store/Store.ts";

interface IBikeForSaleProps {
    bikeForSale: IBikeForSale
}

export default function SellBikeCard(props: IBikeForSaleProps) {
    const currentBike = useSelector((state: RootState) => 
        state.shoppingCart.BikesForSale.find((bike) => bike.id === props.bikeForSale.id))
    const dispatch = useDispatch()
    const handeRemoveFromShoppingCart = (id: string) => {
        dispatch(removeFromShoppingCart(id))
    }
    const handeAddBikeCount = (id: string) => {
        dispatch(addCountBikes(id))
    }
    const handeRemoveBikeCount = (id: string) => {
        dispatch(removeCountBikes(id))
    }

    return (
        <>
            <Card mb="4" className="bikeCard">
                <Card.Header>
                    <Card.Header.Title>
                        {props.bikeForSale.name}
                    </Card.Header.Title>
                </Card.Header>
                <Card.Image size="3by2" src={props.bikeForSale.image}/>
                <Card.Content>
                </Card.Content>
                <Card.Footer px={4} py={4} justifyContent="space-between">
                    <div>
                        <span>{props.bikeForSale.price} ₽</span>
                    </div>
                    <div>
                        <Button rounded={true} size="small" onClick={() => handeRemoveBikeCount(props.bikeForSale.id)}>-</Button>
                        <span>{currentBike?.count}</span>
                        <Button rounded={true} size="small" onClick={() => handeAddBikeCount(props.bikeForSale.id)}>+</Button>
                    </div>
                    <Button color="danger" onClick={() => handeRemoveFromShoppingCart(props.bikeForSale.id)}>Remove from cart</Button>
                </Card.Footer>
            </Card>
        </>
    );
}