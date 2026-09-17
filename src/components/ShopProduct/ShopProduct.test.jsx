import {
  getByAltText,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShopProduct from "./ShopProduct";
import { describe, expect, vi } from "vitest";

describe("ShopProduct Component Tests", () => {
  const data = {
    id: 1,
    image: "image.jpg",
    price: 10.5,
    title: "Guitar",
  };

  test("renders a product", () => {
    const user = userEvent.setup();
    const addToCart = vi.fn();
    render(
      <ShopProduct
        title={data.title}
        image={data.image}
        price={data.price}
        id={data.id}
        addToCart={addToCart}
      ></ShopProduct>,
    );

    expect(screen.getByText(/guitar/i)).toBeInTheDocument();
    expect(screen.getByText("10.50$")).toBeInTheDocument();
    expect(screen.getByAltText("Guitar")).toBeInTheDocument();
  });

  test("quantity controls work", async () => {
    const user = userEvent.setup();
    const addToCart = vi.fn();
    render(
      <ShopProduct
        title={data.title}
        image={data.image}
        price={data.price}
        id={data.id}
        addToCart={addToCart}
      ></ShopProduct>,
    );

    const increaseButton = screen.getByText("+");
    const decreaseButton = screen.getByText("-");
    const input = screen.getByRole("spinbutton");

    //Increases it

    expect(input).toHaveValue(1);
    await user.click(increaseButton);
    await user.click(increaseButton);
    expect(input).toHaveValue(3);

    //Decreases it

    await user.click(decreaseButton);
    expect(input).toHaveValue(2);

    //Doesn't decrease past 1
    await user.click(decreaseButton);
    await user.click(decreaseButton);
    expect(input).toHaveValue(1);

    //Doesn't accept invalid input
    await user.type(input, "-eEabcd.+");
    expect(input).toHaveValue(1);

    //Input field works
    await user.clear(input);
    await user.type(input, "15");
    expect(input).toHaveValue(15);

    //Blur defaults to 1
    await user.clear(input);
    await user.click(decreaseButton);
    expect(input).toHaveValue(1);
  });

  test("adds to cart", async () => {
    const user = userEvent.setup();
    const addToCart = vi.fn();
    render(
      <ShopProduct
        title={data.title}
        image={data.image}
        price={data.price}
        id={data.id}
        addToCart={addToCart}
      ></ShopProduct>,
    );

    const increaseButton = screen.getByText("+");
    const addCartButton = screen.getByText(/add to cart/i);
    const input = screen.getByRole("spinbutton");

    await user.click(increaseButton);
    await user.click(increaseButton);
    await user.click(addCartButton);
    expect(addToCart).toHaveBeenCalledTimes(1);
    expect(addToCart.mock.calls[0][0]).toBe(1);
    expect(addToCart.mock.calls[0][1]).toBe(3);
    expect(input).toHaveValue(1);
  });
});
