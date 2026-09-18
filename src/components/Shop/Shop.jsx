import { useOutletContext } from "react-router";
import ShopProduct from "../ShopProduct/ShopProduct";
import styles from "./Shop.module.css";

export default function Shop() {
  const { data, cart, setCart } = useOutletContext();

  function addToCart(id, quantity) {
    if (cart.has(id)) {
      let newQuantity = cart.get(id) + quantity;
      cart.set(id, newQuantity);
    } else {
      cart.set(id, quantity);
    }
    setCart(new Map(cart));
  }

  return (
    <>
      <h1 className={styles.heading}>Shop Products</h1>
      <div className={styles.products}>
        {data?.map((item) => {
          return (
            <ShopProduct
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              addToCart={addToCart}
            ></ShopProduct>
          );
        })}
      </div>
    </>
  );
}
