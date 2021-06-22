/// <reference types="@testing-library/jest-dom" />
import * as React from 'react';
import { render } from '@testing-library/react';
import { Button } from "./Button";

describe('<Button>', () => {
  it('should render button with text', () => {
    const { getByRole } = render(<Button>hello</Button>);
    const btnElement = getByRole('button');
    expect(btnElement).toBeInTheDocument();
  });

  it('should render button with btn class', () => {
    const { getByRole } = render(<Button>hello</Button>);
    const btnElement = getByRole('button');
    expect(btnElement).toHaveClass('btn')
  });
});
