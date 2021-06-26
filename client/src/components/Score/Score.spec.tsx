import React from "react";
import { render } from "@testing-library/react";
import { Score } from "./Score";

describe('<Score>', () => {
  it('should render score with default, when no score passed', () => {
    const {getByRole} = render(<Score></Score>);
    const scoreElement = getByRole('status');

    expect(scoreElement).toHaveTextContent('N/A');
  });

  it('should render score, when score passed', () => {
    const {getByRole} = render(<Score value={100}></Score>);
    const scoreElement = getByRole('status');

    expect(scoreElement).toHaveTextContent('100');
  });
});