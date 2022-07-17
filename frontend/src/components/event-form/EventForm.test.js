import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import EventForm from "./EventForm";

import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.post("/add-event", (req, res, ctx) => {
    return res(
      ctx.json({
        data: { message: "Data saved successfully" },
        status: 201,
        statusText: "Created",
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("EventForm component", () => {
  test("renders all input elements", () => {
    render(<EventForm />);
    const firstNameElement = screen.getByLabelText("first name", {
      exact: false,
    });
    const lastNameElement = screen.getByLabelText("last name", {
      exact: false,
    });
    const emailElement = screen.getByLabelText("e-mail", {
      exact: false,
    });
    const eventDateElement = screen.getByLabelText("Event date", {
      exact: false,
    });
    expect(firstNameElement).toBeInTheDocument();
    expect(lastNameElement).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(eventDateElement).toBeInTheDocument();
  });

  test("renders submit button", () => {
    render(<EventForm />);
    const buttonElement = screen.getByText(/submit/i);

    expect(buttonElement).toBeInTheDocument();
  });

  test("empty inputs - button should be disabled", () => {
    render(<EventForm />);
    const buttonElement = screen.getByText(/submit/i);

    expect(buttonElement).toBeDisabled();
  });

  test("entered first name", () => {
    render(<EventForm />);
    const inputElement = screen.getByLabelText("Your first name");
    expect(inputElement.value).toBe("");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(inputElement).toHaveValue("test");
  });

  test("entered last name", () => {
    render(<EventForm />);
    const inputElement = screen.getByLabelText("Your last name");
    expect(inputElement.value).toBe("");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(inputElement).toHaveValue("test");
  });

  test("entered email", () => {
    render(<EventForm />);
    const inputElement = screen.getByLabelText("Your e-mail");
    expect(inputElement.value).toBe("");
    fireEvent.change(inputElement, { target: { value: "test@test.pl" } });
    expect(inputElement).toHaveValue("test@test.pl");
  });

  test("entered event date", () => {
    render(<EventForm />);
    const inputElement = screen.getByLabelText("Event date");
    expect(inputElement.value).toBe("");
    fireEvent.change(inputElement, { target: { value: "07/16/2022" } });
    expect(inputElement).toHaveValue("07/16/2022");
  });

  test("first name skipped - proper message displayed under input", () => {
    render(<EventForm />);
    const firstNameElement = screen.getByLabelText("Your first name");
    expect(firstNameElement.value).toBe("");
    firstNameElement.focus();

    fireEvent.change(firstNameElement, { target: { value: "" } });

    userEvent.tab();
    const warningTextElement = screen.queryByText(
      "Please enter your first name",
      { exact: false }
    );
    expect(warningTextElement).not.toBeNull();
  });

  test("last name skipped - proper message displayed under input", () => {
    render(<EventForm />);
    const firstNameElement = screen.getByLabelText("Your last name");
    expect(firstNameElement.value).toBe("");
    firstNameElement.focus();
    fireEvent.change(firstNameElement, { target: { value: "" } });
    userEvent.tab();
    const warningTextElement = screen.queryByText(
      "Please enter your last name",
      { exact: false }
    );
    expect(warningTextElement).not.toBeNull();
  });

  test("email skipped - proper message displayed under input", async () => {
    render(<EventForm />);
    const emailElement = screen.getByLabelText("Your e-mail");
    const firstNameElement = screen.getByLabelText("Your first name");
    expect(emailElement.value).toBe("");
    act(() => {
      emailElement.focus();
      firstNameElement.focus();
    });
    const warningTextElement = await screen.findByText(
      "Please enter correct e-mail address",
      { exact: false }
    );
    expect(warningTextElement).not.toBeNull();
  });

  test("event date skipped - proper message displayed under input", async () => {
    render(<EventForm />);
    const eventDateElement = screen.getByLabelText("Event date");
    const emailElement = screen.getByLabelText("Your e-mail");
    expect(eventDateElement.value).toBe("");
    act(() => {
      eventDateElement.focus();
      emailElement.focus();
    });

    const warningTextElement = await screen.findByText("Please select date", {
      exact: false,
    });
    expect(warningTextElement).not.toBeNull();
  });

  test("first name entered - button should be disabled", () => {
    render(<EventForm />);
    const inputElement = screen.getByLabelText("Your first name");
    fireEvent.change(inputElement, { target: { value: "test" } });
    const buttonElement = screen.getByText(/submit/i);

    expect(buttonElement).toBeDisabled();
  });

  test("last name entered - button should be disabled", async () => {
    render(<EventForm />);
    const inputElement = screen.getByLabelText("Your last name");
    fireEvent.change(inputElement, { target: { value: "test" } });
    const buttonElement = screen.getByText(/submit/i);

    expect(buttonElement).toBeDisabled();
  });

  test("email entered - button should be disabled", async () => {
    render(<EventForm />);
    const inputElement = screen.getByLabelText("Your e-mail");
    fireEvent.change(inputElement, { target: { value: "test" } });
    const buttonElement = screen.getByText(/submit/i);

    expect(buttonElement).toBeDisabled();
  });

  test("email entered with incorrect value", async () => {
    render(<EventForm />);
    const emailElement = screen.getByLabelText("Your e-mail");
    const firstNameElement = screen.getByLabelText("Your first name");
    expect(emailElement.value).toBe("");
    act(() => {
      emailElement.focus();
    });
    fireEvent.change(emailElement, { target: { value: "test" } });
    act(() => {
      firstNameElement.focus();
    });
    const warningTextElement = await screen.findByText(
      "Please enter correct e-mail address",
      { exact: false }
    );
    expect(warningTextElement).not.toBeNull();
  });

  test("email entered with correct value", () => {
    render(<EventForm />);
    const emailElement = screen.getByLabelText("Your e-mail");
    const firstNameElement = screen.getByLabelText("Your first name");
    expect(emailElement.value).toBe("");
    act(() => {
      emailElement.focus();
    });
    fireEvent.change(emailElement, { target: { value: "test@test.pl" } });
    act(() => {
      firstNameElement.focus();
    });
    const warningTextElement = screen.queryByText(
      "Please enter correct e-mail address",
      { exact: false }
    );
    expect(warningTextElement).toBeNull();
  });

  test("event date entered - button should be disabled", async () => {
    render(<EventForm />);
    const eventDateElement = screen.getByLabelText("Event date");
    fireEvent.change(eventDateElement, { target: { value: new Date() } });
    const buttonElement = screen.getByText(/submit/i);

    expect(buttonElement).toBeDisabled();
  });

  test("all data entered correctly - button enabled", async () => {
    render(<EventForm />);
    const firstNameElement = screen.getByLabelText("Your first name");
    const lastNameElement = screen.getByLabelText("Your last name");
    const emailElement = screen.getByLabelText("Your e-mail");
    const eventDateElement = screen.getByLabelText("Event date");

    fireEvent.change(firstNameElement, { target: { value: "test" } });
    fireEvent.change(lastNameElement, { target: { value: "test" } });
    fireEvent.change(emailElement, { target: { value: "test@test.pl" } });
    fireEvent.change(eventDateElement, { target: { value: "07/16/2022" } });

    const buttonElement = screen.getByText(/submit/i);

    expect(buttonElement).not.toBeDisabled();
  });

  test("inputs cleared after confirmation", async () => {
    render(<EventForm />);

    let firstNameElement = screen.getByLabelText("Your first name");
    let lastNameElement = screen.getByLabelText("Your last name");
    let emailElement = screen.getByLabelText("Your e-mail");
    let eventDateElement = screen.getByLabelText("Event date");
    const buttonElement = screen.getByText(/submit/i);

    fireEvent.change(firstNameElement, { target: { value: "test" } });
    fireEvent.change(lastNameElement, { target: { value: "test" } });
    fireEvent.change(emailElement, { target: { value: "test@test.pl" } });
    fireEvent.change(eventDateElement, { target: { value: "07/16/2022" } });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(screen.getByText(/submit/i)).toBeDisabled();
    });

    firstNameElement = screen.getByLabelText("Your first name");
    lastNameElement = screen.getByLabelText("Your last name");
    emailElement = screen.getByLabelText("Your e-mail");
    eventDateElement = screen.getByLabelText("Event date");

    expect(firstNameElement).toHaveValue("");
    expect(lastNameElement).toHaveValue("");
    expect(emailElement).toHaveValue("");
    expect(eventDateElement).toHaveValue("");
  });
});
