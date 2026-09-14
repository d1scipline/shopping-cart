import Cart from "../components/Cart/Cart";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../components/Home/Home";
import Shop from "../components/Shop/Shop";
import Layout from "../Layouts/Layout";

const routes = [
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      { index: true, element: <Home></Home> },
      { path: "/home", element: <Home></Home> },
      { path: "/shop", element: <Shop></Shop> },
      { path: "/cart", element: <Cart></Cart> },
    ],
    errorElement: <ErrorPage></ErrorPage>,
  },
];

export default routes;
