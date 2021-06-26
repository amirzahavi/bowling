import { render } from "@testing-library/react";
import React from "react";
import { Seperator } from "./Seperator";

describe('<Seperator>', () => {
  it('should render with class', () => {
    const {getByRole} = render(<Seperator></Seperator>);
    const separator = getByRole('separator');

    expect(separator).toHaveClass('seperator');
  });
});