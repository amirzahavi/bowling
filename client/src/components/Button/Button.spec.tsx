import * as React from 'react';
import { render } from '@testing-library/react';
import { Button } from "./Button";

describe('<Button>', () => {
  it('should render button with text', () => {
    const { getByRole } = render(<Button selected={false}>hello</Button>);
    const btnElement = getByRole('button');
    expect(btnElement).toBeInTheDocument();
  });

  it('should render button with btn class', () => {
    const { getByRole } = render(<Button selected={false}>hello</Button>);
    const btnElement = getByRole('button');
    expect(btnElement).toHaveClass('btn')
  });

  it('should render button with "selected" class, when selected', () => {
    const { getByRole } = render(<Button selected={true}>hello</Button>);
    const btnElement = getByRole('button');
    expect(btnElement).toHaveClass('btn selected')
  });
});
