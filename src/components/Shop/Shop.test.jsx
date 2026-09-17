import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router";
import { describe, it, expect, vi } from "vitest";
import Shop from "./Shop";

const mockProducts = [
  { id: 1, title: "Fjallraven Backpack", price: 109.95, image: "bag.jpg" },
  { id: 2, title: "Mens Cotton T-Shirt", price: 22.3, image: "shirt.jpg" },
];

function renderShopWithContext({
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
            element: <Shop />,
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

describe("Shop Component", () => {
  it("renders the heading and all product items", () => {
    renderShopWithContext({});

    expect(
      screen.getByRole("heading", { level: 1, name: /shop products/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Fjallraven Backpack")).toBeInTheDocument();
    expect(screen.getByText("Mens Cotton T-Shirt")).toBeInTheDocument();
  });

  it("adds a new item to an empty cart", async () => {
    const user = userEvent.setup();
    const { setCart } = renderShopWithContext({ cart: new Map() });

    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    await user.click(addButtons[0]);

    expect(setCart).toHaveBeenCalledTimes(1);

    const updatedCart = setCart.mock.calls[0][0];
    expect(updatedCart.get(1)).toBeDefined();
  });

  it("updates the quantity when item is already in the cart", async () => {
    const user = userEvent.setup();
    const { setCart } = renderShopWithContext({ cart: new Map([[1, 2]]) });

    const addButtons = screen.getAllByRole("button", { name: /add to cart/i });
    await user.click(addButtons[0]);

    expect(setCart).toHaveBeenCalledTimes(1);

    const updatedCart = setCart.mock.calls[0][0];
    expect(updatedCart.get(1)).toBeGreaterThan(2);
  });
});
