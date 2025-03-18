import {useSelector} from "react-redux";
import {RootState} from "../../Store/Store.ts";
import {IBikeForSale} from "../../Store/ShoppingCartSlice.ts"
import SellBikeCard from "../../Components/Features/SellBikeCard/SellBikeCard.tsx";
import {Button, Columns} from "react-bulma-components";
import {useState} from "react";
import {promotions} from "../../Constants/Product.ts";
import './ShoppingCart.css'
import OrderForm from "../../Components/Features/OrderForm/OrderForm.tsx";

export default function ShoppingCart() {
    const bikesForSale= useSelector((state: RootState) => state.shoppingCart.BikesForSale);
    const totalPriceFromStore = useSelector((state: RootState) => state.shoppingCart.TotalPrice);
    const [promocode, setPromocode] = useState('')
    const [isValidPromo, setIsValidPromo] = useState<boolean | null>(null)
    const [alreadyUserPromo, setAlreadyUserPromo] = useState<boolean>(false)
    const finalPrice = alreadyUserPromo ? Math.round(totalPriceFromStore * 0.85) : totalPriceFromStore;
    const handleChangePromo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPromocode(e.target.value)
        setIsValidPromo(null)
    }
    
    const handleCheckPromocode = () => {
        if (promotions.map((promo) => promo.code.toLowerCase()).includes(promocode.toLowerCase())) {
            setIsValidPromo(true)
            setAlreadyUserPromo(true)
        } else {
            setIsValidPromo(false)
        }
    }
        
    return (
        <>
            {bikesForSale.length < 1 && <div>Cart is empty...</div>}
            <Columns>
                <Columns.Column>
                    {bikesForSale.map((bikeForSale: IBikeForSale) => <SellBikeCard key={bikeForSale.id} bikeForSale={bikeForSale}/>)}
                </Columns.Column>
                {bikesForSale.length > 0 && 
                    <Columns.Column mt={6}>
                        <p>Итого:</p>
                        <p className="totalPrice">{finalPrice}</p>
                        <div>
                            <label htmlFor="promocode">Promocode: </label>
                            <input
                                className="input"
                                name="promocode"
                                type="text"
                                id="promocode"
                                placeholder="Write promocode"
                                onChange={handleChangePromo}
                                value={promocode}
                            />
                            <Button 
                                rounded={true} 
                                color="warning" 
                                ml={4}
                                onClick={handleCheckPromocode} 
                            >Use promocode</Button>
                        </div>
                        {isValidPromo && <p className="validPromo">Success used promo</p>}
                        {isValidPromo === false && <p className="inValidPromo">Promocode doesn't exist</p>}
                        <OrderForm></OrderForm>
                    </Columns.Column>}
            </Columns>
        </>
    );
}