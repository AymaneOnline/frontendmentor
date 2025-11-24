import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Editing own comment", () => {
  test("clicking Edit allows the user to update their own comment", async () => {
    const user = userEvent.setup();

    render(<App />);

    // Find the current user's original comment content (nested reply by juliusomo)
    const originalContent = /I couldn't agree more with this\. Everything moves so fast/i;
    const originalCommentEl = await screen.findByText(originalContent);
    expect(originalCommentEl).toBeInTheDocument();

    // Locate the comment card container (closest white card)
    const commentCard = originalCommentEl.closest("div.bg-white");
    expect(commentCard).not.toBeNull();

    // Within that card, find the Edit buttons (desktop + mobile) and click the first
    const editButtons = within(commentCard).getAllByRole("button", { name: /edit/i });
    expect(editButtons.length).toBeGreaterThan(0);
    await user.click(editButtons[0]);

    // After clicking Edit, a textarea should appear prefilled with the existing content
    const textarea = within(commentCard).getByRole("textbox");
    expect(textarea.value).toMatch(/I couldn't agree more with this/i);

    // Replace the content
    await user.clear(textarea);
    await user.type(textarea, "Updated insight focusing on fundamentals first.");

    // Click UPDATE button
    const updateButton = within(commentCard).getByRole("button", { name: /update/i });
    await user.click(updateButton);

    // New content is rendered
    expect(screen.getByText(/Updated insight focusing on fundamentals first\./i)).toBeInTheDocument();

    // Old content should no longer be present
    expect(screen.queryByText(originalContent)).toBeNull();
  });
});

