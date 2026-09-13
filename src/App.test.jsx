import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("renders main heading", () => {
  render(<App />);
  const headingElement = screen.getByRole("heading");
  expect(headingElement).toBeInTheDocument();
});
