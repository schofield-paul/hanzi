import { render, screen } from "@testing-library/react";
import Card from ".";
import "@testing-library/jest-dom/extend-expect";

test("Example 1 renders successfully", () => {
  render(<Card languageEng={"english"} />);

  const element = screen.getByTestId("card-element");

  expect(element).toBeInTheDocument();
});
