import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Adding replies", () => {
  test("submitting a reply adds it under the correct comment", async () => {
    render(<App />);
    const user = userEvent.setup();

    // Find reply buttons
    const replyIcons = await screen.findAllByAltText(/reply/i);
    const replyButtons = replyIcons.map(icon => icon.closest("button"));

    // Click the reply button for the first comment
    await user.click(replyButtons[0]);

    // Find the reply textarea
    const replyTextarea = await screen.findByPlaceholderText(/reply to @amyrobson/i);
    expect(replyTextarea).toBeInTheDocument();

    // The reply area container is the parent div of the textarea
    const replyContainer = replyTextarea.closest("div");
    expect(replyContainer).not.toBeNull();

    // Type in reply
    await user.type(replyTextarea, "Thanks for the explanation!");

    // Submit button is inside this container
    const submitButton = within(replyContainer).getByRole("button", { name: /reply/i });
    await user.click(submitButton);

    // Check the reply was added
    const newReply = await screen.findByText(/thanks for the explanation!/i);
    expect(newReply).toBeInTheDocument();

    // Confirm it's a nested reply
    const nestedContainer = newReply.closest("[class*='border-l']");
    expect(nestedContainer).not.toBeNull();
  });
});
