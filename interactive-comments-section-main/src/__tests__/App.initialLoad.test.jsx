import { render, screen } from "@testing-library/react";
import App from "../App";
import initialData from "../data.json";

describe("App initial loading with data.json", () => {
  test("renders all comments from data.json", () => {
    render(<App />);

    initialData.comments.forEach((comment) => {
      expect(screen.getByText(comment.user.username)).toBeInTheDocument();
      expect(screen.getByText(comment.content)).toBeInTheDocument();

      const scoreElements = screen.getAllByText(comment.score.toString());
      expect(scoreElements.length).toBeGreaterThan(0);

      const createdAtElements = screen.getAllByText(comment.createdAt);
      expect(createdAtElements.length).toBeGreaterThan(0);
    });
  });
});
