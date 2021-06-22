/// <reference types="@testing-library/jest-dom" />
import * as React from 'react';
import { render } from '@testing-library/react';
import { RollButton } from "./RollButton";

describe('<RollButton>', () => {
  it('should render bordered button', () => {
    const { getByRole } = render(<RollButton></RollButton>);    
    const btnElement = getByRole('button');
    expect(btnElement).toHaveClass('btn bordered');
  });

  it('should render button with svg', () => {
    const { getByRole } = render(<RollButton></RollButton>);    
    const btnElement = getByRole('button');
    const svgElement = getByRole('img');
    expect(btnElement).toContainElement(svgElement);
  });
});
