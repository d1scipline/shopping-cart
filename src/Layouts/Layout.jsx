import { NavLink, Outlet } from "react-router";
import { useState, useEffect } from "react";
import LoadingPage from "../components/LoadingPage/LoadingPage";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import { ShoppingCart } from "lucide-react";
import styles from "./Layout.module.css";

export default function Layout() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState(new Map());
  const url = "https://fakestoreapi.com/products";
  const cartSize = Array.from(cart.values()).reduce((sum, val) => sum + val, 0);
  const getNavClass = ({ isActive }) =>
    `${styles.navElement} ${isActive ? styles.active : ""}`;

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("HTTP error! Status: " + response.status);
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  if (error) {
    return <ErrorPage></ErrorPage>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink className={getNavClass} to="home">
            Home
          </NavLink>
          <NavLink className={getNavClass} to="shop">
            Shop
          </NavLink>
          <NavLink className={getNavClass} to="cart">
            Cart
          </NavLink>
          <div className={styles.cart}>
            <ShoppingCart size={28}></ShoppingCart> {cartSize}
          </div>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet context={{ data, setData, cart, setCart }}></Outlet>
      </main>
    </div>
  );
}
