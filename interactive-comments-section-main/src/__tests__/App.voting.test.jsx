import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Upvote and Downvote functionality", () => {
  beforeEach(() => {
    // Clear localStorage before each test to ensure fresh data
    localStorage.clear();
  });

  test("clicking upvote increases the score by 1", async () => {
    const user = userEvent.setup();

    render(<App />);

    // Find the first comment (amyrobson with score 12)
    const firstComment = await screen.findByText(/Impressive! Though it seems the drag feature/i);
    const commentCard = firstComment.closest("div.bg-white");
    expect(commentCard).not.toBeNull();

    // Find the initial score (12)
    const scoreElement = within(commentCard).getAllByText("12")[0];
    expect(scoreElement).toBeInTheDocument();

    // Find and click the upvote button
    const upvoteButtons = within(commentCard).getAllByLabelText(/upvote/i);
    await user.click(upvoteButtons[0]);

    // Score should increase to 13
    expect(within(commentCard).getAllByText("13").length).toBeGreaterThan(0);
    expect(within(commentCard).queryByText("12")).toBeNull();
  });

  test("clicking downvote decreases the score by 1", async () => {
    const user = userEvent.setup();

    render(<App />);

    // Find the first comment (amyrobson with score 12)
    const firstComment = await screen.findByText(/Impressive! Though it seems the drag feature/i);
    const commentCard = firstComment.closest("div.bg-white");
    expect(commentCard).not.toBeNull();

    // Find the initial score (12)
    const scoreElement = within(commentCard).getAllByText("12")[0];
    expect(scoreElement).toBeInTheDocument();

    // Find and click the downvote button
    const downvoteButtons = within(commentCard).getAllByLabelText(/downvote/i);
    await user.click(downvoteButtons[0]);

    // Score should decrease to 11
    expect(within(commentCard).getAllByText("11").length).toBeGreaterThan(0);
    expect(within(commentCard).queryByText("12")).toBeNull();
  });

  test("clicking upvote twice does not change the score", async () => {
    const user = userEvent.setup();

    render(<App />);

    // Find the first comment
    const firstComment = await screen.findByText(/Impressive! Though it seems the drag feature/i);
    const commentCard = firstComment.closest("div.bg-white");

    // Click upvote first
    const upvoteButtons = within(commentCard).getAllByLabelText(/upvote/i);
    await user.click(upvoteButtons[0]);

    // Score increases to 13
    expect(within(commentCard).getAllByText("13").length).toBeGreaterThan(0);

    // Click upvote again
    await user.click(upvoteButtons[0]);

    // Score should decrease back to 12 (toggled off)
    expect(within(commentCard).getAllByText("12").length).toBeGreaterThan(0);
  });

  test("switching from upvote to downvote changes score by 2", async () => {
    const user = userEvent.setup();

    render(<App />);

    // Find the second comment (maxblagun with score 5)
    const secondComment = await screen.findByText(/Woah, your project looks awesome/i);
    const commentCard = secondComment.closest("div.bg-white");

    // Click upvote first
    const upvoteButtons = within(commentCard).getAllByLabelText(/upvote/i);
    await user.click(upvoteButtons[0]);

    // Score increases to 6
    expect(within(commentCard).getAllByText("6").length).toBeGreaterThan(0);

    // Now click downvote
    const downvoteButtons = within(commentCard).getAllByLabelText(/downvote/i);
    await user.click(downvoteButtons[0]);

    // Score should change to 4 (removed +1 and applied -1)
    expect(within(commentCard).getAllByText("4").length).toBeGreaterThan(0);
  });

  test("voting works on nested replies", async () => {
    const user = userEvent.setup();

    render(<App />);

    // Find the nested reply by ramsesmiron (score 4)
    const nestedReply = await screen.findByText(/If you're still new, I'd recommend focusing/i);
    const replyCard = nestedReply.closest("div.bg-white");
    expect(replyCard).not.toBeNull();

    // Find the initial score (4)
    const scoreElement = within(replyCard).getAllByText("4")[0];
    expect(scoreElement).toBeInTheDocument();

    // Click upvote
    const upvoteButtons = within(replyCard).getAllByLabelText(/upvote/i);
    await user.click(upvoteButtons[0]);

    // Score should increase to 5
    expect(within(replyCard).getAllByText("5").length).toBeGreaterThan(0);
  });
});
