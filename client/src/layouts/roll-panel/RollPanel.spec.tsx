/// <reference types="@testing-library/jest-dom" />
import * as React from 'react';
import { render } from '@testing-library/react';
import { RollPanel } from "./RollPanel";

describe('<RollPanel>', () => {
  it('should render 0-10 range of buttons by default with RollButton', () => {    
    const { getAllByRole } = render(<RollPanel></RollPanel>);
    const buttons = getAllByRole('button');
    expect(buttons).toHaveLength(12);
  });

  it('should render 0-x range of buttons with RollButton', () => {    
    const { getAllByRole } = render(<RollPanel maxPins={5}></RollPanel>);
    const buttons = getAllByRole('button');    
    expect(buttons).toHaveLength(7);
  });
});
