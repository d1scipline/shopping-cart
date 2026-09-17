import { render, screen } from "@testing-library/react";
import LoadingPage from "./LoadingPage";
import { expect } from "vitest";

test("renders loading page and status", () => {
  render(<LoadingPage />);
  const loadingText = screen.getByRole("heading", { name: /loading/i });
  expect(loadingText).toBeInTheDocument();

  expect(screen.getByRole("status")).toBeInTheDocument();
  expect(screen.getByText(/preparing your curated shop/i)).toBeInTheDocument();
});
