import { render, screen } from "@testing-library/react";
import ErrorPage from "./ErrorPage";
import { expect } from "vitest";

test("renders error page", () => {
  render(<ErrorPage />);
  const errorHeading = screen.getByRole("heading", {
    level: 1,
    name: /error/i,
  });
  expect(errorHeading).toBeInTheDocument();
});
