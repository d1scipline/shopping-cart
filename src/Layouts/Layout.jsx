import { NavLink, Outlet } from "react-router";
import { useState, useEffect } from "react";

export default function Layout() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cart, setCart] = useState(new Map());
  const url = "https://fakestoreapi.com/products";

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
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error!</h1>;
  }

  return (
    <div className="root-layout">
      <header>
        <nav>
          <NavLink to="home">Home</NavLink>
          <NavLink to="shop">Shop</NavLink>
          <NavLink to="cart">Cart</NavLink>
          <div>{cart.size}</div>
        </nav>
      </header>
      <main>
        <Outlet context={{ data, setData, cart, setCart }}></Outlet>
      </main>
    </div>
  );
}
