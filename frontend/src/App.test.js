import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders EventForm component", () => {
    render(<App />);
    const firstNameElement = screen.getByText("first name", {
      exact: false,
    });
    expect(firstNameElement).toBeInTheDocument();
  });
});
