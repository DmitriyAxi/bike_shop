import {Button, Navbar} from 'react-bulma-components';
import './Header.css'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../Store/Store.ts";
import {switchTheme} from "../../../Store/ThemeSlice.ts";
import {useNavigate} from "react-router-dom";
import ROUTES from "../../../Constants/Routes.ts";

export default function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLightTheme = useSelector((state: RootState) => state.theme.isLight);
    const countSellBikes = useSelector((state: RootState) => state.shoppingCart.BikesForSale.length);

    const handleSwitchTheme = () => {
        dispatch((switchTheme()))
    }

    return (
        <Navbar fixed='top'>
            <Navbar.Menu display="flex" justifyContent="center">
                <Navbar.Container display="flex">
                    <Navbar.Item>
                        <span>Change theme</span>
                        <label className="switch">
                            <input type="checkbox" onChange={handleSwitchTheme} checked={!isLightTheme}/>
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