import styles from "./Summary.module.css";

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
    <div className={styles.container}>
      <span className={styles.heading}>Order Summary</span>
      <div className={styles.items}>
        {cartItems.map((item) => {
          return (
            <div key={item.id} className={styles.itemContainer}>
              <div className={styles.titleContainer}>
                <span className={styles.title}>{data[item.id - 1].title}</span>
                <span className={styles.quantity}>x{item.quantity}</span>
              </div>
              <span className={styles.price}>
                {item.totalPrice.toFixed(2)}$
              </span>
              <hr className={styles.hr}></hr>
            </div>
          );
        })}
      </div>
      <span className={styles.totalPrice}>Total Price: {sum}$</span>
    </div>
  );
}
