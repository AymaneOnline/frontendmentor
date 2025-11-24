import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Deleting own reply", () => {
  beforeEach(() => {
    // Clear localStorage before each test to ensure fresh data
    localStorage.clear();
  });

  test("clicking Delete shows confirmation modal and removes the reply", async () => {
    const user = userEvent.setup();

    render(<App />);

    // Find the current user's original reply content (nested reply by juliusomo)
    const originalContent = /I couldn't agree more with this\. Everything moves so fast/i;
    const originalReplyEl = await screen.findByText(originalContent);
    expect(originalReplyEl).toBeInTheDocument();

    // Locate the reply card container (closest white card)
    const replyCard = originalReplyEl.closest("div.bg-white");
    expect(replyCard).not.toBeNull();

    // Within that card, find the Delete buttons (desktop + mobile) and click the first
    const deleteButtons = within(replyCard).getAllByRole("button", { name: /delete/i });
    expect(deleteButtons.length).toBeGreaterThan(0);
    await user.click(deleteButtons[0]);

    // Confirmation modal should appear
    const modalHeading = await screen.findByText(/delete comment/i);
    expect(modalHeading).toBeInTheDocument();

    // Modal should have confirmation message
    expect(screen.getByText(/are you sure you want to delete this comment/i)).toBeInTheDocument();

    // Find and click the "YES, DELETE" button
    const confirmButton = screen.getByRole("button", { name: /yes, delete/i });
    await user.click(confirmButton);

    // Reply should be removed from the document
    expect(screen.queryByText(originalContent)).toBeNull();
  });

  test("clicking NO, CANCEL in modal keeps the reply", async () => {
    const user = userEvent.setup();

    render(<App />);

    // Find the current user's reply
    const originalContent = /I couldn't agree more with this\. Everything moves so fast/i;
    const originalReplyEl = await screen.findByText(originalContent);
    expect(originalReplyEl).toBeInTheDocument();

    // Locate the reply card container
    const replyCard = originalReplyEl.closest("div.bg-white");
    expect(replyCard).not.toBeNull();

    // Click Delete button
    const deleteButtons = within(replyCard).getAllByRole("button", { name: /delete/i });
    await user.click(deleteButtons[0]);

    // Modal should appear
    const modalHeading = await screen.findByText(/delete comment/i);
    expect(modalHeading).toBeInTheDocument();

    // Click "NO, CANCEL" button
    const cancelButton = screen.getByRole("button", { name: /no, cancel/i });
    await user.click(cancelButton);

    // Reply should still be present
    expect(screen.getByText(originalContent)).toBeInTheDocument();

    // Modal should be closed
    expect(screen.queryByText(/delete comment/i)).toBeNull();
  });
});
