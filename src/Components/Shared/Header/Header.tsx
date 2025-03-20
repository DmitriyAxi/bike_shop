import {Button, Navbar} from 'react-bulma-components';
import './Header.css'
import {useSelector} from "react-redux";
import {RootState} from "../../../Store/Store.ts";
import {useNavigate} from "react-router-dom";
import ROUTES from "../../../Constants/Routes.ts";
import {useTheme} from "../../../Hooks/UseTheme.tsx";

export default function Header() {
    const navigate = useNavigate()
    const { isLight, toggleTheme } = useTheme();    
    const countSellBikes = useSelector((state: RootState) => state.shoppingCart.BikesForSale.length);

    return (
        <Navbar fixed='top'>
            <Navbar.Menu display="flex" justifyContent="center">
                <Navbar.Container display="flex">
                    <Navbar.Item>
                        <span>Change theme</span>
                        <label className="switch">
                            <input type="checkbox" onChange={toggleTheme} checked={!isLight}/>
                                <span className="slider"></span>
                        </label>
                    </Navbar.Item>
                    <Navbar.Item>
                        <Button color="info" onClick={() => navigate(ROUTES.shoppingCart)}>Cart ({countSellBikes})</Button>
                    </Navbar.Item>
                </Navbar.Container>
            </Navbar.Menu>
        </Navbar>
    );
}