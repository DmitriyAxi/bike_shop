import { Routes, Route } from 'react-router-dom';
import ROUTES from "./Constants/Routes.ts";
import HomePage from "./Pages/HomePage/HomePage.tsx";
import Header from "./Components/Shared/Header/Header.tsx";
import 'bulma/css/bulma.min.css';
import {Section} from "react-bulma-components";
import ShoppingCart from "./Pages/ShoppingCart/ShoppingCart.tsx";
import {useTheme} from "./Hooks/UseTheme.tsx";

export default function App() {
    const { isLight } = useTheme();
    
    return (
    <>  
        <Header/>
        <Section backgroundColor={isLight ? 'white' : 'black'}>
            <Routes>
                <Route path={ROUTES.home} element={<HomePage/>}/>
                <Route path={ROUTES.shoppingCart} element={<ShoppingCart/>}/>
            </Routes>
        </Section>
    </>
  )
}
