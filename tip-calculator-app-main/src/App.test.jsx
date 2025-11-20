import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App basic rendering", () => {
  test("renders the logo", () => {
    render(<App />);
    const logo = screen.getByAltText("Splitter's Logo");
    expect(logo).toBeInTheDocument();
  });

  test("renders bill input", () => {
    render(<App />);
    const billInput = screen.getByLabelText(/bill/i);
    expect(billInput).toBeInTheDocument();
  });

  test("renders people input", () => {
    render(<App />);
    const peopleInput = screen.getByLabelText(/number of people/i);
    expect(peopleInput).toBeInTheDocument();
  });
});

describe("Tip Calculator Functionality", () => {
  test("allows typing bill and people values", async () => {
    render(<App />);
    const user = userEvent.setup();

    const billInput = screen.getByLabelText(/bill/i);
    const peopleInput = screen.getByLabelText(/number of people/i);

    await user.clear(billInput);
    await user.type(billInput, "100");

    await user.clear(peopleInput);
    await user.type(peopleInput, "4");

    expect(billInput).toHaveValue(100);
    expect(peopleInput).toHaveValue(4);
  });

  test("selecting a preset tip button activates it", async () => {
    render(<App />);
    const user = userEvent.setup();

    const tip10 = screen.getByRole("button", { name: "10%" });

    await user.click(tip10);

    expect(tip10).toHaveClass("active");
  });

  test("typing a custom tip deactivates preset buttons", async () => {
    render(<App />);
    const user = userEvent.setup();

    // Step 1: Click a preset tip button
    const tip10 = screen.getByRole("button", { name: "10%" });
    await user.click(tip10);
    expect(tip10).toHaveClass("active");

    // Step 2: Type custom tip (20)
    const customInput = screen.getByPlaceholderText("Custom");
    await user.type(customInput, "20");

    // Step 3: The preset button should no longer be active
    expect(tip10).not.toHaveClass("active");

    // Step 4: Custom input should contain "20"
    expect(customInput).toHaveValue(20);
  });

  test("displays error message when bill or people is 0", async () => {
    render(<App />);
    const user = userEvent.setup();

    const billInput = screen.getByLabelText(/bill/i);
    const peopleInput = screen.getByLabelText(/number of people/i);

    // Type 0 in bill → expect bill error
    await user.clear(billInput);
    await user.type(billInput, "0");

    const errors = screen.getAllByText(/can't be zero/i);
    const billError = errors[0];   // first one corresponds to bill
    expect(billError).toBeVisible();

    // Type 0 in people → expect people error
    await user.clear(peopleInput);
    await user.type(peopleInput, "0");

    const updatedErrors = screen.getAllByText(/can't be zero/i);
    const peopleError = updatedErrors[1];  // second one corresponds to people
    expect(peopleError).toBeVisible();
  });

  test("calculates tip and total per person correctly", async () => {
    render(<App />);
    const user = userEvent.setup();

    const billInput = screen.getByLabelText(/bill/i);
    const peopleInput = screen.getByLabelText(/number of people/i);
    const tip25 = screen.getByRole("button", { name: "25%" });

    // Step 1: Enter bill and people
    await user.clear(billInput);
    await user.type(billInput, "100");

    await user.clear(peopleInput);
    await user.type(peopleInput, "5");

    // Step 2: Select 25% tip
    await user.click(tip25);

    // Step 3: Check tip per person
    const tipPerPerson = screen.getByText("$5.00");
    expect(tipPerPerson).toBeInTheDocument();

    // Step 4: Check total per person
    const totalPerPerson = screen.getByText("$25.00");
    expect(totalPerPerson).toBeInTheDocument();
  });

  test("reset button clears all inputs and results", async () => {
    render(<App />);
    const user = userEvent.setup();

    const billInput = screen.getByLabelText(/bill/i);
    const peopleInput = screen.getByLabelText(/number of people/i);
    const tip25 = screen.getByRole("button", { name: "25%" });
    const resetButton = screen.getByRole("button", { name: /reset/i });
    const customInput = screen.getByPlaceholderText(/custom/i);

    // Step 1: Enter values and select tip
    await user.clear(billInput);
    await user.type(billInput, "100");

    await user.clear(peopleInput);
    await user.type(peopleInput, "4");

    await user.click(tip25);

    // Optional: check that values changed
    expect(tip25).toHaveClass("active");

    // Step 2: Click reset
    await user.click(resetButton);

    // Step 3: Check that all inputs are cleared
    expect(billInput).toHaveValue(null);      // number input empty = null
    expect(peopleInput).toHaveValue(null);
    expect(customInput).toHaveValue(null);

    // Step 4: Tip buttons should not be active
    const tipButtons = screen.getAllByRole("button", { name: /%/i });
    tipButtons.forEach((button) => expect(button).not.toHaveClass("active"));

    // Step 5: Tip & total per person reset to $0.00
    const zeroValues = screen.getAllByText("$0.00");
    expect(zeroValues[0]).toBeInTheDocument(); // tip per person
    expect(zeroValues[1]).toBeInTheDocument(); // total per person
  });
});