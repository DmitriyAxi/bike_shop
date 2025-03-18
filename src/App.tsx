import { Routes, Route } from 'react-router-dom';
import ROUTES from "./Constants/Routes.ts";
import HomePage from "./Pages/HomePage/HomePage.tsx";
import Header from "./Components/Shared/Header/Header.tsx";
import 'bulma/css/bulma.min.css';
import {Section} from "react-bulma-components";
import {useSelector} from "react-redux";
import {RootState} from "./Store/Store.ts";
import ShoppingCart from "./Pages/ShoppingCart/ShoppingCart.tsx";

export default function App() {
    const isLight = useSelector((state: RootState) => state.theme.isLight);

    return (
    <>  
        <Header/>
        <Section backgroundColor={isLight ? 'white' : 'black'}>
            <Routes>
                <Route path={ROUTES.home} element={<HomePage/>}/>
                <Route path={ROUTES.shoppingCart} element={<ShoppingCart/>}/>
            </Routes>
        </Section>
        <footer></footer>
    </>
  )
}
