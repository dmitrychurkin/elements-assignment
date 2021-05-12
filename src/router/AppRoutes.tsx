import City from "../screen/City";
import Home from "../screen/Home";

const AppRoutes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: ':city',
        element: <City />
    }
];

export default AppRoutes;
