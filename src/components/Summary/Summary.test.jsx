import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Summary from "./Summary";

describe("Summary Component", () => {
  const mockData = [
    { id: 1, title: "Classic Backpack", price: 29.99 },
    { id: 2, title: "Wireless Mouse", price: 15.5 },
    { id: 3, title: "Mechanical Keyboard", price: 80.0 },
  ];

  it("renders order summary header", () => {
    const cart = new Map([[1, 1]]);

    render(<Summary cart={cart} data={mockData} />);

    expect(screen.getByText("Order Summary")).toBeInTheDocument();
  });

  it("renders line items with title, quantity, and line total", () => {
    // 2 x Backpack ($29.99 = $59.98), 1 x Mouse ($15.50 = $15.50)
    const cart = new Map([
      [1, 2],
      [2, 1],
    ]);

    render(<Summary cart={cart} data={mockData} />);

    // Titles & quantities
    expect(screen.getByText("Classic Backpack")).toBeInTheDocument();
    expect(screen.getByText("x2")).toBeInTheDocument();

    expect(screen.getByText("Wireless Mouse")).toBeInTheDocument();
    expect(screen.getByText("x1")).toBeInTheDocument();

    // Line totals
    expect(screen.getByText("59.98$")).toBeInTheDocument();
    expect(screen.getByText("15.50$")).toBeInTheDocument();
  });

  it("calculates and renders the correct overall total price", () => {
    // Total: (29.99 * 2) + (15.50 * 1) = 59.98 + 15.50 = 75.48
    const cart = new Map([
      [1, 2],
      [2, 1],
    ]);

    render(<Summary cart={cart} data={mockData} />);

    expect(screen.getByText("Total Price: 75.48$")).toBeInTheDocument();
  });

  it("handles decimal precision correctly without floating point drift", () => {
    // 3 x $29.99 = $89.97 (testing toFixed(2))
    const cart = new Map([[1, 3]]);

    render(<Summary cart={cart} data={mockData} />);

    expect(screen.getByText("Total Price: 89.97$")).toBeInTheDocument();
  });
});
