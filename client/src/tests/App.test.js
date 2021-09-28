import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders homepage", () => {
  render(<App />);
  const linkElement = screen.getByText(/HomePage/i);
  expect(linkElement).toBeInTheDocument();
});

// For testing purposes only ( everything under this comment )
function addOne(num) {
  return num + 1;
}

test("addOne", () => {
  expect(addOne(1)).toBe(2);
});
