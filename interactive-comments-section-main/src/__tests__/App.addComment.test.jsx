import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Add Comment — Interactive Comments Section", () => {
  test("allows user to add a new top-level comment", async () => {
    const user = userEvent.setup();

    render(<App />);

    // 1. Find textarea
    const textarea = screen.getByPlaceholderText("Add a comment...");
    expect(textarea).toBeInTheDocument();

    // 2. User types their comment
    await user.type(textarea, "This is a new comment");
    expect(textarea).toHaveValue("This is a new comment");

    // 3. User clicks SEND
    const sendButton = screen.getByRole("button", { name: "SEND" });
    await user.click(sendButton);

    // 4. New comment appears
    expect(screen.getByText("This is a new comment")).toBeInTheDocument();

    // 5. Textarea resets
    expect(textarea).toHaveValue("");
  });
});
