import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router";
import { describe, it, expect, vi } from "vitest";
import Cart from "./Cart";

const mockProducts = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 99.99,
    image: "headphones.jpg",
  },
  { id: 2, title: "Mechanical Keyboard", price: 120.0, image: "keyboard.jpg" },
];

function renderCartWithContext({
  data = mockProducts,
  cart = new Map(),
  setCart = vi.fn(),
}) {
  function ContextProvider() {
    return <Outlet context={{ data, cart, setCart }} />;
  }

  const router = createMemoryRouter(
    [
      {
        element: <ContextProvider />,
        children: [
          {
            path: "/",
            element: <Cart />,
          },
          {
            path: "/shop",
            element: <div>Shop Page</div>,
          },
        ],
      },
    ],
    { initialEntries: ["/"] },
  );

  return {
    ...render(<RouterProvider router={router} />),
    setCart,
  };
}

describe("Cart Page", () => {
  it("renders the empty cart view when cart has no items", () => {
    renderCartWithContext({ cart: new Map() });

    expect(
      screen.getByText(/your shopping cart is empty/i),
    ).toBeInTheDocument();

    const shopLink = screen.getByRole("link", { name: /start shopping/i });
    expect(shopLink).toHaveAttribute("href", "/shop");
    expect(screen.queryByText(/order summary/i)).not.toBeInTheDocument();
  });

  it("renders cart items and summary when items are present", () => {
    const cart = new Map([
      [1, 2],
      [2, 1],
    ]);

    renderCartWithContext({ cart });

    // Using getAllByText because each title appears twice:
    // once in <CartProduct> and once in <Summary>
    expect(screen.getAllByText("Wireless Headphones")).toHaveLength(2);
    expect(screen.getAllByText("Mechanical Keyboard")).toHaveLength(2);
    expect(screen.getByText(/order summary/i)).toBeInTheDocument();
  });

  it("increases item quantity when + is clicked", async () => {
    const user = userEvent.setup();
    const cart = new Map([[1, 2]]);
    const { setCart } = renderCartWithContext({ cart });

    const plusButtons = screen.getAllByLabelText(/increase/i);
    await user.click(plusButtons[0]);

    expect(setCart).toHaveBeenCalledTimes(1);
    const updatedMap = setCart.mock.calls[0][0];
    expect(updatedMap.get(1)).toBe(3);
  });

  it("does not increment quantity beyond 99", async () => {
    const user = userEvent.setup();
    const cart = new Map([[1, 99]]);
    const { setCart } = renderCartWithContext({ cart });

    const plusButtons = screen.getAllByLabelText(/increase/i);
    await user.click(plusButtons[0]);

    expect(setCart).not.toHaveBeenCalled();
  });

  it("decreases item quantity when - is clicked", async () => {
    const user = userEvent.setup();
    const cart = new Map([[1, 3]]);
    const { setCart } = renderCartWithContext({ cart });

    const minusButton = screen.getByLabelText(/decrease/i);
    await user.click(minusButton);

    expect(setCart).toHaveBeenCalledTimes(1);
    const updatedMap = setCart.mock.calls[0][0];
    expect(updatedMap.get(1)).toBe(2);
  });

  it("removes an item from the cart when Delete is clicked", async () => {
    const user = userEvent.setup();
    const cart = new Map([
      [1, 1],
      [2, 2],
    ]);
    const { setCart } = renderCartWithContext({ cart });

    const deleteButtons = screen.getAllByRole("button", { name: /remove/i });
    await user.click(deleteButtons[0]);

    expect(setCart).toHaveBeenCalledTimes(1);
    const updatedMap = setCart.mock.calls[0][0];
    expect(updatedMap.has(1)).toBe(false);
    expect(updatedMap.has(2)).toBe(true);
  });
});
