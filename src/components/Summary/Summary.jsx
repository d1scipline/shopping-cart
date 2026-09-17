import { data } from "react-router";

export default function Summary({ cart, data }) {
  const cartItems = [];
  for (var pair of cart) {
    var [id, quantity] = pair;
    cartItems.push({
      id: id,
      quantity: quantity,
      unitPrice: data[id - 1].price,
      totalPrice: data[id - 1].price * quantity,
    });
  }
  const sum = cartItems
    .map((item) => item.totalPrice)
    .reduce((a, b) => a + b)
    .toFixed(2);

  return (
    <div>
      <span>Order Summary</span>
      {cartItems.map((item) => {
        return (
          <div key={item.id}>
            <div>
              <span>{data[item.id - 1].title}</span>
              <span>x{item.quantity}</span>
            </div>
            <span>{item.totalPrice.toFixed(2)}$</span>
          </div>
        );
      })}
      <hr></hr>
      <span>Total Price: {sum}$</span>
    </div>
  );
}
