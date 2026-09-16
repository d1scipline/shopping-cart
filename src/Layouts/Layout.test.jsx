import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import App from "../App";
import { expect } from "vitest";

test("Loading screen on start", async () => {
  render(<App></App>);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test("Renders homepage", async () => {
  render(<App></App>);

  expect(await screen.findByRole("heading")).toBeInTheDocument();
});

describe("Navigation Flow", () => {
  const setup = () => {
    const user = userEvent.setup();
    render(<App />);
    return { user };
  };

  test("navigates from Home to Shop page", async () => {
    const { user } = setup();

    const homeHeading = await screen.findByRole("heading", {
      name: /welcome/i,
    });
    expect(homeHeading).toBeInTheDocument();

    const shopLink = await screen.findByRole("link", { name: /shop/i });
    await user.click(shopLink);

    expect(
      await screen.findByRole("heading", { name: "Shop Products" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /home/i }),
    ).not.toBeInTheDocument();
  });

  test("navigates from Shop to Cart page", async () => {
    const { user } = setup();

    const shopLink = await screen.findByRole("link", { name: /shop/i });
    await user.click(shopLink);

    const cartLink = await screen.findByRole("link", { name: /cart/i });
    await user.click(cartLink);

    expect(
      await screen.findByRole("heading", { name: "Your Shopping Cart" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Shop Products" }),
    ).not.toBeInTheDocument();
  });
});
