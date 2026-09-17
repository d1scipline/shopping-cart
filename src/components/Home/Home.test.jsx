import { render, screen } from "@testing-library/react";
import Home from "./Home";

describe("Home", () => {
  it("renders primary headings and key content", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /welcome to our simple shop/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /best products that money can buy/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the hero image with proper alt text", () => {
    render(<Home />);

    const heroImage = screen.getByRole("img", {
      name: /featured store items/i,
    });

    expect(heroImage).toBeInTheDocument();
  });
});
