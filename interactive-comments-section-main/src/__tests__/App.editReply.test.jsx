import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Editing own reply", () => {
  test("clicking Edit allows the user to update their own reply", async () => {
    const user = userEvent.setup();

    render(<App />);

    // Find the current user's original reply content (nested reply by juliusomo)
    const originalContent = /I couldn't agree more with this\. Everything moves so fast/i;
    const originalReplyEl = await screen.findByText(originalContent);
    expect(originalReplyEl).toBeInTheDocument();

    // Locate the reply card container (closest white card)
    const replyCard = originalReplyEl.closest("div.bg-white");
    expect(replyCard).not.toBeNull();

    // Within that card, find the Edit buttons (desktop + mobile) and click the first
    const editButtons = within(replyCard).getAllByRole("button", { name: /edit/i });
    expect(editButtons.length).toBeGreaterThan(0);
    await user.click(editButtons[0]);

    // After clicking Edit, a textarea should appear prefilled with the existing content
    const textarea = within(replyCard).getByRole("textbox");
    expect(textarea.value).toMatch(/I couldn't agree more with this/i);

    // Replace the content
    await user.clear(textarea);
    await user.type(textarea, "I totally agree! The fundamentals never go out of style.");

    // Click UPDATE button
    const updateButton = within(replyCard).getByRole("button", { name: /update/i });
    await user.click(updateButton);

    // New content is rendered
    expect(screen.getByText(/I totally agree! The fundamentals never go out of style\./i)).toBeInTheDocument();

    // Old content should no longer be present
    expect(screen.queryByText(originalContent)).toBeNull();
  });
});
