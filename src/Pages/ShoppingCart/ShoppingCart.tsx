import {useSelector} from "react-redux";
import {RootState} from "../../Store/Store.ts";
import {IBikeForSale} from "../../Store/ShoppingCartSlice.ts"
import SellBikeCard from "../../Components/Features/SellBikeCard/SellBikeCard.tsx";
import {Columns} from "react-bulma-components";
import './ShoppingCart.css'
import OrderForm from "../../Components/Features/OrderForm/OrderForm.tsx";
import PromoCodeForm from "../../Components/Features/PromoCodeForm/PromoCodeForm.tsx";

export default function ShoppingCart() {
    const bikesForSale= useSelector((state: RootState) => state.shoppingCart.BikesForSale);
        
    return (
        <>
            {bikesForSale.length < 1 && <div>Cart is empty...</div>}
            <Columns>
                <Columns.Column>
                    {bikesForSale.map((bikeForSale: IBikeForSale) => <SellBikeCard key={bikeForSale.id} bikeForSale={bikeForSale}/>)}
                </Columns.Column>
                {bikesForSale.length > 0 && 
                    <Columns.Column mt={6}>
                        <PromoCodeForm/>
                        <OrderForm/>
                    </Columns.Column>}
            </Columns>
        </>
    );
}