interface IRoutes {
    home: string
    shoppingCart: string
}

const ROUTES : IRoutes = {
    home: "/",
    shoppingCart: "/shoppingCart"
} as const;

export default ROUTES;