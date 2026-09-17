import { isDisabled } from "@testing-library/user-event/dist/cjs/utils/index.js";
import { useState } from "react";

export default function ShopProduct({ image, title, price, id, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  function handleKeyDown(e) {
    if (["-", "+", "e", "E", "."].includes(e.key)) {
      e.preventDefault();
    }
  }

  function handleChange(e) {
    let clean = e.target.value.replace(/\D/g, "");
    clean = clean.replace(/^0+/, "");

    if (clean !== "") {
      clean = Math.min(Number(clean), 99).toString();
    }

    setQuantity(clean);
  }

  function increment() {
    setQuantity((prev) => {
      const num = Number(prev);
      return num >= 99 ? 99 : num + 1;
    });
  }

  function decrement() {
    setQuantity((prev) => {
      const num = Number(prev);
      return num <= 1 ? 1 : num - 1;
    });
  }

  return (
    <div className="shop-product">
      <img src={image} alt={title} />
      <span>{title}</span>
      <span>{price}$</span>
      <div>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={decrement}
        >
          -
        </button>

        <input
          type="number"
          inputMode="numeric"
          min="1"
          max="99"
          value={quantity}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (quantity === "" || Number(quantity) < 1) {
              setQuantity(1);
            }
          }}
        />

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={increment}
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          const finalQty = quantity === "" ? 1 : Number(quantity);
          addToCart(id, finalQty);
          setQuantity(1);
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
