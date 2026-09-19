import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, vi } from "vitest";
import CartProduct from "./CartProduct";

describe("CartProduct Component Tests", () => {
  const data = {
    id: 7,
    image: "image.jpg",
    price: 10.5,
    title: "Guitar",
    quantity: 3,
  };

  test("renders correctly", () => {
    const increaseQuantity = vi.fn();
    const decreaseQuantity = vi.fn();
    const deleteProduct = vi.fn();
    render(
      <CartProduct
        image={data.image}
        title={data.title}
        price={data.price}
        id={data.price}
        quantity={data.quantity}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        deleteProduct={deleteProduct}
      ></CartProduct>,
    );

    expect(screen.getByText(/guitar/i)).toBeInTheDocument();
    expect(screen.getByAltText("image of Guitar")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "image.jpg");
    expect(screen.getByText("10.50$")).toBeInTheDocument();
  });

  test("increase, decrease and delete buttons work", async () => {
    const increaseQuantity = vi.fn();
    const decreaseQuantity = vi.fn();
    const deleteProduct = vi.fn();
    const user = userEvent.setup();
    render(
      <CartProduct
        image={data.image}
        title={data.title}
        price={data.price}
        id={data.id}
        quantity={data.quantity}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        deleteProduct={deleteProduct}
      ></CartProduct>,
    );

    const increaseButton = screen.getByLabelText(/increase/i);
    const decreaseButton = screen.getByLabelText(/decrease/i);
    const deleteButton = screen.getByRole("button", { name: /remove/i });

    await user.click(increaseButton);
    await user.click(decreaseButton);
    await user.click(deleteButton);
    expect(increaseQuantity).toHaveBeenCalledWith(7);
    expect(decreaseQuantity).toHaveBeenCalledWith(7);
    expect(deleteProduct).toHaveBeenCalledWith(7);
  });

  it("disables the decrement button when quantity is 1", async () => {
    const increaseQuantity = vi.fn();
    const decreaseQuantity = vi.fn();
    const deleteProduct = vi.fn();
    const user = userEvent.setup();
    render(
      <CartProduct
        image={data.image}
        title={data.title}
        price={data.price}
        id={data.id}
        quantity={1}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        deleteProduct={deleteProduct}
      ></CartProduct>,
    );
    const minusBtn = screen.getByLabelText(/decrease/i);
    expect(minusBtn).toBeDisabled();

    await user.click(minusBtn);
    expect(decreaseQuantity).not.toHaveBeenCalled();
  });
});
