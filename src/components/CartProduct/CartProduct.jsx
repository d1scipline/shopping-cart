import {
  MinusIcon,
  PlusIcon,
  ShoppingCartMinus,
  TrashIcon,
} from "lucide-react";
import styles from "./CartProduct.module.css";

export default function CartProduct({
  image,
  title,
  id,
  quantity,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  price,
}) {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        role="img"
        aria-label={"image of " + title}
        src={image}
        alt={"image of " + title}
      ></img>
      <div className={styles.subContainer}>
        <div className={styles.infoContainer}>
          {" "}
          <span className={styles.infoTitle}>{title}</span>
          <span className={styles.infoPrice}>{price.toFixed(2)}$</span>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.quantityContainer}>
            {" "}
            {quantity == 1 ? (
              <button
                disabled
                className={styles.quantityButton}
                aria-label="decrease quantity"
              >
                <MinusIcon></MinusIcon>
              </button>
            ) : (
              <button
                onClick={() => decreaseQuantity(id)}
                className={styles.quantityButton}
                aria-label="decrease quantity"
              >
                {" "}
                <MinusIcon></MinusIcon>
              </button>
            )}
            <span className={styles.quantityText}>{quantity}</span>
            <button
              onClick={() => increaseQuantity(id)}
              className={styles.quantityButton}
              aria-label="increase quantity"
            >
              <PlusIcon></PlusIcon>
            </button>
          </div>
          <button
            className={styles.deleteButton}
            onClick={() => deleteProduct(id)}
          >
            <ShoppingCartMinus></ShoppingCartMinus> Remove
          </button>
        </div>
      </div>
    </div>
  );
}
