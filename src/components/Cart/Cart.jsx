import { Link, useOutletContext } from "react-router";
import Summary from "../Summary/Summary";
import CartProduct from "../CartProduct/CartProduct";
import styles from "./Cart.module.css";
import { ShoppingCartPlus } from "lucide-react";

export default function Cart() {
  const { data, cart, setCart } = useOutletContext();

  function increaseQuantity(id) {
    if (cart.get(id) < 99) {
      setCart(new Map(cart.set(id, cart.get(id) + 1)));
    }
  }

  function decreaseQuantity(id) {
    if (cart.get(id) > 1) {
      setCart(new Map(cart.set(id, cart.get(id) - 1)));
    }
  }

  function deleteProduct(id) {
    cart.delete(id);
    setCart(new Map(cart));
  }

  const cartItems = [];
  for (var pair of cart) {
    var [id, quantity] = pair;
    cartItems.push(
      <CartProduct
        id={id}
        quantity={quantity}
        key={id}
        title={data[id - 1].title}
        image={data[id - 1].image}
        price={data[id - 1].price}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        deleteProduct={deleteProduct}
      ></CartProduct>,
    );
  }

  return (
    <>
      <h1 className={styles.heading}>Your Shopping Cart</h1>
      {cart.size !== 0 ? (
        <div className={styles.cartContainer}>
          <div className={styles.cartItemsContainer}>{cartItems}</div>
          <div className={styles.summaryContainer}>
            {" "}
            <Summary cart={cart} data={data}></Summary>
            <button
              className={styles.checkoutButton}
              onClick={() => setCart(new Map())}
            >
              Checkout
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.emptyCartContainer}>
            <ShoppingCartPlus
              className={styles.basketColor}
              size={150}
            ></ShoppingCartPlus>
            <span className={styles.emptyHeading}>
              Your Shopping Cart is Empty.
            </span>
            <span className={styles.emptyPara}>
              Discover unique items and buy them with the best prices.
            </span>
            <Link className={styles.shopLink} to="/shop">
              Start Shopping
            </Link>
          </div>
        </>
      )}
    </>
  );
}
