import { Link, useOutletContext } from "react-router";
import Summary from "../Summary/Summary";
import CartProduct from "../CartProduct/CartProduct";

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
      <h1>Your Shopping Cart</h1>
      {cart.size !== 0 ? (
        <>
          <div>{cartItems}</div>
          <Summary cart={cart} data={data}></Summary>
        </>
      ) : (
        <>
          <div>
            <img></img>
            <span>Your Shopping Cart is Empty.</span>
            <span>
              Discover unique items and buy them with the best prices.
            </span>
            <Link to="/shop">Start Shopping</Link>
          </div>
        </>
      )}
    </>
  );
}
